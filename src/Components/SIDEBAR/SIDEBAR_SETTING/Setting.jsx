import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//external Packages
import axios from "axios";

//Folder Imported
import { tenant_base_url, protocal_url } from "../../../Config/config";
import { getHostnamePart } from "./ReusableComponents/GlobalHostUrl";

const settingButtons = [
  {
    key: 1,
    value: "User Setting",
    link: "/panel/settings/user-settings",
    group: "User - Settings",
  },
  {
    key: 2,
    value: "User Operation",
    link: "/panel/settings/user-Operation",
    group: "User - Settings",
  },
  {
    key: 3,
    value: "Group",
    link: "/panel/settings/group",
    group: "User - Settings",
  },
  {
    key: 27,
    value: "Roles & Permissions",
    link: "/panel/settings/roles-permissions",
    group: "User - Settings",
  },
  {
    key: 7,
    value: "Lead Status",
    link: "/panel/settings/lead_status",
    group: "Lead - Settings",
  },
  {
    key: 8,
    value: "Pools",
    link: "/panel/settings/pools",
    group: "Lead - Settings",
  },
  {
    key: 9,
    value: "Segments",
    link: "/panel/settings/segments",
    group: "Lead - Settings",
  },
  {
    key: 10,
    value: "SMS Template",
    link: "/panel/settings/sms-template",
    group: "ENV - Settings",
  },
  {
    key: 11,
    value: "E-Mail Template",
    link: "/panel/settings/email-template",
    group: "ENV - Settings",
  },
  {
    key: 15,
    value: "SMS Setting",
    link: "/panel/settings/sms-Settings",
    group: "ENV - Settings",
  },
  {
    key: 16,
    value: "E-Mail Setting",
    link: "/panel/settings/email-Settings",
    group: "ENV - Settings",
  },
  {
    key: 21,
    value: "Access Device",
    link: "/panel/settings/access-device",
    group: "Security - Settings",
  },
  {
    key: 24,
    value: "Access Control",
    link: "/panel/settings/access-control",
    group: "Security - Settings",
  },
  {
    key: 4,
    value: "Department",
    link: "/panel/settings/department",
    group: "Other - Settings",
  },
  {
    key: 5,
    value: "Designation",
    link: "/panel/settings/designation",
    group: "Other - Settings",
  },
  {
    key: 26,
    value: "Expense Head",
    link: "/panel/settings/expensehead",
    group: "Other - Settings",
  },
  {
    key: 6,
    value: "Qualification",
    link: "/panel/settings/qualification",
    group: "Other - Settings",
  },
  // { key: 20, value: "Call Template" },
  // { key: 12, value: "Plan" },
  // { key: 13, value: "Calendar" },
  // { key: 14, value: "Promotion" },
  // { key: 17, value: "Branch Target" },
  // { key: 18, value: "Notification Popup" },
  // { key: 19, value: "Calling Extension" },
  // { key: 22, value: "DLP" },
  // { key: 23, value: "Alerts" },
  // { key: 25, value: "Password Policy" },
];

export default function Setting() {
  const navigate = useNavigate();

  const name = getHostnamePart();

  // -------------------------------------- Group the data by the `group` property -------------------------------------
  const groupedData = settingButtons.reduce((acc, item) => {
    acc[item.group] = acc[item.group] || [];
    acc[item.group].push(item);
    return acc;
  }, {});

  //---------------------------------------------------- Roles & Permissions ----------------------------------------------------

  const businessRole = localStorage.getItem("businessRole");
  // const [permissions, setPermissions] = useState([]);

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
          (item) => item.moduleName === "Settings",
        );

        if (serviceBoxPermissions) {
          const permissionsArray = serviceBoxPermissions.permissions.split(",");
          // setPermissions(permissionsArray);

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
      <div className="m-3 flex flex-col">
        {/* Header Section */}
        <div className="flex justify-between rounded-t-xl bg-gradient-to-r from-cyan-500 to-cyan-700 px-6 py-4 text-white shadow-lg">
          <h1 className="text-2xl font-semibold tracking-wide">
            Setting Dashboard
          </h1>
        </div>

        {/* Main Section */}
        <div className="flex min-h-screen items-start rounded-b-xl bg-gray-100 px-4 py-8">
          <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* Setting Cards */}
            {Object.keys(groupedData).map((group) => (
              <div
                key={group}
                className="rounded-lg border bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-2xl"
              >
                {/* Card Header */}
                <h2 className="mb-4 flex justify-center rounded-t-xl border-b bg-cyan-500 px-4 py-2 pb-2 text-lg font-bold text-white">
                  {group}
                </h2>
                {/* Buttons */}
                <div className="flex flex-wrap gap-3">
                  {groupedData[group].map((button) => (
                    <button
                      key={button.key}
                      onClick={() => navigate(button.link)}
                      className="w-full rounded-full bg-gradient-to-r from-blue-400 to-blue-500 px-4 py-2 text-white shadow-md transition-all duration-300 hover:from-blue-500 hover:to-blue-600 hover:shadow-lg"
                    >
                      {button.value}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
