import { useState, useEffect } from 'react';
import { FaAngleDown, FaBars } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { tenant_base_url, protocal_url } from './../../../../../Config/config';

export default function SMSSetting() {
  const { id } = useParams();
  const [active, setActive] = useState(true);
  const [users, setUsers] = useState([
    {
      id: 1,
      APISenderID: 101,
      APIServerName: 'Group-Tambi',
      template: 'Plan is very Big',
    },
    {
      id: 2,
      APISenderID: 102,
      APIServerName: 'Group-Lompi',
      template: 'Plan is Incredible',
    },
  ]);

  const [formData, setFormData] = useState({
    id: '',
    APISenderID: '',
    APIServerName: '',
    template: '',
  });

  const [editLead, setEditLead] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // APIServerName Type State
  const [APIServerName, setAPIServerName] = useState([]);
  const [
    defaultTextAPIServerNameTypeDropDown,
    setDefaultTextAPIServerNameTypeDropDown,
  ] = useState('Select API Server Name');
  const [
    isDropdownVisibleAPIServerNameType,
    setIsDropdownVisibleAPIServerNameType,
  ] = useState(false);

  const handleActiveState = () => {
    setActive(!active);
    setIsEditMode(false); // Reset edit mode when switching views
    setFormData({
      id: '',
      APISenderID: '',
      APIServerName: '',
      template: '',
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

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};

    if (!formData.APISenderID || formData.APISenderID.trim() === '') {
      errors.APISenderID = 'API Server is required';
    } else if (
      !formData.APIServerName ||
      formData.APIServerName.trim() === ''
    ) {
      errors.APIServerName = 'API Server Name is required';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    if (isEditMode) {
      console.log('Edit User:', formData);
      // Add logic to submit the edited user data
    } else {
      console.log('Add User:', formData);
      setActive(true); // Switch to the form view

      // Add logic to add a new user
    }
  };

  const handleCheckboxClick = (e, userId) => {
    e.stopPropagation();
    console.log(`Checkbox clicked for user: ${userId}`);
  };

  // Plan Type Dropdown
  const toggleDropdownAPIServerNameType = () => {
    setIsDropdownVisibleAPIServerNameType(!isDropdownVisibleAPIServerNameType);
  };

  const handleDropdownPlanType = (APIServerName) => {
    setFormData((APIServerName) => ({
      ...APIServerName,
      APIServerName,
    }));
    setDefaultTextAPIServerNameTypeDropDown(APIServerName);
    setIsDropdownVisibleAPIServerNameType(false);
  };

  async function handleGroup() {
    const bearer_token = localStorage.getItem('token');

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${
          window.location.hostname.split('.')[0]
        }.${tenant_base_url}/Admin/leadstatus/getall`,
        config
      );
      setplanType(response.data.data);
      console.log('Plan data:', response.data.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
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
            <div className="flex min-w-screen justify-between items-center">
              <h1 className="text-3xl font-medium">SMS Setting</h1>
              <button
                onClick={handleActiveState}
                className="bg-blue-600 text-white p-2 min-w-10 text-sm rounded"
              >
                Add SMS Setting
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
                          <span>API Sender ID</span>
                          <FaBars />
                        </div>
                      </th>
                      <th className="px-2 py-3 text-left border-r font-medium">
                        <div className="flex justify-between items-center text-sm">
                          <span>API Server Name</span>
                          <FaBars />
                        </div>
                      </th>
                      <th className="px-2 py-3 text-left border-r font-medium">
                        <div className="flex justify-between items-center text-sm">
                          <span>Template</span>
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
                          {user.APISenderID}
                        </td>
                        <td className="px-2 py-4 text-sm max-w-24 break-words">
                          {user.APIServerName}
                        </td>
                        <td className="px-2 py-4 text-sm max-w-24 break-words">
                          {user.template}
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
                {isEditMode ? 'Edit SMS Setting' : 'Add SMS Setting'}
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
                    SMS Setting
                  </h2>
                  {/* -------------1------------- */}
                  <div className="py-2 px-4 grid gap-2">
                    {/* -------------API Server ID------------- */}
                    <div className="flex space-x-4">
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor="APISenderID"
                          className="text-sm font-medium text-gray-700"
                        >
                          API Server ID
                        </label>
                        <input
                          type="text"
                          name="APISenderID"
                          value={formData.APISenderID}
                          onChange={handleChange}
                          className="mt-1 p-2 border border-gray-300 rounded-md"
                          placeholder="Enter API Sender ID"
                        />
                        {errors.APISenderID && (
                          <span style={{ color: 'red' }}>
                            {errors.APISenderID}
                          </span>
                        )}
                      </div>
                      {/* -------------API Server Name------------- */}
                      <div className="flex flex-col w-1/2 relative">
                        <label
                          htmlFor="name"
                          className="text-sm font-medium text-gray-700"
                        >
                          API Server Name
                        </label>
                        <div
                          className="relative"
                          onClick={toggleDropdownAPIServerNameType}
                          onMouseLeave={() =>
                            setIsDropdownVisibleAPIServerNameType(false)
                          }
                        >
                          <button
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                            id="DropDown"
                            type="button"
                          >
                            {formData.APIServerName ||
                              defaultTextAPIServerNameTypeDropDown}
                            <FaAngleDown className="ml-2 text-gray-400" />
                          </button>

                          {isDropdownVisibleAPIServerNameType && (
                            <div className="absolute w-full bg-white border border-gray-300 rounded-md top-11 z-10">
                              <ul className="py-2 text-sm text-gray-700">
                                {APIServerName.map((plan) => (
                                  <li
                                    key={plan.id}
                                    className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                                    onClick={() =>
                                      handleDropdownPlanType(plan.APIServerName)
                                    }
                                  >
                                    {plan.APIServerName}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        {errors.APIServerName && (
                          <span style={{ color: 'red' }}>
                            {errors.APIServerName}
                          </span>
                        )}
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
                          Template
                        </label>
                        <input
                          type="text"
                          name="template"
                          value={formData.template}
                          onChange={handleChange}
                          className="mt-1 p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    {/* -------------Button------------- */}
                    <div className="mb-3 flex items-center justify-start max-w-full">
                      <button
                        type="submit"
                        className="mt-4 hover:bg-cyan-500 border border-cyan-500 text-cyan-500 hover:text-white px-6 py-4 rounded-md w-max"
                      >
                        {isEditMode ? 'Update User' : 'Save User'}
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