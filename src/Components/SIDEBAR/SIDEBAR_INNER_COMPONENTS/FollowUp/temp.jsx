import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//external Packages
import axios from "axios";
//React Icons
import { FaAngleDown, FaBars, FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import { ImFilter } from "react-icons/im";
import { MdCall } from "react-icons/md";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { TbRefresh } from "react-icons/tb";

//Folder Imported
import { tenant_base_url, protocal_url } from "./../../../../Config/config";
import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";
import { SearchElement } from "../SearchElement/SearchElement";
import ManagedByFilter from "../../../../Hooks/ManagedByFilter/ManagedByFilter";
import UseAction from "../../../../Hooks/Action/useAction";

export default function FollowUp() {
  const navigate = useNavigate();

  const bearer_token = localStorage.getItem("token");
  const name = getHostnamePart();
  // All States
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  // Mass Email
 
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [followupList, setFollowupList] = useState([]);
  const [followupDropdown, setFollowupDropdown] = useState(false);
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
        config,
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
  //---------------------->---------------------->PAGINATION<----------------------<----------------------
  //controlled from the bottom of the page
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Define items per page
  const totalPage = Math.ceil(filteredLeads.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  //---------------------->---------------------->PAGINATION->FILTERLEADS/ <----------------------<----------------------
  const currentLeads = filteredLeads?.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

  //   TOGGLE FOLLOWUP DROPDOWN
  const toggleFollowupDropdown = () => {
    setFollowupDropdown(!followupDropdown);
  };

 

  //   TOGGLE STRIPEBAR DROPDOWN

  //   FOLLOW UP DROPDOWN DATA
  const followup = [
    { key: 1, value: "Man Insited" },
    { key: 2, value: "Man Insited" },
  ];

  //------------------------------------------------------------------------------------------------
  //----------------ACTION BAR DROPDOWN----------------
  const actions = [
    { key: 1, value: "Mass Delete" },
    { key: 3, value: "Mass E-Mail" },
    { key: 5, value: "Export Follow Up" },
    { key: 6, value: "Sheet View" },
    { key: 7, value: "Print View" },
  ];



  // Function to toggle all checkboxes
  const selectAllCheckbox = () => {
    if (selectAll) {
      // Deselect all rows
      setSelectedRows([]);
      setSelectedEmails([]); // Clear selected emails
      setSelectAll(false);
    } else {
      // Select all rows in the current page
      const allIds = currentLeads.map((order) => order.id);
      const allEmails = currentLeads.map((order) => order.email); // Extract emails
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
    navigate(`/panel/createfollowup/${id}`);
  };


  // ------------------------------------------Managed By Fillters---------------------------------

  function handleAssignedToSelection(assignedToValue) {
    setAssignedTo(assignedToValue); // Update state in FollowUp component

    let filteredLeads = followupList;
    if (assignedToValue !== "Managed By") {
      filteredLeads = filteredLeads.filter(
        (lead) => lead.assigned_To === assignedToValue
      );
    }
    setFilteredLeads(filteredLeads);
  }


  // ----------------------------- Date Filter -----------------------------

  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  // Function to filter based on date range
  function handle_DateRange(startDate, endDate) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0); // Set to the start of the day

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Set to the end of the day

    const filteredFollows = followupList.filter((follow) => {
      const callbackDate = new Date(follow.call_bck_DateTime);
      // Log values for debugging
      console.log("Callback Date:", callbackDate, "Start:", start, "End:", end);
      return callbackDate >= start && callbackDate <= end;
    });

    setFilteredLeads(filteredFollows); // Update filtered results
  }

  // Trigger handle_DateRange when startDate or endDate changes
  useEffect(() => {
    if (new Date(startDate) <= new Date(endDate)) {
      handle_DateRange(startDate, endDate);
    } else {
      console.error("Start date cannot be after end date");
    }
  }, [startDate, endDate]);

  // ------------------------------ Search Function ----------------------------------

  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    const filtered = followupList.filter(
      (lead) =>
        lead.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        lead.mobileNo?.includes(searchTerm),
    );
    setFilteredLeads(filtered);
  }, [searchTerm, followupList]);

  //------------------------------------------------------Filter Reset Settings ---------------------------------------------
  const [assignedTo, setAssignedTo] = useState("Managed By");

  const handleResetFilter = () => {
    setFilteredLeads(followupList);
    // setLeadStatus('All Lead');
    setAssignedTo("Managed By");
  };

  //---------------------------------------------------- Roles & Permissions ----------------------------------------------------

  const businessRole = localStorage.getItem("businessRole");
  const [edit, setEdit] = useState(false);

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
          (item) => item.moduleName === "Follow Up",
        );

        if (serviceBoxPermissions) {
          const permissionsArray = serviceBoxPermissions.permissions.split(",");

          console.log("List : ", permissionsArray);

          //------------------------------------------------------ Set permissions ------------------------------------------------

          setEdit(permissionsArray.includes("Edit Follow Up"));
        }
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  }

  useEffect(() => {
    handleGetPermission();
  }, []);

  return (
    <>
      {/* -------- PARENT -------- */}
      <div className="m-3 flex min-h-screen flex-col">
        {/* containerbar*/}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-white px-3 py-2">
          {/* PART-I */}
          {/* container- FollowUp, search */}
          <div className="contact_Dropdown_Main_Container flex flex-wrap items-center justify-start gap-3">
            {/* ALL FOLLOW UPS DROPDOWN */}
            <div
              className="contact_Dropdown_Container relative whitespace-nowrap"
              onClick={toggleFollowupDropdown}
              onMouseLeave={() => setFollowupDropdown(false)}
            >
              <button
                className="contact_Dropdown_Button flex min-w-40 items-center justify-between truncate rounded-md border px-4 py-2"
                id="dropdownDefaultButton"
                type="button"
              >
                All Follow Up
                <FaAngleDown className="ml-2 text-gray-900" />
              </button>
              {followupDropdown && (
                <div className="absolute top-10 z-10 rounded-md border border-gray-300 bg-white">
                  <ul className="py-2 text-sm text-gray-700">
                    {followup.map(({ key, value }) => (
                      <li
                        className="block w-56 cursor-pointer border-b px-4 py-2 hover:bg-cyan-500 hover:text-white"
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
            <ManagedByFilter assignedTo={assignedTo} onAssignedToSelect={handleAssignedToSelection} />
            {/* SEARCH DROPDOWN */}
            <SearchElement
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* PART-II */}
          <div className="action_Button_Main_Container flex items-center justify-start gap-3">
            {/* PART-II */}
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
            {/* ACTIONS DROPDWON */}
            <UseAction 
             followupList={followupList} 
             getFollowupLists={getFollowupLists} 
             screenName="FollowUpScreen" 
             selectedRows={selectedRows}
             selectedEmails={selectedEmails}
             actions={actions}
           />
            {/* END ACTIONS DROPDWON */}
          </div>
        </div>
        {/* MIDDLE SECTION */}
        <div className="my-1 flex flex-wrap items-center justify-between gap-3 py-2">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-3xl font-medium">Follow Up</h1>
            <h1 className="min-w-10 rounded-md bg-blue-600 p-2 text-center text-sm text-white shadow-md">
              {followupList.length}{" "}
            </h1>
          </div>
          {/* ------------------- Filter by date ----------------- */}
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

        {/* TABLE VIEW */}
        <div className="leads_Table_Main_Container overflow-x-auto">
          <div className="leads_Table_Container min-w-full rounded-md">
            {/*--------------TABLE HEAD START------------- */}
            {selectedViewValue === "Table View" && (
              <table className="leads_Table min-w-full bg-white">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    {/* CHECKBOX for Select All */}
                    <th className="px-2 py-3 text-left font-medium">
                      <input
                        type="checkbox"
                        onClick={selectAllCheckbox}
                        checked={selectAll}
                      />
                    </th>
                    {/* CLIENT NAME */}
                    <th className="max-w-56 border-r px-1 py-3 text-left font-medium">
                      <div className="">
                        <span className="">Client Name</span>
                      </div>
                    </th>
                    {/* MOBILE */}
                    <th className="border-r px-3 py-3 text-left font-medium">
                      <div className="flex items-center justify-between gap-3">
                        <span>Mobile</span>
                        <span>
                          <FaBars />
                        </span>
                      </div>
                    </th>
                    {/* Email */}
                    <th className="border-r px-1 py-3 text-left font-medium">
                      <div className="flex items-center justify-between gap-3">
                        <span>Email</span>
                        <span>
                          <FaBars />
                        </span>
                      </div>
                    </th>
                    {/* SEGMENT */}
                    <th className="border-r px-3 py-3 text-left font-medium">
                      <div className="flex items-center justify-between gap-3">
                        <span>Segment</span>
                        <span>
                          <FaBars />
                        </span>
                      </div>
                    </th>

                    {/* FOLLOW UP */}
                    <th className="border-r px-3 py-3 text-left font-medium">
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
                  {currentLeads.map((order) => {
                    return (
                      <tr
                        key={order.id}
                        className="cursor-pointer border-b border-gray-300 hover:bg-gray-200"
                      >
                        {/* CHECKBOX */}
                        <td className="border-b border-gray-300 px-2 py-4 text-sm leading-5 text-gray-600">
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
                          className="border-b border-gray-300 py-4 text-sm leading-5"
                          onClick={
                            edit || businessRole === "Admin"
                              ? () => handleClick(order.id)
                              : undefined
                          }
                        >
                          <div className="flex items-center">
                            <span className="break-words">{order.name}</span>
                          </div>
                        </td>
                        {/* MOBILE */}
                        <td className="border-b border-gray-300 px-3 py-4 text-sm leading-5">
                          <div className="flex items-center gap-1">
                            <span>
                              <a
                                href={`tel:${order.mobileNo}`}
                                onClick={(event) => event.stopPropagation()}
                              >
                                {order.mobileNo}
                              </a>
                            </span>
                            <span className="text-red-400">
                              <MdCall />
                            </span>
                          </div>
                        </td>
                        {/* Email */}
                        <td className="border-b border-gray-300 px-3 py-4 text-sm leading-5">
                          <div className="flex items-center">{order.email}</div>
                        </td>
                        {/* SEGMENT */}
                        <td className="min-w-24 max-w-36 border-b border-gray-300 px-1 py-4 text-sm">
                          <div className="grid grid-cols-2 items-center gap-1">
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
                        <td className="border-b border-gray-300 px-3 py-4 text-sm leading-5">
                          <div
                            className="flex items-center text-nowrap"
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
                  {currentLeads.map((item) => (
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
                              onClick={() => handleClick(item.id)}
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
                          {item.name}
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
                        <div className="w-2/4 text-sm text-gray-500">
                          Segment
                        </div>
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
            {/* //---------------------->---------------------->PAGINATION-RENDERER<----------------------<---------------------- */}
            <nav className="mx-auto mt-4 flex items-center justify-center gap-2 text-center">
              {/* /---------------------->Previous Button <----------------------< */}
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

              {/* /---------------------->Dynamic Page Numbers <----------------------< */}
              {Array.from({ length: totalPage }, (_, i) => i + 1).map(
                (page) => {
                  // Logic for ellipsis and showing only a subset of pages
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
                    (page === currentPage - 2 && page > 1) || // Add ellipsis before current
                    (page === currentPage + 2 && page < totalPage) // Add ellipsis after current
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
                className={`rounded-full p-1 shadow-md text-white${
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
        </div>
      </div>
    </>
  );
}
