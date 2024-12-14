import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import { FaAngleDown } from 'react-icons/fa'; // Ensure necessary icons are imported
import { tenant_base_url, protocal_url } from '../../../../../Config/config';
import GlobalUserNameComponent from '../../ReusableComponents/GlobalUserNameComponent';
import { getHostnamePart } from '../../ReusableComponents/GlobalHostUrl';
import { ToastContainer } from 'react-toastify';

import {showSuccessToast, showErrorToast} from './../../../../../utils/toastNotifications'


export default function UserSettingForm({
  handleActiveState,
  editUser,
  isEditMode,
  onSave,
  isAddUserActive,
}) 
{

  const businessType = localStorage.getItem('businessType');


  // id is to fetch the user id from the URL
  const { id } = useParams();


  //IMP used as ${name} in an API
  const name = getHostnamePart();

  // Default form data
  const [formData, setFormData] = useState({
    userId: editUser?.userId || '',
    firstName: editUser?.firstName || '',
    lastName: editUser?.lastName || '',
    email: editUser?.email || '',
    contactNo: editUser?.contactNo || '',
    country: editUser?.country || '',
    businessType: businessType,
    password: editUser?.password || '',
    confirmPassword: editUser?.confirmPassword || '',
    reportedTo: editUser?.reportedTo || '',
    role: editUser?.role || '',
    createdDate: editUser?.createdDate || '',
    deletedDate: editUser?.deletedDate || '',
    userName: editUser?.userName || '',
  });

  useEffect(() => {
    if (isAddUserActive) {
      setFormData({
        userId: editUser.userId,
        firstName: editUser.firstName,
        lastName: editUser.lastName,
        email: editUser.email,
        contactNo: editUser.contactNo,
        country: editUser.country,
        businessType: businessType,
        password: editUser.password || '',
        confirmPassword: editUser.confirmPassword || '',
        reportedTo: editUser.reportedTo,
        role: editUser.role,
        createdDate: editUser.createdDate || '',
        deletedDate: editUser.deletedDate || '',
        userName: editUser?.userName || '',

      });
    } else {
      setFormData({
        userId: '',
        firstName: '',
        lastName: '',
        email: '',
        contactNo: '',
        country: '',
        businessType: '',
        password: '',
        confirmPassword: '',
        reportedTo: '',
        role: '',
        createdDate: '',
        deletedDate: '',
        userName: '',

      });
    }
  }, [isEditMode, editUser]);

  // Password visibility state
  const [passwordEye, setPasswordEye] = useState(false);

  // Password visibility toggle
  const togglePasswordEye = () => {
    setPasswordEye(!passwordEye);
  };

  // Handle form change
  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
      
    const selectedRole = ROLE.find((item) => item.groupName === formData.Role);

    const bearer_token = localStorage.getItem('token');
    
    const config = {
      headers: {
        Authorization: `Bearer ${bearer_token}`,
      },
    };
    

    const formData_POST ={
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      contactNo: formData.contactNo,
      userName: formData.userName || '',
      country: formData.country,
      businessType: businessType,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      role: formData.role || '',
      reportedTo: formData.reportedTo,
      isActive: true,
      createdDate: new Date().toISOString(),
      deletedDate: new Date().toISOString(),
      groupId: selectedRole?.id,
      

    }

    const formData_PUT ={
      userId: formData.userId,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      contactNo: formData.contactNo,
      country: formData.country,
      businessType: businessType,
      userName: formData.username,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      role: formData.role,
      groupId: selectedRole,
      reportedTo: formData.reportedTo,
      isActive: true,
      createdDate: formData.createdDate || null,
      deletedDate: formData.deletedDate || null,
      
}

 

    try {
      if (isEditMode) {
        console.log('active editMode');
        await axios.put(`${protocal_url}${name}.${tenant_base_url}/Setting/update`,formData_PUT,  config);
        showSuccessToast('User updated successfully');
        onSave();
        handleActiveState();
      } else {
        if(!formData_POST.firstName){
          showErrorToast('Please enter name');
          return;
        }
      
        if(!formData_POST.email){
          showErrorToast('Please enter email');
          return;
        }
      
        if(!formData_POST.contactNo){
          showErrorToast('Please enter contact number');
          return;
        }
      
        if(!formData_POST.password){
          showErrorToast('Please enter password');
          return;
        }
      
        if(formData_POST.password !== formData_POST.confirmPassword){
          showErrorToast('Password doesnt match');
          return;
        }
      
        if(!formData_POST.reportedTo){
          showErrorToast('Please selected Reported to');
          return;
        }
      
        if(!formData_POST.role){
          showErrorToast('Please selected group name');
          return;
        }
        await axios.post(`${protocal_url}${name}.${tenant_base_url}/Setting`,formData_POST, config);
        showSuccessToast('User added successfully');
        onSave();
        handleActiveState(); // Switch back to table view
      }
    } catch (error) {
      alert('Error occurred while saving the user. Please try again.');
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
        `${protocal_url}${name}.${tenant_base_url}/Admin/group/all`,
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

  return (
    <>
    <ToastContainer/>
      <div className="flex min-w-screen justify-between items-center">
        <h1 className="text-3xl font-medium">
          {isEditMode ? 'Edit User' : 'Add User'}
        </h1>
        <button
          onClick={() => handleActiveState(true)} // Switch to table view
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
  );
}
