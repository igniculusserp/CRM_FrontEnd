// REACT - ROUTER - DOM
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import ReactQuill from "react-quill";
import { Link } from "react-router-dom";

export default function CreateExtension() {
  const [description, setDescription] = useState("Hello, ");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editExtension, setEditExtension] = useState({
    username: "",
    givenTime: "",
    extensionNumber: "",
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
    useState("Username");
  const [extensionNumberDropdown, setExtensionNumberDropdown] = useState(false);
  const [
    defaultExtensionNuberDropdownText,
    setDefaultExtensionNuberDropdownText,
  ] = useState("Username");

  // USERNAME DUMMY DATA
  const usernameData = [
    { key: 1, name: "Shubham Mishra" },
    { key: 2, name: "Shubham Mishra" },
    { key: 3, name: "Shubham Mishra" },
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
    <div className="flex flex-col m-3 overflow-x-auto overflow-y-hidden">
      <div className="flex py-2 px-3 items-center justify-between bg-white rounded-md shadow-md">
        <h1 className="text-xl">Add Extension Logs</h1>
        <Link
          to="/panel/logs"
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
            Extension Logs Information
          </h2>

          {/* -------------Client Logs Information STARTS FROM HERE------------- */}
          {/* -------------6------------- */}
          {/* -------------Street------------- */}
          <div className="grid gap-2 px-2 pb-3">
            {/* DROPDOWNS */}
            <div className="flex space-x-4">
              {/* USERNAME DROPDOWN */}
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-700 mt-2"
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
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {usernameData.map(({ key, name }) => (
                          <li
                            className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer z-10"
                            key={key}
                            onClick={() => handleDropdownUsername(name)}
                          >
                            {name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              {/* EXTENSION NUMBER DROPDOWN */}
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="extensionNumber"
                  className="text-sm font-medium text-gray-700 mt-2"
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
                    {isEditMode
                      ? editExtension.extensionNumber
                      : defaultExtensionNuberDropdownText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {extensionNumberDropdown && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {extensionNumberData.map(({ key, name }) => (
                          <li
                            className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer z-10"
                            key={key}
                            onClick={() => handleDropdownExtensionNumber(name)}
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
            <div className="flex space-x-4">
              <div className="flex flex-col w-1/2">
                {/* GIVEN TIME FIELD */}
                <label
                  htmlFor="givenTime"
                  className="text-sm font-medium text-gray-700"
                >
                  Given Time
                </label>
                <input
                  type="text"
                  name="givenTime"
                  id="givenTime"
                  value={editExtension.givenTime}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
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
              {isEditMode ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
