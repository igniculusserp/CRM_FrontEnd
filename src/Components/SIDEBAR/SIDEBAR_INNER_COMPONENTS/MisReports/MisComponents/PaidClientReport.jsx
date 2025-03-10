import { useState,useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function PaidClientReport() {
              //--------------------------------------- Set Business Type --------------------------------------------
                       const [BusinessType, setBusinessType] = useState("");
                        
                       useEffect(() => {
                         const storedType = localStorage.getItem("businessType") || "";
                         setBusinessType(storedType);
                       }, []);

  const [editReport, setEditReport] = useState({
    subsStartDate: "",
    subsEndDate: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);

  // HANDLING FORM SUBMISSION
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // DROPDOWNS
  const [subsStartDropdown, setSubsStartDropdown] = useState(false);
  const [defaultSubsStartText, setDefaultSubsStartText] = useState(
    "Subscription Start Date",
  );
  const [subsEndDropdown, setSubsEndDropdown] = useState(false);
  const [defaultSubsEndText, setDefaultSubsEndText] = useState(
    "Subscription End Date",
  );

  // SUBSCRIPTION START DUMMY
  const subsStart = [
    { id: 1, name: "12/09/2023" },
    { id: 2, name: "12/09/2023" },
    { id: 3, name: "12/09/2023" },
    { id: 4, name: "12/09/2023" },
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
    { id: 1, name: "12/09/2023" },
    { id: 2, name: "12/09/2023" },
    { id: 3, name: "12/09/2023" },
    { id: 4, name: "12/09/2023" },
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
      <div className="m-3 flex items-center justify-between rounded-md bg-white px-3 py-2 shadow-md">
        <h1 className="text-xl">Add Paid Client Report</h1>
        <Link
          to={`/panel/${BusinessType}/misreports`}
          className="mx-3 rounded border border-blue-500 px-4 py-1 text-blue-500"
        >
          Cancel
        </Link>
      </div>

      {/* FORM SECTION */}
      <div className="px-3">
        <h1 className="text-md rounded-t-xl bg-cyan-500 px-3 py-2 font-medium text-white shadow-md">
          Paid Client Report Detail
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 rounded-b-xl bg-white px-4 py-2 pb-4 shadow-md"
        >
          <div className="grid gap-2 pb-3">
            <div className="flex space-x-4">
              {/* SUBSCRIPTION START DATE */}
              <div className="flex w-1/2 flex-col">
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
                    className="mt-1 flex w-full items-center justify-between rounded-md border border-gray-300 p-2"
                    id="subsStartDate"
                    type="button"
                  >
                    {isEditMode
                      ? editReport.subsStartDate
                      : defaultSubsStartText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {subsStartDropdown && (
                    <div className="absolute top-10 z-10 w-full rounded-md border border-gray-300 bg-white">
                      <ul className="py-2 text-sm text-gray-700">
                        {subsStart.map(({ key, name }) => (
                          <li
                            className="block cursor-pointer border-b px-4 py-2 text-sm hover:bg-cyan-500 hover:text-white"
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
              <div className="flex w-1/2 flex-col">
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
                    className="mt-1 flex w-full items-center justify-between rounded-md border border-gray-300 p-2"
                    id="subsEndDate"
                    type="button"
                  >
                    {isEditMode ? editReport.subsEndDate : defaultSubsEndText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {subsEndDropdown && (
                    <div className="absolute top-10 z-10 w-full rounded-md border border-gray-300 bg-white">
                      <ul className="py-2 text-sm text-gray-700">
                        {subsEnd.map(({ key, name }) => (
                          <li
                            className="block cursor-pointer border-b px-4 py-2 text-sm hover:bg-cyan-500 hover:text-white"
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
