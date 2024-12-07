import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import ExpenseView from "./ExpenseView/ExpenseView";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
 //file
// import { tenant_base_url, protocal_url } from "../../../../Config/config";
// import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

export default function FinancialActivity() {
  const [smsBoxDropdown, setSmsBoxDropdown] = useState(false);
  const [showTopSection, setShowTopSection] = useState(true);

  //   TOGGLE SMSBOXDROPDOWN
  const toggleSmsBoxDropdown = () => {
    setSmsBoxDropdown(!smsBoxDropdown);
  };


  //   Sales Orders Data
  const smsDropdown = [
    { key: 1, value: "Man Insited" },
    { key: 2, value: "Man Insited" },
  ];


  const dynamicButtons = {
    "View Expenses": { text: "View Expenses" },
    "View Brokerage": { text: "View Brokerage" },
  };

  const [selectedButton, setSelectedButton] = useState("View Expenses");

  const handleOptionClick = (key) => {
    setSelectedButton(key);
  };

  return (
    <div className="min-h-screen flex flex-col m-3">
      {showTopSection && (
      <div className="py-2 px-3 bg-white flex items-center justify-between rounded-md">
        <div className="flex gap-3">
          {/* DYNAMIC BUTTONS */}
          <div className="flex gap-4">
            {Object.keys(dynamicButtons).map((key) => (
              <button
                key={key}
                onClick={() => handleOptionClick(key)}
                className={`px-4 py-1.5 rounded font-light text-md ${
                  selectedButton === key
                    ? "bg-cyan-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {key}
              </button>
            ))}
          </div>
          {/* ALL Expense DROPDOWN */}
          {selectedButton==="View Expenses"?
          <div
          className="relative"
          onClick={toggleSmsBoxDropdown}
          onMouseLeave={() => setSmsBoxDropdown(false)}
        >
          <button
            className="py-2 px-4 border rounded-md  flex justify-between items-center"
            id="dropdownDefaultButton"
            type="button"
          >
            Select Head
            <FaAngleDown className="ml-2 text-gray-900" />
          </button>
          {smsBoxDropdown && (
            <div className="absolute bg-white border border-gray-300 rounded-md top-10 z-10">
              <ul className="py-2 text-sm text-gray-700">
                {smsDropdown.map(({ key, value }) => (
                  <li
                    className="block w-56 px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                    key={key}
                  >
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
          :""}
        </div>
        
      </div>
      )}
      {selectedButton==="View Expenses"?
         <ExpenseView setShowTopSection={setShowTopSection}  />
        :"Brokerage"}
      
    </div>
  );
}
