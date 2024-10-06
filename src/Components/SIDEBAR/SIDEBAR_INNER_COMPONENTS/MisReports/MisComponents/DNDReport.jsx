import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

export default function DNDReport() {
  const [editReport, setEditReport] = useState({
    startDate: '',
    endDate: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);

  // HANDLING FORM SUBMISSION
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // DROPDOWNS
  const [fromDateDropdown, setFromDateDropdown] = useState(false);
  const [defaultFromDateText, setDefaultFromDateText] = useState('Start Date');
  const [toDateDropdown, setToDateDropdown] = useState(false);
  const [defaultToDateText, setDefaultToDateText] = useState('End Date');

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

  return (
    <>
      <div className="flex py-3 px-3 items-center justify-between">
        <h1 className="text-3xl font-medium">DND Report</h1>
      </div>

      {/* FORM SECTION */}
      <div className="px-3">
        <h1 className="py-2 px-3 font-medium rounded-t-xl bg-cyan-500 text-white text-md shadow-md">
          DND Report Detail
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex gap-3 bg-white px-4 py-2 pb-4 rounded-b-xl shadow-md flex-col"
        >
          <div className="flex-1 flex gap-4">
            {/* LEFT SIDE */}
            <div className="flex-1 flex flex-col">
              {/* SUBSCRIPTION START DATE DROPDOWN */}
              <label
                htmlFor="startDate"
                className="text-sm font-medium text-gray-700"
              >
                Start Date
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
                  {isEditMode ? editReport.startDate : defaultFromDateText}
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
            {/* RIGHT SIDE */}
            <div className="flex-1 flex flex-col">
              {/* SUBSCRIPTION END DATE DROPDOWN */}
              <label
                htmlFor="endDate"
                className="text-sm font-medium text-gray-700"
              >
                End Date
              </label>
              <div
                className="relative"
                onClick={toggleDropdownToDate}
                onMouseLeave={() => setToDateDropdown(false)}
              >
                <button
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                  id="endDate"
                  type="button"
                >
                  {isEditMode ? editReport.endDate : defaultToDateText}
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
          {/* BUTTON */}
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
        </form>
      </div>
    </>
  );
}