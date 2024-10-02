import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import { Link } from 'react-router-dom';

export default function CreateLogs() {
  const [description, setDescription] = useState("HELLO, ");
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
    <>
      {/* TOP SECTION */}
      <div className="px-3 py-4 bg-white rounded-md flex items-center justify-between m-3">
        <h1 className="text-xl font-bold">Client Logs Information</h1>
        <Link to="/sidebar/logs">
          <button className="px-6 py-2 text-center text-sm border border-blue-600 text-blue-600 rounded-md">
            Cancel
          </button>
        </Link>
      </div>

      {/* FORM SECTION */}
      <div className="px-3">
        <h1 className="py-2 px-3 font-medium rounded-t-xl bg-cyan-500 text-white text-md shadow-md">
        Client Logs Information
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3 bg-white px-4 py-2 pb-4 rounded-b-xl shadow-md">
            <div className="flex-1 flex gap-4">
              {/* LEFT SIDE */}
              <div className="flex-1 flex flex-col">
                {/* CLIENT NAME */}
                <label
                  htmlFor="number"
                  className="text-sm font-medium text-gray-700"
                >
                  Number
                </label>
                <input
                  type="text"
                  id="number"
                  name="number"
                  value={editLogs.number}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  placeholder="SMS"
                  onChange={handleChange}
                />
                <label
                  htmlFor="createdBy"
                  className="text-sm font-medium text-gray-700"
                >
                  Created By
                </label>
                <input
                  type="text"
                  id="createdBy"
                  name="createdBy"
                  value={editLogs.createdBy}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  placeholder="SMS"
                  onChange={handleChange}
                />
                <label
                  htmlFor="createdTime"
                  className="text-sm font-medium text-gray-700"
                >
                  Created Time
                </label>
                <input
                  type="text"
                  id="createdTime"
                  name="createdTime"
                  value={editLogs.createdTime}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  placeholder="SMS"
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* LEFT SIDE */}
            <div className="flex-1 flex flex-col">
              {/* OPERATION FIELD */}
              <label
                htmlFor="operation"
                className="text-sm font-medium text-gray-700"
              >
                Operation
              </label>
              <input
                type="text"
                id="operation"
                name="operation"
                value={editLogs.operation}
                className="mt-1 p-2 border border-gray-300 rounded-md"
                placeholder="SMS"
                onChange={handleChange}
              />
              {/* CLIENT NAME DROPDOWN */}
              <label
                htmlFor="smsTime"
                className="text-sm font-medium text-gray-700"
              >
                Client Name
              </label>
              <div
                className="relative"
                onClick={toggleDropdownClientName}
                onMouseLeave={() => setClientNameDropdown(false)}
              >
                <button
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                  id="LeadStatusDropDown"
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
                          className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
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
            {/* RIGHT SIDE */}
          </div>
          {/* DESCRIPTION */}
          <div className="bg-white rounded-xl shadow-md mt-3 mb-2">
            <h2 className="font-medium py-2 px-4 shadow-md rounded-t-xl text-white bg-cyan-500">
              Description Information
            </h2>
            <div className="px-2 py-4">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <ReactQuill
                  name="description"
                  value={description}
                  className=" text-balance hyphens-auto max-w-5xl  max-h-60 h-60"
                  theme="snow"
                  onChange={setDescription}
                  placeholder="Add Description"
                />
              </div>
            </div>
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
          {/* BUTTONS END */}
        </form>
      </div>
    </>
  );
}
