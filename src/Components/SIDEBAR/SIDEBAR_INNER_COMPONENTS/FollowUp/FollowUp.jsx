import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//external Packages
import axios from "axios";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
//React Icons
import { FaAngleDown, FaBars, FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import { ImFilter } from "react-icons/im";
import { MdCall } from "react-icons/md";
//Folder Imported
import { tenant_base_url, protocal_url } from "./../../../../Config/config";
import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";
import MassEmail from "../MassEmail/MassEmail";
import {SearchElement} from "../SearchElement/SearchElement";

export default function FollowUp() {
  const navigate = useNavigate();

  const bearer_token = localStorage.getItem("token");
  const name = getHostnamePart();
  // All States
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  // Mass Email
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [followupList, setFollowupList] = useState([]);
  const [followupDropdown, setFollowupDropdown] = useState(false);
  const [actionDropdown, setActionDropdown] = useState(false);
  //created such that to filter leads according to leadStatus
  const [filteredLeads, setFilteredLeads] = useState([]); // Filtered
  //----------------GET----------------

  // Get Follow up lists
  const getFollowupLists = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/FollowUp/byusertoken`,
        config
      );
      if (response.status === 200) {
        const followup = response.data; 
        setFollowupList(followup?.data); 
        setFilteredLeads(followup?.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getFollowupLists();
  }, []);
  //----------------STRIPE BAR DROPDOWN----------------
  const stripeBar = [
    { key: 1, value: "Table View" },
    { key: 2, value: "Grid View" },
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
    stripeBar[0].value
  );

  //   TOGGLE FOLLOWUP DROPDOWN
  const toggleFollowupDropdown = () => {
    setFollowupDropdown(!followupDropdown);
  };


  //   TOGGLE STRIPEBAR DROPDOWN
  const toggleActionDropdown = () => {
    setActionDropdown(!actionDropdown);
  };

  //   TOGGLE STRIPEBAR DROPDOWN

  //   FOLLOW UP DROPDOWN DATA
  const followup = [
    { key: 1, value: "Man Insited" },
    { key: 2, value: "Man Insited" },
    { key: 3, value: "Man Insited" },
    { key: 4, value: "Man Insited" },
    { key: 4, value: "Man Insited" },
    { key: 4, value: "Man Insited" },
  ];


  //------------------------------------------------------------------------------------------------
  //----------------ACTION BAR DROPDOWN----------------
  const actions = [
    { key: 1, value: "Mass Delete" },
    { key: 2, value: "Mass Update" },
    { key: 3, value: "Mass Email" },
    { key: 4, value: "Approve Leads" },
    { key: 5, value: "Export Leads" },
    { key: 6, value: "Sheet View" },
    { key: 7, value: "Print View" },
  ];

  // On click of Action Button
  const handleActionButton = async (value) => {
    // ---------------------->MASS DELETE FUNCTIONALITY<----------------------
    if (value === "Mass Delete") {
      const userConfirmed = confirm(
        "Are you sure you want to Delete the selected Data?"
      );
      if (userConfirmed) {
        handleMassTrailDelete(selectedRows);
      }
    }
    // ---------------------->MASS E-Mail FUNCTIONALITY<----------------------
    if (value === "Mass Email") {
      const userConfirmed = confirm(
        "Are you sure you want to Send E-Mail to the selected Data?"
      );
      if (userConfirmed) {
        openMassEmailModal(selectedRows);
      }
    }
    // ---------------------->SHEET VIEW FUNCTIONALITY*<----------------------
    if (value === "Sheet View") {
      const userConfirmed = confirm(
        "Are you sure you want to export the selected data?"
      );
      if (userConfirmed) {
        exportToTrailExcel(selectedRows);
      }
    }

    // ---------------------->PRINT VIEW FUNCTIONALITY*<----------------------
    if (value === "Print View") {
      const userConfirmed = confirm(
        "Are you sure you want to export the selected Leads?"
      );
      if (userConfirmed) {
        exportToTrailPDF(selectedRows);
      }
    }
  };
  // ---------------------->MASS DELETE FUNCTIONALITY---###API###<----------------------

  const handleMassTrailDelete = async (ids) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };

      // Use Promise.all to delete all selected IDs in parallel
      const deleteRequests = ids.map((id) =>
        axios.delete(
          `${protocal_url}${name}.${tenant_base_url}/FollowUp/delete/${id}`,
          config
        )
      );

      // Wait for all delete requests to finish
      const responses = await Promise.all(deleteRequests);

      // Assuming you want to alert for each response, or just once for all
      getFollowupLists(); // Refresh the list after deletion
      alert(`${responses.length} items successfully deleted.`);
    } catch (error) {
      console.error("Error deleting follow-ups:", error);
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
  const exportToTrailExcel = () => {
    // Filter currentLeads based on selectedIds
    const leadsToExport = currentFollows.filter((lead) =>
      selectedRows.includes(lead.id)
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
    XLSX.writeFile(wb, "SelectedFollowupData.xlsx");
  };

  //---------------------->Export TO PDF FUNCTIONALITY---###FUNCTION###<----------------------
  const exportToTrailPDF = () => {
    const leadsToExport = currentFollows.filter((lead) =>
      selectedRows.includes(lead.id)
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
    doc.save("Followup.pdf");
  };

  //---------------------->---------------------->PAGINATION<----------------------<----------------------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Define items per page

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //---------------------->---------------------->PAGINATION->FILTERLEADS/ <----------------------<----------------------
  const currentFollows = filteredLeads?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to toggle all checkboxes
  const selectAllCheckbox = () => {
    if (selectAll) {
      // Deselect all rows
      setSelectedRows([]);
      setSelectedEmails([]); // Clear selected emails
      setSelectAll(false);
    } else {
      // Select all rows in the current page
      const allIds = currentFollows.map((order) => order.id);
      const allEmails = currentFollows.map((order) => order.email); // Extract emails
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

      // Log the updated selectedEmails
      console.log("@@@===", newSelectedEmails);
      return newSelectedEmails;
    });

    setSelectAll(false); // Uncheck "Select All" if individual checkbox is toggled
  };

  // Navigate to Edit Screen
  const handleClick = (id) => {
    navigate(`/sidebar/createfollowup/${id}`);
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
        config
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
    let filteredLeads = followupList;
    if (assignedToValue !== null && assignedToValue !== "Assigned to") {
      filteredLeads = filteredLeads.filter(
        (lead) => lead.assigned_To === assignedToValue
      );
    }
    setFilteredLeads(filteredLeads); // Set the filtered result
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
    let filteredFollows = currentFollows;

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



  // ------------------------------ Search Function ----------------------------------

  
  const [searchTerm, setSearchTerm] = useState(""); // State for search term


  useEffect(() => {
    const filtered = followupList.filter((lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.mobileNo.includes(searchTerm)
    );
    setFilteredLeads(filtered);
  }, [searchTerm, followupList]);




  return (
    <>
      {/* -------- PARENT -------- */}
      <div className="min-h-screen flex flex-col m-3 ">
      
        {/* Render the modal only when `isModalOpen` is true */}
        {isModalOpen && (
          <MassEmail
          emails={selectedEmails}
          onClose={closeModal} // Pass function to close modal
          />
        )}
        {/* containerbar*/}
        <div className="flex justify-between px-3 py-2 items-center bg-white  rounded-lg">
          {/* PART-I */}
          {/* container- FollowUp, search */}
          <div className="flex gap-3 items-center justify-center ">
            {/* ALL FOLLOW UPS DROPDOWN */}
            <div
              className="relative"
              onClick={toggleFollowupDropdown}
              onMouseLeave={() => setFollowupDropdown(false)}
            >
              <button
                className="py-2 px-4 border rounded-md  flex justify-between items-center"
                id="dropdownDefaultButton"
                type="button"
              >
                All Follow Up
                <FaAngleDown className="ml-2 text-gray-900" />
              </button>
              {followupDropdown && (
                <div className="absolute bg-white border border-gray-300 rounded-md top-10 z-10">
                  <ul className="py-2 text-sm text-gray-700">
                    {followup.map(({ key, value }) => (
                      <li
                        className="block w-56 px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                        key={key}
                        // onClick={handleActionButton(value)}
                      >
                        {value}
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
                  <ul className="py-2 text-sm text-gray-700">
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
            {/* SEARCH DROPDOWN */}
            <SearchElement value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          {/* PART-II */}
          <div className="flex gap-3 items-center justify-center">
            {/* PART-II */}
            {/* Stripe-BarDropDown */}
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
                <div className="absolute w-56 py-2 bg-white border border-gray-300 rounded-md top-10 z-10">
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
            {/* ACTIONS DROPDWON */}
            <div className="relative" onClick={toggleActionDropdown} onMouseLeave={() => setActionDropdown(false)}>
            <button
              className="py-2 px-4 border rounded-lg gap-2 flex justify-between items-center text-blue-600  border-blue-600"
              id="dropdownDefaultButton"
              type="button"
            >
              Actions
              <FaAngleDown className="text-gray-900" />
            </button>
            {actionDropdown && (
              <div className="absolute w-56 py-2 bg-white border border-gray-300 rounded-md top-10 right-0 z-10">
                <ul className="text-sm text-gray-700 " >
                  {actions.map(({ key, value }) => (
                    <li
                      key={key}
                      className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                      onClick={() => handleActionButton(value)}
                    >
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
            {/* END ACTIONS DROPDWON */}
          </div>
        </div>
        {/* MIDDLE SECTION */}
        <div className="my-1 flex py-2 items-center justify-between gap-3">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-3xl font-medium ">Follow Up</h1>
            <h1 className="bg-blue-600 text-white p-2   min-w-10 text-center rounded-md text-sm shadow-md">
              {followupList.length}{" "}
            </h1>
          </div>
          {/* ------------------- Filter by date ----------------- */}

          <div className="flex bg-white border-2 border-gray-300 py-2 rounded-lg justify-center items-center">
            {/* Filter Icon Button */}
            <button className="border-r border-gray-500 px-3">
              <ImFilter />
            </button>

            {/* Date Range Filter Button */}
            <button className="border-r border-gray-500 px-3">Filter By</button>

            {/* Date Range Inputs */}
            <div className="px-3 flex items-center gap-2">
              <label>From:</label>
              <input
                type="date"
                value={startDate}
                className="border rounded px-2 py-1"
                onChange={(e) => setStartDate(e.target.value)}
              />

              <label>To:</label>
              <input
                type="date"
                value={endDate}
                className="border rounded px-2 py-1"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* TABLE VIEW */}
        <div className="overflow-x-auto">
          <div className="min-w-full rounded-md overflow-hidden">
            {/*--------------TABLE HEAD START------------- */}
            {selectedViewValue === "Table View" && (
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="border-gray-300 border-b-2">
                    {/* CHECKBOX for Select All */}
                    <th className="px-4 py-3 text-left font-medium">
                      <input
                        type="checkbox"
                        onClick={selectAllCheckbox}
                        checked={selectAll}
                      />
                    </th>
                    {/* CLIENT NAME */}
                    <th className="px-3 py-3  text-left  border-r font-medium ">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-nowrap">Client Name</span>
                        <span>
                          <FaBars />
                        </span>
                      </div>
                    </th>
                    {/* MOBILE */}
                    <th className="px-3 py-3  text-left  border-r font-medium ">
                      <div className="flex items-center justify-between gap-3">
                        <span>Mobile</span>
                        <span>
                          <FaBars />
                        </span>
                      </div>
                    </th>
                    {/* Email */}
                    <th className="px-1 py-3  text-left  border-r font-medium ">
                      <div className="flex items-center justify-between gap-3">
                        <span>Email</span>
                        <span>
                          <FaBars />
                        </span>
                      </div>
                    </th>
                    {/* SEGMENT */}
                    <th className="px-3 py-3  text-left  border-r font-medium ">
                      <div className="flex items-center justify-between gap-3">
                        <span>Segment</span>
                        <span>
                          <FaBars />
                        </span>
                      </div>
                    </th>

                    {/* FOLLOW UP */}
                    <th className="px-3 py-3  text-left  border-r font-medium ">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-nowrap">Follow Up</span>
                        <span>
                          <FaBars />
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                {/*--------------TABLE HEAD END------------- */}
                {/*--------------TABLE DATA START------------- */}
                <tbody>
                  {currentFollows.map((order) => {
                    return (
                      <tr
                        key={order.id}
                        className="cursor-pointer hover:bg-gray-200 border-gray-300 border-b"
                      >
                        {/* CHECKBOX */}
                        <td className="px-4 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
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
                          className="px-3 py-4 border-b border-gray-300 text-sm leading-5 "
                          onClick={() => handleClick(order.id)}
                        >
                          <div className="flex items-center">
                            <span className="ml-2 w-[80px] break-words">
                              {order.name}
                            </span>
                          </div>
                        </td>
                        {/* MOBILE */}
                        <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 ">
                          <div className="flex items-center gap-1">
                            <span>{order.mobileNo}</span>
                            <span className="text-red-400">
                              <MdCall />
                            </span>
                          </div>
                        </td>
                        {/* Email */}
                        <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 ">
                          <div className="flex items-center">{order.email}</div>
                        </td>
                        {/* SEGMENT */}
                        <td className="px-1 py-4 border-b border-gray-300 text-sm max-w-36 min-w-24">
                          <div className="grid grid-cols-2 gap-1 items-center">
                            {order.segments && (
                              <span className="">
                                {order.segments
                                  .filter((segment) => segment.length > 1)
                                  .join(", ")}
                              </span>
                            )}
                          </div>
                        </td>
                        {/* FOLLOW UP */}
                        <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 ">
                          <div className="flex items-center text-nowrap"
                          // onClick={() => }
                          >
                            {order.call_bck_DateTime.replace("T", " ")}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                {/*--------------TABLE DATA END------------- */}
              </table>
            )}
          </div>

          {/* Grid View */}
          {selectedViewValue === "Grid View" && (
            <>
              <div className="min-w-full">
                <div className="grid grid-cols-3 gap-3">
                  {/*---------Card starts Here */}
                  {currentFollows.map((item) => (
                    <div
                      className="flex flex-col gap-2 bg-white px-2 py-3 rounded-lg border-2"
                      key={item.id}
                    >
                      <div className="flex items-center gap-3">
                        <img src={item.img} height={60} width={60} />
                        <div className="flex flex-col grow">
                          <div className="flex justify-between font-medium">
                            <span className="text-indigo-500">{item.name}</span>
                            <BiEdit
                              size={25}
                              className="bg-white rounded-full shadow-md text-blue-500 p-1"
                              onClick={() => handleClick(item.id)}
                            />
                          </div>
                          <div className="flex items-center gap-2 text-sm font-medium">
                            {item.leadesStatus}
                          </div>
                        </div>
                      </div>
                      <div className="flex px-2 py-1 bg-gray-100 border-2 items-center rounded-lg">
                        <div className="w-2/4 text-gray-500 text-sm">
                          Client Name
                        </div>
                        <div className="2-2/4 font-medium text-sm">
                          {item.name}
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
                          Follow Up Date
                        </div>
                        <div className="2-2/4 font-medium text-sm">
                          {item.call_bck_DateTime.replace("T", " ")}
                        </div>
                      </div>
                      <div className="flex px-2 py-1 bg-gray-100 border-2 items-center rounded-lg">
                        <div className="w-2/4 text-gray-500 text-sm">
                          Segment
                        </div>
                        <div className="2-2/4 font-medium text-sm">
                          {item.segments && (
                            <span className="">
                              {item.segments
                                .filter((segment) => segment.length > 1)
                                .join(", ")}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          <div className="flex justify-end m-4">
            <nav>
              <ul className="inline-flex items-center">
                {Array.from(
                  {
                    length: Math.ceil(filteredLeads.length / itemsPerPage),
                  },
                  (_, i) => (
                    <li key={i + 1}>
                      <button
                        onClick={() => paginate(i + 1)}
                        className={`px-4 py-2 mx-1 ${
                          currentPage === i + 1
                            ? "bg-blue-500 text-white"
                            : "bg-white text-gray-700 border"
                        }`}
                      >
                        {i + 1}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}