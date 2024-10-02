// REACT-INBUILD
import { useState } from 'react';
// REACT - QUILL
import ReactQuill from 'react-quill';
// REACT-ROUTER-DOM
import { Link } from 'react-router-dom';

export default function CreateVoiceDetails() {
  // CREATE AND EDIT MODE
  const [isEditMode, setIsEditMode] = useState(false);

  // INPUT HANDLING WITH STATE
  const [description, setDescription] = useState('');
  const [editDetails, setEditDetails] = useState({
    id: '',
    sendMode: '',
    textMsg: '',
    number: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditDetails({
      ...editDetails,

      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col mx-3 mt-3 overflow-x-auto overflow-y-hidden">
      <div className="flex py-3 px-3 items-center justify-between shadow-md bg-white rounded-md">
        <h1 className="text-xl px-4 py-1 font-medium rounded-lg">
          {isEditMode ? <h1>Send Details</h1> : <>Create Details</>}
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
              Send
            </h1>
          </div>
          {/* ----- FIELDS START FROM HERE ------ */}
          <div className="flex gap-2 py-4 px-4 rounded-b-xl bg-white">
            {/* ----- FIELDS SECTION ------ */}
            <div className="flex-1 flex flex-col">
              {/* ------ SEND MODE FIELD ------ */}
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Send Mode
              </label>
              <input
                type="text"
                name="sendMode"
                id="sendMode"
                placeholder="Enter your name"
                value={editDetails.sendMode}
                className="mt-1 p-2 border border-gray-300 rounded-md"
                onChange={handleChange}
              />
              {/* ------ TEXT MESSAGE FIELD ------ */}
              <label
                htmlFor="textMsg"
                className="text-sm font-medium text-gray-700"
              >
                Text Message
              </label>
              <input
                type="text"
                name="textMsg"
                id="textMsg"
                placeholder="Enter your name"
                value={editDetails.textMsg}
                className="mt-1 p-2 border border-gray-300 rounded-md"
                onChange={handleChange}
              />
            </div>
            {/* ----- FIELDS SECTION ------ */}
            <div className="flex-1 flex flex-col">
              {/* ------ NUMBER FIELD ------ */}
              <label
                htmlFor="number"
                className="text-sm font-medium text-gray-700"
              >
                Number
              </label>
              <input
                type="text"
                name="number"
                id="number"
                placeholder="Enter your name"
                value={editDetails.number}
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