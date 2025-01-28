import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FaBars } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";

import axios from "axios";
import { tenant_base_url, protocal_url } from "./../../../../../Config/config";
import { getHostnamePart } from "../../ReusableComponents/GlobalHostUrl";
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";

import { ToastContainer } from "react-toastify";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../../utils/toastNotifications";

export default function UserSetting() {
  const name = getHostnamePart();
  const bearer_token = localStorage.getItem("token");

  const [data, setData] = useState([]);
  const [active, setActive] = useState(true);
  const [selectedData, setSelectedData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const businessType = localStorage.getItem("businessType");

  const [reportedTo, setreportedTo] = useState([]);

  // Handle checkbox click
  const handleCheckboxClick = (e, userId) => {
    e.stopPropagation(); // Prevent row click event from firing
    console.log(`Checkbox clicked for user: ${userId}`);
  };

  //switching from admin to another users
  const handleLoginUser = async (user) => {
    const bearer_token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${bearer_token}`,
      },
    };
    try {
      const response = await axios.post(
        `${protocal_url}${name}.${tenant_base_url}/Users/login`,
        {
          userName: user?.email,
          password: user?.dycriptedPassword,
          deviceType: "",
          deviceAddress: "",
        },
        config,
      );

      // Log the response to verify the status code
      console.log("Response status:", response?.status);
      const logindetail = response.data.data;
      if (response?.data?.data) {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("userDetail", JSON.stringify(logindetail));
        alert("Login successful");
        // refresh();
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  // Password visibility state
  const [passwordEye, setPasswordEye] = useState(false);

  // Password visibility toggle
  const togglePasswordEye = (e) => {
    e.preventDefault();
    // setPasswordEye(!passwordEye);
  };

  // Fetch all  data
  //-------------------get-------------------get-------------------get-------------------get-------------------
  async function handleLead() {
    const bearer_token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Setting/users/byusertoken`,
        config,
      );
      console.log(response?.data?.data, "000");
      setData(response?.data?.data);
      setreportedTo(response?.data?.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  }

  useEffect(() => {
    handleLead(); // Fetch the  list on initial load
  }, []);

  // Delete  by ID
  const handleDelete = async (id) => {
    console.log(id);
    const bearer_token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      await axios.delete(
        `${protocal_url}${name}.${tenant_base_url}/Setting/${id}`,
        config,
      );
      showSuccessToast("User Deleted Successfully");
      setData((prevData) => prevData.filter((item) => item.id !== id));
      handleLead();
    } catch (error) {
      showErrorToast(error.response.data.message);
    }
  };

  // Handle switching to the form for adding or editing
  const handleEdit = (data) => {
    setSelectedData(data);
    setActive(false);
    setIsEditMode(true);
  };

  const handleAdd = () => {
    setSelectedData({
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
      role: "",
      createdDate: "",
      deletedDate: "",
      userName: "",
    });
    setActive(false);
    setIsEditMode(false);
  };

  // Handle form submission callback
  const handleFormSubmit = async (formData) => {
    const config = {
      headers: {
        Authorization: `Bearer ${bearer_token}`,
      },
    };

    const formData_POST = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      contactNo: formData.contactNo,
      country: formData.country,
      businessType: businessType,
      userName: formData.userName || "",
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      role: formData.role || "",
      groupId: null,
      reportedTo: formData.reportedTo,
      isActive: true,
      createdDate: null,
      deletedDate: null,
    };

    const formData_PUT = {
      userId: formData.userId,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      contactNo: formData.contactNo,
      country: formData.country,
      businessType: businessType,
      userName: formData.userName,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      role: formData.role,
      groupId: null,
      reportedTo: formData.reportedTo,
      isActive: true,
      createdDate: formData.createdDate || null,
      deletedDate: formData.deletedDate || null,
    };

    console.log(formData_POST, "handleSubmitRunned");

    try {
      if (isEditMode) {
        await axios.put(
          `${protocal_url}${name}.${tenant_base_url}/Setting/update`,
          formData_PUT,
          config,
        );
      } else {
        if (!formData_POST.firstName) {
          showErrorToast("Please enter name");
          return;
        }

        if (!formData_POST.email) {
          showErrorToast("Please enter email");
          return;
        }

        if (!formData_POST.contactNo) {
          showErrorToast("Please enter contact number");
          return;
        }

        if (!formData_POST.password) {
          showErrorToast("Please enter password");
          return;
        }

        if (formData_POST.password !== formData_POST.confirmPassword) {
          showErrorToast("Password doesnt match");
          return;
        }

        if (!formData_POST.reportedTo) {
          showErrorToast("Please selected Reported to");
          return;
        }

        if (!formData_POST.role) {
          showErrorToast("Please selected group name");
          return;
        }
        await axios.post(
          `${protocal_url}${name}.${tenant_base_url}/Setting`,
          formData_POST,
          config,
        );
      }

      handleLead(); // Refresh the list
      setActive(true); // Switch back to the list view
      setSelectedData(null); // Reset the selected
      setIsEditMode(false); // Reset edit mode
    } catch (error) {
      showErrorToast(error.response.data.message);
    }
  };

  // Handle cancel form action
  const handleCancel = () => {
    setActive(true);
    setSelectedData(null);
    setIsEditMode(false);
  };

  // Form Component for Adding/Updating
  const EditForm = ({ data, isEditMode }) => {
    const [formData, setFormData] = useState({
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
      role: "",
      createdDate: "",
      deletedDate: "",
      userName: "",
    });

    useEffect(() => {
      setFormData(
        data || {
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
          role: "",
          createdDate: "",
          deletedDate: "",
          userName: "",
        },
      );
    }, [data]);

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
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
        const response = await axios.get(
          `${protocal_url}${name}.${tenant_base_url}/Admin/group/all`,
          config,
        );
        setROLE(response.data.data);
        // console.log("Role data:", response.data.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    }

    useEffect(() => {
      handleRole();
    }, []);

    const handleSubmit = (e) => {
      e.preventDefault();
      handleFormSubmit(formData);
    };

    return (
      <>
        <ToastContainer />
        <div className="min-w-screen flex items-center justify-between">
          <h1 className="text-3xl font-medium">
            {isEditMode ? "Edit" : "Add"}
          </h1>
          <button
            onClick={handleCancel}
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

              <div className="grid gap-2 px-3 py-2">
                {/*<---------------1--------------->*/}
                {/*<---------------First Name--------------->*/}
                <div className="flex space-x-4">
                  <div className="flex w-1/2 flex-col">
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
                      className="mt-1 rounded-md border border-gray-300 p-2"
                    />
                  </div>
                  {/*<---------------Last Name--------------->*/}
                  <div className="flex w-1/2 flex-col">
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
                      className="mt-1 rounded-md border border-gray-300 p-2"
                    />
                  </div>
                </div>
                {/*<---------------2--------------->*/}
                <div className="flex space-x-4">
                  {/*<---------------Email--------------->*/}
                  <div className="flex w-1/2 flex-col">
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
                      className="mt-1 rounded-md border border-gray-300 p-2"
                    />
                  </div>
                  {/*<---------------contactNo--------------->*/}
                  <div className="flex w-1/2 flex-col">
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
                      className="mt-1 rounded-md border border-gray-300 p-2"
                    />
                  </div>
                </div>

                {/*<---------------3--------------->*/}
                {/*<---------------userName--------------->*/}
                <div className="flex space-x-4">
                  <div className="flex w-1/2 flex-col">
                    <label
                      htmlFor="userName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      name="userName"
                      value={formData.userName || ""}
                      onChange={handleChange}
                      className="mt-1 rounded-md border border-gray-300 p-2"
                    />
                  </div>

                  {/*<---------------country--------------->*/}
                  <div className="flex w-1/2 flex-col">
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
                      className="mt-1 rounded-md border border-gray-300 p-2"
                    />
                  </div>
                </div>
                {/*<---------------4--------------->*/}
                <div className="flex space-x-4">
                  {/* Password Input Field */}
                  <div className="flex w-1/2 flex-col">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                      <div className="relative">
                        <input
                          type={passwordEye ? "text" : "password"}
                          name="password"
                          className="mt-1 w-full rounded-md border border-gray-300 py-2 pl-2 pr-10 text-sm outline-none"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="********"
                        />
                      </div>
                    </label>
                  </div>
                  {/*<---------------Confirm Password--------------->*/}
                  {/* Password Input Field */}
                  <div className="flex w-1/2 flex-col">
                    <label
                      htmlFor="confirmPassword"
                      className="relative block text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                      <input
                        type={passwordEye ? "text" : "password"}
                        name="confirmPassword"
                        className="mt-1 flex w-full justify-between rounded-md border border-gray-300 px-2 py-2 text-sm outline-none"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="********"
                      />
                    </label>
                  </div>
                </div>
                {/*<---------------5--------------->*/}
                <div className="flex space-x-4">
                  <div className="flex w-1/2 flex-col">
                    <label
                      htmlFor="reportedTo"
                      className="text-sm font-medium text-gray-700"
                    >
                      Reported To
                    </label>
                    <select
                      name="reportedTo"
                      className="mt-1 rounded-md border border-gray-300 p-2"
                      value={formData?.reportedTo || ""}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        {formData?.reportedTo || "Select"}
                      </option>
                      {reportedTo?.map((item) => (
                        <option key={item.id} value={item.reportedTo}>
                          {item.reportedTo}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* -------------ROLE------------- */}

                  <div className="flex w-1/2 flex-col">
                    <label
                      htmlFor="role"
                      className="text-sm font-medium text-gray-700"
                    >
                      Group Name
                    </label>
                    <select
                      name="role"
                      className="mt-1 rounded-md border border-gray-300 p-2"
                      value={formData?.role || ""}
                      onChange={handleChange}
                    >
                      <option value={formData?.role || ""} disabled>
                        {formData?.role || "Select"}
                      </option>
                      {ROLE?.map((item, i) => (
                        <option key={i} value={item.groupName}>
                          {item.groupName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* -------------createdDate------------- */}

                <div className="mb-3 flex max-w-full items-center justify-end">
                  <button
                    type="submit"
                    className="mt-4 w-full rounded-md border border-cyan-500 px-6 py-4 text-cyan-500 hover:bg-cyan-500 hover:text-white"
                  >
                    {isEditMode ? "Update User" : "Save User"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  };

  return (
    <>
      <ToastContainer />
      <div className="min-w-screen m-3">
        {active ? (
          <>
            <div className="min-w-screen flex flex-wrap items-center justify-between gap-5">
              <h1 className="whitespace-nowrap text-3xl font-medium">User</h1>
              <button
                onClick={handleAdd}
                className="min-w-10 rounded bg-blue-600 p-2 text-sm text-white"
              >
                Add user
              </button>
            </div>
            <div className="mt-3 flex-wrap gap-5 overflow-x-auto shadow-md">
              <div className="leads_Table_Container min-w-full rounded-md">
                <table className="leads_Table min-w-full bg-white">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="px-1 py-3">
                        <input type="checkbox" />
                      </th>
                      <th className="border-r px-2 py-3 text-left font-medium">
                        <div className="flex items-center justify-between text-sm">
                          <span>First Name</span>
                          <FaBars />
                        </div>
                      </th>
                      <th className="border-r px-2 py-3 text-left font-medium">
                        <div className="flex items-center justify-between text-sm">
                          <span>Last Name</span>
                          <FaBars />
                        </div>
                      </th>
                      <th className="border-r px-2 py-3 text-left font-medium">
                        <div className="flex items-center justify-between text-sm">
                          <span>Email</span>
                          <FaBars />
                        </div>
                      </th>
                      <th className="border-r px-2 py-3 text-left font-medium">
                        <div className="flex items-center justify-between text-sm">
                          <span>Contact</span>
                          <FaBars />
                        </div>
                      </th>
                      <th className="border-r px-2 py-3 text-left font-medium">
                        <div className="flex items-center justify-between text-sm">
                          <span>Country</span>
                          <FaBars />
                        </div>
                      </th>
                      <th className="border-r px-2 py-3 text-left font-medium">
                        <div className="flex items-center justify-between text-sm">
                          <span>Reported To</span>
                          <FaBars />
                        </div>
                      </th>
                      <th className="border-r px-2 py-3 text-left font-medium">
                        <div className="flex items-center justify-between text-sm">
                          <span>Role</span>
                          <FaBars />
                        </div>
                      </th>
                      <th className="border-r px-2 py-3 text-left font-medium">
                        <div className="flex items-center justify-between text-sm">
                          <span>Created Date</span>
                          <FaBars />
                        </div>
                      </th>
                      <th className="border-r px-2 py-3 text-left font-medium">
                        <div className="flex items-center justify-between text-sm">
                          <span>Direct Login</span>
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
                    {data.map((data, i) => (
                      <tr
                        key={data.i}
                        className="cursor-pointer border-b border-gray-300 hover:bg-gray-200"
                      >
                        <td className="px-1 py-3 text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="max-w-24 break-words px-2 py-4 text-sm">
                          {data.firstName}
                        </td>
                        <td className="min-w-20 max-w-20 break-words px-1 text-sm">
                          {data.lastName}
                        </td>
                        <td className="max-w-24 break-words px-2 py-4 text-sm">
                          {data.email}
                        </td>
                        <td className="max-w-24 break-words px-2 py-4 text-sm">
                          <a
                            href={`tel:${data.contactNo}`}
                            onClick={(event) => event.stopPropagation()}
                          >
                            {data.contactNo}
                          </a>
                        </td>
                        <td className="max-w-24 break-words px-2 py-4 text-sm">
                          {data.country}
                        </td>
                        <td className="max-w-24 break-words px-2 py-4 text-sm">
                          {data.reportedTo}
                        </td>
                        <td className="max-w-24 break-words px-2 py-4 text-sm">
                          {data.role}
                        </td>

                        <td className="max-w-24 break-words px-2 py-4 text-sm">
                          {data?.createdDate?.split("T")[0] || ""}
                        </td>

                        <td className="text-center">
                          <Link
                            onClick={() => handleLoginUser(user)}
                            className="min-w-10 rounded bg-blue-600 p-2 text-sm text-white"
                          >
                            Login As
                          </Link>
                        </td>

                        <td className="flex justify-center gap-3 px-2 py-4">
                          <MdEdit
                            size={25}
                            color="white"
                            className="rounded bg-blue-500"
                            onClick={() => handleEdit(data)}
                          />
                          <RiDeleteBin6Fill
                            size={25}
                            color="red"
                            onClick={() => handleDelete(data.userId)}
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
          <EditForm data={selectedData} isEditMode={isEditMode} />
        )}
      </div>
    </>
  );
}
