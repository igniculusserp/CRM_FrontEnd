import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';

export default function TrackSheet() {
  const [editReport, setEditReport] = useState({
    fromDate: '',
    ToDate: '',
    callStatus: '',
    product: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);

  // HANDLING FORM SUBMISSION
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // DROPDOWNS
  const [fromDateDropdown, setFromDateDropdown] = useState(false);
  const [defaultFromDateText, setDefaultFromDateText] = useState('From Date');
  const [toDateDropdown, setToDateDropdown] = useState(false);
  const [defaultToDateText, setDefaultToDateText] = useState('To Date');
  const [callStatusDropdown, setCallStatusDropdown] = useState(false);
  const [defaultCallStatusText, setDefaultCallStatusText] =
    useState('Call Status');
  const [productDropdown, setProductDropdown] = useState(false);
  const [defaultProductText, setDefaultProductText] = useState('Product');

  // FROM DATE DUMMY
  const fromDate = [
    { id: 1, name: '12/09/2023' },
    { id: 2, name: '12/09/2023' },
    { id: 3, name: '12/09/2023' },
    { id: 4, name: '12/09/2023' },
  ];

  // TOGGLE FROM DATE
  const toggleDropdownFromDate = () => {
    setFromDateDropdown(!fromDateDropdown);
  };

  const handleDropdownFromDate = (name) => {
    setDefaultFromDateText(name);
    setFromDateDropdown(!fromDateDropdown);
    editReport((prev) => ({
      ...prev,
      name: name,
    }));
  };

  // TO DATE DUMMY
  const toDate = [
    { id: 1, name: '12/09/2023' },
    { id: 2, name: '12/09/2023' },
    { id: 3, name: '12/09/2023' },
    { id: 4, name: '12/09/2023' },
  ];

  // TOGGLE TO DATE
  const toggleDropdownToDate = () => {
    setToDateDropdown(!toDateDropdown);
  };

  const handleDropdownToDate = (name) => {
    setDefaultToDateText(name);
    setToDateDropdown(!toDateDropdown);
    editReport((prev) => ({
      ...prev,
      name: name,
    }));
  };

  // CALL STATUS DUMMY
  const callStatus = [
    { id: 1, name: 'call status' },
    { id: 2, name: 'call status' },
    { id: 3, name: 'call status' },
    { id: 4, name: 'call status' },
  ];

  // TOGGLE TO DATE
  const toggleDropdownCallStatus = () => {
    setCallStatusDropdown(!callStatusDropdown);
  };

  const handleDropdownCallStatus = (name) => {
    setDefaultCallStatusText(name);
    setCallStatusDropdown(!callStatusDropdown);
    editReport((prev) => ({
      ...prev,
      name: name,
    }));
  };

  // PRODUCT DUMMY
  const product = [
    { id: 1, name: 'product' },
    { id: 2, name: 'product' },
    { id: 3, name: 'product' },
    { id: 4, name: 'product' },
  ];

  // TOGGLE TO DATE
  const toggleDropdownProduct = () => {
    setProductDropdown(!productDropdown);
  };

  const handleDropdownProduct = (name) => {
    setDefaultProductText(name);
    setProductDropdown(!productDropdown);
    editReport((prev) => ({
      ...prev,
      name: name,
    }));
  };

  return (
    <>
      <div className="flex py-3 px-3 items-center justify-between">
        <h1 className="text-3xl font-medium">Calling Report</h1>
      </div>

      {/* FORM SECTION */}
      <div className="px-3">
        <h1 className="py-2 px-3 font-medium rounded-t-xl bg-cyan-500 text-white text-md shadow-md">
          Calling Report Detail
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex gap-3 bg-white px-4 py-2 pb-4 rounded-b-xl shadow-md flex-col"
        >
          <div className="grid gap-2 pb-3">
            {/* FIRST ROW */}
            <div className="flex space-x-4">
              {/* FROM DATE */}
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="fromDate"
                  className="text-sm font-medium text-gray-700"
                >
                  From Date
                </label>
                <div
                  className="relative"
                  onClick={toggleDropdownFromDate}
                  onMouseLeave={() => setFromDateDropdown(false)}
                >
                  <button
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                    id="fromDate"
                    type="button"
                  >
                    {isEditMode ? editReport.fromDate : defaultFromDateText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {fromDateDropdown && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {fromDate.map(({ key, name }) => (
                          <li
                            className="block px-4 py-2 text-sm hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                            key={key}
                            onClick={() => handleDropdownFromDate(name)}
                          >
                            {name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col w-1/2">
                {/* TO DATE */}
                <label
                  htmlFor="toDate"
                  className="text-sm font-medium text-gray-700"
                >
                  To Date
                </label>
                <div
                  className="relative"
                  onClick={toggleDropdownToDate}
                  onMouseLeave={() => setToDateDropdown(false)}
                >
                  <button
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                    id="toDate"
                    type="button"
                  >
                    {isEditMode ? editReport.toDate : defaultToDateText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {toDateDropdown && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {toDate.map(({ key, name }) => (
                          <li
                            className="block px-4 py-2 text-sm hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                            key={key}
                            onClick={() => handleDropdownToDate(name)}
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
            {/* SECOND ROW */}
            <div className="flex space-x-4">
              {/* CALL STATUS */}
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="callStatus"
                  className="text-sm font-medium text-gray-700"
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
                    {isEditMode ? editReport.callStatus : defaultCallStatusText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {callStatusDropdown && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {callStatus.map(({ key, name }) => (
                          <li
                            className="block px-4 py-2 text-sm hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
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
              <div className="flex flex-col w-1/2">
                {/* PRODUCT */}
                <label
                  htmlFor="product"
                  className="text-sm font-medium text-gray-700"
                >
                  Product
                </label>
                <div
                  className="relative"
                  onClick={toggleDropdownProduct}
                  onMouseLeave={() => setProductDropdown(false)}
                >
                  <button
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                    id="product"
                    type="button"
                  >
                    {isEditMode ? editReport.product : defaultProductText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {productDropdown && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {product.map(({ key, name }) => (
                          <li
                            className="block px-4 py-2 text-sm hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                            key={key}
                            onClick={() => handleDropdownProduct(name)}
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
          {/* BUTTON */}
          <div className="flex justify-end gap-5">
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-32 py-4 mt-20 mb-4 bg-cyan-500 text-white hover:text-cyan-500 hover:bg-white border-2 border-cyan-500 rounded"
              >
                {isEditMode ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

// from date, to date
// call status product
