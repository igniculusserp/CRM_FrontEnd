import { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { FaAngleDown } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import axios from 'axios';
import { tenant_base_url, protocal_url } from './../../../../../Config/config';

import { getHostnamePart } from "../../ReusableComponents/GlobalHostUrl";
import { ToastContainer } from 'react-toastify';
import { showErrorToast, showSuccessToast } from '../../../../../utils/toastNotifications';



export default function AccessDevice() {
  const [data, setData] = useState([]);
  const [activeComponent, setActiveComponent] = useState('Table');

  const name = getHostnamePart();
  const [idGet, setIdGet] = useState('');

  // -------------------Fetch All Access Devices---------------------
  async function handleLead() {
    const bearer_token = localStorage.getItem('token');
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
      console.error('Error fetching leads:', error);
    }
  }

  useEffect(() => {
    handleLead(); // Fetch the pools list on initial load
  }, []);

  // ------------------Delete Access Devices By ID---------------------
  const handleDelete = async (id) => {
    const bearer_token = localStorage.getItem('token');
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
      alert('Access Device deleted successfully');
    } catch (error) {
      console.log(error);
      alert('Failed to delete pool. Please try again.');
    }
  };

  // Handle cancel form action
  const handleCancel = () => {
    setActiveComponent('Table');
  };

  const handleAdd = () => {
    setActiveComponent('Add');
  };

  const handleEdit = (id) => {
    setActiveComponent('Update');
    setIdGet(id);
  };

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
                        onClick={() => handleEdit(device.id)}
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
      userId: '',
      userName: '',
      deviceType: '',
      deviceToken: '',
      deviceAddress: '',
    });

    //----------------------------------------------------------------------------------------
    //Status_ToDropDown
    const [statusToDropDown, setStatusToDropDown] = useState([]);
    const [defaultTextStatus, setDefaultTextStatus] = useState(
      'Select User Name...'
    );
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
    const [errorStatus, setStatusError] = useState(null); // New error state

    const handleStatus = async () => {
      const bearerToken = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      };

      try {
        const response = await axios.get(
          `${protocal_url}${name}.${tenant_base_url}/Setting/users/byusertoken`,
          config
        );
        setStatusToDropDown(response.data.data);
        console.log('status:', response.data.data);
      } catch (error) {
        console.error('Error fetching leads:', errorStatus);
        console.error('Error fetching leads:', error);
        setStatusError('Failed to fetch pools.');
      }
    };

    useEffect(() => {
      handleStatus();
    }, []);

    const toggleStatusDropdown = () => {
      setIsStatusDropdownOpen((prev) => !prev);
    };

    const handleDropdownStatusSelection = (device) => {
      setIsStatusDropdownOpen(false);
      setDefaultTextStatus(device.userName);
      setAddDevice((prev) => ({
        ...prev,
        userName: device.firstName,
        userId: device.userId,
      }));
    };

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
      const bearer_token = localStorage.getItem('token');

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${bearer_token}`,
            'Content-Type': 'application/json',
          },
        };

        if(!addDevice.userName){
          showErrorToast('Please select user')
          return;
        }
        if(!addDevice.deviceType){
          showErrorToast('Please enter device type')
          return;
        }
        if(!addDevice.deviceToken){
          showErrorToast('Please enter device token')
          return;
        }
        if(!addDevice.deviceAddress){
          showErrorToast('Please enter device address')
          return;
        }
       

        await axios.post(`${protocal_url}${name}.${tenant_base_url}/Setting/addAccessDevice`, addDevice, config);
        alert('Access Device added successfully');
        window.location.reload();

      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    };

    return (
      <div className="flex flex-col m-3 overflow-x-auto overflow-y-hidden">
        <div className="flex py-2 px-2 items-center justify-between bg-white rounded-md shadow-md">
          <h1 className="text-xl">Add Access Device</h1>
          <div
            onClick={handleCancel}
            className="px-4 py-1 rounded mx-3 border border-blue-500 text-blue-500"
          >
            Cancel
          </div>
        </div>
        <div className="overflow-hidden shadow-md">
          <div className="py-2 px-6 bg-cyan-500 rounded-t-xl mt-3">
            <h1 className="text-white">Access Device Information</h1>
          </div>
          {/* CREATE DEVICE FORM */}
          <form onSubmit={handleSubmit}>
            <div className="grid gap-2 py-2 px-3 bg-white rounded-b-xl">
              <div className="flex space-x-4">
                {/* Left Column */}
                <div className="flex flex-col w-1/2 relative">
                  {/* User Name */}
                  <label
                    htmlFor="Pool"
                    className="text-sm font-medium text-gray-700"
                  >
                    Status
                  </label>
                  <div
                    className="relative"
                    onMouseLeave={() => setIsStatusDropdownOpen(false)}
                  >
                    <button
                      onClick={toggleStatusDropdown}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                      id="LeadStatusDropDown"
                      type="button"
                    >
                      {addDevice.userName === ''
                        ? defaultTextStatus
                        : addDevice.userName}
                      <FaAngleDown className="ml-2 text-gray-400" />
                    </button>
                    {isStatusDropdownOpen && (
                      <div className="absolute w-full bg-white border border-gray-300 rounded-md top-11 z-10">
                        {errorStatus ? (
                          <div className="py-2 text-red-600">{errorStatus}</div>
                        ) : (
                          <ul className="py-2 text-sm text-gray-700">
                            {statusToDropDown.map((device) => (
                              <li
                                key={device.id}
                                onClick={() =>
                                  handleDropdownStatusSelection(device)
                                }
                                className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                              >
                                {device.firstName}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Device Type */}
                <div className="flex flex-col w-1/2">
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
                </div>
              </div>

              <div className="flex space-x-4">
                {/* Device Token */}
                <div className="flex flex-col w-1/2">
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
                {/* User ID */}
                <div className="flex flex-col w-1/2">
                  <label
                    htmlFor="userId"
                    className="text-sm font-medium text-gray-700"
                  >
                    User ID
                  </label>
                  <input
                    disabled
                    type="text"
                    name="userId"
                    value={addDevice.userId}
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                    onChange={handleChange}
                    placeholder="Enter user ID"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="flex space-x-4">
                {/* Device Address */}
                <div className="flex flex-col w-1/2">
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
                </div>
              </div>

              <div className="flex justify-start mb-8 mt-3">
                <button
                  type="submit"
                  className="mt-4 hover:bg-cyan-500 border border-cyan-500 text-cyan-500 hover:text-white px-4 py-4 rounded-md"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

  //------------------------------UpDate Access Device Component ---------------------------

  const AccessDeviceUpdate = () => {
    const [addDevice, setAddDevice] = useState({
      id: '',
      userId: '',
      userName: '',
      deviceType: '',
      deviceAddress: '',
      deviceToken: '',
    });

    const [statusToDropDown, setStatusToDropDown] = useState([]);
    const [defaultTextStatus, setDefaultTextStatus] = useState(
      'Select User Name...'
    );
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
    const [errorStatus, setStatusError] = useState(null);

    // Fetch the Access Device by ID
    useEffect(() => {
      if (idGet) {
        handleDeviceId();
      }
    }, [idGet, name, protocal_url, tenant_base_url]);

    const handleDeviceId = async () => {
      const bearer_token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${bearer_token}` },
      };

      try {
        const response = await axios.get(
          `${protocal_url}${name}.${tenant_base_url}/Setting/getAccessDeviceById/${idGet}`,
          config
        );
        const data = response.data.data;
        setAddDevice({
          id: data.id || '',
          userId: data.userId || '',
          userName: data.userName || '',
          deviceType: data.deviceType || '',
          deviceAddress: data.deviceAddress || '',
          deviceToken: data.deviceToken || '',
        });
      } catch (error) {
        console.error('Error fetching Access Device by ID:', error);
      }
    };

    // Fetch Users for the dropdown
    useEffect(() => {
      handleStatus();
    }, [name, protocal_url, tenant_base_url]);

    const handleStatus = async () => {
      const bearerToken = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${bearerToken}` },
      };

      try {
        const response = await axios.get(
          `${protocal_url}${name}.${tenant_base_url}/Setting/users/byusertoken`,
          config
        );
        setStatusToDropDown(response.data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setStatusError('Failed to fetch users.');
      }
    };

    const toggleStatusDropdown = () => {
      setIsStatusDropdownOpen((prev) => !prev);
    };

    const handleDropdownStatusSelection = (device) => {
      setIsStatusDropdownOpen(false);
      setDefaultTextStatus(device.userName);
      setAddDevice((prev) => ({
        ...prev,
        userName: device.firstName,
        userId: device.userId,
      }));
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setAddDevice((prevDevice) => ({
        ...prevDevice,
        [name]: value,
      }));
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      const bearer_token = localStorage.getItem('token');

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${bearer_token}`,
            'Content-Type': 'application/json',
          },
        };
        const formData_PUT = {
          // id: addDevice.id,
          userId: addDevice.userId,
          userName: addDevice.userName,
          deviceType: addDevice.deviceType,
          deviceAddress: addDevice.deviceAddress,
          deviceToken: addDevice.deviceToken,
        };
        await axios.put(
          `${protocal_url}${name}.${tenant_base_url}/Setting/updateAccessDevice/${idGet}`,
          formData_PUT,
          config
        );
        alert('Access Device updated successfully!');
        window.location.reload();
      } catch (error) {
        console.error('Error updating Access Device:', error);
        alert('An error occurred. Please try again.');
      }
    };

    return (
      <div className="flex flex-col m-3 overflow-x-auto overflow-y-hidden">
        <div className="flex py-2 px-2 items-center justify-between bg-white rounded-md shadow-md">
          <h1 className="text-xl">Update Access Device</h1>
          <div
            onClick={handleCancel}
            className="px-4 py-1 rounded mx-3 border border-blue-500 text-blue-500"
          >
            Cancel
          </div>
        </div>
        <div className="overflow-hidden shadow-md">
          <div className="py-2 px-6 bg-cyan-500 rounded-t-xl mt-3">
            <h1 className="text-white">Access Device Information</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col py-2 px-4 bg-white rounded-b-xl">
              <div className="flex gap-4">
                {/* Left Column */}
                <div className="flex-1 flex flex-col">
                  <label
                    htmlFor="Pool"
                    className="text-sm font-medium text-gray-700"
                  >
                    Status
                  </label>
                  <div
                    className="relative"
                    onMouseLeave={() => setIsStatusDropdownOpen(false)}
                  >
                    <button
                      onClick={toggleStatusDropdown}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                      id="LeadStatusDropDown"
                      type="button"
                    >
                      {addDevice.userName === ''
                        ? defaultTextStatus
                        : addDevice.userName}
                      <FaAngleDown className="ml-2 text-gray-400" />
                    </button>
                    {isStatusDropdownOpen && (
                      <div className="absolute w-full bg-white border border-gray-300 rounded-md top-11 z-10">
                        {errorStatus ? (
                          <div className="py-2 text-red-600">{errorStatus}</div>
                        ) : (
                          <ul className="py-2 text-sm text-gray-700">
                            {statusToDropDown.map((device) => (
                              <li
                                key={device.id}
                                onClick={() =>
                                  handleDropdownStatusSelection(device)
                                }
                                className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                              >
                                {device.firstName}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>

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

                {/* Right Column */}
                <div className="flex-1 flex flex-col">
                  <label
                    htmlFor="userId"
                    className="text-sm font-medium text-gray-700"
                  >
                    User ID
                  </label>
                  <input
                    disabled
                    type="text"
                    name="userId"
                    value={addDevice.userId}
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                    onChange={handleChange}
                    placeholder="Enter user ID"
                  />

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
                </div>
              </div>

              <div className="flex justify-end gap-5 mr-10">
                <button
                  type="submit"
                  className="px-32 py-4 mt-40 mb-4 bg-cyan-500 text-white hover:text-cyan-500 hover:bg-white border-2 border-cyan-500 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <>
      {activeComponent === 'Table' ? (
        <AccessDeviceTable />
      ) : activeComponent === 'Add' ? (
        <AccessDeviceAdd />
      ) : activeComponent === 'Update' ? (
        <AccessDeviceUpdate />
      ) : (
        ''
      )}
    </>
  );
}
