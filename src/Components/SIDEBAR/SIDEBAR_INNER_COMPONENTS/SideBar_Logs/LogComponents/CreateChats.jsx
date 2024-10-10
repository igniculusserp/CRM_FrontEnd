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
    { key: 1, name: '09/03/2023' },
    { key: 2, name: '09/03/2023' },
    { key: 3, name: '09/03/2023' },
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
    { key: 1, name: '09/03/2023' },
    { key: 2, name: '09/03/2023' },
    { key: 3, name: '09/03/2023' },
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
    { key: 1, name: '09/03/2023' },
    { key: 2, name: '09/03/2023' },
    { key: 3, name: '09/03/2023' },
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
    <div className="flex flex-col m-3 overflow-x-auto overflow-y-hidden">
      <div className="flex py-2 px-3 items-center justify-between bg-white rounded-md shadow-md">
        <h1 className="text-xl">Add Chat Logs</h1>
        <Link
          to="/sidebar/logs"
          className="px-4 py-1 rounded mx-3 border border-blue-500 text-blue-500"
        >
          Cancel
        </Link>
      </div>
      {/* -------------FORM Starts FROM HERE------------- */}
      <form onSubmit={handleSubmit} className="flex flex-col mb-6">
        {/* -------------Client Logs Information STARTS FROM HERE------------- */}
        <div className="my-3 bg-white rounded-xl shadow-md flex-grow ">
          <h2 className="font-medium py-2 px-3 rounded-t-xl text-white bg-cyan-500">
            Chat Logs Information
          </h2>

          {/* -------------Client Logs Information STARTS FROM HERE------------- */}
          {/* -------------6------------- */}
          {/* -------------Street------------- */}
          <div className="grid gap-2 p-2">
            <div className="flex space-x-4">
              {/* FROM USERNAME DROPDOWN */}
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="fromUsername"
                  className="text-sm font-medium text-gray-700 mt-2"
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
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {fromUsernameData.map(({ key, name }) => (
                          <li
                            className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer z-10"
                            key={key}
                            onClick={() => handleDropdownFromUsername(name)}
                          >
                            {name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              {/* TO USERNAME DROPDOWN */}
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="toUsername"
                  className="text-sm font-medium text-gray-700 mt-2"
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
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {toUsernameData.map(({ key, name }) => (
                          <li
                            className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer z-10"
                            key={key}
                            onClick={() => handleDropdownToUsername(name)}
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
            {/* DROPDOWN */}
            <div className="flex space-x-4">
              {/* FROM CHAT DATE DROPDOWN */}
              <div className="flex flex-col w-1/2">
                {/* OPERATION FIELD */}
                <label
                  htmlFor="fromChatDate"
                  className="text-sm font-medium text-gray-700 mt-2"
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
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {fromChatDateData.map(({ key, name }) => (
                          <li
                            className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer z-10"
                            key={key}
                            onClick={() => handleDropdownFromChatDate(name)}
                          >
                            {name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              {/* TO CHAT DATE DROPDOWN */}
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="toChatDate"
                  className="text-sm font-medium text-gray-700 mt-2"
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
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {toChatDateData.map(({ key, name }) => (
                          <li
                            className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer z-10"
                            key={key}
                            onClick={() => handleDropdownToChatDate(name)}
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
            {/* DROPDOWN */}
            <div className="flex space-x-4">
              {/* CREATED TIME DROPDOWN */}
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="toChatDate"
                  className="text-sm font-medium text-gray-700 mt-2"
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
                    id="toChatDate"
                    type="button"
                  >
                    {isEditMode
                      ? editChats.createdTime
                      : defaultCreatedTimeText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {createdTimeDropdown && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {createdTimeData.map(({ key, name }) => (
                          <li
                            className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer z-10"
                            key={key}
                            onClick={() => handleDropdownCreateTime(name)}
                          >
                            {name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              {/* MESSAGE FIELD */}
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-700 mt-2"
                >
                  Message
                </label>
                <input
                  type="text"
                  name="message"
                  id="message"
                  value={editChats.message}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
            </div>
          </div>
        </div>
        {/* DESCRIPTION */}
        <div className="bg-white rounded-xl shadow-md">
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
  );
}
