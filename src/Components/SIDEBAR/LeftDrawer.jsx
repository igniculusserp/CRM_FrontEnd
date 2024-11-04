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
        className={`fixed top-0 right-0 h-full bg-gray-800 text-white w-64 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold">Setting Menu</h2>
          <ul className="mt-4">
            {/* Main Menu Items */}
            <li
              className={`py-2 px-4 cursor-pointer ${
                selectedMenu === "menu1" ? "bg-gray-700" : ""
              }`}
              onClick={() => handleMenuClick("menu1")}
            >
              Users Setting
              {/* Submenu */}
              {selectedMenu === "menu1" && (
                <ul className="ml-4 mt-2">
                  <li
                    className={`py-1 cursor-pointer ${
                      selectedSubmenu === "Users" ? "bg-gray-600 text-blue-300" : ""
                    }`}
                    onClick={() => handleSubmenuClick("Users")}
                  >
                    Users
                  </li>
                  <li
                    className={`py-1 cursor-pointer ${
                      selectedSubmenu === "UserOperations"
                        ? "bg-gray-600 text-blue-300"
                        : ""
                    }`}
                    onClick={() => handleSubmenuClick("UserOperations")}
                  >
                    User Operations
                  </li>
                  <li
                    className={`py-1 cursor-pointer ${
                      selectedSubmenu === "UserQualifications"
                        ? "bg-gray-600 text-blue-300"
                        : ""
                    }`}
                    onClick={() => handleSubmenuClick("UserQualifications")}
                  >
                    User Qualifications Settings
                  </li>
                  <li
                    className={`py-1 cursor-pointer ${
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
              className={`py-2 px-4 cursor-pointer ${
                selectedMenu === "Department" ? "bg-gray-700" : ""
              }`}
              onClick={() => handleMenuClick("Department")}
            >
              Department Settings
            </li>
            <li
              className={`py-2 px-4 cursor-pointer ${
                selectedMenu === "Designation" ? "bg-gray-700" : ""
              }`}
              onClick={() => handleMenuClick("Designation")}
            >
              Designation Settings
            </li>
            <li
              className={`py-2 px-4 cursor-pointer ${
                selectedMenu === "LeadStatus" ? "bg-gray-700" : ""
              }`}
              onClick={() => handleMenuClick("LeadStatus")}
            >
              Lead Status Settings
            </li>
            <li
              className={`py-2 px-4 cursor-pointer ${
                selectedMenu === "Pool" ? "bg-gray-700" : ""
              }`}
              onClick={() => handleMenuClick("Pool")}
            >
              Pool Settings
            </li>
            <li
              className={`py-2 px-4 cursor-pointer ${
                selectedMenu === "Segments" ? "bg-gray-700" : ""
              }`}
              onClick={() => handleMenuClick("Segments")}
            >
              Segments Settings
            </li>
            <li
              className={`py-2 px-4 cursor-pointer ${
                selectedMenu === "menu2" ? "bg-gray-700" : ""
              }`}
              onClick={() => handleMenuClick("menu2")}
            >
              Template Settings
              {/* Submenu */}
              {selectedMenu === "menu2" && (
                <ul className="ml-4 mt-2">
                  <li
                    className={`py-1 cursor-pointer ${
                      selectedSubmenu === "EmailTemplate" ? "bg-gray-600 text-blue-300" : ""
                    }`}
                    onClick={() => handleSubmenuClick("EmailTemplate")}
                  >
                    E-Mail Template
                  </li>
                  <li
                    className={`py-1 cursor-pointer ${
                      selectedSubmenu === "CallTemplate" ? "bg-gray-600 text-blue-300" : ""
                    }`}
                    onClick={() => handleSubmenuClick("CallTemplate")}
                  >
                    Call Template
                  </li>
                  <li
                    className={`py-1 cursor-pointer ${
                      selectedSubmenu === "SMSTemplate" ? "bg-gray-600 text-blue-300" : ""
                    }`}
                    onClick={() => handleSubmenuClick("SMSTemplate")}
                  >
                    SMS Template
                  </li>
                </ul>
              )}
            </li>
            <li
              className={`py-2 px-4 cursor-pointer ${
                selectedMenu === "menu3" ? "bg-gray-700" : ""
              }`}
              onClick={() => handleMenuClick("menu3")}
            >
              Notification Settings
              {/* Submenu */}
              {selectedMenu === "menu3" && (
                <ul className="ml-4 mt-2">
                  <li
                    className={`py-1 cursor-pointer ${
                      selectedSubmenu === "NotificationPopups" ? "bg-gray-600 text-blue-300" : ""
                    }`}
                    onClick={() => handleSubmenuClick("NotificationPopups")}
                  >
                    Notification Pop-Ups
                  </li>
                  <li
                    className={`py-1 cursor-pointer ${
                      selectedSubmenu === "Alerts" ? "bg-gray-600 text-blue-300" : ""
                    }`}
                    onClick={() => handleSubmenuClick("Alerts")}
                  >
                    Alerts
                  </li>
                </ul>
              )}
            </li>
            <li
              className={`py-2 px-4 cursor-pointer ${
                selectedMenu === "menu4" ? "bg-gray-700" : ""
              }`}
              onClick={() => handleMenuClick("menu4")}
            >
              Communication Settings
              {/* Submenu */}
              {selectedMenu === "menu4" && (
                <ul className="ml-4 mt-2">
                  <li
                    className={`py-1 cursor-pointer ${
                      selectedSubmenu === "EmailSettings" ? "bg-gray-600 text-blue-300" : ""
                    }`}
                    onClick={() => handleSubmenuClick("EmailSettings")}
                  >
                    E-Mail Settings
                  </li>
                  <li
                    className={`py-1 cursor-pointer ${
                      selectedSubmenu === "CallExtension" ? "bg-gray-600 text-blue-300" : ""
                    }`}
                    onClick={() => handleSubmenuClick("CallExtension")}
                  >
                    Calling Extension
                  </li>
                  <li
                    className={`py-1 cursor-pointer ${
                      selectedSubmenu === "SMSSettings" ? "bg-gray-600 text-blue-300" : ""
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
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}
    </div>
  );
}

export default LeftDrawer;
