import { useState } from "react";

function LeftDrawer({ isOpen, onClose }) {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedSubmenu, setSelectedSubmenu] = useState(null);

  const handleMenuClick = (menu) => {
    if (selectedMenu === menu) {
      setSelectedMenu(null); // Close the menu if it's already open
    } else {
      setSelectedMenu(menu);
      setSelectedSubmenu(null); // Reset submenu selection when changing main menu
    }
  };

  const handleSubmenuClick = (submenu) => {
    setSelectedSubmenu(submenu);
  };

  return (
    <div className="relative">
      {/* Drawer sadasd*/}
      <div
        className={`fixed right-0 top-0 h-full w-64 transform bg-gray-800 text-white ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } z-50 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold">Setting Menu</h2>
          <ul className="mt-4">
            {/* Main Menu Items */}
            <li
              className={`cursor-pointer px-4 py-2 ${
                selectedMenu === "menu1" ? "bg-gray-700" : ""
              }`}
              onClick={() => handleMenuClick("menu1")}
            >
              Users Setting
              {/* Submenu */}
              {selectedMenu === "menu1" && (
                <ul className="ml-4 mt-2">
                  <li
                    className={`cursor-pointer py-1 ${
                      selectedSubmenu === "Users"
                        ? "bg-gray-600 text-blue-300"
                        : ""
                    }`}
                    onClick={() => handleSubmenuClick("Users")}
                  >
                    Users
                  </li>
                  <li
                    className={`cursor-pointer py-1 ${
                      selectedSubmenu === "UserOperations"
                        ? "bg-gray-600 text-blue-300"
                        : ""
                    }`}
                    onClick={() => handleSubmenuClick("UserOperations")}
                  >
                    User Operations
                  </li>
                  <li
                    className={`cursor-pointer py-1 ${
                      selectedSubmenu === "UserQualifications"
                        ? "bg-gray-600 text-blue-300"
                        : ""
                    }`}
                    onClick={() => handleSubmenuClick("UserQualifications")}
                  >
                    User Qualifications Settings
                  </li>
                  <li
                    className={`cursor-pointer py-1 ${
                      selectedSubmenu === "UserGroups"
                        ? "bg-gray-600 text-blue-300"
                        : ""
                    }`}
                    onClick={() => handleSubmenuClick("UserGroups")}
                  >
                    User Groups Settings
                  </li>
                </ul>
              )}
            </li>
            <li
              className={`cursor-pointer px-4 py-2 ${
                selectedMenu === "Department" ? "bg-gray-700" : ""
              }`}
              onClick={() => handleMenuClick("Department")}
            >
              Department Settings
            </li>
            <li
              className={`cursor-pointer px-4 py-2 ${
                selectedMenu === "Designation" ? "bg-gray-700" : ""
              }`}
              onClick={() => handleMenuClick("Designation")}
            >
              Designation Settings
            </li>
            <li
              className={`cursor-pointer px-4 py-2 ${
                selectedMenu === "LeadStatus" ? "bg-gray-700" : ""
              }`}
              onClick={() => handleMenuClick("LeadStatus")}
            >
              Lead Status Settings
            </li>
            <li
              className={`cursor-pointer px-4 py-2 ${
                selectedMenu === "Pool" ? "bg-gray-700" : ""
              }`}
              onClick={() => handleMenuClick("Pool")}
            >
              Pool Settings
            </li>
            <li
              className={`cursor-pointer px-4 py-2 ${
                selectedMenu === "Segments" ? "bg-gray-700" : ""
              }`}
              onClick={() => handleMenuClick("Segments")}
            >
              Segments Settings
            </li>
            <li
              className={`cursor-pointer px-4 py-2 ${
                selectedMenu === "menu2" ? "bg-gray-700" : ""
              }`}
              onClick={() => handleMenuClick("menu2")}
            >
              Template Settings
              {/* Submenu */}
              {selectedMenu === "menu2" && (
                <ul className="ml-4 mt-2">
                  <li
                    className={`cursor-pointer py-1 ${
                      selectedSubmenu === "EmailTemplate"
                        ? "bg-gray-600 text-blue-300"
                        : ""
                    }`}
                    onClick={() => handleSubmenuClick("EmailTemplate")}
                  >
                    E-Mail Template
                  </li>
                  <li
                    className={`cursor-pointer py-1 ${
                      selectedSubmenu === "CallTemplate"
                        ? "bg-gray-600 text-blue-300"
                        : ""
                    }`}
                    onClick={() => handleSubmenuClick("CallTemplate")}
                  >
                    Call Template
                  </li>
                  <li
                    className={`cursor-pointer py-1 ${
                      selectedSubmenu === "SMSTemplate"
                        ? "bg-gray-600 text-blue-300"
                        : ""
                    }`}
                    onClick={() => handleSubmenuClick("SMSTemplate")}
                  >
                    SMS Template
                  </li>
                </ul>
              )}
            </li>
            <li
              className={`cursor-pointer px-4 py-2 ${
                selectedMenu === "menu3" ? "bg-gray-700" : ""
              }`}
              onClick={() => handleMenuClick("menu3")}
            >
              Notification Settings
              {/* Submenu */}
              {selectedMenu === "menu3" && (
                <ul className="ml-4 mt-2">
                  <li
                    className={`cursor-pointer py-1 ${
                      selectedSubmenu === "NotificationPopups"
                        ? "bg-gray-600 text-blue-300"
                        : ""
                    }`}
                    onClick={() => handleSubmenuClick("NotificationPopups")}
                  >
                    Notification Pop-Ups
                  </li>
                  <li
                    className={`cursor-pointer py-1 ${
                      selectedSubmenu === "Alerts"
                        ? "bg-gray-600 text-blue-300"
                        : ""
                    }`}
                    onClick={() => handleSubmenuClick("Alerts")}
                  >
                    Alerts
                  </li>
                </ul>
              )}
            </li>
            <li
              className={`cursor-pointer px-4 py-2 ${
                selectedMenu === "menu4" ? "bg-gray-700" : ""
              }`}
              onClick={() => handleMenuClick("menu4")}
            >
              Communication Settings
              {/* Submenu */}
              {selectedMenu === "menu4" && (
                <ul className="ml-4 mt-2">
                  <li
                    className={`cursor-pointer py-1 ${
                      selectedSubmenu === "EmailSettings"
                        ? "bg-gray-600 text-blue-300"
                        : ""
                    }`}
                    onClick={() => handleSubmenuClick("EmailSettings")}
                  >
                    E-Mail Settings
                  </li>
                  <li
                    className={`cursor-pointer py-1 ${
                      selectedSubmenu === "CallExtension"
                        ? "bg-gray-600 text-blue-300"
                        : ""
                    }`}
                    onClick={() => handleSubmenuClick("CallExtension")}
                  >
                    Calling Extension
                  </li>
                  <li
                    className={`cursor-pointer py-1 ${
                      selectedSubmenu === "SMSSettings"
                        ? "bg-gray-600 text-blue-300"
                        : ""
                    }`}
                    onClick={() => handleSubmenuClick("SMSSettings")}
                  >
                    SMS Settings
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-50"
          onClick={onClose}
        ></div>
      )}
    </div>
  );
}

export default LeftDrawer;
