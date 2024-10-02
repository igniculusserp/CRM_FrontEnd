import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CreateSms = () => {
  // EDIT CONTACT
  const [editSms, seteditSms] = useState({
    id: '',
    name: '',
    sms: '',
    number: '',
  });
  const [smsTimeDropdown, setSmsTimeDropdown] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [typeDropdown, setTypeDropdown] = useState(false);
  const [defaultSmsTimeText, setDefaultSmsTimeText] = useState('SMS Time');
  const [defaultTypeText, setDefaultTypeText] = useState('Type');

  //   TOGGLE SMSTIMEDROPDOWN
  const toggleSMSTimeDropdown = () => {
    setSmsTimeDropdown(!smsTimeDropdown);
  };

  // HANDLE SMSTIMEDROPDOWN
  const handleDropdownSmsTime = (smsTime) => {
    setDefaultSmsTimeText(smsTime);
    setSmsTimeDropdown(!smsTimeDropdown);
    seteditSms((prevTask) => ({
      ...prevTask,
      smsTime: smsTime,
    }));
  };

  //   TOGGLE SMSTIMEDROPDOWN
  const toggleTypeDropdown = () => {
    setTypeDropdown(!typeDropdown);
  };

  // HANDLE SMSTIMEDROPDOWN
  const handleDropdownType = (type) => {
    setDefaultTypeText(type);
    setTypeDropdown(!typeDropdown);
    seteditSms((prevTask) => ({
      ...prevTask,
      type: type,
    }));
  };

  // HANDLE SUBMIT FORM
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(e);
  };

  // HANDLING MULTIPLE INPUTS
  const handleChange = (e) => {
    const { name, value } = e.target;
    seteditSms((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  // MAILTYPE DATA
  const smsTimeData = [
    { key: 1, name: '13/12/2023 16:15' },
    { key: 2, name: '13/12/2023 16:15' },
    { key: 3, name: '13/12/2023 16:15' },
    { key: 4, name: '13/12/2023 16:15' },
  ];

  // TYPE DATA
  const typeData = [
    { key: 1, name: 'Calling Person' },
    { key: 2, name: 'Calling Person' },
    { key: 3, name: 'Calling Person' },
    { key: 4, name: 'Calling Person' },
  ];

  return (
    <>
      {/* TOP SECTION */}
      <div className="px-3 py-4 bg-white rounded-md flex items-center justify-between m-3">
        <h1 className="text-xl font-bold">Create SMS Box</h1>
        <Link to="/sidebar/smsBox">
          <button className="px-6 py-2 text-center text-sm border border-blue-600 text-blue-600 rounded-md">
            Cancel
          </button>
        </Link>
      </div>
      {/* FORM SECTION */}
      <div className="px-3">
        <h1 className="py-3 px-6 rounded-t-lg bg-cyan-500 text-white text-md font-bold">
          SMS Box Details
        </h1>
        <form className="bg-white px-3 py-6" onSubmit={handleSubmit}>
          <div className="flex gap-4">
            {/* LEFT SIDE */}
            <div className="flex-1 flex flex-col">
              {/* CLIENT NAME */}
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Client Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={editSms.name}
                className="mt-1 p-2 border border-gray-300 rounded-md"
                placeholder="SMS"
                onChange={handleChange}
              />
              {/* SMS */}
              <label
                htmlFor="sms"
                className="text-sm font-medium text-gray-700"
              >
                SMS
              </label>
              <input
                type="text"
                id="sms"
                value={editSms.sms}
                name="sms"
                className="mt-1 p-2 border border-gray-300 rounded-md"
                placeholder="Entrez votre prenom"
                onChange={handleChange}
              />
              {/* SMS TIME DROPDOWN */}
              <label
                htmlFor="smsTime"
                className="text-sm font-medium text-gray-700"
              >
                SMS Time
              </label>
              <div
                className="relative"
                onClick={toggleSMSTimeDropdown}
                onMouseLeave={() => setSmsTimeDropdown(false)}
              >
                <button
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                  id="LeadStatusDropDown"
                  type="button"
                >
                  {isEditMode ? editSms.smsTime : defaultSmsTimeText}
                  <FaAngleDown className="ml-2 text-gray-400" />
                </button>
                {smsTimeDropdown && (
                  <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                    <ul className="py-2 text-sm text-gray-700">
                      {smsTimeData.map(({ key, name }) => (
                        <li
                          className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                          key={key}
                          onClick={() => handleDropdownSmsTime(name)}
                        >
                          {name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            {/* LEFT SIDE */}
            <div className="flex-1 flex flex-col">
              {/* NUMBER FIELD */}
              <label
                htmlFor="number"
                className="text-sm font-medium text-gray-700"
              >
                Number
              </label>
              <input
                type="number"
                id="number"
                value={editSms.number}
                name="number"
                className="mt-1 p-2 border border-gray-300 rounded-md"
                placeholder="Entrez votre prenom"
                onChange={handleChange}
              />
              {/* TYPE DROPDOWN */}
              <label
                htmlFor="type"
                className="text-sm font-medium text-gray-700"
              >
                Type
              </label>
              <div
                className="relative"
                onClick={toggleTypeDropdown}
                onMouseLeave={() => setTypeDropdown(false)}
              >
                <button
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                  id="LeadStatusDropDown"
                  type="button"
                >
                  {isEditMode ? editSms.type : defaultTypeText}
                  <FaAngleDown className="ml-2 text-gray-400" />
                </button>
                {typeDropdown && (
                  <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                    <ul className="py-2 text-sm text-gray-700">
                      {typeData.map(({ key, name }) => (
                        <li
                          className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                          key={key}
                          onClick={() => handleDropdownType(name)}
                        >
                          {name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            {/* RIGHT SIDE */}
          </div>
          {/* BUTTONS */}
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
          {/* BUTTONS END */}
        </form>
      </div>
    </>
  );
};

export default CreateSms;