import { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import ReactQuill from "react-quill";
import { Link } from "react-router-dom";

export default function CreateLogin() {
     //--------------------------------------- Set Business Type --------------------------------------------
                               const [BusinessType, setBusinessType] = useState("");
                                
                               useEffect(() => {
                                 const storedType = localStorage.getItem("businessType") || "";
                                 setBusinessType(storedType);
                               }, []);
  const [description, setDescription] = useState("Hello, ");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editLogs, setEditLogs] = useState({
    fullName: "",
    fromLoginDate: "",
    toLoginDate: "",
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
  ] = useState("From Login Date");
  const [toLoginDateDropdown, setToLoginDateDropdown] = useState(false);
  const [defaultToLoginDateDropdownText, setDefaultToLoginDateDropdownText] =
    useState("To Login Date");

  // USERNAME DUMMY DATA
  const fromLoginDate = [
    { key: 1, name: "09/10/2023" },
    { key: 2, name: "09/10/2023" },
    { key: 3, name: "09/10/2023" },
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
    { key: 1, name: "09/10/2023" },
    { key: 2, name: "09/10/2023" },
    { key: 3, name: "09/10/2023" },
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
    <div className="m-3 flex flex-col overflow-x-auto overflow-y-hidden">
      <div className="flex items-center justify-between rounded-md bg-white px-3 py-2 shadow-md">
        <h1 className="text-xl">Add Login Logs</h1>
        <Link
          to={`/panel/${BusinessType}/logs`}
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
            Login Logs Information
          </h2>

          {/* -------------Client Logs Information STARTS FROM HERE------------- */}
          {/* -------------6------------- */}
          {/* -------------Street------------- */}
          <div className="grid gap-2 p-2 pb-3">
            <div className="flex space-x-4">
              <div className="flex w-1/2 flex-col">
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
                  className="mt-1 rounded-md border border-gray-300 p-2"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
            </div>
            {/* DROPDOWNS */}
            <div className="flex space-x-4">
              {/* FROM LOGIN DROPDOWN */}
              <div className="flex w-1/2 flex-col">
                <label
                  htmlFor="username"
                  className="mt-2 text-sm font-medium text-gray-700"
                >
                  From Login Date
                </label>
                <div
                  className="relative"
                  onClick={toggleDropdownFromLogin}
                  onMouseLeave={() => setFromLoginDateDropdown(false)}
                >
                  <button
                    className="mt-1 flex w-full items-center justify-between rounded-md border border-gray-300 p-2"
                    id="username"
                    type="button"
                  >
                    {isEditMode
                      ? editLogs.fromLoginDate
                      : defaultFromLoginDateDropdownText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {fromLoginDateDropdown && (
                    <div className="absolute top-10 z-10 w-full rounded-md border border-gray-300 bg-white">
                      <ul className="py-2 text-sm text-gray-700">
                        {fromLoginDate.map(({ key, name }) => (
                          <li
                            className="z-10 block cursor-pointer border-b px-4 py-2 hover:bg-cyan-500 hover:text-white"
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
              <div className="flex w-1/2 flex-col">
                <label
                  htmlFor="toLoginDate"
                  className="mt-2 text-sm font-medium text-gray-700"
                >
                  To Login Date
                </label>
                <div
                  className="relative"
                  onClick={toggleDropdownToLogin}
                  onMouseLeave={() => setToLoginDateDropdown(false)}
                >
                  <button
                    className="mt-1 flex w-full items-center justify-between rounded-md border border-gray-300 p-2"
                    id="toLoginDate"
                    type="button"
                  >
                    {isEditMode
                      ? editLogs.toLoginDate
                      : defaultToLoginDateDropdownText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {toLoginDateDropdown && (
                    <div className="absolute top-10 z-10 w-full rounded-md border border-gray-300 bg-white">
                      <ul className="py-2 text-sm text-gray-700">
                        {toLoginDate.map(({ key, name }) => (
                          <li
                            className="z-10 block cursor-pointer border-b px-4 py-2 hover:bg-cyan-500 hover:text-white"
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
