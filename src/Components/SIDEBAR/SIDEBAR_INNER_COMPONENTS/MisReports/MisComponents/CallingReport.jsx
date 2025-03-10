import { useState,useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CallingReport() {
      //--------------------------------------- Set Business Type --------------------------------------------
               const [BusinessType, setBusinessType] = useState("");
                
               useEffect(() => {
                 const storedType = localStorage.getItem("businessType") || "";
                 setBusinessType(storedType);
               }, []);
  const [editReport, setEditReport] = useState({
    fromDate: "",
    ToDate: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);

  // HANDLING FORM SUBMISSION
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // DROPDOWNS
  const [fromDateDropdown, setFromDateDropdown] = useState(false);
  const [defaultFromDateText, setDefaultFromDateText] = useState("From Date");
  const [toDateDropdown, setToDateDropdown] = useState(false);
  const [defaultToDateText, setDefaultToDateText] = useState("To Date");

  // FROM DATE DUMMY
  const fromDate = [
    { id: 1, name: "12/09/2023" },
    { id: 2, name: "12/09/2023" },
    { id: 3, name: "12/09/2023" },
    { id: 4, name: "12/09/2023" },
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
    { id: 1, name: "12/09/2023" },
    { id: 2, name: "12/09/2023" },
    { id: 3, name: "12/09/2023" },
    { id: 4, name: "12/09/2023" },
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
      <div className="m-3 flex items-center justify-between rounded-md bg-white px-3 py-2 shadow-md">
        <h1 className="text-xl">Add Calling Report</h1>
        <Link to={`/panel/${BusinessType}/misreports`}
          className="mx-3 rounded border border-blue-500 px-4 py-1 text-blue-500"
        >
          Cancel
        </Link>
      </div>

      {/* FORM SECTION */}
      <div className="px-3">
        <h1 className="text-md rounded-t-xl bg-cyan-500 px-3 py-2 font-medium text-white shadow-md">
          Calling Report Detail
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 rounded-b-xl bg-white px-4 py-2 pb-4 shadow-md"
        >
          <div className="grid gap-2 pb-3">
            <div className="flex space-x-4">
              {/* FROM DATE */}
              <div className="flex w-1/2 flex-col">
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
                    className="mt-1 flex w-full items-center justify-between rounded-md border border-gray-300 p-2"
                    id="fromDate"
                    type="button"
                  >
                    {isEditMode ? editReport.fromDate : defaultFromDateText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {fromDateDropdown && (
                    <div className="absolute top-10 z-10 w-full rounded-md border border-gray-300 bg-white">
                      <ul className="py-2 text-sm text-gray-700">
                        {fromDate.map(({ key, name }) => (
                          <li
                            className="block cursor-pointer border-b px-4 py-2 text-sm hover:bg-cyan-500 hover:text-white"
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
              <div className="flex w-1/2 flex-col">
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
                    className="mt-1 flex w-full items-center justify-between rounded-md border border-gray-300 p-2"
                    id="toDate"
                    type="button"
                  >
                    {isEditMode ? editReport.toDate : defaultToDateText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {toDateDropdown && (
                    <div className="absolute top-10 z-10 w-full rounded-md border border-gray-300 bg-white">
                      <ul className="py-2 text-sm text-gray-700">
                        {toDate.map(({ key, name }) => (
                          <li
                            className="block cursor-pointer border-b px-4 py-2 text-sm hover:bg-cyan-500 hover:text-white"
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
