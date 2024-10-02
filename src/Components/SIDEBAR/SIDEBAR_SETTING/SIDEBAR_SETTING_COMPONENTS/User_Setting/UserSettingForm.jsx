import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Ensure axios is imported
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa"; // Ensure necessary icons are imported
import { tenant_base_url, protocal_url } from "../../../../../Config/config";
import GlobalUserNameComponent from "../../ReusableComponents/GlobalUserNameComponent";

export default function UserSettingForm({ handleActiveState, editUser, isEditMode, onSave, isAddUserActive }) {

  const fullURL = window.location.href;
  const url = new URL(fullURL);
  const name = url.hostname.split(".")[0];

  // id is to fetch the user id from the URL
  const { id } = useParams();

  // Default form data
  const [formData, setFormData] = useState({
    userId: editUser?.userId || "",
    firstName: editUser?.firstName || "",
    lastName: editUser?.lastName || "",
    email: editUser?.email || "",
    contactNo: editUser?.contactNo || "",
    country: editUser?.country || "",
    businessType: editUser?.businessType || "",
    password: editUser?.password || "",
    confirmPassword: editUser?.confirmPassword || "",
    reportedTo: editUser?.reportedTo || "",
    Role: editUser?.Role || "",
    createdDate: editUser?.createdDate || "",
    deletedDate: editUser?.deletedDate || "",
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
        businessType: editUser.businessType || "",
        password: editUser.password || "",
        confirmPassword: editUser.confirmPassword || "",
        reportedTo: editUser.reportedTo,
        Role: editUser.role,
        createdDate: editUser.createdDate || "",
        deletedDate: editUser.deletedDate || "",
      });
    }
    else {
      setFormData({
        userId: "",
        firstName: "",
        lastName: "",
        email: "",
        contactNo: "",
        country: "",
        businessType: "",
        password: "",
        confirmPassword: "",
        reportedTo: "",
        Role: "",
        createdDate: "",
        deletedDate: "",
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
    console.log(e.target.value)
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedRole = ROLE.find((item) => item.groupName === formData.Role);
    const bearer_token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${bearer_token}`,
      },
    };

    try {
      if (isEditMode) {
        console.log('active editMode')
        await axios.put(
          `${protocal_url}${name}.${tenant_base_url}/Setting/update`,
          {
            userId: formData.userId,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            contactNo: formData.contactNo,
            country: formData.country,
            businessType: formData.businessType || "",
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            role: formData.Role,
            isActive: true,
            reportedTo: formData.reportedTo,
            createdDate: formData.createdDate || "",
            deletedDate: formData.deletedDate || "",
            groupId: selectedRole
          },
          config
        );
        alert("User updated successfully");
        onSave();
        handleActiveState();
      } else {
        console.log('non-active editMode')
        await axios.post(`${protocal_url}${name}.${tenant_base_url}/Setting`,
          {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            contactNo: formData.contactNo,
            country: formData.country,
            businessType: formData.businessType || "",
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            role: formData.Role || "",
            reportedTo: formData.reportedTo,
            isActive: true,
            createdDate: new Date().toISOString(),
            deletedDate: new Date().toISOString(),
            groupId: selectedRole?.id
          },
          config
        );
        // console.log('non-active editMode')
        alert("User added successfully");
        onSave();
        handleActiveState(); // Switch back to table view
      }
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Error occurred while saving the user. Please try again.");
    }
  };

  // ROLE dropdown management
  const [ROLE, setROLE] = useState([]);


  async function handleRole() {
    const bearer_token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${bearer_token}`,
      },
    };
    try {
      const response = await axios.get(`${protocal_url}${name}.${tenant_base_url}/Admin/group/all`, config);
      setROLE(response.data.data);
      // console.log("Role data:", response.data.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  }

  useEffect(() => {
    handleRole();
  }, []);

  return (
    <>
      <div className="flex min-w-screen justify-between items-center">
        <h1 className="text-3xl font-medium">
          {isEditMode ? "Edit User" : "Add User"}
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

            <div className="py-2 px-4 min-h-screen relative">
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
                    value={formData.firstName || ""}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                    required
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
                    value={formData.lastName || ""}
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
                    value={formData.email || ""}
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
                    value={formData.contactNo || ""}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              {/*<---------------3--------------->*/}
              <div className="flex space-x-4">
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
                    value={formData.country || ""}
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
                    className="text-xs font-medium text-gray-700 relative block"
                  >
                    Password
                    <input
                      type={passwordEye ? "text" : "password"}
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
                          className={`transition-opacity duration-300 ease-in-out ${passwordEye ? "opacity-100" : "opacity-0"
                            }`}
                        />
                      ) : (
                        <IoIosEyeOff
                          size={22}
                          className={`transition-opacity duration-300 ease-in-out ${passwordEye ? "opacity-0" : "opacity-100"
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
                    className="text-xs font-medium text-gray-700 relative block"
                  >
                    Confirm Password
                    <input
                      type={passwordEye ? "text" : "password"}
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
                          className={`transition-opacity duration-300 ease-in-out ${passwordEye ? "opacity-100" : "opacity-0"
                            }`}
                        />
                      ) : (
                        <IoIosEyeOff
                          size={22}
                          className={`transition-opacity duration-300 ease-in-out ${passwordEye ? "opacity-0" : "opacity-100"
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
                    selectedValue={formData?.reportedTo || ""}
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
                    name={"Role"}
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                    value={formData?.Role || ""}
                    onChange={handleChange}
                  >
                    <option value={formData?.Role || ""} disabled>{formData?.Role || 'Select'}</option>
                    {ROLE?.map((item) => (
                      <option key={item.id} value={item.groupName}>
                        {item.groupName}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* -------------createdDate------------- */}



              <button
                type="submit"
                className="mt-4 hover:bg-cyan-500 border border-cyan-500 text-cyan-500 hover:text-white px-4 py-4 rounded-md "
              >
                {isEditMode ? "Update User" : "Save User"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
} 