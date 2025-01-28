import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import axios from "axios";
import { tenant_base_url, protocal_url } from "./../../../../../Config/config";
import AddPermission from "./AddPermission";

import { ToastContainer } from "react-toastify";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../../utils/toastNotifications";
import EditPermission from "./EditPermission";

export default function Permissions() {
  const [activeComponent, setActiveComponent] = useState("Table");
  const [selectedId, setSelectedId] = useState(null);

  // ------------------------------ Permissions Handle Add Button ------------------------

  const handleAdd = () => {
    setActiveComponent("Add");
  };

  // ------------------------------ Permissions Handle Cancel Button ------------------------

  const handleCancel = () => {
    setActiveComponent("Table");
  };

  // ------------------------------ Permissions Handle Edit Button ------------------------

  const handleEdit = (id) => {
    setSelectedId(id); // Set the selected id
    setActiveComponent("Update");
  };

  //------------------------------------Permissions Table -----------------------------
  const PermissionsTable = () => {
    const [data, setData] = useState([]);

    const fullURL = window.location.href;
    const url = new URL(fullURL);
    const name = url.hostname.split(".")[0];

    // ------------------------------ Permissions Get All  ------------------------

    async function handleGetAll() {
      const bearer_token = localStorage.getItem("token");
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${bearer_token}`,
          },
        };
        const response = await axios.get(
          `${protocal_url}${name}.${tenant_base_url}/Security/rolesandpermissions/getall`,
          config,
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    }

    useEffect(() => {
      handleGetAll();
    }, []);

    // ------------------------------ Permissions Handle Delete ------------------------

    const handleDelete = async (id) => {
      const bearer_token = localStorage.getItem("token");
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${bearer_token}`,
          },
        };
        await axios.delete(
          `${protocal_url}${name}.${tenant_base_url}/Security/rolesandpermissions/delete/${id}`,
          config,
        );
        setData((prevData) => prevData.filter((item) => item.id !== id));
        showSuccessToast("Deleted Successfully");
        handleGetAll();
      } catch (error) {
        console.log(error);
        showErrorToast(error.response.data.message);
      }
    };

    return (
      <div className="m-3 min-w-screen">
        <ToastContainer />
        <div className="flex min-w-screen justify-between items-center flex-wrap gap-5">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-medium">Permissions</h1>
          </div>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white p-2 min-w-10 text-sm rounded"
          >
            Add Permissions
          </button>
        </div>
        <div className="overflow-x-auto mt-3 shadow-md leads_Table_Main_Container">
          <div className="min-w-full rounded-md leads_Table_Container">
            <table className="min-w-full bg-white leads_Table">
              <thead>
                <tr className="border-gray-300 border-b-2">
                  <th className="px-1 py-3">
                    <input type="checkbox" />
                  </th>
                  <th className="px-2 py-3 text-left border-r font-medium">
                    <div className="flex justify-between items-center text-sm">
                      <span>Group Name</span>
                      <FaBars />
                    </div>
                  </th>
                  <th className="px-2 py-3 text-left border-r font-medium">
                    <div className="flex justify-between items-center text-sm">
                      <span>Module Name</span>
                      <FaBars />
                    </div>
                  </th>
                  <th className="px-2 py-3 text-left border-r font-medium">
                    <div className="flex justify-between items-center text-sm">
                      <span>Action</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((permission) => (
                  <tr
                    key={permission.id}
                    className="cursor-pointer hover:bg-gray-200 border-gray-300 border-b"
                  >
                    <td className="px-1 py-3 text-center">
                      <input type="checkbox" />
                    </td>
                    <td className="px-2 py-4 text-sm max-w-24 break-words">
                      {permission.groupName}
                    </td>
                    <td className="px-2 py-4 text-sm max-w-24 break-words">
                      {permission.moduleName}
                    </td>

                    <td className="px-2 py-4 flex gap-3 justify-center">
                      <MdEdit
                        size={25}
                        color="white"
                        className="bg-blue-500 rounded"
                        onClick={() => handleEdit(permission.id)}
                      />
                      <RiDeleteBin6Fill
                        size={25}
                        color="red"
                        onClick={() => handleDelete(permission.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {activeComponent === "Table" ? (
        <PermissionsTable />
      ) : activeComponent === "Add" ? (
        // <AddAccessControl onCancel={handleCancel} />
        <AddPermission onCancel={handleCancel} />
      ) : activeComponent === "Update" ? (
        // <EditAccessControl onCancel={handleCancel} id={selectedId} />
        <EditPermission onCancel={handleCancel} permissionId={selectedId} />
      ) : (
        ""
      )}
    </>
  );
}
