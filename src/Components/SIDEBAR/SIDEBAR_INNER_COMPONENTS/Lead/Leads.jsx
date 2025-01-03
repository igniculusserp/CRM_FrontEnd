//react
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

//external Packages
import axios from "axios";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

//React Icons
import { FaAngleDown, FaPhoneAlt, FaBars } from "react-icons/fa";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { IoIosMail } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import { VscSettings } from "react-icons/vsc";
import { ImFilter } from "react-icons/im";
import { MdCall } from "react-icons/md";
import { TbRefresh } from "react-icons/tb";

//Folder Imported
import { tenant_base_url, protocal_url } from "../../../../Config/config";

//Mass Email
import MassEmail from "../MassEmail/MassEmail";

//name
import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

import LeadOperations from "./LeadComponents/LeadOperations";
import LeadAction from "./LeadComponents/LeadAction";
import UploadLead from "./LeadComponents/UploadLead";

import LeadAssignModal from "./LeadComponents/LeadAssignModal";
import LeadStatusModal from "./LeadComponents/LeadStatusModal";
import MultipleAssignModal from "./LeadComponents/MultipleAssignModal";
import MultipuleStatusModal from "./LeadComponents/MultipleStatusModal";
import LeadFeatchModal from "./LeadFeatchModal";

//Global Search Element
import { SearchElement } from "../SearchElement/SearchElement";

//-----------------------------ToastContainer-----------------------------
import { ToastContainer } from "react-toastify";
import {showSuccessToast,showErrorToast} from "./../../../../utils/toastNotifications";

