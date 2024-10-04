import { useState, useEffect } from "react";
//external Packages
import axios from "axios";
//React Icons
import { FaAngleDown, FaBars } from "react-icons/fa";
import { ImFilter } from "react-icons/im";
import { IoSearchOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
//Folder Imported
import { tenant_base_url, protocal_url } from "./../../../../Config/config";
import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

export default function VoiceBox() {
  const navigate = useNavigate();

  const bearer_token = localStorage.getItem("token");
  const name = getHostnamePart();

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
    navigate(`/sidebar/createvoice/${id}`);
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
        config
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
    stripeBar[0].value
  );

  //   FOR SAVING VALUES
  // function handleSmsBoxStatusButton(value) {
  //   console.log(value);
  //   if (value === null || value === "ALL") {
  //     setFilteredVoice(getVoice);
  //   } else {
  //     // Filter leads based on the value
  //     const filtered = getVoice.filter(
  //       (getleads) => getleads.leadesStatus === value
  //     );
  //     console.log(filtered);
  //   }
  // }

  // Function to toggle individual checkboxes
  const handleCheckboxChange = (id, e) => {
    e.stopPropagation();
    console.log("Checkbox clicked: ", id);
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
    );
    setSelectAll(false);
    console.log("Updated selectedRows: ", selectedRows);
  };

  // Function to toggle all checkboxes
  const selectAllCheckbox = () => {
    if (selectAll) {
      // If already selected, deselect everything
      setSelectedRows([]);
      setSelectAll(false);
    } else {
      // Select all rows in the current page
      const allIds = currentSms.map((order) => order.id);
      setSelectedRows(allIds);
      setSelectAll(true);
    }
  };

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
  const searchBar = [
    { key: 0, value: "Search" },
    { key: 1, value: "Touched Records" },
    { key: 2, value: "Untouched Records" },
    { key: 3, value: "Reecord Action" },
    { key: 4, value: "Related Records Action" },
    { key: 5, value: "Locked" },
    { key: 6, value: "Latest Email Status" },
    { key: 7, value: "Activities" },
    { key: 8, value: "Notes" },
    { key: 9, value: "Campaigns" },
  ];

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
    { key: 0, value: "Actions" },
    { key: 1, value: "Mass Delete" },
    { key: 2, value: "Mass Update" },
    { key: 3, value: "Mass Email" },
    { key: 4, value: "Approve Leads" },
    { key: 5, value: "Add to Campaign" },
    { key: 6, value: "Export Leads" },
    { key: 7, value: "Sheet View" },
    { key: 8, value: "Print View" },
  ];

  // Object containing the options
  const dynamicButtons = {
    Monitoring: { text: "Create View Box", href: "/sidebar/createvoice" },
    Reports: { text: "Create Reports", href: "/sidebar/createreports" },
    "SMS via GMS Gateway": {
      text: "Send Details",
      href: "/sidebar/createvoicedetails",
    },
  };

  // On click of Action Button
  const handleActionClick = (key) => {
    if (
      key === 1 &&
      selectedRows.length > 0 &&
      selectedButton === "Monitoring"
    ) {
      handleMonitorMassDelete(selectedRows); // Pass selected rows when deleting
    }
    // Add other conditions for different actions if needed
  };
  // On click of Mass Delete Button
  const handleMonitorMassDelete = async (ids) => {
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
          config
        )
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

  const handleCheckboxClick = (e, id) => {
    e.stopPropagation(); // Prevent row click
    console.log("ID:", id); // Replace with your logic to handle checkbox click
  };

  const [selectedButton, setSelectedButton] = useState("Monitoring");

  // State to manage the button text
  const [buttonText, setButtonText] = useState({
    text: "Create View Box",
    href: "/sidebar/createvoice",
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
if(startDate<=endDate){
  handle_DateRange(startDate, endDate);
}
}, [startDate, endDate]); 

  return (
    <div className="min-h-screen flex flex-col m-3">
      <div className="py-2 px-3 bg-white flex items-center justify-between rounded-md">
        <div className="flex gap-3">
          {/* TOP */}
          {/* ALL VOICEBOX DROPDOWN */}
          <div
            className="relative"
            onClick={toggleVoiceBoxDropdown}
            onMouseLeave={() => setVoiceBoxDropdown(false)}
          >
            <button
              className="py-2 px-4 border rounded-md  flex justify-between items-center"
              id="dropdownDefaultButton"
              type="button"
            >
              All Sales
              <FaAngleDown className="ml-2 text-gray-900" />
            </button>
            {voiceBoxDropdown && (
              <div className="absolute bg-white border border-gray-300 rounded-md top-10 z-10">
                <ul className="py-2 text-sm text-gray-700">
                  {allVoiceDropdown.map(({ key, value }) => (
                    <li
                      className="block w-56 px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
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
          <div className="relative">
            <button
              className="py-2 px-4 border rounded-full gap-2 flex justify-between items-center"
              id="dropdownDefaultButton"
              type="button"
              onClick={toggleSearchDropdown}
            >
              <span>
                <IoSearchOutline />
              </span>
              <span>Search</span>
            </button>

            {searchDropdown && (
              <div
                className="absolute bg-white border border-gray-300 rounded-md top-10 z-10"
                onMouseLeave={() => setSearchDropdown(false)} // Close the dropdown when the mouse leaves the dropdown area
              >
                <ul className="py-2 text-sm text-gray-700">
                  {searchBar.map(({ key, value }) => (
                    <li
                      className="block w-56 px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                      key={key}
                    >
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        {/* MIDDLE */}
        <div className="flex gap-4">
          {Object.keys(dynamicButtons).map((key) => (
            <button
              key={key}
              onClick={() => handleOptionClick(key)}
              className={`px-5 py-1.5 rounded font-light text-md
                ${
                  selectedButton === key
                    ? "bg-cyan-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }
              `}
            >
              {key}
            </button>
          ))}
        </div>
        {/* BOTTOM */}
        <div className="flex gap-2">
          <Link to={buttonText.href}>
            <button className="px-3 py-2 bg-blue-500 text-center text-md text-white font-[300] rounded-md w-[150px]">
              {buttonText.text || "Create Voice Box"}
            </button>
          </Link>

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
          {/* ACTIONS DROPDOWN */}
          <div
            className="relative"
            onClick={toggleActionDropdown}
            onMouseLeave={() => setActionDropdown(false)}
          >
            <button
              className="py-2 px-4 border border-blue-600 text-blue-600 rounded-md  flex justify-between items-center"
              id="dropdownDefaultButton"
              type="button"
            >
              {actionDropdown && (
                <div className="absolute bg-white border border-gray-300 rounded-md top-10 z-10 right-0">
                  <ul className="py-2 text-sm text-gray-700">
                    {dropActionsMenu.map(({ key, value }) => (
                      <li
                        className="block w-56 px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                        key={key}
                        onClick={() => handleActionClick(key)}
                      >
                        {value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              Action
              <FaAngleDown />
            </button>
          </div>
        </div>
      </div>

      {/* FILTER BY SECTION */}
      <div className="mt-3 mb-3 flex justify-between items-center gap-3">
        <div className="flex gap-3">
          <h1 className="text-3xl font-medium ">Voice Box</h1>
          <h1 className="bg-blue-600 text-white p-2 self-center rounded text-sm font-medium antialiased inline-block">
            {voiceMainData.length}
          </h1>
        </div>

        {/* ------------------- Filter by date ----------------- */}

        <div className="flex bg-white border-2 border-gray-300 py-2 rounded-lg justify-center items-center">
          {/* Filter Icon Button */}
          <button className="border-r border-gray-500 px-3">
            <ImFilter />
          </button>

          {/* Date Range Filter Button */}
          <button
            className="border-r border-gray-500 px-3"
            onClick={() => handle_DateRange(startDate, endDate)}
          >
            Filter By
          </button>

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

      {/* ------------TABLE------------ */}
      <div className="overflow-x-auto">
        {/* MONITORING TABLE */}
        <div className="min-w-full overflow-hidden rounded-md">
          {selectedViewValue === "Table View" &&
            selectedButton === "Monitoring" && (
              <table className="min-w-full bg-white">
                {/* ----------------- TABLE HEAD START ----------------- */}
                <thead>
                  <tr className="border-gray-300 border-b-2">
                    {/* CHECKBOX */}
                    <th className="px-3 py-3 w-max">
                      <input
                        type="checkbox"
                        onClick={selectAllCheckbox}
                        checked={selectAll}
                      />
                    </th>

                    {/* NAME */}
                    <th className="px-2 py-3 text-left border-r font-medium">
                      <div className="flex items-center justify-between">
                        <span className="text-nowrap pr-2">Name</span>
                        <FaBars />
                      </div>
                    </th>
                    {/* DISPOSITION */}
                    <th className="px-2 py-3 text-left border-r font-medium">
                      <div className="flex items-center justify-between">
                        <span className="text-nowrap pr-2">Disposition</span>
                        <FaBars />
                      </div>
                    </th>
                    {/* EMPLOYEE NAME */}
                    <th className="px-2 py-3 text-left border-r font-medium">
                      <div className="flex items-center justify-between">
                        <span className="text-nowrap pr-2">Employee Name</span>
                        <FaBars />
                      </div>
                    </th>
                    {/* CALL DATE */}
                    <th className="px-2 py-3 text-left border-r font-medium">
                      <div className="flex items-center justify-between">
                        <span className="text-nowrap pr-2">Call Date</span>
                        <FaBars />
                      </div>
                    </th>
                    {/* SOURCE */}
                    <th className="px-2 py-3 text-left border-r font-medium">
                      <div className="flex items-center justify-between">
                        <span className="text-nowrap pr-2">Source</span>
                        <FaBars />
                      </div>
                    </th>
                    {/* DURATION */}
                    <th className="px-2 py-3 text-left border-r font-medium">
                      <div className="flex items-center justify-between">
                        <span className="text-nowrap pr-2">Duration</span>
                        <FaBars />
                      </div>
                    </th>
                    {/* TYPE */}
                    <th className="px-2 py-3 text-left border-r font-medium">
                      <div className="flex items-center justify-between">
                        <span className="text-nowrap pr-2">Type</span>
                        <FaBars />
                      </div>
                    </th>
                    {/* STATUS */}
                    <th className="px-2 py-3 text-left border-r font-medium">
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
                      className="cursor-pointer hover:bg-gray-200 border-gray-300 border-b"
                    >
                      {/* CHECKBOX */}
                      <td className="px-3 py-4 text-center w-max">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(voice.id)}
                          onChange={(e) => handleCheckboxChange(voice.id, e)}
                        />
                      </td>

                      {/* NAME */}
                      <td
                        className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600 break-words"
                        onClick={() => handleMonitorClick(voice.id)}
                      >
                        <div className="flex items-center">
                          <span className="ml-2 w-[80px] break-words">
                            {voice.clientName}
                          </span>
                        </div>
                      </td>
                      {/* DISPOSITION */}
                      <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                        {voice.disposition}
                      </td>
                      {/* EMPLOYEE NAME */}
                      <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600 ">
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
                      <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                        {voice.callDateTime.split("T")[0]}
                      </td>
                      {/* SOURCE */}
                      <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                        <p className="text-blue-600">{voice.source}</p>
                      </td>
                      {/* DURATION */}
                      <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                        {voice.duration}
                      </td>
                      {/* TYPE */}
                      <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
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
                      <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
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
        <div className="min-w-full overflow-hidden rounded-md">
          {selectedViewValue === "Table View" &&
            selectedButton === "Reports" && (
              <table className="min-w-full bg-white">
                {/* ----- TABLE HEAD ----- */}
                <thead>
                  <tr className="border-gray-300 border-b-2">
                    {/*   CHECKBOX */}
                    <th className="px-1 py-3 ">
                      <input type="checkbox" />
                    </th>
                    {/* EXTENSION */}
                    <th className="px-1 py-3  text-left  border-r font-medium ">
                      <div className="flex">
                        <span className="text-sm">Extension</span>
                      </div>
                    </th>
                    {/* NAME */}
                    <th className="px-1 py-3  text-left  border-r font-medium ">
                      <div className="flex justify-around">
                        <span className="text-sm">Name</span>
                        <span className="flex items-center text-sm">
                          <FaBars />
                        </span>
                      </div>
                    </th>
                    {/* EMPLOYEE CODE */}
                    <th className="px-1 py-3  text-left  border-r font-medium ">
                      <div className="flex justify-around">
                        <span className="text-sm">Employee Code</span>
                        <span className="flex items-center text-sm">
                          <FaBars />
                        </span>
                      </div>
                    </th>
                    {/* DESIGNATION */}
                    <th className="px-1 py-3  text-left  border-r font-medium ">
                      <div className="flex justify-around">
                        <span className="text-sm">Designation</span>
                        <span className="flex items-center text-sm">
                          <FaBars />
                        </span>
                      </div>
                    </th>
                    {/* REPORTING TO */}
                    <th className="px-1 py-3  text-left  border-r font-medium ">
                      <div className="flex justify-around">
                        <span className="text-sm">Reporting To</span>
                        <span className="flex items-center text-sm">
                          <FaBars />
                        </span>
                      </div>
                    </th>
                    {/* INCOMING CALLS */}
                    <th className="px-1 py-3  text-left  border-r font-medium ">
                      <div className="flex justify-around">
                        <span className="text-sm">Incoming Calls</span>
                        <span className="flex items-center text-sm">
                          <FaBars />
                        </span>
                      </div>
                    </th>
                    {/* TOATAL INCOMING CALLS */}
                    <th className="px-1 py-3  text-left  border-r font-medium ">
                      <div className="flex justify-around">
                        <span className="text-sm">Total Incoming Calls</span>
                        <span className="flex items-center text-sm">
                          <FaBars />
                        </span>
                      </div>
                    </th>
                    {/* OUTGOING CALLS */}
                    <th className="px-1 py-3  text-left  border-r font-medium ">
                      <div className="flex justify-around">
                        <span className="text-sm">Outgoing Calls</span>
                        <span className="flex items-center text-sm">
                          <FaBars />
                        </span>
                      </div>
                    </th>
                    {/* TOTAL TIME */}
                    <th className="px-1 py-3  text-left  border-r font-medium ">
                      <span>Total Time</span>
                    </th>
                  </tr>
                </thead>
                {/* ----- TABLE BODY ----- */}
                <tbody>
                  {currentSms.map((sms, index) => (
                    <tr
                      key={index}
                      className="cursor-pointer hover:bg-gray-200 border-gray-300 border-b"
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
                      <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                        <div className="flex items-center">
                          <span className="ml-2">{sms.extension}</span>
                        </div>
                      </td>
                      {/* NAME */}
                      <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                        <div className="flex items-center">
                          <span className="ml-2">{sms.name}</span>
                        </div>
                      </td>
                      {/* EMPLOYEE CODE */}
                      <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                        <div className="flex items-center">
                          <span className="ml-2">{sms.employCode}</span>
                        </div>
                      </td>
                      {/* DESIGNATION */}
                      <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                        <div className="flex items-center">
                          <span className="ml-2">{sms.designation}</span>
                        </div>
                      </td>
                      {/* REPORTING TO */}
                      <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                        <div className="flex items-center">
                          <span className="ml-2">{sms.reportingTo}</span>
                        </div>
                      </td>
                      {/* INCOMING CALLS */}
                      <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                        <div className="flex items-center">
                          <span className="ml-2 text-blue-500">
                            {sms.incomingCalls}
                          </span>
                        </div>
                      </td>
                      {/* TOTAL INCOMING CALLS */}
                      <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                        <div className="flex items-center">
                          <span className="ml-2">{sms.totalIncomingCalls}</span>
                        </div>
                      </td>
                      {/* OUTGOING CALLS */}
                      <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                        <div className="flex items-center">
                          <span className="ml-2 text-red-500">
                            {sms.outgoingCalls}
                          </span>
                        </div>
                      </td>
                      {/* TOTAL TIME OUTGOING CALLS */}
                      <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
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
        <div className="min-w-full overflow-hidden rounded-md">
          {selectedViewValue === "Table View" &&
            selectedButton === "SMS via GMS Gateway" && (
              <table className="min-w-full bg-white">
                {/* -------- TABLE HEAD -------- */}
                <thead>
                  <tr className="border-gray-300 border-b-2">
                    {/* CHECKBOX */}
                    <th className="px-1 py-3">
                      <input type="checkbox" />
                    </th>
                    {/* CLIENT NAME */}
                    <th className="px-1 py-3  text-left  border-r font-medium ">
                      <div className="flex">
                        <span className="text-sm">Client Name</span>
                      </div>
                    </th>
                    {/* MOBILE */}
                    <th className="px-1 py-3  text-left  border-r font-medium ">
                      <div className="flex justify-between">
                        <span className="text-sm">Mobile</span>
                        <span className="flex items-center text-sm">
                          <FaBars />
                        </span>
                      </div>
                    </th>
                    {/* MESSAGE */}
                    <th className="px-1 py-3  text-left  border-r font-medium ">
                      <div className="flex justify-between">
                        <span className="text-sm">Message</span>
                        <span className="flex items-center text-sm">
                          <FaBars />
                        </span>
                      </div>
                    </th>
                    {/* TYPE */}
                    <th className="px-1 py-3  text-left  border-r font-medium ">
                      <div className="flex justify-between">
                        <span className="text-sm">Type</span>
                        <span className="flex items-center text-sm">
                          <FaBars />
                        </span>
                      </div>
                    </th>
                    {/* MESSAGE TIME */}
                    <th className="px-1 py-3  text-left  border-r font-medium ">
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
                      className="cursor-pointer hover:bg-gray-200 border-gray-300 border-b"
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
                      <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
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
                      <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                        <div className="flex items-center">
                          <span className="ml-2">{data.mobile}</span>
                        </div>
                      </td>
                      {/* MESSAGE */}
                      <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                        <div className="flex items-center">
                          <span className="ml-2">{data.message}</span>
                        </div>
                      </td>
                      {/* TYPE */}
                      <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                        <div className="flex items-center">
                          <span className="ml-2">{data.type}</span>
                        </div>
                      </td>
                      {/* MESSAGE TIME */}
                      <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
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
      {selectedViewValue === "Table View" && (
        <>
          <div className="flex justify-end m-4">
            <nav>
              <ul className="inline-flex items-center">
                {Array.from(
                  { length: Math.ceil(getVoice.length / itemsPerPage) },
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
        </>
      )}
    </div>
  );
}
