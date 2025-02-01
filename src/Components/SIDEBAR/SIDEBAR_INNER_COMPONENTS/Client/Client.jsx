//react
import { useEffect, useState } from "react";

//external Packages
import axios from "axios";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

//React Icons
import { FaAngleDown, FaPhoneAlt, FaRegUser } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import { FaUserTie } from "react-icons/fa";
import { ImFilter } from "react-icons/im";
import { MdCall } from "react-icons/md";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { BiCalendar } from "react-icons/bi";
import { PiLineSegmentsBold } from "react-icons/pi";
import { RiShieldUserLine } from "react-icons/ri";

//Folder Imported

import { tenant_base_url, protocal_url } from "../../../../Config/config";

import MassEmail from "../MassEmail/MassEmail";

import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

import { SearchElement } from "../SearchElement/SearchElement";

//-----------------------------ToastContainer-----------------------------
import { ToastContainer } from "react-toastify";
import {
  showSuccessToast,
  showErrorToast,
} from "./../../../../utils/toastNotifications";
import { TbRefresh } from "react-icons/tb";
import { FaTableList } from "react-icons/fa6";
import { IoGrid } from "react-icons/io5";

export default function Client() {
  const name = getHostnamePart();

  //This is to store the upcoming data from API
  const [getleads, setGetleads] = useState([]);

  // Mass Email
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState([]);

  //DND
  const [users, setUsers] = useState([]);

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
        `${protocal_url}${name}.${tenant_base_url}/SalesOrder/salesOrder/clientbyusertoken`,
        config,
      );

      const data = response.data.data;
      console.log(data);
      setGetleads(data);
      setFilteredLeads(data); // Initialize filtered leads
    } catch (error) {
      console.log("Error fetching leads:", error);
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
      console.log("Error fetching leads:", error);
    }
  };

  useEffect(() => {
    handleLead();
    getAllUsers();
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

  //------------------------------------------------------------------------------------------------
  //----------------ACTION BAR DROPDOWN----------------
  const dropActionsMenu = [
    { key: 3, value: "Mass E-Mail" },
    { key: 7, value: "Export to Excel" },
    { key: 8, value: "Export to PDF" },
  ];

  const [dropActionsMenudropDown, setdropActionsMenudropDown] = useState(false);

  const toggleActionsMenuLogo = () => {
    setdropActionsMenudropDown(!dropActionsMenudropDown);
  };

  const handleActionButton = async (value) => {
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

  // ---------------------->MASS Email FUNCTIONALITY---<----------------------

  const openMassEmailModal = () => {
    if (selectedEmails.length > 0) {
      setIsModalOpen(true); // Open the modal
    } else {
      alert("Please select at least one row for mass emailing.");
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
      showErrorToast("No leads selected to export");
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
      showErrorToast("No leads selected to export");
      return;
    }
    const doc = new jsPDF();

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
        const callbackDate = new Date(follow.subscription_start_date);
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
        lead.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.mobileNo.includes(searchTerm),
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
          (item) => item.moduleName === "Client",
        );

        if (serviceBoxPermissions) {
          const permissionsArray = serviceBoxPermissions.permissions.split(",");
          setPermissions(permissionsArray);

          console.log("List : ", permissionsArray);

          //------------------------------------------------------ Set permissions ------------------------------------------------
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
        {isModalOpen && (
          <MassEmail
            emails={selectedEmails}
            onClose={closeModal} // Pass function to close modal
          />
        )}
        {/* containerbar*/}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-white px-3 py-2">
          {/* PART-I */}
          {/* container- Alleads, search */}
          <div className="contact_Dropdown_Main_Container flex flex-wrap items-center justify-start gap-3">
            {/* PART-I */}
            {/* All Lead  DropDown*/}
            <div
              className="contact_Dropdown_Container relative whitespace-nowrap"
              onClick={toggleMenuAllLead}
              onMouseLeave={() => setAllLeaddropDown(false)}
            >
              <button
                className="contact_Dropdown_Button flex min-w-40 items-center justify-between truncate rounded-md border px-4 py-2"
                id="dropdownDefaultButton"
                type="button"
              >
                {leadStatus}
                <FaAngleDown className="ml-2 text-gray-900" />
              </button>
              {allLeaddropDown && (
                <div className="absolute top-10 z-10 rounded-md border border-gray-300 bg-white">
                  <ul className="py-2 text-sm text-gray-700">
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
            {/* PART-I-ii */}
            {/* All ASSIGNED_TO  DropDown*/}
            <div
              className="contact_Dropdown_Container relative whitespace-nowrap"
              onClick={toggleMenuAssigned_To}
              onMouseLeave={() => setallAssigned_To_DROPDOWN(false)}
            >
              <button
                className="contact_Dropdown_Button flex min-w-36 items-center justify-between rounded-md border px-4 py-2"
                id="dropdownDefaultButton"
                type="button"
              >
                {assignedTo}
                <FaAngleDown className="ml-2 text-gray-900" />
              </button>
              {allAssigned_To_DROPDOWN && (
                <div className="absolute top-10 z-10 rounded-md border border-gray-300 bg-white">
                  <ul className="py-2 text-sm text-gray-700">
                    {allAssigned_To_Data.map((item) => (
                      <li
                        key={item.id}
                        className="block w-56 cursor-pointer border-b px-4 py-2 hover:bg-cyan-500 hover:text-white"
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
          <div className="action_Button_Main_Container flex items-center justify-start gap-3">
            {/* PART-II */}
            {/* Stripe-BarDropDown */}
            <div
              className="hide_Component relative"
              onClick={togglestripeBar}
              onMouseLeave={() => setstripeBardropDown(false)}
            >
              <button
                className="flex items-center justify-between gap-2 rounded-md border px-4 py-3"
                id="dropdownDefaultButton"
                type="button"
              >
                <FaBars />
                <FaAngleDown className="text-gray-900" />
              </button>
              {stripeBardropDown && (
                <div className="absolute right-0 top-10 z-10 w-32 rounded-md border border-gray-300 bg-white">
                  <ul className="text-sm text-gray-700">
                    {stripeBar.map(({ key, value, icon }) => (
                      <li
                        key={key}
                        className="flex cursor-pointer items-center gap-2 border-b py-2 hover:bg-cyan-500 hover:text-white"
                        onClick={() => handleStripeButton(value)}
                      >
                        <div className="mx-1 flex h-6 w-6 items-center justify-center text-lg">
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
              className="action_Button_Container relative"
              onClick={toggleActionsMenuLogo}
              onMouseLeave={() => setdropActionsMenudropDown(false)}
            >
              <button
                className="action_Button flex items-center justify-between gap-2 rounded-lg border border-blue-600 px-4 py-2 text-blue-600"
                id="dropdownDefaultButton"
                type="button"
              >
                Actions
                <FaAngleDown className="text-gray-900" />
              </button>
              {dropActionsMenudropDown && (
                <div className="absolute top-10 z-10 w-56 rounded-md border border-gray-300 bg-white py-2">
                  <ul className="text-sm text-gray-700">
                    {dropActionsMenu.map(({ key, value }) =>
                      permissions.includes(value) ||
                      businessRole === "Admin" ? (
                        <li
                          key={key}
                          className="block cursor-pointer border-b px-4 py-2 hover:bg-cyan-500 hover:text-white"
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
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-3">
            <h1 className="text-3xl font-medium">Client</h1>
            <h1 className="min-w-10 rounded bg-blue-600 p-2 text-center text-sm text-white shadow-md">
              {getleads?.length}
            </h1>
          </div>

          <div className="date_Filter_Main_Container">
            {/* ------------------- Filter by date ----------------- */}
            <div className="date_Filter_Main_Container flex items-center justify-between rounded-lg border-2 border-gray-300 bg-white p-2">
              {/* Filter Icon Button */}
              <div className="flex items-center">
                <button className="border-r border-gray-500 pr-2">
                  <ImFilter className="filter_Image_Size" />
                </button>

                {/* Date Range Filter Button */}
                <button className="filter_Image_Display whitespace-nowrap border-r border-gray-500 px-2">
                  Filter By
                </button>

                {/* Date Range Inputs */}
                <div className="filter_Date_Container flex items-center gap-2 px-2">
                  <label className="hide_Filter_Text">From:</label>
                  <input
                    type="date"
                    value={startDate}
                    className="filter_Date rounded border px-2 py-2"
                    onChange={(e) => setStartDate(e.target.value)}
                  />

                  <label className="hide_Filter_Text">To:</label>
                  <input
                    type="date"
                    value={endDate}
                    className="filter_Date rounded border px-2 py-2"
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              <div
                className="reset_paddings flex cursor-pointer items-center gap-2 rounded border p-2"
                onClick={handleResetFilter}
              >
                <label className="hide_Filter_Text">Reset</label>
                <TbRefresh className="filter_Reset_Image" />
              </div>
            </div>
          </div>
        </div>
        {/*-------Table-------*/}
        <div className="leads_Table_Main_Container mt-3 overflow-x-auto">
          <div className="leads_Table_Container min-w-full rounded-md">
            {selectedViewValue === "Table View" && (
              <table className="leads_Table min-w-full bg-white">
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

                    <th className="max-w-56 border-r px-1 py-3 text-left font-medium">
                      <div className="flex items-center justify-between whitespace-nowrap">
                        <span>Client Name</span>
                      </div>
                    </th>
                    <th className="border-r px-1 py-3 text-left font-medium">
                      <div className="flex items-center justify-between">
                        <span>Mobile</span>
                      </div>
                    </th>

                    <th className="w-48 border-r px-1 py-3 text-left font-medium">
                      <div className="flex items-center justify-between">
                        <span>Segment</span>
                      </div>
                    </th>
                    <th className="w-48 border-r px-1 py-3 text-left font-medium">
                      <div className="flex items-center justify-between">
                        <span>Service Start Date</span>
                      </div>
                    </th>
                    <th className="w-48 border-r px-1 py-3 text-left font-medium">
                      <div className="flex items-center justify-between">
                        <span>Service End Date</span>
                      </div>
                    </th>
                    <th className="border-r px-1 py-3 text-left font-medium">
                      <div className="flex items-center justify-between">
                        <span>Managed By</span>
                      </div>
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
                        className="cursor-pointer border-b border-gray-300 hover:bg-gray-200"
                      >
                        {/* CHECKBOX */}
                        <td className="px-1 text-center">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(item.id)}
                            onChange={(e) => handleOnCheckBox(e, item)}
                          />
                        </td>

                        {/* CONTACT NAME */}
                        <td className="border-b border-gray-300 px-2 py-4 text-sm">
                          <div className="flex items-center">
                            <span className="">{item.clientName}</span>
                          </div>
                        </td>

                        <td className="w-[15%] border-b border-gray-300 px-1 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <a
                              href={`tel:${item.mobileNo}`}
                              onClick={(event) => event.stopPropagation()}
                            >
                              {item.mobileNo}
                            </a>
                            <MdCall className="text-red-600" />
                          </div>
                        </td>

                        {/* Segments */}
                        <td className="min-w-24 max-w-36 border-b border-gray-300 px-1 py-4 text-sm">
                          <div className="grid grid-cols-2 items-center gap-1">
                            {item.segments && (
                              <span className="">
                                {item.segments
                                  .filter((segment) => segment.length > 1)
                                  .join(", ")}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="border-b border-gray-300 px-1 py-4 text-center text-sm">
                          {item.subscription_start_date?.split("T")[0]}
                        </td>

                        <td className="border-b border-gray-300 px-1 py-4 text-center text-sm">
                          {item.subscription_end_date?.split("T")[0]}
                        </td>

                        {/* Assigned To and User Role */}
                        <td className="w-[19%] border-b border-gray-300 px-2 py-4 text-sm">
                          {matchedUser && (
                            <div
                              className="mx-auto w-[90%] rounded-full py-2 text-xs font-semibold text-white"
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
                  <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                    {/*---------Card starts Here */}
                    {getleads.map((item) => (
                      <div
                        className="grid grid-cols-1 gap-1 rounded-lg bg-cyan-500 p-1"
                        key={item.id}
                      >
                        <div className="">
                          <div className="flex items-center justify-center gap-2 rounded border border-cyan-500 bg-white py-2 text-center">
                            <FaUserTie />
                            <span className="">{item?.clientName}</span>
                          </div>
                        </div>

                        <div className="rounded border-2 border-cyan-500 bg-white py-2">
                          <div className="flex items-center justify-between px-3 py-1">
                            <div className="flex items-center justify-between py-1">
                              <IoIosMail size={22} className="w-6" />
                              <span className="hidden sm:block">Email</span>
                            </div>
                            <div className="truncate text-sm font-medium">
                              {item?.email}
                            </div>
                          </div>

                          <div className="flex items-center justify-between px-3 py-1">
                            <div className="flex items-center justify-between py-1">
                              <FaPhoneAlt size={14} className="w-6" />
                              <span className="hidden sm:block">Phone</span>
                            </div>
                            <div className="truncate text-sm font-medium">
                              {item?.phoneNo}
                            </div>
                          </div>

                          <div className="flex items-center justify-between px-3 py-1">
                            <div className="flex items-center justify-between py-1">
                              <PiLineSegmentsBold size={16} className="w-6" />
                              <span className="hidden sm:block">Segments</span>
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
                              <BiCalendar size={18} className="w-6" />
                              <span className="hidden sm:block">
                                Sub Start Date
                              </span>
                            </div>
                            <div className="text-sm font-medium">
                              {item?.subscription_start_date.split("T")[0]}
                            </div>
                          </div>

                          <div className="flex items-center justify-between px-3 py-1">
                            <div className="flex items-center justify-between py-1">
                              <BiCalendar size={18} className="w-6" />
                              <span className="hidden sm:block">
                                Sub End Date
                              </span>
                            </div>
                            <div className="text-sm font-medium">
                              {item?.subscription_end_date.split("T")[0]}
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

          {selectedViewValue === "Table View" && (
            <>
              <div className="m-4 flex justify-end">
                {/* //---------------------->---------------------->PAGINATION-RENDERER<----------------------<---------------------- */}
                <nav className="mx-auto mt-4 flex items-center justify-center gap-2 text-center">
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
      </div>
    </>
  );
}
