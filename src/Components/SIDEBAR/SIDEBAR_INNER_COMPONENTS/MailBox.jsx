import { useState } from 'react';
import { FaAngleDown, FaBars } from 'react-icons/fa';
import { ImFilter } from 'react-icons/im';
import { IoSearchOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';

export default function MailBox() {
  const navigate = useNavigate();

  const [mailBoxDropdown, setMailBoxDropdown] = useState(false);
  const [filteredMailBox, setFilteredMailBox] = useState([]);
  const [searchBarDropdown, setSearchBarDropdown] = useState(false);
  const [stripeBarDropdown, setStripeBarDropdown] = useState(false);
  const [actionDropdown, setActionDropdown] = useState(false);
  const [filterByData, setFilterByData] = useState(false);

  const handleClick = () => {
    navigate(`/sidebar/createmail`);
  };

  // TOGGLE MAINBOX DROPDOWN
  const toggleMailBoxDropdown = () => {
    setMailBoxDropdown(!mailBoxDropdown);
  };

  //   TOGGLE SEARCHBAR DROPDOWN
  const toggleSearchBarDropdown = () => {
    setSearchBarDropdown(!searchBarDropdown);
  };

  //   TOGGLE STRIPEBAR DROPDOWN
  const toggleStripeBarDropdown = () => {
    setStripeBarDropdown(!stripeBarDropdown);
  };

  //   TOGGLE ACTION DROPDOWN
  const toggleActionDropdown = () => {
    setActionDropdown(!actionDropdown);
  };

  //   TOGGLE FILTER BY DATA
  const toggleFilterByData = () => {
    setFilterByData(!filterByData);
  };

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // DUMMY DATA FOR MAILBOX
  const mailBoxMainData = [
    {
      id: 1,
      clientName: 'Shubham Mishra',
      mobile: 6578903421,
      mail: 'Hello, dude how are you!',
      type: 'Calling Person',
      mailTime: '13/12/2023 16:15',
    },
    {
      id: 2,
      clientName: 'Shubham Mishra',
      mobile: 6578903421,
      mail: 'Hello, dude how are you!',
      type: 'Calling Person',
      mailTime: '13/12/2023 16:15',
    },
    {
      id: 3,
      clientName: 'Shubham Mishra',
      mobile: 6578903421,
      mail: 'Hello, dude how are you!',
      type: 'Calling Person',
      mailTime: '13/12/2023 16:15',
    },
    {
      id: 4,
      clientName: 'Shubham Mishra',
      mobile: 6578903421,
      mail: 'Hello, dude how are you!',
      type: 'Calling Person',
      mailTime: '13/12/2023 16:15',
    },
    {
      id: 5,
      clientName: 'Shubham Mishra',
      mobile: 6578903421,
      mail: 'Hello, dude how are you!',
      type: 'Calling Person',
      mailTime: '13/12/2023 16:15',
    },
    {
      id: 6,
      clientName: 'Shubham Mishra',
      mobile: 6578903421,
      mail: 'Hello, dude how are you!',
      type: 'Calling Person',
      mailTime: '13/12/2023 16:15',
    },
    {
      id: 7,
      clientName: 'Shubham Mishra',
      mobile: 6578903421,
      mail: 'Hello, dude how are you!',
      type: 'Calling Person',
      mailTime: '13/12/2023 16:15',
    },
    {
      id: 8,
      clientName: 'Shubham Mishra',
      mobile: 6578903421,
      mail: 'Hello, dude how are you!',
      type: 'Calling Person',
      mailTime: '13/12/2023 16:15',
    },
    {
      id: 9,
      clientName: 'Shubham Mishra',
      mobile: 6578903421,
      mail: 'Hello, dude how are you!',
      type: 'Calling Person',
      mailTime: '13/12/2023 16:15',
    },
    {
      id: 10,
      clientName: 'Shubham Mishra',
      mobile: 6578903421,
      mail: 'Hello, dude how are you!',
      type: 'Calling Person',
      mailTime: '13/12/2023 16:15',
    },
    {
      id: 11,
      clientName: 'Shubham Mishra',
      mobile: 6578903421,
      mail: 'Hello, dude how are you!',
      type: 'Calling Person',
      mailTime: '13/12/2023 16:15',
    },
    {
      id: 12,
      clientName: 'Shubham Mishra',
      mobile: 6578903421,
      mail: 'Hello, dude how are you!',
      type: 'Calling Person',
      mailTime: '13/12/2023 16:15',
    },
    {
      id: 13,
      clientName: 'Shubham Mishra',
      mobile: 6578903421,
      mail: 'Hello, dude how are you!',
      type: 'Calling Person',
      mailTime: '13/12/2023 16:15',
    },
    {
      id: 14,
      clientName: 'Shubham Mishra',
      mobile: 6578903421,
      mail: 'Hello, dude how are you!',
      type: 'Calling Person',
      mailTime: '13/12/2023 16:15',
    },
    {
      id: 15,
      clientName: 'Shubham Mishra',
      mobile: 6578903421,
      mail: 'Hello, dude how are you!',
      type: 'Calling Person',
      mailTime: '13/12/2023 16:15',
    },
    {
      id: 16,
      clientName: 'Shubham Mishra',
      mobile: 6578903421,
      mail: 'Hello, dude how are you!',
      type: 'Calling Person',
      mailTime: '13/12/2023 16:15',
    },
    {
      id: 17,
      clientName: 'Shubham Mishra',
      mobile: 6578903421,
      mail: 'Hello, dude how are you!',
      type: 'Calling Person',
      mailTime: '13/12/2023 16:15',
    },
    {
      id: 18,
      clientName: 'Shubham Mishra',
      mobile: 6578903421,
      mail: 'Hello, dude how are you!',
      type: 'Calling Person',
      mailTime: '13/12/2023 16:15',
    },
    {
      id: 19,
      clientName: 'Shubham Mishra',
      mobile: 6578903421,
      mail: 'Hello, dude how are you!',
      type: 'Calling Person',
      mailTime: '13/12/2023 16:15',
    },
    {
      id: 20,
      clientName: 'Shubham Mishra',
      mobile: 6578903421,
      mail: 'Hello, dude how are you!',
      type: 'Calling Person',
      mailTime: '13/12/2023 16:15',
    },
    {
      id: 21,
      clientName: 'Shubham Mishra',
      mobile: 6578903421,
      mail: 'Hello, dude how are you!',
      type: 'Calling Person',
      mailTime: '13/12/2023 16:15',
    },
    {
      id: 22,
      clientName: 'Shubham Mishra',
      mobile: 6578903421,
      mail: 'Hello, dude how are you!',
      type: 'Calling Person',
      mailTime: '13/12/2023 16:15',
    },
    {
      id: 23,
      clientName: 'Shubham Mishra',
      mobile: 6578903421,
      mail: 'Hello, dude how are you!',
      type: 'Calling Person',
      mailTime: '13/12/2023 16:15',
    },
    {
      id: 24,
      clientName: 'Shubham Mishra',
      mobile: 6578903421,
      mail: 'Hello, dude how are you!',
      type: 'Calling Person',
      mailTime: '13/12/2023 16:15',
    },
    {
      id: 25,
      clientName: 'Shubham Mishra',
      mobile: 6578903421,
      mail: 'Hello, dude how are you!',
      type: 'Calling Person',
      mailTime: '13/12/2023 16:15',
    },
  ];

  //   STRIPE BAR
  const stripeBar = [
    { key: 1, value: 'Table View' },
    { key: 2, value: 'Grid View' },
  ];

  //   SELECTED VIEW
  const [selectedViewValue, setSelectedViewValue] = useState(
    stripeBar[0].value
  );

  const [getMails, setMails] = useState(mailBoxMainData);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMail = getMails.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (page) => setCurrentPage(page);

  //   FOR SAVING VALUES
  function handleMailBoxStatusButton(value) {
    console.log(value);
    if (value === null || value === 'ALL') {
      setFilteredMailBox(getMails);
    } else {
      // Filter leads based on the value
      const filtered = getMails.filter(
        (getleads) => getleads.leadesStatus === value
      );
      console.log(filtered);
    }
  }

  //   Sales Orders Data
  const mailBoxData = [
    { key: 1, value: 'Man Insited' },
    { key: 2, value: 'Man Insited' },
    { key: 3, value: 'Man Insited' },
    { key: 4, value: 'Man Insited' },
    { key: 4, value: 'Man Insited' },
    { key: 4, value: 'Man Insited' },
  ];

  //   SEARCH BAR DATA
  const searchBar = [
    { key: 0, value: 'Search' },
    { key: 1, value: 'Touched Records' },
    { key: 2, value: 'Untouched Records' },
    { key: 3, value: 'Reecord Action' },
    { key: 4, value: 'Related Records Action' },
    { key: 5, value: 'Locked' },
    { key: 6, value: 'Latest Email Status' },
    { key: 7, value: 'Activities' },
    { key: 8, value: 'Notes' },
    { key: 9, value: 'Campaigns' },
  ];

  //   FILTER BY DATA
  const filterData = [
    { key: 1, value: '12/03/2023' },
    { key: 2, value: '10/09/2023' },
    { key: 3, value: '10/09/2023' },
    { key: 4, value: '12/03/2023' },
    { key: 4, value: '10/09/2023' },
    { key: 4, value: '12/03/2023' },
  ];

  //   ACTION DROPDOWN
  const dropActionsMenu = [
    { key: 0, value: 'Actions' },
    { key: 1, value: 'Mass Delete' },
    { key: 2, value: 'Mass Update' },
    { key: 3, value: 'Mass Email' },
    { key: 4, value: 'Approve Leads' },
    { key: 5, value: 'Add to Campaign' },
    { key: 6, value: 'Export Leads' },
    { key: 7, value: 'Sheet View' },
    { key: 8, value: 'Print View' },
  ];

  return (
    <div className="min-h-screen flex flex-col m-3">
      <div className="py-2 px-3 bg-white flex items-center justify-between rounded-md">
        <div className="flex gap-3">
          {/* ALL MAIN BOX DROPDOWN */}
          <div
            className="relative"
            onClick={toggleMailBoxDropdown}
            onMouseLeave={() => setMailBoxDropdown(false)}
          >
            <button
              className="py-2 px-4 border rounded-md  flex justify-between items-center"
              id="dropdownDefaultButton"
              type="button"
            >
              All Sales
              <FaAngleDown className="ml-2 text-gray-900" />
            </button>
            {mailBoxDropdown && (
              <div className="absolute bg-white border border-gray-300 rounded-md top-10 z-10">
                <ul className="py-2 text-sm text-gray-700">
                  {mailBoxData.map(({ key, value }) => (
                    <li
                      className="block w-56 px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                      key={key}
                      onClick={() => handleMailBoxStatusButton(value)}
                    >
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* SEARCH BAR DROPDOWN */}
          <div
            className="relative"
            onClick={toggleSearchBarDropdown}
            onMouseLeave={() => setSearchBarDropdown(false)}
          >
            <button
              className="px-3 py-2 rounded-full border border-gray-300 flex gap-2 items-center justify-between"
              id="dropdownDefaultButton"
              type="button"
            >
              {searchBarDropdown && (
                <div className="absolute bg-white border border-gray-300 rounded-md top-10 z-10">
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
              <IoSearchOutline />
              Search
            </button>
          </div>
          {/* END SEARCH BAR DROPDOWN */}
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/sidebar/createmail"
            className="py-2 px-4 border rounded-md bg-blue-600 text-white"
          >
            Create Mail Box
          </Link>
          {/* STRIPE BAR DROPDOWN */}
          <div
            className="relative"
            onClick={toggleStripeBarDropdown}
            onMouseLeave={() => setStripeBarDropdown(false)}
          >
            <button
              className="px-4 py-3 rounded-md border flex items-center justify-between gap-2"
              type="button"
              id="defaultDropdown"
            >
              {stripeBarDropdown && (
                <div className="absolute bg-white border border-gray-300 right-0 top-10 z-10">
                  <ul className="py-2 text-sm text-gray-700">
                    {stripeBar.map(({ key, value }) => (
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
              <FaBars />
              <FaAngleDown className="text-gray-900" />
            </button>
          </div>
          {/* ACTION DROPDOWN */}
          <div
            className="relative"
            onClick={toggleActionDropdown}
            onMouseLeave={() => setActionDropdown(false)}
          >
            <button
              className="px-4 py-2 border border-blue-600 rounded-md text-blue-600 flex items-center justify-between gap-2"
              type="button"
              id="defaultDropdown"
            >
              {actionDropdown && (
                <div className="absolute bg-white border top-10 z-10 right-0">
                  <ul className="py-2 text-sm text-gray-700">
                    {dropActionsMenu.map(({ key, value }) => (
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
              Action
              <FaAngleDown />
            </button>
          </div>
        </div>
      </div>

      {/* FILTER BY */}
      <div className="flex py-2 items-center justify-between gap-3">
        <div className="flex items-center justify-center gap-3">
          <h1 className="text-3xl font-bold">Mail Box</h1>
          <button className="bg-blue-600 text-white px-2 py-2 min-w-10 text-center rounded-md text-md shadow-md">
            {mailBoxMainData.length}
          </button>
        </div>
        {/* FILTER BY */}
        <div className="flex bg-white rounded-lg py-2 items-center border-2 border-gray-300 gap-3 justify-center">
          <button className="border-r border-gray-500 px-3">
            <ImFilter />
          </button>
          <button className="border-r border-gray-500 px-3">Filter By</button>
          {/* FILTER DROPDOWN */}
          <div
            className="relative"
            onClick={toggleFilterByData}
            onMouseLeave={() => setFilterByData(false)}
          >
            <label className="px-5 flex items-center gap-2 justify-between text-sm font-bold text-gray-600">
              09/03/2024
              <FaAngleDown className="ml-2 text-gray-600" />
            </label>
            {filterByData && (
              <div className="absolute w-56 bg-white border border-gray-300 right-0 top-6 z-10">
                <ul className="py-2 text-sm text-gray-700">
                  {filterData.map((filter) => (
                    <li
                      className="block px-4 py-2 w-full border-b hover:bg-cyan-500 hover:text-white cursor-pointer"
                      key={filter.key}
                    >
                      {filter.value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* FILTER DROPDOWN ENDS */}
        </div>
      </div>

      {/* TABLE VIEW */}
      <div className="overflow-x-auto">
        <div className="min-w-full rounded-md overflow-hidden">
          {selectedViewValue === 'Table View' && (
            <table className="min-w-full bg-white">
              {/* TABLE HEAD START */}
              <thead>
                <tr className="border-gray-300 border-b-2">
                  {/* CHECKBOX */}
                  <th className="px-1 py-3  text-left font-medium ">
                    <input type="checkbox" />
                  </th>
                  {/* CIENT NAME */}
                  <th className="px-1 py-3  text-left border-r font-medium ">
                    <span>Client Name</span>
                  </th>
                  {/* MOBILE */}
                  <th className="px-1 py-3  text-left border-r font-medium ">
                    <div className="flex items-center justify-between">
                      <span>Mobile</span>
                      <span>
                        <FaBars />
                      </span>
                    </div>
                  </th>
                  {/* MAIL */}
                  <th className="px-1 py-3  text-left border-r font-medium ">
                    <div className="flex items-center justify-between">
                      <span>Mail</span>
                      <span>
                        <FaBars />
                      </span>
                    </div>
                  </th>
                  {/* TYPE */}
                  <th className="px-1 py-3  text-left border-r font-medium ">
                    <div className="flex items-center justify-between">
                      <span>Type</span>
                      <span>
                        <FaBars />
                      </span>
                    </div>
                  </th>
                  {/* MAIL TIME */}
                  <th className="px-1 py-3 text-left font-medium">
                    <span>Mail Time</span>
                  </th>
                </tr>
              </thead>
              {/* TABLE HEAD END */}
              {/* TABLE BODY START */}
              <tbody>
                {currentMail.map((map, index) => (
                  <tr
                    className="cursor-pointer hover:bg-gray-200 border-gray-300 border-b"
                    key={index}
                    onClick={() => handleClick()}
                  >
                    {/* CHECKBOX */}
                    <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                      <div className="flex items-center">
                        <input type="checkbox" />
                      </div>
                    </td>
                    {/* CLIENT NAME */}
                    <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                      <div className="flex items-center">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={map.clientName}
                          alt="DP"
                        />
                        <span className='ml-2 w-[80px] break-words'>{map.clientName}</span>
                      </div>
                    </td>
                    {/* MOBILE */}
                    <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                      <div className="flex items-center">{map.mobile}</div>
                    </td>
                    {/* MAIL */}
                    <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                      <div className="flex items-center">{map.mail}</div>
                    </td>
                    {/* TYPE */}
                    <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                      <div className="flex items-center">{map.type}</div>
                    </td>
                    {/* MAIL TIME */}
                    <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                      <div className="flex items-center">{map.mailTime}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* TABLE BODY END */}
            </table>
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
                  { length: Math.ceil(getMails.length / itemsPerPage) },
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
