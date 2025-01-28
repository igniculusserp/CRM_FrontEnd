// REACT - INBUILD
import { useState, useEffect } from "react";
// REACT - ICONS
import { FaAngleDown } from "react-icons/fa";
// REACT - QUILL
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
//reactPackages
import { Link, useNavigate, useParams } from "react-router-dom";
//external Packages
import axios from "axios";
//file
import { tenant_base_url, protocal_url } from "../../../../../Config/config";

const CreateVoice = () => {
  //to make id unique
  const { id } = useParams();
  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);
  const [editVoice, setEditVoice] = useState({
    id: "",
    leadNo: "",
    clientName: "",
    disposition: "",
    employeeName: "",
    callDateTime: "",
    source: "",
    duration: "",
    type: "",
    status: "",
    uniqueId: "",
  });

  //----------------------------------------------------------------------------------------
  //to make code for particluar company
  const fullURL = window.location.href;
  const url = new URL(fullURL);
  const name = url.hostname.split(".")[0];

  useEffect(() => {
    handleMonitorVoiceBox(); // Fetch lead data for editing
  }, [id]);

  //GET by ID---------------------------//GET---------------------------//GET---------------------------by ID-----------by ID
  async function handleMonitorVoiceBox() {
    const bearer_token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/VoiceBox/getbyid/${id}`,
        config,
      );
      const data = response.data.data;
      console.log("@@@@===", response.data.data);
      setEditVoice({
        id: data.id || "",
        leadNo: data.leadNo || "",
        clientName: data.clientName || "",
        disposition: data.disposition || "",
        employeeName: data.employeeName || "",
        callDateTime: data.callDateTime || "",
        source: data.source || "",
        duration: data.duration || "",
        type: data.type || "",
        status: data.status || "",
        uniqueId: data.uniqueId || "",
      });
    } catch (error) {
      console.error("Error fetching Trail:", error);
    }
  }

  const [typeDropdown, setTypeDropdown] = useState(false);
  const [defaultTypeDropdownText, setDefaultTypeDropdownText] =
    useState("Type");
  const [statusDropdown, setStatusDropdown] = useState(false);
  const [defaultStatusText, setDefaultStatusText] = useState("Status");

  //   TOGGLE TYPE DORPDOWN
  const toggleTypeDropdown = () => {
    setTypeDropdown(!typeDropdown);
  };

  // HANDLE DROPDOWN FOR TYPE
  const handleDropdownType = (type) => {
    setDefaultTypeDropdownText(type);
    setTypeDropdown(!typeDropdown);
    setEditVoice((prevTask) => ({
      ...prevTask,
      type: type,
    }));
  };

  //   TOGGLE STATUS DORPDOWN
  const toggleStatusDropdown = () => {
    setStatusDropdown(!statusDropdown);
  };

  // HANDLE DROPDOWN FOR STATUS
  const handleDropdownStatus = (status) => {
    setDefaultStatusText(status);
    setStatusDropdown(!statusDropdown);
    setEditVoice((prevTask) => ({
      ...prevTask,
      status: status,
    }));
  };

  // HANDLING MULTIPLE INPUTS
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditVoice((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  //   TYPE DATA
  const typeData = [
    { key: 1, value: "Incoming" },
    { key: 2, value: "Outgoing" },
    { key: 3, value: "Missed" },
  ];

  //   STATUS DATA
  const statusData = [
    { key: 1, value: "Not Answer" },
    { key: 2, value: "Answer" },
  ];

  //---------->handleSubmit<----------
  //two different models one for PUT and one for POST
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {};

    // VALIDATION
    if (!editVoice.leadNo || isNaN(editVoice.leadNo)) {
      errors.leadNumber = "Lead number is required";
    } else if (
      !editVoice.employeeName ||
      editVoice.employeeName.trim() === ""
    ) {
      errors.empName = "Employee Name is required";
    } else if (!editVoice.uniqueId) {
      errors.uId = "Enter Unique Id";
    } else if (editVoice.type || editVoice.type.trim() === "") {
      errors.typeDropdown = "Type is required";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const bearer_token = localStorage.getItem("token");

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
          "Content-Type": "application/json",
        },
      };
      const formData_PUT = {
        id: editVoice.id,
        leadNo: editVoice.leadNo,
        clientName: editVoice.clientName,
        disposition: editVoice.disposition,
        employeeName: editVoice.employeeName,
        callDateTime: new Date(editVoice.callDateTime).toISOString(),
        source: editVoice.source,
        duration: editVoice.duration,
        type: editVoice.type,
        status: editVoice.status,
        uniqueId: editVoice.uniqueId,
      };

      await axios.put(
        `${protocal_url}${name}.${tenant_base_url}/VoiceBox/update`,
        formData_PUT,
        config,
      );
      alert("Monitoring Voice Box updated successfully!");
      navigate(`/panel/voicebox`);

      // Redirect after a short delay
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
    <div className="m-3 flex flex-col overflow-x-auto overflow-y-hidden">
      <div className="flex items-center justify-between rounded-md bg-white px-2 py-2 shadow-md">
        <h1 className="text-xl">
          <h1>Create Voice Box</h1>
        </h1>
        <Link
          to="/panel/voicebox"
          className="mx-3 rounded border border-blue-500 px-4 py-1 text-blue-500"
        >
          Cancel
        </Link>
      </div>
      <div className="overflow-hidden shadow-md">
        <div className="mt-3 rounded-t-xl bg-cyan-500 px-3 py-2">
          <h1 className="text-white">Voice Box Details</h1>
        </div>
        {/* CREATE VOICE FORM */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col rounded-b-xl bg-white px-3 py-2">
            <div className="grid gap-2 py-2">
              {/* FIRST ROW */}
              <div className="flex space-x-4">
                {/* LEAD ID FIELD */}
                <div className="flex w-1/2 flex-col">
                  <label
                    htmlFor="leadNo"
                    className="text-sm font-medium text-gray-700"
                  >
                    Lead Number
                  </label>
                  <input
                    type="number"
                    name="leadNo"
                    id="leadNo"
                    value={editVoice.leadNo}
                    className="mt-1 rounded-md border border-gray-300 p-2"
                    onChange={handleChange}
                    placeholder="Entere verox peron"
                  />
                  {errors.leadNo && (
                    <span style={{ color: "red" }}>{errors.leadNumber}</span>
                  )}
                </div>
                {/* CLIENT NAME FIELD */}
                <div className="flex w-1/2 flex-col">
                  <label
                    htmlFor="clientName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Client Name
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    id="clientName"
                    value={editVoice.clientName}
                    className="mt-1 rounded-md border border-gray-300 p-2"
                    onChange={handleChange}
                    placeholder="Entere verox peron"
                  />
                </div>
              </div>
              {/* SECOND ROW */}
              <div className="flex space-x-4">
                {/* Employee FIELD */}
                <div className="flex w-1/2 flex-col">
                  <label
                    htmlFor="employeeName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Employee Name
                  </label>
                  <input
                    type="text"
                    name="employeeName"
                    id="employeeName"
                    value={editVoice.employeeName}
                    className="mt-1 rounded-md border border-gray-300 p-2"
                    onChange={handleChange}
                    placeholder="Entere verox peron"
                  />
                  {errors.employeeName && (
                    <span style={{ color: "red" }}>{errors.empName}</span>
                  )}
                </div>
                {/* phoneNo FIELD */}
                <div className="flex w-1/2 flex-col">
                  <label
                    htmlFor="disposition"
                    className="text-sm font-medium text-gray-700"
                  >
                    Disposition
                  </label>
                  <input
                    type="text"
                    name="disposition"
                    id="disposition"
                    value={editVoice.disposition}
                    className="mt-1 rounded-md border border-gray-300 p-2"
                    onChange={handleChange}
                    placeholder="Entere verox peron"
                  />
                </div>
              </div>
              {/* THIRD ROW */}
              <div className="flex space-x-4">
                {/* SOURCE FIELD */}
                <div className="flex w-1/2 flex-col">
                  <label
                    htmlFor="source"
                    className="text-sm font-medium text-gray-700"
                  >
                    Source
                  </label>
                  <input
                    type="text"
                    name="source"
                    id="source"
                    value={editVoice.source}
                    className="mt-1 rounded-md border border-gray-300 p-2"
                    onChange={handleChange}
                    placeholder="Entere verox peron"
                  />
                </div>
                {/* CALL BACK DATE TIME FIELD */}
                <div className="flex w-1/2 flex-col">
                  <label
                    htmlFor="callDateTime"
                    className="text-sm font-medium text-gray-700"
                  >
                    Call Back Date Time
                  </label>
                  <input
                    type="date"
                    name="callDateTime"
                    id="callDateTime"
                    value={editVoice.callDateTime}
                    className="mt-1 rounded-md border border-gray-300 p-2"
                    onChange={handleChange}
                    placeholder="Entere verox peron"
                  />
                </div>
              </div>
              {/* FOURTH ROW */}
              <div className="flex space-x-4">
                {/* UNIQUE ID FIELD */}
                <div className="flex w-1/2 flex-col">
                  <label
                    htmlFor="uniqueId"
                    className="text-sm font-medium text-gray-700"
                  >
                    Unique Id
                  </label>
                  <input
                    type="text"
                    name="uniqueId"
                    id="uniqueId"
                    value={editVoice.uniqueId}
                    className="mt-1 rounded-md border border-gray-300 p-2"
                    onChange={handleChange}
                    placeholder="Entere verox peron"
                  />
                  {errors.uniqueId && (
                    <span style={{ color: "red" }}>{errors.uId}</span>
                  )}
                </div>
                {/* DURATION FIELD */}
                <div className="flex w-1/2 flex-col">
                  <label
                    htmlFor="duration"
                    className="text-sm font-medium text-gray-700"
                  >
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    id="duration"
                    value={editVoice.duration}
                    className="mt-1 rounded-md border border-gray-300 p-2"
                    onChange={handleChange}
                    placeholder="Entere verox peron"
                  />
                </div>
              </div>
              {/* FIFTH ROW */}
              <div className="flex space-x-4">
                {/* TYPE DROPDOWN */}
                <div className="flex w-1/2 flex-col">
                  <div className="w-1/1 relative flex flex-col">
                    <label
                      htmlFor="type"
                      className="text-sm font-medium text-gray-700"
                    >
                      Type
                    </label>
                    <div
                      className="relative"
                      onClick={toggleTypeDropdown}
                      onMouseLeave={() => setTypeDropdown(false)}
                    >
                      <button
                        className="mt-1 flex w-full items-center justify-between rounded-md border border-gray-300 p-2"
                        id="type"
                        type="button"
                      >
                        {editVoice.type === ""
                          ? defaultTypeDropdownText
                          : editVoice.type}

                        <FaAngleDown className="ml-2 text-gray-400" />
                      </button>
                      {typeDropdown && (
                        <div className="absolute top-11 z-10 w-full rounded-md border border-gray-300 bg-white">
                          <ul className="py-2 text-sm text-gray-700">
                            {typeData.map(({ key, userName, role }) => (
                              <li
                                key={key}
                                onClick={() =>
                                  handleDropdownType(userName, role)
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
                    {errors.type && (
                      <span style={{ color: "red" }}>{errors.typeData}</span>
                    )}
                  </div>
                </div>
                {/* STATUS TO DROPDOWN */}
                <div className="flex w-1/2 flex-col">
                  <div className="w-1/1 relative flex flex-col">
                    <label
                      htmlFor="leadesStatus"
                      className="text-sm font-medium text-gray-700"
                    >
                      Lead Status
                    </label>
                    <div
                      className="relative"
                      onClick={toggleStatusDropdown}
                      onMouseLeave={() => setStatusDropdown(false)}
                    >
                      <button
                        className="mt-1 flex w-full items-center justify-between rounded-md border border-gray-300 p-2"
                        id="LeadStatusDropDown"
                        type="button"
                      >
                        {editVoice.status === ""
                          ? defaultStatusText
                          : editVoice.status}

                        <FaAngleDown className="ml-2 text-gray-400" />
                      </button>
                      {statusDropdown && (
                        <div className="absolute top-11 z-10 w-full rounded-md border border-gray-300 bg-white">
                          <ul className="py-2 text-sm text-gray-700">
                            {statusData.map(({ key, userName, role }) => (
                              <li
                                key={key}
                                onClick={() =>
                                  handleDropdownStatus(userName, role)
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
                </div>
              </div>
            </div>
            {/* BUTTON */}
            <div className="flex justify-end px-2">
              <button
                type="submit"
                className="mb-3 mt-20 rounded border-2 border-cyan-500 bg-cyan-500 px-32 py-4 text-white hover:bg-white hover:text-cyan-500"
              >
                {isEditMode ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateVoice;

// INPUT SEQUENCE
// LEAD NO
// CLIENT NAME
// EMPLOYEE NAME
// DISPOSITION
// SOURCE
// CALL BACK DATE TIME
// UNIQUE ID
// DURATION
// TYPE DROPDOWN
// STATUS DROPDOWN
