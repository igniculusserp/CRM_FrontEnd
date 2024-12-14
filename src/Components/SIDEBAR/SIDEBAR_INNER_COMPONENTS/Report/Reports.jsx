// REACT - IN BUILD
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ImFilter } from "react-icons/im";
import { TbRefresh } from "react-icons/tb";
// REACT - ICONS
import { IoSearchOutline } from "react-icons/io5";
import EmployeeReport from "./RepoComponents/EmployeeReport";
import LeadsReport from "./RepoComponents/LeadsReport";
import ClientReports from "./RepoComponents/ClientReports";
import SalesReports from "./RepoComponents/SalesReports";
import Monitoring from "./RepoComponents/Monitoring";

//Folder Imported
import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";
import { tenant_base_url, protocal_url } from "./../../../../Config/config";
//external Packages
import axios from "axios";
import DisposeLeads from "./RepoComponents/DisposeLeads";
// import { parseISO, subMonths, isAfter } from 'date-fns';

const name = getHostnamePart();

export default function Reports() {
  const location = useLocation();
  const [getReports, setGetReports] = useState([]);
  const [originalReports, setOriginalReports] = useState([]);

  //------------------------------------------------------------------------------------------------
  //----------------GET ----------------
  async function handleGetReport(reportId = selectedId) {
    const bearer_token = localStorage.getItem("token");
  
    const urls = {
      1 : "/Report/performance/report/byusertoken",
      2 : "/Lead/leads/byusertoken",
      3 : "/SalesOrder/salesOrder/clientbyusertoken",
      4 : "/Report/performance/report/byusertoken",
      6 : `/Report/callingreports/byusertoken`
    };
  
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
  
      const endpoint = urls[reportId];
  
      if (!endpoint) {
        throw new Error("Invalid report selection.");
      }
  
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}${endpoint}`,
        config
      );
  
      const data = response.data.data;
      setGetReports(data);
      console.log(getReports)
      setOriginalReports(data); // Store original unfiltered data
    } catch (error) {
      console.error("Error fetching reports:", error);
      // Optionally, set an error state to display a user-friendly message
    }
  }

  useEffect(() => {
    handleGetReport(); // Initial call on component mount
  }, []);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // item to be seen in a single page

  const paginate = (page) => setCurrentPage(page);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //---------------------->---------------------->PAGINATION->FILTERLEADS/ <----------------------<----------------------
  const currentReports = getReports.slice(indexOfFirstItem, indexOfLastItem);

  //----------------STRIPE BAR DROPDOWN----------------
  const stripeBar = [
    { key: 1, value: "Table View" },
    { key: 2, value: "Grid View" },
  ];

  const [selectedViewValue, setSelectedViewValue] = useState(
    stripeBar[0].value
  );

  //   DYNAMIC BUTTONS
  const dynamicButtons = [
    { id: 1, name: "Employee Report" },
    { id: 2, name: "Leads Report" },
    { id: 3, name: "Client Reports" },
    { id: 4, name: "Sales Reports" },
    { id: 5, name: "Dispose Leads" },
    { id: 6, name: "Monitoring" },
  ];

  const [selectedId, setSelectedId] = useState(
    () => parseInt(localStorage.getItem("selectedId")) || 1
  );

  // Function to handle option click using bracket notation
  const handleOptionClick = (id) => {
    setSelectedId(id);

    // Immediately use the `id` instead of `selectedId` which will be stale
    handleGetReport(id);

    // Store the selected id in localStorage
    localStorage.setItem("selectedId", id);
  };

  useEffect(() => {
    return () => {
      // This will run when the component unmounts
      localStorage.removeItem("selectedId");
    };
  }, [location]);

  //   SEARCH DROPDOWN
  const [searchDropdown, setSearchDropdown] = useState(false);

  // SEARCH DUMMY DATA
  const searchData = [
    { key: 1, name: "Search" },
    { key: 2, name: "Search" },
    { key: 3, name: "Search" },
  ];

  // TOGGLE SEARCH DROPDOWN
  const toggleDropdownSearch = () => {
    setSearchDropdown(!searchDropdown);
  };



  // ---------------------BUTTON THAT ARE VISIBLE IN SALES REPORTS ------------------------------------
  const buttons = [
    { id: 1, name: 'Source Wise' },
    { id: 2, name: 'Employee Wise' },
  ];
 
  const [buttonId, setButtonId] = useState(1);
 
  const handleButtonClick = (id) => {
    setButtonId(id);
  };


  
  // ----------------------------- Date Filter -----------------------------


  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);


  // Function to filter based on date range
  function handle_DateRange(startDate, endDate) {
    let filteredFollows = originalReports;

    // Convert startDate to the beginning of the day and endDate to the end of the day
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0); // Set time to 00:00:00

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Set time to 23:59:59

    if (startDate && endDate) {
      filteredFollows = filteredFollows.filter((follow) => {
        const callbackDate = new Date(follow.date);
        return callbackDate >= start && callbackDate <= end;
      });
    }
    setGetReports(filteredFollows); // Update the filtered result
  }

  // UseEffect to trigger handle_DateRange on date change
  useEffect(() => {
    if (startDate <= endDate) {
      handle_DateRange(startDate, endDate);
    }
  }, [startDate, endDate]);


    //------------------------------------------------------Filter Reset Settings ---------------------------------------------

    const handleResetFilter = () => {
      setGetReports(originalReports);
     
    };
 

  return (
    <div className="min-h-screen flex flex-col m-3">
      <div className="py-2 px-3 bg-white gap-3 flex items-center justify-between rounded-md">
        <div className="flex gap-3">
          {dynamicButtons.map(({ id, name }) => (
            <button
              key={id}
              onClick={() => handleOptionClick(id)}
              className={`px-5 py-1.5 rounded font-light text-md
                    ${
                      selectedId === id
                        ? "bg-cyan-500 text-white"
                        : "bg-gray-100 text-gray-700"
                    }
                  `}
            >
              {name}
            </button>
          ))}
        </div>
        {/* SEARCH DROPDOWN */}
        <div
          className="relative"
          onClick={toggleDropdownSearch}
          onMouseLeave={() => setSearchDropdown(false)}
        >
          <button
            className="py-2 px-6 border rounded-full gap-2 flex justify-between items-center"
            id="dropdownDefaultButton"
            type="button"
          >
            <span>
              <IoSearchOutline />
            </span>
            <span>Search</span>
          </button>
          {searchDropdown && (
            <div className="absolute bg-white border border-gray-300 rounded-md top-10 z-10">
              <ul className="py-2 text-sm text-gray-700">
                {searchData.map(({ key, name }) => (
                  <li
                    className="block w-56 px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                    key={key}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* FILTER BY SECTION */}
      <div className="mt-3 mb-3 flex justify-between items-center gap-3">
        <div className="flex gap-3">
          <h1 className="text-3xl font-medium">
            {(() => {
              switch (selectedId) {
                case 1:
                  return "Employees Report";
                case 2:
                  return "Leads Report";
                case 3:
                  return "Clients Report";
                case 4:
                  return "Sales Report";
                case 5:
                  return "Dispose Lead";
                case 6:
                    return "Monitoring";
              }
            })()}
          </h1>
          <h1 className="bg-blue-600 text-white px-2 py-2 min-w-10 text-center rounded-md text-md shadow-md">
            {getReports.length}
          </h1>
        </div>

        {selectedId === 4 && (
          <div className="flex items-center gap-1">
            {buttons.map(({ id, name }) => (
              <button
                onClick={() => handleButtonClick(id)}
                key={id}
                className={`py-2 px-1 text-[12px] ${
                  buttonId === id
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                } rounded-md shadow-md`}
              >
                {name}
              </button>
            ))}
          </div>
        )}

        {/* -------------- FILTER SECTION ------------------ */}
        {selectedId===6
        ?
        <div className="flex bg-white border-2 border-gray-300 py-2 pr-2 rounded-lg justify-center items-center">
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

            <div className="p-1 border rounded cursor-pointer" 
             onClick={handleResetFilter}
            >
                <TbRefresh size={25}/>
            </div>
          </div>
        :<></>}
        
      </div>

      {/* ------------TABLE------------ */}
      <div className="overflow-x-auto">
        {/* EMPLOYEE REPORT TABLE */}
        <div className="min-w-full overflow-hidden rounded-md">
          {selectedViewValue === "Table View" && selectedId === 1 && (
            <EmployeeReport currentReports={currentReports} />
          )}
        </div>
        {/* LEAD REPORTS TABLE */}
        <div className="min-w-full overflow-hidden rounded-md">
          {selectedViewValue === "Table View" && selectedId === 2 && (
            <LeadsReport currentReports={currentReports} />
          )}
        </div>
        {/* CLIENT REPORTS TABLE */}
        <div className="min-w-full overflow-hidden rounded-md">
          {selectedViewValue === "Table View" && selectedId === 3 && (
            <ClientReports currentReports={currentReports} />
          )}
        </div>
        {/* SALES REPORTS TABLE */}
        <div className="min-w-full overflow-hidden rounded-md">
          {selectedViewValue === "Table View" && selectedId === 4 && (
            <SalesReports currentReports={currentReports} btn={buttonId} />
          )}
        </div>
        {/* DISPOSE REPORTS TABLE */}
        <div className="min-w-full overflow-hidden rounded-md">
          {selectedViewValue === "Table View" && selectedId === 5 && (
            <DisposeLeads currentReports={currentReports} />
          )}
        </div>
        {/* Monitoring TABLE */}
        <div className="min-w-full overflow-hidden rounded-md">
        {selectedViewValue === "Table View" && selectedId === 6 && (
          <Monitoring currentReports={currentReports} />
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
                  { length: Math.ceil(getReports.length / itemsPerPage) },
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
