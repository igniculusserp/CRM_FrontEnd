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

  //   DROPDOWNS STATE AND THEIR OTHER FUNCTIONALITY
  const [statusDropdown, setStatusDropdown] = useState(false);
  const [defaultStatusText, setDefaultStatusText] = useState("status");

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
        config
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
    assigned_To_Role
  ) => {
    setdefaultTextassigned_ToDropDown(
      assigned_To_Username + " " + assigned_To_Role
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
        config
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

  // FLUSH DUMMY DATA
  const statusData = [
    { key: 1, name: "Ready" },
    { key: 2, name: "Not Ready" },
  ];

  // TOGGLE FLUSH
  const toggleStatusDropdown = () => {
    setStatusDropdown(!statusDropdown);
  };

  // HANDLE DROPDOWN FOR FLUSH
  const handleDropdownStatus = (status) => {
    setDefaultStatusText(status);
    setStatusDropdown(!statusDropdown);
    setEditLead((prevTask) => ({
      ...prevTask,
      status: status,
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
        config
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
          <div className="py-2 px-3 bg-cyan-500 rounded-t-xl shadow-md">
            <h1 className="font-medium rounded-t-xl text-white bg-cyan-500">
              Upload Leads Information
            </h1>
          </div>
          {/* ----- FIELDS START FROM HERE ------ */}
          <div className="bg-white px-3 py-1">
            <label
              htmlFor="file"
              className="text-sm font-medium text-gray-700 block"
            >
              Select File
            </label>
            <input
              type="file"
              name="file"
              id="file"
              placeholder="Upload"
              accept=".xls,.xlsx"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              onChange={handleFileChange} // File selection is handled here
            />
          </div>
          <div className="flex gap-3 bg-white py-2 px-3 rounded-b-xl">
            {/* FIRST SECTION */}
            <div className="flex-1 flex flex-col">
              {/* ASSIGNED TO DROPDOWN */}
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
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                  id="LeadStatusDropDown"
                  type="button"
                >
                  {editLead.assignedTo === ""
                    ? defaultTextassigned_ToDropDown
                    : editLead.assignedTo}

                  <FaAngleDown className="ml-2 text-gray-400" />
                </button>
                {isDropdownassigned_ToDropDown && (
                  <div className="absolute w-full bg-white border border-gray-300 rounded-md top-11 z-10">
                    <ul className="py-2 text-sm text-gray-700">
                      {assigned_ToDropDown.map(({ key, userName, role }) => (
                        <li
                          key={key}
                          onClick={() =>
                            handleDropdownassigned_ToDropDown(userName, role)
                          }
                          className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                        >
                          {userName}-({role})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {/* POOL DROPDOWN */}
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
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                  id="LeadStatusDropDown"
                  type="button"
                >
                  {editLead.pool === "" ? defaultTextPool : editLead.pool}
                  <FaAngleDown className="ml-2 text-gray-400" />
                </button>
                {isPoolDropdownOpen && (
                  <div className="absolute w-full bg-white border border-gray-300 rounded-md top-11 z-10">
                    {error ? (
                      <div className="py-2 text-red-600">{error}</div>
                    ) : (
                      <ul className="py-2 text-sm text-gray-700">
                        {poolToDropDown.map(({ id, poolName }) => (
                          <li
                            key={id}
                            onClick={() => handleDropdownSelection(poolName)}
                            className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
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
            {/* SECOND SECTION */}
            <div className="flex-1 flex flex-col">
              {/* STATUS DROPDOWN */}
              <label
                htmlFor="status"
                className="text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <div
                className="relative"
                onClick={toggleStatusDropdown}
                onMouseLeave={() => setStatusDropdown(false)}
              >
                <button
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                  id="LeadStatusDropDown"
                  type="button"
                >
                  {isEditMode ? editLead.status : defaultStatusText}
                  <FaAngleDown className="ml-2 text-gray-400" />
                </button>
                {statusDropdown && (
                  <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                    <ul className="py-2 text-sm text-gray-700">
                      {statusData.map(({ key, name }) => (
                        <li
                          className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                          key={key}
                          onClick={() => handleDropdownStatus(name)}
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

          {/* COLUMN NUMBER INFORMATION */}
          <div className="bg-white rounded-xl shadow-md mt-3">
            <h2 className="font-medium py-2 px-3 shadow-md rounded-t-xl text-white bg-cyan-500">
              Column Number Information
            </h2>
            <div className="flex gap-3 px-3 py-2">
              {/* FIRST SECTION */}
              <div className="flex-1 flex flex-col">
                {/* NAME COLUMN */}
                <label
                  htmlFor="nameColNum"
                  className="text-sm font-medium text-gray-700 block"
                >
                  Name Column Number
                </label>
                <input
                  type="number"
                  name="namecolumnno" // Use state property name directly
                  id="nameColNum"
                  value={editLead.namecolumnno}
                  placeholder="Enter name column"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  onChange={handleChange}
                />
                {/* MOBILE COLUMN */}
                <label
                  htmlFor="mobColNum"
                  className="text-sm font-medium text-gray-700 block"
                >
                  Mobile Column Number
                </label>
                <input
                  type="number"
                  name="mobilecolno" // Use state property name directly
                  id="mobColNum"
                  value={editLead.mobilecolno}
                  placeholder="Enter mobile column"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  onChange={handleChange}
                />
                {/* EMAIL COLUMN */}
                <label
                  htmlFor="emailColNum"
                  className="text-sm font-medium text-gray-700 block"
                >
                  Email Column Number
                </label>
                <input
                  type="number"
                  name="emailcolno" // Use state property name directly
                  id="emailColNum"
                  value={editLead.emailcolno}
                  placeholder="Enter email column"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  onChange={handleChange}
                />
                {/* CITY COLUMN */}
                <label
                  htmlFor="cityColNum"
                  className="text-sm font-medium text-gray-700 block"
                >
                  City Column Number
                </label>
                <input
                  type="number"
                  name="citycoluno" // Use state property name directly
                  id="cityColNum"
                  value={editLead.citycoluno}
                  placeholder="Enter city column"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  onChange={handleChange}
                />
              </div>
              {/* SECOND SECTION */}
              <div className="flex-1 flex flex-col">
                {/* STATE COLUMN */}
                <label
                  htmlFor="stateColNum"
                  className="text-sm font-medium text-gray-700 block"
                >
                  State Column Number
                </label>
                <input
                  type="number"
                  name="statecolno" // Use state property name directly
                  id="stateColNum"
                  value={editLead.statecolno}
                  placeholder="Enter state column"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  onChange={handleChange}
                />
                {/* OCCUPATION COLUMN */}
                <label
                  htmlFor="occupationColNum"
                  className="text-sm font-medium text-gray-700 block"
                >
                  Occupation Column Number
                </label>
                <input
                  type="number"
                  name="occupationcolno" // Use state property name directly
                  id="occupationColNum"
                  value={editLead.occupationcolno}
                  placeholder="Enter occupation column"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  onChange={handleChange}
                />
                {/* DESCRIPTION COLUMN */}
                <label
                  htmlFor="descriptionColNum"
                  className="text-sm font-medium text-gray-700 block"
                >
                  Description Column Number
                </label>
                <input
                  type="number"
                  name="descolumnno" // Use state property name directly
                  id="descriptionColNum"
                  value={editLead.descolumnno}
                  placeholder="Enter description column"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* BUTTONS */}
            <div className="flex justify-end gap-5 mr-10">
              <div className="flex justify-end mr-20">
                <button
                  type="submit"
                  className="px-32 py-4 mt-40 mb-4 bg-cyan-500 text-white hover:text-cyan-500 hover:bg-white border-2 border-cyan-500 rounded"
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
