import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';

export default function FtReport() {
  const [editReport, setEditReport] = useState({
    freeTrialStartDate: '',
    freeTrialEndDate: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);

  // HANDLING FORM SUBMISSION
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // DROPDOWNS
  const [freeTrialStartDropdown, setFreeTrialStartDropdown] = useState(false);
  const [defaultFreeTrialStartText, setDefaultFreeTrialStartText] = useState(
    'Free Trial Start Date'
  );
  const [freeTrialEndDropdown, setFreeTrialEndDropdown] = useState(false);
  const [defaultFreeTrialEndText, setDefaultFreeTrialEndText] = useState(
    'Free Trial End Date'
  );

  // FREE TRIAL START DUMMY
  const freeTrialStart = [
    { id: 1, name: '12/09/2023' },
    { id: 2, name: '12/09/2023' },
    { id: 3, name: '12/09/2023' },
    { id: 4, name: '12/09/2023' },
  ];

  // TOGGLE FREE TRAIL START
  const toggleDropdownFreeTrialStart = () => {
    setFreeTrialStartDropdown(!freeTrialStartDropdown);
  };

  const handleDropdownFreeTrialStart = (name) => {
    setDefaultFreeTrialStartText(name);
    setFreeTrialStartDropdown(!freeTrialStartDropdown);
    editReport((prev) => ({
      ...prev,
      name: name,
    }));
  };

  // FREE TRIAL END DUMMY
  const freeTrialEnd = [
    { id: 1, name: '12/09/2023' },
    { id: 2, name: '12/09/2023' },
    { id: 3, name: '12/09/2023' },
    { id: 4, name: '12/09/2023' },
  ];

  // TOGGLE FREE END START
  const toggleDropdownFreeTrialEnd = () => {
    setFreeTrialEndDropdown(!freeTrialEndDropdown);
  };

  const handleDropdownFreeTrialEnd = (name) => {
    setDefaultFreeTrialEndText(name);
    setFreeTrialEndDropdown(!freeTrialEndDropdown);
    editReport((prev) => ({
      ...prev,
      name: name,
    }));
  };

  return (
    <>
      <div className="flex py-3 px-3 items-center justify-between">
        <h1 className="text-3xl font-medium">View Client Logs</h1>
      </div>

      {/* FORM SECTION */}
      <div className="px-3">
        <h1 className="py-2 px-3 font-medium rounded-t-xl bg-cyan-500 text-white text-md shadow-md">
          Client Logs Information
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex gap-3 bg-white px-4 py-2 pb-4 rounded-b-xl shadow-md flex-col"
        >
          <div className="grid gap-2 pb-3">
            <div className="flex space-x-4">
              {/* FREE TRIAL START DATE */}
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="freeTrialStartDate"
                  className="text-sm font-medium text-gray-700"
                >
                  Free Trial Start Date
                </label>
                <div
                  className="relative"
                  onClick={toggleDropdownFreeTrialStart}
                  onMouseLeave={() => setFreeTrialStartDropdown(false)}
                >
                  <button
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                    id="freeTrialStartDate"
                    type="button"
                  >
                    {isEditMode
                      ? editReport.freeTrialStartDate
                      : defaultFreeTrialStartText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {freeTrialStartDropdown && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {freeTrialStart.map(({ key, name }) => (
                          <li
                            className="block px-4 py-2 text-sm hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                            key={key}
                            onClick={() => handleDropdownFreeTrialStart(name)}
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
                {/* FREE TRIAL START DATE */}
                <label
                  htmlFor="freeTrialEndDate"
                  className="text-sm font-medium text-gray-700"
                >
                  Free Trial End Date
                </label>
                <div
                  className="relative"
                  onClick={toggleDropdownFreeTrialEnd}
                  onMouseLeave={() => setFreeTrialEndDropdown(false)}
                >
                  <button
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                    id="freeTrialEndDate"
                    type="button"
                  >
                    {isEditMode
                      ? editReport.freeTrialEndDate
                      : defaultFreeTrialEndText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {freeTrialEndDropdown && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {freeTrialEnd.map(({ key, name }) => (
                          <li
                            className="block px-4 py-2 text-sm hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                            key={key}
                            onClick={() => handleDropdownFreeTrialEnd(name)}
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

{
  /* FREE TRIAL END DATE DROPDOWN */
}
{
  /*
   */
}
