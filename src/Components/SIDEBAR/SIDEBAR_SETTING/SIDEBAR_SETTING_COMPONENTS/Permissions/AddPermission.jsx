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
        config,
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
          : [...prevPermissions, permission], // Add if not selected
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
        config,
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
    <div className="m-3 flex min-h-screen flex-col overflow-x-auto overflow-y-hidden">
      <ToastContainer />
      <div className="flex items-center justify-between rounded-md bg-white px-2 py-2 shadow-md">
        <h1 className="text-xl">Add Roles & Permissions</h1>
        {/*------------------------------------------------- Cancel Button--------------------------------------------- */}
        <button
          onClick={onCancel}
          className="mx-3 rounded border border-blue-500 px-4 py-1 text-blue-500"
        >
          Cancel
        </button>
      </div>
      {/*  */}
      <div className="overflow-hidden shadow-md">
        <div className="mt-3 rounded-t-xl bg-cyan-500 px-3 py-2">
          <h1 className="text-white">Roles & Permissions Details</h1>
        </div>
        {/* ----------- FORMS START FROM HERE ----------- */}
        <form onSubmit={handleSubmit}>
          <div className="flex min-h-screen flex-col rounded-b-xl bg-white px-4 py-2">
            <div className="flex gap-4">
              <div className="grid w-full gap-2 pb-3">
                {/* ------ FIRST ONE -------- */}
                <div className="flex space-x-4">
                  {/* ---------- Group NAME DROPDOWN ---------- */}

                  <div className="relative flex w-1/2 flex-col">
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
                        className="mt-1 flex w-full items-center justify-between rounded-md border border-gray-300 p-2"
                        id="LeadStatusDropDown"
                        type="button"
                        onClick={toggleDropdownLeadStatus}
                      >
                        {defaultTextLeadStatusDropDown}
                        <FaAngleDown className="ml-2 text-gray-400" />
                      </button>
                      {isDropdownVisibleLeadStatus && (
                        <div className="absolute top-full z-10 w-full rounded-md border border-gray-300 bg-white">
                          <ul className="py-2 text-sm text-gray-700">
                            {grpName.length > 0 ? (
                              grpName.map((group) =>
                                group.groupName === "Admin" ? null : (
                                  <li
                                    key={group.id}
                                    onClick={() =>
                                      handleDropdownLeadStatus(group.groupName)
                                    }
                                    className="block cursor-pointer border-b px-4 py-2 hover:bg-cyan-500 hover:text-white"
                                  >
                                    {group.groupName}
                                  </li>
                                ),
                              )
                            ) : (
                              <li className="flex items-center gap-1 px-4 py-2 text-center">
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
                  <div className="relative flex w-1/2 flex-col">
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
                        className="mt-1 flex w-full items-center justify-between rounded-md border border-gray-300 p-2"
                        id="groupName"
                        type="button"
                      >
                        {defaultGroupModuleText}
                        <FaAngleDown className="ml-2 text-gray-400" />
                      </button>
                      {dropdownGroupModule && (
                        <div className="top-10.5 absolute z-10 w-full rounded-md border border-gray-300 bg-white">
                          <ul className="py-2 text-sm text-gray-700">
                            {groupModuleName.map(({ id, name }) => (
                              <li
                                key={id}
                                onClick={() => handleDropdownGroupModule(name)}
                                className="block cursor-pointer border-b px-4 py-2 hover:bg-cyan-500 hover:text-white"
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
                  <div className="mt-2 w-full rounded-sm bg-white p-3 shadow-md">
                    <h1 className="mb-2 text-xl font-normal">Leads</h1>
                    {/* ---------- LEAD BOXES ---------- */}
                    <div className="flex justify-between gap-12">
                      {/* FIRST */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            id="create-lead"
                            onChange={() => handleCheckboxChange("Create Lead")}
                          />
                          <p className="font-md text-sm">Create Lead</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Upload Leads")
                            }
                          />
                          <p className="font-md text-sm">Upload Leads</p>
                        </div>
                        {/* THIRD ITEM */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Lead Operation")
                            }
                          />
                          <p className="font-md text-sm">Lead operation</p>
                        </div>
                        {/* FOURTH ITEM */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Lead Action")}
                          />
                          <p className="font-md text-sm">Lead Action</p>
                        </div>
                      </div>
                      {/* SECOND */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("View Leads")}
                          />
                          <p className="font-md text-sm">View Leads</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Fetch Leads")}
                          />
                          <p className="font-md text-sm">Fetch Leads</p>
                        </div>
                        {/* THIRD ITEM */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Edit Lead")}
                          />
                          <p className="font-md text-sm">Edit Lead</p>
                        </div>
                        {/* Fourth ITEM */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Mass Delete")}
                          />
                          <p className="font-md text-sm">Mass Delete</p>
                        </div>
                      </div>
                      {/* THIRD */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Approve Leads")
                            }
                          />
                          <p className="font-md text-sm">Approve Leads</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Export to Excel")
                            }
                          />
                          <p className="font-md text-sm">Export to Excel</p>
                        </div>
                        {/* THIRD ITEM */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Export to PDF")
                            }
                          />
                          <p className="font-md text-sm">Export to PDF</p>
                        </div>
                      </div>
                      {/* FOURTH */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Convert Lead to Contact")
                            }
                          />
                          <p className="font-md text-sm">
                            Convert Lead to Contact
                          </p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Create Sales Order")
                            }
                          />
                          <p className="font-md text-sm">Create sales order</p>
                        </div>
                        {/* THIRD ITEM */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Mass E-Mail")}
                          />
                          <p className="font-md text-sm">Mass E-Mail</p>
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
                  <div className="mt-2 w-full rounded-sm bg-white p-3 shadow-md">
                    <h1 className="mb-2 text-xl font-normal">Contacts</h1>
                    {/* ---------- LEAD BOXES ---------- */}
                    <div className="flex justify-between gap-12">
                      {/* FIRST */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Create Sales order")
                            }
                          />
                          <p className="font-md text-sm">Create Sales order</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Edit Contact")
                            }
                          />
                          <p className="font-md text-sm">Edit Contact</p>
                        </div>
                      </div>
                      {/* SECOND */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("View Contacts")
                            }
                          />
                          <p className="font-md text-sm">View Contacts</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Export to PDF")
                            }
                          />
                          <p className="font-md text-sm">Export to PDF</p>
                        </div>
                      </div>
                      {/* THIRD */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Mass Delete")}
                          />
                          <p className="font-md text-sm">Mass Delete</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Export to Excel")
                            }
                          />
                          <p className="font-md text-sm">Export to Excel</p>
                        </div>
                      </div>
                      {/* FOURTH */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Mass E-Mail")}
                          />
                          <p className="font-md text-sm">Mass E-Mail</p>
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
                  <div className="mt-2 w-full rounded-sm bg-white p-3 shadow-md">
                    <h1 className="mb-2 text-xl font-normal">Client</h1>
                    {/* ---------- LEAD BOXES ---------- */}
                    <div className="flex justify-between gap-12">
                      {/* FIRST */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Mass E-Mail")}
                          />
                          <p className="font-md text-sm">Mass E-Mail</p>
                        </div>
                      </div>
                      {/* SECOND */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Export to PDF")
                            }
                          />
                          <p className="font-md text-sm">Export to PDF</p>
                        </div>
                      </div>
                      {/* THIRD */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Export to Excel")
                            }
                          />
                          <p className="font-md text-sm">Export to Excel</p>
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
                  <div className="mt-2 w-full rounded-sm bg-white p-3 shadow-md">
                    <h1 className="mb-2 text-xl font-normal">Sales Order</h1>
                    {/* ---------- LEAD BOXES ---------- */}
                    <div className="flex justify-between gap-12">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Edit Sales Order")
                            }
                          />
                          <p className="font-md text-sm">Edit Sales Order</p>
                        </div>
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Approve Pending")
                            }
                          />
                          <p className="font-md text-sm">Approve Pending</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Send SMS")}
                          />
                          <p className="font-md text-sm">Send SMS</p>
                        </div>
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Export to PDF")
                            }
                          />
                          <p className="font-md text-sm">Export to PDF</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Mass Delete")}
                          />
                          <p className="font-md text-sm">Mass Delete</p>
                        </div>
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Export to Excel")
                            }
                          />
                          <p className="font-md text-sm">Export to Excel</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Mass E-Mail")}
                          />
                          <p className="font-md text-sm">Mass E-Mail</p>
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
                  <div className="mt-2 w-full rounded-sm bg-white p-3 shadow-md">
                    <h1 className="mb-2 text-xl font-normal">Free Trail</h1>
                    <div className="flex justify-between gap-12">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Edit Free Trail")
                            }
                          />
                          <p className="font-md text-sm">Edit Free Trail</p>
                        </div>
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Export Trail")
                            }
                          />
                          <p className="font-md text-sm">Export Trail</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Print View")}
                          />
                          <p className="font-md text-sm">Print View</p>
                        </div>
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Sheet View")}
                          />
                          <p className="font-md text-sm">Sheet View</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Mass Delete")}
                          />
                          <p className="font-md text-sm">Mass Delete</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Mass E-Mail")}
                          />
                          <p className="font-md text-sm">Mass E-Mail</p>
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
                  <div className="mt-2 w-full rounded-sm bg-white p-3 shadow-md">
                    <h1 className="mb-2 text-xl font-normal">Follow Up</h1>
                    <div className="flex justify-between gap-12">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Edit Follow Up")
                            }
                          />
                          <p className="font-md text-sm">Edit Follow Up</p>
                        </div>
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Export Follow Up")
                            }
                          />
                          <p className="font-md text-sm">Export Follow Up</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Print View")}
                          />
                          <p className="font-md text-sm">Print View</p>
                        </div>
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Sheet View")}
                          />
                          <p className="font-md text-sm">Sheet View</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Mass Delete")}
                          />
                          <p className="font-md text-sm">Mass Delete</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Mass E-Mail")}
                          />
                          <p className="font-md text-sm">Mass E-Mail</p>
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
                  <div className="mt-2 w-full rounded-sm bg-white p-3 shadow-md">
                    <h1 className="mb-2 text-xl font-normal">Service Box</h1>
                    <div className="flex items-center gap-12">
                      <div className="flex items-center gap-3 font-light">
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange("Send SMS")}
                        />
                        <p className="font-md text-sm">Send SMS</p>
                      </div>
                      <div className="flex items-center gap-3 font-light">
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange("Send E-Mail")}
                        />
                        <p className="font-md text-sm">Send E-Mail</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {/* --------- Reports --------- */}

                {defaultGroupModuleText === "Reports" ||
                defaultGroupModuleText === "All Group Module" ? (
                  <div className="mt-2 w-full rounded-sm bg-white p-3 shadow-md">
                    <h1 className="mb-2 text-xl font-normal">Reports</h1>
                    {/* ---------- LEAD BOXES ---------- */}
                    <div className="flex justify-between gap-12">
                      {/* FIRST */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Employee Report")
                            }
                          />
                          <p className="font-md text-sm">Employee Report</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Monitoring")}
                          />
                          <p className="font-md text-sm">Monitoring</p>
                        </div>
                      </div>
                      {/* SECOND */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Lead Report")}
                          />
                          <p className="font-md text-sm">Lead Report</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Dispose Leads")
                            }
                          />
                          <p className="font-md text-sm">Dispose Leads</p>
                        </div>
                      </div>
                      {/* THIRD */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Client Report")
                            }
                          />
                          <p className="font-md text-sm">Client Report</p>
                        </div>
                      </div>
                      {/* FOURTH */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Sales Report")
                            }
                          />
                          <p className="font-md text-sm">Sales Report</p>
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
                  <div className="mt-2 w-full rounded-sm bg-white p-3 shadow-md">
                    <h1 className="mb-2 text-xl font-normal">
                      Financial Activity
                    </h1>
                    {/* CONTACT CHECKBOXES */}
                    <div className="flex items-center gap-12">
                      {/* FIRST */}
                      <div className="flex items-center gap-3 font-light">
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange("View Expenses")}
                        />
                        <p className="font-md text-sm">View Expenses</p>
                      </div>
                      {/* SECOND */}
                      <div className="flex items-center gap-3 font-light">
                        <input
                          type="checkbox"
                          onChange={() =>
                            handleCheckboxChange("View Brokerage")
                          }
                        />
                        <p className="font-md text-sm">View Brokerage</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {/* ----------Settings CHECK BOXES ---------- */}
                {defaultGroupModuleText === "Settings" ||
                defaultGroupModuleText === "All Group Module" ? (
                  <div className="mt-2 w-full rounded-sm bg-white p-3 shadow-md">
                    <h1 className="mb-2 text-xl font-normal">Settings</h1>
                    {/* ---------- LEAD BOXES ---------- */}
                    <div className="flex justify-between gap-12">
                      {/* FIRST */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("User Setting")
                            }
                          />
                          <p className="font-md text-sm">User Setting</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("User Operation")
                            }
                          />
                          <p className="font-md text-sm">User Operation</p>
                        </div>
                        {/* THIRD ITEM */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Group")}
                          />
                          <p className="font-md text-sm">Group</p>
                        </div>
                        {/* FOURTH ITEM */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Department")}
                          />
                          <p className="font-md text-sm">Department</p>
                        </div>
                      </div>
                      {/* SECOND */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Designation")}
                          />
                          <p className="font-md text-sm">Designation</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Qualification")
                            }
                          />
                          <p className="font-md text-sm">Qualification</p>
                        </div>
                        {/* THIRD ITEM */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Lead Status")}
                          />
                          <p className="font-md text-sm">Lead Status</p>
                        </div>
                        {/* FOURTH ITEM */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Pools")}
                          />
                          <p className="font-md text-sm">Pools</p>
                        </div>
                        {/* FIFTH ITEM */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Roles & Permissions")
                            }
                          />
                          <p className="font-md text-sm">Roles & Permissions</p>
                        </div>
                      </div>
                      {/* THIRD */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Segments")}
                          />
                          <p className="font-md text-sm">Segments</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Expense Head")
                            }
                          />
                          <p className="font-md text-sm">Expense Head</p>
                        </div>
                        {/* THIRD ITEM */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("SMS Setting")}
                          />
                          <p className="font-md text-sm">SMS Setting</p>
                        </div>
                        {/* FOURTH ITEM */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("E-Mail Template")
                            }
                          />
                          <p className="font-md text-sm">E-Mail Template</p>
                        </div>
                      </div>
                      {/* FOURTH */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("SMS Template")
                            }
                          />
                          <p className="font-md text-sm">SMS Template</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Access Device")
                            }
                          />
                          <p className="font-md text-sm">Access Device</p>
                        </div>
                        {/* THIRD ITEM */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Access Control")
                            }
                          />
                          <p className="font-md text-sm">Access Control</p>
                        </div>
                        {/* Fourth ITEM */}
                        <div className="flex items-center gap-3 font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("E-Mail Setting")
                            }
                          />
                          <p className="font-md text-sm">E-Mail Setting</p>
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
            <div className="flex justify-end gap-2 px-2">
              <button
                type="submit"
                className="mb-3 mt-20 w-max rounded border-2 border-cyan-500 bg-cyan-500 px-10 py-4 text-white hover:bg-white hover:text-cyan-500 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:text-gray-500"
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
