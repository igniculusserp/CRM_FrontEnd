import { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import axios from "axios";
import PropTypes from "prop-types";

import { tenant_base_url, protocal_url } from "./../../../../../Config/config";

import { getHostnamePart } from "../../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

export default function AddPermission({ onCancel }) {
  const name = getHostnamePart();

  //   ON SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  //   DROPDOWNS HERE

  const [dropdownGroupModule, setDropdownGroupModule] = useState(false);
  const [defaultGroupModuleText, setDefaultGroupModuleText] =
    useState("All Group Module");

  const groupModuleName = [
    { id: 1, name: "All Group Module" },
    { id: 2, name: "Leads" },
    { id: 3, name: "Contacts" },
    { id: 4, name: "Client" },
    { id: 5, name: "Sales Order" },
    { id: 6, name: "Free Trail" },
    { id: 7, name: "Follow Up" },
    { id: 8, name: "SMS Box" },
    { id: 9, name: "Reports" },
    { id: 10, name: "Financial Activity" },
  ];

  //   TOGGLE DROPDOWN GROUPNAME
  const toggleDropdownGroupModule = () => {
    setDropdownGroupModule(!dropdownGroupModule);
  };

  // HANDLE DROPDOWN GROUPNAME
  const handleDropdownGroupModule = (name) => {
    setDefaultGroupModuleText(name);
    setDropdownGroupModule(!dropdownGroupModule);
  };

  //   DUMMY DATA

  //----------------------------------------------------------------------------------------
  //  Group DropDown GET API Is being used here
  const [grpName, setGrpName] = useState([]);

  async function handleGroupName() {
    const bearer_token = localStorage.getItem("token");

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Admin/group/all`,
        config
      );
      setGrpName(response.data.data);
      console.log("Group : ", response.data.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
      // Optionally, set an error state to display a user-friendly message
    }
  }

  useEffect(() => {
    handleGroupName();
  }, []);

  const [defaultTextLeadStatusDropDown, setdefaultTextLeadStatusDropDown] =
    useState("Select Group Name");
  const [isDropdownVisibleLeadStatus, setisDropdownVisibleLeadStatus] =
    useState(false);

  const toggleDropdownLeadStatus = () => {
    setisDropdownVisibleLeadStatus(!isDropdownVisibleLeadStatus);
  };

  const handleDropdownLeadStatus = (leadStatus) => {
    setdefaultTextLeadStatusDropDown(leadStatus);
    setisDropdownVisibleLeadStatus(!isDropdownVisibleLeadStatus);
    // setFollowupsData((prevTask) => ({
    //   ...prevTask,
    //   leadesStatus: grpName,
    // }));
  };

  return (
    <div className="flex min-h-screen flex-col m-3 overflow-x-auto overflow-y-hidden">
      <div className="flex py-2 px-2 items-center justify-between bg-white rounded-md shadow-md">
        <h1 className="text-xl">Add Roles & Permissions</h1>
        {/*------------------------------------------------- Cancel Button--------------------------------------------- */}
        <button
          onClick={onCancel}
          className="px-4 py-1 rounded mx-3 border border-blue-500 text-blue-500"
        >
          Cancel
        </button>
      </div>
      {/*  */}
      <div className="overflow-hidden shadow-md">
        <div className="py-2 px-3 bg-cyan-500 rounded-t-xl mt-3">
          <h1 className="text-white">Roles & Permissions Details</h1>
        </div>
        {/* ----------- FORMS START FROM HERE ----------- */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col min-h-screen py-2 px-4 bg-white rounded-b-xl">
            <div className="flex gap-4">
              <div className="grid gap-2 pb-3 w-full">
                {/* ------ FIRST ONE -------- */}
                <div className="flex space-x-4">
                  {/* ---------- Group NAME DROPDOWN ---------- */}

                  <div className="flex flex-col w-1/2 relative">
                    <label
                      htmlFor="leadesStatus"
                      className="text-sm font-medium text-gray-700"
                    >
                      Group Name
                    </label>
                    <div
                      className="relative"
                      onMouseLeave={() => setisDropdownVisibleLeadStatus(false)}
                    >
                      <button
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                        id="LeadStatusDropDown"
                        type="button"
                        onClick={toggleDropdownLeadStatus}
                      >
                        {defaultTextLeadStatusDropDown}
                        <FaAngleDown className="ml-2 text-gray-400" />
                      </button>
                      {isDropdownVisibleLeadStatus && (
                        <div className="absolute w-full bg-white border border-gray-300 rounded-md top-full z-10">
                          <ul className="py-2 text-sm text-gray-700">
                            {grpName.length > 0 ? (
                              grpName.map((group) => (
                                <li
                                  key={group.id}
                                  onClick={() =>
                                    handleDropdownLeadStatus(group.groupName)
                                  }
                                  className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                                >
                                  {group.groupName}
                                </li>
                              ))
                            ) : (
                              <li className="flex items-center px-4 py-2 text-center gap-1">
                                <IoInformationCircle
                                  size={25}
                                  className="text-cyan-600"
                                />
                                Group Name not available. Go to{" "}
                                <span className="font-bold">
                                  Settings - Groups - Add
                                </span>
                                .
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ---------- MODULE NAME DROPDOWN ---------- */}
                  <div className="flex flex-col w-1/2 relative">
                    <label
                      htmlFor="groupName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Group Module Name
                    </label>
                    <div
                      className="relative"
                      onClick={toggleDropdownGroupModule}
                      onMouseLeave={() => setDropdownGroupModule(false)} // Close dropdown on mouse leave
                    >
                      <button
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                        id="groupName"
                        type="button"
                      >
                        {defaultGroupModuleText}
                        <FaAngleDown className="ml-2 text-gray-400" />
                      </button>
                      {dropdownGroupModule && (
                        <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10.5 z-10">
                          <ul className="py-2 text-sm text-gray-700">
                            {groupModuleName.map(({ id, name }) => (
                              <li
                                key={id}
                                onClick={() => handleDropdownGroupModule(name)}
                                className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                              >
                                {name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* ----------Lead CHECK BOXES ---------- */}
                {defaultGroupModuleText === "Leads" ||
                defaultGroupModuleText === "All Group Module" ? (
                  <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2">
                    <h1 className="font-normal mb-2 text-xl">Leads</h1>
                    {/* ---------- LEAD BOXES ---------- */}
                    <div className="flex gap-12">
                      {/* FIRST */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">Create Lead</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">Upload Leads</p>
                        </div>
                        {/* THIRD ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">Lead Action</p>
                        </div>
                        {/* FOURTH ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">Delete</p>
                        </div>
                      </div>
                      {/* SECOND */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">View</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">Internal Assign</p>
                        </div>
                        {/* THIRD ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">Lead Action Assign</p>
                        </div>
                      </div>
                      {/* THIRD */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">Marketing Leads</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">Outer Assign</p>
                        </div>
                        {/* THIRD ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">Send Email Template</p>
                        </div>
                      </div>
                      {/* FOURTH */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">Edit</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">Global Assign</p>
                        </div>
                        {/* THIRD ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">Send Email Template</p>
                        </div>
                      </div>
                      {/* FIFTH */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">Dispose</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">View Follow Up</p>
                        </div>
                        {/* THIRD ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">Follow Assign</p>
                        </div>
                      </div>
                      {/* SIXTH */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">Dispose Clients</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">Bulk Lead Operation</p>
                        </div>
                        {/* THIRD ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">Refund Payment</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {/* --------- CONTACT --------- */}
                {defaultGroupModuleText === "Contacts" ||
                defaultGroupModuleText === "All Group Module" ? (
                  <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2">
                    <h1 className="font-normal mb-2 text-xl">Contact</h1>
                    {/* CONTACT CHECKBOXES */}
                    <div className="flex items-center gap-10">
                      {/* FIRST */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className="text-sm font-md">Create</p>
                      </div>
                      {/* FIRST */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className="text-sm font-md">View</p>
                      </div>
                      {/* THIRD */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className="text-sm font-md">Contact Assign</p>
                      </div>
                      {/* FOURTH */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className="text-sm font-md">Contact Action</p>
                      </div>
                      {/* FIFTH */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className="text-sm font-md">Contact Action Assign</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {/* --------- Client  --------- */}
                {defaultGroupModuleText === "Client" ||
                defaultGroupModuleText === "All Group Module" ? (
                  <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2">
                    <h1 className="font-normal mb-2 text-xl">Client</h1>
                    {/* CONTACT CHECKBOXES */}
                    <div className="flex items-center gap-10">
                      {/* FIRST */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className="text-sm font-md">Create</p>
                      </div>
                      {/* FIRST */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className="text-sm font-md">View</p>
                      </div>
                      {/* THIRD */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className="text-sm font-md">Mutual Fund Assign</p>
                      </div>
                      {/* FOURTH */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className="text-sm font-md">Mutual Fund Action</p>
                      </div>
                      {/* FIFTH */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className="text-sm font-md">
                          Mutual Fund Action Assign
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {/* --------- SO --------- */}
                {defaultGroupModuleText === "Sales Order" ||
                defaultGroupModuleText === "All Group Module" ? (
                  <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2">
                    <h1 className="font-normal mb-2 text-xl">Sales Order</h1>
                    {/* ---------- LEAD BOXES ---------- */}
                    <div className="flex gap-12">
                      {/* FIRST */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">Create</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">Stop</p>
                        </div>
                      </div>
                      {/* SECOND */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">View</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">Paid Client Assign</p>
                        </div>
                      </div>
                      {/* THIRD */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">Edit</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">Paid Client Action</p>
                        </div>
                      </div>
                      {/* FOURTH */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">Approve SO</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">
                            Paid Client Action Assign
                          </p>
                        </div>
                      </div>
                      {/* FIFTH */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">Payment Portal</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">Payment Edit</p>
                        </div>
                      </div>
                      {/* SIXTH */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">Payment Approval</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">Delete</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {/* --------- Free Trail --------- */}

                {defaultGroupModuleText === "Free Trail" ||
                defaultGroupModuleText === "All Group Module" ? (
                  <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2">
                    <h1 className="font-normal mb-2 text-xl">Free Trail</h1>
                    {/* ---------- LEAD BOXES ---------- */}
                    <div className="flex gap-14">
                      {/* FIRST */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">KYC</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">SO Report</p>
                        </div>
                      </div>
                      {/* SECOND */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">Risk Profile</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">Tax Report</p>
                        </div>
                      </div>
                      {/* THIRD */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">Agreement Approved</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">Paid Client Action</p>
                        </div>
                      </div>
                      {/* FOURTH */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">View RPM</p>
                        </div>
                      </div>
                      {/* FIFTH */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">Edit RPM</p>
                        </div>
                      </div>
                      {/* SIXTH */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input type="checkbox" />
                          <p className="text-sm font-md">Invoice</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {/* --------- Follow Up --------- */}
                {defaultGroupModuleText === "Follow Up" ||
                defaultGroupModuleText === "All Group Module" ? (
                  <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2">
                    <h1 className="font-normal mb-2 text-xl">Follow Up</h1>
                    {/* CONTACT CHECKBOXES */}
                    <div className="flex items-center gap-12">
                      {/* FIRST */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className="text-sm font-md">View</p>
                      </div>
                      {/* FIRST */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className="text-sm font-md">Regularization</p>
                      </div>
                      {/* THIRD */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p>Manager Approval</p>
                      </div>
                      {/* FOURTH */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className="text-sm font-md">HR Approval</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {/* --------- SMS Box --------- */}

                {defaultGroupModuleText === "SMS Box" ||
                defaultGroupModuleText === "All Group Module" ? (
                  <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2">
                    <h1 className="font-normal mb-2 text-xl">SMS Box</h1>
                    {/* CONTACT CHECKBOXES */}
                    <div className="flex items-center gap-12">
                      {/* FIRST */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className="text-sm font-md">View Salary</p>
                      </div>
                      {/* FIRST */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className="text-sm font-md">Calculate Salary</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {/* --------- Reports --------- */}

                {defaultGroupModuleText === "Reports" ||
                defaultGroupModuleText === "All Group Module" ? (
                  <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2">
                    <h1 className="font-normal mb-2 text-xl">Reports</h1>
                    {/* CONTACT CHECKBOXES */}
                    <div className="flex items-center gap-8">
                      {/* FIRST */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className="text-sm font-md">ORG Chart</p>
                      </div>
                      {/* SECOND */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className="text-sm font-md">Scrap Book</p>
                      </div>
                      {/* THIRD */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className="text-sm font-md">Holiday</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {/* ---------  Analytics --------- */}

                {defaultGroupModuleText === "Analytics" ||
                defaultGroupModuleText === "All Group Module" ? (
                  <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2">
                    <h1 className="font-normal mb-2 text-xl">Analytics</h1>
                    {/* CONTACT CHECKBOXES */}
                    <div className="flex items-center gap-8">
                      {/* FIRST */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className="text-sm font-md">Send SMS</p>
                      </div>
                      {/* SECOND */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className="text-sm font-md">View SMS</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            {/* BUTTONS */}
            <div className="flex justify-end px-2 gap-2">
              <button
                type="submit"
                className="px-10 py-4 mt-20 mb-3 bg-cyan-500 text-white border-2 border-cyan-500 rounded hover:text-cyan-500 hover:bg-white w-max disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300 disabled:cursor-not-allowed"
                disabled={defaultGroupModuleText === "All Group Module"}
              >
                Submit
              </button>
              
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

AddPermission.propTypes = {
  onCancel: PropTypes.func.isRequired,
};
