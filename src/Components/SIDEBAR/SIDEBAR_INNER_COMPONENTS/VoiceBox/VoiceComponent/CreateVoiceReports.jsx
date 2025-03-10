// REACT INBUILD
import { useState,useEffect } from "react";
// REACT-ROUTER-DOM
import { Link } from "react-router-dom";

// REACT QUILL FOR DESCRIPTION
import ReactQuill from "react-quill";

export default function CreateVoiceReports() {
     //--------------------------------------- Set Business Type --------------------------------------------
                               const [BusinessType, setBusinessType] = useState("");
                                
                               useEffect(() => {
                                 const storedType = localStorage.getItem("businessType") || "";
                                 setBusinessType(storedType);
                               }, []);
  // INPUT HANDLING WITH STATE
  const [description, setDescription] = useState("");
  const [editReport, setEditReport] = useState({
    id: "",
    name: "",
    reportingTo: "",
    totalIncomingCall: "",
    totalTimeOutGoingCall: "",
    totalCallAttempt: "",
    designation: "",
    incomingCall: "",
    outgoingCall: "",
    phNo: "",
    assigned_To: "",
    totalAnsweredCall: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditReport({
      ...editReport,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="mx-3 mt-3 flex flex-col overflow-x-auto overflow-y-hidden bg-gray-300">
      <div className="flex items-center justify-between rounded-md bg-white px-3 py-2 shadow-md">
        <h1 className="rounded-lg py-1 text-xl font-medium">
          {isEditMode ? <h1>Edit Reports</h1> : <>Create Reports</>}
        </h1>
        <div>
          <Link
            to={`/panel/${BusinessType}/voicebox`}
            className="mx-3 rounded border border-blue-500 px-4 py-1 text-blue-500"
          >
            Cancel
          </Link>
        </div>
      </div>
      <div className="overflow-hidden">
        {/* CREATE CONTACT FORM */}
        <form className="flex flex-col py-3" onSubmit={handleSubmit}>
          {/* ----- HEADING ----- */}
          <div className="rounded-t-xl shadow-lg">
            <h1 className="rounded-t-xl bg-cyan-500 px-3 py-2 font-medium text-white">
              Reports
            </h1>
          </div>
          {/* ----- FIELDS START FROM HERE ------ */}
          <div className="grid gap-2 rounded-b-xl bg-white p-2 shadow-lg">
            {/* FIRST ROW */}
            <div className="flex space-x-4">
              {/* LEAD ID FIELD */}
              <div className="flex w-1/2 flex-col">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={editReport.name}
                  className="mt-1 rounded-md border border-gray-300 p-2"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
              {/* DESIGNATION FIELD */}
              <div className="flex w-1/2 flex-col">
                <label
                  htmlFor="designation"
                  className="text-sm font-medium text-gray-700"
                >
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  id="designation"
                  value={editReport.designation}
                  className="mt-1 rounded-md border border-gray-300 p-2"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
            </div>
            {/* SECOND ROW */}
            <div className="flex space-x-4">
              {/* Reporting FIELD */}
              <div className="flex w-1/2 flex-col">
                <label
                  htmlFor="reportingTo"
                  className="text-sm font-medium text-gray-700"
                >
                  Reporting To
                </label>
                <input
                  type="text"
                  name="reportingTo"
                  id="reportingTo"
                  value={editReport.reportingTo}
                  className="mt-1 rounded-md border border-gray-300 p-2"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
              {/* DESIGNATION FIELD */}
              <div className="flex w-1/2 flex-col">
                <label
                  htmlFor="designation"
                  className="text-sm font-medium text-gray-700"
                >
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  id="designation"
                  value={editReport.designation}
                  className="mt-1 rounded-md border border-gray-300 p-2"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
            </div>
            {/* THIRD ROW */}
            <div className="flex space-x-4">
              {/* TOTAL INCOMING CALLS FIELD */}
              <div className="flex w-1/2 flex-col">
                <label
                  htmlFor="totalIncomingCall"
                  className="text-sm font-medium text-gray-700"
                >
                  Total Incoming Calls
                </label>
                <input
                  type="text"
                  name="totalIncomingCall"
                  id="totalIncomingCall"
                  value={editReport.totalIncomingCall}
                  className="mt-1 rounded-md border border-gray-300 p-2"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
              {/* DESIGNATION FIELD */}
              <div className="flex w-1/2 flex-col">
                <label
                  htmlFor="designation"
                  className="text-sm font-medium text-gray-700"
                >
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  id="designation"
                  value={editReport.designation}
                  className="mt-1 rounded-md border border-gray-300 p-2"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
            </div>
            {/* FOURTH ROW */}
            <div className="flex space-x-4">
              {/* TOTAL TIME OUTGOING CALLS FIELD */}
              <div className="flex w-1/2 flex-col">
                <label
                  htmlFor="totalTimeOutGoingCall"
                  className="text-sm font-medium text-gray-700"
                >
                  Total Time Outgoing Calls
                </label>
                <input
                  type="text"
                  name="totalTimeOutGoingCall"
                  id="totalTimeOutGoingCall"
                  value={editReport.totalTimeOutGoingCall}
                  className="mt-1 rounded-md border border-gray-300 p-2"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
              {/* DESIGNATION FIELD */}
              <div className="flex w-1/2 flex-col">
                <label
                  htmlFor="designation"
                  className="text-sm font-medium text-gray-700"
                >
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  id="designation"
                  value={editReport.designation}
                  className="mt-1 rounded-md border border-gray-300 p-2"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
            </div>
            {/* FIFTH ROW */}
            <div className="flex space-x-4">
              {/* TOTAL CALL ATTEMPT FIELD */}
              <div className="flex w-1/2 flex-col">
                <label
                  htmlFor="totalCallAttempt"
                  className="text-sm font-medium text-gray-700"
                >
                  Total Call Attempt
                </label>
                <input
                  type="number"
                  name="totalCallAttempt"
                  id="totalCallAttempt"
                  value={editReport.totalCallAttempt}
                  className="mt-1 rounded-md border border-gray-300 p-2"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
            </div>
          </div>
          {/* DESCRIPTION */}
          <div className="mb-6 mt-3 rounded-xl bg-white shadow-md">
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
    </div>
  );
}
