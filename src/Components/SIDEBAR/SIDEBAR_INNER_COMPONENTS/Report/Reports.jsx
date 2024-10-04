// REACT - IN BUILD
import { useState } from 'react';
import { FaAngleDown, FaBars } from 'react-icons/fa';
// REACT - ICONS
import { IoSearchOutline } from 'react-icons/io5';
import EmployeeReport from './RepoComponents/EmployeeReport';
import LeadsReport from './RepoComponents/LeadsReport';
import ClientReports from './RepoComponents/ClientReports';
import SalesReports from './RepoComponents/SalesReports';

export default function Reports() {
  // REPORTS DUMMY DATA
  const reportsMainData = [
    {
      id: 1,
      fullName: 'Admin',
      userName: 'Admin',
      target: 5000000,
      targetAchieved: 19345678,
      targetRemaining: 87650987,
      leadId: 1256,
      leadName: 'Rahul Jain',
      mobile: '+9559460362',
      assignedTo: 'Chetan Goel',
      leadStatus: 'Confirm',
      leadSource: 'Fresh Pool',
      clientContact: 123456789,
      lastRemarks: '12/02/2023',
      viewSo: 'View So',
      manager: 'Shubham Mishra',
      totalAmtToken: 11800,
      netTotal: 12345678,
      grandTotal: 1234567,
    },
    {
      id: 2,
      fullName: 'Admin',
      userName: 'Admin',
      target: 5000000,
      targetAchieved: 19345678,
      targetRemaining: 87650987,
      leadId: 1256,
      leadName: 'Rahul Jain',
      mobile: '+9559460362',
      assignedTo: 'Chetan Goel',
      leadStatus: 'Confirm',
      leadSource: 'Fresh Pool',
      clientContact: 123456789,
      lastRemarks: '12/02/2023',
      viewSo: 'View So',
      manager: 'Shubham Mishra',
      totalAmtToken: 11800,
      netTotal: 12345678,
      grandTotal: 1234567,
    },
    {
      id: 3,
      fullName: 'Admin',
      userName: 'Admin',
      target: 5000000,
      targetAchieved: 19345678,
      targetRemaining: 87650987,
      leadId: 1256,
      leadName: 'Rahul Jain',
      mobile: '+9559460362',
      assignedTo: 'Chetan Goel',
      leadStatus: 'Confirm',
      leadSource: 'Fresh Pool',
      clientContact: 123456789,
      lastRemarks: '12/02/2023',
      viewSo: 'View So',
      manager: 'Shubham Mishra',
      totalAmtToken: 11800,
      netTotal: 12345678,
      grandTotal: 1234567,
    },
    {
      id: 4,
      fullName: 'Admin',
      userName: 'Admin',
      target: 5000000,
      targetAchieved: 19345678,
      targetRemaining: 87650987,
      leadId: 1256,
      leadName: 'Rahul Jain',
      mobile: '+9559460362',
      assignedTo: 'Chetan Goel',
      leadStatus: 'Confirm',
      leadSource: 'Fresh Pool',
      clientContact: 123456789,
      lastRemarks: '12/02/2023',
      viewSo: 'View So',
      manager: 'Shubham Mishra',
      totalAmtToken: 11800,
      netTotal: 12345678,
      grandTotal: 1234567,
    },
    {
      id: 5,
      fullName: 'Admin',
      userName: 'Admin',
      target: 5000000,
      targetAchieved: 19345678,
      targetRemaining: 87650987,
      leadId: 1256,
      leadName: 'Rahul Jain',
      mobile: '+9559460362',
      assignedTo: 'Chetan Goel',
      leadStatus: 'Confirm',
      leadSource: 'Fresh Pool',
      clientContact: 123456789,
      lastRemarks: '12/02/2023',
      viewSo: 'View So',
      manager: 'Shubham Mishra',
      totalAmtToken: 11800,
      netTotal: 12345678,
      grandTotal: 1234567,
    },
    {
      id: 6,
      fullName: 'Admin',
      userName: 'Admin',
      target: 5000000,
      targetAchieved: 19345678,
      targetRemaining: 87650987,
      leadId: 1256,
      leadName: 'Rahul Jain',
      mobile: '+9559460362',
      assignedTo: 'Chetan Goel',
      leadStatus: 'Confirm',
      leadSource: 'Fresh Pool',
      clientContact: 123456789,
      lastRemarks: '12/02/2023',
      viewSo: 'View So',
      manager: 'Shubham Mishra',
      totalAmtToken: 11800,
      netTotal: 12345678,
      grandTotal: 1234567,
    },
    {
      id: 7,
      fullName: 'Admin',
      userName: 'Admin',
      target: 5000000,
      targetAchieved: 19345678,
      targetRemaining: 87650987,
      leadId: 1256,
      leadName: 'Rahul Jain',
      mobile: '+9559460362',
      assignedTo: 'Chetan Goel',
      leadStatus: 'Confirm',
      leadSource: 'Fresh Pool',
      clientContact: 123456789,
      lastRemarks: '12/02/2023',
      viewSo: 'View So',
      manager: 'Shubham Mishra',
      totalAmtToken: 11800,
      netTotal: 12345678,
      grandTotal: 1234567,
    },
    {
      id: 8,
      fullName: 'Admin',
      userName: 'Admin',
      target: 5000000,
      targetAchieved: 19345678,
      targetRemaining: 87650987,
      leadId: 1256,
      leadName: 'Rahul Jain',
      mobile: '+9559460362',
      assignedTo: 'Chetan Goel',
      leadStatus: 'Confirm',
      leadSource: 'Fresh Pool',
      clientContact: 123456789,
      lastRemarks: '12/02/2023',
      viewSo: 'View So',
      manager: 'Shubham Mishra',
      totalAmtToken: 11800,
      netTotal: 12345678,
      grandTotal: 1234567,
    },
    {
      id: 9,
      fullName: 'Admin',
      userName: 'Admin',
      target: 5000000,
      targetAchieved: 19345678,
      targetRemaining: 87650987,
      leadId: 1256,
      leadName: 'Rahul Jain',
      mobile: '+9559460362',
      assignedTo: 'Chetan Goel',
      leadStatus: 'Confirm',
      leadSource: 'Fresh Pool',
      clientContact: 123456789,
      lastRemarks: '12/02/2023',
      viewSo: 'View So',
      manager: 'Shubham Mishra',
      totalAmtToken: 11800,
      netTotal: 12345678,
      grandTotal: 1234567,
    },
    {
      id: 10,
      fullName: 'Admin',
      userName: 'Admin',
      target: 5000000,
      targetAchieved: 19345678,
      targetRemaining: 87650987,
      leadId: 1256,
      leadName: 'Rahul Jain',
      mobile: '+9559460362',
      assignedTo: 'Chetan Goel',
      leadStatus: 'Confirm',
      leadSource: 'Fresh Pool',
      clientContact: 123456789,
      lastRemarks: '12/02/2023',
      viewSo: 'View So',
      manager: 'Shubham Mishra',
      totalAmtToken: 11800,
      netTotal: 12345678,
      grandTotal: 1234567,
    },
    {
      id: 11,
      fullName: 'Admin',
      userName: 'Admin',
      target: 5000000,
      targetAchieved: 19345678,
      targetRemaining: 87650987,
      leadId: 1256,
      leadName: 'Rahul Jain',
      mobile: '+9559460362',
      assignedTo: 'Chetan Goel',
      leadStatus: 'Confirm',
      leadSource: 'Fresh Pool',
      clientContact: 123456789,
      lastRemarks: '12/02/2023',
      viewSo: 'View So',
      manager: 'Shubham Mishra',
      totalAmtToken: 11800,
      netTotal: 12345678,
      grandTotal: 1234567,
    },
  ];

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // item to be seen in a single page

  const [getReports, setGetReports] = useState(reportsMainData);

  const paginate = (page) => setCurrentPage(page);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //---------------------->---------------------->PAGINATION->FILTERLEADS/ <----------------------<----------------------
  const currentReports = getReports.slice(indexOfFirstItem, indexOfLastItem);
  const [activeButton, setActiveButton] = useState(1);

  //----------------STRIPE BAR DROPDOWN----------------
  const stripeBar = [
    { key: 1, value: 'Table View' },
    { key: 2, value: 'Grid View' },
  ];

  const [selectedViewValue, setSelectedViewValue] = useState(
    stripeBar[0].value
  );

  //   DYNAMIC BUTTONS
  const dynamicButtons = [
    { id: 1, name: 'Employee Report' },
    { id: 2, name: 'Leads Report' },
    { id: 3, name: 'Client Reports' },
    { id: 4, name: 'Sales Reports' },
  ];

  const [selectedId, setSelectedId] = useState(1);

  // Function to handle option click using bracket notation
  const handleOptionClick = (id) => {
    console.log('Clicked id:', id);
    // setButtonText(dynamicButtons.key);
    setActiveButton(id);
    setSelectedId(id);
  };

  //   SEARCH DROPDOWN
  const [searchDropdown, setSearchDropdown] = useState(false);

  // SEARCH DUMMY DATA
  const searchData = [
    { key: 1, name: 'Search' },
    { key: 2, name: 'Search' },
    { key: 3, name: 'Search' },
  ];

  // TOGGLE SEARCH DROPDOWN
  const toggleDropdownSearch = () => {
    setSearchDropdown(!searchDropdown);
  };

  // FILTER DATE DROPDOWN
  const [dateDropdown, setDateDropdown] = useState(false);

  // date dummy data
  const dateData = [
    { key: 1, name: '01/09/2023' },
    { key: 2, name: '01/09/2023' },
    { key: 3, name: '01/09/2023' },
  ];

  // toggle date dropdown
  const toggleDropdownDate = () => {
    setDateDropdown(!dateDropdown);
  };

  // last 6 months filter dropdown
  const [filterSixMonthsDropdown, setFilterSixMonthsDropdown] = useState(false);

  // filter 6 months dummy data
  const filterData = [
    { key: 1, name: '01/10/2024' },
    { key: 2, name: '01/10/2024' },
    { key: 3, name: '01/10/2024' },
  ];

  // toggle filter 6 months dropdown
  const toggleDropdownFilter = () => {
    setFilterSixMonthsDropdown(!filterSixMonthsDropdown);
  };

  return (
    <div className="min-h-screen flex flex-col m-3">
      <div className="py-2 px-3 bg-white gap-3 flex items-center justify-start rounded-md">
        <div className="flex gap-3">
          {dynamicButtons.map(({ id, name }) => (
            <button
              key={id}
              onClick={() => handleOptionClick(id)}
              className={`px-5 py-1.5 rounded font-light text-md
                    ${
                      activeButton === id
                        ? 'bg-cyan-600 text-white'
                        : 'bg-gray-100 text-gray-700'
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
            className="py-2 px-6 border rounded-full gap-2  flex justify-between items-center"
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
          <h1 className="text-3xl font-medium ">Employee Reports</h1>
          <h1 className="bg-blue-600 text-white p-2 self-center rounded text-sm font-medium antialiased inline-block">
            {'72'}
          </h1>
        </div>

        {/* -------------- FILTER SECTION ------------------ */}
        <div className="flex bg-white border-2 gap-2 border-gray-300 py-1 rounded-lg justify-center items-center">
          {/* Filter Icon Button */}
          <button className="border-gray-500 px-2">filter</button>
          {/* DATE DROPDOWN */}
          <div
            className="relative"
            onClick={toggleDropdownDate}
            onMouseLeave={() => setDateDropdown(false)}
          >
            <button
              className="py-2 px-6 border rounded-md gap-2 border-blue-600 text-blue-600  flex justify-between items-center"
              id="dropdownDefaultButton"
              type="button"
            >
              Date
              <FaAngleDown className="ml-2 text-blue-600" />
            </button>
            {dateDropdown && (
              <div className="absolute bg-white border border-gray-300 rounded-md top-10 z-10">
                <ul className="py-2 text-sm text-gray-700">
                  {dateData.map(({ key, name }) => (
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
          {/* LAST 6 MONTHS DROPDOWN */}
          <div
            className="relative"
            onClick={toggleDropdownFilter}
            onMouseLeave={() => setFilterSixMonthsDropdown(false)}
          >
            <button
              className="py-2 px-6 border rounded-md gap-2 border-blue-600 text-blue-600  flex justify-between items-center"
              id="dropdownDefaultButton"
              type="button"
            >
              Last 6 months
              <FaAngleDown className="ml-2 text-blue-600" />
            </button>
            {filterSixMonthsDropdown && (
              <div className="absolute bg-white border border-gray-300 rounded-md top-10 z-10">
                <ul className="py-2 text-sm text-gray-700">
                  {filterData.map(({ key, name }) => (
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
          {/* DATE BUTTON */}
          <button className="border-blue-600 px-6 border py-2 rounded-md text-blue-600 cursor-pointer">
            01/11/2023
          </button>
          {/* DATE BUTTON */}
          <button className="border-blue-600 px-6 border py-2 rounded-md text-blue-600 cursor-pointer">
            31/05/2024
          </button>
          {/* APPLY BUTTON */}
          <button className="py-2 px-4 bg-blue-500 text-white border-none cursor-pointer rounded-md text-sm">
            Apply
          </button>
          {/* CLEAR FILTER */}
          <button className="text-blue-600 px-2">Clear Filter</button>
        </div>
      </div>

      {/* ------------TABLE------------ */}
      <div className="overflow-x-auto">
        {/* EMPLOYEE REPORT TABLE */}
        <div className="min-w-full overflow-hidden rounded-md">
          {selectedViewValue === 'Table View' && selectedId === 1 && (
            <EmployeeReport currentReports={currentReports} />
          )}
        </div>
        {/* LEAD REPORTS TABLE */}
        <div className="min-w-full overflow-hidden rounded-md">
          {selectedViewValue === 'Table View' && selectedId === 2 && (
            <LeadsReport currentReports={currentReports} />
          )}
        </div>
        {/* CLIENT REPORTS TABLE */}
        <div className="min-w-full overflow-hidden rounded-md">
          {selectedViewValue === 'Table View' && selectedId === 3 && (
            <ClientReports currentReports={currentReports} />
          )}
        </div>
        {/* SALES REPORTS TABLE */}
        <div className="min-w-full overflow-hidden rounded-md">
          {selectedViewValue === 'Table View' && selectedId === 4 && (
            <SalesReports currentReports={currentReports} />
          )}
        </div>
      </div>

      {/* PAGINATION */}
      {selectedViewValue === 'Table View' && (
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
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-gray-700 border'
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
