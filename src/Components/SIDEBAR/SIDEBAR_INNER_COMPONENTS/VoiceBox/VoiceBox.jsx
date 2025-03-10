import { useState, useEffect } from "react";
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
import { IoSearchOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

//Folder Imported
import { tenant_base_url, protocal_url } from "./../../../../Config/config";
import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";
import MassEmail from "../MassEmail/MassEmail";

export default function VoiceBox() {
  const navigate = useNavigate();
     //--------------------------------------- Set Business Type --------------------------------------------
                               const [BusinessType, setBusinessType] = useState("");
                                
                               useEffect(() => {
                                 const storedType = localStorage.getItem("businessType") || "";
                                 setBusinessType(storedType);
                               }, []);

  const bearer_token = localStorage.getItem("token");
  const name = getHostnamePart();

  // Mass Email
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState([]);

  const [voiceMainData, setVoiceMainData] = useState([]);
  const [getVoice, setGetVoice] = useState([]);
  // const [filteredVoice, setFilteredVoice] = useState([]);
  const [voiceBoxDropdown, setVoiceBoxDropdown] = useState(false);
  const [searchDropdown, setSearchDropdown] = useState(false);
  const [actionDropdown, setActionDropdown] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  //   HANDLE TABLE CLICK
  const handleMonitorClick = (id) => {
    navigate(`/panel/${BusinessType}/createvoice/${id}`);
  };

  //----------------GET----------------

  // Get Follow up lists
  const getVoiceBoxMonitorLists = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/VoiceBox/allvoicebox/byusertoken`,
        config,
      );
      if (response.status === 200) {
        const followup = response.data; // Get the user data
        setVoiceMainData(followup?.data); // Set the user data for editing
        setGetVoice(followup?.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getVoiceBoxMonitorLists();
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
    stripeBar[0].value,
  );

  // TOGGLE VOICEBOX DROPDOWN
  const toggleVoiceBoxDropdown = () => {
    setVoiceBoxDropdown(!voiceBoxDropdown);
  };

  // TOGGLE SEARCHBAR DROPDOWN
  const toggleSearchDropdown = () => {
    setSearchDropdown(!searchDropdown);
  };

  // TOGGLE ACTIONBAR DROPDOWN
  const toggleActionDropdown = () => {
    setActionDropdown(!actionDropdown);
  };

  //   SEARCH BAR DATA

  //   ALLVOICE DROPDOWN DATA
  const allVoiceDropdown = [
    { key: 1, value: "Man Insited" },
    { key: 2, value: "Man Insited" },
    { key: 3, value: "Man Insited" },
    { key: 4, value: "Man Insited" },
    { key: 4, value: "Man Insited" },
    { key: 4, value: "Man Insited" },
  ];

  // ACTION DROPDOWN DATA
  const dropActionsMenu = [
    { key: 1, value: "Mass Delete" },
    { key: 2, value: "Mass Update" },
    { key: 3, value: "Mass Email" },
    { key: 4, value: "Approve Leads" },
    // { key: 5, value: "Add to Campaign" },
    { key: 6, value: "Export Leads" },
    { key: 7, value: "Export To Excel" },
    { key: 8, value: "Export To PDF" },
  ];

  // On click of Action Button
  const handleActionButton = async (value) => {
    // ---------------------->MASS DELETE FUNCTIONALITY<----------------------
    if (value === "Mass Delete") {
      const userConfirmed = confirm(
        "Are you sure you want to Delete the selected Data?",
      );
      if (userConfirmed) {
        handleMassTrailDelete(selectedRows);
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
    // ---------------------->Export To Excel FUNCTIONALITY*<----------------------
    if (value === "Export To Excel") {
      const userConfirmed = confirm(
        "Are you sure you want to export the selected data?",
      );
      if (userConfirmed) {
        exportToTrailExcel(selectedRows);
      }
    }

    // ---------------------->Export To PDF FUNCTIONALITY*<----------------------
    if (value === "Export To PDF") {
      const userConfirmed = confirm(
        "Are you sure you want to export the selected Leads?",
      );
      if (userConfirmed) {
        exportToTrailPDF(selectedRows);
      }
    }
  };
  // ---------------------->MASS DELETE FUNCTIONALITY---###API###<----------------------
  // On click of Mass Delete Button
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
          `${protocal_url}${name}.${tenant_base_url}/VoiceBox/delete/${id}`,
          config,
        ),
      );

      // Wait for all delete requests to finish
      const responses = await Promise.all(deleteRequests);

      // Assuming you want to alert for each response, or just once for all
      getVoiceBoxMonitorLists(); // Refresh the list after deletion
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

  //---------------------->Export To Excel FUNCTIONALITY---###FUNCTION###<----------------------
  //-------> XLSX used here
  const exportToTrailExcel = () => {
    // Filter currentLeads based on selectedIds
    const leadsToExport = currentSms.filter((lead) =>
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
    XLSX.writeFile(wb, "SelectedFollowupData.xlsx");
  };

  //---------------------->Export TO PDF FUNCTIONALITY---###FUNCTION###<----------------------
  const exportToTrailPDF = () => {
    const leadsToExport = currentSms.filter((lead) =>
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
    doc.save("Followup.pdf");
  };

  // Function to toggle all checkboxes
  const selectAllCheckbox = () => {
    if (selectAll) {
      // Deselect all rows
      setSelectedRows([]);
      setSelectedEmails([]); // Clear selected emails
      setSelectAll(false);
    } else {
      // Select all rows in the current page
      const allIds = currentSms.map((order) => order.id);
      const allEmails = currentSms.map((order) => order.email); // Extract emails
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

  // Object containing the options
  const dynamicButtons = {
    Monitoring: { text: "Create View Box", href: `/panel/${BusinessType}/createvoice` },
    Reports: { text: "Create Reports", href: `/panel/${BusinessType}/createvoicereports` },
    "SMS via GMS Gateway": {
      text: "Send Details",
      href: `/panel/${BusinessType}/createvoicedetails`,
    },
  };

  const handleCheckboxClick = (e, id) => {
    e.stopPropagation(); // Prevent row click
    console.log("ID:", id); // Replace with your logic to handle checkbox click
  };

  const [selectedButton, setSelectedButton] = useState("Monitoring");

  // State to manage the button text
  const [buttonText, setButtonText] = useState({
    text: "Create View Box",
    href: `/panel/${BusinessType}/createvoice`,
  });

  // Function to handle option click using bracket notation
  const handleOptionClick = (key) => {
    console.log("Clicked key:", key);
    setButtonText(dynamicButtons[key]);
    setSelectedButton(key);
  };

  //---------------------->---------------------->PAGINATION<----------------------<----------------------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Define items per page

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //---------------------->---------------------->PAGINATION->FILTERLEADS/ <----------------------<----------------------
  const currentSms = voiceMainData.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // ----------------------------- Date Filter -----------------------------

  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  // Function to filter based on date range
  function handle_DateRange(startDate, endDate) {
    let filteredFollows = currentSms;

    // Convert startDate to the beginning of the day and endDate to the end of the day
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0); // Set time to 00:00:00

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Set time to 23:59:59

    if (startDate && endDate) {
      filteredFollows = filteredFollows.filter((follow) => {
        const callbackDate = new Date(follow.callDateTime);
        return callbackDate >= start && callbackDate <= end;
      });
    }

    setVoiceMainData(filteredFollows); // Update the filtered result
  }

  // UseEffect to trigger handle_DateRange on date change
  useEffect(() => {
    if (startDate <= endDate) {
      handle_DateRange(startDate, endDate);
    }
  }, [startDate, endDate]);

  return (
    <div className="m-3 flex min-h-screen flex-col">
      {/* Render the modal only when `isModalOpen` is true */}
      {isModalOpen && (
        <MassEmail
          emails={selectedEmails}
          onClose={closeModal} // Pass function to close modal
        />
      )}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-white px-3 py-2">
        <div className="flex gap-3">
          {/* TOP */}
          {/* ALL VOICEBOX DROPDOWN */}
          <div
            className="relative"
            onClick={toggleVoiceBoxDropdown}
            onMouseLeave={() => setVoiceBoxDropdown(false)}
          >
            <button
              className="flex items-center justify-between rounded-md border px-4 py-2"
              id="dropdownDefaultButton"
              type="button"
            >
              All Sales
              <FaAngleDown className="ml-2 text-gray-900" />
            </button>
            {voiceBoxDropdown && (
              <div className="absolute top-10 z-10 rounded-md border border-gray-300 bg-white">
                <ul className="py-2 text-sm text-gray-700">
                  {allVoiceDropdown.map(({ key, value }) => (
                    <li
                      className="block w-56 cursor-pointer border-b px-4 py-2 hover:bg-cyan-500 hover:text-white"
                      key={key}
                      // onClick={() => handleSmsBoxStatusButton(value)}
                    >
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* SEARCH DROPDOWN */}

          <div className="flex items-center justify-center">
            <input
              type="text"
              placeholder="Search..."
              className="w-full max-w-sm rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        {/* MIDDLE */}
        <div className="flex gap-2">
          {Object.keys(dynamicButtons).map((key) => (
            <button
              key={key}
              onClick={() => handleOptionClick(key)}
              className={`text-md rounded px-3 py-1.5 font-light shadow-md ${
                selectedButton === key
                  ? "bg-cyan-500 text-white"
                  : "bg-gray-100 text-gray-700"
              } `}
            >
              {key}
            </button>
          ))}
        </div>
        {/* BOTTOM */}
        <div className="flex gap-2">
          <Link to={buttonText.href}>
            <button className="text-md w-[150px] rounded-md bg-blue-600 px-2 py-2 text-center text-white shadow-md">
              {buttonText.text || "Create Voice Box"}
            </button>
          </Link>

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
              <div className="absolute top-10 z-10 w-56 rounded-md border border-gray-300 bg-white py-2">
                <ul className="text-sm text-gray-700">
                  {stripeBar.map(({ key, value }) => (
                    <li
                      key={key}
                      className="block cursor-pointer border-b px-4 py-2 hover:bg-cyan-500 hover:text-white"
                      onClick={() => handleStripeButton(value)}
                    >
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* ACTIONS DROPDOWN */}
          <div
            className="relative"
            onClick={toggleActionDropdown}
            onMouseLeave={() => setActionDropdown(false)}
          >
            <button
              className="flex items-center justify-between gap-2 rounded-lg border border-blue-600 px-4 py-2 text-blue-600"
              id="dropdownDefaultButton"
              type="button"
            >
              Actions
              <FaAngleDown className="text-gray-900" />
            </button>
            {actionDropdown && (
              <div className="absolute top-10 z-10 w-56 rounded-md border border-gray-300 bg-white py-2">
                <ul className="text-sm text-gray-700">
                  {dropActionsMenu.map(({ key, value }) => (
                    <li
                      key={key}
                      className="block cursor-pointer border-b px-4 py-2 hover:bg-cyan-500 hover:text-white"
                    >
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FILTER BY SECTION */}
      <div className="mb-3 mt-3 flex items-center justify-between gap-3">
        <div className="flex gap-3">
          <h1 className="text-3xl font-medium">Voice Box</h1>
          <h1 className="text-md min-w-10 rounded-md bg-blue-600 px-2 py-2 text-center text-white shadow-md">
            {voiceMainData.length}
          </h1>
        </div>

        {/* ------------------- Filter by date ----------------- */}

        <div className="flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white py-2">
          {/* Filter Icon Button */}
          <button className="border-r border-gray-500 px-3">
            <ImFilter className="filter_Image_Size" />
          </button>

          {/* Date Range Filter Button */}
          <button
            className="border-r border-gray-500 px-3"
            onClick={() => handle_DateRange(startDate, endDate)}
          >
            Filter By
          </button>

          {/* Date Range Inputs */}
          <div className="flex items-center gap-2 px-3">
            <label>From:</label>
            <input
              type="date"
              value={startDate}
              className="rounded border px-2 py-1"
              onChange={(e) => setStartDate(e.target.value)}
            />

            <label>To:</label>
            <input
              type="date"
              value={endDate}
              className="rounded border px-2 py-1"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ------------TABLE------------ */}
      <div className="leads_Table_Main_Container overflow-x-auto">
        {/* MONITORING TABLE */}
        <div className="leads_Table_Container min-w-full rounded-md">
          {selectedViewValue === "Table View" &&
            selectedButton === "Monitoring" && (
              <table className="leads_Table min-w-full bg-white">
                {/* ----------------- TABLE HEAD START ----------------- */}
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    {/* CHECKBOX */}
                    <th className="w-max px-3 py-3">
                      <input
                        type="checkbox"
                        onClick={selectAllCheckbox}
                        checked={selectAll}
                      />
                    </th>

                    {/* NAME */}
                    <th className="border-r px-2 py-3 text-left font-medium">
                      <div className="flex items-center justify-between">
                        <span className="text-nowrap pr-2">Name</span>
                        <FaBars />
                      </div>
                    </th>
                    {/* DISPOSITION */}
                    <th className="border-r px-2 py-3 text-left font-medium">
                      <div className="flex items-center justify-between">
                        <span className="text-nowrap pr-2">Disposition</span>
                        <FaBars />
                      </div>
                    </th>
                    {/* EMPLOYEE NAME */}
                    <th className="border-r px-2 py-3 text-left font-medium">
                      <div className="flex items-center justify-between">
                        <span className="text-nowrap pr-2">Employee Name</span>
                        <FaBars />
                      </div>
                    </th>
                    {/* CALL DATE */}
                    <th className="border-r px-2 py-3 text-left font-medium">
                      <div className="flex items-center justify-between">
                        <span className="text-nowrap pr-2">Call Date</span>
                        <FaBars />
                      </div>
                    </th>
                    {/* SOURCE */}
                    <th className="border-r px-2 py-3 text-left font-medium">
                      <div className="flex items-center justify-between">
                        <span className="text-nowrap pr-2">Source</span>
                        <FaBars />
                      </div>
                    </th>
                    {/* DURATION */}
                    <th className="border-r px-2 py-3 text-left font-medium">
                      <div className="flex items-center justify-between">
                        <span className="text-nowrap pr-2">Duration</span>
                        <FaBars />
                      </div>
                    </th>
                    {/* TYPE */}
                    <th className="border-r px-2 py-3 text-left font-medium">
                      <div className="flex items-center justify-between">
                        <span className="text-nowrap pr-2">Type</span>
                        <FaBars />
                      </div>
                    </th>
                    {/* STATUS */}
                    <th className="border-r px-2 py-3 text-left font-medium">
                      <div className="flex items-center justify-between">
                        <span className="text-nowrap pr-2">Status</span>
                        <FaBars />
                      </div>
                    </th>
                  </tr>
                </thead>
                {/* ----------------- TABLE HEAD END ----------------- */}

                {/* ----------------- TABLE BODY START ----------------- */}
                <tbody>
                  {currentSms.map((voice, index) => (
                    <tr
                      key={index}
                      className="cursor-pointer border-b border-gray-300 hover:bg-gray-200"
                    >
                      {/* CHECKBOX */}
                      <td className="w-max px-3 py-4 text-center">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(voice.id)}
                          onChange={(e) =>
                            handleCheckboxChange(voice.id, voice.email, e)
                          }
                        />
                      </td>

                      {/* NAME */}
                      <td
                        className="break-words border-b border-gray-300 px-2 py-4 text-sm leading-5 text-gray-600"
                        onClick={() => handleMonitorClick(voice.id)}
                      >
                        <div className="flex items-center">
                          <span className="ml-2 w-[80px] break-words">
                            {voice.clientName}
                          </span>
                        </div>
                      </td>
                      {/* DISPOSITION */}
                      <td className="border-b border-gray-300 px-2 py-4 text-sm leading-5 text-gray-600">
                        {voice.disposition}
                      </td>
                      {/* EMPLOYEE NAME */}
                      <td className="border-b border-gray-300 px-2 py-4 text-sm leading-5 text-gray-600">
                        <div className="flex items-center">
                          {/* <img
                            className="h-8 w-8 rounded-full"
                            src={voice.img}
                            alt="DP"
                          /> */}
                          <span className="ml-2 w-[80px] break-words">
                            {voice.employeeName}
                          </span>
                        </div>
                      </td>
                      {/* CALL DATE */}
                      <td className="border-b border-gray-300 px-2 py-4 text-sm leading-5 text-gray-600">
                        {voice.callDateTime.split("T")[0]}
                      </td>
                      {/* SOURCE */}
                      <td className="border-b border-gray-300 px-2 py-4 text-sm leading-5 text-gray-600">
                        <p className="text-blue-600">{voice.source}</p>
                      </td>
                      {/* DURATION */}
                      <td className="border-b border-gray-300 px-2 py-4 text-sm leading-5 text-gray-600">
                        {voice.duration}
                      </td>
                      {/* TYPE */}
                      <td className="border-b border-gray-300 px-2 py-4 text-sm leading-5 text-gray-600">
                        <p
                          className={
                            voice.type === "Incoming"
                              ? `text-green-600`
                              : `text-red-400`
                          }
                        >
                          {voice.type}
                        </p>
                      </td>
                      {/* STATUS */}
                      <td className="border-b border-gray-300 px-2 py-4 text-sm leading-5 text-gray-600">
                        {voice.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* ----------------- TABLE BODY END ----------------- */}
              </table>
            )}
        </div>

        {/* REPORTS TABLE */}
        <div className="leads_Table_Container min-w-full rounded-md">
          {selectedViewValue === "Table View" &&
            selectedButton === "Reports" && (
              <table className="leads_Table min-w-full bg-white">
                {/* ----- TABLE HEAD ----- */}
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    {/*   CHECKBOX */}
                    <th className="px-1 py-3">
                      <input type="checkbox" />
                    </th>
                    {/* EXTENSION */}
                    <th className="border-r px-1 py-3 text-left font-medium">
                      <div className="flex">
                        <span className="text-sm">Extension</span>
                      </div>
                    </th>
                    {/* NAME */}
                    <th className="border-r px-1 py-3 text-left font-medium">
                      <div className="flex justify-around">
                        <span className="text-sm">Name</span>
                        <span className="flex items-center text-sm">
                          <FaBars />
                        </span>
                      </div>
                    </th>
                    {/* EMPLOYEE CODE */}
                    <th className="border-r px-1 py-3 text-left font-medium">
                      <div className="flex justify-around">
                        <span className="text-sm">Employee Code</span>
                        <span className="flex items-center text-sm">
                          <FaBars />
                        </span>
                      </div>
                    </th>
                    {/* DESIGNATION */}
                    <th className="border-r px-1 py-3 text-left font-medium">
                      <div className="flex justify-around">
                        <span className="text-sm">Designation</span>
                        <span className="flex items-center text-sm">
                          <FaBars />
                        </span>
                      </div>
                    </th>
                    {/* REPORTING TO */}
                    <th className="border-r px-1 py-3 text-left font-medium">
                      <div className="flex justify-around">
                        <span className="text-sm">Reporting To</span>
                        <span className="flex items-center text-sm">
                          <FaBars />
                        </span>
                      </div>
                    </th>
                    {/* INCOMING CALLS */}
                    <th className="border-r px-1 py-3 text-left font-medium">
                      <div className="flex justify-around">
                        <span className="text-sm">Incoming Calls</span>
                        <span className="flex items-center text-sm">
                          <FaBars />
                        </span>
                      </div>
                    </th>
                    {/* TOATAL INCOMING CALLS */}
                    <th className="border-r px-1 py-3 text-left font-medium">
                      <div className="flex justify-around">
                        <span className="text-sm">Total Incoming Calls</span>
                        <span className="flex items-center text-sm">
                          <FaBars />
                        </span>
                      </div>
                    </th>
                    {/* OUTGOING CALLS */}
                    <th className="border-r px-1 py-3 text-left font-medium">
                      <div className="flex justify-around">
                        <span className="text-sm">Outgoing Calls</span>
                        <span className="flex items-center text-sm">
                          <FaBars />
                        </span>
                      </div>
                    </th>
                    {/* TOTAL TIME */}
                    <th className="border-r px-1 py-3 text-left font-medium">
                      <span>Total Time</span>
                    </th>
                  </tr>
                </thead>
                {/* ----- TABLE BODY ----- */}
                <tbody>
                  {currentSms.map((sms, index) => (
                    <tr
                      key={index}
                      className="cursor-pointer border-b border-gray-300 hover:bg-gray-200"
                      // onClick={() => handleClick(sms)}
                    >
                      {/*   CHECKBOX */}
                      <td className="px-3 py-4 text-center">
                        <input
                          type="checkbox"
                          onClick={(e) => handleCheckboxClick(e, sms.id)}
                        />
                      </td>
                      {/* EXTENSION */}
                      <td className="border-b border-gray-300 px-3 py-4 text-sm leading-5 text-gray-600">
                        <div className="flex items-center">
                          <span className="ml-2">{sms.extension}</span>
                        </div>
                      </td>
                      {/* NAME */}
                      <td className="border-b border-gray-300 px-3 py-4 text-sm leading-5 text-gray-600">
                        <div className="flex items-center">
                          <span className="ml-2">{sms.name}</span>
                        </div>
                      </td>
                      {/* EMPLOYEE CODE */}
                      <td className="border-b border-gray-300 px-3 py-4 text-sm leading-5 text-gray-600">
                        <div className="flex items-center">
                          <span className="ml-2">{sms.employCode}</span>
                        </div>
                      </td>
                      {/* DESIGNATION */}
                      <td className="border-b border-gray-300 px-3 py-4 text-sm leading-5 text-gray-600">
                        <div className="flex items-center">
                          <span className="ml-2">{sms.designation}</span>
                        </div>
                      </td>
                      {/* REPORTING TO */}
                      <td className="border-b border-gray-300 px-3 py-4 text-sm leading-5 text-gray-600">
                        <div className="flex items-center">
                          <span className="ml-2">{sms.reportingTo}</span>
                        </div>
                      </td>
                      {/* INCOMING CALLS */}
                      <td className="border-b border-gray-300 px-3 py-4 text-sm leading-5 text-gray-600">
                        <div className="flex items-center">
                          <span className="ml-2 text-blue-500">
                            {sms.incomingCalls}
                          </span>
                        </div>
                      </td>
                      {/* TOTAL INCOMING CALLS */}
                      <td className="border-b border-gray-300 px-3 py-4 text-sm leading-5 text-gray-600">
                        <div className="flex items-center">
                          <span className="ml-2">{sms.totalIncomingCalls}</span>
                        </div>
                      </td>
                      {/* OUTGOING CALLS */}
                      <td className="border-b border-gray-300 px-3 py-4 text-sm leading-5 text-gray-600">
                        <div className="flex items-center">
                          <span className="ml-2 text-red-500">
                            {sms.outgoingCalls}
                          </span>
                        </div>
                      </td>
                      {/* TOTAL TIME OUTGOING CALLS */}
                      <td className="border-b border-gray-300 px-3 py-4 text-sm leading-5 text-gray-600">
                        <div className="flex items-center">
                          <span className="ml-2">{sms.totalTime}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
        </div>

        {/* GATEWAY TABLE */}
        <div className="leads_Table_Container min-w-full rounded-md">
          {selectedViewValue === "Table View" &&
            selectedButton === "SMS via GMS Gateway" && (
              <table className="leads_Table min-w-full bg-white">
                {/* -------- TABLE HEAD -------- */}
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    {/* CHECKBOX */}
                    <th className="px-1 py-3">
                      <input type="checkbox" />
                    </th>
                    {/* CLIENT NAME */}
                    <th className="border-r px-1 py-3 text-left font-medium">
                      <div className="flex">
                        <span className="text-sm">Client Name</span>
                      </div>
                    </th>
                    {/* MOBILE */}
                    <th className="border-r px-1 py-3 text-left font-medium">
                      <div className="flex justify-between">
                        <span className="text-sm">Mobile</span>
                        <span className="flex items-center text-sm">
                          <FaBars />
                        </span>
                      </div>
                    </th>
                    {/* MESSAGE */}
                    <th className="border-r px-1 py-3 text-left font-medium">
                      <div className="flex justify-between">
                        <span className="text-sm">Message</span>
                        <span className="flex items-center text-sm">
                          <FaBars />
                        </span>
                      </div>
                    </th>
                    {/* TYPE */}
                    <th className="border-r px-1 py-3 text-left font-medium">
                      <div className="flex justify-between">
                        <span className="text-sm">Type</span>
                        <span className="flex items-center text-sm">
                          <FaBars />
                        </span>
                      </div>
                    </th>
                    {/* MESSAGE TIME */}
                    <th className="border-r px-1 py-3 text-left font-medium">
                      <div className="flex">
                        <span className="text-sm">Message Time</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                {/* -------- TABLE BODY -------- */}
                <tbody>
                  {currentSms.map((data, index) => (
                    <tr
                      key={index}
                      className="cursor-pointer border-b border-gray-300 hover:bg-gray-200"
                      // onClick={() => handleClick(data)}
                    >
                      {/*   CHECKBOX */}
                      <td className="px-3 py-4 text-center">
                        <input
                          type="checkbox"
                          onClick={(e) => handleCheckboxClick(e, data.id)}
                        />
                      </td>
                      {/*   CLIENT NAME */}
                      <td className="border-b border-gray-300 px-3 py-4 text-sm leading-5 text-gray-600">
                        <div className="flex items-center">
                          <img
                            className="h-8 w-8 rounded-full"
                            src={data.img}
                            alt="DP"
                          />
                          <span className="ml-2 w-[120px] break-words">
                            {data.clientName}
                          </span>
                        </div>
                      </td>
                      {/* MOBILE */}
                      <td className="border-b border-gray-300 px-3 py-4 text-sm leading-5 text-gray-600">
                        <div className="flex items-center">
                          <span className="ml-2">{data.mobile}</span>
                        </div>
                      </td>
                      {/* MESSAGE */}
                      <td className="border-b border-gray-300 px-3 py-4 text-sm leading-5 text-gray-600">
                        <div className="flex items-center">
                          <span className="ml-2">{data.message}</span>
                        </div>
                      </td>
                      {/* TYPE */}
                      <td className="border-b border-gray-300 px-3 py-4 text-sm leading-5 text-gray-600">
                        <div className="flex items-center">
                          <span className="ml-2">{data.type}</span>
                        </div>
                      </td>
                      {/* MESSAGE TIME */}
                      <td className="border-b border-gray-300 px-3 py-4 text-sm leading-5 text-gray-600">
                        <div className="flex items-center">
                          <span className="ml-2">{data.messageTime}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
        </div>
      </div>

      {/* PAGINATION */}
      {selectedViewValue === "Grid View" && (
        <>
          <div className="min-w-full">
            <div className="grid grid-cols-3 gap-3">
              {/*---------Card starts Here */}
              {currentSms.map((item) => (
                <div
                  className="flex flex-col gap-2 rounded-lg border-2 bg-white px-2 py-3"
                  key={item.id}
                >
                  <div className="flex items-center gap-3">
                    <img src={item.img} height={60} width={60} />
                    <div className="flex grow flex-col">
                      <div className="flex justify-between font-medium">
                        <span className="text-indigo-500">{item.name}</span>
                        <BiEdit
                          size={25}
                          className="rounded-full bg-white p-1 text-blue-500 shadow-md"
                          // onClick={() => handleClick(item.id)}
                        />
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium">
                        {item.leadesStatus}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center rounded-lg border-2 bg-gray-100 px-2 py-1">
                    <div className="w-2/4 text-sm text-gray-500">
                      Client Name
                    </div>
                    <div className="2-2/4 text-sm font-medium">
                      {item.clientName}
                    </div>
                  </div>

                  <div className="flex items-center rounded-lg border-2 bg-gray-100 px-2 py-1">
                    <div className="w-2/4">
                      <IoIosMail className="text-2xl" />
                    </div>
                    <div className="2-2/4 text-sm font-medium">
                      {item.email}
                    </div>
                  </div>

                  <div className="flex items-center rounded-lg border-2 bg-gray-100 px-2 py-1">
                    <div className="w-2/4">
                      <FaPhoneAlt className="text-xl" />
                    </div>
                    <div className="2-2/4 text-sm font-medium">
                      {item.phoneNo}
                    </div>
                  </div>
                  <div className="flex items-center rounded-lg border-2 bg-gray-100 px-2 py-1">
                    <div className="w-2/4 text-sm text-gray-500">
                      Follow Up Date
                    </div>
                    <div className="2-2/4 text-sm font-medium">
                      {item.call_bck_DateTime.replace("T", " ")}
                    </div>
                  </div>
                  <div className="flex items-center rounded-lg border-2 bg-gray-100 px-2 py-1">
                    <div className="w-2/4 text-sm text-gray-500">Segment</div>
                    <div className="2-2/4 text-sm font-medium">
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
      <div className="m-4 flex justify-end">
        <nav>
          <ul className="inline-flex items-center">
            {Array.from(
              { length: Math.ceil(getVoice.length / itemsPerPage) },
              (_, i) => (
                <li key={i + 1}>
                  <button
                    onClick={() => paginate(i + 1)}
                    className={`mx-1 px-4 py-2 ${
                      currentPage === i + 1
                        ? "bg-blue-500 text-white"
                        : "border bg-white text-gray-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                </li>
              ),
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}
