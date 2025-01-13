import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//external Packages
import axios from "axios";
import { useLocation } from "react-router-dom";
import UserSetting from "./SIDEBAR_SETTING_COMPONENTS/User_Setting/UserSetting";
import UserOperation from "./SIDEBAR_SETTING_COMPONENTS/User_Operation/UserOperation";
import Group from "./SIDEBAR_SETTING_COMPONENTS/Group/Group";
import Department from "./SIDEBAR_SETTING_COMPONENTS/Department/Department";
import Designation from "./SIDEBAR_SETTING_COMPONENTS/Designation/Designation";
import Qualification from "./SIDEBAR_SETTING_COMPONENTS/Qualification/Qualification";
import LeadStatus from "./SIDEBAR_SETTING_COMPONENTS/LeadStatus/LeadStatus";
import Pools from "./SIDEBAR_SETTING_COMPONENTS/Pools/Pools";
import Segments from "./SIDEBAR_SETTING_COMPONENTS/Segments/Segments";
import SMSTemplate from "./SIDEBAR_SETTING_COMPONENTS/SMSTemplate/SMSTemplate";
import EmailTemplate from "./SIDEBAR_SETTING_COMPONENTS/EmailTemplate/EmailTemplate";
import CallTemplate from "./SIDEBAR_SETTING_COMPONENTS/CallTemplate/CallTemplate";
import Plan from "./SIDEBAR_SETTING_COMPONENTS/Plan/Plan";
// import Calendar from './Calendar';
import Promotion from "./SIDEBAR_SETTING_COMPONENTS/Promotion/Promotion";
import SMSSetting from "./SIDEBAR_SETTING_COMPONENTS/SMSSetting/SMSSetting";
import EmailSetting from "./SIDEBAR_SETTING_COMPONENTS/EmailSetting/EmailSetting";
import BranchTarget from "./SIDEBAR_SETTING_COMPONENTS/BranchTarget/BranchTarget";
import NotificationPopup from "./SIDEBAR_SETTING_COMPONENTS/NotificationPopup/NotificationPopup";
import CallingExtension from "./SIDEBAR_SETTING_COMPONENTS/CallingExtension/CallingExtension";
import AccessDevice from "./SIDEBAR_SETTING_COMPONENTS/AccessDevice/AccessDevice";
import Dlp from "./SIDEBAR_SETTING_COMPONENTS/DLP/Dlp";
import Alert from "./SIDEBAR_SETTING_COMPONENTS/Alert/Alert";
import AccessControl from "./SIDEBAR_SETTING_COMPONENTS/AccessControl/AccessControl";
import PasswordPolicy from "./SIDEBAR_SETTING_COMPONENTS/PasswordPolicy/PasswordPolicy";
import ExpenseHead from "./SIDEBAR_SETTING_COMPONENTS/ExpenseHead/ExpenseHead";
import Permissions from "./SIDEBAR_SETTING_COMPONENTS/Permissions/Permissions";

//Folder Imported
import { tenant_base_url, protocal_url } from "../../../Config/config";
import { getHostnamePart } from "./ReusableComponents/GlobalHostUrl";

