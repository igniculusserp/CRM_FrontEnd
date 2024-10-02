// REACT - ROUTER - DOM
import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import { Link } from 'react-router-dom';

export default function CreateExtension() {
  const [description, setDescription] = useState('Hello, ');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editExtension, setEditExtension] = useState({
    username: '',
    givenTime: '',
    extensionNumber: '',
  });

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditExtension({
      ...editExtension,
      [name]: value,
    });
  };

  // HANDLE FORM SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  //   DROPDOWNS
  const [usernameDropdown, setUsernameDropdown] = useState(false);
  const [defaultUsernameDropdownText, setDefaultUsernameDropdownText] =
    useState('Username');
  const [extensionNumberDropdown, setExtensionNumberDropdown] = useState(false);
  const [defaultExtensionNuberDropdownText, setDefaultExtensionNuberDropdownText] =
    useState('Username');

  // USERNAME DUMMY DATA
  const usernameData = [
    { key: 1, name: 'Shubham Mishra' },
    { key: 2, name: 'Shubham Mishra' },
    { key: 3, name: 'Shubham Mishra' },
  ];

  // TOGGLE USERNAME DROPDOWN
  const toggleDropdownUsername = () => {
    setUsernameDropdown(!usernameDropdown);
  };

  const handleDropdownUsername = (name) => {
    setDefaultUsernameDropdownText(name);
    setUsernameDropdown(!usernameDropdown);
    editExtension((prev) => ({
      ...prev,
      name: name,
    }));
  };

    // USERNAME DUMMY DATA
    const extensionNumberData = [
        { key: 1, name: 45 },
        { key: 2, name: 45 },
        { key: 3, name: 45 },
      ];
    
      // TOGGLE USERNAME DROPDOWN
      const toggleDropdownExtensionNumber = () => {
        setExtensionNumberDropdown(!extensionNumberDropdown);
      };
    
      const handleDropdownExtensionNumber = (name) => {
        setDefaultExtensionNuberDropdownText(name);
        setExtensionNumberDropdown(!extensionNumberDropdown);
        editExtension((prev) => ({
          ...prev,
          name: name,
        }));
      };

  return (
    <>
      {/* TOP SECTION */}
      <div className="px-3 py-4 bg-white rounded-md flex items-center justify-between m-3">
        <h1 className="text-xl font-bold">Add Extension Logs</h1>
        <Link to="/sidebar/logs">
          <button className="px-6 py-2 text-center text-sm border border-blue-600 text-blue-600 rounded-md">
            Cancel
          </button>
        </Link>
      </div>

      {/* FORM SECTION */}
      <div className="px-3">
        <h1 className="py-2 px-3 font-medium rounded-t-xl bg-cyan-500 text-white text-md shadow-md">
          Extension Logs Information
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3 bg-white px-4 py-2 pb-4 rounded-b-xl shadow-md">
            <div className="flex-1 flex gap-4">
              {/* --------------------------- LEFT SIDE --------------------------- */}
              <div className="flex-1 flex flex-col">
                {/* --------------------------- FORM USERNAME DROPDOWN --------------------------- */}
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-700"
                >
                  User Name
                </label>
                <div
                  className="relative"
                  onClick={toggleDropdownUsername}
                  onMouseLeave={() => setUsernameDropdown(false)}
                >
                  <button
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                    id="username"
                    type="button"
                  >
                    {isEditMode
                      ? editExtension.username
                      : defaultUsernameDropdownText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {usernameDropdown && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-11 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {usernameData.map(({ key, name }) => (
                          <li
                            key={key}
                            onClick={() => handleDropdownUsername(name)}
                            className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                          >
                            {name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {/* --------------------------- MESSAGE FIELD --------------------------- */}
                <label
                  htmlFor="givenTime"
                  className="text-sm font-medium text-gray-700"
                >
                  Given Time
                </label>
                <input
                  type="text"
                  id="givenTime"
                  name="givenTime"
                  value={editExtension.givenTime}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  placeholder="Given Time"
                  onChange={handleChange}
                />
                {/* --------------------------- FROM CHAT DATE DROPDOWN --------------------------- */}
              </div>
            </div>
            {/* --------------------------- RIGHT SIDE --------------------------- */}
            <div className="flex-1 flex flex-col">
              {/* --------------------------- TO USERNAME DROPDOWN --------------------------- */}
              <label
                htmlFor="extensionNumber"
                className="text-sm font-medium text-gray-700"
              >
                Extension Number
              </label>
              <div
                className="relative"
                onClick={toggleDropdownExtensionNumber}
                onMouseLeave={() => setExtensionNumberDropdown(false)}
              >
                <button
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                  id="extensionNumber"
                  type="button"
                >
                  {isEditMode ? editExtension.extensionNumber : defaultExtensionNuberDropdownText}
                  <FaAngleDown className="ml-2 text-gray-400" />
                </button>
                {extensionNumberDropdown && (
                  <div className="absolute w-full bg-white border border-gray-300 rounded-md top-11 z-10">
                    <ul className="py-2 text-sm text-gray-700">
                      {extensionNumberData.map(({ key, name }) => (
                        <li
                          key={key}
                          onClick={() => handleDropdownExtensionNumber(name)}
                          className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
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
