import { useState, useEffect } from "react";
import { FaAngleDown, FaBars } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import axios from "axios";
import { tenant_base_url, protocal_url } from "./../../../../../Config/config";
import GlobalUserNameComponent from "../../ReusableComponents/GlobalUserNameComponent";

export default function UserOperation() {
  const fullURL = window.location.href;
  const url = new URL(fullURL);
  const name = url.hostname.split(".")[0];
  const { id } = useParams();
  const bearer_token = localStorage.getItem("token");
  const [active, setActive] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    teamMember: "",
    reportedTo: "",
    groupName: "",
    currencyCode: "",
    extensions: "",
    did: "",
  });

  const [users, setUsers] = useState([]);
  const [groupNames, setGroupNames] = useState([]);
  const [editLead, setEditLead] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  //show edit prefield
  const [isShowFields, setIsShowFields] = useState(false)
  const [selectedUserName, setSelectedUserName] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);


  //getting user operation lists and groups lists here
  useEffect(() => {
    getOprationLists()
    getGroupsNames()
  }, [])

  const handleActiveState = () => {
    setActive(!active);
    setIsShowFields(false)
    setIsEditMode(false); // Reset edit mode when switching views
    setFormData({
      fullName: "",
      userName: "",
      teamMember: "",
      reportedTo: "",
      groupName: "",
      currencyCode: "",
      extensions: "",
      did: "",
    }); // Reset form dataa
    setSelectedUserName('')
  };

  const handleClick = (user) => {
    handleSelectUser(user)
    setFormData({
      fullName: user?.fullName,
      userName: user?.userName,
      teamMember: user?.teamMember,
      reportedTo: user?.reportedTo,
      groupName: user?.groupName,
      currencyCode: user?.currencyCode,
      extensions: user?.extensions,
      did: user?.did,
    });
    if (user) {
      setEditLead(user);
      setFormData(user); // Populate form with user data
      setIsEditMode(true);
      setActive(false); // Switch to form view
    }
  };


  // get operation lists
  const getOprationLists = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Setting/userOpration/all`, config);
      if (response.status === 200) {
        const opration = response.data; // Get the user data
        setUsers(opration?.data); // Set the user data for editing
      }
    } catch (error) {
      console.error("Error fetching user for edit:", error);
      alert("Error occurred while trying to get data");
    }
  };

  // get operation lists
  const getGroupsNames = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Admin/group/all`, config);
      if (response.status === 200) {
        const opration = response.data; // Get the user data
        setGroupNames(opration?.data); // Set the user data for editing
      }
    } catch (error) {
      console.error("Error fetching user for edit:", error);
      alert("Error occurred while trying to get data");
    }
  };

  // Handle user selection and update form fields
  const handleSelectUser = (item) => {
    const fullName = `${item.firstName} ${item.lastName}`;
    // Update form data with user data
    setFormData({
      ...formData,
      fullName: fullName,
      reportedTo: item.reportedTo,
      groupName: item.role,
      userName: item.userName,
      userId: item.userId
    });
    console.log(formData)

    setIsShowFields(true); // Show additional fields when user is selected
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.reportedTo || !formData.groupName) {
      alert("Please fill in all required fields.");
      return;
    }

    if (isEditMode) {
      console.log("Edit User:", formData);
      // Submit edited user logic
      handleUpdateOpration()
    } else {
      handleCreateOperation()
      console.log("Add User:", formData);
      // Add new user logic
    }
  };

  //creating new operation
  const handleCreateOperation = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.post(
        `${protocal_url}${name}.${tenant_base_url}/Setting/userOpration/add`, formData,
        config
      );
      getOprationLists()
      setActive(!active);
      alert(response.data.message)
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  //delete  operation
  const handleDeleteOpration = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.delete(
        `${protocal_url}${name}.${tenant_base_url}/Setting/userOpration/delete/${id}`, config
      );
      getOprationLists()
      alert(response.data.message)
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  //update  operation
  const handleUpdateOpration = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.put(
        `${protocal_url}${name}.${tenant_base_url}/Setting/userOpration/update/${formData?.id}`, formData, config
      );
      getOprationLists()
      handleActiveState()
      alert(response.data.message)
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  return (
    <div className="m-3 min-w-screen">
      {active ? (
        <>
          <div className="flex min-w-screen justify-between items-center">
            <h1 className="text-3xl font-medium">User Operation</h1>
            <button
              onClick={handleActiveState}
              className="bg-blue-600 text-white p-2 min-w-10 text-sm rounded"
            >
              Add User Setting
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

                    {/* <th className="px-2 py-3 text-left border-r font-medium">
                      <div className="flex justify-between items-center text-sm max-w-32">
                        <span>Full Name</span>
                        <FaBars />
                      </div>
                    </th> */}
                    <th className="px-2 py-3 text-left border-r font-medium">
                      <div className="flex justify-between items-center text-sm">
                        <span>User Name</span>
                        <FaBars />
                      </div>
                    </th>

                    {/* <th className="px-2 py-3 text-left border-r font-medium">
                      <div className="flex justify-between items-center text-sm">
                        <span>Team Member</span>
                        <FaBars />
                      </div>
                    </th> */}

                    <th className="px-2 py-3 text-left border-r font-medium">
                      <div className="flex justify-between items-center text-sm">
                        <span>Reported To</span>
                        <FaBars />
                      </div>
                    </th>

                    <th className="px-2 py-3 text-left border-r font-medium">
                      <div className="flex justify-between items-center text-sm">
                        <span>Group</span>
                        <FaBars />
                      </div>
                    </th>

                    <th className="px-2 py-3 text-left border-r font-medium">
                      <div className="flex justify-between items-center text-sm">
                        <span>Target</span>
                        <FaBars />
                      </div>
                    </th>

                    <th className="px-2 py-3 text-left border-r font-medium">
                      <div className="flex justify-between items-center text-sm">
                        <span>Currency Code</span>
                        <FaBars />
                      </div>
                    </th>

                    <th className="px-2 py-3 text-left border-r font-medium">
                      <div className="flex justify-between items-center text-sm">
                        <span>Extension</span>
                        <FaBars />
                      </div>
                    </th>

                    <th className="px-2 py-3 text-left border-r font-medium">
                      <div className="flex justify-between items-center text-sm">
                        <span>DID</span>
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
                  {users?.map((user) => (
                    <tr
                      key={user.id}
                      className="cursor-pointer hover:bg-gray-200 border-gray-300 border-b"
                    >
                      <td className="px-1 py-3 text-center">
                        <input
                          type="checkbox"
                          onClick={(e) => handleCheckboxClick(e, user.id)}
                        />
                      </td>
                      {/* <td className="px-2 py-4 text-sm max-w-24 break-words">
                        {user.first_name}
                      </td> */}
                      <td className="px-2 py-4 text-sm max-w-24 break-words">
                        {user.userName}
                      </td>

                      <td className="px-2 py-4 text-sm  max-w-24 break-words">
                        {user.reportedTo}
                      </td>
                      <td className="px-2 py-4 text-sm  max-w-24 break-words">
                        {user.groupName}
                      </td>
                      <td className="px-2 py-4 text-sm  max-w-24 break-words">
                        {user.target}
                      </td>
                      <td className="px-2 py-4 text-sm  max-w-24 break-words">
                        {user.currencyCode}
                      </td>
                      <td className="px-2 py-4 text-sm  max-w-24 break-words">
                        {user.extensions}
                      </td>
                      <td className="px-2 py-4 text-sm  max-w-24 break-words">
                        {user.did}
                      </td>
                      <td className="px-2 py-4 flex gap-3 justify-center">
                        <MdEdit
                          size={25}
                          color="white"
                          className="bg-blue-500 rounded"
                          onClick={() => handleClick(user)}
                        />
                        <RiDeleteBin6Fill size={25} color="red" onClick={() => { handleDeleteOpration(user.id) }} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex min-w-screen justify-between items-center">
            <h1 className="text-3xl font-medium">
              {isEditMode ? "Edit User Operation" : "Add user Operation"}
            </h1>
            <button
              onClick={handleActiveState}
              className="border border-blue-600 bg-white text-blue-600 px-4 py-2 min-w-10 text-sm rounded"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex">
            <div className="w-full">
              <div className="mt-3 bg-white rounded-xl shadow-md flex-grow">
                <h2 className="font-medium py-2 px-4 rounded-t-xl text-white bg-cyan-500">
                  Lead Information
                </h2>
                {/* -------------1------------- */}
                <div className="py-2 px-4 min-h-screen relative">
                  <div className="flex space-x-4">
                    <div className="flex flex-col w-1/2">
                      {/* -------------Username------------- */}
                      <label
                        htmlFor="username"
                        className="text-sm font-medium text-gray-700"
                      >
                        Username
                      </label>
                      <GlobalUserNameComponent name={'userName'} fieldName="userName"
                        selectedValue={selectedUserName || formData?.userName}
                        setSelectedValue={setSelectedUserName}
                        setSelectedUser={(e) => { handleSelectUser(e); setSelectedUser(e) }} // Capture the full user object
                        className="mt-1 p-2 border border-gray-300 rounded-md" // Custom class for styling 
                      />
                    </div>
                    {isShowFields ? <>
                      {/* -------------fullName------------- */}
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor="fullName"
                          className="text-sm font-medium text-gray-700"
                        >
                          Full Name
                        </label>
                        <input
                          disabled
                          value={formData?.fullName || ""}
                          type="text"
                          name="fullName"
                          className="mt-1 p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </> : null}
                  </div>
                  {isShowFields && (
                    <>
                      <div className="flex space-x-4">
                        {/* Team Member */}
                        <div className="flex flex-col w-1/2">
                          <label
                            htmlFor="teamMember"
                            className="text-sm font-medium text-gray-700"
                          >
                            Currency Code
                          </label>
                          <input
                            type="text"
                            name="currencyCode"
                            value={formData?.currencyCode || ""}
                            onChange={handleChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md"
                          />
                        </div>

                        {/* reportedTo Dropdown */}
                        <div className="flex flex-col w-1/2">
                          <label
                            htmlFor="reportedTo"
                            className="text-sm font-medium text-gray-700"
                          >
                            Reported To
                          </label>
                          <GlobalUserNameComponent
                            name="reportedTo"
                            fieldName="reportedTo"
                            selectedValue={formData?.reportedTo}
                            setSelectedValue={(value) =>
                              setFormData({ ...formData, reportedTo: value })
                            }
                            className="mt-1 p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        {/* Group Dropdown */}
                        <div className="flex flex-col w-1/2">
                          <label
                            htmlFor="groupName"
                            className="text-sm font-medium text-gray-700"
                          >
                            Group Name
                          </label>
                          <select
                            name={"groupName"}
                            className="mt-1 p-2 border border-gray-300 rounded-md"
                            value={formData?.groupName}
                            onChange={handleChange}
                          >
                            <option value={formData?.groupName} disabled>{formData?.groupName || 'Select'}</option>
                            {groupNames?.map((item) => (
                              <option key={item.id} value={item.groupName}>
                                {item.groupName}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* target */}
                        <div className="flex flex-col w-1/2">
                          <label
                            htmlFor="target"
                            className="text-sm font-medium text-gray-700"
                          >
                            Target
                          </label>
                          <input
                            type="number"
                            name="target"
                            value={formData?.target || ""}
                            onChange={handleChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        {/* extensions */}
                        <div className="flex flex-col w-1/2">
                          <label
                            htmlFor="extensions"
                            className="text-sm font-medium text-gray-700"
                          >
                            Extension
                          </label>
                          <input
                            type="text"
                            name="extensions"
                            value={formData?.extensions || ""}
                            onChange={handleChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md"
                          />
                        </div>

                        {/* did */}
                        <div className="flex flex-col w-1/2">
                          <label
                            htmlFor="did"
                            className="text-sm font-medium text-gray-700"
                          >
                            DID
                          </label>
                          <input
                            type="text"
                            name="did"
                            value={formData?.did || ""}
                            onChange={handleChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      {/* -------------Button------------- */}
                      <button
                        type="submit"
                        className="mt-4 hover:bg-cyan-500 border border-cyan-500 text-cyan-500 hover:text-white px-4 py-4 rounded-md absolute  top-[450px]"
                      >
                        {isEditMode ? "Update User" : "Save User"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
