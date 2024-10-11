import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function GeneralReport() {
  const [editReport, setEditReport] = useState({
    createdStartDate: '',
    modifiedStartDate: '',
    callbackStartDate: '',
    leadStatus: '',
    leadOwner: '',
    createdEndDate: '',
    modifiedEndDate: '',
    callbackEndDate: '',
    leadSource: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);

  // HANDLING INPUT STATE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditReport({
      ...editReport,
      [name]: value,
    });
  };

  // HANDLING FORM SUBMISSION
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  //   DROPDOWNS
  const [createdStartDateDropdown, setCreatedStartDateDropdown] =
    useState(false);
  const [defaultCreatedStartDateText, setDefaultCreatedStartDateText] =
    useState('Created Start Date');
  const [createdEndDropdown, setCreatedEndDropdown] = useState(false);
  const [defaultCreatedEndText, setDefaultCreatedEndText] =
    useState('Created End Date');
  const [leadStatusDropdown, setLeadStatusDropdown] = useState(false);
  const [defaultLeadStatusText, setDefaultLeadStatusText] =
    useState('Lead Status');
  const [leadOwnerDropdown, setLeadOwnerDropdown] = useState(false);
  const [defaultLeadOwnerText, setDefaultLeadOwnerText] =
    useState('Lead Owner');
  const [leadSourceDropdown, setLeadSourceDropdown] = useState(false);
  const [defaultLeadSourceText, setDefaultLeadSourceText] =
    useState('Lead Source');

  // CREATED START DATE DUMMY
  const createdStartData = [
    { id: 1, name: '12/09/2023' },
    { id: 2, name: '12/09/2023' },
    { id: 3, name: '12/09/2023' },
    { id: 4, name: '12/09/2023' },
  ];

  // TOGGLE CREATED START DATE DROPDOWN
  const toggleDropdownCreatedStartDate = () => {
    setCreatedStartDateDropdown(!createdStartDateDropdown);
  };

  const handleDropdownCreatedStart = (name) => {
    setDefaultCreatedStartDateText(name);
    setCreatedStartDateDropdown(!createdStartDateDropdown);
    editReport((prev) => ({
      ...prev,
      name: name,
    }));
  };

  // CREATED END DATE DUMMY
  const createdEndData = [
    { id: 1, name: '12/09/2023' },
    { id: 2, name: '12/09/2023' },
    { id: 3, name: '12/09/2023' },
    { id: 4, name: '12/09/2023' },
  ];

  // TOGGLE CREATED END DATE DROPDOWN
  const toggleDropdownCreatedEnd = () => {
    setCreatedEndDropdown(!createdEndDropdown);
  };

  const handleDropdownCreatedEnd = (name) => {
    setDefaultCreatedEndText(name);
    setCreatedEndDropdown(!createdEndDropdown);
    editReport((prev) => ({
      ...prev,
      name: name,
    }));
  };

  // LEAD STATUS DUMMY
  const leadStatusData = [
    { id: 1, name: 'lead status' },
    { id: 2, name: 'lead status' },
    { id: 3, name: 'lead status' },
    { id: 4, name: 'lead status' },
  ];

  // TOGGLE LEAD STATUS DROPDOWN
  const toggleDropdownLeadStatus = () => {
    setLeadStatusDropdown(!leadStatusDropdown);
  };

  const handleDropdownLeadStatus = (name) => {
    setDefaultLeadStatusText(name);
    setLeadStatusDropdown(!leadStatusDropdown);
    editReport((prev) => ({
      ...prev,
      name: name,
    }));
  };

  // LEAD OWNER DUMMY
  const leadOwnerData = [
    { id: 1, name: 'lead owner' },
    { id: 2, name: 'lead owner' },
    { id: 3, name: 'lead owner' },
    { id: 4, name: 'lead owner' },
  ];

  // TOGGLE LEAD OWNER DROPDOWN
  const toggleDropdownLeadOwner = () => {
    setLeadOwnerDropdown(!leadOwnerDropdown);
  };

  const handleDropdownLeadOwner = (name) => {
    setDefaultLeadOwnerText(name);
    setLeadOwnerDropdown(!leadOwnerDropdown);
    editReport((prev) => ({
      ...prev,
      name: name,
    }));
  };

  // LEAD SOURCE DUMMY
  const leadSourceData = [
    { id: 1, name: 'lead source' },
    { id: 2, name: 'lead source' },
    { id: 3, name: 'lead source' },
    { id: 4, name: 'lead source' },
  ];

  // TOGGLE LEAD SOURCE DROPDOWN
  const toggleDropdownLeadSource = () => {
    setLeadSourceDropdown(!leadSourceDropdown);
  };

  const handleDropdownLeadSource = (name) => {
    setDefaultLeadSourceText(name);
    setLeadSourceDropdown(!leadSourceDropdown);
    editReport((prev) => ({
      ...prev,
      name: name,
    }));
  };
  return (
    <>
      <div className="flex py-2 px-3 m-3 items-center justify-between bg-white rounded-md shadow-md">
        <h1 className="text-xl">Add General Report</h1>
        <Link
          to="/sidebar/misreports"
          className="px-4 py-1 rounded mx-3 border border-blue-500 text-blue-500"
        >
          Cancel
        </Link>
      </div>

      {/* FORM SECTION */}
      <div className="px-3">
        <h1 className="py-2 px-3 font-medium rounded-t-xl bg-cyan-500 text-white text-md shadow-md">
          General Report Detail
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex gap-3 bg-white px-2 py-2 pb-4 rounded-b-xl shadow-md flex-col"
        >
          <div className="grid gap-2 px-2 pb-3">
            {/* FIRST ROW */}
            <div className="flex space-x-4">
              {/* CREATED START DATE DROPDOWN */}
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="createdStartDate"
                  className="text-sm font-medium text-gray-700"
                >
                  Created Start Date
                </label>
                <div
                  className="relative"
                  onClick={toggleDropdownCreatedStartDate}
                  onMouseLeave={() => setCreatedStartDateDropdown(false)}
                >
                  <button
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                    id="createdStartDate"
                    type="button"
                  >
                    {isEditMode
                      ? editReport.createdStartDate
                      : defaultCreatedStartDateText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {createdStartDateDropdown && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {createdStartData.map(({ key, name }) => (
                          <li
                            className="block px-4 py-2 text-sm hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                            key={key}
                            onClick={() => handleDropdownCreatedStart(name)}
                          >
                            {name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col w-1/2">
                {/* MODIFIED START DATE FIELD */}
                <label
                  htmlFor="modifiedStartDate"
                  className="text-sm font-medium text-gray-700"
                >
                  Modified Start Date
                </label>
                <input
                  type="text"
                  name="modifiedStartDate"
                  id="modifiedStartDate"
                  value={editReport.modifiedStartDate}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
            </div>
            {/* SECOND ROW */}
            <div className="flex space-x-4">
              {/* CREATED END DATE DROPDOWN */}
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="createdEndDate"
                  className="text-sm font-medium text-gray-700"
                >
                  Created End Date
                </label>
                <div
                  className="relative"
                  onClick={toggleDropdownCreatedEnd}
                  onMouseLeave={() => setCreatedEndDropdown(false)}
                >
                  <button
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                    id="createdEndDate"
                    type="button"
                  >
                    {isEditMode
                      ? editReport.createdEndDate
                      : defaultCreatedEndText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {createdEndDropdown && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {createdEndData.map(({ key, name }) => (
                          <li
                            className="block px-4 py-2 text-sm hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                            key={key}
                            onClick={() => handleDropdownCreatedEnd(name)}
                          >
                            {name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col w-1/2">
                {/* MODIFIED END DATE FIELD */}
                <label
                  htmlFor="modifiedEndDate"
                  className="text-sm font-medium text-gray-700"
                >
                  Modified End Date
                </label>
                <input
                  type="text"
                  name="modifiedEndDate"
                  id="modifiedEndDate"
                  value={editReport.modifiedEndDate}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
            </div>
            {/* THIRD ROW */}
            <div className="flex space-x-4">
              {/* LEAD STATUS DROPDOWN */}
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="leadStatus"
                  className="text-sm font-medium text-gray-700"
                >
                  Lead Status
                </label>
                <div
                  className="relative"
                  onClick={toggleDropdownLeadStatus}
                  onMouseLeave={() => setLeadStatusDropdown(false)}
                >
                  <button
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                    id="leadStatus"
                    type="button"
                  >
                    {isEditMode ? editReport.leadStatus : defaultLeadStatusText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {leadStatusDropdown && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {leadStatusData.map(({ key, name }) => (
                          <li
                            className="block px-4 py-2 text-sm hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                            key={key}
                            onClick={() => handleDropdownLeadStatus(name)}
                          >
                            {name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col w-1/2">
                {/* CALL BACK START DATE FIELD */}
                <label
                  htmlFor="callbackStartDate"
                  className="text-sm font-medium text-gray-700"
                >
                  Callback Start Date
                </label>
                <input
                  type="text"
                  name="callbackStartDate"
                  id="callbackStartDate"
                  value={editReport.callbackStartDate}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
            </div>
            {/* FOURTH ROW */}
            <div className="flex space-x-4">
              {/* LEAD OWNER DROPDOWN */}
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="leadStatus"
                  className="text-sm font-medium text-gray-700"
                >
                  Lead Owner
                </label>
                <div
                  className="relative"
                  onClick={toggleDropdownLeadOwner}
                  onMouseLeave={() => setLeadOwnerDropdown(false)}
                >
                  <button
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                    id="leadStatus"
                    type="button"
                  >
                    {isEditMode ? editReport.leadOwner : defaultLeadOwnerText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {leadOwnerDropdown && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {leadOwnerData.map(({ key, name }) => (
                          <li
                            className="block px-4 py-2 text-sm hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                            key={key}
                            onClick={() => handleDropdownLeadOwner(name)}
                          >
                            {name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col w-1/2">
                {/* CALL BACK END DATE FIELD */}
                <label
                  htmlFor="callbackEndDate"
                  className="text-sm font-medium text-gray-700"
                >
                  Callback End Date
                </label>
                <input
                  type="text"
                  name="callbackEndDate"
                  id="callbackEndDate"
                  value={editReport.callbackEndDate}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
            </div>
            {/* FIFTH ROW */}
            <div className="flex space-x-4">
              {/* LEAD SOURCE DROPDOWN */}
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="leadSource"
                  className="text-sm font-medium text-gray-700"
                >
                  Lead Source
                </label>
                <div
                  className="relative"
                  onClick={toggleDropdownLeadSource}
                  onMouseLeave={() => setLeadSourceDropdown(false)}
                >
                  <button
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                    id="leadSource"
                    type="button"
                  >
                    {isEditMode ? editReport.leadSource : defaultLeadSourceText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {leadSourceDropdown && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {leadSourceData.map(({ key, name }) => (
                          <li
                            className="block px-4 py-2 text-sm hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                            key={key}
                            onClick={() => handleDropdownLeadSource(name)}
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
          </div>
          {/* BUTTON */}
          <div className="flex justify-end gap-5">
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-32 py-4 mt-20 mb-4 bg-cyan-500 text-white hover:text-cyan-500 hover:bg-white border-2 border-cyan-500 rounded"
              >
                {isEditMode ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
