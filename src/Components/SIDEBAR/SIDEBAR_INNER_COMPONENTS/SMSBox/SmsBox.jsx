import { useState, useEffect } from 'react';
import { FaAngleDown, FaBars } from 'react-icons/fa';
import { ImFilter } from 'react-icons/im';
// import { IoSearchOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import SendSMS from './SMSComponents/SendSMS.JSX';
import SendEmail from './SMSComponents/SendEmail';
//file
import { tenant_base_url, protocal_url } from "../../../../Config/config";
import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

export default function SmsBox() {
  const navigate = useNavigate();
  const name = getHostnamePart();

  const [getSmsBox, setGetSmsBox] = useState([]);
  const [smsBoxDropdown, setSmsBoxDropdown] = useState(false);
  const [filteredSmsBox, setFilteredSmsBox] = useState([]);
  const [stripeBarDropdown, setStripeBarDropdown] = useState(false);
  const [actionDropdown, setActionDropdown] = useState(false);
  const [filterDropdown, setFilterDropdown] = useState(false);
  const [selectedButton, setSelectedButton] = useState('Send SMS');


  // ------------------------------ E-Mail Settings Get All  ------------------------
  async function handleGetAll(selectedOption) {
    const bearer_token = localStorage.getItem("token");

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      let response;

      if (selectedOption === "Send SMS") {
        response = await axios.get(
          `${protocal_url}${name}.${tenant_base_url}/SMSBox/sendsmsdetail/byusertoken`,
          config
        );
      } else if (selectedOption === "Send Email") {
        response = await axios.get(
          `${protocal_url}${name}.${tenant_base_url}/SMSBox/sendemaildetail/byusertoken`,
          config
        );
      }

      setGetSmsBox(response.data.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  }

  useEffect(() => {
    handleGetAll(selectedButton);
  }, [selectedButton]);


  // HANDLE CHECKBOX
  const handleCheckboxClick = (e, id) => {
    e.stopPropagation(); // Prevent row click
    console.log('ID:', id); // Replace with your logic to handle checkbox click
  };

  //   TOGGLE SMSBOXDROPDOWN
  const toggleSmsBoxDropdown = () => {
    setSmsBoxDropdown(!smsBoxDropdown);
  };

  const handleClick = (sms) => {
    navigate(`/panel/${sms.id}`);
  };



  //   TOGGLE SMSBOXDROPDOWN
  const toggleStripeBarDropdown = () => {
    setStripeBarDropdown(!stripeBarDropdown);
  };

  //   TOGGLE ACTIONDROPDOWN
  const toggleActionDropdown = () => {
    setActionDropdown(!actionDropdown);
  };

  //   TOGGLE ACTIONDROPDOWN
  const toggleFilterDropdown = () => {
    setFilterDropdown(!filterDropdown);
  };


  //   STRIPE BAR
  const stripeBar = [
    { key: 1, value: 'Table View' },
    { key: 2, value: 'Grid View' },
  ];

  //   SELECTED VIEW
  const [selectedViewValue, setSelectedViewValue] = useState(
    stripeBar[0].value
  );



  const [filteredLeads, setFilteredLeads] = useState([]); // Add this line

useEffect(() => {
  // Initially set filteredLeads to all data from getSmsBox
  setFilteredLeads(getSmsBox);
}, [getSmsBox]);

function handleSmsBoxStatusButton(value) {
  if (value === null || value === 'ALL') {
    setFilteredLeads(getSmsBox); // Show all data when 'ALL' is selected
  } else {
    const filtered = getSmsBox.filter(
      (getleads) => getleads.leadStatus === value // Adjust 'leadStatus' if needed
    );
    setFilteredLeads(filtered);
  }
}


  //---------------------->---------------------->PAGINATION<----------------------<----------------------
  //controlled from the bottom of the page 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Define items per page
  const totalPage = Math.ceil(filteredLeads.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  //---------------------->---------------------->PAGINATION->FILTERLEADS/ <----------------------<----------------------
  const currentSms = filteredLeads?.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  

  //   Sales Orders Data
  const smsDropdown = [
    { key: 1, value: 'Man Insited' },
    { key: 2, value: 'Man Insited' },
    { key: 3, value: 'Man Insited' },
    { key: 4, value: 'Man Insited' },
    { key: 4, value: 'Man Insited' },
    { key: 4, value: 'Man Insited' },
  ];

  //   FOR SAVING VALUES
  function handleSmsBoxStatusButton(value) {
    console.log(value);
    if (value === null || value === 'ALL') {
      setFilteredSmsBox(getSmsBox);
    } else {
      // Filter leads based on the value
      const filtered = getSmsBox.filter(
        (getleads) => getleads.leadesStatus === value
      );
      console.log(filtered);
    }
  }

  // ACTION DROPDOWN DATA
  const dropActionsMenu = [
    { key: 0, value: 'Actions' },
    { key: 1, value: 'Mass Delete' },
    { key: 2, value: 'Mass Update' },
    { key: 3, value: 'Mass Email' },
    { key: 4, value: 'Approve Leads' },
    // { key: 5, value: 'Add to Campaign' },
    { key: 6, value: 'Export Leads' },
    { key: 7, value: 'Sheet View' },
    { key: 8, value: 'Print View' },
  ];

  //   FILTER DROPDOWN DATA
  const filterData = [
    { key: 1, value: '12/03/2023' },
    { key: 2, value: '10/09/2023' },
    { key: 3, value: '10/09/2023' },
    { key: 4, value: '12/03/2023' },
    { key: 4, value: '10/09/2023' },
    { key: 4, value: '12/03/2023' },
  ];

  // DYNAMIC BUTTONS
  const dynamicButtons = {
    'Send SMS': { text: 'Send SMS', href: '/panel/sendsms' },
    'Send Email': { text: 'Send Email', href: '/panel/sendemail' },
  };

  // State to manage the button text
  const [buttonText, setButtonText] = useState({
    text: 'Send SMS',
    href: '/panel/sendsms',
  });


  // Function to handle option click using bracket notation
  const handleOptionClick = (key) => {
    console.log('Clicked key:', key);
    setButtonText(dynamicButtons[key]);
    setSelectedButton(key);
  };

  return (
    <div className="min-h-screen flex flex-col m-3">
      <div className="py-2 px-3 bg-white flex items-center justify-between rounded-md">
        <div className="flex gap-3">
          {/* ALL SMSBOX DROPDOWN */}
          <div
            className="relative"
            onClick={toggleSmsBoxDropdown}
            onMouseLeave={() => setSmsBoxDropdown(false)}
          >
            <button
              className="py-2 px-4 border rounded-md  flex justify-between items-center"
              id="dropdownDefaultButton"
              type="button"
            >
              All Sales
              <FaAngleDown className="ml-2 text-gray-900" />
            </button>
            {smsBoxDropdown && (
              <div className="absolute bg-white border border-gray-300 rounded-md top-10 z-10">
                <ul className="py-2 text-sm text-gray-700">
                  {smsDropdown.map(({ key, value }) => (
                    <li
                      className="block w-56 px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                      key={key}
                      onClick={() => handleSmsBoxStatusButton(value)}
                    >
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* SEARCH DROPDOWN */}
          <div className="flex justify-center items-center">
            <input
              type="text"
              placeholder="Search..."
              className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* DYNAMIC BUTTONS */}
          <div className="flex gap-4">
            {Object.keys(dynamicButtons).map((key) => (
              <button
                key={key}
                onClick={() => handleOptionClick(key)}
                className={`px-4 py-1.5 rounded font-light text-md
                ${selectedButton === key
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
        <div className="flex gap-3">
          {/* DYNAMIC BUTTONS LINKS */}
          <Link to={buttonText.href}>
            <button className="px-3 py-2 bg-blue-600 text-center text-md text-white rounded-md w-[150px]">
              {buttonText.text}
            </button>
          </Link>
          {/* STRIPEBAR DROPDOWN */}
          <div
            className="relative"
            onClick={toggleStripeBarDropdown}
            onMouseLeave={() => setStripeBarDropdown(false)}
          >
            <button
              className="py-3 px-4 border rounded-md  flex justify-between items-center"
              id="dropdownDefaultButton"
              type="button"
            >
              {stripeBarDropdown && (
                <div className="absolute bg-white border border-gray-300 rounded-md top-10 z-10 right-0">
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
              <FaAngleDown />
            </button>
          </div>
          {/* ACTION DROPDOWN */}
          <div
            className="relative"
            onClick={toggleActionDropdown}
            onMouseLeave={() => setActionDropdown(false)}
          >
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
                <ul className="text-sm text-gray-700 ">
                  {dropActionsMenu.map(({ key, value }) => (
                    <li
                      key={key}
                      className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
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
      <div className="mt-3 flex justify-between items-center gap-3">
        <div className="flex gap-3 items-center">
          <h1 className="text-3xl font-medium ">SMS Box</h1>
          <h1 className="bg-blue-600 text-white px-2 py-2 min-w-10 text-center rounded-md text-md shadow-md">
            {getSmsBox.length}
          </h1>

        </div>

        <div>
          <div className="flex bg-white  border-2 border-gray-300 py-3 rounded-lg justify-center items-center">
            <button className="border-r border-gray-500 px-3">
              <ImFilter />
            </button>
            <button className="border-r border-gray-500 px-3">Filter By</button>
            {/* FILTER DROPDOWN */}
            <div
              className="relative"
              onClick={toggleFilterDropdown}
              onMouseLeave={() => setFilterDropdown(false)}
            >
              <label className="px-5 flex items-center gap-2 justify-between text-sm font-bold text-gray-600">
                09/03/2024
                <FaAngleDown className="ml-2 text-gray-600" />
              </label>
              {filterDropdown && (
                <div className="absolute w-56 bg-white border border-gray-300 right-0 top-6 z-10">
                  <ul className="py-2 text-sm text-gray-700">
                    {currentLeads.map((filter) => (
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
      </div>

      {/* ------------TABLE------------ */}
      <div className="overflow-x-auto mt-3">
        {/* SEND SMS TABLE */}
        <div className="min-w-full overflow-hidden rounded-md">
          {selectedViewValue === 'Table View' &&
            selectedButton === 'Send SMS' && (
              <SendSMS currentSms={currentSms} />
            )}
        </div>
        {/* SEND EMAIL TABLE */}
        <div className="min-w-full overflow-hidden rounded-md">
          {selectedViewValue === 'Table View' &&
            selectedButton === 'Send Email' && (
              <SendEmail
                currentSms={currentSms}
                handleCheckboxClick={handleCheckboxClick}
                handleClick={handleClick}
              />
            )}
        </div>
      </div>

      {/* PAGINATION */}
      {selectedViewValue === 'Table View' && (
        <>
          <div className="flex justify-end m-4">
              {/* //---------------------->---------------------->PAGINATION-RENDERER<----------------------<---------------------- */}
              <nav className="flex items-center justify-center text-center mx-auto gap-2 mt-4">
              {/* Previous Button */}
              <button
                onClick={() => paginate(currentPage - 1)}
                className={`p-1 shadow-md rounded-full text-white ${currentPage === 1 ? 'border-gray-200 border-2' : 'bg-cyan-500 border-2 border-gray-100'}`}
                disabled={currentPage === 1}
              >
                <GrFormPrevious size={25} />
              </button>
            
              {/* Dynamic Page Numbers */}
              {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => {
                if (page === 1 || page === totalPage || (page >= currentPage - 1 && page <= currentPage + 1)) {
                  return (
                    <button
                      key={page}
                      onClick={() => paginate(page)}
                      className={`px-4 py-2 rounded mx-1 ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'}`}
                    >
                      {page}
                    </button>
                  );
                } else if (
                  (page === currentPage - 2 && page > 1) ||
                  (page === currentPage + 2 && page < totalPage)
                ) {
                  return (
                    <span key={page} className="px-2 text-gray-500">
                      ...
                    </span>
                  );
                }
                return null;
              })}
            
              {/* Next Button */}
              <button
                onClick={() => paginate(currentPage + 1)}
                className={`p-1 shadow-md rounded-full text-white ${currentPage === totalPage ? 'border-gray-200 border-2' : 'bg-cyan-500 border-2 border-gray-100'}`}
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