// REACT-INBUILD
import { useState } from "react";
// REACT - QUILL
import ReactQuill from "react-quill";
// REACT-ROUTER-DOM
import { Link } from "react-router-dom";

export default function CreateVoiceDetails() {
  // CREATE AND EDIT MODE
  const [isEditMode, setIsEditMode] = useState(false);

  // INPUT HANDLING WITH STATE
  const [description, setDescription] = useState("");
  const [editDetails, setEditDetails] = useState({
    id: "",
    sendMode: "",
    textMsg: "",
    number: "",
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
    <div className="mx-3 mt-3 flex flex-col overflow-x-auto overflow-y-hidden">
      <div className="flex items-center justify-between rounded-md bg-white px-3 py-2 shadow-md">
        <h1 className="rounded-lg py-1 text-xl font-medium">
          {isEditMode ? <h1>Send Details</h1> : <>Create Details</>}
        </h1>
        <div>
          <Link
            to="/panel/voicebox"
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
          <div className="rounded-t-xl bg-cyan-500 px-4 py-2 shadow-md">
            <h1 className="rounded-t-xl bg-cyan-500 font-medium text-white">
              Send
            </h1>
          </div>
          {/* ----- FIELDS START FROM HERE ------ */}
          <div className="grid gap-2 rounded-b-xl bg-white p-2 shadow-lg">
            {/* FIRST ROW */}
            <div className="flex space-x-4">
              {/* LEAD ID FIELD */}
              <div className="flex w-1/2 flex-col">
                <label
                  htmlFor="sendMode"
                  className="text-sm font-medium text-gray-700"
                >
                  Send Mode
                </label>
                <input
                  type="text"
                  name="sendMode"
                  id="sendMode"
                  value={editDetails.sendMode}
                  className="mt-1 rounded-md border border-gray-300 p-2"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
              {/* NUMBER FIELD */}
              <div className="flex w-1/2 flex-col">
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
                  value={editDetails.number}
                  className="mt-1 rounded-md border border-gray-300 p-2"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
            </div>
            {/* SECOND ROW */}
            <div className="flex space-x-4">
              {/* TEXT MESSAGE FIELD */}
              <div className="flex w-1/2 flex-col">
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
                  value={editDetails.textMsg}
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

// INPUT SEQUENCE
// SEND MODE, NUMBER
// TEXT Message
