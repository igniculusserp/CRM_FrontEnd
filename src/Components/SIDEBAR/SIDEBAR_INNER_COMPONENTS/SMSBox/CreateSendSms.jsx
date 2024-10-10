import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function CreateSendSms() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editSms, setEditSms] = useState({
    template: '',
    textMsg: '',
    callStatus: '',
  });

  //   HANDLING INPUTS CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditSms({
      ...editSms,
      [name]: value,
    });
  };

  //   HANDLING FORM
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  //   DROPDOWNS
  const [callStatusDropdown, setCallStatusDropdown] = useState(false);
  const [defaultCallStatusText, setDefaultCallStatusText] =
    useState('Call Status');
  const [textMsgDropdown, setTextMsgDropdown] = useState(false);
  const [defaultTextMsgText, setDefaultTextMsgText] = useState('Text Message');

  // DUMMY CALL STATUS
  const callStatusData = [
    { key: 1, name: 'call status' },
    { key: 2, name: 'call status' },
    { key: 3, name: 'call status' },
  ];

  // TOGGLE CALL STATUS DROPDOWN
  const toggleDropdownCallStatus = () => {
    setCallStatusDropdown(!callStatusDropdown);
  };

  const handleDropdownCallStatus = (name) => {
    setDefaultCallStatusText(name);
    setCallStatusDropdown(!callStatusDropdown);
    setEditSms((prev) => ({
      ...prev,
      name: name,
    }));
  };

  // DUMMY TEST MSG
  const textMsgData = [
    { key: 1, name: 'text msg' },
    { key: 2, name: 'text msg' },
    { key: 3, name: 'text msg' },
  ];

  // TOGGLE CALL TEST MSG
  const toggleDropdownTextMsg = () => {
    setTextMsgDropdown(!textMsgDropdown);
  };

  const handleDropdownTextMsg = (name) => {
    setDefaultTextMsgText(name);
    setTextMsgDropdown(!textMsgDropdown);
    setEditSms((prev) => ({
      ...prev,
      name: name,
    }));
  };

  return (
    // TOP SECTION
    <div className="flex flex-col m-3 overflow-x-auto overflow-y-hidden">
      <div className="flex py-2 px-3 items-center justify-between bg-white rounded-md shadow-md">
        <h1 className="text-xl">Send SMS</h1>
        <Link
          to="/sidebar/smsbox"
          className="px-4 py-1 rounded mx-3 border border-blue-500 text-blue-500"
        >
          Cancel
        </Link>
      </div>
      {/* -------------FORM Starts FROM HERE------------- */}
      <form onSubmit={handleSubmit} className="flex flex-col mb-6">
        {/* -------------SMS DETAILS STARTS FROM HERE------------- */}
        <div className="my-3 bg-white rounded-xl shadow-md flex-grow ">
          <h2 className="font-medium py-2 px-3 rounded-t-xl text-white bg-cyan-500">
            SMS Details
          </h2>

          {/* CHECK BOXES */}
          <div className="flex bg-white px-3 py-2 max-w-full items-center gap-3">
            <div className="flex gap-2 items-center">
              <input type="checkbox" />
              <p className="text-sm text-gray-700">Free Trail</p>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" />
              <p className="text-sm text-gray-700">Paid Clients</p>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" />
              <p className="text-sm text-gray-700">Telegram</p>
            </div>
          </div>
          <div className="flex flex-col bg-white px-3 py-1">
            <h1 className="text-xl font-medium text-gray-700 mb-2">Products</h1>
            <div className="flex items-center flex-wrap gap-3">
              <div className="flex gap-2 items-center">
                <input type="checkbox" />
                <p className="text-sm text-gray-700">All</p>
              </div>
              <div className="flex gap-2 items-center">
                <input type="checkbox" />
                <p className="text-sm text-gray-700">Stock Cash(25, 0)</p>
              </div>
              <div className="flex gap-2 items-center">
                <input type="checkbox" />
                <p className="text-sm text-gray-700">HINI Cash(24, 0)</p>
              </div>
              <div className="flex gap-2 items-center">
                <input type="checkbox" />
                <p className="text-sm text-gray-700">Stock Future(24, 0)</p>
              </div>
              <div className="flex gap-2 items-center">
                <input type="checkbox" />
                <p className="text-sm text-gray-700">HINI Future(24, 0)</p>
              </div>
              <div className="flex gap-2 items-center">
                <input type="checkbox" />
                <p className="text-sm text-gray-700">Stock Option(24, 0)</p>
              </div>
              <div className="flex gap-2 items-center">
                <input type="checkbox" />
                <p className="text-sm text-gray-700">Index Future(24, 0)</p>
              </div>
              <div className="flex gap-2 items-center">
                <input type="checkbox" />
                <p className="text-sm text-gray-700">Index Option(24, 0)</p>
              </div>
              <div className="flex gap-2 items-center">
                <input type="checkbox" />
                <p className="text-sm text-gray-700">HINI Option(24, 0)</p>
              </div>
            </div>
          </div>

          {/* -------------SMS DETAILS STARTS FROM HERE------------- */}
          {/* -------------6------------- */}
          {/* -------------Street------------- */}
          <div className="grid gap-2 p-2">
            <div className="flex space-x-4">
              {/* CALL STATUS DROPDOWN */}
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="callStatus"
                  className="text-sm font-medium text-gray-700 mt-2"
                >
                  Call Status
                </label>
                <div
                  className="relative"
                  onClick={toggleDropdownCallStatus}
                  onMouseLeave={() => setCallStatusDropdown(false)}
                >
                  <button
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                    id="callStatus"
                    type="button"
                  >
                    {isEditMode ? editSms.callStatus : defaultCallStatusText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {callStatusDropdown && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {callStatusData.map(({ key, name }) => (
                          <li
                            className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer z-10"
                            key={key}
                            onClick={() => handleDropdownCallStatus(name)}
                          >
                            {name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              {/* TEXT MESSAGE DROPDOWN */}
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="textMsg"
                  className="text-sm font-medium text-gray-700 mt-2"
                >
                  Text Message
                </label>
                <div
                  className="relative"
                  onClick={toggleDropdownTextMsg}
                  onMouseLeave={() => setTextMsgDropdown(false)}
                >
                  <button
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                    id="textMsg"
                    type="button"
                  >
                    {isEditMode ? editSms.textMsg : defaultTextMsgText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {textMsgDropdown && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {textMsgData.map(({ key, name }) => (
                          <li
                            className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer z-10"
                            key={key}
                            onClick={() => handleDropdownTextMsg(name)}
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
            {/* DROPDOWNS FIELD */}
            <div className="flex space-x-4">
              {/* MAIL TYPE DROPDOWN */}
              <div className="flex flex-col w-1/2">
                {/* SUBJECT FIELD */}
                <label
                  htmlFor="template"
                  className="text-sm font-medium text-gray-700"
                >
                  Template
                </label>
                <input
                  type="text"
                  name="template"
                  id="template"
                  value={editSms.template}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
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
  );
}
