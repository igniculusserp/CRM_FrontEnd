import { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import axios from "axios";
import PropTypes from "prop-types";

//----------------- MUI Imports --------------------
import { Grid, Checkbox, FormControlLabel, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { tenant_base_url, protocal_url } from "./../../../../../Config/config";

import { getHostnamePart } from "../../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

import { ToastContainer } from "react-toastify";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../../utils/toastNotifications";

export default function AddPermission({ onCancel }) {
  const name = getHostnamePart();

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

  const [selectedPermissions, setSelectedPermissions] = useState({});


  const handleCheckboxChange = (module, permission) => {
    setSelectedPermissions((prev) => {
      const updatedModule = prev[module] ? [...prev[module]] : [];
  
      if (updatedModule.includes(permission)) {
        return {
          ...prev,
          [module]: updatedModule.filter((perm) => perm !== permission),
        };
      } else {
        return {
          ...prev,
          [module]: [...updatedModule, permission],
        };
      }
    });
  };
  

  // Log updated permissions whenever they change
  useEffect(() => {
    console.log("Updated permissions: ", selectedPermissions);
  }, [selectedPermissions]);

  //------------------------------------------------Handle Submit---------------------------------------------------
  const handleSubmit = async (event) => {
    event.preventDefault();
    const bearer_token = localStorage.getItem("token");
    let success = false; // Flag to check if at least one request was successful
  
    // Convert selectedPermissions object into an array of modules
    const payload = Object.keys(selectedPermissions).map((module) => ({
      groupName: defaultTextLeadStatusDropDown,
      moduleName: module,
      permissions: selectedPermissions[module],
      createdDate: null,
      updatedDate: null,
      lastModifiedBy: null,
    }));
  
    console.log("Payload before sending:", payload);
  
    const config = {
      headers: {
        Authorization: `Bearer ${bearer_token}`,
        "Content-Type": "application/json",
      },
    };
  
    try {
      for (const item of payload) {
        console.log("Sending Payload:", JSON.stringify(item, null, 2));
  
        const response = await axios.post(
          `${protocal_url}${name}.${tenant_base_url}/Security/rolesandpermissions/add`,
          item,
          config
        );
  
        console.log("Response:", response.data);
  
        if (response.data.isSuccess) {
          success = true; // Set success flag if at least one request succeeds
        }
      }
  
      // Show success toast only once if at least one request was successful
      if (success) {
        showSuccessToast("Permission added successfully!");
        
        // Close the modal after all requests are completed
        setTimeout(() => {
          onCancel();
        }, 1500);
      }
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
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
                  {/* ---------- DROPDOWN END ---------- */}
                  
                </div>
                {/* ----------Lead CHECK BOXES ---------- */}
                  <div className="mt-2 w-full rounded-sm bg-white  shadow-md">
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                      >
                        <Typography component="span">
                          <h1 className="text-xl font-normal">Leads</h1>
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {/* ---------- LEAD BOXES ---------- */}
                        <div className="flex justify-between gap-12">
                          {/* FIRST */}
                          <div className="flex flex-col gap-3">
                            {/* FIRST ROW */}
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                id="create-lead"
                                onChange={() =>
                                  handleCheckboxChange("Leads","Create Lead")
                                }
                              />
                              <p className="font-md text-sm">Create Lead</p>
                            </div>
                            {/* SECOND ITEM */}
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Leads","Upload Leads")
                                }
                              />
                              <p className="font-md text-sm">Upload Leads</p>
                            </div>
                            {/* THIRD ITEM */}
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Leads","Lead Operation")
                                }
                              />
                              <p className="font-md text-sm">Lead operation</p>
                            </div>
                            {/* FOURTH ITEM */}
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Leads","Lead Action")
                                }
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
                                onChange={() =>
                                  handleCheckboxChange("Leads","View Leads")
                                }
                              />
                              <p className="font-md text-sm">View Leads</p>
                            </div>
                            {/* SECOND ITEM */}
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Leads","Fetch Leads")
                                }
                              />
                              <p className="font-md text-sm">Fetch Leads</p>
                            </div>
                            {/* THIRD ITEM */}
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Leads","Edit Lead")
                                }
                              />
                              <p className="font-md text-sm">Edit Lead</p>
                            </div>
                            {/* Fourth ITEM */}
                            {/* <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Leads","Mass Delete")
                                }
                              />
                              <p className="font-md text-sm">Mass Delete</p>
                            </div> */}
                          </div>
                          {/* THIRD */}
                          <div className="flex flex-col gap-3">
                            {/* FIRST ROW */}
                            {/* <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Leads","Approve Leads")
                                }
                              />
                              <p className="font-md text-sm">Approve Leads</p>
                            </div> */}
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Leads","Mass Delete")
                                }
                              />
                              <p className="font-md text-sm">Mass Delete</p>
                            </div>
                            {/* SECOND ITEM */}
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Leads","Export to Excel")
                                }
                              />
                              <p className="font-md text-sm">Export to Excel</p>
                            </div>
                            {/* THIRD ITEM */}
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Leads","Export to PDF")
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
                                  handleCheckboxChange(
                                    "Leads","Convert Lead to Contact",
                                  )
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
                                  handleCheckboxChange("Leads","Create Sales Order")
                                }
                              />
                              <p className="font-md text-sm">
                                Create sales order
                              </p>
                            </div>
                            {/* THIRD ITEM */}
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Leads","Mass E-Mail")
                                }
                              />
                              <p className="font-md text-sm">Mass E-Mail</p>
                            </div>
                          </div>
                          {/* FIFTH */}
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </div>

                {/* --------- CONTACT --------- */}
                  <div className="mt-2 w-full rounded-sm bg-white  shadow-md">
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                      >
                        <Typography component="span">
                          <h1 className="text-xl font-normal">Contacts</h1>
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {/* ---------- Contacts BOXES ---------- */}
                        <div className="flex justify-between gap-12">
                          {/* FIRST */}
                          <div className="flex flex-col gap-3">
                            {/* FIRST ROW */}
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Contacts","Create Sales order")
                                }
                              />
                              <p className="font-md text-sm">
                                Create Sales order
                              </p>
                            </div>
                            {/* SECOND ITEM */}
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Contacts","Edit Contact")
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
                                  handleCheckboxChange("Contacts","View Contacts")
                                }
                              />
                              <p className="font-md text-sm">View Contacts</p>
                            </div>
                            {/* SECOND ITEM */}
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Contacts","Export to PDF")
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
                                  handleCheckboxChange("Contacts","Mass Delete")
                                }
                              />
                              <p className="font-md text-sm">Mass Delete</p>
                            </div>
                            {/* SECOND ITEM */}
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Contacts","Export to Excel")
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
                                onChange={() =>
                                  handleCheckboxChange("Contacts","Mass E-Mail")
                                }
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
                      </AccordionDetails>
                    </Accordion>
                  </div>

                {/* --------- Client  --------- */}
                  <div className="mt-2 w-full rounded-sm bg-white  shadow-md">
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4-content"
                        id="panel4-header"
                      >
                        <Typography component="span">
                          <h1 className="text-xl font-normal">Client</h1>
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {/* ---------- Client BOXES ---------- */}
                        <div className="flex justify-between gap-12">
                          {/* FIRST */}
                          <div className="flex flex-col gap-3">
                            {/* FIRST ROW */}
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Client","Mass E-Mail")
                                }
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
                                  handleCheckboxChange("Client","Export to PDF")
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
                                  handleCheckboxChange("Client","Export to Excel")
                                }
                              />
                              <p className="font-md text-sm">Export to Excel</p>
                            </div>
                          </div>
                          {/* Fourth */}
                          <div className="flex flex-col gap-3">
                            {/* FIRST ROW */}
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Client","View Contact")
                                }
                              />
                              <p className="font-md text-sm">View Contact</p>
                            </div>
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </div>

                {/* --------- SO --------- */}
                  <div className="mt-2 w-full rounded-sm bg-white  shadow-md">
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel5-content"
                        id="panel5-header"
                      >
                        <Typography component="span">
                          <h1 className="text-xl font-normal">Sales Order</h1>
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {/* ---------- Sales Order BOXES ---------- */}
                        <div className="flex justify-between gap-12">
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Sales Order","Edit Sales Order")
                                }
                              />
                              <p className="font-md text-sm">
                                Edit Sales Order
                              </p>
                            </div>
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Sales Order","Approve Pending")
                                }
                              />
                              <p className="font-md text-sm">Approve Pending</p>
                            </div>
                          </div>
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Sales Order","Send SMS")
                                }
                              />
                              <p className="font-md text-sm">Send SMS</p>
                            </div>
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Sales Order","Export to PDF")
                                }
                              />
                              <p className="font-md text-sm">Export to PDF</p>
                            </div>
                          </div>
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Sales Order","Mass Delete")
                                }
                              />
                              <p className="font-md text-sm">Mass Delete</p>
                            </div>
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Sales Order","Export to Excel")
                                }
                              />
                              <p className="font-md text-sm">Export to Excel</p>
                            </div>
                          </div>
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Sales Order","Mass E-Mail")
                                }
                              />
                              <p className="font-md text-sm">Mass E-Mail</p>
                            </div>
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </div>

                {/* --------- Free Trail --------- */}
                  <div className="mt-2 w-full rounded-sm bg-white  shadow-md">
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel6-content"
                        id="panel6-header"
                      >
                        <Typography component="span">
                          <h1 className="text-xl font-normal">Free Trail</h1>
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {/* ---------- Free Trail BOXES ---------- */}
                        <div className="flex justify-between gap-12">
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Free Trail","Edit Free Trail")
                                }
                              />
                              <p className="font-md text-sm">Edit Free Trail</p>
                            </div>
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Free Trail","Export Trail")
                                }
                              />
                              <p className="font-md text-sm">Export Trail</p>
                            </div>
                          </div>
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Free Trail","Export To PDF")
                                }
                              />
                              <p className="font-md text-sm">Export To PDF</p>
                            </div>
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Free Trail","Export To Excel")
                                }
                              />
                              <p className="font-md text-sm">Export To Excel</p>
                            </div>
                          </div>
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Free Trail","Mass Delete")
                                }
                              />
                              <p className="font-md text-sm">Mass Delete</p>
                            </div>
                          </div>
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Free Trail","Mass E-Mail")
                                }
                              />
                              <p className="font-md text-sm">Mass E-Mail</p>
                            </div>
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </div>

                {/* --------- Follow Up --------- */}
                  <div className="mt-2 w-full rounded-sm bg-white  shadow-md">
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel7-content"
                        id="panel7-header"
                      >
                        <Typography component="span">
                          <h1 className="text-xl font-normal">Follow Up</h1>
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {/* ---------- Follow Up BOXES ---------- */}
                        <div className="flex justify-between gap-12">
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Follow Up","Edit Follow Up")
                                }
                              />
                              <p className="font-md text-sm">Edit Follow Up</p>
                            </div>
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Follow Up","Export Follow Up")
                                }
                              />
                              <p className="font-md text-sm">
                                Export Follow Up
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Follow Up","Export To PDF")
                                }
                              />
                              <p className="font-md text-sm">Export To PDF</p>
                            </div>
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Follow Up","Export To Excel")
                                }
                              />
                              <p className="font-md text-sm">Export To Excel</p>
                            </div>
                          </div>
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Follow Up","Mass Delete")
                                }
                              />
                              <p className="font-md text-sm">Mass Delete</p>
                            </div>
                          </div>
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Follow Up","Mass E-Mail")
                                }
                              />
                              <p className="font-md text-sm">Mass E-Mail</p>
                            </div>
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </div>

                {/* --------- SMS Box --------- */}
                  <div className="mt-2 w-full rounded-sm bg-white  shadow-md">
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel-8content"
                        id="panel8-header"
                      >
                        <Typography component="span">
                          <h1 className="text-xl font-normal">Service Box</h1>
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {/* ---------- Service Box BOXES ---------- */}
                        <div className="flex items-center gap-12">
                          <div className="flex items-center gap-3 font-light">
                            <input
                              type="checkbox"
                              onChange={() => handleCheckboxChange("Service Box","Send SMS")}
                            />
                            <p className="font-md text-sm">Send SMS</p>
                          </div>
                          <div className="flex items-center gap-3 font-light">
                            <input
                              type="checkbox"
                              onChange={() =>
                                handleCheckboxChange("Service Box","Send E-Mail")
                              }
                            />
                            <p className="font-md text-sm">Send E-Mail</p>
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </div>

                {/* --------- Reports --------- */}
                  <div className="mt-2 w-full rounded-sm bg-white  shadow-md">
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel9-content"
                        id="panel9-header"
                      >
                        <Typography component="span">
                          <h1 className="text-xl font-normal">Reports</h1>
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {/* ---------- Reports BOXES ---------- */}
                        <div className="flex justify-between gap-12">
                          {/* FIRST */}
                          <div className="flex flex-col gap-3">
                            {/* FIRST ROW */}
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Reports","Employee Report")
                                }
                              />
                              <p className="font-md text-sm">Employee Report</p>
                            </div>
                            {/* SECOND ITEM */}
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Reports","Monitoring")
                                }
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
                                onChange={() =>
                                  handleCheckboxChange("Reports","Lead Report")
                                }
                              />
                              <p className="font-md text-sm">Lead Report</p>
                            </div>
                            {/* SECOND ITEM */}
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Reports","Dispose Leads")
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
                                  handleCheckboxChange("Reports","Client Report")
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
                                  handleCheckboxChange("Reports","Sales Report")
                                }
                              />
                              <p className="font-md text-sm">Sales Report</p>
                            </div>
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </div>

                {/* ---------  Financial Activity --------- */}
                  <div className="mt-2 w-full rounded-sm bg-white  shadow-md">
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel10-content"
                        id="panel10-header"
                      >
                        <Typography component="span">
                          <h1 className="text-xl font-normal">
                            {" "}
                            Financial Activity
                          </h1>
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {/* ----------  Financial Activity BOXES ---------- */}
                        {/* CONTACT CHECKBOXES */}
                        <div className="flex items-center gap-12">
                          {/* FIRST */}
                          <div className="flex items-center gap-3 font-light">
                            <input
                              type="checkbox"
                              onChange={() =>
                                handleCheckboxChange("Financial Activity","View Expenses")
                              }
                            />
                            <p className="font-md text-sm">View Expenses</p>
                          </div>
                          {/* SECOND */}
                          <div className="flex items-center gap-3 font-light">
                            <input
                              type="checkbox"
                              onChange={() =>
                                handleCheckboxChange("Financial Activity","View Brokerage")
                              }
                            />
                            <p className="font-md text-sm">View Brokerage</p>
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </div>

                {/* ----------Settings CHECK BOXES ---------- */}
                  <div className="mt-2 w-full rounded-sm bg-white  shadow-md">
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography component="span">
                          <h1 className="text-xl font-normal">Settings</h1>
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {/* ---------- Settings BOXES ---------- */}
                        <div className="flex justify-between gap-12">
                          {/* FIRST */}
                          <div className="flex flex-col gap-3">
                            {/* FIRST ROW */}
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Settings","User Setting")
                                }
                              />
                              <p className="font-md text-sm">User Setting</p>
                            </div>
                            {/* SECOND ITEM */}
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Settings","User Operation")
                                }
                              />
                              <p className="font-md text-sm">User Operation</p>
                            </div>
                            {/* THIRD ITEM */}
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange("Settings","Group")}
                              />
                              <p className="font-md text-sm">Group</p>
                            </div>
                            {/* FOURTH ITEM */}
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Settings","Department")
                                }
                              />
                              <p className="font-md text-sm">Department</p>
                            </div>
                          </div>
                           {/* FIFTH ITEM */}
                           <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Settings","Roles & Permissions")
                                }
                              />
                              <p className="font-md text-sm">
                                Roles & Permissions
                              </p>
                            </div>
                          {/* SECOND */}
                          <div className="flex flex-col gap-3">
                            {/* FIRST ROW */}
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Settings","Designation")
                                }
                              />
                              <p className="font-md text-sm">Designation</p>
                            </div>
                            {/* SECOND ITEM */}
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Settings","Qualification")
                                }
                              />
                              <p className="font-md text-sm">Qualification</p>
                            </div>
                            {/* THIRD ITEM */}
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Settings","Lead Status")
                                }
                              />
                              <p className="font-md text-sm">Lead Status</p>
                            </div>
                            {/* FOURTH ITEM */}
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange("Settings","Pools")}
                              />
                              <p className="font-md text-sm">Pools</p>
                            </div>
                           
                          </div>
                          {/* THIRD */}
                          <div className="flex flex-col gap-3">
                            {/* FIRST ROW */}
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Settings","Segments")
                                }
                              />
                              <p className="font-md text-sm">Segments</p>
                            </div>
                            {/* SECOND ITEM */}
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Settings","Expense Head")
                                }
                              />
                              <p className="font-md text-sm">Expense Head</p>
                            </div>
                            {/* THIRD ITEM */}
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Settings","SMS Setting")
                                }
                              />
                              <p className="font-md text-sm">SMS Setting</p>
                            </div>
                            {/* FOURTH ITEM */}
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Settings","E-Mail Template")
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
                                  handleCheckboxChange("Settings","SMS Template")
                                }
                              />
                              <p className="font-md text-sm">SMS Template</p>
                            </div>
                            {/* SECOND ITEM */}
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Settings","Access Device")
                                }
                              />
                              <p className="font-md text-sm">Access Device</p>
                            </div>
                            {/* THIRD ITEM */}
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Settings","Access Control")
                                }
                              />
                              <p className="font-md text-sm">Access Control</p>
                            </div>
                            {/* Fourth ITEM */}
                            <div className="flex items-center gap-3 font-light">
                              <input
                                type="checkbox"
                                onChange={() =>
                                  handleCheckboxChange("Settings","E-Mail Setting")
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
                      </AccordionDetails>
                    </Accordion>
                  </div>
              </div>
            </div>
            {/* BUTTONS */}
            <div className="flex justify-end gap-2 px-2">
              <button
                type="submit"
                className="mb-3 mt-20 w-max rounded border-2 border-cyan-500 bg-cyan-500 px-10 py-4 text-white hover:bg-white hover:text-cyan-500 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:text-gray-500"
                disabled={
                  !(
                    selectedPermissions.length !== 0 &&  
                    defaultTextLeadStatusDropDown !== "Select Group Name"
                  )
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
