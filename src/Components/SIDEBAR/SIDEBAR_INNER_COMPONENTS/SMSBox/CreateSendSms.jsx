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
  const [templateDropdown, setTemplateDropdown] = useState(false);
  const [defaultTemplateText, setDefaultTemplateText] = useState('Template');
  const [productsDropdown, setProductsDropdown] = useState(false);
  const [defaultProductsText, setDefaultProductsText] = useState('Products');

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
  const templateData = [
    { key: 1, name: 'template' },
    { key: 2, name: 'template' },
    { key: 3, name: 'template' },
  ];

  // TOGGLE CALL TEST MSG
  const toggleDropdownTemplate = () => {
    setTemplateDropdown(!templateDropdown);
  };

  const handleDropdownTemplate = (name) => {
    setDefaultTemplateText(name);
    setTemplateDropdown(!templateDropdown);
    setEditSms((prev) => ({
      ...prev,
      name: name,
    }));
  };

  // ------------- PRODUCTS DROPDOWN -------------
  const products = [
    { id: 1, name: 'cash' },
    { id: 2, name: 'future' },
    { id: 3, name: 'option' },
  ];

  const toggleDropdownProducts = () => {
    setProductsDropdown(!productsDropdown);
  };

  const handleDropdownProducts = (name) => {
    setDefaultProductsText(name);
    setProductsDropdown(!productsDropdown);
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
                <input
                  type="text"
                  name="textMsg"
                  id="textMsg"
                  value={editSms.textMsg}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
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
                <div
                  className="relative"
                  onClick={toggleDropdownTemplate}
                  onMouseLeave={() => setTemplateDropdown(false)}
                >
                  <button
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                    id="template"
                    type="button"
                  >
                    {isEditMode ? editSms.template : defaultTemplateText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {templateDropdown && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {templateData.map(({ key, name }) => (
                          <li
                            className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer z-10"
                            key={key}
                            onClick={() => handleDropdownTemplate(name)}
                          >
                            {name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              {/* PRODUCTS DROPDOWN */}
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="products"
                  className="text-sm font-medium text-gray-700"
                >
                  Products
                </label>
                <div
                  className="relative"
                  onClick={toggleDropdownProducts}
                  onMouseLeave={() => setProductsDropdown(false)}
                >
                  <button
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                    id="products"
                    type="button"
                  >
                    {isEditMode ? editSms.products : defaultProductsText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {productsDropdown && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {products.map(({ key, name }) => (
                          <li
                            className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer z-10"
                            key={key}
                            onClick={() => handleDropdownProducts(name)}
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
              {/* HIDDEN INPUT */}
              <div className="flex space-x-4">
                <div className="flex flex-col w-full">
                <input
                  className="mt-1 p-2 border border-gray-300 rounded-md hidden"
                />
                </div>
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
