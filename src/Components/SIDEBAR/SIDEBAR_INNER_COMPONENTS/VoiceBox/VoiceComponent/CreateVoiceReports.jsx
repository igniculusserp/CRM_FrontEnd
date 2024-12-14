// REACT INBUILD
import { useState } from 'react';
// REACT-ROUTER-DOM
import { Link } from 'react-router-dom';

// REACT QUILL FOR DESCRIPTION
import ReactQuill from 'react-quill';

export default function CreateVoiceReports() {
  // INPUT HANDLING WITH STATE
  const [description, setDescription] = useState('');
  const [editReport, setEditReport] = useState({
    id: '',
    name: '',
    reportingTo: '',
    totalIncomingCall: '',
    totalTimeOutGoingCall: '',
    totalCallAttempt: '',
    designation: '',
    incomingCall: '',
    outgoingCall: '',
    phNo: '',
    assigned_To: '',
    totalAnsweredCall: '',
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
    <div className="flex flex-col mx-3 mt-3 overflow-x-auto overflow-y-hidden bg-gray-300">
      <div className="flex py-2 px-3 items-center justify-between shadow-md bg-white rounded-md">
        <h1 className="text-xl py-1 font-medium rounded-lg">
          {isEditMode ? <h1>Edit Reports</h1> : <>Create Reports</>}
        </h1>
        <div>
          <Link
            to="/panel/voicebox"
            className="px-4 py-1 rounded mx-3 border border-blue-500 text-blue-500 "
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
            <h1 className="py-2 px-3 font-medium rounded-t-xl text-white bg-cyan-500">
              Reports
            </h1>
          </div>
          {/* ----- FIELDS START FROM HERE ------ */}
          <div className="grid gap-2 p-2 bg-white rounded-b-xl shadow-lg">
            {/* FIRST ROW */}
            <div className="flex space-x-4">
              {/* LEAD ID FIELD */}
              <div className="flex flex-col w-1/2">
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
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
              {/* DESIGNATION FIELD */}
              <div className="flex flex-col w-1/2">
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
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
            </div>
            {/* SECOND ROW */}
            <div className="flex space-x-4">
              {/* Reporting FIELD */}
              <div className="flex flex-col w-1/2">
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
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
              {/* DESIGNATION FIELD */}
              <div className="flex flex-col w-1/2">
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
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
            </div>
            {/* THIRD ROW */}
            <div className="flex space-x-4">
              {/* TOTAL INCOMING CALLS FIELD */}
              <div className="flex flex-col w-1/2">
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
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
              {/* DESIGNATION FIELD */}
              <div className="flex flex-col w-1/2">
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
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
            </div>
            {/* FOURTH ROW */}
            <div className="flex space-x-4">
              {/* TOTAL TIME OUTGOING CALLS FIELD */}
              <div className="flex flex-col w-1/2">
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
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
              {/* DESIGNATION FIELD */}
              <div className="flex flex-col w-1/2">
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
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
            </div>
            {/* FIFTH ROW */}
            <div className="flex space-x-4">
              {/* TOTAL CALL ATTEMPT FIELD */}
              <div className="flex flex-col w-1/2">
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
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
            </div>
          </div>
          {/* DESCRIPTION */}
          <div className="bg-white rounded-xl shadow-md mt-3 mb-6">
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
    </div>
  );
}