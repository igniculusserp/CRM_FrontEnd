import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function CreateSendEmail() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editSms, setEditSms] = useState({
    subject: '',
    msg: '',
    attachment: '',
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

  //   DROPDOWN
  const [textMsgDropdown, setTextMsgDropdown] = useState(false);
  const [defaultTextMsgText, setDefaultTextMsgText] = useState('Text Message');

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
    <div className="flex flex-col m-3 overflow-x-auto overflow-y-hidden">
      <div className="flex py-2 px-2 items-center justify-between bg-white rounded-md shadow-md">
        <h1 className="text-xl">
          <h1>Send Email</h1>
        </h1>
        <Link
          to="/sidebar/smsbox"
          className="px-4 py-1 rounded mx-3 border border-blue-500 text-blue-500"
        >
          Cancel
        </Link>
      </div>

      <div className="overflow-hidden shadow-md">
        <div className="py-2 px-3 bg-cyan-500 rounded-t-xl mt-3">
          <h1 className="text-white">Email Details</h1>
        </div>
      </div>
      {/* CREATE VOICE FORM */}
      <form onSubmit={handleSubmit}>
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
        <div className="flex flex-col py-2 px-4 bg-white rounded-b-xl pt-5">
          <div className="flex gap-4">
            {/* LEFT SECTION */}
            <div className="flex-1 flex flex-col">
              {/* SUBJECT FIELD */}
              <label
                htmlFor="subject"
                className="text-sm font-medium text-gray-700"
              >
                Subject
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                value={editSms.subject}
                className="mt-1 p-2 border border-gray-300 rounded-md"
                onChange={handleChange}
                placeholder="Entere verox peron"
              />
              {/* ATTACHMENT FIELD */}
              <label
                htmlFor="attachment"
                className="text-sm font-medium text-gray-700 mt-1"
              >
                Attachment
              </label>
              <input
                type="file"
                name="subject"
                id="subject"
                value={editSms.attachment}
                className="mt-1 p-2 border border-gray-300 rounded-md"
                onChange={handleChange}
              />
            </div>
            {/* RIGHT SECTION */}
            <div className="flex-1 flex flex-col">
              {/* TEXT MESSAGE DROPDOWN */}
              <label
                htmlFor="msg"
                className="text-sm font-medium text-gray-700 mt-1"
              >
                Message
              </label>
              <div
                className="relative"
                onClick={toggleDropdownTextMsg}
                onMouseLeave={() => setTextMsgDropdown(false)}
              >
                <button
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                  id="msg"
                  type="button"
                >
                  {isEditMode ? editSms.msg : defaultTextMsgText}
                  <FaAngleDown className="ml-2 text-gray-400" />
                </button>
                {textMsgDropdown && (
                  <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                    <ul className="py-2 text-sm text-gray-700">
                      {textMsgData.map(({ key, name }) => (
                        <li
                          className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
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
          {/* BUTTON */}
          <div className="flex justify-end gap-5 mr-10">
            <div className="flex justify-end mr-20">
              <button
                type="submit"
                className="px-32 py-4 mt-40 mb-4 bg-cyan-500 text-white hover:text-cyan-500 hover:bg-white border-2 border-cyan-500 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
