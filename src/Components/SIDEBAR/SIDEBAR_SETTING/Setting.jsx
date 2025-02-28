import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//external Packages
import axios from "axios";

import { IoMdSettings } from "react-icons/io";

//Folder Imported
import { tenant_base_url, protocal_url } from "../../../Config/config";
import { getHostnamePart } from "./ReusableComponents/GlobalHostUrl";

const settingButtons = [
  {
    key: 1,
    value: "User Setting",
    link: "/panel/setting/User-Setting",
    group: "User's Settings",
  },
  {
    key: 2,
    value: "User Operation",
    link: "/panel/setting/User-Operation",
    group: "User's Settings",
  },
  {
    key: 3,
    value: "Group",
    link: "/panel/setting/group",
    group: "User's Settings",
  },
  {
    key: 27,
    value: "Roles & Permissions",
    link: "/panel/setting/roles-permissions",
    group: "User's Settings",
  },
  {
    key: 7,
    value: "Lead Status",
    link: "/panel/setting/lead_status",
    group: "Lead Settings",
  },
  {
    key: 8,
    value: "Pools",
    link: "/panel/setting/pools",
    group: "Lead Settings",
  },
  {
    key: 9,
    value: "Segments",
    link: "/panel/setting/segments",
    group: "Lead Settings",
  },
  {
    key: 10,
    value: "SMS Template",
    link: "/panel/setting/sms-template",
    group: "ENV Settings",
  },
  {
    key: 11,
    value: "E-Mail Template",
    link: "/panel/setting/email-template",
    group: "ENV Settings",
  },
  {
    key: 15,
    value: "SMS Setting",
    link: "/panel/setting/sms-Settings",
    group: "ENV Settings",
  },
  {
    key: 16,
    value: "E-Mail Setting",
    link: "/panel/setting/email-Settings",
    group: "ENV Settings",
  },
  {
    key: 21,
    value: "Access Device",
    link: "/panel/setting/access-device",
    group: "Security Settings",
  },
  {
    key: 24,
    value: "Access Control",
    link: "/panel/setting/access-control",
    group: "Security Settings",
  },
  {
    key: 4,
    value: "Department",
    link: "/panel/setting/department",
    group: "Other Settings",
  },
  {
    key: 5,
    value: "Designation",
    link: "/panel/setting/designation",
    group: "Other Settings",
  },
  {
    key: 26,
    value: "Expense Head",
    link: "/panel/setting/expensehead",
    group: "Other Settings",
  },
  {
    key: 6,
    value: "Qualification",
    link: "/panel/setting/qualification",
    group: "Other Settings",
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
      <div className="flex flex-col m-3">
        {/* Header Section Parent*/}
        <div className="flex justify-between rounded-t-xl bg-gradient-to-r from-cyan-500 from-20% via-sky-600 via-100% p-3 text-white">
          {/* Heading */}
          <h1 className="flex items-center gap-2 text-2xl tracking-wide roboto-slab-setting">
            <IoMdSettings /> Setting Dashboard
          </h1>
        </div>

        {/* Main Section */}
        <div className="flex items-start min-h-screen px-4 py-8 bg-white rounded-b-xl">
          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* Setting Cards */}
            {Object.keys(groupedData).map((group) => (
              <div key={group} className="rounded-b-lg shadow-md rounded-t-xl">
                <h2 className="flex justify-center px-4 py-2 text-lg text-white border-b rounded-t-xl bg-sky-500">
                  {group}
                </h2>
                {/* Buttons */}
                <div className="grid w-full grid-cols-1 gap-2 my-2">
                  {groupedData[group].map((button) => (
                    <div
                      key={button.key}
                      onClick={() => navigate(button.link)}
                      className="p-2 mx-4 text-center bg-white border-2 rounded-full shadow-md border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white"
                    >
                      {button.value}
                    </div>
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
