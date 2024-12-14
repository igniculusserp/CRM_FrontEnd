import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import axios from "axios";
import { getHostnamePart } from "./../../ReusableComponents/GlobalHostUrl";
import { tenant_base_url, protocal_url } from "./../../../../../Config/config";

// ------------------- CHILD COMPONENTS -------------------
import AddSMSSetting from "./Add_SMS/AddSMSSetting";
import EditSMSSetting from "./Edit_SMS/EditSMSSetting";
import { showErrorToast, showSuccessToast } from "../../../../../utils/toastNotifications";

// ------------------------------ SMS Settings --------------------------
export default function SMSSetting() {
  const [activeComponent, setActiveComponent] = useState("Table");
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const name = getHostnamePart();

  // ------------------------------ E-Mail Settings Handle Add Button --------------------------
  const handleAdd = () => {
    setActiveComponent("Add");
  };

  // ------------------------------ E-Mail Settings Handle Edit Button --------------------------

  const handleEdit = (id) => {
    setActiveComponent("Update");
    setSelectedId(id);
  };

  // ------------------------------ E-Mail Settings Get All  ------------------------
  async function handleGetAll() {
    const bearer_token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Admin/smssetting/getall`,
        config
      );
      setData(response.data.data);
    } catch (error) {
      showErrorToast(error.response.data.messsage)
    }
  }

  useEffect(() => {
    handleGetAll();
  }, []);

  // ------------------------------ E-Mail Settings Handle Delete ------------------------

  const handleDelete = async (id) => {
    const bearer_token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      await axios.delete(
        `${protocal_url}${name}.${tenant_base_url}/Admin/smssetting/delete/${id}`,
        config
      );
      setData((prevData) => prevData.filter((item) => item.id !== id));
      showSuccessToast('Deleted successfully')
      handleGetAll();
    } catch (error) {
      console.log(error);
      alert("Failed to delete pool. Please try again.");
    }
  };

  // ------------------------------------ SMS SETTING TABLE ------------------------------------
  const SMSSettingTable = () => {
    return (
      <div className="m-3 min-w-screen">
        <div className="flex min-w-screen justify-between items-center">
          <h1 className="text-3xl font-medium">SMS Setting</h1>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white p-2 min-w-10 text-sm rounded"
          >
            Add SMS Setting
          </button>
        </div>
        <div className="overflow-x-auto mt-3 shadow-md">
          <div className="min-w-full overflow-hidden rounded-md">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="border-gray-300 border-b-2">
                  <th className="px-1 py-3">
                    <input type="checkbox" />
                  </th>
                  <th className="px-2 py-3 text-left border-r font-medium">
                    <div className="flex justify-between items-center text-sm">
                      <span>API Sender ID</span>
                      <FaBars />
                    </div>
                  </th>
                  <th className="px-2 py-3 text-left border-r font-medium">
                    <div className="flex justify-between items-center text-sm">
                      <span>API Key</span>
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
                {data.map((user) => (
                  <tr
                    key={user.id}
                    className="cursor-pointer hover:bg-gray-200 border-gray-300 border-b"
                  >
                    <td className="px-1 py-3 text-center">
                      <input type="checkbox" />
                    </td>
                    <td className="px-2 py-4 text-sm max-w-24 break-words">
                      {user.senderId}
                    </td>
                    <td className="px-2 py-4 text-sm max-w-24 break-words">
                      {user.apiKey}
                    </td>

                    <td className="px-2 py-4 flex gap-3 justify-center">
                      <MdEdit
                        size={25}
                        color="white"
                        className="bg-blue-500 rounded"
                        onClick={() => handleEdit(user.id)}
                      />
                      <RiDeleteBin6Fill
                        size={25}
                        color="red"
                        onClick={() => handleDelete(user.id)}
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
        <SMSSettingTable />
      ) : activeComponent === "Add" ? (
        <AddSMSSetting
          setActiveComponent={setActiveComponent}
          handleGetAll={handleGetAll}
        />
      ) : activeComponent === "Update" ? (
        <EditSMSSetting
          setActiveComponent={setActiveComponent}
          handleGetAll={handleGetAll}
          id={selectedId}
        />
      ) : (
        ""
      )}
    </>
  );
}
