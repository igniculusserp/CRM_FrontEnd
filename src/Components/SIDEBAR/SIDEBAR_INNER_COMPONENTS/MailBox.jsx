import { useState } from "react";
import { FaAngleDown, FaBars } from "react-icons/fa";
import { ImFilter } from "react-icons/im";
import { IoSearchOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

import { TbRefresh } from "react-icons/tb";

export default function MailBox() {
  const navigate = useNavigate();

  const [mailBoxDropdown, setMailBoxDropdown] = useState(false);
  const [filteredMailBox, setFilteredMailBox] = useState([]);
  const [searchBarDropdown, setSearchBarDropdown] = useState(false);
  const [stripeBarDropdown, setStripeBarDropdown] = useState(false);
  const [actionDropdown, setActionDropdown] = useState(false);
  const [filterByData, setFilterByData] = useState(false);

  const handleClick = () => {
    navigate(`/panel/createmail`);
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
      clientName: "Shubham Mishra",
      mobile: 6578903421,
      mail: "Hello, dude how are you!",
      type: "Calling Person",
      mailTime: "13/12/2023 16:15",
    },
    {
      id: 2,
      clientName: "Shubham Mishra",
      mobile: 6578903421,
      mail: "Hello, dude how are you!",
      type: "Calling Person",
      mailTime: "13/12/2023 16:15",
    },
    {
      id: 3,
      clientName: "Shubham Mishra",
      mobile: 6578903421,
      mail: "Hello, dude how are you!",
      type: "Calling Person",
      mailTime: "13/12/2023 16:15",
    },
    {
      id: 4,
      clientName: "Shubham Mishra",
      mobile: 6578903421,
      mail: "Hello, dude how are you!",
      type: "Calling Person",
      mailTime: "13/12/2023 16:15",
    },
    {
      id: 5,
      clientName: "Shubham Mishra",
      mobile: 6578903421,
      mail: "Hello, dude how are you!",
      type: "Calling Person",
      mailTime: "13/12/2023 16:15",
    },
    {
      id: 6,
      clientName: "Shubham Mishra",
      mobile: 6578903421,
      mail: "Hello, dude how are you!",
      type: "Calling Person",
      mailTime: "13/12/2023 16:15",
    },
    {
      id: 7,
      clientName: "Shubham Mishra",
      mobile: 6578903421,
      mail: "Hello, dude how are you!",
      type: "Calling Person",
      mailTime: "13/12/2023 16:15",
    },
    {
      id: 8,
      clientName: "Shubham Mishra",
      mobile: 6578903421,
      mail: "Hello, dude how are you!",
      type: "Calling Person",
      mailTime: "13/12/2023 16:15",
    },
    {
      id: 9,
      clientName: "Shubham Mishra",
      mobile: 6578903421,
      mail: "Hello, dude how are you!",
      type: "Calling Person",
      mailTime: "13/12/2023 16:15",
    },
    {
      id: 10,
      clientName: "Shubham Mishra",
      mobile: 6578903421,
      mail: "Hello, dude how are you!",
      type: "Calling Person",
      mailTime: "13/12/2023 16:15",
    },
    {
      id: 11,
      clientName: "Shubham Mishra",
      mobile: 6578903421,
      mail: "Hello, dude how are you!",
      type: "Calling Person",
      mailTime: "13/12/2023 16:15",
    },
    {
      id: 12,
      clientName: "Shubham Mishra",
      mobile: 6578903421,
      mail: "Hello, dude how are you!",
      type: "Calling Person",
      mailTime: "13/12/2023 16:15",
    },
    {
      id: 13,
      clientName: "Shubham Mishra",
      mobile: 6578903421,
      mail: "Hello, dude how are you!",
      type: "Calling Person",
      mailTime: "13/12/2023 16:15",
    },
    {
      id: 14,
      clientName: "Shubham Mishra",
      mobile: 6578903421,
      mail: "Hello, dude how are you!",
      type: "Calling Person",
      mailTime: "13/12/2023 16:15",
    },
    {
      id: 15,
      clientName: "Shubham Mishra",
      mobile: 6578903421,
      mail: "Hello, dude how are you!",
      type: "Calling Person",
      mailTime: "13/12/2023 16:15",
    },
    {
      id: 16,
      clientName: "Shubham Mishra",
      mobile: 6578903421,
      mail: "Hello, dude how are you!",
      type: "Calling Person",
      mailTime: "13/12/2023 16:15",
    },
    {
      id: 17,
      clientName: "Shubham Mishra",
      mobile: 6578903421,
      mail: "Hello, dude how are you!",
      type: "Calling Person",
      mailTime: "13/12/2023 16:15",
    },
    {
      id: 18,
      clientName: "Shubham Mishra",
      mobile: 6578903421,
      mail: "Hello, dude how are you!",
      type: "Calling Person",
      mailTime: "13/12/2023 16:15",
    },
    {
      id: 19,
      clientName: "Shubham Mishra",
      mobile: 6578903421,
      mail: "Hello, dude how are you!",
      type: "Calling Person",
      mailTime: "13/12/2023 16:15",
    },
    {
      id: 20,
      clientName: "Shubham Mishra",
      mobile: 6578903421,
      mail: "Hello, dude how are you!",
      type: "Calling Person",
      mailTime: "13/12/2023 16:15",
    },
    {
      id: 21,
      clientName: "Shubham Mishra",
      mobile: 6578903421,
      mail: "Hello, dude how are you!",
      type: "Calling Person",
      mailTime: "13/12/2023 16:15",
    },
    {
      id: 22,
      clientName: "Shubham Mishra",
      mobile: 6578903421,
      mail: "Hello, dude how are you!",
      type: "Calling Person",
      mailTime: "13/12/2023 16:15",
    },
    {
      id: 23,
      clientName: "Shubham Mishra",
      mobile: 6578903421,
      mail: "Hello, dude how are you!",
      type: "Calling Person",
      mailTime: "13/12/2023 16:15",
    },
    {
      id: 24,
      clientName: "Shubham Mishra",
      mobile: 6578903421,
      mail: "Hello, dude how are you!",
      type: "Calling Person",
      mailTime: "13/12/2023 16:15",
    },
    {
      id: 25,
      clientName: "Shubham Mishra",
      mobile: 6578903421,
      mail: "Hello, dude how are you!",
      type: "Calling Person",
      mailTime: "13/12/2023 16:15",
    },
  ];

  //   STRIPE BAR
  const stripeBar = [
    { key: 1, value: "Table View" },
    { key: 2, value: "Grid View" },
  ];

  //   SELECTED VIEW
  const [selectedViewValue, setSelectedViewValue] = useState(
    stripeBar[0].value,
  );

  const [getMails, setMails] = useState(mailBoxMainData);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMail = getMails.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (page) => setCurrentPage(page);

  //   FOR SAVING VALUES
  function handleMailBoxStatusButton(value) {
    console.log(value);
    if (value === null || value === "ALL") {
      setFilteredMailBox(getMails);
    } else {
      // Filter leads based on the value
      const filtered = getMails.filter(
        (getleads) => getleads.leadesStatus === value,
      );
      console.log(filtered);
    }
  }

  //   Sales Orders Data
  const mailBoxData = [
    { key: 1, value: "Man Insited" },
    { key: 2, value: "Man Insited" },
    { key: 3, value: "Man Insited" },
    { key: 4, value: "Man Insited" },
    { key: 5, value: "Man Insited" },
    { key: 6, value: "Man Insited" },
  ];

  //   FILTER BY DATA
  const filterData = [
    { key: 1, value: "12/03/2023" },
    { key: 2, value: "10/09/2023" },
    { key: 3, value: "10/09/2023" },
    { key: 4, value: "12/03/2023" },
    { key: 5, value: "10/09/2023" },
    { key: 6, value: "12/03/2023" },
  ];

  //   ACTION DROPDOWN
  const dropActionsMenu = [
    { key: 0, value: "Actions" },
    { key: 1, value: "Mass Delete" },
    { key: 2, value: "Mass Update" },
    { key: 3, value: "Mass Email" },
    { key: 4, value: "Approve Leads" },
    { key: 5, value: "Export Leads" },
    { key: 6, value: "Export To Excel" },
    { key: 7, value: "Export To PDF" },
  ];

  return (
    <div className="m-3 flex min-h-screen flex-col">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-white px-3 py-2">
        <div className="flex gap-3">
          {/* ALL MAIN BOX DROPDOWN */}
          <div
            className="relative"
            onClick={toggleMailBoxDropdown}
            onMouseLeave={() => setMailBoxDropdown(false)}
          >
            <button
              className="flex items-center justify-between rounded-md border px-4 py-2"
              id="dropdownDefaultButton"
              type="button"
            >
              All Sales
              <FaAngleDown className="ml-2 text-gray-900" />
            </button>
            {mailBoxDropdown && (
              <div className="absolute top-10 z-10 rounded-md border border-gray-300 bg-white">
                <ul className="py-2 text-sm text-gray-700">
                  {mailBoxData.map(({ key, value }) => (
                    <li
                      className="block w-56 cursor-pointer border-b px-4 py-2 hover:bg-cyan-500 hover:text-white"
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
          <div className="flex items-center justify-center">
            <input
              type="text"
              placeholder="Search..."
              className="w-full max-w-sm rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* END SEARCH BAR DROPDOWN */}
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/panel/createmail"
            className="rounded-md border bg-blue-600 px-4 py-2 text-white"
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
              className="flex items-center justify-between gap-2 rounded-md border px-4 py-3"
              type="button"
              id="defaultDropdown"
            >
              {stripeBarDropdown && (
                <div className="absolute top-10 z-10 border border-gray-300 bg-white">
                  <ul className="py-2 text-sm text-gray-700">
                    {stripeBar.map(({ key, value }) => (
                      <li
                        className="block w-56 cursor-pointer border-b px-4 py-2 hover:bg-cyan-500 hover:text-white"
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

      {/* FILTER BY */}
      <div className="my-1 flex items-center justify-between gap-3 py-2">
        <div className="flex items-center justify-center gap-3">
          <h1 className="text-3xl font-medium">Mail Box</h1>
          <button className="text-md min-w-10 rounded-md bg-blue-600 px-2 py-2 text-center text-white shadow-md">
            {mailBoxMainData.length}
          </button>
        </div>
        {/* ------------------- Filter by date ----------------- */}

        <div className="flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white py-2 pr-2">
          {/* Filter Icon Button */}
          <button className="border-r border-gray-500 px-3">
            <ImFilter className="filter_Image_Size" />
          </button>

          {/* Date Range Filter Button */}
          <button className="border-r border-gray-500 px-3">Filter By</button>

          {/* Date Range Inputs */}
          <div className="flex items-center gap-2 px-3">
            <input
              type="date"
              // value={startDate}
              className="rounded border px-2 py-1"
              // onChange={(e) => setStartDate(e.target.value)}
            />

            <input
              type="date"
              // value={endDate}
              className="rounded border px-2 py-1"
              // onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div
            className="reset_paddings cursor-pointer rounded border p-2 hover:shadow-md"
            // onClick={handleResetFilter}
          >
            <TbRefresh size={25} />
          </div>
        </div>
      </div>

      {/* TABLE VIEW */}
      <div className="overflow-x-auto">
        <div className="min-w-full overflow-hidden rounded-md">
          {selectedViewValue === "Table View" && (
            <table className="min-w-full bg-white">
              {/* TABLE HEAD START */}
              <thead>
                <tr className="border-b-2 border-gray-300">
                  {/* CHECKBOX */}
                  <th className="px-1 py-3 text-left font-medium">
                    <input type="checkbox" />
                  </th>
                  {/* CIENT NAME */}
                  <th className="border-r px-1 py-3 text-left font-medium">
                    <span>Client Name</span>
                  </th>
                  {/* MOBILE */}
                  <th className="border-r px-1 py-3 text-left font-medium">
                    <div className="flex items-center justify-between">
                      <span>Mobile</span>
                      <span>
                        <FaBars />
                      </span>
                    </div>
                  </th>
                  {/* MAIL */}
                  <th className="border-r px-1 py-3 text-left font-medium">
                    <div className="flex items-center justify-between">
                      <span>Mail</span>
                      <span>
                        <FaBars />
                      </span>
                    </div>
                  </th>
                  {/* TYPE */}
                  <th className="border-r px-1 py-3 text-left font-medium">
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
                    className="cursor-pointer border-b border-gray-300 hover:bg-gray-200"
                    key={index}
                    onClick={() => handleClick()}
                  >
                    {/* CHECKBOX */}
                    <td className="border-b border-gray-300 px-2 py-4 text-sm leading-5 text-gray-600">
                      <div className="flex items-center">
                        <input type="checkbox" />
                      </div>
                    </td>
                    {/* CLIENT NAME */}
                    <td className="border-b border-gray-300 px-2 py-4 text-sm leading-5 text-gray-600">
                      <div className="flex items-center">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={map.clientName}
                          alt="DP"
                        />
                        <span className="ml-2 w-[80px] break-words">
                          {map.clientName}
                        </span>
                      </div>
                    </td>
                    {/* MOBILE */}
                    <td className="border-b border-gray-300 px-2 py-4 text-sm leading-5 text-gray-600">
                      <div className="flex items-center">{map.mobile}</div>
                    </td>
                    {/* MAIL */}
                    <td className="border-b border-gray-300 px-2 py-4 text-sm leading-5 text-gray-600">
                      <div className="flex items-center">{map.mail}</div>
                    </td>
                    {/* TYPE */}
                    <td className="border-b border-gray-300 px-2 py-4 text-sm leading-5 text-gray-600">
                      <div className="flex items-center">{map.type}</div>
                    </td>
                    {/* MAIL TIME */}
                    <td className="border-b border-gray-300 px-2 py-4 text-sm leading-5 text-gray-600">
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
      {selectedViewValue === "Table View" && (
        <>
          <div className="m-4 flex justify-end">
            <nav>
              <ul className="inline-flex items-center">
                {Array.from(
                  { length: Math.ceil(getMails.length / itemsPerPage) },
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
        </>
      )}
    </div>
  );
}
