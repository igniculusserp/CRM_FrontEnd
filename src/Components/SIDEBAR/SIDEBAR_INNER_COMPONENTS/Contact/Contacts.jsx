//react
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//external Packages
import axios from "axios";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

//React Icons
import { FaAngleDown, FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";
import { ImFilter } from "react-icons/im";
import { MdCall } from "react-icons/md";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { TbRefresh } from "react-icons/tb";

//Objects Imported
import { tenant_base_url, protocal_url } from "../../../../Config/config";

import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

import { SearchElement } from "../SearchElement/SearchElement";

import MassEmail from "../MassEmail/MassEmail";

//-----------------------------ToastContainer-----------------------------
import { ToastContainer } from "react-toastify";
import {
  showSuccessToast,
  showErrorToast,
} from "./../../../../utils/toastNotifications";
import { FaTableList } from "react-icons/fa6";
import { IoGrid, IoGridSharp } from "react-icons/io5";

const name = getHostnamePart();

export default function Contact() {
  const navigate = useNavigate(); // Add this line

  // Mass Email
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState([]);

  //This is to store the upcoming data from API
  const [getleads, setGetleads] = useState([]);

  //DND
  const [users, setUsers] = useState([]);

  //------- Business Type --------
  const [business, setBusiness] = useState("");
  const businessType = localStorage.getItem("businessType");

  //created such that to filter leads according to leadStatus
  const [filteredLeads, setFilteredLeads] = useState([]); // Filtered leads

  //------------------------------------------------------------------------------------------------
  //----------------GET----------------
  async function handleLead() {
    const bearer_token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Contact/contacts/byusertoken`,
        config,
      );

      const data = response.data.data;
      setGetleads(data);
      setFilteredLeads(data); // Initialize filtered leads

      // setfilteredLeads_assigned_To(data)
    } catch (error) {
      console.error("Error fetching leads:", error);
      // Optionally, set an error state to display a user-friendly message
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

  useEffect(() => {
    handleLead();
    getAllUsers();
    //------- Business Type --------
    setBusiness(businessType);
  }, []);

  const [leadStatus, setLeadStatus] = useState("All Lead"); // Track the selected lead status
  const [assignedTo, setAssignedTo] = useState("Managed By"); // Track the selected assigned user

  // Function to handle both filters
  function handle_LeadStatus(statusValue) {
    let filteredLeads = getleads;

    // Filter by leadStatus if it's not 'ALL' or null
    if (statusValue !== null && statusValue !== "All Leads") {
      filteredLeads = filteredLeads.filter(
        (lead) => lead.leadesStatus === statusValue,
      );
      console.log(filteredLeads);
    }
    setFilteredLeads(filteredLeads); // Set the filtered results
  }

  function handle_AssignedTo(assignedToValue) {
    let filteredLeads = getleads;
    if (assignedToValue !== null && assignedToValue !== "Assigned to") {
      filteredLeads = filteredLeads.filter(
        (lead) => lead.assigned_To === assignedToValue,
      );
    }
    setFilteredLeads(filteredLeads); // Set the filtered result
  }

  // Handle selecting a lead status
  function handleLeadStatusSelection(status) {
    setLeadStatus(status); // Update leadStatus state
    handle_LeadStatus(status); // Apply both filters
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
        config,
      );
      setallLeadData(response.data.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
      // Optionally, set an error state to display a user-friendly message
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
        config,
      );
      setallAssigned_To_Data(response.data.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
      // Optionally, set an error state to display a user-friendly message
    }
  }

  useEffect(() => {
    handleallAssigned_To();
  }, []);

  //------------------------------------------------------------------------------------------------
  //----------------STRIPE BAR DROPDOWN----------------
  const stripeBar = [
    { key: 1, value: "Table View", icon: <FaTableList/> },
    { key: 2, value: "Grid View", icon :  <IoGrid/> },
  ];

  const [stripeBardropDown, setstripeBardropDown] = useState(false);

  const handleStripeButton = (value) => {
    console.log(value);
    setSelectedViewValue(value);
  };

  const togglestripeBar = () => {
    setstripeBardropDown(!stripeBardropDown);
  };

  const [selectedViewValue, setSelectedViewValue] = useState(
    stripeBar[0].value,
  );

  //------------------------------------------------------------------------------------------------
  //----------------ACTION BAR DROPDOWN----------------
  const dropActionsMenu = [
    { key: 1, value: "Mass Delete" },
    { key: 3, value: "Mass E-Mail" },
    { key: 4, value: "Export to Excel" },
    { key: 5, value: "Export to PDF" },
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
        data: { contactsIds: selectedIds },
      };

      const response = await axios.delete(
        `${protocal_url}${name}.${tenant_base_url}/Contact/contact/massdelete`,
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
    navigate(`/panel/editcontact/${item.id}`);
  };

  // ---------------------->MASS Email FUNCTIONALITY---<----------------------

  const openMassEmailModal = () => {
    if (selectedEmails.length > 0) {
      setIsModalOpen(true); // Open the modal
    } else {
      alert("Selected Entity dose not have E-Mail Address.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  //---------------------->SHEET VIEW FUNCTIONALITY---###FUNCTION###<----------------------
  //-------> XLSX used here
  const exportToExcel = () => {
    // Filter currentLeads based on selectedIds
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
    "#65a30d", // LimeGreen
    "#7c3aed", // MediumPurple
    "#0369a1", //Sky
    "#e11d48", //Rose
  ];

  // Function to get the color for a role based on its index
  const getRoleColorByIndex = (index) => {
    return roleColors[index % roleColors?.length]; // Use modulo for wrapping
  };

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

  //---------------------->---------------------->̧CHECKBOX<----------------------<----------------------

  //---------------------->---------------------->̧CHECKBOX -> SINGLE<----------------------<----------------------
  const [selectedIds, setSelectedIds] = useState([]);
  const handleOnCheckBox = (e, item) => {
    e.stopPropagation();

    // Toggle selected IDs
    setSelectedIds((prevSelected) =>
      prevSelected.includes(item.id)
        ? prevSelected.filter((id) => id !== item.id)
        : [...prevSelected, item.id],
    );

    // Update selected emails
    setSelectedEmails((prevSelectedEmails) => {
      const newSelectedEmails = prevSelectedEmails.includes(item.email)
        ? prevSelectedEmails.filter((email) => email !== item.email)
        : [...prevSelectedEmails, item.email];

      // Log the updated selectedEmails
      console.log("Updated Selected Emails:", newSelectedEmails);
      return newSelectedEmails;
    });
  };

  //---------------------->---------------------->̧CHECKBOX -> MULTIPLE<----------------------<----------------------
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
  const handleSelectAllCheckbox = (e) => {
    e.stopPropagation();
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
      // Remove all current page leads from selectedIds
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
        const callbackDate = new Date(follow.trialStartDate);
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

  // ------------------------------ Search Function ----------------------------------

  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    const filtered = getleads.filter(
      (lead) =>
        lead.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        lead.mobileNo?.includes(searchTerm),
    );
    setFilteredLeads(filtered);
  }, [searchTerm, getleads]);

  //------------------------------------------------------Filter Reset Settings ---------------------------------------------

  const handleResetFilter = () => {
    setFilteredLeads(getleads);
    setLeadStatus("All Lead");
    setAssignedTo("Managed By");
  };

  //---------------------------------------------------- Roles & Permissions ----------------------------------------------------

  const businessRole = localStorage.getItem("businessRole");
  const [permissions, setPermissions] = useState([]);
  const [edit, setEdit] = useState(false);
  const [createSO, setCreateSO] = useState(false);
  const [viewContact, setViewContact] = useState(false);

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
          (item) => item.moduleName === "Contacts",
        );

        if (serviceBoxPermissions) {
          const permissionsArray = serviceBoxPermissions.permissions.split(",");
          setPermissions(permissionsArray);

          console.log("List : ", permissionsArray);

          //------------------------------------------------------ Set permissions ------------------------------------------------

          setEdit(permissionsArray.includes("Edit Contact"));
          setCreateSO(permissionsArray.includes("Create Sales order"));
          setViewContact(permissionsArray.includes("View Contacts"));
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
    <div className="flex flex-col min-h-screen m-3">
      {/* Render the modal only when `isModalOpen` is true */}
      {isModalOpen && (
        <MassEmail
          emails={selectedEmails}
          onClose={closeModal} // Pass function to close modal
        />
      )}
      {/* containerbar*/}
      <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2 bg-white rounded-lg">
        {/* PART-I */}
        {/* container- Alleads, search */}
        <div className="flex flex-wrap items-center justify-start gap-3 contact_Dropdown_Main_Container">
          {/* PART-I */}
          {/* All Lead DropDown*/}
          <div
            className="relative contact_Dropdown_Container whitespace-nowrap"
            onClick={toggleMenuAllLead}
            onMouseLeave={() => setAllLeaddropDown(false)}
          >
            <button
              className="flex items-center justify-between px-4 py-2 truncate border rounded-md contact_Dropdown_Button min-w-40"
              id="dropdownDefaultButton"
              type="button"
            >
              {leadStatus}
              <FaAngleDown className="ml-2 text-gray-900" />
            </button>
            {allLeaddropDown && (
              <div className="absolute z-10 bg-white border border-gray-300 rounded-md top-10">
                <ul className="text-sm text-gray-700">
                  {allLeadData.map((item) => (
                    <li
                      key={item.id}
                      className="block w-56 px-4 py-2 border-b cursor-pointer hover:bg-cyan-500 hover:text-white"
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
          {/* All MANAGED_BY  DropDown*/}
          <div
            className="relative contact_Dropdown_Container whitespace-nowrap"
            onClick={toggleMenuAssigned_To}
            onMouseLeave={() => setallAssigned_To_DROPDOWN(false)}
          >
            <button
              className="flex items-center justify-between px-4 py-2 border rounded-md contact_Dropdown_Button min-w-36"
              id="dropdownDefaultButton"
              type="button"
            >
              {assignedTo}
              <FaAngleDown className="ml-2 text-gray-900" />
            </button>
            {allAssigned_To_DROPDOWN && (
              <div className="absolute z-10 bg-white border border-gray-300 rounded-md top-10">
                <ul className="text-sm text-gray-700">
                  {allAssigned_To_Data.map((item) => (
                    <li
                      key={item.id}
                      className="block w-56 px-4 py-2 border-b cursor-pointer hover:bg-cyan-500 hover:text-white"
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
        </div>

        {/* PART-II */}
        <div className="flex items-center justify-start gap-3 action_Button_Main_Container">
          {/* PART-II */}
          {/* Stripe-BarDropDown */}
          <div
            className="relative hide_Component"
            onClick={togglestripeBar}
            onMouseLeave={() => setstripeBardropDown(false)}
          >
            <button
              className="flex items-center justify-between gap-2 px-4 py-3 border rounded-md"
              id="dropdownDefaultButton"
              type="button"
            >
              <FaBars />
              <FaAngleDown className="text-gray-900" />
            </button>
            {stripeBardropDown && (
              <div className="absolute right-0 z-10 w-32 bg-white border border-gray-300 rounded-md top-10">
                <ul className="text-sm text-gray-700">
                  {stripeBar.map(({ key, value, icon }) => (
                    <li
                    key={key}
                    className="flex items-center gap-2 py-2 border-b cursor-pointer hover:bg-cyan-500 hover:text-white"
                    onClick={() => handleStripeButton(value)}
                  >
                    <div className="flex items-center justify-center w-6 h-6 mx-1 text-lg" >
                      {icon}
                    </div>
                    <div className="flex-1 text-left">{value}</div>
                  </li>
                  
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* PART-II */}
          {/*-------Action DropDown */}
          <div
            className="relative action_Button_Container"
            onClick={toggleActionsMenuLogo}
            onMouseLeave={() => setdropActionsMenudropDown(false)}
          >
            <button
              className="flex items-center justify-between gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg action_Button"
              id="dropdownDefaultButton"
              type="button"
            >
              Actions
              <FaAngleDown className="text-gray-900" />
            </button>
            {dropActionsMenudropDown && (
              <div className="absolute right-0 z-10 w-56 bg-white border border-gray-300 rounded-md top-10">
                <ul className="text-sm text-gray-700">
                  {dropActionsMenu.map(({ key, value }) =>
                    permissions.includes(value) || businessRole === "Admin" ? (
                      <li
                        key={key}
                        className="block px-4 py-2 border-b cursor-pointer hover:bg-cyan-500 hover:text-white"
                        onClick={() => handleActionButton(value)}
                      >
                        {value}
                      </li>
                    ) : null,
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* 2nd bar Leads and lenghtLeads*/} {/* 2nd bar Leads and lenghtLeads*/}{" "}
      {/* 2nd bar Leads and lenghtLeads*/} {/* 2nd bar Leads and lenghtLeads*/}{" "}
      {/* 2nd bar Leads and lenghtLeads*/} {/* 2nd bar Leads and lenghtLeads*/}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
        <div className="flex gap-3">
          <h1 className="text-3xl font-medium">Contacts</h1>
          <h1 className="p-2 text-sm text-center text-white bg-blue-600 rounded shadow-md min-w-10">
            {/*  ------------------------------------------------------------------------------------------------*/}
            {/* ------------------- Length ----------------- */}
            {getleads?.length}
          </h1>
        </div>

        <div className="date_Filter_Main_Container">
          {/* ------------------- Filter by date ----------------- */}
          <div className="flex items-center justify-between p-2 bg-white border-2 border-gray-300 rounded-lg date_Filter_Main_Container">
            {/* Filter Icon Button */}
            <div className="flex items-center">
              <button className="pr-2 border-r border-gray-500">
                <ImFilter className="filter_Image_Size" />
              </button>

              {/* Date Range Filter Button */}
              <button className="px-2 border-r border-gray-500 filter_Image_Display whitespace-nowrap">
                Filter By
              </button>

              {/* Date Range Inputs */}
              <div className="flex items-center gap-2 px-2 filter_Date_Container">
                <label className="hide_Filter_Text">From:</label>
                <input
                  type="date"
                  value={startDate}
                  className="px-2 py-2 border rounded filter_Date"
                  onChange={(e) => setStartDate(e.target.value)}
                />

                <label className="hide_Filter_Text">To:</label>
                <input
                  type="date"
                  value={endDate}
                  className="px-2 py-2 border rounded filter_Date"
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <div
              className="flex items-center gap-2 p-2 border rounded cursor-pointer reset_paddings"
              onClick={handleResetFilter}
            >
              <label className="hide_Filter_Text">Reset</label>
              <TbRefresh className="filter_Reset_Image" />
            </div>
          </div>
        </div>
      </div>
      {/*-------Table-------*/}
      {viewContact || businessRole === "Admin" ? (
        <div className="mt-3 overflow-x-auto leads_Table_Main_Container">
          <div className="min-w-full rounded-md shadow-lg leads_Table_Container">
            {selectedViewValue === "Table View" && (
              <table className="min-w-full bg-white leads_Table">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    {/* CHECKBOX */}
                    <th className="py-3">
                      <input
                        type="checkbox"
                        checked={isSelectAllChecked}
                        onChange={handleSelectAllCheckbox}
                      />
                    </th>

                    <th className="px-1 py-3 font-medium text-left border-r">
                      <div className="">
                        <span className="whitespace-nowrap">Client Name</span>
                      </div>
                    </th>
                    <th className="px-1 py-3 font-medium text-left border-r min-w-16">
                      <div className="text-center">
                        <span className="whitespace-nowrap">Mobile</span>
                      </div>
                    </th>

                    <th className="px-1 py-3 font-medium text-left border-r min-w-16">
                      <div className="text-center">
                        <span>Segment</span>
                      </div>
                    </th>
                    <th className="relative px-1 py-3 font-medium text-left border-r min-w-20">
                      <div className="text-center">
                        <span className="whitespace-nowrap">Free Trail</span>
                      </div>
                    </th>
                    <th className="px-1 py-3 font-medium text-left border-r">
                      <div className="text-center">
                        <span className="whitespace-nowrap">Follow Up</span>
                      </div>
                    </th>
                    <th className="px-1 py-3 font-medium text-left border-r">
                      <div className="text-center">
                        <span className="whitespace-nowrap">Managed By</span>
                      </div>
                    </th>
                    <th className="">
                      <VscSettings
                        className="mx-auto whitespace-nowrap"
                        size={20}
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentLeads?.map((item) => {
                    const matchedUser =
                      users?.length > 0
                        ? users?.find(
                            (user) => user?.userName === item?.assigned_To,
                          )
                        : [];
                    const role = matchedUser?.role;
                    const roleColor = getRoleColorByIndex(role?.length); // Get color for the role
                    return (
                      <tr
                        key={item.id}
                        className="border-b border-gray-300 cursor-pointer hover:bg-gray-200"
                      >
                        {/* CHECKBOX */}
                        <td className="px-1 px-2 py-3 text-center">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(item.id)}
                            onClick={(e) => handleOnCheckBox(e, item)}
                          />
                        </td>

                        {/* CONTACT NAME */}
                        <td
                          className="px-2 py-4 text-sm border-b border-gray-300"
                          onClick={
                            edit || businessRole === "Admin"
                              ? () => handleClick(item)
                              : undefined
                          }
                        >
                          <div className="flex items-center">
                            <span className="whitespace-nowrap">
                              {item.name}
                            </span>
                          </div>
                        </td>

                        {/* Mobile No */}
                        <td className="px-2 py-4 text-sm border-b border-gray-300 min-w-20">
                          <div className="flex items-center gap-2">
                            <a
                              href={`tel:${item.mobileNo}`}
                              onClick={(event) => event.stopPropagation()}
                              className="whitespace-nowrap"
                            >
                              {item.mobileNo}
                            </a>
                            <MdCall className="text-red-600" />
                          </div>
                        </td>

                        {/* Segments */}
                        <td className="px-2 py-4 text-sm border-b border-gray-300">
                          <div>
                            {item.segments && (
                              <span className="whitespace-nowrap">
                                {item.segments
                                  .filter((segment) => segment.length > 1)
                                  .join(", ")}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="px-2 py-4 text-sm text-center border-b border-gray-300 whitespace-nowrap">
                          {item.trialStartDate?.split("T")[0]}
                        </td>

                        <td className="px-2 py-4 text-sm text-center border-b border-gray-300 whitespace-nowrap">
                          {item.call_bck_DateTime
                            ?.replace("T", " ")
                            ?.split(":")
                            .slice(0, 2)
                            .join(":")}
                        </td>

                        {/* Assigned To and User Role */}
                        <td className="w-[20%] border-b border-gray-300 px-2 py-4 text-sm">
                          {matchedUser && (
                            <div
                              className="mx-auto w-[90%] whitespace-nowrap rounded-full py-2 text-xs font-semibold text-white"
                              style={{
                                backgroundColor: roleColor ? roleColor : "#000",
                                borderRadius: "8px",
                                padding: 8,
                                textAlign: "center",
                              }}
                            >
                              {item.assigned_To} - ({matchedUser?.role})
                            </div>
                          )}
                        </td>

                        {/*------------------<- Create-SO->------------*/}
                        {/*------------------------------------------------------------------------------------------------------------------------------------------------*/}
                        {/*------------------<- Create-SO->------------*/}
                        {/*------------------------------------------------------------------------------------------------------------------------------------------------*/}
                        {createSO || businessRole === "Admin" ? (
                          <td className="px-2 text-center">
                            <button
                              className={business === "Brokerage" ? "" : ""}
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/panel/contact/create/so/${item.id}`);
                              }}
                            >
                              {/* SO */}
                              {business === "Brokerage" ? (
                                <span className="p-2 text-xs text-white bg-blue-600 rounded shadow-md whitespace-nowrap hover:bg-blue-500">
                                  Create Client
                                </span>
                              ) : (
                                <>
                                  <span className="p-1 text-white bg-blue-600 rounded shadow-md text-xm whitespace-nowrap hover:bg-blue-500">
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
                    {getleads.map((item) => (
                      <div
                        className="flex flex-col gap-2 px-2 py-3 bg-white border-2 rounded-lg"
                        key={item.id}
                      >
                        <div className="flex items-center gap-3">
                          <img src={item.img} height={60} width={60} />
                          <div className="flex flex-col grow">
                            <div className="flex justify-between font-medium">
                              <span className="text-indigo-500">
                                {item.name}
                              </span>
                              <BiEdit
                                size={25}
                                className="p-1 text-blue-500 bg-white rounded-full shadow-md"
                              />
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium">
                              {item.leadesStatus}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center px-2 py-1 bg-gray-100 border-2 rounded-lg">
                          <div className="w-2/4 text-sm text-gray-500">
                            Company name
                          </div>
                          <div className="text-sm font-medium 2-2/4">
                            {item.company}
                          </div>
                        </div>

                        <div className="flex items-center px-2 py-1 bg-gray-100 border-2 rounded-lg">
                          <div className="w-2/4 text-sm text-gray-500">
                            Title
                          </div>
                          <div className="text-sm font-medium 2-2/4">
                            {item.tital}
                          </div>
                        </div>

                        <div className="flex items-center px-2 py-1 bg-gray-100 border-2 rounded-lg">
                          <div className="w-2/4">
                            <IoIosMail className="text-2xl" />
                          </div>
                          <div className="text-sm font-medium 2-2/4">
                            {item.email}
                          </div>
                        </div>

                        <div className="flex items-center px-2 py-1 bg-gray-100 border-2 rounded-lg">
                          <div className="w-2/4">
                            <FaPhoneAlt className="text-xl" />
                          </div>
                          <div className="text-sm font-medium 2-2/4">
                            {item.phoneNo}
                          </div>
                        </div>
                        <div className="flex items-center px-2 py-1 bg-gray-100 border-2 rounded-lg">
                          <div className="w-2/4 text-sm text-gray-500">
                            Lead Source
                          </div>
                          <div className="text-sm font-medium 2-2/4">
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

          {selectedViewValue === "Table View" && (
            <>
              <div className="flex justify-end m-4">
                {/* //---------------------->---------------------->PAGINATION-RENDERER<----------------------<---------------------- */}
                <nav className="flex items-center justify-center gap-2 mx-auto mt-4 text-center">
                  {/* /---------------------->Previous Button <----------------------< */}
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    className={`rounded-full p-1 text-white shadow-md ${currentPage === 1 ? "border-2 border-gray-200" : "border-2 border-gray-100 bg-cyan-500"}`}
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
                            className={`mx-1 rounded px-4 py-2 ${currentPage === page ? "bg-blue-600 text-white" : "border bg-white text-gray-700"}`}
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
                    },
                  )}

                  {/* Next Button */}
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    className={`rounded-full p-1 shadow-md text-white${currentPage === totalPage ? "border-2 border-gray-200" : "border-2 border-gray-100 bg-cyan-500"}`}
                    disabled={currentPage === totalPage}
                  >
                    <GrFormNext size={25} />
                  </button>
                </nav>
              </div>
            </>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
