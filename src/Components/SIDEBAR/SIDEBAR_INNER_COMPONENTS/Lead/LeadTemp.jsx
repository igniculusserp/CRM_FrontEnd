//react
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//external Packages
import axios from "axios";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

//React Icons
import { FaAngleDown, FaBars } from "react-icons/fa";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { VscSettings } from "react-icons/vsc";
import { ImFilter } from "react-icons/im";
import { MdCall } from "react-icons/md";
import { TbRefresh } from "react-icons/tb";

//Wizard->
import { FaTableList } from "react-icons/fa6";
import { IoGrid } from "react-icons/io5";

//grid->
import { BiCalendar } from "react-icons/bi";
import { RiShieldUserLine } from "react-icons/ri";
import { FaUserTie } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { PiLineSegmentsBold } from "react-icons/pi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsHourglassSplit } from "react-icons/bs";

//Folder Imported
import { tenant_base_url, protocal_url } from "../../../../Config/config";

//Mass Email
import MassEmail from "../MassEmail/MassEmail";

//name
import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

//files
import LeadOperations from "./LeadComponents/LeadOperations";
import LeadAction from "./LeadComponents/LeadAction";
import UploadLead from "./LeadComponents/UploadLead";

//modals
import LeadAssignModal from "./LeadComponents/LeadAssignModal";
import LeadStatusModal from "./LeadComponents/LeadStatusModal";
import MultipleAssignModal from "./LeadComponents/MultipleAssignModal";
import MultipuleStatusModal from "./LeadComponents/MultipleStatusModal";
import LeadFeatchModal from "./LeadFeatchModal";

//Global Search Element
import { SearchElement } from "../SearchElement/SearchElement";

//-----------------------------ToastContainer-----------------------------
import { ToastContainer } from "react-toastify";
import {
  showSuccessToast,
  showErrorToast,
} from "./../../../../utils/toastNotifications";

