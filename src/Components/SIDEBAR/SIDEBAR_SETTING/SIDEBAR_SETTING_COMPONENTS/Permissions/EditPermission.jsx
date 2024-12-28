import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { tenant_base_url, protocal_url } from "./../../../../../Config/config";

import { getHostnamePart } from "../../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

import { ToastContainer } from "react-toastify";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../../utils/toastNotifications";

export default function EditPermission({ onCancel, permissionId }) {
  const name = getHostnamePart();

  //----------------------------------------------Get by ID------------------------------------------------

  //----------------------------------------------Get by ID------------------------------------------------

  const [defaultGroupModuleText, setDefaultGroupModuleText] = useState("");
  const [defaultTextLeadStatusDropDown, setdefaultTextLeadStatusDropDown] =
    useState("");

  const handleGetById = async () => {
    const bearer_token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${bearer_token}`,
      },
    };

    try {
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Security/rolesandpermissions/get/${permissionId}`,
        config
      );

      if (response.status === 200 && response.data.isSuccess) {
        const data = response.data.data;
        setdefaultTextLeadStatusDropDown(data.groupName);
        setDefaultGroupModuleText(data.moduleName);
        const permissionsArray = data.permissions.split(",");
        setPermissions(permissionsArray);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    handleGetById();
  }, []);

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

      const response = await axios.put(
        `${protocal_url}${name}.${tenant_base_url}/Security/rolesandpermissions/edit/${permissionId}`,
        payload,
        config
      );
      if (response.data.isSuccess) {
        showSuccessToast("Permission Update successfully!");

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
                {/* ----------Lead CHECK BOXES ---------- */}
                {defaultGroupModuleText === "Leads" ? (
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
                            checked={permissions.includes("Create Lead")}
                            onChange={() => handleCheckboxChange("Create Lead")}
                          />
                          <p className="text-sm font-md">Create Lead</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes("Upload Leads")}
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
                            checked={permissions.includes("Lead Operation")}
                            onChange={() =>
                              handleCheckboxChange("Lead Operation")
                            }
                          />
                          <p className="text-sm font-md">Lead Operation</p>
                        </div>
                        {/* FOURTH ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes("Lead Action")}
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
                            checked={permissions.includes("View Leads")}
                            onChange={() => handleCheckboxChange("View Leads")}
                          />
                          <p className="text-sm font-md">View Leads</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes("Fetch Leads")}
                            onChange={() => handleCheckboxChange("Fetch Leads")}
                          />
                          <p className="text-sm font-md">Fetch Leads</p>
                        </div>
                        {/* THIRD ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes("Edit Lead")}
                            onChange={() => handleCheckboxChange("Edit Lead")}
                          />
                          <p className="text-sm font-md">Edit Lead</p>
                        </div>
                        {/* Fourth ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes("Mass Delete")}
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
                            checked={permissions.includes("Approve Leads")}
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
                            checked={permissions.includes("Export to Excel")}
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
                            checked={permissions.includes("Export to PDF")}
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
                            checked={permissions.includes(
                              "Convert Lead to Contact"
                            )}
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
                            checked={permissions.includes("Create Sales Order")}
                            onChange={() =>
                              handleCheckboxChange("Create Sales Order")
                            }
                          />
                          <p className="text-sm font-md">Create Sales Order</p>
                        </div>
                        {/* THIRD ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes("Mass E-Mail")}
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

                {/* --------- CONTACT --------- */}
                {defaultGroupModuleText === "Contacts" ? (
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
                            checked={permissions.includes("Create Sales order")}
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
                            checked={permissions.includes("Edit Contact")}
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
                            checked={permissions.includes("View Contacts")}
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
                            checked={permissions.includes("Export to PDF")}
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
                            checked={permissions.includes("Mass Delete")}
                            onChange={() => handleCheckboxChange("Mass Delete")}
                          />
                          <p className="text-sm font-md">Mass Delete</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes("Export to Excel")}
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
                            checked={permissions.includes("Mass E-Mail")}
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

                {/* --------- Client --------- */}
                {defaultGroupModuleText === "Client" ? (
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
                            checked={permissions.includes("Mass E-Mail")}
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
                            checked={permissions.includes("Export to PDF")}
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
                            checked={permissions.includes("Export to Excel")}
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
                {defaultGroupModuleText === "Sales Order" ? (
                  <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2 ">
                    <h1 className="font-normal mb-2 text-xl">Sales Order</h1>
                    {/* ---------- LEAD BOXES ---------- */}
                    <div className="flex gap-12 justify-between">
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes("Edit Sales Order")}
                            onChange={() =>
                              handleCheckboxChange("Edit Sales Order")
                            }
                          />
                          <p className="text-sm font-md">Edit Sales Order</p>
                        </div>
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes("Approve Pending")}
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
                            checked={permissions.includes("Send SMS")}
                            onChange={() => handleCheckboxChange("Send SMS")}
                          />
                          <p className="text-sm font-md">Send SMS</p>
                        </div>
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes("Export to PDF")}
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
                            checked={permissions.includes("Mass Delete")}
                            onChange={() => handleCheckboxChange("Mass Delete")}
                          />
                          <p className="text-sm font-md">Mass Delete</p>
                        </div>
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes("Export to Excel")}
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
                            checked={permissions.includes("Mass E-Mail")}
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
                {defaultGroupModuleText === "Free Trail" ? (
                  <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2 ">
                    <h1 className="font-normal mb-2 text-xl">Free Trail</h1>
                    <div className="flex gap-12 justify-between">
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes("Edit Free Trail")}
                            onChange={() =>
                              handleCheckboxChange("Edit Free Trail")
                            }
                          />
                          <p className="text-sm font-md">Edit Free Trail</p>
                        </div>
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes("Export Trail")}
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
                            checked={permissions.includes("Print View")}
                            onChange={() => handleCheckboxChange("Print View")}
                          />
                          <p className="text-sm font-md">Print View</p>
                        </div>
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes("Sheet View")}
                            onChange={() => handleCheckboxChange("Sheet View")}
                          />
                          <p className="text-sm font-md">Sheet View</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes("Mass Delete")}
                            onChange={() => handleCheckboxChange("Mass Delete")}
                          />
                          <p className="text-sm font-md">Mass Delete</p>
                        </div>
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes("Mass E-Mail")}
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
                {defaultGroupModuleText === "Follow Up" ? (
                  <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2 ">
                    <h1 className="font-normal mb-2 text-xl">Follow Up</h1>
                    <div className="flex gap-12 justify-between">
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes("Edit Follow Up")}
                            onChange={() =>
                              handleCheckboxChange("Edit Follow Up")
                            }
                          />
                          <p className="text-sm font-md">Edit Follow Up</p>
                        </div>
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes("Export Follow Up")}
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
                            checked={permissions.includes("Print View")}
                            onChange={() => handleCheckboxChange("Print View")}
                          />
                          <p className="text-sm font-md">Print View</p>
                        </div>
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes("Sheet View")}
                            onChange={() => handleCheckboxChange("Sheet View")}
                          />
                          <p className="text-sm font-md">Sheet View</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes("Mass Delete")}
                            onChange={() => handleCheckboxChange("Mass Delete")}
                          />
                          <p className="text-sm font-md">Mass Delete</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes("Mass E-Mail")}
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
                {defaultGroupModuleText === "Service Box" ? (
                  <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2">
                    <h1 className="font-normal mb-2 text-xl">Service Box</h1>
                    <div className="flex items-center gap-12">
                      <div className="flex gap-3 items-center font-light">
                        <input
                          type="checkbox"
                          checked={permissions.includes("Send SMS")}
                          onChange={() => handleCheckboxChange("Send SMS")}
                        />
                        <p className="text-sm font-md">Send SMS</p>
                      </div>
                      <div className="flex gap-3 items-center font-light">
                        <input
                          type="checkbox"
                          checked={permissions.includes("Send E-Mail")}
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

                {defaultGroupModuleText === "Reports" ? (
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
                            checked={permissions.includes("Employee Report")}
                            onChange={() => {}}
                          />
                          <p className="text-sm font-md">Employee Report</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes("Monitoring")}
                            onChange={() => {}}
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
                            checked={permissions.includes("Lead Report")}
                            onChange={() => {}}
                          />
                          <p className="text-sm font-md">Lead Report</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes("Dispose Leads")}
                            onChange={() => {}}
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
                            checked={permissions.includes("Client Report")}
                            onChange={() => {}}
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
                            checked={permissions.includes("Sales Report")}
                            onChange={() => {}}
                          />
                          <p className="text-sm font-md">Sales Report</p>
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

                {/* ---------  Financial Activity --------- */}

                {defaultGroupModuleText === "Financial Activity" ? (
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
                          checked={permissions.includes("View Expenses")}
                          onChange={() => {}}
                        />
                        <p className="text-sm font-md">View Expenses</p>
                      </div>
                      {/* FIRST */}
                      <div className="flex gap-3 items-center font-light">
                        <input
                          type="checkbox"
                          checked={permissions.includes("View Brokerage")}
                          onChange={() => {}}
                        />
                        <p className="text-sm font-md">View Brokerage</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {/* ----------Settings CHECK BOXES ---------- */}
                {defaultGroupModuleText === "Settings" ? (
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
                            checked={permissions.includes("User Setting")}
                            onChange={() => {}}
                          />
                          <p className="text-sm font-md">User Setting</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes("User Operation")}
                            onChange={() => {}}
                          />
                          <p className="text-sm font-md">User Operation</p>
                        </div>
                        {/* THIRD ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes("Group")}
                            onChange={() => {}}
                          />
                          <p className="text-sm font-md">Group</p>
                        </div>
                        {/* FOURTH ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes("Department")}
                            onChange={() => {}}
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
                            checked={permissions.includes("Designation")}
                            onChange={() => {}}
                          />
                          <p className="text-sm font-md">Designation</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes("Qualification")}
                            onChange={() => {}}
                          />
                          <p className="text-sm font-md">Qualification</p>
                        </div>
                        {/* THIRD ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes("Lead Status")}
                            onChange={() => {}}
                          />
                          <p className="text-sm font-md">Lead Status</p>
                        </div>
                        {/* Fourth ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes("Pools")}
                            onChange={() => {}}
                          />
                          <p className="text-sm font-md">Pools</p>
                        </div>
                      </div>
                      {/* THIRD */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes("Segments")}
                            onChange={() => {}}
                          />
                          <p className="text-sm font-md">Segments</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes("Expense Head")}
                            onChange={() => {}}
                          />
                          <p className="text-sm font-md">Expense Head</p>
                        </div>
                        {/* THIRD ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes("SMS Setting")}
                            onChange={() => {}}
                          />
                          <p className="text-sm font-md">SMS Setting</p>
                        </div>
                        {/* Fourth ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes(
                              "Roles & Permissions"
                            )}
                            onChange={() => {}}
                          />
                          <p className="text-sm font-md">Roles & Permissions</p>
                        </div>
                      </div>
                      {/* FOURTH */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes("SMS Template")}
                            onChange={() => {}}
                          />
                          <p className="text-sm font-md">SMS Template</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes("Access Device")}
                            onChange={() => {}}
                          />
                          <p className="text-sm font-md">Access Device</p>
                        </div>
                        {/* THIRD ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            checked={permissions.includes("Access Control")}
                            onChange={() => {}}
                          />
                          <p className="text-sm font-md">Access Control</p>
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
              </div>
            </div>
            {/* BUTTONS */}
            <div className="flex justify-end px-2 gap-2">
              <button
                type="submit"
                className="px-10 py-4 mt-20 mb-3 bg-cyan-500 text-white border-2 border-cyan-500 rounded hover:text-cyan-500 hover:bg-white w-max "
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

EditPermission.propTypes = {
  onCancel: PropTypes.func.isRequired,
  permissionId: PropTypes.number,
};
