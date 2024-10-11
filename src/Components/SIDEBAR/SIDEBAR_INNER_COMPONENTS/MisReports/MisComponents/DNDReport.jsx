import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';

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
  const [startDateDropdown, setStartDateDropdown] = useState(false);
  const [defaultStartDateText, setDefaultStartDateText] = useState('Start Date');
  const [endDateDropdown, setEndDateDropdown] = useState(false);
  const [defaultEndDateText, setDefaultEndDateText] = useState('End Date');

  // FROM DATE DUMMY
  const startDate = [
    { id: 1, name: '12/09/2023' },
    { id: 2, name: '12/09/2023' },
    { id: 3, name: '12/09/2023' },
    { id: 4, name: '12/09/2023' },
  ];

  // TOGGLE FROM DATE
  const toggleDropdownStartDate = () => {
    setStartDateDropdown(!startDateDropdown);
  };

  const handleDropdownStartDate = (name) => {
    setDefaultStartDateText(name);
    setStartDateDropdown(!startDateDropdown);
    editReport((prev) => ({
      ...prev,
      name: name,
    }));
  };

  // TO DATE DUMMY
  const endDate = [
    { id: 1, name: '12/09/2023' },
    { id: 2, name: '12/09/2023' },
    { id: 3, name: '12/09/2023' },
    { id: 4, name: '12/09/2023' },
  ];

  // TOGGLE TO DATE
  const toggleDropdownEndDate = () => {
    setEndDateDropdown(!endDateDropdown);
  };

  const handleDropdownEndDate = (name) => {
    setDefaultEndDateText(name);
    setEndDateDropdown(!endDateDropdown);
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
          <div className="grid gap-2 pb-3">
            <div className="flex space-x-4">
              {/* START DATE */}
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="startDate"
                  className="text-sm font-medium text-gray-700"
                >
                  Start Date
                </label>
                <div
                  className="relative"
                  onClick={toggleDropdownStartDate}
                  onMouseLeave={() => setStartDateDropdown(false)}
                >
                  <button
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                    id="startDate"
                    type="button"
                  >
                    {isEditMode ? editReport.startDate : defaultStartDateText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {startDateDropdown && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {startDate.map(({ key, name }) => (
                          <li
                            className="block px-4 py-2 text-sm hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                            key={key}
                            onClick={() => handleDropdownStartDate(name)}
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
                {/* END DATE */}
                <label
                  htmlFor="endDate"
                  className="text-sm font-medium text-gray-700"
                >
                  End Date
                </label>
                <div
                  className="relative"
                  onClick={toggleDropdownEndDate}
                  onMouseLeave={() => setEndDateDropdown(false)}
                >
                  <button
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                    id="endDate"
                    type="button"
                  >
                    {isEditMode ? editReport.endDate : defaultEndDateText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {endDateDropdown && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {endDate.map(({ key, name }) => (
                          <li
                            className="block px-4 py-2 text-sm hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                            key={key}
                            onClick={() => handleDropdownEndDate(name)}
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
