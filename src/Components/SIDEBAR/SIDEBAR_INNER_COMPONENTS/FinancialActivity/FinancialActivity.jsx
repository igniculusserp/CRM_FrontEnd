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
        config
      );
      console.log("Permission Data : ", response.data.data);
      const permissionsList = response?.data?.data;

      if (permissionsList) {
        const serviceBoxPermissions = permissionsList.find(
          (item) => item.moduleName === "Financial Activity"
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
    <div className="min-h-screen flex flex-col m-3">
      {showTopSection && (
        <div className="py-2 px-3 bg-white flex items-center justify-between rounded-md">
          <div className="flex gap-3">
            {/* DYNAMIC BUTTONS */}
            <div className="flex gap-4">
              {Object.keys(dynamicButtons).map((key) =>
                permissions.includes(key) ? (
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
                ) : null
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
            ) : (
              ""
            )}
          </div>
        </div>
      )}
      {selectedButton === "View Expenses" ? (
        permissions.includes("View Expenses") ? (
          <ExpenseView setShowTopSection={setShowTopSection} />
        ) : (
          ""
        )
      ) : permissions.includes("View Brokerage") ? (
        <BrokerageView />
      ) : (
        ""
      )}
    </div>
  );
}
