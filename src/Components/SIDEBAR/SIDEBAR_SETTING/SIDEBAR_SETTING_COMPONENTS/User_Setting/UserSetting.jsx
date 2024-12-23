//react
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

//reactIcon
import { FaAngleDown, FaBars } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";

import { useParams } from "react-router-dom";

//external Packages
import axios from "axios";

import { tenant_base_url, protocal_url } from "./../../../../../Config/config";
import { getHostnamePart } from "../../ReusableComponents/GlobalHostUrl";
import GlobalUserNameComponent from "../../ReusableComponents/GlobalUserNameComponent";

//toastify~
import { ToastContainer } from "react-toastify";
import {showSuccessToast,showErrorToast} from "../../../../../utils/toastNotifications";

export default function UserSetting(){
  //to make id unique
  const { id } = useParams();

  const name = getHostnamePart();
  const bearer_token = localStorage.getItem("token");

  //state to show table or form
  const [data, setData] = useState([]);
  const [active, setActive] = useState(true);
  const [users, setUsers] = useState([]);
  const [groupNames, setGroupNames] = useState([]);

  //editMode
  const [editLead, setEditLead] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  


   // Password visibility state
   const [passwordEye, setPasswordEye] = useState(false);

   // Password visibility toggle
   const togglePasswordEye = () => {
     setPasswordEye(!passwordEye);
   };

   
  //getting user operation lists and groups lists here
  useEffect(() => {
    getOprationLists();
    getGroupsNames();
  }, []);

  const handleActiveState = () => {
    setActive(!active);
    setIsShowFields(false);
    setIsEditMode(false); // Reset edit mode when switching views
    setFormData({
      userId : "",
      firstName : "" ,
      lastName:"",
      email:"",
      contactNo: "",
      country :"",
      businessType: "",
      password: "",
      confirmPassword: "",
      reportedTo: "",
      role: "",
      createdDate: "",
      deletedDate: "",
      userName: "",
    });
    setSelectedUserName("");
  };

  const handleClick = (user) => {
    handleSelectUser(user);
    setFormData({
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      contactNo: user.contactNo,
      country: user.country,
      businessType: businessType,
      password: user.password || '',
      confirmPassword: user.confirmPassword || '',
      reportedTo: user.reportedTo,
      role: user.role,
      createdDate: user.createdDate || '',
      deletedDate: user.deletedDate || '',
      userName: user?.userName || '',
    });

    if (user) {
      setEditLead(user);
      setFormData(user); // Populate form with user data
      setIsEditMode(true);
      setActive(false); // Switch to form view
    }
  };

    // Fetch all  data
  //-------------------get-------------------get-------------------get-------------------get-------------------
  async function handleLead() {
    const bearer_token = localStorage.getItem('token');
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Setting/Alluser`,
        config
      );
      setData(response.data.data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  }

  useEffect(() => {
    handleLead(); // Fetch the  list on initial load
  }, []);

  // get operation lists
  const getOprationLists = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Setting/Alluser`,
        config
      );
      if (response.status === 200) {
        const opration = response.data; // Get the user data
        setUsers(opration?.data); // Set the user data for editing
      }
      
    } catch (error) {
      console.log(error)
      showErrorToast(error.response.data.message)
    }
  };

   // ROLE dropdown management
   const [ROLE, setROLE] = useState([]);

   async function handleRole() {
     const bearer_token = localStorage.getItem('token');
     const config = {
       headers: {
         Authorization: `Bearer ${bearer_token}`,
       },
     };
     try {
       const response = await axios.get(
         `${protocal_url}${name}.${tenant_base_url}/Setting/Alluser`,
         config
       );
       setROLE(response.data.data);
       // console.log("Role data:", response.data.data);
     } catch (error) {
       console.error('Error fetching roles:', error);
     }
   }
 
   useEffect(() => {
     handleRole();
   }, []);

  // get operation lists
  const getGroupsNames = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Setting/Alluser`,
        config
      );
      if (response.status === 200) {
        const opration = response.data; // Get the user data
        setGroupNames(opration?.data); // Set the user data for editing
      }
      else(
        showErrorToast("You are not an authorised user")
      )
    } catch (error) {
      showErrorToast("You are not an authorised user")
    }
  };

  // Handle user selection and update form fields
  const handleSelectUser = (item) => {
    const fullName = `${item.firstName} ${item.lastName}`;
    setFormData({
      ...formData,
      userId: item.userId,
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      contactNo: item.contactNo,
      country: item.country,
      businessType: businessType,
      password: item.password || '',
      confirmPassword: item.confirmPassword || '',
      reportedTo: item.reportedTo,
      role: item.role,
      createdDate: item.createdDate || '',
      deletedDate: item.deletedDate || '',
      userName: item?.userName || '',
    });
    setIsShowFields(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditMode) {
      handleUpdateOpration();
    } else {
      if (!formData.currencyCode) {
        showErrorToast("Please enter currency");
        return;
      }
      if (!formData.reportedTo) {
        showErrorToast("Please select reported to");
        return;
      }
      if (!formData.groupName) {
        showErrorToast("Please select group name");
        return;
      }
      if (!formData.target) {
        showErrorToast("Please select group name");
        return;
      }
      if (!formData.did) {
        showErrorToast("Please select group name");
        return;
      }
      handleCreateOperation();
    }
  };

  const handleCreateOperation = async (e) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.post(
        `${protocal_url}${name}.${tenant_base_url}/Setting/userOpration/add`,
        formData,
        config
      );
      getOprationLists();
      setActive(!active);
      showSuccessToast("User operation created successfull");
    } catch (error) {
      showErrorToast(error.response.data.message);
    }
  };

  //delete  operation
  const handleDeleteOpration = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.delete(
        `${protocal_url}${name}.${tenant_base_url}/Setting/userOpration/delete/${id}`,
        config
      );
      getOprationLists();
      showSuccessToast("User deleted successfully");
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  //update  operation
  const handleUpdateOpration = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.put(
        `${protocal_url}${name}.${tenant_base_url}/Setting/userOpration/update/${formData?.id}`,
        formData,
        config
      );
      getOprationLists();
      handleActiveState();
      alert(response.data.message);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="m-3 min-w-screen">
        {active ? (
          <>
            <div className="flex min-w-screen justify-between items-center">
        <h1 className="text-3xl font-medium">View Users</h1>
        <button
          onClick={handleActiveState} // Switch to form view to add a new user
          className="bg-blue-600 text-white p-2 min-w-10 text-sm rounded"
        >
          Add User 
        </button>
      </div>
            <div className="overflow-x-auto mt-3 shadow-md">
        <div className="min-w-full overflow-hidden rounded-md ">
          <table className="min-w-full bg-white">
            <thead className="">
              <tr className="border-gray-300 border-b-2">
                <th className="p-22">
                  <input type="checkbox" />
                </th>
                <th className="px-2 py-2 text-left border-r font-medium">
                  <div className="flex justify-between items-center text-sm">
                    <span>First Name</span>
                    <FaBars />
                  </div>
                </th>
                <th className="px-2 py-3 text-left border-r font-medium">
                  <div className="flex justify-between items-center text-sm">
                    <span>Last Name</span>
                    <FaBars />
                  </div>
                </th>
                <th className="px-2 py-3 text-left border-r font-medium">
                  <div className="flex justify-between items-center text-sm">
                    <span>Email</span>
                    <FaBars />
                  </div>
                </th>
                <th className="px-2 py-3 text-left border-r font-medium">
                  <div className="flex justify-between items-center text-sm">
                    <span>Contact Number</span>
                    <FaBars />
                  </div>
                </th>
                <th className="px-2 py-3 text-left border-r font-medium">
                  <div className="flex justify-between items-center text-sm">
                    <span>Country</span>
                    <FaBars />
                  </div>
                </th>
                <th className="px-2 py-3 text-left border-r font-medium">
                  <div className="flex justify-between items-center text-sm">
                    <span>Reported To</span>
                    <FaBars />
                  </div>
                </th>
                <th className="px-2 py-3 text-left border-r font-medium">
                  <div className="flex justify-between items-center text-sm">
                    <span>Role</span>
                    <FaBars />
                  </div>
                </th>
                <th className="px-2 py-3 text-left border-r font-medium">
                  <div className="flex justify-between items-center text-sm">
                    <span>Created Date</span>
                    <FaBars />
                  </div>
                </th>
                <th className="px-2 py-3 text-left border-r font-medium">
                  <div className="flex justify-between items-center text-sm">
                    <span>Direct Login</span>
                  </div>
                </th>
                <th className="px-2 py-3 text-left border-r font-medium">
                  <div className="flex justify-between items-center text-sm">
                    <span>Action</span>
                    <FaBars />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
                    {data?.length > 0 &&
                <>
                  {data?.map((data) => (
                    <tr
                      key={data.userId}
                      className="cursor-pointer hover:bg-gray-200 border-gray-300 border-b "
                    >
                      <td className="px-2 py-2 text-center">
                        <input
                          type="checkbox"
                          onClick={(e) => handleCheckboxClick(e, data.userId)}
                        />
                      </td>
                      <td className="px-1  text-sm min-w-20 max-w-20 break-words">
                        {data.firstName}
                      </td>
                      <td className="px-1 text-sm min-w-20 max-w-20 break-words">
                        {data.lastName}
                      </td>
                      <td className="px-1  text-sm min-w-20 max-w-28 break-words">
                        {data.email}
                      </td>
                      <td className="px-1  text-sm min-w-20 max-w-16 break-words">
                        {data.contactNo}
                      </td>
                      <td className="px-1  text-sm min-w-20 max-w-20 break-words">
                        {data.country}
                      </td>
                      <td className="px-1  text-sm min-w-20 max-w-20 break-words text-center">
                        {data.reportedTo}
                      </td>
                      <td className="px-1  text-sm min-w-16 max-w-20 break-words">
                        {data.role}
                      </td>
                      <td className="px-1  text-sm min-w-20 max-w-20 break-words text-center">
                      { data.createdDate ? data.createdDate.split('T')[0] : '' }

                      </td>
                      <td className="text-center">
                        <Link onClick={() => handleLoginUser(data)}  className="bg-blue-600 text-white p-2 min-w-10 text-sm rounded ">
                          Login As
                        </Link>
                      </td>
                      <td className="px-1 py-4 flex gap-1 justify-center min-w-20 max-w-20 break-words mx-auto">
                        <MdEdit
                          size={25}
                          color="white"
                          className="bg-blue-500 rounded"
                          onClick={() => handleEdit(data.userId)}
                        />
                        <RiDeleteBin6Fill size={25} color="red"
                          onClick={() => handleDelete(data.userId)}
                        />
                      </td>
                    </tr>
                  ))}
                </>
              }
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex min-w-screen justify-between items-center">
              <h1 className="text-3xl font-medium">
                {isEditMode ? "Edit User " : "Add user"}
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

            <div className="grid gap-2 px-3 py-2">
              {/*<---------------1--------------->*/}
              {/*<---------------First Name--------------->*/}
              <div className="flex space-x-4">
                <div className="flex flex-col w-1/2">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName || ''}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                  />
                </div>
                {/*<---------------Last Name--------------->*/}
                <div className="flex flex-col w-1/2">
                  <label
                    htmlFor="lastName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName || ''}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              {/*<---------------2--------------->*/}
              <div className="flex space-x-4">
                {/*<---------------Email--------------->*/}
                <div className="flex flex-col w-1/2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                  />                  
                </div>
                {/*<---------------contactNo--------------->*/}
                <div className="flex flex-col w-1/2">
                  <label
                    htmlFor="contactNo"
                    className="text-sm font-medium text-gray-700"
                  >
                    Contact Number
                  </label>
                  <input
                    type="number"
                    name="contactNo"
                    value={formData.contactNo || ''}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              {/*<---------------3--------------->*/}
              {/*<---------------userName--------------->*/}
              <div className="flex space-x-4">

              <div className="flex flex-col w-1/2">
                  <label
                    htmlFor="userName"
                    className="text-sm font-medium text-gray-700"
                  >
                  Username
                  </label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName || ''}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                  />
                </div>

                {/*<---------------country--------------->*/}
                <div className="flex flex-col w-1/2">
                  <label
                    htmlFor="country"
                    className="text-sm font-medium text-gray-700"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country || ''}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              {/*<---------------4--------------->*/}
              <div className="flex space-x-4">
                {/*<---------------Password--------------->*/}
                <div className="flex flex-col w-1/2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700 relative block"
                  >
                    Password
                    <input
                      type={passwordEye ? 'text' : 'password'}
                      name="password"
                      className="mt-1 py-2 px-2 border border-gray-300 rounded-md w-full outline-none text-sm flex justify-between"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="********"
                    />

                    <button
                      type="button"
                      onClick={togglePasswordEye}
                      className="absolute inset-y-0  top-5 right-2 flex items-center text-gray-500 transition-opacity duration-300 ease-in-out"
                    >
                      {passwordEye ? (
                        <IoIosEye
                          size={22}
                          className={`transition-opacity duration-300 ease-in-out ${
                            passwordEye ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                      ) : (
                        <IoIosEyeOff
                          size={22}
                          className={`transition-opacity duration-300 ease-in-out ${
                            passwordEye ? 'opacity-0' : 'opacity-100'
                          }`}
                        />
                      )}
                    </button>
                  </label>
                </div>

                {/*<---------------Confirm Password--------------->*/}
                <div className="flex flex-col w-1/2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-gray-700 relative block"
                  >
                    Confirm Password
                    <input
                      type={passwordEye ? 'text' : 'password'}
                      name="confirmPassword"
                      className="mt-1 py-2 px-2 border border-gray-300 rounded-md w-full outline-none text-sm flex justify-between"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="********"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordEye}
                      className="absolute inset-y-0  top-5 right-2 flex items-center text-gray-500 transition-opacity duration-300 ease-in-out"
                    >
                      {passwordEye ? (
                        <IoIosEye
                          size={22}
                          className={`transition-opacity duration-300 ease-in-out ${
                            passwordEye ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                      ) : (
                        <IoIosEyeOff
                          size={22}
                          className={`transition-opacity duration-300 ease-in-out ${
                            passwordEye ? 'opacity-0' : 'opacity-100'
                          }`}
                        />
                      )}
                    </button>
                  </label>
                </div>
              </div>

              {/*<---------------5--------------->*/}
              <div className="flex space-x-4">
                <div className="flex flex-col w-1/2">
                  <label
                    htmlFor="reportedTo"
                    className="text-sm font-medium text-gray-700"
                  >
                    Reported To
                  </label>
                  <GlobalUserNameComponent
                    name="reportedTo"
                    fieldName="userName"
                    selectedValue={formData?.reportedTo || ''}
                    setSelectedValue={(value) =>
                      setFormData({ ...formData, reportedTo: value })
                    }
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                  />
                </div>

                {/* -------------ROLE------------- */}

                <div className="flex flex-col w-1/2 relative">
                  <label
                    htmlFor="role"
                    className="text-sm font-medium text-gray-700"
                  >
                    Group Name
                  </label>
                  <select
                    name="role"
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                    value={formData?.role || ''}
                    onChange={handleChange}
                  >
                    <option value={formData?.Role || ''} disabled>
                      {formData?.Role || 'Select'}
                    </option>
                    {ROLE?.map((item) => (
                      <option key={item.id} value={item.groupName}>
                        {item.groupName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* -------------createdDate------------- */}

              <div className="mb-3 flex items-center justify-end max-w-full">
                <button
                  type="submit"
                  className="mt-4 w-full hover:bg-cyan-500 border border-cyan-500 text-cyan-500 hover:text-white px-6 py-4 rounded-md"
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
