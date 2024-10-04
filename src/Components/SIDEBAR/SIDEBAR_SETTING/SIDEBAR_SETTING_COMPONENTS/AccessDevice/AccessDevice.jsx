import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import axios from "axios";
import { tenant_base_url, protocal_url } from "./../../../../../Config/config";

export default function AccessDevice() {
  const [data, setData] = useState([]);
  const [activeComponent, setActiveComponent] = useState("Table");
  const fullURL = window.location.href;
  const url = new URL(fullURL);
  const name = url.hostname.split(".")[0];

  // -------------------Fetch All Access Devices---------------------
  async function handleLead() {
    const bearer_token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Setting/getAllAccessDevices`,
        config
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  }

  useEffect(() => {
    handleLead(); // Fetch the pools list on initial load
  }, []);

  // ------------------Delete Access Devices By ID---------------------
  const handleDelete = async (id) => {
    const bearer_token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      await axios.delete(
        `${protocal_url}${name}.${tenant_base_url}/Setting/deleteAccessDevice/${id}`,
        config
      );
      setData((prevData) => prevData.filter((item) => item.id !== id));
      alert("Access Device deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to delete pool. Please try again.");
    }
  };

  // Handle cancel form action
  const handleCancel = () => {
    setActiveComponent("Table");
  };

  const handleAdd = () => {
    setActiveComponent("Add");
  };

  // Form Component for Adding/Updating Pools
  // const PoolForm = () => {

  //   return (
  //     <div>
  //       <div className="flex min-w-screen justify-between items-center">
  //         <h1 className="text-3xl font-medium">
  //           {isEditMode ? "Edit Pool" : "Add Pool"}
  //         </h1>
  //         <button
  //           onClick={handleCancel}
  //           className="border border-blue-600 bg-white text-blue-600 px-4 py-2 min-w-10 text-sm rounded"
  //         >
  //           Cancel
  //         </button>
  //       </div>

  //       <form  className="flex">
  //         <div className="w-full">
  //           <div className="mt-3 bg-white rounded-xl shadow-md flex-grow">
  //             <h2 className="font-medium py-2 px-4 rounded-t-xl text-white bg-cyan-500">
  //               Pool Information
  //             </h2>
  //             <div className="py-2 px-4 min-h-screen relative">
  //               <div className="flex space-x-4">
  //                 <div className="flex flex-col w-1/2">
  //                   <label
  //                     htmlFor="poolName"
  //                     className="text-sm font-medium text-gray-700"
  //                   >
  //                     Pool Name
  //                   </label>
  //                   <input
  //                     type="text"
  //                     name="poolName"
  //                     value={formData.poolName || ""}
  //                     onChange={handleChange}
  //                     className="mt-1 p-2 border border-gray-300 rounded-md"
  //                   />
  //                 </div>
  //               </div>

  //               <button
  //                 type="submit"
  //                 className="mt-4 hover:bg-cyan-500 border border-cyan-500 text-cyan-500 hover:text-white px-4 py-4 rounded-md absolute top-[200px]"
  //               >
  //                 {isEditMode ? "Update Pool" : "Save Pool"}
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </form>
  //     </div>
  //   );
  // };

  //------------------------------ Access Device Table Component ---------------------------

  const AccessDeviceTable = () => {
    return (
      <div className="m-3 min-w-screen">
        <div className="flex min-w-screen justify-between items-center">
          <h1 className="text-3xl font-medium">Access Device</h1>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white p-2 min-w-10 text-sm rounded"
          >
            Add Access Device
          </button>
        </div>
        <div className="overflow-x-auto mt-3">
          <div className="min-w-full overflow-hidden rounded-md">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="border-gray-300 border-b-2">
                  <th className="px-1 py-3">
                    <input type="checkbox" />
                  </th>
                  <th className="px-2 py-3 text-left border-r font-medium">
                    <div className="flex justify-between items-center text-sm">
                      <span>User ID</span>
                      <FaBars />
                    </div>
                  </th>
                  <th className="px-2 py-3 text-left border-r font-medium">
                    <div className="flex justify-between items-center text-sm">
                      <span>User Name</span>
                      <FaBars />
                    </div>
                  </th>
                  <th className="px-2 py-3 text-left border-r font-medium">
                    <div className="flex justify-between items-center text-sm">
                      <span>Device Type</span>
                      <FaBars />
                    </div>
                  </th>
                  <th className="px-2 py-3 text-left border-r font-medium">
                    <div className="flex justify-between items-center text-sm">
                      <span>Device Address</span>
                      <FaBars />
                    </div>
                  </th>
                  <th className="px-2 py-3 text-left border-r font-medium">
                    <div className="flex justify-between items-center text-sm">
                      <span>Device Token</span>
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
                {data.map((device) => (
                  <tr
                    key={device.id}
                    className="cursor-pointer hover:bg-gray-200 border-gray-300 border-b"
                  >
                    <td className="px-1 py-3 text-center">
                      <input type="checkbox" />
                    </td>
                    <td className="px-2 py-4 text-sm max-w-24 break-words">
                      {device.userId}
                    </td>
                    <td className="px-2 py-4 text-sm max-w-24 break-words">
                      {device.userName}
                    </td>
                    <td className="px-2 py-4 text-sm max-w-24 break-words">
                      {device.deviceType}
                    </td>
                    <td className="px-2 py-4 text-sm max-w-24 break-words">
                      {device.deviceAddress}
                    </td>
                    <td className="px-2 py-4 text-sm max-w-24 break-words">
                      {device.deviceToken}
                    </td>
                    <td className="px-2 py-4 flex gap-3 justify-center">
                      <MdEdit
                        size={25}
                        color="white"
                        className="bg-blue-500 rounded"
                        // onClick={() => handleEdit(device)}
                      />
                      <RiDeleteBin6Fill
                        size={25}
                        color="red"
                        onClick={() => handleDelete(device.id)}
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

  //------------------------------ADD Access Device Component ---------------------------

const AccessDeviceAdd = () => {
  const [addDevice, setAddDevice] = useState({
    userId: "",
    userName: "",
    deviceType: "",
    deviceAddress: "",
    deviceToken: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddDevice((prevDevice) => ({
      ...prevDevice,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const bearer_token = localStorage.getItem("token");

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
          "Content-Type": "application/json",
        },
      };

      // Make sure to pass the `addDevice` data in the request body
      await axios.post(
        `${protocal_url}${name}.${tenant_base_url}/Setting/addAccessDevice`,
        addDevice, // Data to send
        config
      );
      alert("Device added successfully");

      // Redirect or reset form after successful submission
    } catch (error) {
      if (error.response) {
        console.error("Error data:", error.response.data);
      } else {
        console.error("Error:", error.message);
      }
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col m-3 overflow-x-auto overflow-y-hidden">
      <div className="flex py-2 px-2 items-center justify-between bg-white rounded-md shadow-md">
        <h1 className="text-xl">Edit Voice Box</h1>
        <div
        onClick={handleCancel}
          className="px-4 py-1 rounded mx-3 border border-blue-500 text-blue-500"
        >
          Cancel
        </div>
      </div>
      <div className="overflow-hidden shadow-md">
        <div className="py-2 px-6 bg-cyan-500 rounded-t-xl mt-3">
          <h1 className="text-white">Voice Box Details</h1>
        </div>
        {/* CREATE DEVICE FORM */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col py-2 px-4 bg-white rounded-b-xl">
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col">
                {/* User ID */}
                <label
                  htmlFor="userId"
                  className="text-sm font-medium text-gray-700"
                >
                  User ID
                </label>
                <input
                  type="text"
                  name="userId"
                  value={addDevice.userId}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Enter user ID"
                />
                {/* User Name */}
                <label
                  htmlFor="userName"
                  className="text-sm font-medium text-gray-700"
                >
                  User Name
                </label>
                <input
                  type="text"
                  name="userName"
                  value={addDevice.userName}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Enter user name"
                />
                {/* Device Type */}
                <label
                  htmlFor="deviceType"
                  className="text-sm font-medium text-gray-700"
                >
                  Device Type
                </label>
                <input
                  type="text"
                  name="deviceType"
                  value={addDevice.deviceType}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Enter device type"
                />
                {/* Device Address */}
                <label
                  htmlFor="deviceAddress"
                  className="text-sm font-medium text-gray-700"
                >
                  Device Address
                </label>
                <input
                  type="text"
                  name="deviceAddress"
                  value={addDevice.deviceAddress}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Enter device address"
                />
                {/* Device Token */}
                <label
                  htmlFor="deviceToken"
                  className="text-sm font-medium text-gray-700"
                >
                  Device Token
                </label>
                <input
                  type="text"
                  name="deviceToken"
                  value={addDevice.deviceToken}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Enter device token"
                />
              </div>
            </div>
            <div className="flex justify-end gap-5 mr-10">
              <div className="flex justify-end mr-20">
                <button
                  type="submit"
                  className="px-32 py-4 mt-40 mb-4 bg-cyan-500 text-white hover:text-cyan-500 hover:bg-white border-2 border-cyan-500 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};




  return (
    <>
      {activeComponent === "Table" ? (
        <AccessDeviceTable />
      ) : activeComponent === "Add" ? (
        <AccessDeviceAdd />
      ) : (
        ""
      )}
    </>
  );
}
