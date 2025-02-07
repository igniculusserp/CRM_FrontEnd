//react inbuilt
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

//external
import axios from "axios";
// import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

//reactIcons
import { FaAngleDown, FaBars } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { ImFilter } from "react-icons/im";
import { MdCall } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";

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
import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";
import { tenant_base_url, protocal_url } from "./../../../../Config/config";
import MassEmail from "../MassEmail/MassEmail";
import { SearchElement } from "../SearchElement/SearchElement";
import { TbRefresh } from "react-icons/tb";

//------------------------------------------------------------------------------->CODE STARTS FROM HERE<-------------------------------------------------------------------------------
export default function FreeTrail() {
  const navigate = useNavigate();

  // Mass Email
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState([]);

  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const bearer_token = localStorage.getItem("token");
  const name = getHostnamePart();

  //This is to store the upcoming data from API
  const [freeTrial, setFreeTrial] = useState([]);
  //created such that to filter leads according to leadStatus
  const [filteredTrails, setFilteredTrails] = useState([]); // Filtered

  //------------------------------------------------------------------------------------------------
  //----------------GET----------------
  const getFreeTrail = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Trail/alltrail/byusertoken`,
        config,
      );
      if (response.status === 200) {
        const followup = response?.data?.data; // Get the user data
        setFreeTrial(followup); // Set the user data for editing
        setFilteredTrails(followup);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  useEffect(() => {
    getFreeTrail();
  }, [bearer_token, protocal_url, name, tenant_base_url]);

  const handleClick = (id) => {
    navigate(`/panel/createtrial/${id}`);
  };

  //   ALL FREE TRIAL TOGGLE
  const toggleMenuAllFreeTrial = () => {
    setAllFreeTrialdropDown(!allFreeTrialdropDown);
  };

  //   ACTION TOGGLE
  const [dropActionsMenudropDown, setdropActionsMenudropDown] = useState(false);
  const toggleActionsMenuLogo = () => {
    setdropActionsMenudropDown(!dropActionsMenudropDown);
  };

  //   FILTER DROPDOWN DATA
  const [allFreeTrialdropDown, setAllFreeTrialdropDown] = useState(false);

  //   Action Dropdown Menu
  const dropActionsMenu = [
    { key: 1, value: "Mass Delete" },
    { key: 3, value: "Mass E-Mail" },
    { key: 5, value: "Export Trail" },
    { key: 6, value: "Sheet View" },
    { key: 7, value: "Print View" },
  ];

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

  const freeTrialDropdown = [
    { key: 1, value: "Man Insited" },
    { key: 2, value: "Man Insited" },
    { key: 3, value: "Man Insited" },
    { key: 4, value: "Man Insited" },
    { key: 4, value: "Man Insited" },
    { key: 4, value: "Man Insited" },
  ];

  // Function to toggle all checkboxes
  const selectAllCheckbox = () => {
    if (selectAll) {
      // Deselect all rows
      setSelectedRows([]);
      setSelectedEmails([]); // Clear selected emails
      setSelectAll(false);
    } else {
      // Select all rows in the current page
      const allIds = currentLeads.map((order) => order.id);
      const allEmails = currentLeads.map((order) => order.email); // Extract emails
      setSelectedRows(allIds);
      setSelectedEmails(allEmails); // Store all emails
      setSelectAll(true);
    }
  };

  // Function to toggle individual checkboxes
  const handleCheckboxChange = (id, email, e) => {
    e.stopPropagation();

    // Update selected rows
    setSelectedRows((prevSelectedRows) => {
      const newSelectedRows = prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id];

      // Log the updated selectedRows
      console.log("Updated Selected Rows:", newSelectedRows);
      return newSelectedRows;
    });

    // Update selected emails
    setSelectedEmails((prevSelectedEmails) => {
      const newSelectedEmails = prevSelectedEmails.includes(email)
        ? prevSelectedEmails.filter((e) => e !== email)
        : [...prevSelectedEmails, email];
      return newSelectedEmails;
    });

    setSelectAll(false); // Uncheck "Select All" if individual checkbox is toggled
  };

  // On click of Action Button
  const handleActionButton = async (value) => {
    // ---------------------->MASS DELETE FUNCTIONALITY<----------------------
    if (value === "Mass Delete") {
      const userConfirmed = confirm(
        "Are you sure you want to Delete the selected Data?",
      );
      if (userConfirmed) {
        handleMassDelete(selectedRows);
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
        "Are you sure you want to export the selected data?",
      );
      if (userConfirmed) {
        exportToExcel(selectedRows);
      }
    }

    // ---------------------->PRINT VIEW FUNCTIONALITY*<----------------------
    if (value === "Print View") {
      const userConfirmed = confirm(
        "Are you sure you want to export the selected Leads?",
      );
      if (userConfirmed) {
        exportToPDF(selectedRows);
      }
    }
  };

  // ---------------------->MASS DELETE FUNCTIONALITY---###API###<----------------------

  const handleMassDelete = async (ids) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };

      // Use Promise.all to delete all selected IDs in parallel
      const deleteRequests = ids.map((id) =>
        axios.delete(
          `${protocal_url}${name}.${tenant_base_url}/Trail/delete/${id}`,
          config,
        ),
      );

      // Wait for all delete requests to finish
      const responses = await Promise.all(deleteRequests);

      // Assuming you want to alert for each response, or just once for all
      getFreeTrail(); // Refresh the list after deletion
      alert(`${responses.length} items successfully deleted.`);
    } catch (error) {
      console.error("Error deleting follow-ups:", error);
    }
  };

  //---------------------->SHEET VIEW FUNCTIONALITY---###FUNCTION###<----------------------
  //-------> XLSX used here
  const exportToExcel = () => {
    // Filter currentLeads based on selectedIds
    const leadsToExport = currentLeads.filter((lead) =>
      selectedRows.includes(lead.id),
    );
    if (leadsToExport?.length === 0) {
      alert("No leads selected to export");
      return;
    }

    // Create a worksheet from the filtered leads data
    const ws = XLSX.utils.json_to_sheet(leadsToExport);

    // Create a new workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Selected FollowUp");

    // Export the workbook to an Excel file
    XLSX.writeFile(wb, "SelectedFreeeTrailData.xlsx");
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

  //---------------------->Export TO PDF FUNCTIONALITY---###FUNCTION###<----------------------
  const exportToPDF = () => {
    const leadsToExport = currentLeads.filter((lead) =>
      selectedRows.includes(lead.id),
    );
    if (leadsToExport?.length === 0) {
      alert("No leads selected to export");
      return;
    }
    const doc = new jsPDF();
    // const role = matchedUser?.role;
    const tableColumn = ["ID", "Name", "Email", "Phone No.", "Assigned To"];
    // Map the leads data to rows
    const tableRows = leadsToExport?.map((lead) => [
      lead.id,
      lead.name,
      lead.email,
      lead.phoneNo,
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
    doc.save("FreeTrail.pdf");
  };

  // States for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  // Calculate total pages
  const totalPage = Math.ceil(freeTrial.length / itemsPerPage);

  // Get current items for the page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLeads = freeTrial.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page changes
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPage) {
      setCurrentPage(pageNumber);
    }
  };

  //-----------------------------------------------> ALL-> ASSIGNED_TO <-functionality <-----------------------------------------------

  const [assignedTo, setAssignedTo] = useState("Managed By"); // Track the selected assigned user

  //-----------------------------------------------> ALL-> ASSIGNED_TO DropDown <-functionality <-----------------------------------------------

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

  // ------------------------------------------Fillters---------------------------------

  function handle_AssignedTo(assignedToValue) {
    let filteredLeads = freeTrial;
    if (assignedToValue !== null && assignedToValue !== "Assigned to") {
      filteredLeads = filteredLeads.filter(
        (lead) => lead.assigned_To === assignedToValue,
      );
    }
    setFilteredTrails(filteredLeads); // Set the filtered result
  }

  // Handle selecting an assigned user
  function handleAssignedToSelection(user) {
    setAssignedTo(user); // Update assignedTo state
    handle_AssignedTo(user); // Apply both filters
  }

  // ----------------------------- Date Filter -----------------------------

  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  // Function to filter based on date range
  function handle_DateRange(startDate, endDate) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0); // Set to the start of the day

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Set to the end of the day

    const filteredFollows = freeTrial.filter((follow) => {
      const callbackDate = new Date(follow.call_bck_DateTime);
      // Log values for debugging
      console.log("Callback Date:", callbackDate, "Start:", start, "End:", end);
      return callbackDate >= start && callbackDate <= end;
    });

    setFilteredTrails(filteredFollows);
  }

  // Trigger handle_DateRange when startDate or endDate changes
  useEffect(() => {
    if (new Date(startDate) <= new Date(endDate)) {
      handle_DateRange(startDate, endDate);
    } else {
      console.error("Start date cannot be after end date");
    }
  }, [startDate, endDate]);

  // ------------------------------ Search Function ----------------------------------
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    // Reset to the first page when search results change
    setCurrentPage(1);

    const filtered = freeTrial.filter(
      (lead) =>
        lead.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        lead.mobileNo?.includes(searchTerm),
    );
    setFilteredTrails(filtered);
  }, [searchTerm, freeTrial]);

  // Calculate total pages based on filtered data length
  const totalPages = Math.ceil(filteredTrails.length / itemsPerPage);

  //------------------------------------------------------Filter Reset Settings ---------------------------------------------

  const handleResetFilter = () => {
    setFilteredTrails(freeTrial);
    // setLeadStatus('All Lead');
    setAssignedTo("Managed By");
  };

  //---------------------------------------------------- Roles & Permissions ----------------------------------------------------

  const businessRole = localStorage.getItem("businessRole");
  const [permissions, setPermissions] = useState([]);
  const [edit, setEdit] = useState(false);

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
          (item) => item.moduleName === "Free Trail",
        );

        if (serviceBoxPermissions) {
          const permissionsArray = serviceBoxPermissions.permissions.split(",");
          setPermissions(permissionsArray);

          console.log("List : ", permissionsArray);

          //------------------------------------------------------ Set permissions ------------------------------------------------

          setEdit(permissionsArray.includes("Edit Follow Up"));
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
    <div className="flex flex-col min-h-screen m-3">
      {/* Render the modal only when `isModalOpen` is true */}
      {isModalOpen && (
        <MassEmail
          emails={selectedEmails}
          onClose={closeModal} // Pass function to close modal
        />
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2 bg-white rounded-md">
        <div className="flex flex-wrap items-center justify-start gap-3 contact_Dropdown_Main_Container">
          {/* AllContact  DropDown*/}
          <div
            className="relative contact_Dropdown_Container whitespace-nowrap"
            onClick={toggleMenuAllFreeTrial}
            onMouseLeave={() => setAllFreeTrialdropDown(false)}
          >
            <button
              className="flex items-center justify-between px-4 py-2 truncate border rounded-md contact_Dropdown_Button min-w-40"
              id="dropdownDefaultButton"
              type="button"
            >
              Free Trail
              <FaAngleDown className="ml-2 text-gray-900" />
            </button>
            {allFreeTrialdropDown && (
              <div className="absolute bg-white border border-gray-300 rounded-md z-100 top-10">
                <ul className="py-2 text-sm text-gray-700">
                  {freeTrialDropdown.map((item) => (
                    <li
                      key={item.id}
                      className="block w-56 px-4 py-2 border-b cursor-pointer hover:bg-cyan-500 hover:text-white"
                      // onClick={() => handleTrialStatusButton(item.status)}
                    >
                      {item.value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* All ASSIGNED_TO  DropDown*/}
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
                <ul className="py-2 text-sm text-gray-700">
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

          {/* SEARCH DROPDOWN */}
          <SearchElement
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-start gap-3 action_Button_Main_Container">
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
              <div className="absolute right-0 z-10 w-32 py-2 bg-white border border-gray-300 rounded-md top-10">
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

          {/* ACTION DROPDOWM START */}
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
      {/* FILTER BY */}
      <div className="flex flex-wrap items-center justify-between gap-3 py-2 my-1">
        <div className="flex gap-3">
          <h1 className="text-3xl font-medium">Free Trail</h1>
          <h1 className="p-2 text-sm text-center text-white bg-blue-600 rounded shadow-md min-w-10">
            {freeTrial?.length}
          </h1>
        </div>

        {/* ------------------- Filter by date ----------------- */}
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
      {/* TABLE VIEW */}
      <div className="overflow-x-auto leads_Table_Main_Container">
        <div className="min-w-full rounded-md leads_Table_Container">
          {/*-------Table-------*/}
          {selectedViewValue === "Table View" && (
            <table className="min-w-full bg-white leads_Table">
              {/*--------------TABLE DATA START------------- */}
              <thead>
                <tr className="border-b-2 border-gray-300">
                  {/* CHECKBOX */}
                  <th className="px-3 py-3 font-medium text-left">
                    <input
                      type="checkbox"
                      onClick={selectAllCheckbox}
                      checked={selectAll}
                    />
                  </th>
                  {/* CLIENT NAME */}
                  <th className="px-1 py-3 font-medium text-left border-r">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-nowrap">Client Name</span>
                      <span>
                        <FaBars />
                      </span>
                    </div>
                  </th>
                  {/* MOBILE */}
                  <th className="px-1 py-3 font-medium text-left border-r">
                    <div className="flex items-center justify-between gap-3">
                      <span>Mobile</span>
                      <span>
                        <FaBars />
                      </span>
                    </div>
                  </th>
                  {/* Phone */}
                  {/* Email */}
                  <th className="px-1 py-3 font-medium text-left border-r">
                    <div className="flex items-center justify-between gap-3">
                      <span>Email</span>
                      <span>
                        <FaBars />
                      </span>
                    </div>
                  </th>
                  {/* MANAGED BY */}
                  <th className="px-1 py-3 font-medium text-left border-r">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-nowrap">Managed By</span>
                      <span>
                        <FaBars />
                      </span>
                    </div>
                  </th>
                  {/* SEGMENT */}
                  <th className="px-1 py-3 font-medium text-left border-r">
                    <div className="flex items-center justify-between gap-3">
                      <span>Segment</span>
                      <span>
                        <FaBars />
                      </span>
                    </div>
                  </th>
                  {/* Trail Start Date */}
                  <th className="px-1 py-3 font-medium text-left border-r">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-nowrap">Trail Start Date</span>
                      <span>
                        <FaBars />
                      </span>
                    </div>
                  </th>
                  {/* Trail End Date */}
                  <th className="py-3 pl-1 pr-3 font-medium text-left border-r">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-nowrap">Trail End Date</span>
                      <span>
                        <FaBars />
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              {/*--------------TABLE DATA END------------- */}
              {/*--------------TABLE DATA------------- */}
              <tbody>
                {currentLeads.map((order, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-300 cursor-pointer hover:bg-gray-200"
                  >
                    {/* CHECKBOX */}
                    <td className="px-3 py-4 text-sm leading-5 text-gray-600 border-b border-gray-300">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(order.id)}
                          onChange={(e) =>
                            handleCheckboxChange(order.id, order.email, e)
                          }
                        />
                      </div>
                    </td>
                    {/* CLIENT NAME */}
                    <td
                      className="px-1 py-4 text-sm leading-5 border-b border-gray-300"
                      onClick={
                        edit || businessRole === "Admin"
                          ? () => handleClick(order.id)
                          : undefined
                      }
                    >
                      <div className="flex items-center">
                        <span className="ml-2 w-[80px] break-all">
                          {order.name}
                        </span>
                      </div>
                    </td>
                    {/* MOBILE */}
                    <td className="px-1 py-4 text-sm leading-5 border-b border-gray-300">
                      <div className="flex items-center gap-1">
                        <span className="break-all">
                          <a
                            href={`tel:${order.mobileNo}`}
                            onClick={(event) => event.stopPropagation()}
                          >
                            {order.mobileNo}
                          </a>
                        </span>
                        <span className="text-red-400">
                          <MdCall />
                        </span>
                      </div>
                    </td>
                    {/* Email */}
                    <td className="px-1 py-4 text-sm leading-5 border-b border-gray-300">
                      <div className="break-all">{order.email}</div>
                    </td>
                    {/* Assigned To */}
                    <td className="px-1 py-4 text-sm border-b border-gray-300">
                      <div>{order.assigned_To}</div>
                    </td>
                    {/* SEGMENT */}
                    <td className="px-1 py-4 text-sm border-b border-gray-300 min-w-24 max-w-36">
                      <div>
                        {order.segments && (
                          <span className="">
                            {order.segments
                              .filter((segment) => segment.length > 1)
                              .join(", ")}
                          </span>
                        )}
                      </div>
                    </td>
                    {/* Trial Start Date */}
                    <td className="px-1 py-4 text-sm leading-5 border-b border-gray-300">
                      <div className="flex items-center break-words">
                        {order.trialStartDate
                          ? order.trialStartDate
                              .replace("T", " ")
                              .split(":")
                              .slice(0, 2)
                              .join(":")
                          : "N/A"}
                      </div>
                    </td>
                    {/* Trial End Date */}
                    <td className="py-4 pl-1 pr-3 text-sm leading-5 border-b border-gray-300">
                      <div className="flex items-center break-words">
                        {order.trialEndDate
                          ? order.trialEndDate
                              .replace("T", " ")
                              .split(":")
                              .slice(0, 2)
                              .join(":")
                          : "N/A"}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/*--------------TABLE DATA END------------- */}
            </table>
          )}
        </div>
      </div>

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
                  <div>
                    <div className="flex items-center py-2 text-center bg-white border-2 rounded border-cyan-500">
                      <div className="flex items-center justify-center gap-2 mx-auto">
                        <FaUserTie />
                        <span className="">
                          {item?.name[0].toUpperCase() + item?.name.substr(1)}
                        </span>
                      </div>
                      <AiOutlineEdit
                        className="p-1 mr-3 text-white rounded-full bg-cyan-400 hover:bg-cyan-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/panel/createtrial/${item.id}`);
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
                        <span className="hidden sm:block">Segments</span>
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
                        <span className="hidden sm:block">Managed By</span>
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
                        <span className="hidden sm:block">Trail End Date</span>
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

      {selectedViewValue === "Table View" && (
        <>
          <div className="flex justify-end m-4">
            {/* //---------------------->---------------------->PAGINATION-RENDERER<----------------------<---------------------- */}
            <nav className="flex items-center justify-center gap-2 mx-auto mt-4 text-center">
              {/* Previous Button */}
              <button
                onClick={() => paginate(currentPage - 1)}
                className={`rounded-full p-1 text-white shadow-md ${
                  currentPage === 1
                    ? "cursor-not-allowed border-2 border-gray-200"
                    : "border-2 border-gray-100 bg-cyan-500"
                }`}
                disabled={currentPage === 1}
              >
                <GrFormPrevious size={25} />
              </button>

              {/* Dynamic Page Numbers */}
              {Array.from({ length: totalPage }, (_, i) => i + 1).map(
                (page) => {
                  if (
                    page === 1 ||
                    page === totalPage ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => paginate(page)}
                        className={`mx-1 rounded px-4 py-2 ${
                          currentPage === page
                            ? "bg-blue-600 text-white"
                            : "border bg-white text-gray-700"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    (page === currentPage - 2 && page > 1) || // Ellipsis before current
                    (page === currentPage + 2 && page < totalPage) // Ellipsis after current
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
                className={`rounded-full p-1 text-white shadow-md ${
                  currentPage === totalPage
                    ? "cursor-not-allowed border-2 border-gray-200"
                    : "border-2 border-gray-100 bg-cyan-500"
                }`}
                disabled={currentPage === totalPage}
              >
                <GrFormNext size={25} />
              </button>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
