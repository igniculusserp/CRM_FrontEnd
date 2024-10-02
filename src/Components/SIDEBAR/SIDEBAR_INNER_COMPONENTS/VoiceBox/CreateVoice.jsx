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
import { tenant_base_url, protocal_url } from "../../../../Config/config";

const CreateVoice = () => {
  //to make id unique
  const { id } = useParams();
  const navigate = useNavigate();

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
        config
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
  const handleSubmit = async (event) => {
    event.preventDefault();
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
        config
      );
      alert("Monitoring Voice Box updated successfully!");
      navigate(`/sidebar/voicebox`);

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
    <div className="flex flex-col m-3 overflow-x-auto overflow-y-hidden">
      <div className="flex py-2 px-2 items-center justify-between bg-white rounded-md shadow-md">
        <h1 className="text-xl">
          <h1>Edit Voice Box</h1>
        </h1>
        <Link
          to="/sidebar/voicebox"
          className="px-4 py-1 rounded mx-3 border border-blue-500 text-blue-500"
        >
          Cancel
        </Link>
      </div>
      <div className="overflow-hidden shadow-md">
        <div className="py-2 px-6 bg-cyan-500 rounded-t-xl mt-3">
          <h1 className="text-white">Voice Box Details</h1>
        </div>
        {/* CREATE VOICE FORM */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col py-2 px-4 bg-white rounded-b-xl">
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col">
                {/* FIRST PART */}
                {/* Lead No */}
                <label
                  htmlFor="leadNo"
                  className="text-sm font-medium text-gray-700"
                >
                  Lead No
                </label>
                <input
                  type="text"
                  name="leadNo"
                  value={editVoice.leadNo}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
                {/* EMPLOYEENAME FILED */}
                <label
                  htmlFor="employeeName"
                  className="text-sm font-medium text-gray-700"
                >
                  Employee Name
                </label>
                <input
                  type="text"
                  name="employeeName"
                  value={editVoice.employeeName}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
                {/* SOURCE  */}
                <label
                  htmlFor="source"
                  className="text-sm font-medium text-gray-700"
                >
                  source
                </label>
                <input
                  type="text"
                  name="source"
                  value={editVoice.source}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
                {/* TYPE DROPDOWN */}
                <div className="flex flex-col relative">
                  <label
                    htmlFor="type"
                    className="text-sm font-medium text-gray-700"
                  >
                    Type
                  </label>
                  <div
                    className="relatve"
                    onClick={toggleTypeDropdown}
                    onMouseLeave={() => setTypeDropdown(false)}
                  >
                    <button
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                      id="LeadStatusDropDown"
                      type="button"
                    >
                      {editVoice.type}
                      <FaAngleDown className="ml-2 text-gray-400" />
                    </button>
                    {typeDropdown && (
                      <div className="absolute w-full bg-white border border-gray-300 rounded-md top-11 z-10">
                        <ul className="text-sm py-2 text-gray-700">
                          {typeData.map(({ key, value }) => (
                            <li
                              className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                              key={key}
                              onClick={() => handleDropdownType(value)}
                            >
                              {value}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                {/* UNIQUE ID DROPDOWN */}
                <label
                  htmlFor="uniqueId"
                  className="text-sm font-medium text-gray-700"
                >
                  uniqueId
                </label>
                <input
                  type="text"
                  name="uniqueId"
                  value={editVoice.uniqueId}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
              <div className="flex-1 flex flex-col">
                {/* Client Name */}
                <label
                  htmlFor="clientName"
                  className="text-sm font-medium text-gray-700"
                >
                  Client Name
                </label>
                <input
                  type="text"
                  name="clientName"
                  value={editVoice.clientName}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
                {/* DISPOSITION */}
                <label
                  htmlFor="disposition"
                  className="text-sm font-medium text-gray-700"
                >
                  Dispostion
                </label>
                <input
                  type="text"
                  name="disposition"
                  value={editVoice.disposition}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
                {/* CALL DATE */}
                <label
                  htmlFor="callDateTime"
                  className="text-sm font-medium text-gray-700"
                >
                  CallBack DateTime
                </label>
                <input
                  type="date"
                  name="callDateTime"
                  value={editVoice.callDateTime.split("T")[0]}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                />
                {/* DURATION DROPDOWN */}
                <label
                  htmlFor="duration"
                  className="text-sm font-medium text-gray-700"
                >
                  duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={editVoice.duration}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
                {/* STATUS DROPDOWN */}
                <div className="flex flex-col relative">
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
                      {editVoice.status}
                      <FaAngleDown className="ml-2 text-gray-400" />
                    </button>
                    {statusDropdown && (
                      <div className="absolute w-full bg-white border border-gray-300 rounded-md top-11 z-10">
                        <ul className="py-2 text-sm text-gray-700">
                          {statusData.map(({ key, value }) => (
                            <li
                              key={key}
                              onClick={() => handleDropdownStatus(value)}
                              className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                            >
                              {value}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                {/* END STATUS DROPDOWN */}
              </div>
            </div>
            <div className="flex justify-end gap-5 mr-10">
              <div className="flex justify-end mr-20">
                <button
                  type="submit"
                  className="px-32 py-4 mt-40 mb-4 bg-cyan-500 text-white hover:text-cyan-500 hover:bg-white border-2 border-cyan-500 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateVoice;
