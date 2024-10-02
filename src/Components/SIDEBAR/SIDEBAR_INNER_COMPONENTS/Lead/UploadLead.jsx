import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function UploadLead() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editLead, setEditLead] = useState({
    file: '',
    nameColNum: '',
    emailColNum: '',
    investAmountColNum: '',
    stateColNum: '',
    mobColNum: '',
    occupationColNum: '',
    cityColNum: '',
    descriptionColNum: '',
    assigned_To: '',
    pool: '',
    status: '',
  });

  //   HANDLING INPUTS
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditLead({
      ...editLead,
      [name]: value,
    });
  };

  //   HANDLING FORM SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  //   DROPDOWNS STATE AND THEIR OTHER FUNCTIONALITY
  const [assignedToDropdown, setAssignedToDropdown] = useState(false);
  const [defaultAssignedToText, setDefaultAssignedToText] =
    useState('Assigned To');
  const [poolDropdown, setPoolDropdown] = useState(false);
  const [defaultPoolText, setDefaultPoolText] = useState('pool');
  const [statusDropdown, setStatusDropdown] = useState(false);
  const [defaultStatusText, setDefaultStatusText] = useState('status');

  // ASSIGNED TO DATA
  const assignedToData = [
    { key: 1, name: 'Assigned To' },
    { key: 2, name: 'Assigned To' },
    { key: 3, name: 'Assigned To' },
    { key: 4, name: 'Assigned To' },
  ];

  //   TOGGLE ASSIGNED TO DROPDOWN
  const toggleAssignedToDropdown = () => {
    setAssignedToDropdown(!assignedToDropdown);
  };

  // HANDLE DROPDOWN FOR TYPE
  const handleDropdownAssignedTo = (assigned_To) => {
    setDefaultAssignedToText(assigned_To);
    setAssignedToDropdown(!assignedToDropdown);
    setEditLead((prevTask) => ({
      ...prevTask,
      assigned_To: assigned_To,
    }));
  };

  // LEAD VENDER DUMMY DATA
  const poolData = [
    { key: 1, name: 'pool' },
    { key: 1, name: 'pool' },
    { key: 1, name: 'pool' },
    { key: 1, name: 'pool' },
  ];

  //   TOGGLE ASSIGNED TO DROPDOWN
  const togglePoolDropdown = () => {
    setPoolDropdown(!poolDropdown);
  };

  // HANDLE DROPDOWN FOR TYPE
  const handleDropdownPool = (pool) => {
    setDefaultPoolText(pool);
    setPoolDropdown(!poolDropdown);
    setEditLead((prevTask) => ({
      ...prevTask,
      pool: pool,
    }));
  };

  // FLUSH DUMMY DATA
  const statusData = [
    { key: 1, name: 'Status' },
    { key: 2, name: 'Status' },
    { key: 3, name: 'Status' },
    { key: 4, name: 'Status' },
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

  return (
    <div className="flex flex-col mx-3 mt-3 overflow-x-auto overflow-y-hidden bg-gray-300">
      <div className="flex py-3 px-2 items-center justify-between shadow-md bg-white rounded-md mt-3">
        <h1 className="text-xl px-1 py-1 font-medium rounded-lg">
          {isEditMode ? <h1>Upload Leads</h1> : <>Create Leads</>}
        </h1>
        <div>
          <Link
            to="/sidebar/lead"
            className="px-4 py-1 rounded mx-3 border border-blue-500 text-blue-500 "
          >
            Cancel
          </Link>
        </div>
      </div>

      {/* FORM STAT FROM HERE */}
      <div className="overflow-hidden">
        {/* CREATE CONTACT FORM */}
        <form className="flex flex-col py-3" onSubmit={handleSubmit}>
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
              value={editLead.file}
              placeholder="Upload"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-3 bg-white py-2 px-3 rounded-b-xl">
            {/* FIRST SECTION */}
            <div className="flex-1 flex flex-col">
              {/* ASSIGNED TO DROPDOWN */}
              <label
                htmlFor="assigned_To"
                className="text-sm font-medium text-gray-700"
              >
                Assigned To
              </label>
              <div
                className="relative"
                onClick={toggleAssignedToDropdown}
                onMouseLeave={() => setAssignedToDropdown(false)}
              >
                <button
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                  id="LeadStatusDropDown"
                  type="button"
                >
                  {isEditMode ? editLead.assigned_To : defaultAssignedToText}
                  <FaAngleDown className="ml-2 text-gray-400" />
                </button>
                {assignedToDropdown && (
                  <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                    <ul className="py-2 text-sm text-gray-700">
                      {assignedToData.map(({ key, name }) => (
                        <li
                          className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                          key={key}
                          onClick={() => handleDropdownAssignedTo(name)}
                        >
                          {name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {/* POOL DROPDOWN */}
              <label
                htmlFor="pool"
                className="text-sm font-medium text-gray-700"
              >
                Pool
              </label>
              <div
                className="relative"
                onClick={togglePoolDropdown}
                onMouseLeave={() => setPoolDropdown(false)}
              >
                <button
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                  id="LeadStatusDropDown"
                  type="button"
                >
                  {isEditMode ? editLead.pool : defaultPoolText}
                  <FaAngleDown className="ml-2 text-gray-400" />
                </button>
                {poolDropdown && (
                  <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                    <ul className="py-2 text-sm text-gray-700">
                      {poolData.map(({ key, name }) => (
                        <li
                          className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                          key={key}
                          onClick={() => handleDropdownPool(name)}
                        >
                          {name}
                        </li>
                      ))}
                    </ul>
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
                  name="nameColNum"
                  id="nameColNum"
                  value={editLead.nameColNum}
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
                  name="mobColNum"
                  id="mobColNum"
                  value={editLead.mobColNum}
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
                  name="emailColNum"
                  id="emailColNum"
                  value={editLead.emailColNum}
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
                  name="cityColNum"
                  id="cityColNum"
                  value={editLead.cityColNum}
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
                  name="stateColNum"
                  id="stateColNum"
                  value={editLead.stateColNum}
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
                  name="occupationColNum"
                  id="occupationColNum"
                  value={editLead.occupationColNum}
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
                  name="descriptionColNum"
                  id="descriptionColNum"
                  value={editLead.descriptionColNum}
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
                  {isEditMode ? 'Update' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}