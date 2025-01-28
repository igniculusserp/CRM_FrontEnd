import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa";
import axios from "axios";
import { tenant_base_url, protocal_url } from "./../../../../../Config/config";

import { getHostnamePart } from "../../ReusableComponents/GlobalHostUrl";

import { ToastContainer } from "react-toastify";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../../utils/toastNotifications";

export default function Qualification() {
  const name = getHostnamePart();
  const bearer_token = localStorage.getItem("token");

  const [data, setData] = useState([]);
  const [active, setActive] = useState(true);
  const [selectedData, setSelectedData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch all data
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
        `${protocal_url}${name}.${tenant_base_url}/Admin/qualification/getall`,
        config,
      );
      setData(response.data.data);
    } catch (error) {
      showErrorToast("Failed to fetch data. Please try again.");
    }
  }

  useEffect(() => {
    handleLead(); // Fetch the list on initial load
  }, []);

  // Delete qualification by ID
  const handleDelete = async (id) => {
    const bearer_token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      await axios.delete(
        `${protocal_url}${name}.${tenant_base_url}/Admin/qualification/delete/${id}`,
        config,
      );
      showSuccessToast("Deleted successfully");
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      showErrorToast(error.response.data.message);
    }
  };

  // Switch to edit form
  const handleEdit = (data) => {
    setSelectedData(data);
    setActive(false);
    setIsEditMode(true);
  };

  const handleAdd = () => {
    setSelectedData({
      id: "",
      userId: "",
      userName: "",
      qualification: "",
      workExpierence: "",
      skill: "",
      achievements: "",
    });
    setActive(false);
    setIsEditMode(false);
  };

  // Handle form submission callback
  const handleFormSubmit = async (formData) => {
    const bearer_token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${bearer_token}`,
      },
    };

    const formData_POST = {
      userId: formData.userId,
      userName: formData.userName,
      qualification: formData.qualification,
      workExpierence: formData.workExpierence,
      skill: formData.skill,
      achievements: formData.achievements,
    };

    const formData_PUT = {
      userId: formData.userId,
      userName: formData.userName,
      qualification: formData.qualification,
      workExpierence: formData.workExpierence,
      skill: formData.skill,
      achievements: formData.achievements,
    };

    if (!formData_POST.userName) {
      showErrorToast("Please select username");
      return;
    }
    if (!formData_POST.qualification) {
      showErrorToast("Please enter qualification");
      return;
    }
    if (!formData_POST.workExpierence) {
      showErrorToast("Please select work expierence");
      return;
    }
    if (!formData_POST.skill) {
      showErrorToast("Please enter skill");
      return;
    }
    if (!formData_POST.achievements) {
      showErrorToast("Please enter achievements");
      return;
    }

    try {
      if (isEditMode) {
        await axios.put(
          `${protocal_url}${name}.${tenant_base_url}/Admin/qualification/edit/${formData.id}`,
          formData_PUT,
          config,
        );
        showSuccessToast("Updated successfully");
      } else {
        await axios.post(
          `${protocal_url}${name}.${tenant_base_url}/Admin/qualification/add`,
          formData_POST,
          config,
        );
        showSuccessToast("Added successfully");
      }

      handleLead(); // Refresh the list
      setActive(true); // Switch back to the list view
      setSelectedData(null); // Reset the selected
      setIsEditMode(false); // Reset edit mode
    } catch (error) {
      showErrorToast(error.response.data.message);
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    setActive(true);
    setSelectedData(null);
    setIsEditMode(false);
  };

  // Form Component for Adding/Updating
  const EditForm = ({ data, isEditMode }) => {
    const [formData, setFormData] = useState({
      id: "",
      userId: "",
      userName: "",
      qualification: "",
      workExpierence: "",
      skill: "",
      achievements: "",
    });

    useEffect(() => {
      setFormData(
        data || {
          id: "",
          userId: "",
          userName: "",
          qualification: "",
          workExpierence: "",
          skill: "",
          achievements: "",
        },
      );
    }, [data]);

    // Handle form input changes
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault(); // Prevent default form submission
      handleFormSubmit(formData); // Call to submit the form data
    };

    //----------------------------------------------------------------------------------------
    //assigned_ToDropDown
    const [assigned_ToDropDown, setassigned_ToDropDown] = useState([]);

    async function handleAssigned_To() {
      const bearer_token = localStorage.getItem("token");

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${bearer_token}`,
          },
        };
        const response = await axios.get(
          `${protocal_url}${name}.${tenant_base_url}/Setting/Alluser`,
          config,
        );
        setassigned_ToDropDown(response.data);
        console.log("status:", response.data);
      } catch (error) {
        console.error("Error fetching leads:", error);
        // Optionally, set an error state to display a user-friendly message
      }
    }

    useEffect(() => {
      handleAssigned_To();
    }, []);

    const [defaultTextassigned_ToDropDown, setdefaultTextassigned_ToDropDown] =
      useState("Select User Name");
    const [isDropdownassigned_ToDropDown, setisDropdownassigned_ToDropDown] =
      useState(false);

    const toggleDropdownassigned_ToDropDown = () => {
      setisDropdownassigned_ToDropDown(!isDropdownassigned_ToDropDown);
    };

    const handleDropdownassigned_ToDropDown = (
      assigned_To_Username,
      userId,
    ) => {
      setdefaultTextassigned_ToDropDown(assigned_To_Username);
      setisDropdownassigned_ToDropDown(false);
      setFormData((prevTask) => ({
        ...prevTask,
        userName: assigned_To_Username,
        userId: userId,
      }));
    };

    return (
      <>
        <ToastContainer />
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-medium">
            {isEditMode ? "Edit Qualification" : "Add Qualification"}
          </h1>
          <button
            onClick={handleCancel}
            className="border border-blue-600 bg-white text-blue-600 px-4 py-1.5 rounded"
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex mt-3">
          <div className="w-full">
            <div className="bg-white rounded-xl shadow-md pb-6">
              <div className="">
                <h1 className="py-2 px-3 rounded-t-lg bg-cyan-500 text-white text-md font-medium">
                  Qualification Details
                </h1>
                <div className="bg-white px-1 rounded-b-xl">
                  <div className="grid gap-2 p-2">
                    {/* FIRST ROW */}
                    <div className="flex space-x-4">
                      {/* LEAD ID FIELD */}
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor="userId"
                          className="text-sm font-medium text-gray-700"
                        >
                          User Id
                        </label>
                        <input
                          type="number"
                          disabled
                          name="userId"
                          id="userId"
                          value={formData.userId}
                          className="mt-1 p-2 border border-gray-300 rounded-md"
                          placeholder="Enter User Id"
                        />
                      </div>
                      {/* CLIENT NAME FIELD */}
                      {isEditMode ? (
                        <div className="flex flex-col w-1/2">
                          <label
                            htmlFor="userName"
                            className="text-sm font-medium text-gray-700"
                          >
                            User Name
                          </label>
                          <input
                            type="text"
                            disabled
                            name="userName"
                            id="userName"
                            value={formData.userName}
                            className="mt-1 p-2 border border-gray-300 rounded-md"
                            onChange={handleChange}
                            placeholder="Enter your User Name"
                          />
                        </div>
                      ) : (
                        <>
                          {/* ASSIGNED TO DROPDOWN */}
                          <div className="flex flex-col w-1/2">
                            <div className="flex flex-col w-full relative">
                              <label
                                htmlFor="userName"
                                className="text-sm font-medium text-gray-700"
                              >
                                User Name
                              </label>
                              <div
                                className="relative"
                                onClick={toggleDropdownassigned_ToDropDown}
                                onMouseLeave={() =>
                                  setisDropdownassigned_ToDropDown(false)
                                }
                              >
                                <button
                                  className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                                  id="LeadStatusDropDown"
                                  type="button"
                                >
                                  {formData.userName === ""
                                    ? defaultTextassigned_ToDropDown
                                    : formData.userName}
                                  <FaAngleDown className="ml-2 text-gray-400" />
                                </button>
                                {isDropdownassigned_ToDropDown && (
                                  <div className="absolute w-full bg-white border border-gray-300 rounded-md top-11 z-10">
                                    <ul className="py-2 text-sm text-gray-700">
                                      {assigned_ToDropDown.map(
                                        ({ userName, userId }, index) => (
                                          <li
                                            key={index}
                                            onClick={() =>
                                              handleDropdownassigned_ToDropDown(
                                                userName,
                                                userId,
                                              )
                                            }
                                            className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                                          >
                                            {userName}
                                          </li>
                                        ),
                                      )}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    {/* SECOND ROW */}
                    <div className="flex space-x-4">
                      {/* Qualification FIELD */}
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor="qualification"
                          className="text-sm font-medium text-gray-700"
                        >
                          Qualification
                        </label>
                        <input
                          type="text"
                          name="qualification"
                          id="qualification"
                          value={formData.qualification}
                          className="mt-1 p-2 border border-gray-300 rounded-md"
                          onChange={handleChange}
                          placeholder="Enter Qualification"
                        />
                      </div>
                      {/* phoneNo FIELD */}
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor="workExpierence"
                          className="text-sm font-medium text-gray-700"
                        >
                          Work Experience
                        </label>
                        <input
                          type="number"
                          name="workExpierence"
                          id="workExpierence"
                          value={formData.workExpierence}
                          className="mt-1 p-2 border border-gray-300 rounded-md"
                          onChange={handleChange}
                          placeholder="Enter Work Experience"
                        />
                      </div>
                    </div>
                    {/* THIRD ROW */}
                    <div className="flex space-x-4">
                      {/* MOBILE NUMBER FIELD */}
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor="skill"
                          className="text-sm font-medium text-gray-700"
                        >
                          Skill
                        </label>
                        <input
                          type="text"
                          name="skill"
                          id="skill"
                          value={formData.skill}
                          className="mt-1 p-2 border border-gray-300 rounded-md"
                          onChange={handleChange}
                          placeholder="Enter Skill"
                        />
                      </div>
                      {/* EMAIL FIELD */}
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor="achievements"
                          className="text-sm font-medium text-gray-700"
                        >
                          Achievements
                        </label>
                        <input
                          type="text"
                          name="achievements"
                          id="achievements"
                          value={formData.achievements}
                          className="mt-1 p-2 border border-gray-300 rounded-md"
                          onChange={handleChange}
                          placeholder="Enter Achievements"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4 mb-8">
                <button
                  type="submit"
                  className="mt-4 hover:bg-cyan-500 border border-cyan-500 text-cyan-500 hover:text-white px-4 py-4 rounded-md"
                  // onClick={handleLog}
                >
                  {isEditMode ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  };

  return (
    <div className="m-3">
      {active ? (
        <>
          <div className="flex justify-between items-center flex-wrap gap-5">
            <h1 className="text-3xl font-medium">Qualifications</h1>
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white p-2 min-w-10 text-sm rounded"
            >
              Add Qualification
            </button>
          </div>
          <div className="overflow-x-auto mt-3 shadow-md leads_Table_Main_Container">
            <div className="min-w-full rounded-md leads_Table_Container">
              <table className="min-w-full bg-white rounded-md leads_Table">
                <thead>
                  <tr className="border-gray-300 border-b-2">
                    <th className="px-1 py-3">
                      <input type="checkbox" />
                    </th>
                    <th className=" py-3 text-left font-medium">
                      <div className="flex justify-between items-center text-sm">
                        <span>User Name</span>
                        <FaBars />
                      </div>
                    </th>
                    <th className="px-2 py-3 text-left font-medium">
                      <div className="flex justify-between items-center text-sm">
                        <span>Qualification</span>
                        <FaBars />
                      </div>
                    </th>
                    <th className="px-2 py-3 text-left font-medium">
                      <div className="flex justify-between items-center text-sm">
                        <span>work Experience</span>
                        <FaBars />
                      </div>
                    </th>
                    <th className="px-2 py-3 text-left font-medium">
                      <div className="flex justify-between items-center text-sm">
                        <span>Skills</span>
                        <FaBars />
                      </div>
                    </th>
                    <th className="px-2 py-3 text-left font-medium">
                      <div className="flex justify-between items-center text-sm">
                        <span>Achievements</span>
                        <FaBars />
                      </div>
                    </th>
                    <th className="px-2 py-3 text-left font-medium">
                      <div className="flex justify-between items-center text-sm">
                        <span>Action</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr
                      key={item.id}
                      className="cursor-pointer hover:bg-gray-200 border-gray-300 border-b"
                    >
                      <td className="px-1 py-3 text-center">
                        <input type="checkbox" />
                      </td>
                      <td className="px-2 py-3 text-sm">{item.userName}</td>
                      <td className="px-2 py-3 text-sm">
                        {item.qualification}
                      </td>
                      <td className="px-2 py-3 text-sm">
                        {item.workExpierence}
                      </td>
                      <td className="px-2 py-3 text-sm">{item.skill}</td>
                      <td className="px-2 py-3 text-sm">{item.achievements}</td>
                      <td className="px-2 py-4 flex gap-3 justify-center">
                        <MdEdit
                          size={25}
                          className="bg-blue-500 rounded text-white"
                          onClick={() => handleEdit(item)}
                        />
                        <RiDeleteBin6Fill
                          size={25}
                          color="red"
                          onClick={() => handleDelete(item.id)}
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
  );
}
