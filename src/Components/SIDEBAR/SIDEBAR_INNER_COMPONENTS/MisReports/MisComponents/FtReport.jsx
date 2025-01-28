import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function FtReport() {
  const [editReport, setEditReport] = useState({
    freeTrialStartDate: "",
    freeTrialEndDate: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);

  // HANDLING FORM SUBMISSION
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // DROPDOWNS
  const [freeTrialStartDropdown, setFreeTrialStartDropdown] = useState(false);
  const [defaultFreeTrialStartText, setDefaultFreeTrialStartText] = useState(
    "Free Trial Start Date",
  );
  const [freeTrialEndDropdown, setFreeTrialEndDropdown] = useState(false);
  const [defaultFreeTrialEndText, setDefaultFreeTrialEndText] = useState(
    "Free Trial End Date",
  );

  // FREE TRIAL START DUMMY
  const freeTrialStart = [
    { id: 1, name: "12/09/2023" },
    { id: 2, name: "12/09/2023" },
    { id: 3, name: "12/09/2023" },
    { id: 4, name: "12/09/2023" },
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
    { id: 1, name: "12/09/2023" },
    { id: 2, name: "12/09/2023" },
    { id: 3, name: "12/09/2023" },
    { id: 4, name: "12/09/2023" },
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
      <div className="m-3 flex items-center justify-between rounded-md bg-white px-3 py-2 shadow-md">
        <h1 className="text-xl">Add Ft Report</h1>
        <Link
          to="/panel/misreports"
          className="mx-3 rounded border border-blue-500 px-4 py-1 text-blue-500"
        >
          Cancel
        </Link>
      </div>

      {/* FORM SECTION */}
      <div className="px-3">
        <h1 className="text-md rounded-t-xl bg-cyan-500 px-3 py-2 font-medium text-white shadow-md">
          General Report Detail
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 rounded-b-xl bg-white px-4 py-2 pb-4 shadow-md"
        >
          <div className="grid gap-2 pb-3">
            <div className="flex space-x-4">
              {/* FREE TRIAL START DATE */}
              <div className="flex w-1/2 flex-col">
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
                    className="mt-1 flex w-full items-center justify-between rounded-md border border-gray-300 p-2"
                    id="freeTrialStartDate"
                    type="button"
                  >
                    {isEditMode
                      ? editReport.freeTrialStartDate
                      : defaultFreeTrialStartText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {freeTrialStartDropdown && (
                    <div className="absolute top-10 z-10 w-full rounded-md border border-gray-300 bg-white">
                      <ul className="py-2 text-sm text-gray-700">
                        {freeTrialStart.map(({ key, name }) => (
                          <li
                            className="block cursor-pointer border-b px-4 py-2 text-sm hover:bg-cyan-500 hover:text-white"
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
              <div className="flex w-1/2 flex-col">
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
                    className="mt-1 flex w-full items-center justify-between rounded-md border border-gray-300 p-2"
                    id="freeTrialEndDate"
                    type="button"
                  >
                    {isEditMode
                      ? editReport.freeTrialEndDate
                      : defaultFreeTrialEndText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {freeTrialEndDropdown && (
                    <div className="absolute top-10 z-10 w-full rounded-md border border-gray-300 bg-white">
                      <ul className="py-2 text-sm text-gray-700">
                        {freeTrialEnd.map(({ key, name }) => (
                          <li
                            className="block cursor-pointer border-b px-4 py-2 text-sm hover:bg-cyan-500 hover:text-white"
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
                className="mb-4 mt-20 rounded border-2 border-cyan-500 bg-cyan-500 px-32 py-4 text-white hover:bg-white hover:text-cyan-500"
              >
                {isEditMode ? "Update" : "Save"}
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
