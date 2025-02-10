import { useState, useEffect } from "react";
import { FaAngleDown, FaBars } from "react-icons/fa";
import { ImFilter } from "react-icons/im";

import { TbRefresh } from "react-icons/tb";
// import { IoSearchOutline } from 'react-icons/io5';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SendSMS from "./SMSComponents/SendSMS.JSX";
import SendEmail from "./SMSComponents/SendEmail";
//file
import { tenant_base_url, protocal_url } from "../../../../Config/config";
import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { SearchElement } from "../SearchElement/SearchElement";

export default function ServiceBox() {
  const navigate = useNavigate();
  const name = getHostnamePart();

  const [getSmsBox, setGetSmsBox] = useState([]);
  const [stripeBarDropdown, setStripeBarDropdown] = useState(false);
  const [actionDropdown, setActionDropdown] = useState(false);
  const [selectedButton, setSelectedButton] = useState("Send SMS");
  const [getleads, setGetleads] = useState([]);

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
          config,
        );
      } else if (selectedOption === "Send Email") {
        response = await axios.get(
          `${protocal_url}${name}.${tenant_base_url}/SMSBox/sendemaildetail/byusertoken`,
          config,
        );
      }
      console.log("Data", response);

      setGetSmsBox(response.data.data);
      setGetleads(response.data.data);
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
    console.log("ID:", id); // Replace with your logic to handle checkbox click
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

  //   STRIPE BAR
  const stripeBar = [
    { key: 1, value: "Table View" },
    { key: 2, value: "Grid View" },
  ];

  //   SELECTED VIEW
  const [selectedViewValue, setSelectedViewValue] = useState(
    stripeBar[0].value,
  );

  const [filteredLeads, setFilteredLeads] = useState([]); // Add this line

  useEffect(() => {
    // Initially set filteredLeads to all data from getSmsBox
    setFilteredLeads(getSmsBox);
  }, [getSmsBox]);

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

  //---------------------------------------------------- Ation and it's Functionality ---------------------------------

  // ACTION DROPDOWN DATA
  const dropActionsMenu = [
    { key: 1, value: "Mass Delete" },
    { key: 3, value: "Mass Email" },
    { key: 5, value: "Export to Excel" },
    { key: 6, value: "Export to PDF" },
  ];

  //------------------------------------------------ Buttons -------------------------------------------
  // DYNAMIC BUTTONS
  const dynamicButtons = {
    "Send SMS": { text: "Send SMS", href: "/panel/sendsms" },
    "Send Email": { text: "Send Email", href: "/panel/sendemail" },
  };

  // State to manage the button text
  const [buttonText, setButtonText] = useState({
    text: "Send SMS",
    href: "/panel/sendsms",
  });

  // Function to handle option click using bracket notation
  const handleOptionClick = (key) => {
    console.log("Clicked key:", key);
    setButtonText(dynamicButtons[key]);
    setSelectedButton(key);
  };

  // ----------------------------- Date Filter -----------------------------

  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  // Function to filter based on date range
  function handle_DateRange(startDate, endDate) {
    let filteredFollows = getleads;

    // Convert startDate to the beginning of the day and endDate to the end of the day
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0); // Set time to 00:00:00

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Set time to 23:59:59

    if (startDate && endDate) {
      filteredFollows = filteredFollows.filter((follow) => {
        const callbackDate = new Date(follow.sentDateTime);
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

  //------------------------------------------------------------------------------------------------

  //------------------------------------------------------Filter Reset Settings ---------------------------------------------

  const handleResetFilter = () => {
    setFilteredLeads(getleads);
    // setLeadStatus('All Lead');
    // setAssignedTo("Assigned to");
  };

  //---------------------------------------------------- Roles & Permissions ----------------------------------------------------

  const businessRole = localStorage.getItem("businessRole");

  const [smsPermission, setSMSPermission] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [emailPermission, setEmailPermission] = useState(false);

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
          (item) => item.moduleName === "Service Box",
        );

        if (serviceBoxPermissions) {
          const permissionsArray = serviceBoxPermissions.permissions.split(",");
          setPermissions(permissionsArray);
          //------------------------------------------------------ Set permissions ------------------------------------------------
          setSMSPermission(permissionsArray.includes("Send SMS"));
          setEmailPermission(permissionsArray.includes("Send Email"));
        }
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  }

  useEffect(() => {
    handleGetPermission();
  }, []);

  // ------------------------------ Search Function ----------------------------------

  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    const filtered = getleads.filter((lead) =>
      lead.products?.toLowerCase()?.includes(searchTerm?.toLowerCase()),
    );
    setFilteredLeads(filtered);
  }, [searchTerm, getleads]);

  return (
    <div className="m-3 flex min-h-screen flex-col">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-white px-3 py-2">
        <div className="contact_Dropdown_Main_Container flex flex-wrap items-center justify-start gap-3">
          {/* SEARCH DROPDOWN */}
          <SearchElement
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* DYNAMIC BUTTONS */}
          <div className="service_Button_Main_Container flex gap-4 whitespace-nowrap">
            {Object.keys(dynamicButtons).map((key) =>
              permissions.includes(key) || businessRole === "Admin" ? (
                <button
                  key={key}
                  onClick={() => handleOptionClick(key)}
                  className={`text-md service_Button_Container rounded px-4 py-1.5 font-light ${
                    selectedButton === key
                      ? "bg-cyan-500 text-white"
                      : "bg-gray-100 text-gray-700"
                  } `}
                >
                  {key}
                </button>
              ) : null,
            )}
          </div>
        </div>
        <div className="service_Action_Main_Container flex flex-wrap items-center gap-3">
          {/* DYNAMIC BUTTONS LINKS */}
          {(smsPermission || businessRole === "Admin") &&
          buttonText.text === "Send SMS" ? (
            <Link to={buttonText.href} className="service_Action_Container">
              <button className="text-md service_Action_Button w-[150px] rounded-md bg-blue-600 px-3 py-2 text-center text-white">
                {buttonText.text}
              </button>
            </Link>
          ) : (
            ""
          )}
          {(emailPermission || businessRole === "Admin") &&
          buttonText.text === "Send Email" ? (
            <Link to={buttonText.href} className="service_Action_Container">
              <button className="text-md service_Action_Button w-[150px] rounded-md bg-blue-600 px-3 py-2 text-center text-white">
                {buttonText.text}
              </button>
            </Link>
          ) : (
            ""
          )}

          {/* STRIPEBAR DROPDOWN */}
          <div
            className="hide_Component relative"
            onClick={toggleStripeBarDropdown}
            onMouseLeave={() => setStripeBarDropdown(false)}
          >
            <button
              className="flex items-center justify-between rounded-md border px-4 py-3"
              id="dropdownDefaultButton"
              type="button"
            >
              {stripeBarDropdown && (
                <div className="absolute top-10 z-10 rounded-md border border-gray-300 bg-white">
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
              <FaAngleDown />
            </button>
          </div>
          {/* ACTION DROPDOWN */}
          <div
            className="service_Action_Container relative"
            onClick={toggleActionDropdown}
            onMouseLeave={() => setActionDropdown(false)}
          >
            <button
              className="service_Action_Button flex items-center justify-between gap-2 rounded-lg border border-blue-600 px-4 py-2 text-blue-600"
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
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-medium">SMS Box</h1>
          <h1 className="text-md min-w-10 rounded-md bg-blue-600 px-2 py-2 text-center text-white shadow-md">
            {getSmsBox.length}
          </h1>
        </div>

        <div className="date_Filter_Main_Container">
          {/* ------------------- Filter by date ----------------- */}
          <div className="date_Filter_Main_Container flex items-center justify-between rounded-lg border-2 border-gray-300 bg-white p-2">
            {/* Filter Icon Button */}
            <div className="flex items-center">
              <button className="border-r border-gray-500 pr-2">
                <ImFilter className="filter_Image_Size" />
              </button>

              {/* Date Range Filter Button */}
              <button className="filter_Image_Display whitespace-nowrap border-r border-gray-500 px-2">
                Filter By
              </button>

              {/* Date Range Inputs */}
              <div className="filter_Date_Container flex items-center gap-2 px-2">
                <label className="hide_Filter_Text">From:</label>
                <input
                  type="date"
                  value={startDate}
                  className="filter_Date rounded border px-2 py-2"
                  onChange={(e) => setStartDate(e.target.value)}
                />

                <label className="hide_Filter_Text">To:</label>
                <input
                  type="date"
                  value={endDate}
                  className="filter_Date rounded border px-2 py-2"
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <div
              className="reset_paddings flex cursor-pointer items-center gap-2 rounded border p-2"
              onClick={handleResetFilter}
            >
              <label className="hide_Filter_Text">Reset</label>
              <TbRefresh className="filter_Reset_Image" />
            </div>
          </div>
        </div>
      </div>

      {/* ------------TABLE------------ */}
      <div className="leads_Table_Main_Container mt-3 overflow-x-auto">
        {/* SEND SMS TABLE */}
        <div className="leads_Table_Container min-w-full rounded-md">
          {selectedViewValue === "Table View" &&
            selectedButton === "Send SMS" &&
            (emailPermission || businessRole === "Admin") && (
              <SendSMS currentSms={currentSms} />
            )}
        </div>
        {/* SEND EMAIL TABLE */}
        <div className="leads_Table_Container min-w-full rounded-md">
          {selectedViewValue === "Table View" &&
            selectedButton === "Send Email" &&
            (smsPermission || businessRole === "Admin") && (
              <SendEmail
                currentSms={currentSms}
                handleCheckboxClick={handleCheckboxClick}
                handleClick={handleClick}
              />
            )}
        </div>
      </div>

      {/* PAGINATION */}
      {selectedViewValue === "Table View" && (
        <>
          <div className="m-4 flex justify-end">
            {/* //---------------------->---------------------->PAGINATION-RENDERER<----------------------<---------------------- */}
            <nav className="mx-auto mt-4 flex items-center justify-center gap-2 text-center">
              {/* Previous Button */}
              <button
                onClick={() => paginate(currentPage - 1)}
                className={`rounded-full p-1 text-white shadow-md ${
                  currentPage === 1
                    ? "border-2 border-gray-200"
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
                },
              )}

              {/* Next Button */}
              <button
                onClick={() => paginate(currentPage + 1)}
                className={`rounded-full p-1 text-white shadow-md ${
                  currentPage === totalPage
                    ? "border-2 border-gray-200"
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
