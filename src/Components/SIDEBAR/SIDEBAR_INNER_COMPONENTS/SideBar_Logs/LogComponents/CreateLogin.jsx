import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import { Link } from 'react-router-dom';

export default function CreateLogin() {
  const [description, setDescription] = useState('Hello, ');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editLogs, setEditLogs] = useState({
    fullName: '',
    fromLoginDate: '',
    toLoginDate: '',
  });

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditLogs({
      ...editLogs,
      [name]: value,
    });
  };

  // HANDLE FORM SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  //   DROPDOWNS
  const [fromLoginDateDropdown, setFromLoginDateDropdown] = useState(false);
  const [
    defaultFromLoginDateDropdownText,
    setDefaultFromLoginDateDropdownText,
  ] = useState('From Login Date');
  const [toLoginDateDropdown, setToLoginDateDropdown] = useState(false);
  const [defaultToLoginDateDropdownText, setDefaultToLoginDateDropdownText] =
    useState('To Login Date');

  // USERNAME DUMMY DATA
  const fromLoginDate = [
    { key: 1, name: '09/10/2023' },
    { key: 2, name: '09/10/2023' },
    { key: 3, name: '09/10/2023' },
  ];

  // TOGGLE USERNAME DROPDOWN
  const toggleDropdownFromLogin = () => {
    setFromLoginDateDropdown(!fromLoginDateDropdown);
  };

  const handleDropdownFromLogin = (name) => {
    setDefaultFromLoginDateDropdownText(name);
    setFromLoginDateDropdown(!fromLoginDateDropdown);
    editLogs((prev) => ({
      ...prev,
      name: name,
    }));
  };

  // USERNAME DUMMY DATA
  const toLoginDate = [
    { key: 1, name: '09/10/2023' },
    { key: 2, name: '09/10/2023' },
    { key: 3, name: '09/10/2023' },
  ];

  // TOGGLE USERNAME DROPDOWN
  const toggleDropdownToLogin = () => {
    setToLoginDateDropdown(!toLoginDateDropdown);
  };

  const handleDropdownToLogin = (name) => {
    setDefaultToLoginDateDropdownText(name);
    setToLoginDateDropdown(!toLoginDateDropdown);
    editLogs((prev) => ({
      ...prev,
      name: name,
    }));
  };

  return (
    <div className="flex flex-col m-3 overflow-x-auto overflow-y-hidden">
      <div className="flex py-2 px-3 items-center justify-between bg-white rounded-md shadow-md">
        <h1 className="text-xl">Add Login Logs</h1>
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
            Login Logs Information
          </h2>

          {/* -------------Client Logs Information STARTS FROM HERE------------- */}
          {/* -------------6------------- */}
          {/* -------------Street------------- */}
          <div className="grid gap-2 p-2 pb-3">
            <div className="flex space-x-4">
              <div className="flex flex-col w-1/2">
                {/* FROM LOGIN DATE DROPDOWN */}
                <label
                  htmlFor="fullName"
                  className="text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={editLogs.fullName}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
            </div>
            {/* DROPDOWNS */}
            <div className="flex space-x-4">
              {/* FROM LOGIN DROPDOWN */}
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-700 mt-2"
                >
                  From Login Date
                </label>
                <div
                  className="relative"
                  onClick={toggleDropdownFromLogin}
                  onMouseLeave={() => setFromLoginDateDropdown(false)}
                >
                  <button
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                    id="username"
                    type="button"
                  >
                    {isEditMode
                      ? editLogs.fromLoginDate
                      : defaultFromLoginDateDropdownText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {fromLoginDateDropdown && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {fromLoginDate.map(({ key, name }) => (
                          <li
                            className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer z-10"
                            key={key}
                            onClick={() => handleDropdownFromLogin(name)}
                          >
                            {name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* TO LOGIN DROPDOWN */}
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="toLoginDate"
                  className="text-sm font-medium text-gray-700 mt-2"
                >
                  To Login Date
                </label>
                <div
                  className="relative"
                  onClick={toggleDropdownToLogin}
                  onMouseLeave={() => setToLoginDateDropdown(false)}
                >
                  <button
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                    id="toLoginDate"
                    type="button"
                  >
                    {isEditMode
                      ? editLogs.toLoginDate
                      : defaultToLoginDateDropdownText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {toLoginDateDropdown && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {toLoginDate.map(({ key, name }) => (
                          <li
                            className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer z-10"
                            key={key}
                            onClick={() => handleDropdownToLogin(name)}
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