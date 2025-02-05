//react
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//external Packages
import axios from "axios";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

//React Icons
import { FaAngleDown } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";
import { ImFilter } from "react-icons/im";
import { MdCall } from "react-icons/md";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
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
import MassEmail from "../MassEmail/MassEmail";
import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";
import { SearchElement } from "../SearchElement/SearchElement";

//-----------------------------ToastContainer-----------------------------
import { ToastContainer } from "react-toastify";
import { showSuccessToast } from "./../../../../utils/toastNotifications";

const name = getHostnamePart();

export default function SalesOrder() {
  const navigate = useNavigate();

  // Mass Email
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState([]);

  //This is to store the upcoming data from API
  const [getleads, setGetleads] = useState([]);

  //stores the initial value of status
  const [isStatusChanged, setIsStatusChanged] = useState(false); // State to track status change

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
        `${protocal_url}${name}.${tenant_base_url}/SalesOrder/salesOrder/byusertoken`,
        config,
      );

      const data = response.data.data;
      setGetleads(data);
      setFilteredLeads(data);
      setIsStatusChanged(data.status);
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
  }, []);

  //------------------------------------------------------------------------------------------------//------------------------------------------------------------------------------------------------
  //----------------STATUS BAR DROPDOWN----------------
  const status = [
    { key: 0, value: "All Sales Order" },
    { key: 1, value: "Pending Records" },
    { key: 2, value: "Approved Records" },
  ];

  const [salesOrderStatus, setsalesOrderStatus] = useState(status[0].value); // Track the selected lead status
  const [
    isDropdownVisible_salesOrderStatus,
    setisDropdownVisible_salesOrderStatus,
  ] = useState(false);

  useEffect(() => {
    setFilteredLeads(getleads);
  }, [getleads]);

  const toggleDropdown_salesOrderStatus = () => {
    setisDropdownVisible_salesOrderStatus(!isDropdownVisible_salesOrderStatus);
  };

  const handleStatus = (value) => {
    setsalesOrderStatus(value);
    console.log(salesOrderStatus);
    setisDropdownVisible_salesOrderStatus(false);
    let filteredLeads = getleads;

    if (value === "Pending Records") {
      filteredLeads = filteredLeads.filter((item) => item.status === false);
    } else if (value === "Approved Records") {
      filteredLeads = filteredLeads.filter((item) => item.status === true);
    }

    // If "All Sales Order" is selected, show all leads
    if (value === "All Sales Order") {
      filteredLeads = getleads;
    }

    setFilteredLeads(filteredLeads);
    console.log(filteredLeads); // For debugging
  };

  //------------------------------------------------------------------------------------------------
 //-------------------------------->WIZARD DROPDOWN<--------------------------------
 const stripeBar = [
  { key: 1, value: "Table View", icon: <FaTableList /> },
  { key: 2, value: "Grid View", icon: <IoGrid /> },
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
    { key: 6, value: "Send SMS" },
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
        data: { soIds: selectedIds },
      };

      const response = await axios.delete(
        `${protocal_url}${name}.${tenant_base_url}/SalesOrder/salesOrder/massdelete`,
        config,
      );
      showSuccessToast("Mass Deleted run");
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
    // "#f97316", // Red
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

  useEffect(() => {
    handleLead();
  }, [isStatusChanged]); // Fetch data when status changes

  const handlePendingStatus = async (id, status) => {
    const bearer_token = localStorage.getItem("token");

    if (status === true) {
      alert("This order is already approved.");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };

      // API call to approve the order
      const response = await axios.put(
        `${protocal_url}${name}.${tenant_base_url}/SalesOrder/salesOrder/approve/${id}`,
        {},
        config,
      );
      console.log(response);
      alert("Order has been approved successfully!");

      // After approval, set state to trigger reload
      setIsStatusChanged(!isStatusChanged); // Toggle the status change state
    } catch (error) {
      console.log(error);
      alert("There was an error approving the order.");
    }
  };

  // ------------------------------ Search Function ----------------------------------

  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    const filtered = getleads.filter(
      (lead) =>
        lead.clientName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        lead.contactNo?.includes(searchTerm),
    );
    setFilteredLeads(filtered);
  }, [searchTerm, getleads]);

  //------------------------------------------------------Filter Reset Settings ---------------------------------------------

  const handleResetFilter = () => {
    setFilteredLeads(getleads);
    setsalesOrderStatus("All Sales Order");
    // setAssignedTo("Managed By");
  };

  //---------------------------------------------------- Roles & Permissions ----------------------------------------------------

  const businessRole = localStorage.getItem("businessRole");
  const [permissions, setPermissions] = useState([]);
  const [edit, setEdit] = useState(false);
  const [approve, setApprove] = useState(false);

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
          (item) => item.moduleName === "Sales Order",
        );

        if (serviceBoxPermissions) {
          const permissionsArray = serviceBoxPermissions.permissions.split(",");
          setPermissions(permissionsArray);

          console.log("List : ", permissionsArray);

          //------------------------------------------------------ Set permissions ------------------------------------------------

          setEdit(permissionsArray.includes("Edit Sales Order"));
          setApprove(permissionsArray.includes("Approve Pending"));
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
      <ToastContainer />
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
          {/* All Lead  DropDown*/}
          <div
            className="relative sales_Oreder_Dropdown_Container whitespace-nowrap"
            onClick={toggleDropdown_salesOrderStatus}
            onMouseLeave={() => setisDropdownVisible_salesOrderStatus(false)}
          >
            <button
              className="flex items-center justify-between px-4 py-2 truncate border rounded-md contact_Dropdown_Button min-w-40"
              id="dropdownDefaultButton"
              type="button"
            >
              {salesOrderStatus}
              <FaAngleDown className="ml-2 text-gray-900" />
            </button>
            {isDropdownVisible_salesOrderStatus && (
              <div className="absolute z-10 bg-white border border-gray-300 rounded-md top-10">
                <ul className="py-2 text-sm text-gray-700">
                  {status.map((item, index) => (
                    <li
                      key={index}
                      className="block w-56 px-4 py-2 border-b cursor-pointer hover:bg-cyan-500 hover:text-white"
                      onClick={() => handleStatus(item.value)} // Correct selection logic
                    >
                      {item.value}
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
                    <div className="flex items-center justify-center w-6 h-6 mx-1 text-lg">
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
              <div className="absolute right-0 z-10 w-56 py-2 bg-white border border-gray-300 rounded-md top-10">
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
      {/* 2nd bar Leads and lenghtLeads*/}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
        <div className="flex gap-3">
          <h1 className="text-3xl font-medium">Sales Order</h1>
          <h1 className="p-2 text-sm text-center text-white bg-blue-600 rounded shadow-md min-w-10">
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
      <div className="mt-3 overflow-x-auto leads_Table_Main_Container">
        <div className="min-w-full rounded-md leads_Table_Container">
          {selectedViewValue === "Table View" && (
            <table className="min-w-full bg-white leads_Table">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  {/* CHECKBOX */}
                  <th className="px-3 py-3">
                    <input
                      type="checkbox"
                      checked={isSelectAllChecked}
                      onChange={handleSelectAllCheckbox}
                    />
                  </th>
                  <th className="px-1 py-3 font-medium text-left border-r min-w-36 max-w-40">
                    <div className="flex justify-between">
                      <span>Client Name</span>
                    </div>
                  </th>
                  <th className="px-1 py-3 font-medium text-left border-r">
                    <div className="flex items-center justify-between">
                      <span>Email</span>
                      <FaBars />
                    </div>
                  </th>
                  <th className="px-1 py-3 font-medium text-left border-r">
                    <div className="flex items-center justify-between">
                      <span>Phone No</span>
                      <FaBars />
                    </div>
                  </th>

                  <th className="px-1 py-3 font-medium text-left border-r">
                    <div className="flex items-center justify-between">
                      <span>Start Date</span>
                      <FaBars />
                    </div>
                  </th>

                  <th className="px-1 py-3 font-medium text-left border-r">
                    <div className="flex items-center justify-between">
                      <span>End Date</span>
                      <FaBars />
                    </div>
                  </th>

                  <th className="px-1 py-3 font-medium text-left border-r min-w-32 max-w-36">
                    <div className="flex items-center justify-between">
                      <span>Segments</span>
                      <FaBars />
                    </div>
                  </th>
                  <th className="px-1 py-3 font-medium text-left border-r w-44">
                    <div className="flex items-center justify-between">
                      <span>Managed By</span>
                      <FaBars />
                    </div>
                  </th>
                  <th className="flex items-center justify-center py-4">
                    <VscSettings />
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
                      <td className="px-1 py-3 text-center">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(item.id)}
                          onChange={(e) => handleOnCheckBox(e, item)}
                        />
                      </td>
                      {/* CONTACT NAME */}
                      <td
                        className="px-1 py-4 text-sm leading-5 text-gray-600 border-b border-gray-300"
                        onClick={
                          edit || businessRole === "Admin"
                            ? () => navigate(`/panel/clientso/${item.id}`)
                            : undefined
                        }
                      >
                        <div className="flex items-center">
                          <span className="">{item.clientName}</span>
                        </div>
                      </td>

                      {/* <------------------------------------Email------------------------------------> */}
                      <td className="px-4 py-4 text-sm break-all border-b border-gray-300 text- min-w-24 max-w-48">
                        {item.email}
                      </td>
                      {/* <------------------------------------MOB NO.------------------------------------> */}
                      <td className="px-4 py-4 text-sm border-b border-gray-300">
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
                      {/* <------------------------------------subscription_start_date------------------------------------> */}
                      <td className="px-4 py-4 text-sm break-all border-b border-gray-300 text- min-w-24 max-w-48">
                        {item.subscription_start_date?.split("T")[0]}
                      </td>
                      {/* <------------------------------------subscription_end_date------------------------------------> */}
                      <td className="px-4 py-4 text-sm break-all border-b border-gray-300 text- min-w-24 max-w-48">
                        {item.subscription_end_date?.split("T")[0]}
                      </td>
                      {/* Segments */}
                      <td className="px-1 py-4 text-sm border-b border-gray-300 min-w-24 max-w-36">
                        <div>
                          {item.segments && (
                            <span className="">
                              {item.segments
                                .filter((segment) => segment.length > 1)
                                .join(", ")}
                            </span>
                          )}
                        </div>
                      </td>
                      {/* Assigned To and User Role */}
                      <td className="px-2 py-4 text-sm text-center border-b border-gray-300">
                        {matchedUser && (
                          <div
                            className="w-[90%] rounded-full px-2 py-2 text-xs font-semibold text-white"
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

                      {/*------------------<- Created---->------------*/}
                      {/*------------------------------------------------------------------------------------------------------------------------------------------------*/}
                      {/*------------------<- Handle Pending Status ->------------*/}

                      <td>
                        <button
                          onClick={
                            approve || businessRole === "Admin"
                              ? () => handlePendingStatus(item.id, item.status)
                              : undefined
                          }
                          className="w-[90%]"
                        >
                          {item.status === true ? (
                            <div className="py-1 pl-2 pr-4 text-xs font-medium text-center text-white bg-green-400 border rounded-full hover:bg-green-600">
                              Approved
                            </div>
                          ) : (
                            <div className="w-full px-2 py-1 text-xs font-medium text-center text-white bg-red-400 border rounded-full hover:bg-red-600">
                              Pending
                            </div>
                          )}
                        </button>
                      </td>
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
                    {/* ------------Parent------------ */}
                    <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                      {/*---------Card starts Here */}
                      {currentLeads.map((item) => (
                        // {/* ------------sub-Parent->Container ------------ */}
                        <div
                          className="grid grid-cols-1 gap-1 p-2 rounded-lg shadow-md bg-sky-100"
                          key={item.id}
                        >
                        

                          <div className="">
                            <div className="flex items-center py-2 text-center bg-white border-2 rounded border-cyan-500">
                            <div className= "ml-1">


                             <div>
                        <button
                          onClick={
                            approve || businessRole === "Admin"
                              ? () => handlePendingStatus(item.id, item.status)
                              : undefined
                          }
                          className="w-[90%]"
                        >
                          {item.status === true ? (
                            <div className="py-1 pl-2 pr-4 text-xs font-medium text-center text-white bg-green-500 border rounded shadow-sm shadow-green-400 hover:bg-green-500">
                              Approved
                            </div>
                          ) : (
                            <div className="w-full py-1 pl-2 pr-4 text-xs font-medium text-center text-white bg-red-500 border rounded shadow-sm shadow-red-400 hover:bg-red-600">
                              Pending
                            </div>
                          )}
                        </button>
                      </div>
                      
                            </div>
                              <div className="flex items-center justify-center gap-2 mx-auto">
                                <FaUserTie />
                                <span className="">
                                  {item?.clientName[0].toUpperCase() +
                                    item?.clientName?.substr(1)}
                                </span>
                              </div>
                              <AiOutlineEdit
                                className="p-1 mr-3 text-white rounded-full bg-cyan-400 hover:bg-cyan-500"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/panel/clientso/${item.id}`);
                                }}
                                size={25}
                              />
                            </div>
                          </div>

                          <div className="py-2 bg-white border-2 rounded border-cyan-500">
                            <div className="flex items-center justify-between px-3 py-1">
                              <div className="flex items-center justify-between py-1">
                                <IoIosMail size={22} className="w-6" />
                                <span className="hidden sm:block">Email</span>
                              </div>
                              <div className="text-sm font-medium truncate">
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
                              <div className="text-sm font-medium truncate">
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
                              <div className="text-sm font-medium truncate">
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
                                <span className="hidden sm:block">Source</span>
                              </div>
                              <div className="text-sm font-medium">
                                {item?.leadSource}
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
                                {item?.subscription_start_date?.split("T")[0]}
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
                                {item?.subscription_end_date?.split("T")[0]}
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
    </div>
  );
}
