import { useState } from 'react';
import { Link } from 'react-router-dom';
import GeneralReportTable from './MisComponents/GeneralReportTable';
import FtReportTable from './MisComponents/FtReportTable';
import PaidClientReportTable from './MisComponents/PaidClientReportTable';
import UserReportTable from './MisComponents/UserReportTable';
import CallingReportTable from './MisComponents/CallingReportTable';
import DNDReportTable from './MisComponents/DNDReportTable';
import TrackSheetTable from './MisComponents/TrackSheetTable';
import ResearchReportTable from './MisComponents/ResearchReportTable';

export default function MISReports() {
  // DUMMY DATA
  const misReportData = [
    {
      id: 1,
      createdStartDate: '09/02/2023',
      createdEndDate: '09/05/2023',
      modifiedStartDate: '09/02/2023',
      modifiedEndDate: '09/05/2023',
      callbackStartDate: '09/02/2023',
      callbackEndDate: '09/05/2023',
      leadStatus: 'Pool',
      freeTrailStartDate: '09/02/2023',
      freeTrailEndDate: '09/05/2023',
      subsStartDate: '09/02/2023',
      subsEndDate: '09/05/2023',
      status: 'Fresh Pool',
      fromDate: '09/02/2023',
      toDate: '09/05/2023',
      startDate: '09/02/2023',
      endDate: '09/05/2023',
      callStatus: '09/02/2023 12:00 AM',
      product: 'Global Sheet',
    },
    {
      id: 2,
      createdStartDate: '09/02/2023',
      createdEndDate: '09/05/2023',
      modifiedStartDate: '09/02/2023',
      modifiedEndDate: '09/05/2023',
      callbackStartDate: '09/02/2023',
      callbackEndDate: '09/05/2023',
      leadStatus: 'Pool',
      freeTrailStartDate: '09/02/2023',
      freeTrailEndDate: '09/05/2023',
      subsStartDate: '09/02/2023',
      subsEndDate: '09/05/2023',
      status: 'Fresh Pool',
      fromDate: '09/02/2023',
      toDate: '09/05/2023',
      startDate: '09/02/2023',
      endDate: '09/05/2023',
      callStatus: '09/02/2023 12:00 AM',
      product: 'Global Sheet',
    },
    {
      id: 3,
      createdStartDate: '09/02/2023',
      createdEndDate: '09/05/2023',
      modifiedStartDate: '09/02/2023',
      modifiedEndDate: '09/05/2023',
      callbackStartDate: '09/02/2023',
      callbackEndDate: '09/05/2023',
      leadStatus: 'Pool',
      freeTrailStartDate: '09/02/2023',
      freeTrailEndDate: '09/05/2023',
      subsStartDate: '09/02/2023',
      subsEndDate: '09/05/2023',
      status: 'Fresh Pool',
      fromDate: '09/02/2023',
      toDate: '09/05/2023',
      startDate: '09/02/2023',
      endDate: '09/05/2023',
      callStatus: '09/02/2023 12:00 AM',
      product: 'Global Sheet',
    },
    {
      id: 4,
      createdStartDate: '09/02/2023',
      createdEndDate: '09/05/2023',
      modifiedStartDate: '09/02/2023',
      modifiedEndDate: '09/05/2023',
      callbackStartDate: '09/02/2023',
      callbackEndDate: '09/05/2023',
      leadStatus: 'Pool',
      freeTrailStartDate: '09/02/2023',
      freeTrailEndDate: '09/05/2023',
      subsStartDate: '09/02/2023',
      subsEndDate: '09/05/2023',
      status: 'Fresh Pool',
      fromDate: '09/02/2023',
      toDate: '09/05/2023',
      startDate: '09/02/2023',
      endDate: '09/05/2023',
      callStatus: '09/02/2023 12:00 AM',
      product: 'Global Sheet',
    },
    {
      id: 5,
      createdStartDate: '09/02/2023',
      createdEndDate: '09/05/2023',
      modifiedStartDate: '09/02/2023',
      modifiedEndDate: '09/05/2023',
      callbackStartDate: '09/02/2023',
      callbackEndDate: '09/05/2023',
      leadStatus: 'Pool',
      freeTrailStartDate: '09/02/2023',
      freeTrailEndDate: '09/05/2023',
      subsStartDate: '09/02/2023',
      subsEndDate: '09/05/2023',
      status: 'Fresh Pool',
      fromDate: '09/02/2023',
      toDate: '09/05/2023',
      startDate: '09/02/2023',
      endDate: '09/05/2023',
      callStatus: '09/02/2023 12:00 AM',
      product: 'Global Sheet',
    },
  ];

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // item to be seen in a single page

  const paginate = (page) => setCurrentPage(page);
  const [getReports, setGetReports] = [misReportData];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReports = getReports.slice(indexOfFirstItem, indexOfLastItem);

  //----------------STRIPE BAR DROPDOWN----------------
  const stripeBar = [
    { key: 1, value: 'Table View' },
    { key: 2, value: 'Grid View' },
  ];

  const [selectedViewValue, setSelectedViewValue] = useState(
    stripeBar[0].value
  );

  // Object containing the options
  const dynamicButtons = {
    'General Report': {
      text: 'Add General Report',
      href: '/panel/creategeneral',
    },
    'Ft Report': { text: 'Add Ft Report', href: '/panel/createft' },
    'Paid Client Report': {
      text: 'Add Paid Client Report',
      href: '/panel/createpaid',
    },
    'User Report': { text: 'Add User Report', href: '/panel/createuser' },
    'Calling Report': {
      text: 'Add Calling Report',
      href: '/panel/createcalling',
    },
    'DND Report': { text: 'Add DND Report', href: '/panel/creatednd' },
    // 'Track Sheet': { text: 'Add Track Sheet', href: '/panel/createtrack' },
    // 'Research Report': { text: 'Add Research Report', href: '/panel/createresearch' },
  };

  const [selectedButton, setSelectedButton] = useState('General Report');
  // State to manage the button text
  const [buttonText, setButtonText] = useState({
    text: 'Add General Report',
    href: '/panel/creategeneral',
  });

  // Function to handle option click using bracket notation
  const handleOptionClick = (key) => {
    console.log('Clicked key:', key);
    setButtonText(dynamicButtons[key]);
    setSelectedButton(key);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col m-3">
        <div className="flex items-center gap-2 px-3 bg-white border rounded py-2">
          <div className="flex gap-4">
            {Object.keys(dynamicButtons).map((key) => (
              <button
                key={key}
                onClick={() => handleOptionClick(key)}
                className={`px-3 py-2 rounded font-light text-md
                ${
                  selectedButton === key
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                }
              `}
              >
                {key}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between my-3">
          <div className="flex gap-2 items-center justify-center">
            <h1 className="text-3xl px-1">
              {(() => {
                switch (selectedButton) {
                  case 'General Report':
                    return 'General Report';
                  case 'Ft Report':
                    return 'Ft Report';
                  case 'Paid Client Report':
                    return 'Paid Client Report';
                  case 'User Report':
                    return 'User Report';
                  case 'Calling Report':
                    return 'Calling Report';
                  case 'DND Report':
                    return 'DND Report';
                  case 'Track Sheet':
                    return 'Track Sheet';
                  default:
                    return 'General Report';
                }
              })()}
            </h1>
            <h2 className="text-xl font-medium text-red-500 text-center">
              (This feature is coming soon...)
            </h2>
          </div>
          <Link to={buttonText.href}>
            <button className="px-3 py-2 bg-blue-600 text-center text-md text-white rounded-md">
              {buttonText.text || 'Add General Report'}
            </button>
          </Link>
        </div>

        {/* ------------TABLE------------ */}
        <div className="overflow-x-auto">
          {/* GENERAL REPORT TABLE */}
          <div className="min-w-full overflow-hidden rounded-md">
            {selectedViewValue === 'Table View' &&
              selectedButton === 'General Report' && (
                <GeneralReportTable currentReports={currentReports} />
              )}
          </div>
          {/* FT REPORT TABLE */}
          <div className="min-w-full overflow-hidden rounded-md">
            {selectedViewValue === 'Table View' &&
              selectedButton === 'Ft Report' && (
                <FtReportTable currentReports={currentReports} />
              )}
          </div>
          {/* PAID CLIENT REPORT TABLE */}
          <div className="min-w-full overflow-hidden rounded-md">
            {selectedViewValue === 'Table View' &&
              selectedButton === 'Paid Client Report' && (
                <PaidClientReportTable currentReports={currentReports} />
              )}
          </div>
          {/* USER REPORT TABLE */}
          <div className="min-w-full overflow-hidden rounded-md">
            {selectedViewValue === 'Table View' &&
              selectedButton === 'User Report' && (
                <UserReportTable currentReports={currentReports} />
              )}
          </div>
          {/* CALLING REPORT TABLE */}
          <div className="min-w-full overflow-hidden rounded-md">
            {selectedViewValue === 'Table View' &&
              selectedButton === 'Calling Report' && (
                <CallingReportTable currentReports={currentReports} />
              )}
          </div>
          {/* DND REPORT TABLE */}
          <div className="min-w-full overflow-hidden rounded-md">
            {selectedViewValue === 'Table View' &&
              selectedButton === 'DND Report' && (
                <DNDReportTable currentReports={currentReports} />
              )}
          </div>
          {/* TRACK SHEET REPORT TABLE */}
          {/* <div className="min-w-full overflow-hidden rounded-md">
            {selectedViewValue === 'Table View' &&
              selectedButton === 'Track Sheet' && (
                <TrackSheetTable currentReports={currentReports} />
              )}
          </div> */}
          {/* RESEARCH REPORT TABLE */}
          {/* <div className="min-w-full overflow-hidden rounded-md">
            {selectedViewValue === 'Table View' &&
              selectedButton === 'Research Report' && (
                <ResearchReportTable currentReports={currentReports} />
              )}
          </div> */}
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
    </>
  );
}
