import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function UserReport() {
  const [editReport, setEditReport] = useState({
    subsStartDate: '',
    subsEndDate: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);

  // HANDLING FORM SUBMISSION
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // DROPDOWNS
  const [subsStartDropdown, setSubsStartDropdown] = useState(false);
  const [defaultSubsStartText, setDefaultSubsStartText] = useState(
    'Subscription Start Date'
  );
  const [subsEndDropdown, setSubsEndDropdown] = useState(false);
  const [defaultSubsEndText, setDefaultSubsEndText] = useState(
    'Subscription End Date'
  );

  // SUBSCRIPTION START DUMMY
  const subsStart = [
    { id: 1, name: '12/09/2023' },
    { id: 2, name: '12/09/2023' },
    { id: 3, name: '12/09/2023' },
    { id: 4, name: '12/09/2023' },
  ];

  // SUBSCRIPTION START
  const toggleDropdownSubsStart = () => {
    setSubsStartDropdown(!subsStartDropdown);
  };

  const handleDropdownSubsStart = (name) => {
    setDefaultSubsStartText(name);
    setSubsStartDropdown(!subsStartDropdown);
    editReport((prev) => ({
      ...prev,
      name: name,
    }));
  };

  // SUBSCRIPTION END DUMMY
  const subsEnd = [
    { id: 1, name: '12/09/2023' },
    { id: 2, name: '12/09/2023' },
    { id: 3, name: '12/09/2023' },
    { id: 4, name: '12/09/2023' },
  ];

  // TOGGLE SUBSCRIPTION END DATE
  const toggleDropdownSubsEnd = () => {
    setSubsEndDropdown(!subsEndDropdown);
  };

  const handleDropdownSubsEnd = (name) => {
    setDefaultSubsEndText(name);
    setSubsEndDropdown(!subsEndDropdown);
    editReport((prev) => ({
      ...prev,
      name: name,
    }));
  };

  return (
    <>
      <div className="flex py-2 px-3 m-3 items-center justify-between bg-white rounded-md shadow-md">
        <h1 className="text-xl">Add User Report</h1>
        <Link
          to="/sidebar/misreports"
          className="px-4 py-1 rounded mx-3 border border-blue-500 text-blue-500"
        >
          Cancel
        </Link>
      </div>

      {/* FORM SECTION */}
      <div className="px-3">
        <h1 className="py-2 px-3 font-medium rounded-t-xl bg-cyan-500 text-white text-md shadow-md">
          User Report Detail
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex gap-3 bg-white px-4 py-2 pb-4 rounded-b-xl shadow-md flex-col"
        >
          <div className="grid gap-2 pb-3">
            <div className="flex space-x-4">
              {/* SUBSCRIPTION START DATE */}
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="subsStartDate"
                  className="text-sm font-medium text-gray-700"
                >
                  Subscription Start Date
                </label>
                <div
                  className="relative"
                  onClick={toggleDropdownSubsStart}
                  onMouseLeave={() => setSubsStartDropdown(false)}
                >
                  <button
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                    id="subsStartDate"
                    type="button"
                  >
                    {isEditMode
                      ? editReport.subsStartDate
                      : defaultSubsStartText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {subsStartDropdown && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {subsStart.map(({ key, name }) => (
                          <li
                            className="block px-4 py-2 text-sm hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                            key={key}
                            onClick={() => handleDropdownSubsStart(name)}
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
                {/* SUBSCRIPTION END DATE */}
                <label
                  htmlFor="subsEndDate"
                  className="text-sm font-medium text-gray-700"
                >
                  Subscription End Date
                </label>
                <div
                  className="relative"
                  onClick={toggleDropdownSubsEnd}
                  onMouseLeave={() => setSubsEndDropdown(false)}
                >
                  <button
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                    id="subsEndDate"
                    type="button"
                  >
                    {isEditMode ? editReport.subsEndDate : defaultSubsEndText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {subsEndDropdown && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {subsEnd.map(({ key, name }) => (
                          <li
                            className="block px-4 py-2 text-sm hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                            key={key}
                            onClick={() => handleDropdownSubsEnd(name)}
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