export default function Setting() {
  const navigate = useNavigate();

  const name = getHostnamePart();

  // ------------------------------------------------------Handle Navigation --------------------------------------------------

  const handleNavigation = (path) => {
    navigate(path);
  };

  const buttons = [
    { key: 1, value: "User Setting" },
    { key: 2, value: "User Operation" },
    { key: 3, value: "Group" },
    { key: 4, value: "Department" },
    { key: 5, value: "Designation" },
    { key: 6, value: "Qualification" },
    { key: 7, value: "Lead Status" },
    { key: 8, value: "Pools" },
    { key: 9, value: "Segments" },
    { key: 26, value: "Expense Head" },
    { key: 10, value: "SMS Template" },
    { key: 11, value: "E-Mail Template" },
    // { key: 20, value: "Call Template" },
    // { key: 12, value: "Plan" },
    // { key: 13, value: "Calendar" },
    // { key: 14, value: "Promotion" },
    { key: 15, value: "SMS Setting" },
    { key: 16, value: "E-Mail Setting" },
    // { key: 17, value: "Branch Target" },
    // { key: 18, value: "Notification Popup" },
    // { key: 19, value: "Calling Extension" },
    { key: 21, value: "Access Device" },
    // { key: 22, value: "DLP" },
    // { key: 23, value: "Alerts" },
    { key: 24, value: "Access Control" },
    // { key: 25, value: "Password Policy" },
    { key: 27, value: "Roles & Permissions" },
  ];

  const componentMap = {
    1: UserSetting,
    2: UserOperation,
    3: Group,
    4: Department,
    5: Designation,
    6: Qualification,
    7: LeadStatus,
    8: Pools,
    9: Segments,
    10: SMSTemplate,
    11: EmailTemplate,
    // 20: CallTemplate,
    // 12: Plan,
    // 14: Promotion,
    15: SMSSetting,
    16: EmailSetting,
    // 17: BranchTarget,
    // 18: NotificationPopup,
    // 19: CallingExtension,
    21: AccessDevice,
    // 22: Dlp,
    // 23: Alert,
    24: AccessControl,
    // 25: PasswordPolicy,
    26: ExpenseHead,
    27: Permissions,
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
          (item) => item.moduleName === "Settings"
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
    <>
      <div className="flex flex-col m-3">
        <div className="flex justify-between px-3 bg-white border rounded py-3">
          <div className="flex items-center justify-center">
            <h1 className="text-xl py-1">Setting Dashboard</h1>
          </div>
        </div>
        <div className="min-h-screen bg-gray-10 flex  items-start py-8 settings_Border">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6 w-full">
       {/* -------------------------------- User Setting Card ------------------------------------------- */}
          <div
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center"
          >
            <h2 className="text-xl font-semibold mb-4">User - Settings</h2>
            <div className="flex flex-col space-y-3 w-full">
              <button
                // onClick={() => handleNavigation(`/page1/card${index + 1}`)}
                className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Go to Page 1
              </button>
              <button
                // onClick={() => handleNavigation(`/page2/card${index + 1}`)}
                className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Go to Page 2
              </button>
              <button
                // onClick={() => handleNavigation(`/page3/card${index + 1}`)}
                className="py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                Go to Page 3
              </button>
              <button
                // onClick={() => handleNavigation(`/page4/card${index + 1}`)}
                className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Go to Page 4
              </button>
            </div>
          </div>

          <div
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center"
          >
            <h2 className="text-xl font-semibold mb-4">Card</h2>
            <div className="flex flex-col space-y-3 w-full">
              <button
                // onClick={() => handleNavigation(`/page1/card${index + 1}`)}
                className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Go to Page 1
              </button>
              <button
                // onClick={() => handleNavigation(`/page2/card${index + 1}`)}
                className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Go to Page 2
              </button>
              <button
                // onClick={() => handleNavigation(`/page3/card${index + 1}`)}
                className="py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                Go to Page 3
              </button>
              <button
                // onClick={() => handleNavigation(`/page4/card${index + 1}`)}
                className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Go to Page 4
              </button>
            </div>
          </div>

          <div
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center"
          >
            <h2 className="text-xl font-semibold mb-4">Card</h2>
            <div className="flex flex-col space-y-3 w-full">
              <button
                // onClick={() => handleNavigation(`/page1/card${index + 1}`)}
                className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Go to Page 1
              </button>
              <button
                // onClick={() => handleNavigation(`/page2/card${index + 1}`)}
                className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Go to Page 2
              </button>
              <button
                // onClick={() => handleNavigation(`/page3/card${index + 1}`)}
                className="py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                Go to Page 3
              </button>
              <button
                // onClick={() => handleNavigation(`/page4/card${index + 1}`)}
                className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Go to Page 4
              </button>
            </div>
          </div>

          <div
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center"
          >
            <h2 className="text-xl font-semibold mb-4">Card</h2>
            <div className="flex flex-col space-y-3 w-full">
              <button
                // onClick={() => handleNavigation(`/page1/card${index + 1}`)}
                className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Go to Page 1
              </button>
              <button
                // onClick={() => handleNavigation(`/page2/card${index + 1}`)}
                className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Go to Page 2
              </button>
              <button
                // onClick={() => handleNavigation(`/page3/card${index + 1}`)}
                className="py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                Go to Page 3
              </button>
              <button
                // onClick={() => handleNavigation(`/page4/card${index + 1}`)}
                className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Go to Page 4
              </button>
            </div>
          </div>

          <div
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center"
          >
            <h2 className="text-xl font-semibold mb-4">Card</h2>
            <div className="flex flex-col space-y-3 w-full">
              <button
                // onClick={() => handleNavigation(`/page1/card${index + 1}`)}
                className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Go to Page 1
              </button>
              <button
                // onClick={() => handleNavigation(`/page2/card${index + 1}`)}
                className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Go to Page 2
              </button>
              <button
                // onClick={() => handleNavigation(`/page3/card${index + 1}`)}
                className="py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                Go to Page 3
              </button>
              <button
                // onClick={() => handleNavigation(`/page4/card${index + 1}`)}
                className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Go to Page 4
              </button>
            </div>
          </div>
    
      </div>
        </div>
      </div>
    </>
  );
}
