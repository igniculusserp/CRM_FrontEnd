import { useState, useEffect } from "react";
import { FaAngleDown, FaBars } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import axios from "axios";
import { tenant_base_url, protocal_url } from "./../../../../../Config/config";
import { getHostnamePart } from "../../ReusableComponents/GlobalHostUrl";

export default function Group() {
  const bearer_token = localStorage.getItem("token");
  const name = getHostnamePart()
  const { id } = useParams();
  const [active, setActive] = useState(true);
  const [formData, setFormData] = useState({
    groupName: "",
    userCount: "",
    leadLimit: "",
    fetchLimit: "",
  });
  const [editLead, setEditLead] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);


  //group
  const [group, setGroup] = useState([]);
  const [defaultTextGroupDropDown, setDefaultTextGroupDropDown] = useState("Select Group");
  const [isDropdownVisibleGroup, setIsDropdownVisibleGroup] = useState(false);


  const handleActiveState = () => {
    setActive(!active);
    setIsEditMode(false); // Reset edit mode when switching views
    setFormData({
      groupName: "",
      userCount: "",
      leadLimit: "",
      fetchLimit: "",
    }); // Reset form data
  };

  useEffect(() => {
    getGroupsLists()
  }, [])

  // get groups lists
  const getGroupsLists = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Admin/group/all`, config);
      if (response.status === 200) {
        const groups = response.data; // Get the user data
        setGroup(groups?.data); // Set the user data for editing
      }
    } catch (error) {
      console.error("Error fetching user for edit:", error);
    }
  };


  const handleClick = (userId) => {
    const userToEdit = group.find((user) => user.id === userId);
    if (userToEdit) {
      setEditLead(userToEdit);
      setFormData(userToEdit); // Populate form with user data
      setIsEditMode(true);
      setActive(false); // Switch to form view
    }
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

    // Validation check
    if (!formData.userCount || !formData.leadLimit || !formData.groupName) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    if (isEditMode) {
      handleUpdateGroup()
      console.log("Edit User:", formData);
      // Add logic to submit the edited user data
    } else {
      handleCreateGroup()
      console.log("Add User:", formData);
      setActive(true); // Switch to the form view

      // Add logic to add a new user
    }
  };

  const handleCheckboxClick = (e, userId) => {
    e.stopPropagation();
    console.log(`Checkbox clicked for user: ${userId}`);
  };

  //---------------Group---------------
  const toggleDropdownGroup = () => {
    setIsDropdownVisibleGroup(!isDropdownVisibleGroup);
  };

  const handleDropdownGroup = (groupName) => {
    setFormData((prevData) => ({
      ...prevData,
      groupName,
    }));
    setDefaultTextGroupDropDown(groupName);
    setIsDropdownVisibleGroup(false);
  };

  //creating new group
  const handleCreateGroup = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.post(
        `${protocal_url}${name}.${tenant_base_url}/Admin/group/add`, formData,
        config
      );
      getGroupsLists()
      setActive(!active);
      alert(response.data.message)
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  //delete  group
  const handleDeleteGroup = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.delete(
        `${protocal_url}${name}.${tenant_base_url}/Admin/group/delete/${id}`, config
      );
      getGroupsLists()
      alert(response.data.message)
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  //update  group
  const handleUpdateGroup = async () => {
    console.log(formData)
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.put(
        `${protocal_url}${name}.${tenant_base_url}/Admin/group/edit/${formData?.id}`, formData, config
      );
      getGroupsLists()
      handleActiveState()
      alert(response.data.message)
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }
  return (
    <>
      <div className="m-3 min-w-screen">
        {active ? (
          <>
            <div className="flex min-w-screen justify-between items-center">
              <h1 className="text-3xl font-medium">Groups Lists</h1>
              <button
                onClick={handleActiveState}
                className="bg-blue-600 text-white p-2 min-w-10 text-sm rounded"
              >
                Add Groups
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
                        <div className="flex justify-between items-center text-sm max-w-32">
                          <span>Group Name</span>
                          <FaBars />
                        </div>
                      </th>

                      <th className="px-2 py-3 text-left border-r font-medium">
                        <div className="flex justify-between items-center text-sm">
                          <span>User Count</span>
                          <FaBars />
                        </div>
                      </th>

                      <th className="px-2 py-3 text-left border-r font-medium">
                        <div className="flex justify-between items-center text-sm">
                          <span>Lead Limit</span>
                          <FaBars />
                        </div>
                      </th>

                      <th className="px-2 py-3 text-left border-r font-medium">
                        <div className="flex justify-between items-center text-sm">
                          <span>Fetch Limit</span>
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
                    {group?.map((user) => (
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
                        <td className="px-2 py-4 text-sm max-w-24 break-words">
                          {user.groupName}
                        </td>
                        <td className="px-2 py-4 text-sm max-w-24 break-words">
                          {user.userCount}
                        </td>
                        <td className="px-2 py-4 text-sm  max-w-24 break-words">
                          {user.leadLimit}
                        </td>
                        <td className="px-2 py-4 text-sm  max-w-24 break-words">
                          {user.fetchLimit}
                        </td>
                        <td className="px-2 py-4 flex gap-3 justify-center">
                          <MdEdit
                            size={25}
                            color="white"
                            className="bg-blue-500 rounded"
                            onClick={() => handleClick(user.id)}
                          />
                          <RiDeleteBin6Fill size={25} color="red" onClick={() => { handleDeleteGroup(user.id) }} />
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
                {isEditMode ? "Edit Group" : "Add New Group"}
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
                  <div className="py-2 px-4 min-h-screen ">
                    {/* -------------groupID------------- */}
                    <div className="flex space-x-4">
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor="groupID"
                          className="text-sm font-medium text-gray-700"
                        >
                          Group Name
                        </label>
                        <input
                          type="text"
                          name="groupName"
                          value={formData.groupName || ""}
                          onChange={handleChange}
                          className="mt-1 p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      {/* -------------Group------------- */}
                      {/* -------------Fetch Limit------------- */}
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor="fetchLimit"
                          className="text-sm font-medium text-gray-700"
                        >
                          Fetch Limit
                        </label>
                        <input
                          type="number"
                          name="fetchLimit"
                          value={formData.fetchLimit || ""}
                          onChange={handleChange}
                          className="mt-1 p-2 border border-gray-300 rounded-md"
                        />
                      </div>

                    </div>

                    {/* -------------2------------- */}
                    <div className="flex space-x-4">
                      {/* -------------UserCount------------- */}
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor="userCount"
                          className="text-sm font-medium text-gray-700"
                        >
                          User Count
                        </label>
                        <input
                          type="number"
                          name="userCount"
                          value={formData.userCount || ""}
                          onChange={handleChange}
                          className="mt-1 p-2 border border-gray-300 rounded-md"
                        />
                      </div>

                      {/* -------------Lead Limit------------- */}
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor="leadLimit"
                          className="text-sm font-medium text-gray-700"
                        >
                          Lead Limit
                        </label>
                        <input
                          type="number"
                          name="leadLimit"
                          value={formData.leadLimit || ""}
                          onChange={handleChange}
                          className="mt-1 p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    {/* -------------3------------- */}


                    {/* -------------Button------------- */}


                    <div className="grid justify-end mt-56  ">
                      <button
                        type="submit"
                        className="px-32 py-4 bg-cyan-500 text-white border-2 border-cyan-500 rounded hover:text-cyan-500 hover:bg-white"
                      >
                        {isEditMode ? "Update" : "Save"}
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </form>
          </>
        )}
      </div>

    </>
  )
}