//react
import { useState, useEffect } from "react";

//external Packages
import axios from "axios";

//reactIcon
import { FaAngleDown } from "react-icons/fa";
import { RiFileUploadLine } from "react-icons/ri";

//url
import { getHostnamePart } from "../../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";
import { tenant_base_url, protocal_url } from "./../../../../../Config/config";

//-----------------------------ToastContainer-----------------------------
import { ToastContainer } from "react-toastify";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../../utils/toastNotifications";

//dropDown --->>> customHooks
import useManagedBy from "../../../../../Hooks/ManagedBy/useManagedBy";
import useLeadSource from "../../../../../Hooks/LeadSource/useLeadSource";
import useLeadStatus from "../../../../../Hooks/LeadStatus/useLeadStatus";

export default function UploadLead() {
  //IMP used as ${name} in an API
  const name = getHostnamePart();

  //const bearer_token for API Config
  const bearer_token = localStorage.getItem("token");

  // Custom Hook
  const { managedBy } = useManagedBy();
  const { leadSource } = useLeadSource();
  const { leadStatus } = useLeadStatus();

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

  //HANDLING INPUTS
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditLead((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //Handle file change
  const handleFileChange = (e) => {
    setEditLead((prevData) => ({
      ...prevData,
      file: e.target.files[0],
    }));
  };

  //----------------------------------------------------------------------------------------
  //assigned_ToDropDown->managed BY
  const [defaultTextassigned_ToDropDown, setdefaultTextassigned_ToDropDown] =
    useState("Select Managed By: ");

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
  const [defaultTextPool, setDefaultTextPool] = useState("Select Pool");

  const [isPoolDropdownOpen, setIsPoolDropdownOpen] = useState(false);
  const [error, setError] = useState(null); // New error state

  const toggleDropdown = () => {
    setIsPoolDropdownOpen((prev) => !prev);
  };

  const handleDropdownSelection = (poolName) => {
    setIsPoolDropdownOpen(false);
    setDefaultTextPool(poolName);
    setEditLead((prev) => ({
      ...prev,
      pool: poolName,
    }));
  };

  //----------------------------------------------------------------------------------------
  //Status_ToDropDown

  const [defaultTextStatus, setDefaultTextStatus] = useState("Select Status");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [errorStatus, setStatusError] = useState(null); // New error state

  const toggleStatusDropdown = () => {
    setIsStatusDropdownOpen((prev) => !prev);
  };

  const handleDropdownStatusSelection = (status) => {
    setIsStatusDropdownOpen(false);
    setDefaultTextStatus(status);
    setEditLead((prev) => ({
      ...prev,
      Status: status,
    }));
  };

  //---------->handleSubmit<----------
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
          "Content-Type": "multipart/form-data",
        },
        params: {
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

      showSuccessToast("Lead uploaded successfully!");
      localStorage.setItem("selectedButton", "Leads");
      window.location.reload();
    } catch (error) {
      if (error.response) {
        console.error("Error data:", error.response.data);
      } else {
        console.error("Error:", error.message);
      }
      showErrorToast("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      {/* ------------------------------------------------> Parent <------------------------------------------------ */}
      <div className="mt-3">
        {/* ------------------------------------------------> Heading  <------------------------------------------------ */}
        <div className="flex justify-between p-3 mx-3 bg-white border rounded">
          {/* ------------------------------------------------> Text   <------------------------------------------------ */}
          <div className="flex items-center justify-center gap-3">
            <RiFileUploadLine size={25} />
            <h1 className="text-xl">Upload Leads Information</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex mb-6">
          {/* ----- FIELDS START FROM HERE ------ */}
          <div className="w-screen">
            <div className="m-3 bg-white shadow-md rounded-xl">
              <h2 className="px-4 py-2 font-medium text-white rounded-t-xl bg-cyan-500">
                Lead Information
              </h2>
              <div className="p-2 space-y-3">
                {/* ------------------------------------1------------------------------------- */}
                {/* -------------SUB -> Parent -> <FILE UPLOAD FIELD >------------- */}
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-1 sm:gap-4">
                  {/* FILE UPLOAD FIELD */}
                  <div className="relative flex flex-col">
                    <label
                      htmlFor="file"
                      className="text-sm font-medium text-gray-700"
                    >
                      Select File
                    </label>
                    <input
                      type="file"
                      name="file"
                      id="file"
                      placeholder="Upload"
                      accept=".xls,.xlsx"
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                      onChange={handleFileChange} // File selection is handled here
                    />
                  </div>
                </div>

                {/* SECOND */}
                {/* ------------------------------------2------------------------------------- */}
                {/* -------------SUB -> Parent -> <Managed by && Pool>------------- */}
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
                  {/* -------------Managed by------------- */}
                  <div className="relative flex flex-col">
                    <label
                      htmlFor="leadesStatus"
                      className="text-sm font-medium text-gray-700"
                    >
                      Managed by
                    </label>
                    <div
                      className="relative"
                      onClick={toggleDropdownassigned_ToDropDown}
                      onMouseLeave={() =>
                        setisDropdownassigned_ToDropDown(false)
                      }
                    >
                      <button
                        className="flex items-center justify-between w-full p-2 mt-1 border border-gray-300 rounded-md"
                        id="LeadStatusDropDown"
                        type="button"
                      >
                        {editLead.assignedTo === ""
                          ? defaultTextassigned_ToDropDown
                          : editLead.assignedTo}

                        <FaAngleDown className="ml-2 text-gray-400" />
                      </button>
                      {isDropdownassigned_ToDropDown && (
                        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md top-10">
                          <ul className="py-2 text-sm text-gray-700">
                            {managedBy.map(({ userName, role }, index) => (
                              <li
                                key={index}
                                onClick={() =>
                                  handleDropdownassigned_ToDropDown(
                                    userName,
                                    role,
                                  )
                                }
                                className="flex items-center px-4 py-2 border-b cursor-pointer hover:bg-cyan-500 hover:text-white"
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
                  <div className="relative flex flex-col">
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
                        className="flex items-center justify-between w-full p-2 mt-1 border border-gray-300 rounded-md"
                        id="LeadPoolDropDown"
                        type="button"
                      >
                        {editLead.pool === "" ? defaultTextPool : editLead.pool}
                        <FaAngleDown className="ml-2 text-gray-400" />
                      </button>
                      {isPoolDropdownOpen && (
                        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md top-11">
                          {error ? (
                            <div className="py-2 text-red-600">{error}</div>
                          ) : (
                            <ul className="py-2 text-sm text-gray-700">
                              {leadSource.map(({ key, poolName }) => (
                                <li
                                  key={key}
                                  onClick={() =>
                                    handleDropdownSelection(poolName)
                                  }
                                  className="block px-4 py-2 border-b cursor-pointer hover:bg-cyan-500 hover:text-white"
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

                {/* -------------Lead Status------------- */}
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
                  <div className="relative flex flex-col">
                    <label
                      htmlFor="Pool"
                      className="text-sm font-medium text-gray-700"
                    >
                      Lead Status
                    </label>
                    <div
                      className="relative"
                      onMouseLeave={() => setIsStatusDropdownOpen(false)}
                    >
                      <button
                        onClick={toggleStatusDropdown}
                        className="flex items-center justify-between w-full p-2 mt-1 border border-gray-300 rounded-md"
                        id="LeadStatusDropDown"
                        type="button"
                      >
                        {editLead.status === ""
                          ? defaultTextStatus
                          : editLead.status}
                        <FaAngleDown className="ml-2 text-gray-400" />
                      </button>
                      {isStatusDropdownOpen && (
                        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md top-11">
                          {errorStatus ? (
                            <div className="py-2 text-red-600">
                              {errorStatus}
                            </div>
                          ) : (
                            <ul className="py-2 text-sm text-gray-700">
                              {leadStatus.map(({ id, status }) => (
                                <li
                                  key={id}
                                  onClick={() =>
                                    handleDropdownStatusSelection(status)
                                  }
                                  className="block px-4 py-2 border-b cursor-pointer hover:bg-cyan-500 hover:text-white"
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
            </div>

            {/* ------------------------------------------------>TAB  2 : COLUMN NUMBER INFORMATION  TAB <------------------------------------------------ */}
            <div className="m-3 bg-white shadow-md rounded-xl">
              <h2 className="px-4 py-2 font-medium text-white rounded-t-xl bg-cyan-500">
                Column Information
              </h2>
              {/* -------------Parent <COLUMN NUMBER INFORMATIONs>------------- */}
              <div className="p-2 space-y-3">
                {/* ------------------------------------1------------------------------------- */}
                {/* -------------SUB -> Parent -> <Name Column Number && Mobile Column Number>------------- */}
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
                  {/* -------------Name Column Number------------- */}
                  <div className="relative flex flex-col">
                    <label
                      htmlFor="nameColNum"
                      className="text-sm font-medium text-gray-700"
                    >
                      Name Column Number
                    </label>
                    <input
                      type="number"
                      name="namecolumnno" // Use state property name directly
                      id="nameColNum"
                      value={editLead.namecolumnno}
                      placeholder="Enter name column"
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                      onChange={handleChange}
                    />
                  </div>

                  {/* -------------MOBILE Column Number------------- */}
                  <div className="relative flex flex-col">
                    <label
                      htmlFor="mobColNum"
                      className="text-sm font-medium text-gray-700"
                    >
                      Mobile Column Number
                    </label>
                    <input
                      type="number"
                      name="mobilecolno" // Use state property name directly
                      id="mobColNum"
                      value={editLead.mobilecolno}
                      placeholder="Enter mobile column"
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* ------------------------------------2------------------------------------- */}
                {/* -------------SUB -> Parent -> <Email Column Number && City Column Number>------------- */}
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
                  {/* -------------Email Column Number------------- */}
                  <div className="relative flex flex-col">
                    <label
                      htmlFor="emailColNum"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email Column Number
                    </label>
                    <input
                      type="number"
                      name="emailcolno" // Use state property name directly
                      id="emailColNum"
                      value={editLead.emailcolno}
                      placeholder="Enter email column"
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                      onChange={handleChange}
                    />
                  </div>
                  {/* -------------CITY Column Number------------- */}
                  <div className="relative flex flex-col">
                    <label
                      htmlFor="cityColNum"
                      className="text-sm font-medium text-gray-700"
                    >
                      City Column Number
                    </label>
                    <input
                      type="number"
                      name="citycoluno"
                      id="cityColNum"
                      value={editLead.citycoluno}
                      placeholder="Enter city column"
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* ------------------------------------3------------------------------------- */}
                {/* -------------SUB -> Parent -> <State Column Number && Occupation Column Number>------------- */}
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
                  {/* -------------State Column Number------------- */}
                  <div className="relative flex flex-col">
                    <label
                      htmlFor="stateColNum"
                      className="text-sm font-medium text-gray-700"
                    >
                      State Column Number
                    </label>
                    <input
                      type="number"
                      name="statecolno" // Use state property name directly
                      id="stateColNum"
                      value={editLead.statecolno}
                      placeholder="Enter state column"
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                      onChange={handleChange}
                    />
                  </div>
                  {/* OCCUPATION COLUMN */}
                  <div className="relative flex flex-col">
                    <label
                      htmlFor="occupationColNum"
                      className="text-sm font-medium text-gray-700"
                    >
                      Occupation Column Number
                    </label>
                    <input
                      type="number"
                      name="occupationcolno" // Use state property name directly
                      id="occupationColNum"
                      value={editLead.occupationcolno}
                      placeholder="Enter occupation column"
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* ------------------------------------4------------------------------------- */}
                {/* -------------SUB -> Parent -> <Description Column Number>------------- */}
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
                  {/* -------------Description Column Number------------- */}
                  <div className="relative flex flex-col">
                    <label
                      htmlFor="riskCapcity"
                      className="text-sm font-medium text-gray-700"
                    >
                      Description Column Number
                    </label>
                    <input
                      type="number"
                      name="descolumnno"
                      id="descriptionColNum"
                      value={editLead.descolumnno}
                      placeholder="Enter description column"
                      className="p-2 mt-1 border border-gray-300 rounded-md"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              {/* BUTTONS */}

              <div className="flex justify-end px-2">
                <button
                  type="submit"
                  className="w-full py-4 mt-24 mb-2 text-white border-2 rounded border-cyan-500 bg-cyan-500 px-36 hover:bg-white hover:text-cyan-500 sm:me-10 sm:w-1/3"
                >
                  {isEditMode ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
