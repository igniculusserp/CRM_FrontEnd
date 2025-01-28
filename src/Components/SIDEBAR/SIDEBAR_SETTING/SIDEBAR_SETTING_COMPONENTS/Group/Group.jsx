import { useState, useEffect } from "react";
import { FaAngleDown, FaBars } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import axios from "axios";
import { tenant_base_url, protocal_url } from "./../../../../../Config/config";
import { getHostnamePart } from "../../ReusableComponents/GlobalHostUrl";

import { ToastContainer } from "react-toastify";
import {
  showSuccessToast,
  showErrorToast,
} from "./../../../../../utils/toastNotifications";

export default function Group() {
  const bearer_token = localStorage.getItem("token");

  const name = getHostnamePart();

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
  const [defaultTextGroupDropDown, setDefaultTextGroupDropDown] =
    useState("Select Group");
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
    getGroupsLists();
  }, []);

  //-------------------get-------------------get-------------------get-------------------get-------------------
  // get groups lists
  const getGroupsLists = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Admin/group/all`,
        config,
      );
      if (response.data.isSuccess) {
        const groups = response.data; // Get the user data
        setGroup(groups?.data); // Set the user data for editing
      } else {
        showErrorToast("You are not an authorised user");
      }
    } catch (error) {
      console.log(error);
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

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      handleUpdateGroup(); //Edit   API
    } else {
      handleCreateGroup(); //Create API
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

  //Create API-------------------Create API-------------------Create API-------------------Create API-------------------
  const handleCreateGroup = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };

      if (!formData.groupName) {
        showErrorToast("Please enter group name");
        return;
      }

      if (!formData.userCount) {
        showErrorToast("Please enter user count");
        return;
      }

      if (!formData.leadLimit) {
        showErrorToast("Please enter lead limit");
        return;
      }

      if (!formData.fetchLimit) {
        showErrorToast("Please enter fetch limit");
        return;
      }

      const response = await axios.post(
        `${protocal_url}${name}.${tenant_base_url}/Admin/group/add`,
        formData,
        config,
      );
      getGroupsLists();
      showSuccessToast("Group created successfully");
      setActive(!active);
    } catch (error) {
      console.error("Error fetching users:", error);
      showErrorToast(error.response.data.message);
    }
  };

  //delete  group
  const handleDeleteGroup = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.delete(
        `${protocal_url}${name}.${tenant_base_url}/Admin/group/delete/${id}`,
        config,
      );
      getGroupsLists();
      showSuccessToast("Group deleted Successfully");
    } catch (error) {
      showErrorToast(error.response.data.message);
    }
  };

  //update  group
  const handleUpdateGroup = async () => {
    console.log(formData);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.put(
        `${protocal_url}${name}.${tenant_base_url}/Admin/group/edit/${formData?.id}`,
        formData,
        config,
      );
      getGroupsLists();
      handleActiveState();
    } catch (error) {
      showErrorToast(error.response.data.message);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="min-w-screen m-3">
        {active ? (
          <>
            <div className="min-w-screen flex flex-wrap items-center justify-between gap-5">
              <h1 className="text-3xl font-medium">Groups Lists</h1>
              <button
                onClick={handleActiveState}
                className="min-w-10 rounded bg-blue-600 p-2 text-sm text-white"
              >
                Add Groups
              </button>
            </div>
            <div className="leads_Table_Main_Container mt-3 overflow-x-auto shadow-md">
              <div className="leads_Table_Container min-w-full rounded-md">
                <table className="leads_Table min-w-full bg-white">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="px-1 py-3">
                        <input type="checkbox" />
                      </th>
                      <th className="border-r px-2 py-3 text-left font-medium">
                        <div className="flex max-w-32 items-center justify-between text-sm">
                          <span>Group Name</span>
                          <FaBars />
                        </div>
                      </th>

                      <th className="border-r px-2 py-3 text-left font-medium">
                        <div className="flex items-center justify-between text-sm">
                          <span>User Count</span>
                          <FaBars />
                        </div>
                      </th>

                      <th className="border-r px-2 py-3 text-left font-medium">
                        <div className="flex items-center justify-between text-sm">
                          <span>Lead Limit</span>
                          <FaBars />
                        </div>
                      </th>

                      <th className="border-r px-2 py-3 text-left font-medium">
                        <div className="flex items-center justify-between text-sm">
                          <span>Fetch Limit</span>
                          <FaBars />
                        </div>
                      </th>

                      <th className="border-r px-2 py-3 text-left font-medium">
                        <div className="flex items-center justify-between text-sm">
                          <span>Action</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {group?.map((user) => (
                      <tr
                        key={user.id}
                        className="cursor-pointer border-b border-gray-300 hover:bg-gray-200"
                      >
                        <td className="px-1 py-3 text-center">
                          <input
                            type="checkbox"
                            onClick={(e) => handleCheckboxClick(e, user.id)}
                          />
                        </td>
                        <td className="max-w-24 break-words px-2 py-4 text-sm">
                          {user.groupName}
                        </td>
                        <td className="max-w-24 break-words px-2 py-4 text-sm">
                          {user.userCount}
                        </td>
                        <td className="max-w-24 break-words px-2 py-4 text-sm">
                          {user.leadLimit}
                        </td>
                        <td className="max-w-24 break-words px-2 py-4 text-sm">
                          {user.fetchLimit}
                        </td>
                        <td className="flex justify-center gap-3 px-2 py-4">
                          <MdEdit
                            size={25}
                            color="white"
                            className="rounded bg-blue-500"
                            onClick={() => handleClick(user.id)}
                          />
                          <RiDeleteBin6Fill
                            size={25}
                            color="red"
                            onClick={() => {
                              handleDeleteGroup(user.id);
                            }}
                          />
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
            <div className="min-w-screen flex items-center justify-between">
              <h1 className="text-3xl font-medium">
                {isEditMode ? "Edit Group" : "Add New Group"}
              </h1>
              <button
                onClick={handleActiveState}
                className="min-w-10 rounded border border-blue-600 bg-white px-4 py-2 text-sm text-blue-600"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex">
              <div className="w-full">
                <div className="mt-3 flex-grow rounded-xl bg-white shadow-md">
                  <h2 className="rounded-t-xl bg-cyan-500 px-4 py-2 font-medium text-white">
                    Lead Information
                  </h2>
                  {/* -------------1------------- */}
                  <div className="grid gap-2 px-4 py-2">
                    {/* -------------groupID------------- */}
                    <div className="flex space-x-4">
                      <div className="flex w-1/2 flex-col">
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
                          className="mt-1 rounded-md border border-gray-300 p-2"
                        />
                        {errors.groupName && (
                          <span style={{ color: "red" }}>
                            {errors.groupName}
                          </span>
                        )}
                      </div>
                      {/* -------------Group------------- */}
                      {/* -------------Fetch Limit------------- */}
                      <div className="flex w-1/2 flex-col">
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
                          className="mt-1 rounded-md border border-gray-300 p-2"
                        />
                      </div>
                    </div>

                    {/* -------------2------------- */}
                    <div className="flex space-x-4">
                      {/* -------------UserCount------------- */}
                      <div className="flex w-1/2 flex-col">
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
                          className="mt-1 rounded-md border border-gray-300 p-2"
                        />
                      </div>

                      {/* -------------Lead Limit------------- */}
                      <div className="flex w-1/2 flex-col">
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
                          className="mt-1 rounded-md border border-gray-300 p-2"
                        />
                      </div>
                    </div>
                    {/* -------------3------------- */}

                    {/* -------------Button------------- */}

                    <div className="mt-56 grid justify-end">
                      <button
                        type="submit"
                        className="rounded border-2 border-cyan-500 bg-cyan-500 px-32 py-4 text-white hover:bg-white hover:text-cyan-500"
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
  );
}
