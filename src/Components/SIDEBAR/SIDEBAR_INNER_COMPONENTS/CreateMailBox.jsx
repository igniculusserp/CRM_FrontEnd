import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CreateMailBox = () => {
  const [editMail, setEditMail] = useState({
    clientName: '',
    alternateNumber: '',
    number: '',
    mail: '',
    mailType: '',
    type: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [mailTimeDropdown, setMailTimeDropdown] = useState(false);
  const [defaultMailText, setDefaultMailText] = useState('Mail Type');
  const [typeDropdown, setTypeDropdown] = useState(false);
  const [defaultTypeText, setDefaultTypeText] = useState('Type');

  // HANDLING INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditMail({
      ...editMail,
      [name]: value,
    });
  };

  //   HANDLING FORM
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(mailsData);
  };

  //   TOGGLE MAILTIMEDROPDOWN
  const toggleMailTimeDropdown = () => {
    setMailTimeDropdown(!mailTimeDropdown);
  };

  //   TOGGLE TYPEDROPDOWN
  const toggleTypeDropdown = () => {
    setTypeDropdown(!typeDropdown);
  };

  // HANDLE DROPDOWN FOR MAILTYPE
  const handleDropdownMailType = (mailType) => {
    setDefaultMailText(mailType);
    setMailTimeDropdown(!mailTimeDropdown);
    setEditMail((prevTask) => ({
      ...prevTask,
      mailType: mailType,
    }));
  };

  // HANDLE DROPDOWN FOR TYPE
  const handleDropdownType = (text) => {
    setDefaultTypeText(text);
    setTypeDropdown(!typeDropdown);
    setEditMail((prevTask) => ({
      ...prevTask,
      text: text,
    }));
  };

  // MAILTYPE DATA
  const mailTypeData = [
    { key: 1, name: 'Hey, How are you!' },
    { key: 2, name: 'Hey, How are you!' },
    { key: 3, name: 'Hey, How are you!' },
    { key: 4, name: 'Hey, How are you!' },
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
      <div className="min-h-screen flex flex-col mt-3">
        {/* TOP SECTION */}
        <div className="px-3 py-4 bg-white rounded-md flex items-center justify-between m-3">
          <h1 className="text-xl font-bold">Create Mail Box</h1>
          <Link to="/sidebar/mailBox">
            <button className="px-6 py-2 text-center text-sm border border-blue-600 text-blue-600 rounded-md">
              Cancel
            </button>
          </Link>
        </div>
        {/* -------------FORM Starts FROM HERE------------- */}
        <form onSubmit={handleSubmit} className="flex flex-col mb-6">
          {/* -------------MAIL BOX INFORMATION STARTS FROM HERE------------- */}
          <div className="mx-3 my-3 bg-white rounded-xl shadow-md flex-grow ">
            <h2 className="font-medium py-2 px-3 rounded-t-xl text-white bg-cyan-500">
              Mail Box Details
            </h2>

            {/* -------------Address Information STARTS FROM HERE------------- */}
            {/* -------------6------------- */}
            {/* -------------Street------------- */}
            <div className="grid gap-2 p-2">
              <div className="flex space-x-4">
                {/* CLIENT NAME FILED */}
                <div className="flex flex-col w-1/2">
                  <label
                    htmlFor="clientName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Client Name
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    value={editMail.clientName}
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                    onChange={handleChange}
                    placeholder="Enter your Street"
                  />
                </div>
                {/* NUMBER FILED */}
                <div className="flex flex-col w-1/2">
                  <label
                    htmlFor="number"
                    className="text-sm font-medium text-gray-700"
                  >
                    Number
                  </label>
                  <input
                    type="number"
                    name="number"
                    value={editMail.number}
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                    onChange={handleChange}
                    placeholder="Enter your Street"
                  />
                </div>
              </div>
              {/* ALTERNATE NUMBER AND MAIL FIELD */}
              <div className="flex space-x-4">
                {/* ALTERNATE NUMBER FILED */}
                <div className="flex flex-col w-1/2">
                  <label
                    htmlFor="alternateNumber"
                    className="text-sm font-medium text-gray-700"
                  >
                    Alternate Number
                  </label>
                  <input
                    type="text"
                    name="alternateNumber"
                    value={editMail.alternateNumber}
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                    onChange={handleChange}
                    placeholder="Enter your Street"
                  />
                </div>
                {/* NUMBER FILED */}
                <div className="flex flex-col w-1/2">
                  <label
                    htmlFor="mail"
                    className="text-sm font-medium text-gray-700"
                  >
                    Mail
                  </label>
                  <input
                    type="text"
                    name="mail"
                    value={editMail.mail}
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                    onChange={handleChange}
                    placeholder="Enter your Street"
                  />
                </div>
              </div>
              {/* DROPDOWNS FIELD */}
              <div className="flex space-x-4">
                {/* MAIL TYPE DROPDOWN */}
                <div className="flex flex-col w-1/2">
                  <label
                    htmlFor="mailType"
                    className="text-sm font-medium text-gray-700 mt-2"
                  >
                    Mail Type
                  </label>
                  <div
                    className="relative"
                    onClick={toggleMailTimeDropdown}
                    onMouseLeave={() => setMailTimeDropdown(false)}
                  >
                    <button
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                      id="mailType"
                      type="button"
                    >
                      {isEditMode ? editMail.mailType : defaultMailText}
                      <FaAngleDown className="ml-2 text-gray-400" />
                    </button>
                    {mailTimeDropdown && (
                      <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                        <ul className="py-2 text-sm text-gray-700">
                          {mailTypeData.map(({ key, name }) => (
                            <li
                              className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer z-10"
                              key={key}
                              onClick={() => handleDropdownMailType(name)}
                            >
                              {name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                {/* TYPE DROPDOWN */}
                <div className="flex flex-col w-1/2">
                  <label
                    htmlFor="type"
                    className="text-sm font-medium text-gray-700 mt-2"
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
                      id="type"
                      type="button"
                    >
                      {isEditMode ? editMail.type : defaultTypeText}
                      <FaAngleDown className="ml-2 text-gray-400" />
                    </button>
                    {typeDropdown && (
                      <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                        <ul className="py-2 text-sm text-gray-700">
                          {typeData.map(({ key, name }) => (
                            <li
                              className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer z-10"
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
              </div>
            </div>

            <div className="flex justify-end px-2">
              <button
                type="submit"
                className="px-32 py-4 mt-40 mb-2 bg-cyan-500 text-white border-2 border-cyan-500 rounded hover:text-cyan-500 hover:bg-white"
              >
                {isEditMode ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateMailBox;
