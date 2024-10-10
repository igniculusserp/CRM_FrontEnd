// REACT - INBUILD
import { useState, useEffect } from 'react';
// REACT - ICONS
import { FaAngleDown } from 'react-icons/fa';
// REACT - QUILL
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
//reactPackages
import { Link, useNavigate, useParams } from 'react-router-dom';
//external Packages
import axios from 'axios';
//file
import { tenant_base_url, protocal_url } from '../../../../../Config/config';

const CreateVoice = () => {
  //to make id unique
  const { id } = useParams();
  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);
  const [editVoice, setEditVoice] = useState({
    id: '',
    leadNo: '',
    clientName: '',
    disposition: '',
    employeeName: '',
    callDateTime: '',
    source: '',
    duration: '',
    type: '',
    status: '',
    uniqueId: '',
  });

  //----------------------------------------------------------------------------------------
  //to make code for particluar company
  const fullURL = window.location.href;
  const url = new URL(fullURL);
  const name = url.hostname.split('.')[0];

  useEffect(() => {
    handleMonitorVoiceBox(); // Fetch lead data for editing
  }, [id]);

  //GET by ID---------------------------//GET---------------------------//GET---------------------------by ID-----------by ID
  async function handleMonitorVoiceBox() {
    const bearer_token = localStorage.getItem('token');
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
      console.log('@@@@===', response.data.data);
      setEditVoice({
        id: data.id || '',
        leadNo: data.leadNo || '',
        clientName: data.clientName || '',
        disposition: data.disposition || '',
        employeeName: data.employeeName || '',
        callDateTime: data.callDateTime || '',
        source: data.source || '',
        duration: data.duration || '',
        type: data.type || '',
        status: data.status || '',
        uniqueId: data.uniqueId || '',
      });
    } catch (error) {
      console.error('Error fetching Trail:', error);
    }
  }

  const [typeDropdown, setTypeDropdown] = useState(false);
  const [defaultTypeDropdownText, setDefaultTypeDropdownText] =
    useState('Type');
  const [statusDropdown, setStatusDropdown] = useState(false);
  const [defaultStatusText, setDefaultStatusText] = useState('Status');

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
    { key: 1, value: 'Incoming' },
    { key: 2, value: 'Outgoing' },
    { key: 3, value: 'Missed' },
  ];

  //   STATUS DATA
  const statusData = [
    { key: 1, value: 'Not Answer' },
    { key: 2, value: 'Answer' },
  ];

  //---------->handleSubmit<----------
  //two different models one for PUT and one for POST
  const handleSubmit = async (event) => {
    event.preventDefault();
    const bearer_token = localStorage.getItem('token');

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
          'Content-Type': 'application/json',
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
      alert('Monitoring Voice Box updated successfully!');
      navigate(`/sidebar/voicebox`);

      // Redirect after a short delay
    } catch (error) {
      if (error.response) {
        console.error('Error data:', error.response.data);
      } else {
        console.error('Error:', error.message);
      }
      alert('An error occurred. Please try again.');
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
            <div className="grid gap-2 p-2">
              {/* FIRST ROW */}
              <div className="flex space-x-4">
                {/* LEAD ID FIELD */}
                <div className="flex flex-col w-1/2">
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
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                    onChange={handleChange}
                    placeholder="Entere verox peron"
                  />
                </div>
                {/* CLIENT NAME FIELD */}
                <div className="flex flex-col w-1/2">
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
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                    onChange={handleChange}
                    placeholder="Entere verox peron"
                  />
                </div>
              </div>
              {/* SECOND ROW */}
              <div className="flex space-x-4">
                {/* LANGUAGE FIELD */}
                <div className="flex flex-col w-1/2">
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
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                    onChange={handleChange}
                    placeholder="Entere verox peron"
                  />
                </div>
                {/* phoneNo FIELD */}
                <div className="flex flex-col w-1/2">
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
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                    onChange={handleChange}
                    placeholder="Entere verox peron"
                  />
                </div>
              </div>
              {/* THIRD ROW */}
              <div className="flex space-x-4">
                {/* SOURCE FIELD */}
                <div className="flex flex-col w-1/2">
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
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                    onChange={handleChange}
                    placeholder="Entere verox peron"
                  />
                </div>
                {/* CALL BACK DATE TIME FIELD */}
                <div className="flex flex-col w-1/2">
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
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                    onChange={handleChange}
                    placeholder="Entere verox peron"
                  />
                </div>
              </div>
              {/* FOURTH ROW */}
              <div className="flex space-x-4">
                {/* UNIQUE ID FIELD */}
                <div className="flex flex-col w-1/2">
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
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                    onChange={handleChange}
                    placeholder="Entere verox peron"
                  />
                </div>
                {/* DURATION FIELD */}
                <div className="flex flex-col w-1/2">
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
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                    onChange={handleChange}
                    placeholder="Entere verox peron"
                  />
                </div>
              </div>
              {/* FIFTH ROW */}
              <div className="flex space-x-4">
                {/* TYPE DROPDOWN */}
                <div className="flex flex-col w-1/2">
                  <div className="flex flex-col w-1/1 relative">
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
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                        id="type"
                        type="button"
                      >
                        {editVoice.type === ''
                          ? defaultTypeDropdownText
                          : editVoice.type}

                        <FaAngleDown className="ml-2 text-gray-400" />
                      </button>
                      {typeDropdown && (
                        <div className="absolute w-full bg-white border border-gray-300 rounded-md top-11 z-10">
                          <ul className="py-2 text-sm text-gray-700">
                            {typeData.map(({ key, userName, role }) => (
                              <li
                                key={key}
                                onClick={() =>
                                  handleDropdownType(userName, role)
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
                  </div>
                </div>
                {/* STATUS TO DROPDOWN */}
                <div className="flex flex-col w-1/2">
                  <div className="flex flex-col w-1/1 relative">
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
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                        id="LeadStatusDropDown"
                        type="button"
                      >
                        {editVoice.status === ''
                          ? defaultStatusText
                          : editVoice.status}

                        <FaAngleDown className="ml-2 text-gray-400" />
                      </button>
                      {statusDropdown && (
                        <div className="absolute w-full bg-white border border-gray-300 rounded-md top-11 z-10">
                          <ul className="py-2 text-sm text-gray-700">
                            {statusData.map(({ key, userName, role }) => (
                              <li
                                key={key}
                                onClick={() =>
                                  handleDropdownStatus(userName, role)
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
                  </div>
                </div>
              </div>
            </div>
            {/* BUTTON */}
            <div className="flex justify-end px-2">
              <button
                type="submit"
                className="px-32 py-4 mt-20 mb-3 bg-cyan-500 text-white border-2 border-cyan-500 rounded hover:text-cyan-500 hover:bg-white"
              >
                {isEditMode ? 'Update' : 'Save'}
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
