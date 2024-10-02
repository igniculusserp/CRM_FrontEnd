import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CreateMailBox = () => {
  const [mailsData, setMailsData] = useState({
    clientName: '',
    mail: '',
    number: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [mailTimeDropdown, setMailTimeDropdown] = useState(false);
  const [defaultMailText, setDefaultMailText] = useState('Mail Type');
  const [typeDropdown, setTypeDropdown] = useState(false);
  const [defaultTypeText, setDefaultTypeText] = useState('Type');

  const [editOrder, setEditOrder] = useState({
    clientName: '',
    alternateNumber: '',
    number: '',
    mail: '',
    mailType: '',
    type: '',
  });

  // HANDLING INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMailsData({
      ...mailsData,
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
    setEditOrder((prevTask) => ({
      ...prevTask,
      mailType: mailType,
    }));
  };

  // HANDLE DROPDOWN FOR TYPE
  const handleDropdownType = (text) => {
    setDefaultTypeText(text);
    setTypeDropdown(!typeDropdown);
    setEditOrder((prevTask) => ({
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
      {/* TOP SECTION */}
      <div className="px-3 py-4 bg-white rounded-md flex items-center justify-between m-3">
        <h1 className="text-xl font-bold">Create Mail Box</h1>
        <Link to="/sidebar/mailBox">
          <button className="px-6 py-2 text-center text-sm border border-blue-600 text-blue-600 rounded-md">
            Cancel
          </button>
        </Link>
      </div>
      {/* FORM SECTION */}
      <div className="px-3">
        <h1 className="py-3 px-6 rounded-t-lg bg-cyan-500 text-white text-md font-bold">
          Mail Box Details
        </h1>
        <form className="bg-white px-3 py-6" onSubmit={handleSubmit}>
          <div className="flex gap-4">
            {/* LEFT SIDE */}
            <div className="flex-1 flex flex-col">
              {/* CLIENT NAME */}
              <label
                htmlFor="clientName"
                className="text-sm font-medium text-gray-700"
              >
                Client Name
              </label>
              <input
                type="text"
                id="clientName"
                name="clientName"
                value={mailsData.clientName}
                className="mt-1 p-2 border border-gray-300 rounded-md"
                placeholder="SMS"
                onChange={handleChange}
              />
              {/* MAIL */}
              <label
                htmlFor="mail"
                className="text-sm font-medium text-gray-700"
              >
                Mail
              </label>
              <input
                type="text"
                id="mail"
                value={mailsData.mail}
                name="mail"
                className="mt-1 p-2 border border-gray-300 rounded-md"
                placeholder="Entrez votre prenom"
                onChange={handleChange}
              />
              {/* MAIL TIME DROPDOWN */}
              <label
                htmlFor="mailTime"
                className="text-sm font-medium text-gray-700"
              >
                Mail Time
              </label>
              <div
                className="relative"
                onClick={toggleMailTimeDropdown}
                onMouseLeave={() => setMailTimeDropdown(false)}
              >
                <button
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                  id="LeadStatusDropDown"
                  type="button"
                >
                  {isEditMode ? editOrder.mailType : defaultMailText}
                  <FaAngleDown className="ml-2 text-gray-400" />
                </button>
                {mailTimeDropdown && (
                  <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                    <ul className="py-2 text-sm text-gray-700">
                      {mailTypeData.map(({ key, name }) => (
                        <li
                          className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
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
                value={mailsData.number}
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
                  {isEditMode ? editOrder.type : defaultTypeText}
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
          <div className="flex items-center justify-end gap-4 py-10 px-2 mr-20">
            <button className="px-32 py-4 mt-40 mb-4 bg-white border-2 border-cyan-500 rounded">
              Save and New
            </button>
            <button className="px-32 py-4 mt-40 mb-4 bg-cyan-500 text-white hover:text-cyan-500 hover:bg-white border-2 border-cyan-500 rounded">
              Save
            </button>
          </div>
          {/* BUTTONS END */}
        </form>
      </div>
    </>
  );
};

export default CreateMailBox;
