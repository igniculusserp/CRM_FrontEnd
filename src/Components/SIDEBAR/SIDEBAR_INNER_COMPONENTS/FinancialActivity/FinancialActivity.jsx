import { useState, useEffect } from "react";
//external Packages
import axios from "axios";
import ExpenseView from "./ExpenseView/ExpenseView";
import BrokerageView from "./ExpenseView/BrokerageView";
//Folder Imported
import { tenant_base_url, protocal_url } from "./../../../../Config/config";
import { getHostnamePart } from "./../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";
export default function FinancialActivity() {
  const name = getHostnamePart();
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

  //---------------------------------------------------- Roles & Permissions ----------------------------------------------------

  const businessRole = localStorage.getItem("businessRole");
  const [permissions, setPermissions] = useState([]);

  async function handleGetPermission() {
    const bearer_token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Security/rolesandpermissions/getgroupwise/${businessRole}`,
        config,
      );
      console.log("Permission Data : ", response.data.data);
      const permissionsList = response?.data?.data;

      if (permissionsList) {
        const serviceBoxPermissions = permissionsList.find(
          (item) => item.moduleName === "Financial Activity",
        );

        if (serviceBoxPermissions) {
          const permissionsArray = serviceBoxPermissions.permissions.split(",");
          setPermissions(permissionsArray);

          console.log("List : ", permissionsArray);

          //------------------------------------------------------ Set permissions ------------------------------------------------
        }
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  }

  useEffect(() => {
    handleGetPermission();
  }, []);

  return (
    <div className="m-3 flex min-h-screen flex-col">
      {showTopSection && (
        <div className="finance_Buttons_Text finance_Buttons_Main_Container flex flex-wrap items-center justify-between gap-3 rounded-md bg-white px-3 py-2">
          <div className="flex">
            {/* DYNAMIC BUTTONS */}
            <div className="flex gap-4">
              {Object.keys(dynamicButtons).map((key) =>
                permissions.includes(key) || businessRole === "Admin" ? (
                  <button
                    key={key}
                    onClick={() => handleOptionClick(key)}
                    className={`text-md whitespace-nowrap rounded px-4 py-1.5 font-light ${
                      selectedButton === key
                        ? "bg-cyan-500 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {key}
                  </button>
                ) : null,
              )}
            </div>
            {/* ALL Expense DROPDOWN */}
            {selectedButton === "View Expenses" ? (
              <div
                className="relative"
                onClick={toggleSmsBoxDropdown}
                onMouseLeave={() => setSmsBoxDropdown(false)}
              >
                {smsBoxDropdown && (
                  <div className="absolute top-10 z-10 rounded-md border border-gray-300 bg-white">
                    <ul className="py-2 text-sm text-gray-700">
                      {smsDropdown.map(({ key, value }) => (
                        <li
                          className="block w-56 cursor-pointer border-b px-4 py-2 hover:bg-cyan-500 hover:text-white"
                          key={key}
                        >
                          {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
      {selectedButton === "View Expenses" ? (
        permissions.includes("View Expenses") || businessRole === "Admin" ? (
          <ExpenseView setShowTopSection={setShowTopSection} />
        ) : (
          ""
        )
      ) : permissions.includes("View Brokerage") || businessRole === "Admin" ? (
        <BrokerageView />
      ) : (
        ""
      )}
    </div>
  );
}
