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
      <div className="flex py-3 px-3 items-center justify-between shadow-md bg-white rounded-md">
        <h1 className="text-xl px-4 py-1 font-medium rounded-lg">
          {isEditMode ? <h1>Edit Reports</h1> : <>Create Reports</>}
        </h1>
        <div>
          <Link
            to="/sidebar/voicebox"
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
          <div className="py-2 px-4 bg-cyan-500 rounded-t-xl shadow-md">
            <h1 className="font-medium rounded-t-xl text-white bg-cyan-500">
              Reports
            </h1>
          </div>
          {/* ----- FIELDS START FROM HERE ------ */}
          <div className="flex gap-4 bg-white py-2 px-4 rounded-b-xl">
            {/* ----- FIELDS SECTION ------ */}
            <div className="flex-1 flex flex-col">
              {/* ------- NAME FILED -------- */}
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
                placeholder="Enter your name"
                value={editReport.name}
                className="mt-1 p-2 border border-gray-300 rounded-md"
                onChange={handleChange}
              />
              {/* ------- NAME FILED -------- */}
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
                placeholder="Entere verox peron"
                value={editReport.reportingTo}
                className="mt-1 p-2 border border-gray-300 rounded-md"
                onChange={handleChange}
              />
              {/* ------- TOTAL INCOMING CALLS DROPDOWN -------- */}
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
                placeholder="Entere verox peron"
                value={editReport.totalIncomingCall}
                className="mt-1 p-2 border border-gray-300 rounded-md"
                onChange={handleChange}
              />
              {/* ------- TOTAL TIME OUTGOING CALLS DROPDOWN -------- */}
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
                placeholder="Entere verox peron"
                value={editReport.totalTimeOutGoingCall}
                className="mt-1 p-2 border border-gray-300 rounded-md"
                onChange={handleChange}
              />
              {/* ------- TOTAL CALL ATTEMPT DROPDOWN -------- */}
              <label
                htmlFor="totalCallAttempt"
                className="text-sm font-medium text-gray-700"
              >
                Total Call Attempt
              </label>
              <input
                type="text"
                name="totalCallAttempt"
                id="totalCallAttempt"
                placeholder="Entere verox peron"
                value={editReport.totalCallAttempt}
                className="mt-1 p-2 border border-gray-300 rounded-md"
                onChange={handleChange}
              />
            </div>
            {/* ----- FIELDS SECTION ------ */}
            <div className="flex-1 flex flex-col">
              {/* ------- DESIGNATION FIELD -------- */}
              <label
                htmlFor="totalCallAttempt"
                className="text-sm font-medium text-gray-700"
              >
                Designation
              </label>
              <input
                type="text"
                name="designation"
                id="designation"
                placeholder="Entere verox peron"
                value={editReport.designation}
                className="mt-1 p-2 border border-gray-300 rounded-md"
                onChange={handleChange}
              />
              {/* ------- INCOMING CALLS DROPDOWN -------- */}
              <label
                htmlFor="totalCallAttempt"
                className="text-sm font-medium text-gray-700"
              >
                Designation
              </label>
              <input
                type="text"
                name="designation"
                id="designation"
                placeholder="Entere verox peron"
                value={editReport.designation}
                className="mt-1 p-2 border border-gray-300 rounded-md"
                onChange={handleChange}
              />
              {/* ------- OUTGOING CALLS DROPDOWN -------- */}
              <label
                htmlFor="totalCallAttempt"
                className="text-sm font-medium text-gray-700"
              >
                Designation
              </label>
              <input
                type="text"
                name="designation"
                id="designation"
                placeholder="Entere verox peron"
                value={editReport.designation}
                className="mt-1 p-2 border border-gray-300 rounded-md"
                onChange={handleChange}
              />
              {/* ------- TOTAL ANSWERED CALLS DROPDOWN -------- */}
              <label
                htmlFor="totalCallAttempt"
                className="text-sm font-medium text-gray-700"
              >
                Designation
              </label>
              <input
                type="text"
                name="designation"
                id="designation"
                placeholder="Entere verox peron"
                value={editReport.designation}
                className="mt-1 p-2 border border-gray-300 rounded-md"
                onChange={handleChange}
              />
            </div>
          </div>
          {/* DESCRIPTION */}
          <div className="bg-white rounded-xl shadow-md mt-3">
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
                {/* <textarea
                  name="description"
                  value={description}
                  id="description"
                  placeholder="HELLO"
                  className=" text-balance hyphens-auto max-w-5xl  max-h-60 h-60 border border-gray-400 rounded-md"
                  onChange={setDescription}
                ></textarea> */}
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
        </form>
      </div>
    </div>
  );
}
