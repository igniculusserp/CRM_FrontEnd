import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const CreateMailBox = () => {
  const [editMail, setEditMail] = useState({
    clientName: "",
    alternateNumber: "",
    number: "",
    mail: "",
    mailType: "",
    type: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [mailTimeDropdown, setMailTimeDropdown] = useState(false);
  const [defaultMailText, setDefaultMailText] = useState("Mail Type");
  const [typeDropdown, setTypeDropdown] = useState(false);
  const [defaultTypeText, setDefaultTypeText] = useState("Type");

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
    { key: 1, name: "Hey, How are you!" },
    { key: 2, name: "Hey, How are you!" },
    { key: 3, name: "Hey, How are you!" },
    { key: 4, name: "Hey, How are you!" },
  ];

  // TYPE DATA
  const typeData = [
    { key: 1, name: "Calling Person" },
    { key: 2, name: "Calling Person" },
    { key: 3, name: "Calling Person" },
    { key: 4, name: "Calling Person" },
  ];

  return (
    <>
      <div className="mt-3 flex min-h-screen flex-col">
        {/* TOP SECTION */}
        <div className="m-3 flex items-center justify-between rounded-md bg-white px-3 py-4">
          <h1 className="text-xl font-bold">Create Mail Box</h1>
          <Link to="/panel/mailBox">
            <button className="rounded-md border border-blue-600 px-6 py-2 text-center text-sm text-blue-600">
              Cancel
            </button>
          </Link>
        </div>
        {/* -------------FORM Starts FROM HERE------------- */}
        <form onSubmit={handleSubmit} className="mb-6 flex flex-col">
          {/* -------------MAIL BOX INFORMATION STARTS FROM HERE------------- */}
          <div className="mx-3 my-3 flex-grow rounded-xl bg-white shadow-md">
            <h2 className="rounded-t-xl bg-cyan-500 px-3 py-2 font-medium text-white">
              Mail Box Details
            </h2>

            {/* -------------Address Information STARTS FROM HERE------------- */}
            {/* -------------6------------- */}
            {/* -------------Street------------- */}
            <div className="grid gap-2 p-2">
              <div className="flex space-x-4">
                {/* CLIENT NAME FILED */}
                <div className="flex w-1/2 flex-col">
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
                    className="mt-1 rounded-md border border-gray-300 p-2"
                    onChange={handleChange}
                    placeholder="Enter your Street"
                  />
                </div>
                {/* NUMBER FILED */}
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
                    value={editMail.number}
                    className="mt-1 rounded-md border border-gray-300 p-2"
                    onChange={handleChange}
                    placeholder="Enter your Street"
                  />
                </div>
              </div>
              {/* ALTERNATE NUMBER AND MAIL FIELD */}
              <div className="flex space-x-4">
                {/* ALTERNATE NUMBER FILED */}
                <div className="flex w-1/2 flex-col">
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
                    className="mt-1 rounded-md border border-gray-300 p-2"
                    onChange={handleChange}
                    placeholder="Enter your Street"
                  />
                </div>
                {/* NUMBER FILED */}
                <div className="flex w-1/2 flex-col">
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
                    className="mt-1 rounded-md border border-gray-300 p-2"
                    onChange={handleChange}
                    placeholder="Enter your Street"
                  />
                </div>
              </div>
              {/* DROPDOWNS FIELD */}
              <div className="flex space-x-4">
                {/* MAIL TYPE DROPDOWN */}
                <div className="flex w-1/2 flex-col">
                  <label
                    htmlFor="mailType"
                    className="text-sm font-medium text-gray-700"
                  >
                    Mail Type
                  </label>
                  <div
                    className="relative"
                    onClick={toggleMailTimeDropdown}
                    onMouseLeave={() => setMailTimeDropdown(false)}
                  >
                    <button
                      className="mt-1 flex w-full items-center justify-between rounded-md border border-gray-300 p-2"
                      id="mailType"
                      type="button"
                    >
                      {isEditMode ? editMail.mailType : defaultMailText}
                      <FaAngleDown className="ml-2 text-gray-400" />
                    </button>
                    {mailTimeDropdown && (
                      <div className="absolute top-10 z-10 w-full rounded-md border border-gray-300 bg-white">
                        <ul className="py-2 text-sm text-gray-700">
                          {mailTypeData.map(({ key, name }) => (
                            <li
                              className="z-10 block cursor-pointer border-b px-4 py-2 hover:bg-cyan-500 hover:text-white"
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
                <div className="flex w-1/2 flex-col">
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
                      className="mt-1 flex w-full items-center justify-between rounded-md border border-gray-300 p-2"
                      id="type"
                      type="button"
                    >
                      {isEditMode ? editMail.type : defaultTypeText}
                      <FaAngleDown className="ml-2 text-gray-400" />
                    </button>
                    {typeDropdown && (
                      <div className="absolute top-10 z-10 w-full rounded-md border border-gray-300 bg-white">
                        <ul className="py-2 text-sm text-gray-700">
                          {typeData.map(({ key, name }) => (
                            <li
                              className="z-10 block cursor-pointer border-b px-4 py-2 hover:bg-cyan-500 hover:text-white"
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
                className="mb-3 mt-20 rounded border-2 border-cyan-500 bg-cyan-500 px-32 py-4 text-white hover:bg-white hover:text-cyan-500"
              >
                {isEditMode ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateMailBox;
