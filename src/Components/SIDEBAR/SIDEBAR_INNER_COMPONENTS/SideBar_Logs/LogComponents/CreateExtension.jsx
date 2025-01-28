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
    <div className="m-3 flex flex-col overflow-x-auto overflow-y-hidden">
      <div className="flex items-center justify-between rounded-md bg-white px-3 py-2 shadow-md">
        <h1 className="text-xl">Add Extension Logs</h1>
        <Link
          to="/panel/logs"
          className="mx-3 rounded border border-blue-500 px-4 py-1 text-blue-500"
        >
          Cancel
        </Link>
      </div>
      {/* -------------FORM Starts FROM HERE------------- */}
      <form onSubmit={handleSubmit} className="mb-6 flex flex-col">
        {/* -------------Client Logs Information STARTS FROM HERE------------- */}
        <div className="my-3 flex-grow rounded-xl bg-white shadow-md">
          <h2 className="rounded-t-xl bg-cyan-500 px-3 py-2 font-medium text-white">
            Extension Logs Information
          </h2>

          {/* -------------Client Logs Information STARTS FROM HERE------------- */}
          {/* -------------6------------- */}
          {/* -------------Street------------- */}
          <div className="grid gap-2 px-2 pb-3">
            {/* DROPDOWNS */}
            <div className="flex space-x-4">
              {/* USERNAME DROPDOWN */}
              <div className="flex w-1/2 flex-col">
                <label
                  htmlFor="username"
                  className="mt-2 text-sm font-medium text-gray-700"
                >
                  User Name
                </label>
                <div
                  className="relative"
                  onClick={toggleDropdownUsername}
                  onMouseLeave={() => setUsernameDropdown(false)}
                >
                  <button
                    className="mt-1 flex w-full items-center justify-between rounded-md border border-gray-300 p-2"
                    id="username"
                    type="button"
                  >
                    {isEditMode
                      ? editExtension.username
                      : defaultUsernameDropdownText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {usernameDropdown && (
                    <div className="absolute top-10 z-10 w-full rounded-md border border-gray-300 bg-white">
                      <ul className="py-2 text-sm text-gray-700">
                        {usernameData.map(({ key, name }) => (
                          <li
                            className="z-10 block cursor-pointer border-b px-4 py-2 hover:bg-cyan-500 hover:text-white"
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
              <div className="flex w-1/2 flex-col">
                <label
                  htmlFor="extensionNumber"
                  className="mt-2 text-sm font-medium text-gray-700"
                >
                  Extension Number
                </label>
                <div
                  className="relative"
                  onClick={toggleDropdownExtensionNumber}
                  onMouseLeave={() => setExtensionNumberDropdown(false)}
                >
                  <button
                    className="mt-1 flex w-full items-center justify-between rounded-md border border-gray-300 p-2"
                    id="extensionNumber"
                    type="button"
                  >
                    {isEditMode
                      ? editExtension.extensionNumber
                      : defaultExtensionNuberDropdownText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {extensionNumberDropdown && (
                    <div className="absolute top-10 z-10 w-full rounded-md border border-gray-300 bg-white">
                      <ul className="py-2 text-sm text-gray-700">
                        {extensionNumberData.map(({ key, name }) => (
                          <li
                            className="z-10 block cursor-pointer border-b px-4 py-2 hover:bg-cyan-500 hover:text-white"
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
              <div className="flex w-1/2 flex-col">
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
                  className="mt-1 rounded-md border border-gray-300 p-2"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
            </div>
          </div>
        </div>
        {/* DESCRIPTION */}
        <div className="rounded-xl bg-white shadow-md">
          <h2 className="rounded-t-xl bg-cyan-500 px-4 py-2 font-medium text-white">
            Description Information
          </h2>
          <div className="p-2">
            <div className="flex flex-col">
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <ReactQuill
                name="description"
                value={description}
                className="mt-1 h-60 max-h-full hyphens-auto text-balance"
                theme="snow"
                onChange={setDescription}
                placeholder="Add Description"
              />
            </div>
          </div>
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
  );
}
