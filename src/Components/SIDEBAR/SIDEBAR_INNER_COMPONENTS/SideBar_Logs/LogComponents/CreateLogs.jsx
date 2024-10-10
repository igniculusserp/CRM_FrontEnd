import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import { Link } from 'react-router-dom';

export default function CreateLogs() {
  const [description, setDescription] = useState('HELLO, ');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editLogs, setEditLogs] = useState({
    number: '',
    createdBy: '',
    createdTime: '',
    clientName: '',
    operation: '',
  });

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditLogs({
      ...editLogs,
      [name]: value,
    });
  };

  // FORM SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // CLIENT NAME DROPDOWN ->
  const [clientNameDropdown, setClientNameDropdown] = useState(false);
  const [defaultClientNameText, setDefaultClientNameText] =
    useState('client name');

  // CLIENT NAME DATA =>
  const clientNameData = [
    { key: 1, name: 'Shubham Mishra' },
    { key: 2, name: 'Shubham Mishra' },
    { key: 3, name: 'Shubham Mishra' },
    { key: 4, name: 'Shubham Mishra' },
  ];

  // TOGGLE CLIENT NAME DROPDOWN
  const toggleDropdownClientName = () => {
    setClientNameDropdown(!clientNameDropdown);
  };

  const handleDropdownClientName = (name) => {
    setDefaultClientNameText(name);
    setClientNameDropdown(!clientNameDropdown);
    setEditLogs((prev) => ({
      ...prev,
      name: name,
    }));
  };

  return (
    <div className="flex flex-col m-3 overflow-x-auto overflow-y-hidden">
      <div className="flex py-2 px-3 items-center justify-between bg-white rounded-md shadow-md">
        <h1 className="text-xl">Add Client Logs</h1>
        <Link
          to="/sidebar/logs"
          className="px-4 py-1 rounded mx-3 border border-blue-500 text-blue-500"
        >
          Cancel
        </Link>
      </div>
      {/* -------------FORM Starts FROM HERE------------- */}
      <form onSubmit={handleSubmit} className="flex flex-col mb-6">
        {/* -------------Client Logs Information STARTS FROM HERE------------- */}
        <div className="my-3 bg-white rounded-xl shadow-md flex-grow ">
          <h2 className="font-medium py-2 px-3 rounded-t-xl text-white bg-cyan-500">
            Client Logs Information
          </h2>

          {/* -------------Client Logs Information STARTS FROM HERE------------- */}
          {/* -------------6------------- */}
          {/* -------------Street------------- */}
          <div className="grid gap-2 p-2">
            <div className="flex space-x-4">
              {/* CALL STATUS DROPDOWN */}
              <div className="flex flex-col w-1/2">
                {/* NUMBER */}
                <label
                  htmlFor="number"
                  className="text-sm font-medium text-gray-700"
                >
                  Number
                </label>
                <input
                  type="number"
                  name="number"
                  id="number"
                  value={editLogs.number}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
              {/* TEXT MESSAGE DROPDOWN */}
              <div className="flex flex-col w-1/2">
                {/* CREATED BY FIELD */}
                <label
                  htmlFor="createdBy"
                  className="text-sm font-medium text-gray-700"
                >
                  Created By
                </label>
                <input
                  type="text"
                  name="createdBy"
                  id="createdBy"
                  value={editLogs.createdBy}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
            </div>
            {/* INPUT FIELDS */}
            <div className="flex space-x-4">
              {/* CREATED TIME FIELD */}
              <div className="flex flex-col w-1/2">
                {/* CREATED TIME FIELD */}
                <label
                  htmlFor="createdTime"
                  className="text-sm font-medium text-gray-700"
                >
                  Created Time
                </label>
                <input
                  type="text"
                  name="createdTime"
                  id="createdTime"
                  value={editLogs.createdTime}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
              {/* OPERATION FIELD */}
              <div className="flex flex-col w-1/2">
                {/* OPERATION FIELD */}
                <label
                  htmlFor="operation"
                  className="text-sm font-medium text-gray-700"
                >
                  Operation
                </label>
                <input
                  type="text"
                  name="operation"
                  id="operation"
                  value={editLogs.operation}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
            </div>
            {/* DROPDOWN */}
            <div className="flex flex-col">
              <div className="flex flex-col w-1/2">
                {/* CLIENT NAME DROPDOWN */}
                <label
                  htmlFor="clientName"
                  className="text-sm font-medium text-gray-700 mt-2"
                >
                  Text Message
                </label>
                <div
                  className="relative"
                  onClick={toggleDropdownClientName}
                  onMouseLeave={() => setClientNameDropdown(false)}
                >
                  <button
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                    id="clientName"
                    type="button"
                  >
                    {isEditMode ? editLogs.clientName : defaultClientNameText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {clientNameDropdown && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {clientNameData.map(({ key, name }) => (
                          <li
                            className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer z-10"
                            key={key}
                            onClick={() => handleDropdownClientName(name)}
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
        </div>
        {/* DESCRIPTION */}
        <div className="bg-white rounded-xl shadow-md">
          <h2 className="font-medium py-2 px-4 rounded-t-xl text-white bg-cyan-500">
            Description Information
          </h2>
          <div className="p-2 ">
            <div className="flex flex-col">
              <label
                htmlFor="description"
                className="text-sm  font-medium text-gray-700"
              >
                Description
              </label>
              <ReactQuill
                name="description"
                value={description}
                className="text-balance hyphens-auto  max-h-full h-60 mt-1"
                theme="snow"
                onChange={setDescription}
                placeholder="Add Description"
              />
            </div>
          </div>
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
  );
}
