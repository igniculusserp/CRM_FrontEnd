import { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import axios from "axios";
import PropTypes from "prop-types";

import { tenant_base_url, protocal_url } from "./../../../../../Config/config";

import { getHostnamePart } from "../../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

import { ToastContainer } from "react-toastify";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../../utils/toastNotifications";

export default function AddPermission({ onCancel }) {
  const name = getHostnamePart();

  // ------------------------------------------ Module DROPDOWNS HERE ----------------------------------------------

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
    { id: 8, name: "Service Box" },
    { id: 9, name: "Reports" },
    { id: 10, name: "Financial Activity" },
    { id: 11, name: "Settings" },
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
  // ----------------------------------------------- Group DropDown GET API Is being used here -------------------------------------
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
  };

  // ------------------------------------------ Handle checkbox change -------------------------------------------

  const [permissions, setPermissions] = useState([]);

  const handleCheckboxChange = (permission) => {
    setPermissions(
      (prevPermissions) =>
        prevPermissions.includes(permission)
          ? prevPermissions.filter((item) => item !== permission) // Remove if already selected
          : [...prevPermissions, permission] // Add if not selected
    );
  };

  // Log updated permissions whenever they change
  useEffect(() => {
    console.log("Updated permissions: ", permissions);
  }, [permissions]);

  //------------------------------------------------Handle Submit---------------------------------------------------
  const handleSubmit = async (event) => {
    event.preventDefault();
    const bearer_token = localStorage.getItem("token");

    const payload = {
      groupName: defaultTextLeadStatusDropDown,
      moduleName: defaultGroupModuleText,
      permissions,
    };

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `${protocal_url}${name}.${tenant_base_url}/Security/rolesandpermissions/add`,
        payload,
        config
      );
      if (response.data.isSuccess) {
        showSuccessToast("Permission added successfully!");

        // Call onCancel after a short delay to ensure toast shows first
        setTimeout(() => {
          onCancel();
        }, 1500); // Adjust delay as needed (in milliseconds)
      }
    } catch (error) {
      console.log(error);
      showErrorToast("Failed");
    }
  };

  return (
    <div className="flex min-h-screen flex-col m-3 overflow-x-auto overflow-y-hidden">
      <ToastContainer />
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
              <div className="grid gap-2 pb-3 w-full ">
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
                              grpName.map((group) => 
                                
                                group.groupName ==="Admin" ? null : 

                                  (
                                  <li
                                    key={group.id}
                                    onClick={() =>
                                      handleDropdownLeadStatus(group.groupName)
                                    }
                                    className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                                  >
                                    {group.groupName}
                                  </li>
                                )
                                
                            )
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
                  <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2 ">
                    <h1 className="font-normal mb-2 text-xl">Leads</h1>
                    {/* ---------- LEAD BOXES ---------- */}
                    <div className="flex gap-12 justify-between">
                      {/* FIRST */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            id="create-lead"
                            onChange={() => handleCheckboxChange("Create Lead")}
                          />
                          <p className="text-sm font-md">Create Lead</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Upload Leads")
                            }
                          />
                          <p className="text-sm font-md">Upload Leads</p>
                        </div>
                        {/* THIRD ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Lead Operation")
                            }
                          />
                          <p className="text-sm font-md">Lead operation</p>
                        </div>
                        {/* FOURTH ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Lead Action")}
                          />
                          <p className="text-sm font-md">Lead Action</p>
                        </div>
                      </div>
                      {/* SECOND */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("View Leads")}
                          />
                          <p className="text-sm font-md">View Leads</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Fetch Leads")}
                          />
                          <p className="text-sm font-md">Fetch Leads</p>
                        </div>
                        {/* THIRD ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Edit Lead")}
                          />
                          <p className="text-sm font-md">Edit Lead</p>
                        </div>
                        {/* Fourth ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Mass Delete")}
                          />
                          <p className="text-sm font-md">Mass Delete</p>
                        </div>
                      </div>
                      {/* THIRD */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Approve Leads")
                            }
                          />
                          <p className="text-sm font-md">Approve Leads</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Export to Excel")
                            }
                          />
                          <p className="text-sm font-md">Export to Excel</p>
                        </div>
                        {/* THIRD ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Export to PDF")
                            }
                          />
                          <p className="text-sm font-md">Export to PDF</p>
                        </div>
                      </div>
                      {/* FOURTH */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Convert Lead to Contact")
                            }
                          />
                          <p className="text-sm font-md">
                            Convert Lead to Contact
                          </p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Create Sales Order")
                            }
                          />
                          <p className="text-sm font-md">Create sales order</p>
                        </div>
                        {/* THIRD ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Mass E-Mail")}
                          />
                          <p className="text-sm font-md">Mass E-Mail</p>
                        </div>
                      </div>
                      {/* FIFTH */}
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {/* --------- CONTACT --------- */}
                {defaultGroupModuleText === "Contacts" ||
                defaultGroupModuleText === "All Group Module" ? (
                  <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2 ">
                    <h1 className="font-normal mb-2 text-xl">Contacts</h1>
                    {/* ---------- LEAD BOXES ---------- */}
                    <div className="flex gap-12 justify-between">
                      {/* FIRST */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Create Sales order")
                            }
                          />
                          <p className="text-sm font-md">Create Sales order</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Edit Contact")
                            }
                          />
                          <p className="text-sm font-md">Edit Contact</p>
                        </div>
                      </div>
                      {/* SECOND */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("View Contacts")
                            }
                          />
                          <p className="text-sm font-md">View Contacts</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Export to PDF")
                            }
                          />
                          <p className="text-sm font-md">Export to PDF</p>
                        </div>
                      </div>
                      {/* THIRD */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Mass Delete")}
                          />
                          <p className="text-sm font-md">Mass Delete</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Export to Excel")
                            }
                          />
                          <p className="text-sm font-md">Export to Excel</p>
                        </div>
                      </div>
                      {/* FOURTH */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Mass E-Mail")}
                          />
                          <p className="text-sm font-md">Mass E-Mail</p>
                        </div>
                      </div>
                      {/* FIFTH */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}

                        {/* SECOND ITEM */}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {/* --------- Client  --------- */}
                {defaultGroupModuleText === "Client" ||
                defaultGroupModuleText === "All Group Module" ? (
                  <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2 ">
                    <h1 className="font-normal mb-2 text-xl">Client</h1>
                    {/* ---------- LEAD BOXES ---------- */}
                    <div className="flex gap-12 justify-between">
                      {/* FIRST */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Mass E-Mail")}
                          />
                          <p className="text-sm font-md">Mass E-Mail</p>
                        </div>
                      </div>
                      {/* SECOND */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Export to PDF")
                            }
                          />
                          <p className="text-sm font-md">Export to PDF</p>
                        </div>
                      </div>
                      {/* THIRD */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Export to Excel")
                            }
                          />
                          <p className="text-sm font-md">Export to Excel</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {/* --------- SO --------- */}
                {defaultGroupModuleText === "Sales Order" ||
                defaultGroupModuleText === "All Group Module" ? (
                  <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2 ">
                    <h1 className="font-normal mb-2 text-xl">Sales Order</h1>
                    {/* ---------- LEAD BOXES ---------- */}
                    <div className="flex gap-12 justify-between">
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Edit Sales Order")
                            }
                          />
                          <p className="text-sm font-md">Edit Sales Order</p>
                        </div>
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Approve Pending")
                            }
                          />
                          <p className="text-sm font-md">Approve Pending</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Send SMS")}
                          />
                          <p className="text-sm font-md">Send SMS</p>
                        </div>
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Export to PDF")
                            }
                          />
                          <p className="text-sm font-md">Export to PDF</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Mass Delete")}
                          />
                          <p className="text-sm font-md">Mass Delete</p>
                        </div>
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Export to Excel")
                            }
                          />
                          <p className="text-sm font-md">Export to Excel</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Mass E-Mail")}
                          />
                          <p className="text-sm font-md">Mass E-Mail</p>
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
                  <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2 ">
                    <h1 className="font-normal mb-2 text-xl">Free Trail</h1>
                    <div className="flex gap-12 justify-between">
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Edit Free Trail")
                            }
                          />
                          <p className="text-sm font-md">Edit Free Trail</p>
                        </div>
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Export Trail")
                            }
                          />
                          <p className="text-sm font-md">Export Trail</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Print View")}
                          />
                          <p className="text-sm font-md">Print View</p>
                        </div>
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Sheet View")}
                          />
                          <p className="text-sm font-md">Sheet View</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Mass Delete")}
                          />
                          <p className="text-sm font-md">Mass Delete</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Mass E-Mail")}
                          />
                          <p className="text-sm font-md">Mass E-Mail</p>
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
                  <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2 ">
                    <h1 className="font-normal mb-2 text-xl">Follow Up</h1>
                    <div className="flex gap-12 justify-between">
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Edit Follow Up")
                            }
                          />
                          <p className="text-sm font-md">Edit Follow Up</p>
                        </div>
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Export Follow Up")
                            }
                          />
                          <p className="text-sm font-md">Export Follow Up</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Print View")}
                          />
                          <p className="text-sm font-md">Print View</p>
                        </div>
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Sheet View")}
                          />
                          <p className="text-sm font-md">Sheet View</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Mass Delete")}
                          />
                          <p className="text-sm font-md">Mass Delete</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Mass E-Mail")}
                          />
                          <p className="text-sm font-md">Mass E-Mail</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {/* --------- SMS Box --------- */}
                {defaultGroupModuleText === "Service Box" ||
                defaultGroupModuleText === "All Group Module" ? (
                  <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2">
                    <h1 className="font-normal mb-2 text-xl">Service Box</h1>
                    <div className="flex items-center gap-12">
                      <div className="flex gap-3 items-center font-light">
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange("Send SMS")}
                        />
                        <p className="text-sm font-md">Send SMS</p>
                      </div>
                      <div className="flex gap-3 items-center font-light">
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange("Send E-Mail")}
                        />
                        <p className="text-sm font-md">Send E-Mail</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {/* --------- Reports --------- */}

                {defaultGroupModuleText === "Reports" ||
                defaultGroupModuleText === "All Group Module" ? (
                  <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2 ">
                    <h1 className="font-normal mb-2 text-xl">Reports</h1>
                    {/* ---------- LEAD BOXES ---------- */}
                    <div className="flex gap-12 justify-between">
                      {/* FIRST */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Employee Report")
                            }
                          />
                          <p className="text-sm font-md">Employee Report</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Monitoring")}
                          />
                          <p className="text-sm font-md">Monitoring</p>
                        </div>
                      </div>
                      {/* SECOND */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Lead Report")}
                          />
                          <p className="text-sm font-md">Lead Report</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Dispose Leads")
                            }
                          />
                          <p className="text-sm font-md">Dispose Leads</p>
                        </div>
                      </div>
                      {/* THIRD */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Client Report")
                            }
                          />
                          <p className="text-sm font-md">Client Report</p>
                        </div>
                      </div>
                      {/* FOURTH */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Sales Report")
                            }
                          />
                          <p className="text-sm font-md">Sales Report</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {/* ---------  Financial Activity --------- */}

                {defaultGroupModuleText === "Financial Activity" ||
                defaultGroupModuleText === "All Group Module" ? (
                  <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2">
                    <h1 className="font-normal mb-2 text-xl">
                      Financial Activity
                    </h1>
                    {/* CONTACT CHECKBOXES */}
                    <div className="flex items-center gap-12">
                      {/* FIRST */}
                      <div className="flex gap-3 items-center font-light">
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange("View Expenses")}
                        />
                        <p className="text-sm font-md">View Expenses</p>
                      </div>
                      {/* SECOND */}
                      <div className="flex gap-3 items-center font-light">
                        <input
                          type="checkbox"
                          onChange={() =>
                            handleCheckboxChange("View Brokerage")
                          }
                        />
                        <p className="text-sm font-md">View Brokerage</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {/* ----------Settings CHECK BOXES ---------- */}
                {defaultGroupModuleText === "Settings" ||
                defaultGroupModuleText === "All Group Module" ? (
                  <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2 ">
                  <h1 className="font-normal mb-2 text-xl">Settings</h1>
                  {/* ---------- LEAD BOXES ---------- */}
                  <div className="flex gap-12 justify-between">
                    {/* FIRST */}
                    <div className="flex flex-col gap-3">
                      {/* FIRST ROW */}
                      <div className="flex gap-3 items-center font-light">
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange("User Setting")}
                        />
                        <p className="text-sm font-md">User Setting</p>
                      </div>
                      {/* SECOND ITEM */}
                      <div className="flex gap-3 items-center font-light">
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange("User Operation")}
                        />
                        <p className="text-sm font-md">User Operation</p>
                      </div>
                      {/* THIRD ITEM */}
                      <div className="flex gap-3 items-center font-light">
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange("Group")}
                        />
                        <p className="text-sm font-md">Group</p>
                      </div>
                      {/* FOURTH ITEM */}
                      <div className="flex gap-3 items-center font-light">
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange("Department")}
                        />
                        <p className="text-sm font-md">Department</p>
                      </div>
                    </div>
                    {/* SECOND */}
                    <div className="flex flex-col gap-3">
                      {/* FIRST ROW */}
                      <div className="flex gap-3 items-center font-light">
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange("Designation")}
                        />
                        <p className="text-sm font-md">Designation</p>
                      </div>
                      {/* SECOND ITEM */}
                      <div className="flex gap-3 items-center font-light">
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange("Qualification")}
                        />
                        <p className="text-sm font-md">Qualification</p>
                      </div>
                      {/* THIRD ITEM */}
                      <div className="flex gap-3 items-center font-light">
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange("Lead Status")}
                        />
                        <p className="text-sm font-md">Lead Status</p>
                      </div>
                      {/* FOURTH ITEM */}
                      <div className="flex gap-3 items-center font-light">
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange("Pools")}
                        />
                        <p className="text-sm font-md">Pools</p>
                      </div>
                      {/* FIFTH ITEM */}
                      <div className="flex gap-3 items-center font-light">
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange("Roles & Permissions")}
                        />
                        <p className="text-sm font-md">Roles & Permissions</p>
                      </div>
                    </div>
                    {/* THIRD */}
                    <div className="flex flex-col gap-3">
                      {/* FIRST ROW */}
                      <div className="flex gap-3 items-center font-light">
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange("Segments")}
                        />
                        <p className="text-sm font-md">Segments</p>
                      </div>
                      {/* SECOND ITEM */}
                      <div className="flex gap-3 items-center font-light">
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange("Expense Head")}
                        />
                        <p className="text-sm font-md">Expense Head</p>
                      </div>
                      {/* THIRD ITEM */}
                      <div className="flex gap-3 items-center font-light">
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange("SMS Setting")}
                        />
                        <p className="text-sm font-md">SMS Setting</p>
                      </div>
                      {/* FOURTH ITEM */}
                      <div className="flex gap-3 items-center font-light">
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange("E-Mail Template")}
                        />
                        <p className="text-sm font-md">E-Mail Template</p>
                      </div>
                    </div>
                    {/* FOURTH */}
                    <div className="flex flex-col gap-3">
                      {/* FIRST ROW */}
                      <div className="flex gap-3 items-center font-light">
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange("SMS Template")}
                        />
                        <p className="text-sm font-md">SMS Template</p>
                      </div>
                      {/* SECOND ITEM */}
                      <div className="flex gap-3 items-center font-light">
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange("Access Device")}
                        />
                        <p className="text-sm font-md">Access Device</p>
                      </div>
                      {/* THIRD ITEM */}
                      <div className="flex gap-3 items-center font-light">
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange("Access Control")}
                        />
                        <p className="text-sm font-md">Access Control</p>
                      </div>
                      {/* Fourth ITEM */}
                      <div className="flex gap-3 items-center font-light">
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange("E-Mail Setting")}
                        />
                        <p className="text-sm font-md">E-Mail Setting</p>
                      </div>
                    </div>
                    {/* FIFTH */}
                    <div className="flex flex-col gap-3">
                      {/* FIFTH ROW */}
                      {/* Additional items can be added here */}
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
                disabled={
                  defaultGroupModuleText === "All Group Module" ||
                  defaultTextLeadStatusDropDown === "Select Group Name"
                }
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
