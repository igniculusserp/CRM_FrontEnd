import { useState, useEffect } from "react";
import { FaAngleDown, FaBars } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import axios from "axios";
import { tenant_base_url, protocal_url } from "./../../../../../Config/config";

export default function Department() {
  const { id } = useParams();
  const [active, setActive] = useState(true);
  const [users, setUsers] = useState([
    {
      id: 1,
      depatmentID: 101,
      depatmentName: "Group-Tambi",
    },
    {
      id: 2,
      depatmentID: 102,
      depatmentName: "Group-Lambi",
    },
  ]);
  const [formData, setFormData] = useState({
    id: "",
    depatmentID: "",
    depatmentName: "",
  });
  const [editLead, setEditLead] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  //department
  const [department, setdepartment] = useState([]);
  const [defaultTextdepartmentDropDown, setDefaultTextdepartmentDropDown] =
    useState("Select Department Na,e");
  const [isDropdownVisibledepartment, setIsDropdownVisibledepartment] =
    useState(false);

  const handleActiveState = () => {
    setActive(!active);
    setIsEditMode(false); // Reset edit mode when switching views
    setFormData({
      id: "",
      depatmentID: "",
      depatmentName: "",
    }); // Reset form data
  };

  const handleClick = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);
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
    if (!formData.depatmentID || !formData.depatmentName) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    if (isEditMode) {
      console.log("Edit User:", formData);
      // Add logic to submit the edited user data
    } else {
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

  async function handleGroup() {
    const bearer_token = localStorage.getItem("token");

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${
          window.location.hostname.split(".")[0]
        }.${tenant_base_url}/Admin/leadstatus/getall`,
        config,
      );
      setdepartment(response.data.data);
      console.log("Group data:", response.data.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  }

  useEffect(() => {
    handleGroup();
  }, []);

  return (
    <>
      <div className="m-3 min-w-screen">
        {active ? (
          <>
            <div className="flex items-center justify-between min-w-screen">
              <h1 className="text-3xl font-medium">Add Group</h1>
              <button
                onClick={handleActiveState}
                className="p-2 text-sm text-white bg-blue-600 rounded min-w-10"
              >
                Add Groups
              </button>
            </div>
            <div className="mt-3 overflow-x-auto">
              <div className="min-w-full overflow-hidden rounded-md">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="px-1 py-3">
                        <input type="checkbox" />
                      </th>
                      <th className="px-2 py-3 font-medium text-left border-r">
                        <div className="flex items-center justify-between text-sm max-w-32">
                          <span>Group Name</span>
                          <FaBars />
                        </div>
                      </th>

                      <th className="px-2 py-3 font-medium text-left border-r">
                        <div className="flex items-center justify-between text-sm">
                          <span>User Count</span>
                          <FaBars />
                        </div>
                      </th>

                      <th className="px-2 py-3 font-medium text-left border-r">
                        <div className="flex items-center justify-between text-sm">
                          <span>Lead Limit</span>
                          <FaBars />
                        </div>
                      </th>

                      <th className="px-2 py-3 font-medium text-left border-r">
                        <div className="flex items-center justify-between text-sm">
                          <span>Fetch Limit</span>
                          <FaBars />
                        </div>
                      </th>

                      <th className="px-2 py-3 font-medium text-left border-r">
                        <div className="flex items-center justify-between text-sm">
                          <span>Action</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-gray-300 cursor-pointer hover:bg-gray-200"
                      >
                        <td className="px-1 py-3 text-center">
                          <input
                            type="checkbox"
                            onClick={(e) => handleCheckboxClick(e, user.id)}
                          />
                        </td>
                        <td className="px-2 py-4 text-sm break-words max-w-24">
                          {user.group}
                        </td>
                        <td className="px-2 py-4 text-sm break-words max-w-24">
                          {user.userCount}
                        </td>
                        <td className="px-2 py-4 text-sm break-words max-w-24">
                          {user.leadLimit}
                        </td>
                        <td className="px-2 py-4 text-sm break-words max-w-24">
                          {user.fetchLimit}
                        </td>
                        <td className="flex justify-center gap-3 px-2 py-4">
                          <MdEdit
                            size={25}
                            color="white"
                            className="bg-blue-500 rounded"
                            onClick={() => handleClick(user.id)}
                          />
                          <RiDeleteBin6Fill size={25} color="red" />
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
            <div className="flex items-center justify-between min-w-screen">
              <h1 className="text-3xl font-medium">
                {isEditMode ? "Edit User Operation" : "Add user Operation"}
              </h1>
              <button
                onClick={handleActiveState}
                className="px-4 py-2 text-sm text-blue-600 bg-white border border-blue-600 rounded min-w-10"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex">
              <div className="w-full">
                <div className="flex-grow mt-3 bg-white shadow-md rounded-xl">
                  <h2 className="px-4 py-2 font-medium text-white rounded-t-xl bg-cyan-500">
                    Lead Information
                  </h2>
                  {/* -------------1------------- */}
                  <div className="relative min-h-screen px-4 py-2">
                    {/* -------------groupID------------- */}
                    <div className="flex space-x-4">
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor="groupID"
                          className="text-sm font-medium text-gray-700"
                        >
                          Group ID
                        </label>
                        <input
                          type="text"
                          name="groupID"
                          value={formData.groupID || ""}
                          onChange={handleChange}
                          className="p-2 mt-1 border border-gray-300 rounded-md"
                        />
                      </div>
                      {/* -------------Group------------- */}
                      {/* -------------Group------------- */}
                      <div className="relative flex flex-col w-1/2">
                        <label
                          htmlFor="group"
                          className="text-sm font-medium text-gray-700"
                        >
                          Group Name
                        </label>
                        <div
                          className="relative"
                          onClick={toggleDropdownGroup}
                          onMouseLeave={() => setIsDropdownVisibleGroup(false)}
                        >
                          <button
                            className="flex items-center justify-between w-full p-2 mt-1 border border-gray-300 rounded-md"
                            id="GroupDropDown"
                            type="button"
                          >
                            {formData.group || defaultTextGroupDropDown}
                            <FaAngleDown className="ml-2 text-gray-400" />
                          </button>
                          {isDropdownVisibleGroup && (
                            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md top-11">
                              <ul className="py-2 text-sm text-gray-700">
                                {group.map(({ key, status }) => (
                                  <li
                                    key={key}
                                    onClick={() => handleDropdownGroup(status)}
                                    className="block px-4 py-2 border-b cursor-pointer hover:bg-cyan-500 hover:text-white"
                                  >
                                    {status}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
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
                          type="text"
                          name="userCount"
                          value={formData.userCount || ""}
                          onChange={handleChange}
                          className="p-2 mt-1 border border-gray-300 rounded-md"
                        />
                      </div>

                      {/* -------------Lead Limit------------- */}
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor="leadLimit"
                          className="text-sm font-medium text-gray-700"
                        >
                          Target
                        </label>
                        <input
                          type="text"
                          name="leadLimit"
                          value={formData.leadLimit || ""}
                          onChange={handleChange}
                          className="p-2 mt-1 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    {/* -------------3------------- */}
                    <div className="flex space-x-4">
                      {/* -------------Fetch Limit------------- */}
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor="fetchLimit"
                          className="text-sm font-medium text-gray-700"
                        >
                          Fetch Limit
                        </label>
                        <input
                          type="text"
                          name="fetchLimit"
                          value={formData.fetchLimit || ""}
                          onChange={handleChange}
                          className="p-2 mt-1 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    {/* -------------Button------------- */}
                    <button
                      type="submit"
                      className="mt-4 hover:bg-cyan-500 border border-cyan-500 text-cyan-500 hover:text-white px-4 py-4 rounded-md absolute  top-[300px]"
                    >
                      {isEditMode ? "Update User" : "Save User"}
                    </button>
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
