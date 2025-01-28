import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function Dlp() {
  const [activeComponent, setActiveComponent] = useState("Table");
  const [idGet, setIdGet] = useState("");

  const handleAdd = () => {
    setActiveComponent("Add");
  };

  const handleCancel = () => {
    setActiveComponent("Table");
  };

  const handleEdit = (id) => {
    setActiveComponent("Update");
    setIdGet(id);
  };

  const data = [
    {
      id: 1,
      title: "Global Hunt",
      createdBy: "12/03/2023",
      modifiedOn: "14/03/2023",
    },
    {
      id: 2,
      title: "Global Hunt",
      createdBy: "12/03/2023",
      modifiedOn: "14/03/2023",
    },
    {
      id: 3,
      title: "Global Hunt",
      createdBy: "12/03/2023",
      modifiedOn: "14/03/2023",
    },
    {
      id: 4,
      title: "Global Hunt",
      createdBy: "12/03/2023",
      modifiedOn: "14/03/2023",
    },
    {
      id: 5,
      title: "Global Hunt",
      createdBy: "12/03/2023",
      modifiedOn: "14/03/2023",
    },
    {
      id: 6,
      title: "Global Hunt",
      createdBy: "12/03/2023",
      modifiedOn: "14/03/2023",
    },
    {
      id: 7,
      title: "Global Hunt",
      createdBy: "12/03/2023",
      modifiedOn: "14/03/2023",
    },
    {
      id: 8,
      title: "Global Hunt",
      createdBy: "12/03/2023",
      modifiedOn: "14/03/2023",
    },
    {
      id: 9,
      title: "Global Hunt",
      createdBy: "12/03/2023",
      modifiedOn: "14/03/2023",
    },
    {
      id: 10,
      title: "Global Hunt",
      createdBy: "12/03/2023",
      modifiedOn: "14/03/2023",
    },
    {
      id: 11,
      title: "Global Hunt",
      createdBy: "12/03/2023",
      modifiedOn: "14/03/2023",
    },
  ];

  const DlpTable = () => {
    return (
      <div className="m-3 min-w-screen">
        <div className="flex min-w-screen justify-between items-center flex-wrap gap-5">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-medium">DLP</h1>
            <h2 className="text-xl font-medium text-red-500 text-center">
              (This feature is coming soon...)
            </h2>
          </div>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white p-2 min-w-10 text-sm rounded"
          >
            Add Policy
          </button>
        </div>
        <div className="overflow-x-auto mt-3 shadow-md leads_Table_Main_Container">
          <div className="min-w-full rounded-md leads_Table_Container">
            <table className="min-w-full bg-white leads_Table">
              <thead>
                <tr className="border-gray-300 border-b-2">
                  <th className="px-1 py-3">
                    <input type="checkbox" />
                  </th>
                  <th className="px-2 py-3 text-left border-r font-medium">
                    <div className="flex justify-between items-center text-sm">
                      <span>Title</span>
                      <FaBars />
                    </div>
                  </th>
                  <th className="px-2 py-3 text-left border-r font-medium">
                    <div className="flex justify-between items-center text-sm">
                      <span>Created By</span>
                      <FaBars />
                    </div>
                  </th>
                  <th className="px-2 py-3 text-left border-r font-medium">
                    <div className="flex justify-between items-center text-sm">
                      <span>Modified On</span>
                      <FaBars />
                    </div>
                  </th>
                  <th className="px-2 py-3 text-left border-r font-medium">
                    <div className="flex justify-between items-center text-sm">
                      <span>Action</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((device) => (
                  <tr
                    key={device.id}
                    className="cursor-pointer hover:bg-gray-200 border-gray-300 border-b"
                  >
                    <td className="px-1 py-3 text-center">
                      <input type="checkbox" />
                    </td>
                    <td className="px-2 py-4 text-sm max-w-24 break-words">
                      {device.title}
                    </td>
                    <td className="px-2 py-4 text-sm max-w-24 break-words">
                      {device.createdBy}
                    </td>
                    <td className="px-2 py-4 text-sm max-w-24 break-words">
                      {device.modifiedOn}
                    </td>
                    <td className="px-2 py-4 flex gap-3 justify-center">
                      <MdEdit
                        size={25}
                        color="white"
                        className="bg-blue-500 rounded"
                        onClick={() => handleEdit(device.id)}
                      />
                      <RiDeleteBin6Fill size={25} color="red" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const AddDlp = () => {
    const [addDlp, setAddDlp] = useState({
      title: "",
      description: "",
      validFrom: "",
      validTo: "",
      idleTimeoutIntervalHours: "",
      sessionDuration: "",
      minutes: "",
    });

    // Handle input changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setAddDlp((prevDevice) => ({
        ...prevDevice,
        [name]: value,
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
    };

    const [selectedId, setSelectedId] = useState(1);

    const buttons = [
      { id: 1, text: "Session Time out" },
      { id: 2, text: "Dropbox" },
      { id: 3, text: "G Suite" },
    ];

    const handleOptionClick = (id) => {
      setSelectedId(id);
    };

    const tableData = [
      "Access Control Browser Violation",
      "Access Control Geo Violation",
      "Access Control IP Violation",
      "Access Control Mobile Geo Violation",
      "Access Control Mobile IP Violation",
      "Access Control Mobile Network Violation",
    ];

    const gTableData = [
      "Across OU Sharing",
      "Clipboard",
      "Countainerize  Drive",
      "Containerize Email",
      "Delete",
      "Download",
    ];

    return (
      <div className="flex flex-col m-3 overflow-x-auto overflow-y-hidden">
        <div className="flex py-2 px-2 items-center justify-between bg-white rounded-md shadow-md">
          <h1 className="text-xl">Add Policy</h1>
          <div
            onClick={handleCancel}
            className="px-4 py-1 rounded mx-3 border border-blue-500 text-blue-500"
          >
            Cancel
          </div>
        </div>
        <div className="overflow-hidden shadow-md">
          <div className="py-2 px-3 bg-cyan-500 rounded-t-xl mt-3">
            <h1 className="text-white">Access Policy</h1>
          </div>
          {/* CREATE DLP FORM */}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col py-2 px-4 bg-white rounded-b-xl">
              <div className="flex gap-4">
                <div className="grid gap-2 pb-3 w-full">
                  <div className="flex space-x-4">
                    {/* TITLE */}
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="title"
                        className="text-sm font-medium text-gray-700"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={addDlp.title}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Enter device type"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      {/* DESCRIPTION */}
                      <label
                        htmlFor="description"
                        className="text-sm font-medium text-gray-700"
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        name="description"
                        value={addDlp.description}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Enter device type"
                      />
                    </div>
                  </div>
                  {/* SECOND */}
                  <div className="flex space-x-4">
                    {/* TITLE */}
                    <div className="flex flex-col w-1/2 gap-1">
                      <label
                        htmlFor="unmanagedDevice"
                        className="text-sm font-medium text-gray-700"
                      >
                        Unmanaged Device
                      </label>
                      <input
                        type="checkbox"
                        name="unmanagedDevice"
                        className="flex justify-start py-1 px-1 h-5 w-5"
                      />
                    </div>
                    <div className="flex flex-col w-1/2 gap-1">
                      {/* DESCRIPTION */}
                      <label
                        htmlFor="enabled"
                        className="text-sm font-medium text-gray-700"
                      >
                        Enabled
                      </label>
                      <input
                        type="checkbox"
                        name="enabled"
                        className="flex justify-start py-1 px-1 h-5 w-5"
                      />
                    </div>
                  </div>
                  {/* THIRD */}
                  <div className="flex space-x-4">
                    {/* TITLE */}
                    <div className="flex flex-col w1/2 gap-1 justify-start items-start">
                      <label
                        htmlFor="validAlways"
                        className="text-sm font-medium text-gray-700"
                      >
                        Valid Always
                      </label>
                      <input
                        type="checkbox"
                        name="validAlways"
                        className="flex justify-start py-1 px-1 h-5 w-5"
                      />
                    </div>
                  </div>
                  {/* FOURTH */}
                  <div className="flex space-x-4">
                    {/* Valid From */}
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="validFrom"
                        className="text-sm font-medium text-gray-700"
                      >
                        Valid From
                      </label>
                      <input
                        type="text"
                        name="validFrom"
                        value={addDlp.validFrom}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Enter device type"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      {/* Valid To */}
                      <label
                        htmlFor="validTo"
                        className="text-sm font-medium text-gray-700"
                      >
                        Valid To
                      </label>
                      <input
                        type="text"
                        name="validTo"
                        value={addDlp.validTo}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Enter device type"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-5">
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-32 py-4 mt-20 mb-4 bg-cyan-500 text-white hover:text-cyan-500 hover:bg-white border-2 border-cyan-500 rounded"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
            {/* SECOND SECTION */}
            <div className="flex gap-3 mt-3">
              <h1 className="text-2xl font-medium">Agent</h1>
              {buttons.map(({ id, text }) => (
                <button
                  key={id}
                  onClick={() => handleOptionClick(id)}
                  className={`px-3 py-2 rounded font-light text-md
                ${
                  selectedId === id
                    ? "bg-cyan-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }
              `}
                >
                  {text}
                </button>
              ))}
            </div>
            {/* SESSION TIMEOUT FIELDS */}
            {selectedId === 1 && (
              <>
                <div className="py-2 px-6 bg-cyan-500 rounded-t-xl mt-3">
                  <h1 className="text-white">Session Time out</h1>
                </div>
                <div className="flex flex-col py-2 px-4 bg-white rounded-b-xl">
                  <div className="flex gap-4">
                    <div className="grid gap-2 pb-3 w-full">
                      <div className="flex space-x-4">
                        {/* UNMANAGED DEVICE */}
                        <div className="flex flex-col w-1/2">
                          <label
                            htmlFor="unmanagedDevice"
                            className="text-sm font-medium text-gray-700"
                          >
                            Unmanaged Device
                          </label>
                          <input
                            type="checkbox"
                            name="unmanagedDevice"
                            className="flex justify-start py-1 px-1 h-5 w-5"
                          />
                        </div>
                      </div>
                      {/* SECOND */}
                      <div className="flex space-x-4">
                        {/* Idle Timeout Interval (Hours) */}
                        <div className="flex flex-col w-1/2">
                          <label
                            htmlFor="idleTimeoutIntervalHours"
                            className="text-sm font-medium text-gray-700"
                          >
                            Idle Timeout Interval(Hours)
                          </label>
                          <input
                            type="text"
                            name="idleTimeoutIntervalHours"
                            value={addDlp.idleTimeoutIntervalHours}
                            className="mt-1 p-2 border border-gray-300 rounded-md"
                            onChange={handleChange}
                            placeholder="Enter device type"
                          />
                        </div>
                        <div className="flex flex-col w-1/2">
                          {/* Minutes */}
                          <label
                            htmlFor="minutes"
                            className="text-sm font-medium text-gray-700"
                          >
                            Minutes
                          </label>
                          <input
                            type="text"
                            name="minutes"
                            value={addDlp.minutes}
                            className="mt-1 p-2 border border-gray-300 rounded-md"
                            onChange={handleChange}
                            placeholder="Enter device type"
                          />
                        </div>
                      </div>
                      {/* THIRD */}
                      <div className="flex space-x-4 w-full">
                        {/* Session Duration (Hours) */}
                        <div className="flex flex-col w1/2 w-full">
                          <label
                            htmlFor="sessionDuration"
                            className="text-sm font-medium text-gray-700"
                          >
                            Session Duration(Hours)
                          </label>
                          <input
                            type="text"
                            name="sessionDuration"
                            value={addDlp.sessionDuration}
                            className="mt-1 p-2 border border-gray-300 rounded-md"
                            onChange={handleChange}
                            placeholder="Enter device type"
                          />
                        </div>
                        {/* Minutes */}
                        <div className="flex flex-col w1/2 w-full">
                          <label
                            htmlFor="minutes"
                            className="text-sm font-medium text-gray-700"
                          >
                            Minutes
                          </label>
                          <input
                            type="text"
                            name="minutes"
                            value={addDlp.minutes}
                            className="mt-1 p-2 border border-gray-300 rounded-md"
                            onChange={handleChange}
                            placeholder="Enter device type"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-5">
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-32 py-4 mt-20 mb-4 bg-cyan-500 text-white hover:text-cyan-500 hover:bg-white border-2 border-cyan-500 rounded"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* DROPBOX */}
            {selectedId === 2 && (
              <>
                <div className="bg-white rounded-xl">
                  <h1 className="text-white py-2 px-6 bg-cyan-500 rounded-t-xl mt-3">
                    Dropbox
                  </h1>
                  <div className="mx-3 mt-3 mb-6 py-3 flex flex-col gap-2">
                    <div className="overflow-x-auto rounded-t-xl">
                      <table className="min-w-full table-auto">
                        <thead>
                          <tr className="bg-cyan-500 rounded-t-xl">
                            <th className="px-4 py-2 text-white font-light">
                              Event name
                            </th>
                            <th className="px-4 py-2 text-white font-light">
                              Red
                            </th>
                            <th className="px-4 py-2 text-white font-light">
                              Green
                            </th>
                            <th className="px-4 py-2 text-white font-light">
                              Amber
                            </th>
                            <th className="px-4 py-2 text-white font-light">
                              None
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {tableData.map((item, idx) => (
                            <tr key={idx} className="bg-gray-100 border-b">
                              <td className="px-4 py-2">{item}</td>
                              <td className="px-4 py-2 text-center">
                                <input
                                  type="checkbox"
                                  className="form-checkbox"
                                />
                              </td>
                              <td className="px-4 py-2 text-center">
                                <input
                                  type="checkbox"
                                  className="form-checkbox"
                                />
                              </td>
                              <td className="px-4 py-2 text-center">
                                <input
                                  type="checkbox"
                                  className="form-checkbox"
                                />
                              </td>
                              <td className="px-4 py-2 text-center">
                                <input
                                  type="checkbox"
                                  className="form-checkbox"
                                  defaultChecked
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* G SUITE */}
            {selectedId === 3 && (
              <>
                <div className="bg-white rounded-xl">
                  <h1 className="text-white py-2 px-6 bg-cyan-500 rounded-t-xl mt-3">
                    G Suit
                  </h1>
                  <div className="mx-3 mt-3 mb-6 py-3 flex flex-col gap-2">
                    <div className="overflow-x-auto rounded-t-xl">
                      <table className="min-w-full table-auto">
                        <thead>
                          <tr className="bg-cyan-500 rounded-t-xl">
                            <th></th>
                            <th className="px-4 py-2 text-white font-light">
                              None
                            </th>
                            <th className="px-4 py-2 text-white font-light">
                              Track
                            </th>
                            <th className="px-4 py-2 text-white font-light">
                              Block
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {gTableData.map((item, idx) => (
                            <tr key={idx} className="bg-gray-100 border-b">
                              <td className="px-4 py-2">{item}</td>
                              <td className="px-4 py-2 text-center">
                                <input
                                  type="checkbox"
                                  className="form-checkbox"
                                />
                              </td>
                              <td className="px-4 py-2 text-center">
                                <input
                                  type="checkbox"
                                  className="form-checkbox"
                                />
                              </td>
                              <td className="px-4 py-2 text-center">
                                <input
                                  type="checkbox"
                                  className="form-checkbox"
                                  defaultChecked
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    );
  };

  const UpdateDlp = () => {
    const [addDlp, setAddDlp] = useState({
      id: "",
      title: "",
      description: "",
      validFrom: "",
      validTo: "",
      idleTimeoutIntervalHours: "",
      sessionDuration: "",
      minutes: "",
    });

    // Handle input changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setAddDlp((prevDevice) => ({
        ...prevDevice,
        [name]: value,
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
    };

    const [selectedId, setSelectedId] = useState(1);

    const buttons = [
      { id: 1, text: "Session Time out" },
      { id: 2, text: "Dropbox" },
      { id: 3, text: "G Suite" },
    ];

    const handleOptionClick = (id) => {
      setSelectedId(id);
    };

    const tableData = [
      "Access Control Browser Violation",
      "Access Control Geo Violation",
      "Access Control IP Violation",
      "Access Control Mobile Geo Violation",
      "Access Control Mobile IP Violation",
      "Access Control Mobile Network Violation",
    ];

    const gTableData = [
      "Across OU Sharing",
      "Clipboard",
      "Countainerize  Drive",
      "Containerize Email",
      "Delete",
      "Download",
    ];

    return (
      <div className="flex flex-col m-3 overflow-x-auto overflow-y-hidden">
        <div className="flex py-2 px-2 items-center justify-between bg-white rounded-md shadow-md">
          <h1 className="text-xl">Add Policy</h1>
          <div
            onClick={handleCancel}
            className="px-4 py-1 rounded mx-3 border border-blue-500 text-blue-500"
          >
            Cancel
          </div>
        </div>
        <div className="overflow-hidden shadow-md">
          <div className="py-2 px-3 bg-cyan-500 rounded-t-xl mt-3">
            <h1 className="text-white">Access Policy</h1>
          </div>
          {/* CREATE DLP FORM */}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col py-2 px-4 bg-white rounded-b-xl">
              <div className="flex gap-4">
                <div className="grid gap-2 pb-3 w-full">
                  <div className="flex space-x-4">
                    {/* TITLE */}
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="title"
                        className="text-sm font-medium text-gray-700"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={addDlp.title}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Enter device type"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      {/* DESCRIPTION */}
                      <label
                        htmlFor="description"
                        className="text-sm font-medium text-gray-700"
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        name="description"
                        value={addDlp.description}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Enter device type"
                      />
                    </div>
                  </div>
                  {/* SECOND */}
                  <div className="flex space-x-4">
                    {/* TITLE */}
                    <div className="flex flex-col w-1/2 gap-1">
                      <label
                        htmlFor="unmanagedDevice"
                        className="text-sm font-medium text-gray-700"
                      >
                        Unmanaged Device
                      </label>
                      <input
                        type="checkbox"
                        name="unmanagedDevice"
                        className="flex justify-start py-1 px-1 h-5 w-5"
                      />
                    </div>
                    <div className="flex flex-col w-1/2 gap-1">
                      {/* DESCRIPTION */}
                      <label
                        htmlFor="enabled"
                        className="text-sm font-medium text-gray-700"
                      >
                        Enabled
                      </label>
                      <input
                        type="checkbox"
                        name="enabled"
                        className="flex justify-start py-1 px-1 h-5 w-5"
                      />
                    </div>
                  </div>
                  {/* THIRD */}
                  <div className="flex space-x-4">
                    {/* TITLE */}
                    <div className="flex flex-col w1/2 gap-1 justify-start items-start">
                      <label
                        htmlFor="validAlways"
                        className="text-sm font-medium text-gray-700"
                      >
                        Valid Always
                      </label>
                      <input
                        type="checkbox"
                        name="validAlways"
                        className="flex justify-start py-1 px-1 h-5 w-5"
                      />
                    </div>
                  </div>
                  {/* FOURTH */}
                  <div className="flex space-x-4">
                    {/* Valid From */}
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="validFrom"
                        className="text-sm font-medium text-gray-700"
                      >
                        Valid From
                      </label>
                      <input
                        type="text"
                        name="validFrom"
                        value={addDlp.validFrom}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Enter device type"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      {/* Valid To */}
                      <label
                        htmlFor="validTo"
                        className="text-sm font-medium text-gray-700"
                      >
                        Valid To
                      </label>
                      <input
                        type="text"
                        name="validTo"
                        value={addDlp.validTo}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Enter device type"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-5">
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-32 py-4 mt-20 mb-4 bg-cyan-500 text-white hover:text-cyan-500 hover:bg-white border-2 border-cyan-500 rounded"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
            {/* SECOND SECTION */}
            <div className="flex gap-3 mt-3">
              <h1 className="text-2xl font-medium">Agent</h1>
              {buttons.map(({ id, text }) => (
                <button
                  key={id}
                  onClick={() => handleOptionClick(id)}
                  className={`px-3 py-2 rounded font-light text-md
              ${
                selectedId === id
                  ? "bg-cyan-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }
            `}
                >
                  {text}
                </button>
              ))}
            </div>
            {/* SESSION TIMEOUT FIELDS */}
            {selectedId === 1 && (
              <>
                <div className="py-2 px-6 bg-cyan-500 rounded-t-xl mt-3">
                  <h1 className="text-white">Session Time out</h1>
                </div>
                <div className="flex flex-col py-2 px-4 bg-white rounded-b-xl">
                  <div className="flex gap-4">
                    <div className="grid gap-2 pb-3 w-full">
                      <div className="flex space-x-4">
                        {/* UNMANAGED DEVICE */}
                        <div className="flex flex-col w-1/2">
                          <label
                            htmlFor="unmanagedDevice"
                            className="text-sm font-medium text-gray-700"
                          >
                            Unmanaged Device
                          </label>
                          <input
                            type="checkbox"
                            name="unmanagedDevice"
                            className="flex justify-start py-1 px-1 h-5 w-5"
                          />
                        </div>
                      </div>
                      {/* SECOND */}
                      <div className="flex space-x-4">
                        {/* Idle Timeout Interval (Hours) */}
                        <div className="flex flex-col w-1/2">
                          <label
                            htmlFor="idleTimeoutIntervalHours"
                            className="text-sm font-medium text-gray-700"
                          >
                            Idle Timeout Interval(Hours)
                          </label>
                          <input
                            type="text"
                            name="idleTimeoutIntervalHours"
                            value={addDlp.idleTimeoutIntervalHours}
                            className="mt-1 p-2 border border-gray-300 rounded-md"
                            onChange={handleChange}
                            placeholder="Enter device type"
                          />
                        </div>
                        <div className="flex flex-col w-1/2">
                          {/* Minutes */}
                          <label
                            htmlFor="minutes"
                            className="text-sm font-medium text-gray-700"
                          >
                            Minutes
                          </label>
                          <input
                            type="text"
                            name="minutes"
                            value={addDlp.minutes}
                            className="mt-1 p-2 border border-gray-300 rounded-md"
                            onChange={handleChange}
                            placeholder="Enter device type"
                          />
                        </div>
                      </div>
                      {/* THIRD */}
                      <div className="flex space-x-4 w-full">
                        {/* Session Duration (Hours) */}
                        <div className="flex flex-col w1/2 w-full">
                          <label
                            htmlFor="sessionDuration"
                            className="text-sm font-medium text-gray-700"
                          >
                            Session Duration(Hours)
                          </label>
                          <input
                            type="text"
                            name="sessionDuration"
                            value={addDlp.sessionDuration}
                            className="mt-1 p-2 border border-gray-300 rounded-md"
                            onChange={handleChange}
                            placeholder="Enter device type"
                          />
                        </div>
                        {/* Minutes */}
                        <div className="flex flex-col w1/2 w-full">
                          <label
                            htmlFor="minutes"
                            className="text-sm font-medium text-gray-700"
                          >
                            Minutes
                          </label>
                          <input
                            type="text"
                            name="minutes"
                            value={addDlp.minutes}
                            className="mt-1 p-2 border border-gray-300 rounded-md"
                            onChange={handleChange}
                            placeholder="Enter device type"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-5">
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-32 py-4 mt-20 mb-4 bg-cyan-500 text-white hover:text-cyan-500 hover:bg-white border-2 border-cyan-500 rounded"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* DROPBOX */}
            {selectedId === 2 && (
              <>
                <div className="bg-white rounded-xl">
                  <h1 className="text-white py-2 px-6 bg-cyan-500 rounded-t-xl mt-3">
                    Dropbox
                  </h1>
                  <div className="mx-3 mt-3 mb-6 py-3 flex flex-col gap-2">
                    <div className="overflow-x-auto rounded-t-xl">
                      <table className="min-w-full table-auto">
                        <thead>
                          <tr className="bg-cyan-500 rounded-t-xl">
                            <th className="px-4 py-2 text-white font-light">
                              Event name
                            </th>
                            <th className="px-4 py-2 text-white font-light">
                              Red
                            </th>
                            <th className="px-4 py-2 text-white font-light">
                              Green
                            </th>
                            <th className="px-4 py-2 text-white font-light">
                              Amber
                            </th>
                            <th className="px-4 py-2 text-white font-light">
                              None
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {tableData.map((item, idx) => (
                            <tr key={idx} className="bg-gray-100 border-b">
                              <td className="px-4 py-2">{item}</td>
                              <td className="px-4 py-2 text-center">
                                <input
                                  type="checkbox"
                                  className="form-checkbox"
                                />
                              </td>
                              <td className="px-4 py-2 text-center">
                                <input
                                  type="checkbox"
                                  className="form-checkbox"
                                />
                              </td>
                              <td className="px-4 py-2 text-center">
                                <input
                                  type="checkbox"
                                  className="form-checkbox"
                                />
                              </td>
                              <td className="px-4 py-2 text-center">
                                <input
                                  type="checkbox"
                                  className="form-checkbox"
                                  defaultChecked
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* G SUITE */}
            {selectedId === 3 && (
              <>
                <div className="bg-white rounded-xl">
                  <h1 className="text-white py-2 px-6 bg-cyan-500 rounded-t-xl mt-3">
                    G Suit
                  </h1>
                  <div className="mx-3 mt-3 mb-6 py-3 flex flex-col gap-2">
                    <div className="overflow-x-auto rounded-t-xl">
                      <table className="min-w-full table-auto">
                        <thead>
                          <tr className="bg-cyan-500 rounded-t-xl">
                            <th></th>
                            <th className="px-4 py-2 text-white font-light">
                              None
                            </th>
                            <th className="px-4 py-2 text-white font-light">
                              Track
                            </th>
                            <th className="px-4 py-2 text-white font-light">
                              Block
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {gTableData.map((item, idx) => (
                            <tr key={idx} className="bg-gray-100 border-b">
                              <td className="px-4 py-2">{item}</td>
                              <td className="px-4 py-2 text-center">
                                <input
                                  type="checkbox"
                                  className="form-checkbox"
                                />
                              </td>
                              <td className="px-4 py-2 text-center">
                                <input
                                  type="checkbox"
                                  className="form-checkbox"
                                />
                              </td>
                              <td className="px-4 py-2 text-center">
                                <input
                                  type="checkbox"
                                  className="form-checkbox"
                                  defaultChecked
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    );
  };

  return (
    <>
      {activeComponent === "Table" ? (
        <DlpTable />
      ) : activeComponent === "Add" ? (
        <AddDlp />
      ) : activeComponent === "Update" ? (
        <UpdateDlp />
      ) : (
        ""
      )}
    </>
  );
}
