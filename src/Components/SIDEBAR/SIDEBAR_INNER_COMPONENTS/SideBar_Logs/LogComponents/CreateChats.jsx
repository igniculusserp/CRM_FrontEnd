import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import { Link } from 'react-router-dom';

export default function CreateChats() {
  const [description, setDescription] = useState('HELLO, ');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editChats, setEditChats] = useState({
    fromUsername: '',
    message: '',
    fromChatDate: '',
    toUsername: '',
    createdTime: '',
    toChatDate: '',
  });

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditChats({
      ...editChats,
      [name]: value,
    });
  };

  // HANDLE FORM SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // DROPDOWNS
  const [fromUsernameDropdown, setFromUsernameDropdown] = useState(false);
  const [defaultTextFromUsername, setDefaultTextFromUsername] =
    useState('Username');
  const [fromChatDateDropdown, setFromChatDateDropdown] = useState(false);
  const [defaultFromTextChatDate, setDefaultFromTextChatDate] =
    useState('Chat Date');
  const [usernameDropdown, setUsernameDropdown] = useState(false);
  const [defaultUsernameText, setDefaultUsernameText] = useState('To Username');
  const [createdTimeDropdown, setCreatedTimeDropdown] = useState(false);
  const [defaultCreatedTimeText, setDefaultCreatedTimeText] =
    useState('Created Time');
  const [toChatDateDropdown, setToChatDateDropdown] = useState(false);
  const [defaultToChatDateText, setDefaultToChatDateText] =
    useState('To Chat Date');

  // DUMMY DATA FOR FROM USERNAME
  const fromUsernameData = [
    { key: 1, name: 'Shubham Mishra' },
    { key: 2, name: 'Shubham Mishra' },
    { key: 3, name: 'Shubham Mishra' },
  ];

  // TOGGLE FROM USERNAME
  const toggleDropdownFromUsername = () => {
    setFromUsernameDropdown(!fromUsernameDropdown);
  };

  const handleDropdownFromUsername = (name) => {
    setDefaultTextFromUsername(name);
    setFromUsernameDropdown(!fromUsernameDropdown);
    editChats((prev) => ({
      ...prev,
      name: name,
    }));
  };

  // DUMMY DATA FOR FROM CHAT DATE
  const fromChatDateData = [
    { key: 1, name: 'Shubham Mishra' },
    { key: 2, name: 'Shubham Mishra' },
    { key: 3, name: 'Shubham Mishra' },
  ];

  // TOGGLE FROM CHAT DATE
  const toggleDropdownFromChatDate = () => {
    setFromChatDateDropdown(!fromChatDateDropdown);
  };

  const handleDropdownFromChatDate = (name) => {
    setDefaultFromTextChatDate(name);
    setFromChatDateDropdown(!fromChatDateData);
    editChats((prev) => ({
      ...prev,
      name: name,
    }));
  };

  // DUMMY DATA FOR TO USERNAME
  const toUsernameData = [
    { key: 1, name: 'Shubham Mishra' },
    { key: 2, name: 'Shubham Mishra' },
    { key: 3, name: 'Shubham Mishra' },
  ];

  // TOGGLE TO USERNAME
  const toggleDropdownToUsername = () => {
    setUsernameDropdown(!usernameDropdown);
  };

  const handleDropdownToUsername = (name) => {
    setDefaultUsernameText(name);
    setUsernameDropdown(!usernameDropdown);
    editChats((prev) => ({
      ...prev,
      name: name,
    }));
  };

  // DUMMY DATA FOR TO USERNAME
  const createdTimeData = [
    { key: 1, name: 'Shubham Mishra' },
    { key: 2, name: 'Shubham Mishra' },
    { key: 3, name: 'Shubham Mishra' },
  ];

  // TOGGLE TO USERNAME
  const toggleDropdownCreatedTime = () => {
    setCreatedTimeDropdown(!createdTimeDropdown);
  };

  const handleDropdownCreateTime = (name) => {
    setDefaultCreatedTimeText(name);
    setCreatedTimeDropdown(!createdTimeDropdown);
    editChats((prev) => ({
      ...prev,
      name: name,
    }));
  };

  // DUMMY DATA FOR TO USERNAME
  const toChatDateData = [
    { key: 1, name: 'Shubham Mishra' },
    { key: 2, name: 'Shubham Mishra' },
    { key: 3, name: 'Shubham Mishra' },
  ];

  // TOGGLE TO USERNAME
  const toggleDropdownToChat = () => {
    setToChatDateDropdown(!toChatDateDropdown);
  };

  const handleDropdownToChatDate = (name) => {
    setDefaultToChatDateText(name);
    setToChatDateDropdown(!toChatDateDropdown);
    editChats((prev) => ({
      ...prev,
      name: name,
    }));
  };

  return (
    <>
      {/* TOP SECTION */}
      <div className="px-3 py-4 bg-white rounded-md flex items-center justify-between m-3">
        <h1 className="text-xl font-bold">Chat Logs Information</h1>
        <Link to="/sidebar/logs">
          <button className="px-6 py-2 text-center text-sm border border-blue-600 text-blue-600 rounded-md">
            Cancel
          </button>
        </Link>
      </div>

      {/* FORM SECTION */}
      <div className="px-3">
        <h1 className="py-2 px-3 font-medium rounded-t-xl bg-cyan-500 text-white text-md shadow-md">
          Client Logs Information
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3 bg-white px-4 py-2 pb-4 rounded-b-xl shadow-md">
            <div className="flex-1 flex gap-4">
              {/* --------------------------- LEFT SIDE --------------------------- */}
              <div className="flex-1 flex flex-col">
                {/* --------------------------- FORM USERNAME DROPDOWN --------------------------- */}
                <label
                  htmlFor="fromUsername"
                  className="text-sm font-medium text-gray-700"
                >
                  From User Name
                </label>
                <div
                  className="relative"
                  onClick={toggleDropdownFromUsername}
                  onMouseLeave={() => setFromUsernameDropdown(false)}
                >
                  <button
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                    id="fromUsername"
                    type="button"
                  >
                    {isEditMode
                      ? editChats.fromUsername
                      : defaultTextFromUsername}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {fromUsernameDropdown && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-11 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {fromUsernameData.map(({ key, name }) => (
                          <li
                            key={key}
                            onClick={() => handleDropdownFromUsername(name)}
                            className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                          >
                            {name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {/* --------------------------- MESSAGE FIELD --------------------------- */}
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <input
                  type="text"
                  id="message"
                  name="message"
                  value={editChats.message}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  placeholder="SMS"
                  onChange={handleChange}
                />
                {/* --------------------------- FROM CHAT DATE DROPDOWN --------------------------- */}
                <label
                  htmlFor="fromChatDate"
                  className="text-sm font-medium text-gray-700"
                >
                  From Chat Date
                </label>
                <div
                  className="relative"
                  onClick={toggleDropdownFromChatDate}
                  onMouseLeave={() => setFromChatDateDropdown(false)}
                >
                  <button
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                    id="fromChatDate"
                    type="button"
                  >
                    {isEditMode
                      ? editChats.fromChatDate
                      : defaultFromTextChatDate}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {fromChatDateDropdown && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-11 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {fromChatDateData.map(({ key, name }) => (
                          <li
                            key={key}
                            onClick={() => handleDropdownFromChatDate(name)}
                            className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
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
            {/* --------------------------- RIGHT SIDE --------------------------- */}
            <div className="flex-1 flex flex-col">
              {/* --------------------------- TO USERNAME DROPDOWN --------------------------- */}
              <label
                htmlFor="leadSource"
                className="text-sm font-medium text-gray-700"
              >
                To User Name
              </label>
              <div
                className="relative"
                onClick={toggleDropdownToUsername}
                onMouseLeave={() => setUsernameDropdown(false)}
              >
                <button
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                  id="toUsername"
                  type="button"
                >
                  {isEditMode ? editChats.toUsername : defaultUsernameText}
                  <FaAngleDown className="ml-2 text-gray-400" />
                </button>
                {usernameDropdown && (
                  <div className="absolute w-full bg-white border border-gray-300 rounded-md top-11 z-10">
                    <ul className="py-2 text-sm text-gray-700">
                      {toUsernameData.map(({ key, name }) => (
                        <li
                          key={key}
                          onClick={() => handleDropdownToUsername(name)}
                          className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                        >
                          {name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {/* --------------------------- CREATED TIME DROPDOWN --------------------------- */}
              <label
                htmlFor="createdTime"
                className="text-sm font-medium text-gray-700"
              >
                Created Time
              </label>
              <div
                className="relative"
                onClick={toggleDropdownCreatedTime}
                onMouseLeave={() => setCreatedTimeDropdown(false)}
              >
                <button
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                  id="createdTime"
                  type="button"
                >
                  {isEditMode ? editChats.createdTime : defaultCreatedTimeText}
                  <FaAngleDown className="ml-2 text-gray-400" />
                </button>
                {createdTimeDropdown && (
                  <div className="absolute w-full bg-white border border-gray-300 rounded-md top-11 z-10">
                    <ul className="py-2 text-sm text-gray-700">
                      {createdTimeData.map(({ key, name }) => (
                        <li
                          key={key}
                          onClick={() => handleDropdownCreateTime(name)}
                          className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                        >
                          {name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {/* --------------------------- TO CHAT DATE DROPDOWN --------------------------- */}
              <label
                htmlFor="toChatDate"
                className="text-sm font-medium text-gray-700"
              >
                To Chat Date
              </label>
              <div
                className="relative"
                onClick={toggleDropdownToChat}
                onMouseLeave={() => setToChatDateDropdown(false)}
              >
                <button
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                  id="toChatDate"
                  type="button"
                >
                  {isEditMode ? editChats.toChatDate : defaultToChatDateText}
                  <FaAngleDown className="ml-2 text-gray-400" />
                </button>
                {toChatDateDropdown && (
                  <div className="absolute w-full bg-white border border-gray-300 rounded-md top-11 z-10">
                    <ul className="py-2 text-sm text-gray-700">
                      {toChatDateData.map(({ key, name }) => (
                        <li
                          key={key}
                          onClick={() => handleDropdownToChatDate(name)}
                          className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
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
          {/* DESCRIPTION */}
          <div className="bg-white rounded-xl shadow-md mt-3 mb-2">
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
          {/* BUTTONS END */}
        </form>
      </div>
    </>
  );
}
