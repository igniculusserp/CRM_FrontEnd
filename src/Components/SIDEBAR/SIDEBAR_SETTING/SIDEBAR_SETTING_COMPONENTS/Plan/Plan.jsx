import { useState, useEffect } from "react";
import { FaAngleDown, FaBars } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import axios from "axios";
import { tenant_base_url, protocal_url } from "./../../../../../Config/config";

export default function Plan() {
  const { id } = useParams();
  const [active, setActive] = useState(true);
  const [users, setUsers] = useState([
    {
      id: 1,
      planAmount: 101,
      planType: "Group-Tambi",
      description: "Plan is very Big",
    },
    {
      id: 2,
      planAmount: 102,
      planType: "Group-Lompi",
      description: "Plan is Incredible",
    },
  ]);

  const [formData, setFormData] = useState({
    id: "",
    planAmount: "",
    planType: "",
    description: "",
  });

  const [editLead, setEditLead] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Plan Type State
  const [planType, setplanType] = useState([]);
  const [defaultTextplanTypeDropDown, setDefaultTextplanTypeDropDown] =
    useState("Select Plan");
  const [isDropdownVisibleplanType, setIsDropdownVisibleplanType] =
    useState(false);

  const handleActiveState = () => {
    setActive(!active);
    setIsEditMode(false); // Reset edit mode when switching views
    setFormData({
      id: "",
      planAmount: "",
      planType: "",
      description: "",
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

    if (isEditMode) {
      console.log("Edit User:", formData);
    } else {
      console.log("Add User:", formData);
      setActive(true); 
    }
  };

  const handleCheckboxClick = (e, userId) => {
    e.stopPropagation();
    console.log(`Checkbox clicked for user: ${userId}`);
  };

  // Plan Type Dropdown
  const toggleDropdownplanType = () => {
    setIsDropdownVisibleplanType(!isDropdownVisibleplanType);
  };

  const handleDropdownPlanType = (planType) => {
    setFormData((prevData) => ({
      ...prevData,
      planType: planType,
    }));
    setDefaultTextplanTypeDropDown(p);
    setIsDropdownVisibleplanType(false);
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
        `${protocal_url}${window.location.hostname.split(".")[0]}.${tenant_base_url}/Admin/leadstatus/getall`,
        config,
      );
      setplanType(response.data.data);
      console.log("Plan data:", response.data.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
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
            <div className="flex flex-wrap items-center justify-between gap-5 min-w-screen">
              <h1 className="text-3xl font-medium">Plan</h1>
              <button
                onClick={handleActiveState}
                className="p-2 text-sm text-white bg-blue-600 rounded min-w-10"
              >
                Add Plan
              </button>
            </div>
            <div className="mt-3 overflow-x-auto shadow-md leads_Table_Main_Container">
              <div className="min-w-full rounded-md leads_Table_Container">
                <table className="min-w-full bg-white leads_Table">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="px-1 py-3">
                        <input type="checkbox" />
                      </th>
                      <th className="px-2 py-3 font-medium text-left border-r">
                        <div className="flex items-center justify-between text-sm">
                          <span>Plan Amount</span>
                          <FaBars />
                        </div>
                      </th>
                      <th className="px-2 py-3 font-medium text-left border-r">
                        <div className="flex items-center justify-between text-sm">
                          <span>Plan Type</span>
                          <FaBars />
                        </div>
                      </th>
                      <th className="px-2 py-3 font-medium text-left border-r">
                        <div className="flex items-center justify-between text-sm">
                          <span>Description</span>
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
                          {user.planAmount}
                        </td>
                        <td className="px-2 py-4 text-sm break-words max-w-24">
                          {user.planType}
                        </td>
                        <td className="px-2 py-4 text-sm break-words max-w-24">
                          {user.description}
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
                {isEditMode ? "Edit Plan Operation" : "Add Plan Operation"}
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
                    Plan Information
                  </h2>
                  {/* -------------1------------- */}
                  <div className="grid gap-2 px-4 py-2">
                    {/* -------------planAmount------------- */}
                    <div className="flex space-x-4">
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor="planAmount"
                          className="text-sm font-medium text-gray-700"
                        >
                          Plan Amount
                        </label>
                        <input
                          type="text"
                          name="planAmount"
                          value={formData.planAmount}
                          onChange={handleChange}
                          className="p-2 mt-1 border border-gray-300 rounded-md"
                          placeholder="Enter Plan Amount"
                        />
                      </div>
                      {/* -------------planType------------- */}
                      <div className="relative flex flex-col w-1/2">
                        <label
                          htmlFor="planType"
                          className="text-sm font-medium text-gray-700"
                        >
                          Plan Type
                        </label>
                        <div
                          className="relative"
                          onClick={toggleDropdownplanType}
                          onMouseLeave={() =>
                            setIsDropdownVisibleplanType(false)
                          }
                        >
                          <button
                            className="flex items-center justify-between w-full p-2 mt-1 border border-gray-300 rounded-md"
                            id="planDropDown"
                            type="button"
                          >
                            {formData.planType || defaultTextplanTypeDropDown}
                            <FaAngleDown className="ml-2 text-gray-400" />
                          </button>

                          {isDropdownVisibleplanType && (
                            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md top-11">
                              <ul className="py-2 text-sm text-gray-700">
                                {planType.map((plan) => (
                                  <li
                                    key={plan.id}
                                    className="block px-4 py-2 border-b cursor-pointer hover:bg-cyan-500 hover:text-white"
                                    onClick={() =>
                                      handleDropdownPlanType(plan.planType)
                                    }
                                  >
                                    {plan.planType}
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
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          className="p-2 mt-1 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    {/* -------------Button------------- */}
                    <div className="flex items-center justify-start max-w-full mb-3">
                      <button
                        type="submit"
                        className="px-6 py-4 mt-4 border rounded-md w-max border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white"
                      >
                        {isEditMode ? "Update User" : "Save User"}
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
