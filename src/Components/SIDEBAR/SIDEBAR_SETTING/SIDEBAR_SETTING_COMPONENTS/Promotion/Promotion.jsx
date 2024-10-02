import { useState, useEffect } from "react";
import { FaAngleDown, FaBars } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import axios from "axios";
import { tenant_base_url, protocal_url } from "./../../../../../Config/config";

export default function Promotion(){

const { id } = useParams();
const [active, setActive] = useState(true);
const [users, setUsers] = useState([
    {
      id: 1,
      promotionName: 101,
      promotionType: "Group-Tambi",
    },
    {
        id: 2,
        promotionName : 102,
        promotionType : "Group-Lambi",
    },
]);
  const [formData, setFormData] = useState({
    id: "",
    promotionName : "",
    promotionType : "",
  });
  const [isEditMode, setIsEditMode] = useState(false);


  //department
  const [department, setdepartment] = useState([]);
  const [defaultTextdepartmentDropDown, setDefaultTextdepartmentDropDown] =useState("Select Department Na,e");
  const [isDropdownVisibledepartment, setIsDropdownVisibledepartment] = useState(false);


  const handleActiveState = () => {
    setActive(!active);
    setIsEditMode(false); // Reset edit mode when switching views
    setFormData({
      id: "",
      promotionName : "",
      promotionType : "",
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
    if (!formData.promotionName || !formData.promotionType) {
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
              window.location.hostname.split(".")[0]}.${tenant_base_url}/Admin/leadstatus/getall`,
            config
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

    return(
        <>
        <div className="m-3 min-w-screen">
        {active ? (
          <>
            <div className="flex min-w-screen justify-between items-center">
              <h1 className="text-3xl font-medium">Add Group</h1>
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
                        <div className="flex justify-between items-center text-sm">
                          <span>Promotion Name</span>
                          <FaBars />
                        </div>
                      </th>
                      <th className="px-2 py-3 text-left border-r font-medium">
                        <div className="flex justify-between items-center text-sm">
                          <span>Promotion Type</span>
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
                    {users.map((user) => (
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
                          {user.promotionName}
                        </td>
                        <td className="px-2 py-4 text-sm max-w-24 break-words">
                          {user.promotionType}
                        </td>
                        <td className="px-2 py-4 flex gap-3 justify-center">
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
                          className="mt-1 p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      {/* -------------Group------------- */}
                       {/* -------------Group------------- */}
                      <div className="flex flex-col w-1/2 relative">
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
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                            id="GroupDropDown"
                            type="button"
                          >
                            {formData.group || defaultTextGroupDropDown}
                            <FaAngleDown className="ml-2 text-gray-400" />
                          </button>
                          {isDropdownVisibleGroup && (
                            <div className="absolute w-full bg-white border border-gray-300 rounded-md top-11 z-10">
                              <ul className="py-2 text-sm text-gray-700">
                                {group.map(({ key, status }) => (
                                  <li
                                    key={key}
                                    onClick={() => handleDropdownGroup(status)}
                                    className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
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
    )    
}