export default function Lead() {
  const navigate = useNavigate();
  const location = useLocation();
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
  //----------------GET----------------
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
          config
        );

        const data = response.data.data;
        setCurrentPage(1);
        setGetleads(data);
        setFilteredLeads(data);
      } else {
        const response = await axios.get(
          `${protocal_url}${name}.${tenant_base_url}/Lead/leads/byusertoken`,
          config
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
        config
      );

      const data = response.data?.data;
      setUsers(data);
    } catch (error) {
      console.error("Error fetching leads:", error);
      // Optionally, set an error state to display a user-friendly message
    }
  };

  useEffect(() => {
    handleLead();
    getAllUsers();
    //------- Business Type --------
    setBusiness(businessType);
    setAdminRole(businessRole);
  }, []);

  const [leadStatus, setLeadStatus] = useState("All Lead"); // Track the selected lead status
  const [assignedTo, setAssignedTo] = useState("Assigned to"); // Track the selected assigned user

  function handleLeadStatusSelection(status) {
    setLeadStatus(status); // Update leadStatus state
    handle_LeadStatus(status); // Apply filter based on selected status
  }

  // Function to filter leads
  function handle_LeadStatus(statusValue) {
    if (activeButtonId === 1) {
      let filteredLeads;
      if (statusValue === "All Lead" || statusValue === null) {
        // Show all leads when "All Lead" is selected or reset
        filteredLeads = getleads;
      } else {
        // Apply filtering for other statuses
        filteredLeads = getleads.filter(
          (lead) => lead.leadesStatus === statusValue
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
          (lead) => lead.leadesStatus === statusValue
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
          (lead) => lead.assigned_To === assignedToValue
        );
      }
      setFilteredLeads(filtered); // Set the filtered result
    }
    if (activeButtonId === 3) {
      let filtered = getleads;
      if (assignedToValue !== null && assignedToValue !== "Assigned to") {
        filtered = filtered.filter(
          (lead) => lead.assigned_To === assignedToValue
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

  //-----------------------------------------------> ALL-> LEADS <-functionality <-----------------------------------------------

  const [allLeaddropDown, setAllLeaddropDown] = useState(false);
  const toggleMenuAllLead = () => {
    setAllLeaddropDown(!allLeaddropDown);
  };

  //-----------------------------------------------> ALL LEADS DATA <-----------------------------------------------
  //----------------STATUS DROPDOWN----------------
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
        config
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

  const [allAssigned_To_DROPDOWN, setallAssigned_To_DROPDOWN] = useState(false);
  const toggleMenuAssigned_To = () => {
    setallAssigned_To_DROPDOWN(!allAssigned_To_DROPDOWN);
  };

  //-----------------------------------------------> ALL ASSIGNED_TO DATA <-----------------------------------------------
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
        config
      );
      setallAssigned_To_Data(response.data.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  }

  useEffect(() => {
    handleallAssigned_To();
  }, []);

  //------------------------------------------------------------------------------------------------

  //------------------------------------------------------------------------------------------------
  //----------------STRIPE BAR DROPDOWN----------------
  const stripeBar = [
    { key: 1, value: "Table View" },
    { key: 2, value: "Grid View" },
  ];

  const [stripeBardropDown, setstripeBardropDown] = useState(false);

  const handleStripeButton = (value) => {
    setSelectedViewValue(value);
  };

  const togglestripeBar = () => {
    setstripeBardropDown(!stripeBardropDown);
  };

  const [dropLogodropDown, setdropLogodropDown] = useState(false);

  const togglesdropLogo = () => {
    setdropLogodropDown(!dropLogodropDown);
  };

  const [selectedViewValue, setSelectedViewValue] = useState(
    stripeBar[0].value
  );

  //------------------------------------------------------------------------------------------------
  //----------------ACTION BAR DROPDOWN----------------
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

  const handleActionButton = async (value, leadId) => {
    // ---------------------->MASS DELETE FUNCTIONALITY<----------------------
    if (value === "Mass Delete") {
      const userConfirmed = confirm(
        "Are you sure you want to Delete the selected Leads?"
      );
      if (userConfirmed) {
        massDelete();
      }
    }

    // ---------------------->MASS E-Mail FUNCTIONALITY<----------------------
    if (value === "Mass Email") {
      const userConfirmed = confirm(
        "Are you sure you want to Send E-Mail to the selected Data?"
      );
      if (userConfirmed) {
        openMassEmailModal(selectedEmails);
      }
    }

    // ---------------------->SHEET VIEW FUNCTIONALITY*<----------------------
    if (value === "Sheet View") {
      const userConfirmed = confirm(
        "Are you sure you want to export the selected Leads?"
      );
      if (userConfirmed) {
        exportToExcel();
      }
    }

    // ---------------------->PRINT VIEW FUNCTIONALITY*<----------------------
    if (value === "Print View") {
      const userConfirmed = confirm(
        "Are you sure you want to export the selected Leads?"
      );
      if (userConfirmed) {
        exportToPDF();
      }
    }

    // ---------------------->Convert Lead to Contact FUNCTIONALITY*<----------------------
    if (value === "Convert Lead to Contact") {
      const userConfirmed = confirm(
        "Are you sure you want to convert this lead to a contact?"
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
        config
      );
      alert("Mass Deleted run");
      handleLead();
      console.log(response);

      setGetleads((prevLeads) =>
        prevLeads.filter((lead) => !selectedIds.includes(lead.id))
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
    const leadsToExport = currentLeads.filter((lead) =>
      selectedIds.includes(lead.id)
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
      selectedIds.includes(lead.id)
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
        config
      );

      setGetleads((prevLeads) =>
        prevLeads.filter((lead) => !selectedIds.includes(lead.id))
      );
      setSelectedIds([]);

      if (response.status === 200) {
        showSuccessToast("Lead has been successfully converted to a contact.");
      } else {
        showErrorToast(
          `Failed to convert lead: ${response.data.message || "Unknown error"}`
        );
      }
    } catch (error) {
      showErrorToast(
        "An error occurred while converting the lead. Please try again later."
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
        : [...prevSelected, leadId]
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
        prevSelected.filter((id) => !currentPageIds.includes(id))
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
    () => parseInt(localStorage.getItem("activeButtonId")) || 1
  );

  const handleDynamicButtonsClick = (id) => {
    setActiveButtonId(id); // Update state first
    localStorage.setItem("activeButtonId", id);
    handleLead(id); // Pass the clicked button's id directly
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
          lead.userName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    } else {
      // General filtering for other lead types
      filtered = getleads.filter(
        (lead) =>
          lead.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
          lead.mobileNo?.includes(searchTerm)
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
        config
      );
      console.log("Permission Data : ", response.data.data);
      const permissionsList = response?.data?.data;

      if (permissionsList) {
        const serviceBoxPermissions = permissionsList.find(
          (item) => item.moduleName === "Leads"
        );

        if (serviceBoxPermissions) {
          const permissionsArray = serviceBoxPermissions.permissions.split(",");
          setPermissions(permissionsArray);

          console.log("List : ", permissionsArray);

          //------------------------------------------------------ Set permissions ------------------------------------------------
          if (permissionsArray.includes("View Leads") || businessRole==="Admin") {
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
      <div className="min-h-screen flex flex-col m-3 ">
        {/* -----------------------------------Mass Email Modal------------------------------ */}
        {isModalOpen && (
          <MassEmail emails={selectedEmails} onClose={closeModal} />
        )}
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
        <div className="flex justify-between px-3 py-2 items-center bg-white  rounded-lg">
          {/* PART-I */}
          {/* container- Alleads, search */}
          <div className="flex gap-3 items-center justify-center ">
            {/* PART-I */}
            {/* All Lead  DropDown*/}
            <div
              className="relative"
              onClick={toggleMenuAllLead}
              onMouseLeave={() => setAllLeaddropDown(false)}
            >
              <button
                className="py-2 px-4 border rounded-md flex justify-between items-center min-w-40 max-w-44 truncate"
                id="dropdownDefaultButton"
                type="button"
              >
                {leadStatus}
                <FaAngleDown className="ml-2 text-gray-900" />
              </button>
              {allLeaddropDown && (
                <div className="absolute bg-white border border-gray-300 rounded-md top-10 z-10">
                  <ul className=" text-sm text-gray-700">
                    {allLeadData.map((item) => (
                      <li
                        key={item.id}
                        className="block py-2 w-56 px-4  hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                        onClick={() => handleLeadStatusSelection(item.status)} // Correct selection logic
                      >
                        {item.status}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* PART-I-ii */}
            {/* All ASSIGNED_TO  DropDown*/}
            <div
              className="relative"
              onClick={toggleMenuAssigned_To}
              onMouseLeave={() => setallAssigned_To_DROPDOWN(false)}
            >
              <button
                className="py-2 px-4 border rounded-md  flex justify-between items-center min-w-36 max-w-44"
                id="dropdownDefaultButton"
                type="button"
              >
                {assignedTo}
                <FaAngleDown className="ml-2 text-gray-900" />
              </button>
              {allAssigned_To_DROPDOWN && (
                <div className="absolute bg-white border border-gray-300 rounded-md top-10 z-10">
                  <ul className=" text-sm text-gray-700">
                    {allAssigned_To_Data.map((item) => (
                      <li
                        key={item.id}
                        className="block w-56 px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                        onClick={() => handleAssignedToSelection(item.userName)} // Correct selection logic
                      >
                        {item.userName}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {/* PART-I */}
            {/* Search Box */}

            <SearchElement
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {fetchLead || businessRole==="Admin" ? (
              <div className="flex gap-1">
                <button
                  className="py-2 px-4 border rounded-lg gap-2 flex justify-between items-center text-white bg-blue-600"
                  onClick={() => setIsFetchModalOpen(true)}
                >
                  Fetch Leads
                </button>
              </div>
            ) : (
              ""
            )}
          </div>

          {/* PART-II */}
          <div className="flex gap-3 items-center justify-center">
            {/* PART-II */}
            {/* Stripe-BarDropDown */}
            {activeButtonId === 2 || activeButtonId === 4 ? (
              ""
            ) : (
              <div
                className="relative"
                onClick={togglestripeBar}
                onMouseLeave={() => setstripeBardropDown(false)}
              >
                <button
                  className="py-3 px-4 border rounded-md gap-2 flex justify-between items-center"
                  id="dropdownDefaultButton"
                  type="button"
                >
                  <FaBars />
                  <FaAngleDown className="text-gray-900" />
                </button>
                {stripeBardropDown && (
                  <div className="absolute w-56  bg-white border border-gray-300 rounded-md top-10 z-10">
                    <ul className="text-sm text-gray-700">
                      {stripeBar.map(({ key, value }) => (
                        <li
                          key={key}
                          className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                          onClick={() => handleStripeButton(value)}
                        >
                          {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            {/* PART-II */}
            {/*  Create Lead */}
            {createLead || businessRole==="Admin" ?  (
              <div className="flex gap-1">
                <Link to="/panel/createlead">
                  <button
                    className="py-2 px-4 border rounded-lg gap-2 flex justify-between items-center text-white bg-blue-600"
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
            {/* PART-II */}
            {/*-------Action DropDown */}
            <div
              className="relative"
              onClick={toggleActionsMenuLogo}
              onMouseLeave={() => setdropActionsMenudropDown(false)}
            >
              <button
                className="py-2 px-4 border rounded-lg gap-2 flex justify-between items-center text-blue-600  border-blue-600"
                id="dropdownDefaultButton"
                type="button"
              >
                Actions
                <FaAngleDown className="text-gray-900" />
              </button>
              {dropActionsMenudropDown && (
                <div className="absolute w-56  bg-white border border-gray-300 rounded-md top-10 right-0 z-10">
                  <ul className="text-sm text-gray-700">
                    {dropActionsMenu.map(({ key, value }) =>
                      permissions.includes(value) || businessRole==="Admin" ? (
                        <li
                          key={key}
                          className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                          onClick={() => handleActionButton(value)}
                        >
                          {value}
                        </li>
                      ) : null
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* 2nd bar Leads and lenghtLeads*/}{" "}
        {/* 2nd bar Leads and lenghtLeads*/}{" "}
        {/* 2nd bar Leads and lenghtLeads*/}{" "}
        {/* 2nd bar Leads and lenghtLeads*/}{" "}
        {/* 2nd bar Leads and lenghtLeads*/}{" "}
        {/* 2nd bar Leads and lenghtLeads*/}
        <div className="mt-3 flex justify-between items-center gap-3">
          <div className="flex gap-3 items-center justify-center">
            <h1 className="text-3xl font-medium ">Leads</h1>
            <h1 className="bg-blue-600 text-white px-2 py-2 min-w-10 text-center rounded-md text-md shadow-md">
              {getleads?.length}
            </h1>

            {/* BUTTONS */}
            <div className="flex gap-2">
              {dynamicButtons.map(({ id, name }) =>
                permissions.includes(name) || name === viewName || businessRole==="Admin" ? (
                  <button
                    key={id}
                    onClick={() => handleDynamicButtonsClick(id)}
                    className={`px-2 py-1.5 rounded font-light text-md ${
                      activeButtonId === id
                        ? "bg-cyan-500 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {name}
                  </button>
                ) : null
              )}
            </div>
          </div>

          <div>
            {/* ------------------- Filter by date ----------------- */}
            {activeButtonId === 1 ? (
              <div className="flex bg-white border-2 border-gray-300 py-2 pr-2 rounded-lg justify-center items-center">
                {/* Filter Icon Button */}
                <button className="border-r border-gray-500 px-3">
                  <ImFilter />
                </button>

                {/* Date Range Filter Button */}
                <button className="border-r border-gray-500 px-3">
                  Filter By
                </button>

                {/* Date Range Inputs */}
                <div className="px-3 flex items-center gap-2">
                  <input
                    type="date"
                    value={startDate}
                    className="border rounded px-2 py-1"
                    onChange={(e) => setStartDate(e.target.value)}
                  />

                  <input
                    type="date"
                    value={endDate}
                    className="border rounded px-2 py-1"
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>

                <div
                  className="p-1 border rounded cursor-pointer  hover:shadow-md"
                  onClick={handleResetFilter}
                >
                  <TbRefresh size={25} />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        {/* ---------------------Multi Assign and Multi Change------------------- */}
        {/* {activeButtonId === 3 && (
        <>
          <div className="relative text-left">
            <select
              value={selectedValue}
              onChange={handleChange}
              className="block w-max px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {leadOperations.map((operation) => (
                <option key={operation.key} value={operation.value}>
                  {operation.value}
                </option>
              ))}
            </select>
          </div>
        </>
      )} */}
        {activeButtonId === 3 && (
          <div
            className="relative my-1"
            onClick={toggleDropdownSelectOperation}
            onMouseLeave={() => setSelectOperationDropdown(false)}
          >
            <button
              className="py-2 px-4 border rounded-lg gap-2 flex justify-between bg-white items-center text-gray-600 shadow-md"
              id="dropdownDefaultButton"
              type="button"
            >
              Select Lead Operation Type
              <FaAngleDown className="text-gray-900" />
            </button>
            {selectOperationDropdown && (
              <div className="absolute w-56 py-2 bg-white border border-gray-300 rounded-md top-10 z-10">
                <ul className="text-sm text-gray-700 ">
                  {leadOperations.map(({ key, value }) => (
                    <li
                      key={key}
                      onClick={() => handleSelect(value)}
                      className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
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
        {viewLeads || businessRole==="Admin" ? (
          <div className="overflow-x-auto mt-3 ">
            <div className="min-w-full overflow-hidden rounded-md shadow-lg">
              {selectedViewValue === "Table View" && activeButtonId === 1 && (
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="border-gray-300 border-b-2">
                      {/* CHECKBOX */}
                      <th className="px-2 py-3">
                        <input
                          type="checkbox"
                          checked={isSelectAllChecked}
                          onChange={handleSelectAllCheckbox}
                        />
                      </th>
                      <th className="px-1 py-3 text-left border-r font-medium max-w-56  ">
                        <div className="flex justify-between">
                          <span>Lead Name</span>
                          <span className="flex items-center">
                            <FaAngleDown />
                          </span>
                        </div>
                      </th>
                      {business === "Brokerage" ? (
                        ""
                      ) : (
                        <th className="px-1 py-3 text-left border-r font-medium">
                          <div className="flex justify-between items-center max-w-56">
                            <span>Email</span>
                          </div>
                        </th>
                      )}
                      <th className="px-1 py-3 text-left border-r font-medium">
                        <div className="flex justify-between items-center">
                          <span>Phone No</span>
                        </div>
                      </th>
                      {business === "Brokerage" ? (
                        ""
                      ) : (
                        <th className="px-1 py-3 text-left border-r font-medium">
                          <div className="flex justify-between items-center">
                            <span>Follow Up</span>
                          </div>
                        </th>
                      )}
                      <th className="px-1 py-3 text-left border-r font-medium max-w-36 min-w-32">
                        <div className="flex justify-between items-center">
                          <span>Segments</span>
                        </div>
                      </th>

                      {business === "Brokerage" ? (
                        <>
                          {adminRole === "Admin" ? (
                            <th className="px-1 py-3 text-left border-r font-medium w-48">
                              <div className="flex justify-between items-center">
                                <span>Managed By</span>
                              </div>
                            </th>
                          ) : (
                            ""
                          )}
                        </>
                      ) : (
                        <th className="px-1 py-3 text-left border-r font-medium w-48">
                          <div className="flex justify-between items-center">
                            <span>Managed By</span>
                          </div>
                        </th>
                      )}

                      <th className="w-32">
                        <VscSettings className="mx-auto " size={20} />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentLeads?.map((item) => {
                      const matchedUser =
                        users?.length > 0
                          ? users?.find(
                              (user) => user?.userName === item?.assigned_To
                            )
                          : [];
                      const role = matchedUser?.role;
                      const roleColor = getRoleColorByIndex(role?.length); // Get color for the role
                      return (
                        <tr
                          key={item.id}
                          className="cursor-pointer  border-gray-300 border-b hover:bg-gray-100"
                          // onClick={() => handleClick(item)}
                        >
                          {/* CHECKBOX */}
                          <td className="px-2 py-3 text-center">
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(item.id)}
                              onClick={(e) => handleOnCheckBox(e, item)}
                            />
                          </td>
                          {/* CONTACT NAME */}
                          <td
                            onClick={edit || businessRole==="Admin" ? () => handleClick(item) : undefined}
                            className="px-1 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600"
                          >
                            <div className="text-center">
                              <span className="hover:text-blue-500 hover:underline hover:font-semibold text-md">
                                {item.name}
                              </span>
                            </div>
                            <div className="flex justify-start text-center mx-auto w-[80%]">
                              <div className="bg-cyan-500 text-center text-xs  text-white  rounded-full w-full  py-1 px-1 ">
                                {item.leadesStatus}
                              </div>
                            </div>
                          </td>

                          {/* EMAIL */}

                          {business === "Brokerage" ? (
                            ""
                          ) : (
                            <td className="px-1 py-4 border-b text- border-gray-300 text-sm  break-all max-w-48 min-w-24">
                              <a
                                href={`mailto:${item.email}`}
                                onClick={(event) => event.stopPropagation()}
                              >
                                {item.email}
                              </a>
                            </td>
                          )}
                          <td className="px-1 py-4 border-b border-gray-300 text-sm">
                            <div className="flex gap-2 items-center">
                              <a
                                href={`tel:${item.mobileNo}`}
                                onClick={(event) => event.stopPropagation()}
                              >
                                {item.mobileNo}
                              </a>
                              <MdCall className="text-red-600" />
                            </div>
                          </td>
                          {/*call_bck_DateTime*/}
                          {business === "Brokerage" ? (
                            ""
                          ) : (
                            <td className="px-1 py-4 border-b border-gray-300 text-sm">
                              {
                                item.call_bck_DateTime
                                  ?.replace("T", " ")
                                  .split(":00")[0]
                              }
                            </td>
                          )}
                          {/* Segments */}
                          <td className="px-1 py-4 border-b border-gray-300 text-sm max-w-36 min-w-24">
                            <div>
                              {item.segments && (
                                <span>
                                  {item.segments
                                    .filter((segment) => segment.length > 1)
                                    .join(", ")}
                                </span>
                              )}
                            </div>
                          </td>
                          {/* Assigned To and User Role */}

                          {business === "Brokerage" ? (
                            <>
                              {adminRole === "Admin" ? (
                                <td className="px-2 py-4 border-b border-gray-300 text-sm text-center">
                                  {matchedUser && (
                                    <div
                                      className="text-xs font-semibold text-white px-2 py-2 rounded-full w-[100%] bg-cyan-500"
                                      style={{
                                        backgroundColor: roleColor
                                          ? roleColor
                                          : "",
                                        borderRadius: "8px",
                                        padding: 8,
                                        textAlign: "center",
                                      }}
                                    >
                                      {item.assigned_To} - ({matchedUser?.role})
                                    </div>
                                  )}
                                </td>
                              ) : (
                                ""
                              )}
                            </>
                          ) : (
                            <td className="px-2 py-4 border-b border-gray-300 text-sm text-center">
                              {matchedUser && (
                                <div
                                  className="text-xs font-semibold text-white px-2 py-2 rounded-full w-[100%] bg-cyan-500"
                                  style={{
                                    backgroundColor: roleColor ? roleColor : "",
                                    borderRadius: "8px",
                                    padding: 8,
                                    textAlign: "center",
                                  }}
                                >
                                  {item.assigned_To} - ({matchedUser?.role})
                                </div>
                              )}
                            </td>
                          )}
                          {/*------------------<- Create-SO->------------*/}
                          {/*------------------------------------------------------------------------------------------------------------------------------------------------*/}
                          {createSO || businessRole==="Admin" ? (
                            <td className="text-center">
                              <button
                                className={business === "Brokerage" ? "" : ""}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/panel/lead/create/so/${item.id}`);
                                }}
                              >
                                {/* SO */}
                                {business === "Brokerage" ? (
                                  <span className="text-white text-xs rounded p-2   bg-blue-600 shadow-md rounded hover:bg-blue-500">
                                    Create Client
                                  </span>
                                ) : (
                                  <>
                                    <span className=" text-white text-xm rounded p-1 bg-blue-600 shadow-md rounded hover:bg-blue-500">
                                      SO
                                    </span>
                                  </>
                                )}
                              </button>
                            </td>
                          ) : (
                            <td></td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}

              {/* ------------GRID------------ */}
              {/* ------------GRID------------ */}
              {/* ------------GRID------------ */}
              {/* ------------GRID------------ */}
              {/* ------------GRID------------ */}
              {selectedViewValue === "Grid View" && (
                <>
                  <div className="min-w-full">
                    <div className="grid grid-cols-3 gap-3">
                      {/*---------Card starts Here */}
                      {currentLeads.map((item) => (
                        <div
                          className="flex flex-col gap-2 bg-white px-2 py-3 rounded-lg border-2"
                          key={item.id}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col grow">
                              <div className="flex justify-between font-medium">
                                <span className="text-indigo-500">
                                  {item.name}
                                </span>
                                <BiEdit
                                  size={25}
                                  className="bg-white rounded-full shadow-md text-blue-500 p-1"
                                  onClick={() => handleClick(item)}
                                />
                              </div>
                              <div className="flex items-center gap-2 text-sm font-medium">
                                {item.leadesStatus}
                              </div>
                            </div>
                          </div>
                          <div className="flex px-2 py-1 bg-gray-100 border-2 items-center rounded-lg">
                            <div className="w-2/4 text-gray-500 text-sm">
                              Company name
                            </div>
                            <div className="2-2/4 font-medium text-sm">
                              {item.company}
                            </div>
                          </div>

                          <div className="flex px-2 py-1 bg-gray-100 border-2 items-center rounded-lg">
                            <div className="w-2/4 text-gray-500 text-sm">
                              Title
                            </div>
                            <div className="2-2/4 font-medium text-sm">
                              {item.tital}
                            </div>
                          </div>

                          <div className="flex px-2 py-1 bg-gray-100 border-2 items-center rounded-lg">
                            <div className="w-2/4">
                              <IoIosMail className="text-2xl" />
                            </div>
                            <div className="2-2/4 font-medium  text-sm">
                              {item.email}
                            </div>
                          </div>

                          <div className="flex px-2 py-1 bg-gray-100 border-2 items-center rounded-lg">
                            <div className="w-2/4">
                              <FaPhoneAlt className="text-xl" />
                            </div>
                            <div className="2-2/4 font-medium text-sm">
                              {item.phoneNo}
                            </div>
                          </div>
                          <div className="flex px-2 py-1 bg-gray-100 border-2 items-center rounded-lg">
                            <div className="w-2/4 text-gray-500 text-sm">
                              Lead Source
                            </div>
                            <div className="2-2/4 font-medium text-sm">
                              {item.leadsSource}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* LEAD OPERATIONS TABLE */}
            <div className="min-w-full overflow-hidden rounded-md">
              {/* MONITORING TABLE */}
              {selectedViewValue === "Table View" && activeButtonId === 2 && (
                <UploadLead />
              )}
            </div>

            {/* LEAD ACTION TABLE */}
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

            {selectedViewValue === "Table View" && (
              <>
                <div
                  className={`flex justify-end m-4 ${
                    activeButtonId === 2 ? "hidden" : "flex"
                  }`}
                >
                  {/* //---------------------->---------------------->PAGINATION-RENDERER<----------------------<---------------------- */}
                  <nav className="flex items-center justify-center text-center  mx-auto gap-2 mt-4">
                    {/* /---------------------->Previous Button <----------------------< */}
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      className={`p-1 shadow-md rounded-full text-white ${
                        currentPage === 1
                          ? "border-gray-200 border-2"
                          : "bg-cyan-500 border-2 border-gray-100"
                      }`}
                      disabled={currentPage === 1}
                    >
                      <GrFormPrevious size={25} />
                    </button>

                    {/* /---------------------->Dynamic Page Numbers <----------------------< */}
                    {Array.from({ length: totalPage }, (_, i) => i + 1).map(
                      (page) => {
                        // Logic for ellipsis and showing only a subset of pages
                        if (
                          page === 1 ||
                          page === totalPage ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <button
                              key={page}
                              onClick={() => paginate(page)}
                              className={`px-4 py-2 rounded mx-1 ${
                                currentPage === page
                                  ? "bg-blue-600 text-white"
                                  : "bg-white text-gray-700 border"
                              }`}
                            >
                              {page}
                            </button>
                          );
                        } else if (
                          (page === currentPage - 2 && page > 1) || // Add ellipsis before current
                          (page === currentPage + 2 && page < totalPage) // Add ellipsis after current
                        ) {
                          return (
                            <span key={page} className="px-2 text-gray-500">
                              ...
                            </span>
                          );
                        }
                        return null;
                      }
                    )}

                    {/* Next Button */}
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      className={`p-1 shadow-md rounded-full text-white${
                        currentPage === totalPage
                          ? " border-gray-200 border-2"
                          : " bg-cyan-500 border-2 border-gray-100"
                      }`}
                      disabled={currentPage === totalPage}
                    >
                      <GrFormNext size={25} />
                    </button>
                  </nav>
                </div>
                <div
                  className={`flex justify-center items-center m-4 ${
                    activeButtonId === 2 ? "hidden" : "flex"
                  }`}
                >
                  {/* Additional Content (if any) */}
                </div>
              </>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
