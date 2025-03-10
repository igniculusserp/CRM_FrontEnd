import { useState,useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import ReactQuill from "react-quill";
import { Link } from "react-router-dom";

export default function CreateLogs() {
     //--------------------------------------- Set Business Type --------------------------------------------
                               const [BusinessType, setBusinessType] = useState("");
                                
                               useEffect(() => {
                                 const storedType = localStorage.getItem("businessType") || "";
                                 setBusinessType(storedType);
                               }, []);
  const [description, setDescription] = useState("HELLO, ");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editLogs, setEditLogs] = useState({
    number: "",
    createdBy: "",
    createdTime: "",
    clientName: "",
    operation: "",
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
    useState("client name");

  // CLIENT NAME DATA =>
  const clientNameData = [
    { key: 1, name: "Shubham Mishra" },
    { key: 2, name: "Shubham Mishra" },
    { key: 3, name: "Shubham Mishra" },
    { key: 4, name: "Shubham Mishra" },
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
    <div className="m-3 flex flex-col overflow-x-auto overflow-y-hidden">
      <div className="flex items-center justify-between rounded-md bg-white px-3 py-2 shadow-md">
        <h1 className="text-xl">Add Client Logs</h1>
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
            Client Logs Information
          </h2>

          {/* -------------Client Logs Information STARTS FROM HERE------------- */}
          {/* -------------6------------- */}
          {/* -------------Street------------- */}
          <div className="grid gap-2 p-2">
            <div className="flex space-x-4">
              {/* CALL STATUS DROPDOWN */}
              <div className="flex w-1/2 flex-col">
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
                  className="mt-1 rounded-md border border-gray-300 p-2"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
              {/* TEXT MESSAGE DROPDOWN */}
              <div className="flex w-1/2 flex-col">
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
                  className="mt-1 rounded-md border border-gray-300 p-2"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
            </div>
            {/* INPUT FIELDS */}
            <div className="flex space-x-4">
              {/* CREATED TIME FIELD */}
              <div className="flex w-1/2 flex-col">
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
                  className="mt-1 rounded-md border border-gray-300 p-2"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
              {/* OPERATION FIELD */}
              <div className="flex w-1/2 flex-col">
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
                  className="mt-1 rounded-md border border-gray-300 p-2"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
            </div>
            {/* DROPDOWN */}
            <div className="flex flex-col">
              <div className="flex w-1/2 flex-col">
                {/* TEXT MESSAGE DROPDOWN */}
                <label
                  htmlFor="clientName"
                  className="text-sm font-medium text-gray-700"
                >
                  Text Message
                </label>
                <div
                  className="relative"
                  onClick={toggleDropdownClientName}
                  onMouseLeave={() => setClientNameDropdown(false)}
                >
                  <button
                    className="mt-1 flex w-full items-center justify-between rounded-md border border-gray-300 p-2"
                    id="clientName"
                    type="button"
                  >
                    {isEditMode ? editLogs.clientName : defaultClientNameText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {clientNameDropdown && (
                    <div className="absolute top-10 z-10 w-full rounded-md border border-gray-300 bg-white">
                      <ul className="py-2 text-sm text-gray-700">
                        {clientNameData.map(({ key, name }) => (
                          <li
                            className="z-10 block cursor-pointer border-b px-4 py-2 hover:bg-cyan-500 hover:text-white"
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
