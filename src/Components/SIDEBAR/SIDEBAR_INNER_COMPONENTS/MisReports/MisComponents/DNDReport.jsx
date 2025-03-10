import { useState,useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function DNDReport() {
  const [editReport, setEditReport] = useState({
    startDate: "",
    endDate: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);

  // HANDLING FORM SUBMISSION
  const handleSubmit = (e) => {
    e.preventDefault();
  };
      //--------------------------------------- Set Business Type --------------------------------------------
      const [BusinessType, setBusinessType] = useState("");
                
      useEffect(() => {
        const storedType = localStorage.getItem("businessType") || "";
        setBusinessType(storedType);
      }, []);
  

  // DROPDOWNS
  const [startDateDropdown, setStartDateDropdown] = useState(false);
  const [defaultStartDateText, setDefaultStartDateText] =
    useState("Start Date");
  const [endDateDropdown, setEndDateDropdown] = useState(false);
  const [defaultEndDateText, setDefaultEndDateText] = useState("End Date");

  // FROM DATE DUMMY
  const startDate = [
    { id: 1, name: "12/09/2023" },
    { id: 2, name: "12/09/2023" },
    { id: 3, name: "12/09/2023" },
    { id: 4, name: "12/09/2023" },
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
    { id: 1, name: "12/09/2023" },
    { id: 2, name: "12/09/2023" },
    { id: 3, name: "12/09/2023" },
    { id: 4, name: "12/09/2023" },
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
      <div className="m-3 flex items-center justify-between rounded-md bg-white px-3 py-2 shadow-md">
        <h1 className="text-xl">Add DND Report</h1>
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
          DND Report Detail
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 rounded-b-xl bg-white px-4 py-2 pb-4 shadow-md"
        >
          <div className="grid gap-2 pb-3">
            <div className="flex space-x-4">
              {/* START DATE */}
              <div className="flex w-1/2 flex-col">
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
                    className="mt-1 flex w-full items-center justify-between rounded-md border border-gray-300 p-2"
                    id="startDate"
                    type="button"
                  >
                    {isEditMode ? editReport.startDate : defaultStartDateText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {startDateDropdown && (
                    <div className="absolute top-10 z-10 w-full rounded-md border border-gray-300 bg-white">
                      <ul className="py-2 text-sm text-gray-700">
                        {startDate.map(({ key, name }) => (
                          <li
                            className="block cursor-pointer border-b px-4 py-2 text-sm hover:bg-cyan-500 hover:text-white"
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
              <div className="flex w-1/2 flex-col">
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
                    className="mt-1 flex w-full items-center justify-between rounded-md border border-gray-300 p-2"
                    id="endDate"
                    type="button"
                  >
                    {isEditMode ? editReport.endDate : defaultEndDateText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {endDateDropdown && (
                    <div className="absolute top-10 z-10 w-full rounded-md border border-gray-300 bg-white">
                      <ul className="py-2 text-sm text-gray-700">
                        {endDate.map(({ key, name }) => (
                          <li
                            className="block cursor-pointer border-b px-4 py-2 text-sm hover:bg-cyan-500 hover:text-white"
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
