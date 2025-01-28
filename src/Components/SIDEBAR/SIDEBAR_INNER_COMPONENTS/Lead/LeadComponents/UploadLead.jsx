import { useState, useEffect } from "react";
import axios from "axios";
import { FaAngleDown } from "react-icons/fa";

import { tenant_base_url, protocal_url } from "./../../../../../Config/config";

import { getHostnamePart } from "../../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

export default function UploadLead() {
  const name = getHostnamePart();

  const [isEditMode, setIsEditMode] = useState(false);
  const [editLead, setEditLead] = useState({
    assignedTo: "",
    pool: "",
    status: "",
    namecolumnno: "",
    mobilecolno: "",
    emailcolno: "",
    citycoluno: "",
    statecolno: "",
    occupationcolno: "",
    descolumnno: "",
    file: null,
  });

  //   HANDLING INPUTS
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditLead((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file change
  const handleFileChange = (e) => {
    setEditLead((prevData) => ({
      ...prevData,
      file: e.target.files[0],
    }));
  };

  //----------------------------------------------------------------------------------------
  //assigned_ToDropDown
  const [assigned_ToDropDown, setassigned_ToDropDown] = useState([]);

  async function handleAssigned_To() {
    const bearer_token = localStorage.getItem("token");

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Setting/Alluser`,
        config,
      );
      setassigned_ToDropDown(response.data);
      console.log("status:", response.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
      // Optionally, set an error state to display a user-friendly message
    }
  }

  useEffect(() => {
    handleAssigned_To();
  }, []);

  const [defaultTextassigned_ToDropDown, setdefaultTextassigned_ToDropDown] =
    useState("Select Assigned");
  const [isDropdownassigned_ToDropDown, setisDropdownassigned_ToDropDown] =
    useState(false);

  const toggleDropdownassigned_ToDropDown = () => {
    setisDropdownassigned_ToDropDown(!isDropdownassigned_ToDropDown);
  };

  const handleDropdownassigned_ToDropDown = (
    assigned_To_Username,
    assigned_To_Role,
  ) => {
    setdefaultTextassigned_ToDropDown(
      assigned_To_Username + " " + assigned_To_Role,
    );
    setisDropdownassigned_ToDropDown(!isDropdownassigned_ToDropDown);
    setEditLead((prevTask) => ({
      ...prevTask,
      assignedTo: assigned_To_Username,
    }));
  };

  //----------------------------------------------------------------------------------------
  //PooL_ToDropDown
  const [poolToDropDown, setPoolToDropDown] = useState([]);
  const [defaultTextPool, setDefaultTextPool] = useState("Select Pool");
  const [isPoolDropdownOpen, setIsPoolDropdownOpen] = useState(false);
  const [error, setError] = useState(null); // New error state

  const handlePool = async () => {
    const bearerToken = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    try {
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Admin/pool/getall`,
        config,
      );
      setPoolToDropDown(response.data.data);
      console.log("status:", response.data.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
      setError("Failed to fetch pools."); // Set error message
    }
  };

  useEffect(() => {
    handlePool();
  }, []);

  const toggleDropdown = () => {
    setIsPoolDropdownOpen((prev) => !prev);
    // console.log("@@@===",isPoolDropdownOpen);
  };

  const handleDropdownSelection = (poolName) => {
    setIsPoolDropdownOpen(false);
    setDefaultTextPool(poolName);
    console.log("@@@===", isPoolDropdownOpen);
    setEditLead((prev) => ({
      ...prev,
      pool: poolName,
    }));
  };

  //----------------------------------------------------------------------------------------
  //Status_ToDropDown
  const [statusToDropDown, setStatusToDropDown] = useState([]);
  const [defaultTextStatus, setDefaultTextStatus] = useState("Select Status");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [errorStatus, setStatusError] = useState(null); // New error state

  const handleStatus = async () => {
    const bearerToken = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    try {
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Admin/leadstatus/getall`,
        config,
      );
      setStatusToDropDown(response.data.data);
      console.log("status:", response.data.data);
    } catch (error) {
      console.error("Error fetching leads:", errorStatus);
      console.error("Error fetching leads:", error);
      setStatusError("Failed to fetch pools."); // Set error message
    }
  };

  useEffect(() => {
    handleStatus();
  }, []);

  const toggleStatusDropdown = () => {
    setIsStatusDropdownOpen((prev) => !prev);
  };

  const handleDropdownStatusSelection = (status) => {
    setIsStatusDropdownOpen(false);
    setDefaultTextStatus(status);
    console.log("@@@===", isStatusDropdownOpen);
    setEditLead((prev) => ({
      ...prev,
      Status: status,
    }));
  };

  //---------->handleSubmit<----------
  //two different models one for PUT and one for POST
  const handleSubmit = async (event) => {
    event.preventDefault();
    const bearer_token = localStorage.getItem("token");

    try {
      // Axios config with headers and query parameters
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
          "Content-Type": "multipart/form-data", // Correct content type for file uploads
        },
        params: {
          // Attach the query parameters
          assignedTo: editLead.assignedTo,
          pool: editLead.pool,
          status: editLead.status,
          namecolumnno: editLead.namecolumnno,
          mobilecolno: editLead.mobilecolno,
          emailcolno: editLead.emailcolno,
          citycoluno: editLead.citycoluno,
          statecolno: editLead.statecolno,
          occupationcolno: editLead.occupationcolno,
          descolumnno: editLead.descolumnno,
        },
      };

      // FormData for the file upload
      const formData_POST = new FormData();
      formData_POST.append("file", editLead.file);

      // Send POST request with file and config (query params + headers)
      await axios.post(
        `${protocal_url}${name}.${tenant_base_url}/Lead/lead/uploadmain`,
        formData_POST,
        config,
      );

      alert("Lead uploaded successfully!");
      // Save selected button to localStorage
      localStorage.setItem("selectedButton", "Leads");
      window.location.reload();
    } catch (error) {
      if (error.response) {
        console.error("Error data:", error.response.data);
      } else {
        console.error("Error:", error.message);
      }
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col overflow-x-auto overflow-y-hidden bg-gray-300">
      {/* FORM STAT FROM HERE */}
      <div className="overflow-hidden">
        {/* CREATE CONTACT FORM */}
        <form className="flex flex-col" onSubmit={handleSubmit}>
          {/* ----- HEADING ----- */}
          <div className="rounded-t-xl bg-cyan-500 px-3 py-2 shadow-md">
            <h1 className="rounded-t-xl bg-cyan-500 font-medium text-white">
              Upload Leads Information
            </h1>
          </div>
          {/* ----- FIELDS START FROM HERE ------ */}
          <div className="grid gap-2 rounded-b-xl bg-white p-2 px-3 py-2">
            {/* FIRST */}
            <div className="flex space-x-4">
              {/* FILE UPLOAD FIELD */}
              <div className="flex w-full flex-col">
                <label
                  htmlFor="file"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select File
                </label>
                <input
                  type="file"
                  name="file"
                  id="file"
                  placeholder="Upload"
                  accept=".xls,.xlsx"
                  className="mt-1 w-full rounded-md border border-gray-300 p-2"
                  onChange={handleFileChange} // File selection is handled here
                />
              </div>
            </div>
            {/* SECOND */}
            <div className="flex space-x-4">
              {/* ASSIGNED TO DROPDOWN */}
              <div className="flex w-1/2 flex-col">
                <label
                  htmlFor="leadesStatus"
                  className="text-sm font-medium text-gray-700"
                >
                  Assigned to
                </label>
                <div
                  className="relative"
                  onClick={toggleDropdownassigned_ToDropDown}
                  onMouseLeave={() => setisDropdownassigned_ToDropDown(false)}
                >
                  <button
                    className="mt-1 flex w-full items-center justify-between rounded-md border border-gray-300 p-2"
                    id="LeadStatusDropDown"
                    type="button"
                  >
                    {editLead.assignedTo === ""
                      ? defaultTextassigned_ToDropDown
                      : editLead.assignedTo}

                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {isDropdownassigned_ToDropDown && (
                    <div className="absolute top-11 z-10 w-full rounded-md border border-gray-300 bg-white">
                      <ul className="py-2 text-sm text-gray-700">
                        {assigned_ToDropDown.map(({ key, userName, role }) => (
                          <li
                            key={key}
                            onClick={() =>
                              handleDropdownassigned_ToDropDown(userName, role)
                            }
                            className="block cursor-pointer border-b px-4 py-2 hover:bg-cyan-500 hover:text-white"
                          >
                            {userName}-({role})
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              {/* POOL DROPDOWN */}
              <div className="flex w-1/2 flex-col">
                <label
                  htmlFor="Pool"
                  className="text-sm font-medium text-gray-700"
                >
                  Pool
                </label>
                <div
                  className="relative"
                  onMouseLeave={() => setIsPoolDropdownOpen(false)}
                >
                  <button
                    onClick={toggleDropdown}
                    className="mt-1 flex w-full items-center justify-between rounded-md border border-gray-300 p-2"
                    id="LeadPoolDropDown"
                    type="button"
                  >
                    {editLead.pool === "" ? defaultTextPool : editLead.pool}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {isPoolDropdownOpen && (
                    <div className="absolute top-11 z-10 w-full rounded-md border border-gray-300 bg-white">
                      {error ? (
                        <div className="py-2 text-red-600">{error}</div>
                      ) : (
                        <ul className="py-2 text-sm text-gray-700">
                          {poolToDropDown.map(({ id, poolName }) => (
                            <li
                              key={id}
                              onClick={() => handleDropdownSelection(poolName)}
                              className="block cursor-pointer border-b px-4 py-2 hover:bg-cyan-500 hover:text-white"
                            >
                              {poolName}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              {/* STATUS DROPDOWN */}
              <div className="flex w-1/2 flex-col">
                <label
                  htmlFor="Pool"
                  className="text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <div
                  className="relative"
                  onMouseLeave={() => setIsStatusDropdownOpen(false)}
                >
                  <button
                    onClick={toggleStatusDropdown}
                    className="mt-1 flex w-full items-center justify-between rounded-md border border-gray-300 p-2"
                    id="LeadStatusDropDown"
                    type="button"
                  >
                    {editLead.status === ""
                      ? defaultTextStatus
                      : editLead.status}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {isStatusDropdownOpen && (
                    <div className="absolute top-11 z-10 w-full rounded-md border border-gray-300 bg-white">
                      {errorStatus ? (
                        <div className="py-2 text-red-600">{errorStatus}</div>
                      ) : (
                        <ul className="py-2 text-sm text-gray-700">
                          {statusToDropDown.map(({ id, status }) => (
                            <li
                              key={id}
                              onClick={() =>
                                handleDropdownStatusSelection(status)
                              }
                              className="block cursor-pointer border-b px-4 py-2 hover:bg-cyan-500 hover:text-white"
                            >
                              {status}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN NUMBER INFORMATION */}
          <div className="mt-3 rounded-xl bg-white shadow-md">
            <h2 className="rounded-t-xl bg-cyan-500 px-3 py-2 font-medium text-white shadow-md">
              Column Number Information
            </h2>
            <div className="grid gap-2 px-3 py-2">
              {/* FIRST SECTION */}
              <div className="flex space-x-4">
                {/* NAME COLUMN */}
                <div className="flex w-1/2 flex-col">
                  <label
                    htmlFor="nameColNum"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name Column Number
                  </label>
                  <input
                    type="number"
                    name="namecolumnno" // Use state property name directly
                    id="nameColNum"
                    value={editLead.namecolumnno}
                    placeholder="Enter name column"
                    className="mt-1 w-full rounded-md border border-gray-300 p-2"
                    onChange={handleChange}
                  />
                </div>
                {/* MOBILE COLUMN */}
                <div className="flex w-1/2 flex-col">
                  <label
                    htmlFor="mobColNum"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mobile Column Number
                  </label>
                  <input
                    type="number"
                    name="mobilecolno" // Use state property name directly
                    id="mobColNum"
                    value={editLead.mobilecolno}
                    placeholder="Enter mobile column"
                    className="mt-1 w-full rounded-md border border-gray-300 p-2"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                {/* EMAIL COLUMN */}
                <div className="flex w-1/2 flex-col">
                  <label
                    htmlFor="emailColNum"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Column Number
                  </label>
                  <input
                    type="number"
                    name="emailcolno" // Use state property name directly
                    id="emailColNum"
                    value={editLead.emailcolno}
                    placeholder="Enter email column"
                    className="mt-1 w-full rounded-md border border-gray-300 p-2"
                    onChange={handleChange}
                  />
                </div>
                {/* CITY COLUMN */}
                <div className="flex w-1/2 flex-col">
                  <label
                    htmlFor="cityColNum"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City Column Number
                  </label>
                  <input
                    type="number"
                    name="citycoluno" // Use state property name directly
                    id="cityColNum"
                    value={editLead.citycoluno}
                    placeholder="Enter city column"
                    className="mt-1 w-full rounded-md border border-gray-300 p-2"
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* SECOND SECTION */}
              <div className="flex space-x-4">
                {/* STATE COLUMN */}
                <div className="flex w-1/2 flex-col">
                  <label
                    htmlFor="stateColNum"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State Column Number
                  </label>
                  <input
                    type="number"
                    name="statecolno" // Use state property name directly
                    id="stateColNum"
                    value={editLead.statecolno}
                    placeholder="Enter state column"
                    className="mt-1 w-full rounded-md border border-gray-300 p-2"
                    onChange={handleChange}
                  />
                </div>
                {/* OCCUPATION COLUMN */}
                <div className="flex w-1/2 flex-col">
                  <label
                    htmlFor="occupationColNum"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Occupation Column Number
                  </label>
                  <input
                    type="number"
                    name="occupationcolno" // Use state property name directly
                    id="occupationColNum"
                    value={editLead.occupationcolno}
                    placeholder="Enter occupation column"
                    className="mt-1 w-full rounded-md border border-gray-300 p-2"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                {/* DESCRIPTION COLUMN */}
                <div className="flex w-1/2 flex-col">
                  <label
                    htmlFor="descriptionColNum"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description Column Number
                  </label>
                  <input
                    type="number"
                    name="descolumnno" // Use state property name directly
                    id="descriptionColNum"
                    value={editLead.descolumnno}
                    placeholder="Enter description column"
                    className="mt-1 w-full rounded-md border border-gray-300 p-2"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            {/* BUTTONS */}
            <div className="flex justify-end gap-5">
              <div className="mr-5 flex justify-end">
                <button
                  type="submit"
                  className="mb-4 mt-20 rounded border-2 border-cyan-500 bg-cyan-500 px-32 py-4 text-white hover:bg-white hover:text-cyan-500"
                >
                  {isEditMode ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