export default function Lead() {
  const navigate = useNavigate();
  const name = getHostnamePart();

  //------- Business Type --------
  const businessType = localStorage.getItem("businessType");
  const businessRole = localStorage.getItem("businessRole");
  const [business, setBusiness] = useState("");
  const [adminRole, setAdminRole] = useState("");

  // Featch Lead Modal
  const [isFeatchModalOpen, setIsFetchModalOpen] = useState(false);

  // Mass Email
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState([]);

  //This is to store the upcoming data from API
  const [getleads, setGetleads] = useState([]);

  //DND
  const [users, setUsers] = useState([]);

  //created such that to filter leads according to leadStatus
  const [filteredLeads, setFilteredLeads] = useState([]); // Filtered leads

  //---------------------->---------------------->PAGINATION<----------------------<----------------------
  //controlled from the bottom of the page
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Define items per page
  const totalPage = Math.ceil(filteredLeads.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  //---------------------->---------------------->PAGINATION->FILTERLEADS/ <----------------------<----------------------
  const currentLeads = filteredLeads?.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //------------------------------------------------------------------------------------------------
  //----------------GET($id)--->API<-------------------
  async function handleLead(id) {
    const bearer_token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };

      if (id === 4) {
        const response = await axios.get(
          `${protocal_url}${name}.${tenant_base_url}/LeadOpration/leads/byusertoken/count`,
          config,
        );

        const data = response.data.data;
        setCurrentPage(1);
        setGetleads(data);
        setFilteredLeads(data);
      } else {
        const response = await axios.get(
          `${protocal_url}${name}.${tenant_base_url}/Lead/leads/byusertoken`,
          config,
        );

        const data = response.data.data;
        setCurrentPage(1);
        setGetleads(data);
        setFilteredLeads(data);
        setSelectedIds([]);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  }

  //------------------------------------------------------------------------------------------------
  //----------------Managing Color of Assigned To----------------
  const getAllUsers = async () => {
    const bearer_token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Setting/users/byusertoken`,
        config,
      );

      const data = response.data?.data;
      setUsers(data);
    } catch (error) {
      console.error("Error fetching leads:", error);
      // Optionally, set an error state to display a user-friendly message
    }
  };

  //useEffect ==> to fetch handleLead, getAllUsers, bussiness, & AdminRole
  useEffect(() => {
    handleLead();
    getAllUsers();
    setBusiness(businessType);
    setAdminRole(businessRole);
  }, []);

  function handleLeadStatusSelection(status) {
    setLeadStatus(status); // Update leadStatus state
    handle_LeadStatus(status); // Apply filter based on selected status
  }

  // Function to --------------> filter leads <--------------
  function handle_LeadStatus(statusValue) {
    if (activeButtonId === 1) {
      let filteredLeads;
      if (statusValue === "All Lead" || statusValue === null) {
        // Show all leads when "All Lead" is selected or reset
        filteredLeads = getleads;
      } else {
        // Apply filtering for other statuses
        filteredLeads = getleads.filter(
          (lead) => lead.leadesStatus === statusValue,
        );
      }
      setFilteredLeads(filteredLeads);
    }
    if (activeButtonId === 2) {
      let filteredLeads;
      if (statusValue === "All Lead" || statusValue === null) {
        // Show all leads when "All Lead" is selected or reset
        filteredLeads = getleads;
      } else {
        // Apply filtering for other statuses
        filteredLeads = getleads.filter(
          (lead) => lead.leadesStatus === statusValue,
        );
      }
      setFilteredLeads(filteredLeads);
    }
  }

  function handle_AssignedTo(assignedToValue) {
    if (activeButtonId === 1) {
      let filtered = getleads;
      if (assignedToValue !== null && assignedToValue !== "Assigned to") {
        filtered = filtered.filter(
          (lead) => lead.assigned_To === assignedToValue,
        );
      }
      setFilteredLeads(filtered); // Set the filtered result
    }
    if (activeButtonId === 3) {
      let filtered = getleads;
      if (assignedToValue !== null && assignedToValue !== "Assigned to") {
        filtered = filtered.filter(
          (lead) => lead.assigned_To === assignedToValue,
        );
      }
      setFilteredLeads(filtered); // Set the filtered result
    }
    if (activeButtonId === 4) {
      let filtered = getleads;
      if (assignedToValue !== null && assignedToValue !== "Assigned to") {
        filtered = filtered.filter((lead) => lead.userName === assignedToValue);
      }
      setFilteredLeads(filtered); // Set the filtered result
    }
  }

  // Handle selecting an assigned user
  function handleAssignedToSelection(user) {
    setAssignedTo(user); // Update assignedTo state
    handle_AssignedTo(user); // Apply both filters
  }

  //-----------------------------------------------> ALL LEADS-->>DROPDOWN<-----------------------------------------------
  //BY_DEFAULT-TEXT
  const [leadStatus, setLeadStatus] = useState("All Lead"); // Track the selected lead status

  //->DROPDOWN_STATE
  const [allLeaddropDown, setAllLeaddropDown] = useState(false);

  //->TOGGLE
  const toggleMenuAllLead = () => {
    setAllLeaddropDown(!allLeaddropDown);
  };

  //ARRAY TO STORE DATA
  const [allLeadData, setallLeadData] = useState([]);

  async function handleLeadStatus() {
    const bearer_token = localStorage.getItem("token");

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Admin/leadstatus/getall`,
        config,
      );
      setallLeadData(response.data.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  }

  useEffect(() => {
    handleLeadStatus();
  }, []);

  //-----------------------------------------------> ALL-> ASSIGNED_TO <-functionality <-----------------------------------------------

  //BY_DEFAULT-TEXT
  const [assignedTo, setAssignedTo] = useState("Assigned to"); // Track the selected assigned user

  //->DROPDOWN_STATE
  const [allAssigned_To_DROPDOWN, setallAssigned_To_DROPDOWN] = useState(false);

  const toggleMenuAssigned_To = () => {
    setallAssigned_To_DROPDOWN(!allAssigned_To_DROPDOWN);
  };

  //----------------ASSIGNED_TO DROPDOWN----------------
  const [allAssigned_To_Data, setallAssigned_To_Data] = useState([]);
  async function handleallAssigned_To() {
    const bearer_token = localStorage.getItem("token");

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Setting/users/byusertoken`,
        config,
      );
      setallAssigned_To_Data(response.data.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  }

  useEffect(() => {
    handleallAssigned_To();
  }, []);

  //-------------------------------->WIZARD DROPDOWN<--------------------------------
  const stripeBar = [
    { key: 1, value: "Table View", icon: <FaTableList /> },
    { key: 2, value: "Grid View", icon: <IoGrid /> },
  ];

  //state to manage dropDown onMouseLeave
  const [stripeBardropDown, setstripeBardropDown] = useState(false);

  //By Default value - to <TABLE VIEW>
  const [selectedViewValue, setSelectedViewValue] = useState(
    stripeBar[0].value,
  );

  //function to open/close dropdown onMouseLeave
  const togglestripeBar = () => {
    setstripeBardropDown(!stripeBardropDown);
  };

  //function to select value from dropDown
  const handleStripeButton = (value) => {
    setSelectedViewValue(value);
  };

  //dropDown --> state OnClick
  const [dropLogodropDown, setdropLogodropDown] = useState(false);

  //dropDown --> function OnClick
  const togglesdropLogo = () => {
    setdropLogodropDown(!dropLogodropDown);
  };

  //-------------------------------------------------------------------------------------

  //-------------------------------->ACTION BAR DROPDOWN<--------------------------------
  const dropActionsMenu = [
    // { key: 0, value: "Actions" },
    { key: 1, value: "Mass Delete" },
    { key: 3, value: "Mass E-Mail" },
    { key: 4, value: "Approve Leads" },
    { key: 5, value: "Export to Excel" },
    { key: 6, value: "Export to PDF" },
    { key: 7, value: "Convert Lead to Contact" },
  ];

  const [dropActionsMenudropDown, setdropActionsMenudropDown] = useState(false);

  const toggleActionsMenuLogo = () => {
    setdropActionsMenudropDown(!dropActionsMenudropDown);
  };

  const handleActionButton = async (value) => {
    // ---------------------->MASS DELETE FUNCTIONALITY<----------------------
    if (value === "Mass Delete") {
      const userConfirmed = confirm(
        "Are you sure you want to Delete the selected Leads?",
      );
      if (userConfirmed) {
        massDelete();
      }
    }

    // ---------------------->MASS E-Mail FUNCTIONALITY<----------------------
    if (value === "Mass E-Mail") {
      const userConfirmed = confirm(
        "Are you sure you want to Send E-Mail to the selected Data?",
      );
      if (userConfirmed) {
        openMassEmailModal(selectedEmails);
      }
    }

    // ---------------------->SHEET VIEW FUNCTIONALITY*<----------------------
    if (value === "Sheet View") {
      const userConfirmed = confirm(
        "Are you sure you want to export the selected Leads?",
      );
      if (userConfirmed) {
        exportToExcel();
      }
    }

    // ---------------------->PRINT VIEW FUNCTIONALITY*<----------------------
    if (value === "Print View") {
      const userConfirmed = confirm(
        "Are you sure you want to export the selected Leads?",
      );
      if (userConfirmed) {
        exportToPDF();
      }
    }

    // ---------------------->Convert Lead to Contact FUNCTIONALITY*<----------------------
    if (value === "Convert Lead to Contact") {
      const userConfirmed = confirm(
        "Are you sure you want to convert this lead to a contact?",
      );
      if (userConfirmed) {
        convertType();
      }
    }
  };
  // ---------------------->MASS DELETE FUNCTIONALITY---###API###<----------------------
  const massDelete = async () => {
    const bearer_token = localStorage.getItem("token");

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
          "Content-Type": "application/json",
        },
        data: { leadIds: selectedIds },
      };

      const response = await axios.delete(
        `${protocal_url}${name}.${tenant_base_url}/Lead/lead/massdelete`,
        config,
      );
      alert("Mass Deleted run");
      handleLead();
      console.log(response);

      setGetleads((prevLeads) =>
        prevLeads.filter((lead) => !selectedIds.includes(lead.id)),
      );
      setSelectedIds([]);
    } catch (error) {
      console.error("Error deleting leads:", error);
    }
  };

  //Enable us to switch to createlead/editlead page with /:id
  let handleClick = (item) => {
    navigate(`/panel/editlead/${item.id}`);
  };

  // ---------------------->MASS Email FUNCTIONALITY---<----------------------
  const openMassEmailModal = () => {
    if (selectedEmails.length > 0) {
      setIsModalOpen(true); // Open the modal
    } else {
      alert("Selected Entity dose not have eMail Address.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAssignModalOpen(false);
    setStatusModalOpen(false);
    setMultiAssignModal(false);
    setMultiStatusModal(false);
    setIsFetchModalOpen(false);
    handleLead();
  };

  //---------------------->SHEET VIEW FUNCTIONALITY---###FUNCTION###<----------------------
  //-------> XLSX used here
  const exportToExcel = () => {
    console.log("runned");
    const leadsToExport = currentLeads.filter((lead) =>
      selectedIds.includes(lead.id),
    );
    if (leadsToExport?.length === 0) {
      alert("No leads selected to export");
      return;
    }

    // Create a worksheet from the filtered leads data
    const ws = XLSX.utils.json_to_sheet(leadsToExport);

    // Create a new workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Selected Leads");

    // Export the workbook to an Excel file
    XLSX.writeFile(wb, "SelectedLeadsData.xlsx");
  };

  //---------------------->Export TO PDF FUNCTIONALITY---###FUNCTION###<----------------------
  const exportToPDF = () => {
    const leadsToExport = currentLeads.filter((lead) =>
      selectedIds.includes(lead.id),
    );
    if (leadsToExport?.length === 0) {
      alert("No leads selected to export");
      return;
    }
    const doc = new jsPDF();
    // const role = matchedUser?.role;
    const tableColumn = [
      "ID",
      "Name",
      "Email",
      "Phone No.",
      "Lead Source",
      "Assigned To",
    ];
    // Map the leads data to rows
    const tableRows = leadsToExport?.map((lead) => [
      lead.id,
      lead.name,
      lead.email,
      lead.phoneNo,
      lead.leadsSource,
      lead.assigned_To,
    ]);
    // Add a title to the PDF
    doc.text("Selected Leads Data", 14, 16);
    // Add the table to the PDF
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 22, // Position the table after the title
    });
    doc.save("Leads.pdf");
  };

  //---------------------->---------------------->MANAGE_BY/ASSIGNED_TO<----------------------<ARVIND----------------------
  const roleColors = [
    "#2563eb", // blue
    "#22c55e", // LimeGreen
    "#7c3aed", // MediumPurple
    "#0369a1", //Sky
    "#e11d48", //Rose
  ];

  //---------------------->---------------------->CONVERT_LEADS_TO_CONTACTS<----------------------<----------------------

  const convertType = async () => {
    const bearer_token = localStorage.getItem("token");

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `${protocal_url}${name}.${tenant_base_url}/Lead/leadtocontact/${selectedIds}`,
        { id: selectedIds }, // Pass data as second parameter
        config,
      );

      setGetleads((prevLeads) =>
        prevLeads.filter((lead) => !selectedIds.includes(lead.id)),
      );
      setSelectedIds([]);

      if (response.status === 200) {
        showSuccessToast("Lead has been successfully converted to a contact.");
      } else {
        showErrorToast(
          `Failed to convert lead: ${response.data.message || "Unknown error"}`,
        );
      }
    } catch (error) {
      showErrorToast(
        "An error occurred while converting the lead. Please try again later.",
      );
    }
  };

  // Function to get the color for a role based on its index
  const getRoleColorByIndex = (index) => {
    return roleColors[index % roleColors?.length]; // Use modulo for wrapping
  };

  //---------------------->---------------------->̧CHECKBOX<----------------------<----------------------
  //---------------------->---------------------->̧CHECKBOX -> SINGLE<----------------------<----------------------
  const [selectedIds, setSelectedIds] = useState([]);
  const handleOnCheckBox = (e, item) => {
    e.stopPropagation();

    const leadId = item.id;

    // Toggle selected IDs
    setSelectedIds((prevSelected) =>
      prevSelected.includes(leadId)
        ? prevSelected.filter((id) => id !== leadId)
        : [...prevSelected, leadId],
    );

    // Update selected emails
    setSelectedEmails((prevSelectedEmails) => {
      const newSelectedEmails = prevSelectedEmails.includes(item.email)
        ? prevSelectedEmails.filter((email) => email !== item.email)
        : [...prevSelectedEmails, item.email];
      return newSelectedEmails;
    });
  };

  //---------------------->---------------------->̧CHECKBOX -> MULTIPLE<----------------------<----------------------
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
  const handleSelectAllCheckbox = (e) => {
    const isChecked = e.target.checked;
    setIsSelectAllChecked(isChecked);

    if (isChecked) {
      // Add all leads in the current page to selectedIds
      const currentPageIds = currentLeads?.map((lead) => lead.id);
      const allEmails = currentLeads.map((order) => order.email);
      setSelectedEmails(allEmails); // Store all emails
      setSelectedIds((prevSelected) => [
        ...new Set([...prevSelected, ...currentPageIds]),
      ]);
    } else {
      const currentPageIds = currentLeads?.map((lead) => lead.id);
      setSelectedEmails([]);
      setSelectedIds((prevSelected) =>
        prevSelected.filter((id) => !currentPageIds.includes(id)),
      );
    }
  };

  // Update "Select All" checkbox state when individual checkboxes are clicked
  useEffect(() => {
    const currentPageIds = currentLeads?.map((lead) => lead.id);
    const isAllSelected =
      currentPageIds.every((id) => selectedIds.includes(id)) &&
      currentPageIds?.length > 0;
    setIsSelectAllChecked(isAllSelected);
  }, [selectedIds, currentLeads]);

  // DYNAMIC RENDERING BUTTONS - TABLE
  // DYNAMIC LEAD BUTTONS
  const dynamicButtons = [
    { id: 1, name: "Leads" },
    { id: 2, name: "Upload Leads" },
    { id: 3, name: "Lead Operations" },
    { id: 4, name: "Lead Action" },
  ];

  // State to keep track of the selected button and button text

  const [activeButtonId, setActiveButtonId] = useState(
    () => parseInt(localStorage.getItem("activeButtonId")) || 1,
  );

  const handleDynamicButtonsClick = (id) => {
    setActiveButtonId(id); // Update state first
    localStorage.setItem("activeButtonId", id);
    handleLead(id);
  };

  useEffect(() => {
    return () => {
      // This will run when the component unmounts
      localStorage.removeItem("activeButtonId");
    };
  }, [location]);

  // ----------------------------- Date Filter -----------------------------

  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  // Function to filter based on date range
  function handle_DateRange(startDate, endDate) {
    let filteredFollows = getleads;

    // Convert startDate to the beginning of the day and endDate to the end of the day
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0); // Set time to 00:00:00

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Set time to 23:59:59

    if (startDate && endDate) {
      filteredFollows = filteredFollows.filter((follow) => {
        const callbackDate = new Date(follow.call_bck_DateTime);
        return callbackDate >= start && callbackDate <= end;
      });
    }
    setFilteredLeads(filteredFollows); // Update the filtered result
  }

  // UseEffect to trigger handle_DateRange on date change
  useEffect(() => {
    if (startDate <= endDate) {
      handle_DateRange(startDate, endDate);
    }
  }, [startDate, endDate]);

  //------------------------------------------------------------------------------------------------
  //----------------leadOperations BAR DROPDOWN----------------
  const leadOperations = [
    { key: 1, value: "Lead Allotment" },
    { key: 2, value: "Multiple Assign" },
    { key: 3, value: "Change Status" },
    { key: 4, value: "Multiple Status Change" },
  ];

  const [selectedValue, setSelectedValue] = useState("");
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [multiAssignModal, setMultiAssignModal] = useState(false);
  const [multiStatusModal, setMultiStatusModal] = useState(false);

  selectedIds;
  const handleSelect = (selected) => {
    setSelectedValue(selected);

    console.log("Selected Value:", selected, selectedValue);

    if (selected === "Lead Allotment") {
      setAssignModalOpen(true);
    }
    if (selected === "Change Status") {
      setStatusModalOpen(true);
    }
    if (selected === "Multiple Assign") {
      if (selectedIds.length > 0) {
        setMultiAssignModal(true);
      } else {
        alert("No Id Selected");
      }
    }
    if (selected === "Multiple Status Change") {
      if (selectedIds.length > 0) {
        setMultiStatusModal(true);
      } else {
        alert("No Id Selected");
      }
    }
  };

  // SELECT OPERATION DROPDOWN
  const [selectOperationDropdown, setSelectOperationDropdown] = useState(false);

  // TOGGLE SELECT OPERATION
  const toggleDropdownSelectOperation = () => {
    setSelectOperationDropdown(!selectOperationDropdown);
  };

  // ------------------------------ Search Function ----------------------------------

  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    let filtered;

    if (activeButtonId === 4) {
      // Filter for Lead Action (id === 4)
      filtered = getleads.filter(
        (lead) =>
          lead.userName &&
          lead.userName?.toLowerCase()?.includes(searchTerm?.toLowerCase()),
      );
    } else {
      // General filtering for other lead types
      filtered = getleads.filter(
        (lead) =>
          lead.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
          lead.mobileNo?.includes(searchTerm),
      );
    }

    setFilteredLeads(filtered);
  }, [searchTerm, getleads, activeButtonId]);

  //------------------------------------------------------Filter Reset Settings ---------------------------------------------

  const handleResetFilter = () => {
    setFilteredLeads(getleads);
    setLeadStatus("All Lead");
    setAssignedTo("Assigned to");
  };

  //---------------------------------------------------- Roles & Permissions ----------------------------------------------------

  const [permissions, setPermissions] = useState([]);
  const [edit, setEdit] = useState(false);
  const [createSO, setCreateSO] = useState(false);
  const [viewLeads, setviewLeads] = useState(false);
  const [createLead, setCreateLead] = useState(false);
  const [viewName, setViewName] = useState("");
  const [fetchLead, setFetchLead] = useState(false);

  async function handleGetPermission() {
    const bearer_token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Security/rolesandpermissions/getgroupwise/${businessRole}`,
        config,
      );
      console.log("Permission Data : ", response.data.data);
      const permissionsList = response?.data?.data;

      if (permissionsList) {
        const serviceBoxPermissions = permissionsList.find(
          (item) => item.moduleName === "Leads",
        );

        if (serviceBoxPermissions) {
          const permissionsArray = serviceBoxPermissions.permissions.split(",");
          setPermissions(permissionsArray);

          console.log("List : ", permissionsArray);

          //------------------------------------------------------ Set permissions ------------------------------------------------
          if (
            permissionsArray.includes("View Leads") ||
            businessRole === "Admin"
          ) {
            setViewName("Leads");
          } else {
            setViewName("");
          }
          setEdit(permissionsArray.includes("Edit Lead"));
          setCreateSO(permissionsArray.includes("Create Sales Order"));
          setviewLeads(permissionsArray.includes("View Leads"));
          setCreateLead(permissionsArray.includes("Create Lead"));
          setFetchLead(permissionsArray.includes("Fetch Leads"));
        }
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  }

  useEffect(() => {
    handleGetPermission();
  }, []);

  return (
    //parent
    <>
      <ToastContainer />
      <div className="m-3 flex min-h-screen flex-col">
        {/* -----------------------------------Leads Allotment Modal------------------------------ */}
        {assignModalOpen && <LeadAssignModal onClose={closeModal} />}
        {/* -----------------------------------Multi Assign Modal------------------------------ */}
        {multiAssignModal && (
          <MultipleAssignModal multiIds={selectedIds} onClose={closeModal} />
        )}
        {/* -----------------------------------Change Status Modal------------------------------ */}
        {statusModalOpen && <LeadStatusModal onClose={closeModal} />}
        {/* -----------------------------------Multi Status Change Modal------------------------------ */}
        {multiStatusModal && (
          <MultipuleStatusModal multiIds={selectedIds} onClose={closeModal} />
        )}
        {/* -------------------------------- Fetch modal -------------------------------------------- */}
        {isFeatchModalOpen && <LeadFeatchModal onClose={closeModal} />}
        {/* containerbar*/}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-white px-3 py-2">
          {/* PART-I */}
          {/* container- Alleads, search */}
          <div className="flex flex-wrap items-start justify-between gap-3">
            {/* PART-I */}
            {/* All Lead  DropDown*/}
            <div
              className="button_MaxWidth_first_layer_Container relative"
              onClick={toggleMenuAllLead}
              onMouseLeave={() => setAllLeaddropDown(false)}
            >
              <button
                className="button_MaxWidth_first_layer flex min-w-40 max-w-44 items-center justify-between truncate rounded-md border px-4 py-2"
                id="dropdownDefaultButton"
                type="button"
              >
                {leadStatus}
                <FaAngleDown className="ml-2 text-gray-900" />
              </button>
              {allLeaddropDown && (
                <div className="absolute top-10 z-10 rounded-md border border-gray-300 bg-white">
                  <ul className="text-sm text-gray-700">
                    {allLeadData.map((item) => (
                      <li
                        key={item.id}
                        className="block w-56 cursor-pointer border-b px-4 py-2 hover:bg-cyan-500 hover:text-white"
                        onClick={() => handleLeadStatusSelection(item.status)} // Correct selection logic
                      >
                        {item.status}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {/* ---------------------------------- Managed BY Filter ----------------------------------------------*/}
            <ManagedByFilter
              assignedTo={assignedTo} // Sending Value
              followUpBy={followUpBy} // Sending Value
              setAssignedTo={setAssignedTo} // Pass function to update state in FollowUp
              setFilteredData={setFilteredData} // Pass function to update filtered data
              setFinalData={setFinalData}
              finalData={finalData}
              originalData={originalData}
            />
            {/*--------------------------------------- Search Box -------------------------------------------------------*/}
            <SearchElement
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/*------------------------------------- Fetch Box ----------------------------------------------------------*/}
            {fetchLead || businessRole === "Admin" ? (
              <div className="button_MaxWidth_first_layer_Container flex gap-1">
                <button
                  className="button_MaxWidth_first_layer flex items-center justify-center gap-2 rounded-lg border bg-blue-600 px-4 py-2 text-white"
                  onClick={() => setIsFetchModalOpen(true)}
                >
                  Fetch Leads
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="button_MaxWidth_Main_Container flex flex-wrap items-center gap-3">
            {/* PART-II */}
            {/*--------------------------------------------------- Stripe-BarDropDown -------------------------------------*/}
            {activeButtonId === 2 || activeButtonId === 4 ? (
              ""
            ) : (
              <>
                {/*  ------------------------------------------------- Stripe-BarDropDown --------------------------------- */}
                <UseGridFilter
                  selectedViewValue={selectedViewValue} // Sending selected value
                  setSelectedViewValue={setSelectedViewValue} // Setting selected value
                />
              </>
            )}
            {/* PART-II */}
            {/*------------------------------------------------------  Create Lead ------------------------------------------*/}
            {createLead || businessRole === "Admin" ? (
              <div className="button_MaxWidth_Container flex">
                <Link to="/panel/createlead" className="button_MaxWidth">
                  <button
                    className="button_MaxWidth flex items-center justify-center gap-2 rounded-lg border bg-blue-600 px-4 py-2 text-white"
                    id="dropdownDefaultButton"
                    type="button"
                  >
                    Create Lead
                  </button>
                </Link>
                {/* PART-II */}
                {/*  Create Lead Part-II -> down button */}
                <div
                  className="relative"
                  onClick={togglesdropLogo}
                  onMouseLeave={() => setdropLogodropDown(false)}
                ></div>
              </div>
            ) : (
              ""
            )}
            {/*-------------------------------------- ACTIONS DROPDWON --------------------------------------------- */}
                      <UseAction
                        originalData={originalData} // Sending Original Data
                        getApiData={getApiData} // Execute API Data Function
                        screenName="Follow Up" // Sending Screen Name
                        selectedRowsId={selectedRowsId} // Sending Selected Rows IDs
                        selectedRowEmails={selectedRowEmails} // Sending Selected Rows E-Mail's
                        actions={actions} // Sending Actions Dropdown List
                      />
          </div>
        </div>
        {/* 2nd bar Leads and lenghtLeads*/}
        <div className="leads_Button_Main_Container mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="leads_Button_Main_Container flex items-center justify-start gap-3">
            <h1 className="text-3xl font-medium">Leads</h1>
            <h1 className="text-md min-w-10 rounded-md bg-blue-600 px-2 py-2 text-center text-white shadow-md">
              {getleads?.length}
            </h1>

            {/*---------------------------------------------------- BUTTONS -------------------------------------------------*/}
            <div className="leads_Button_Container flex gap-2">
              {dynamicButtons.map(({ id, name }) =>
                permissions.includes(name) ||
                name === viewName ||
                businessRole === "Admin" ? (
                  <button
                    key={id}
                    onClick={() => handleDynamicButtonsClick(id)}
                    className={`text-md leads_Button whitespace-nowrap rounded px-2 py-1.5 font-light ${
                      activeButtonId === id
                        ? "bg-cyan-500 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {name}
                  </button>
                ) : null,
              )}
            </div>
          </div>

          {activeButtonId === 1 ? (
           <>
            {/* ------------------- Filter by date ----------------- */}
                   <UseDateFilter
                     onReset={handleResetFilter} //Reset Button Function
                     originalData={originalData} // Sending Original Data
                     setFilteredData={setFilteredData} // Set Filter Data
                     filteredData={filteredData} //Sending Filter Data
                   />
           </>
          ) : (
            ""
          )}
        </div>
        {activeButtonId === 3 && (
          <div
            className="relative my-1"
            onClick={toggleDropdownSelectOperation}
            onMouseLeave={() => setSelectOperationDropdown(false)}
          >
            <button
              className="mt-2 flex items-center justify-between gap-2 rounded-lg border bg-white px-4 py-2 text-gray-600"
              id="dropdownDefaultButton"
              type="button"
            >
              Select Lead Operation Type
              <FaAngleDown className="text-gray-900" />
            </button>
            {selectOperationDropdown && (
              <div className="top-13 absolute z-10 w-64 rounded-md border border-gray-300 bg-white">
                <ul className="rounded-md text-sm text-gray-700">
                  {leadOperations.map(({ key, value }) => (
                    <li
                      key={key}
                      onClick={() => handleSelect(value)}
                      className="block cursor-pointer border-b px-4 py-2 hover:bg-cyan-500 hover:text-white"
                    >
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        {/*-------Table-------*/}
        {viewLeads || businessRole === "Admin" ? (
          <div className="leads_Table_Main_Container mt-3 overflow-x-auto">
            <div className="leads_Table_Container min-w-full rounded-md shadow-lg">
              {selectedViewValue === "Table View" && activeButtonId === 1 && (
               <Paper sx={{ width: "100%" }}>
               <DataGrid
                 rows={currentData} // Row Data
                 columns={columns} // Headings
                 pagination={false}
                 checkboxSelection
                 onRowSelectionModelChange={(newSelection) =>
                   handleSelectionChange(newSelection)
                 }
                 sx={{
                   border: 0,
                   width: "100%",
                   "& .MuiDataGrid-columnHeaderTitle": {
                     fontWeight: "bold",
                   },
                   "& .MuiDataGrid-footerContainer": {
                     display: "none",
                   },
                 }}
               />
             </Paper>
              )}

              {/* ------------GRID------------ */}
              {selectedViewValue === "Grid View" && (
                <>
                  <div className="min-w-full">
                    {/* ------------Parent------------ */}
                    <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                      {/*---------Card starts Here */}
                      {getleads.map((item) => (
                        // {/* ------------sub-Parent->Container ------------ */}
                        <div
                          className="grid grid-cols-1 gap-1 rounded-lg bg-sky-100 p-2 shadow-md"
                          key={item.id}
                        >
                          <div className="">
                            <div className="flex items-center rounded border-2 border-cyan-500 bg-white py-2 text-center">
                              <div className="mx-auto flex items-center justify-center gap-2">
                                <FaUserTie />
                                <span className="">
                                  {item?.name[0].toUpperCase() +
                                    item?.name.substr(1)}
                                </span>
                              </div>
                              <AiOutlineEdit
                                className="mr-3 rounded-full bg-cyan-400 p-1 text-white hover:bg-cyan-500"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/panel/editlead/${item.id}`);
                                }}
                                size={25}
                              />
                            </div>
                          </div>

                          <div className="rounded border-2 border-cyan-500 bg-white py-2">
                            <div className="flex items-center justify-between px-3 py-1">
                              <div className="flex items-center justify-between py-1">
                                <IoIosMail size={22} className="w-6" />
                                <span className="hidden sm:block">Email</span>
                              </div>
                              <div className="truncate text-sm font-medium">
                                <a
                                  href={`mailto:${item.email}`}
                                  onClick={(event) => event.stopPropagation()}
                                >
                                  {item.email}
                                </a>
                              </div>
                            </div>

                            <div className="flex items-center justify-between px-3 py-1">
                              <div className="flex items-center justify-between py-1">
                                <FaPhoneAlt size={14} className="w-6" />
                                <span className="hidden sm:block">Phone</span>
                              </div>
                              <div className="truncate text-sm font-medium">
                                <a
                                  href={`tel:${item.mobileNo}`}
                                  onClick={(event) => event.stopPropagation()}
                                >
                                  {item?.mobileNo}
                                </a>
                              </div>
                            </div>

                            <div className="flex items-center justify-between px-3 py-1">
                              <div className="flex items-center justify-between py-1">
                                <PiLineSegmentsBold size={16} className="w-6" />
                                <span className="hidden sm:block">
                                  Segments
                                </span>
                              </div>
                              <div className="truncate text-sm font-medium">
                                {item?.segments?.length
                                  ? item.segments?.join(", ")
                                  : ""}
                              </div>
                            </div>

                            <div className="flex items-center justify-between px-3 py-1">
                              <div className="flex items-center justify-between py-1">
                                <RiShieldUserLine size={18} className="w-6" />
                                <span className="hidden sm:block">
                                  Managed By
                                </span>
                              </div>
                              <div className="text-sm font-medium">
                                {item?.assigned_To}
                              </div>
                            </div>

                            <div className="flex items-center justify-between px-3 py-1">
                              <div className="flex items-center justify-between py-1">
                                <BsHourglassSplit size={18} className="w-6" />
                                <span className="hidden sm:block">Status</span>
                              </div>
                              <div className="text-sm font-medium">
                                {item?.leadesStatus}
                              </div>
                            </div>

                            <div className="flex items-center justify-between px-3 py-1">
                              <div className="flex items-center justify-between py-1">
                                <BiCalendar size={18} className="w-6" />
                                <span className="hidden sm:block">
                                  Trail Start Date
                                </span>
                              </div>
                              <div className="text-sm font-medium">
                                {item?.trialStartDate?.split("T")[0]}
                              </div>
                            </div>

                            <div className="flex items-center justify-between px-3 py-1">
                              <div className="flex items-center justify-between py-1">
                                <BiCalendar size={18} className="w-6" />
                                <span className="hidden sm:block">
                                  Trail End Date
                                </span>
                              </div>
                              <div className="text-sm font-medium">
                                {item?.trialEndDate?.split("T")[0]}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/*--------------------------------- LEAD OPERATIONS TABLE ---------------------------------------*/}
            <div className="min-w-full overflow-hidden rounded-md">
              {/* MONITORING TABLE */}
              {selectedViewValue === "Table View" && activeButtonId === 2 && (
                <UploadLead />
              )}
            </div>

            {/*------------------------------------- LEAD ACTION TABLE --------------------------------------*/}
            <div className="min-w-full overflow-hidden rounded-md">
              {/* LEAD ACTION TABLE */}
              {selectedViewValue === "Table View" && activeButtonId === 3 && (
                <LeadOperations
                  currentLeads={currentLeads}
                  selectedIds={selectedIds}
                  handleOnCheckBox={handleOnCheckBox}
                  isSelectAllChecked={isSelectAllChecked}
                  handleSelectAllCheckbox={handleSelectAllCheckbox}
                />
              )}
              {/* RENDERING UPLOAD LEADS PAGE */}
              {activeButtonId === 4 && (
                <LeadAction currentLeads={currentLeads} />
              )}
            </div>

             {/* --------------------------------------- Pagination ------------------------------------------ */}
          <Stack spacing={2} className="mb-1 mt-4">
            <Pagination
              count={Math.ceil(filteredData.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              sx={{
                display: "flex",
                justifyContent: "center",
                "& .MuiPaginationItem-root": {
                  fontSize: "1.2rem",
                },
                "& .MuiPaginationItem-root.Mui-selected": {
                  backgroundColor: "rgba(6, 182, 212, 1)",
                  color: "#fff",
                },
              }}
            />
          </Stack>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
