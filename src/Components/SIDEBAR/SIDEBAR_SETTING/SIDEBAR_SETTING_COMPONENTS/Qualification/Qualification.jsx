import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import axios from "axios";
import { tenant_base_url, protocal_url } from "./../../../../../Config/config";

export default function Qualification() {
  const [data, setData] = useState([]);
  const [active, setActive] = useState(true);
  const [selectedData, setSelectedData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const fullURL = window.location.href;
  const url = new URL(fullURL);
  const name = url.hostname.split(".")[0];

  // Fetch all data
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
        config
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching qualifications:", error);
      alert("Failed to fetch data. Please try again.");
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
        config
      );
      setData((prevData) => prevData.filter((item) => item.id !== id));
      alert("Deleted successfully");
    } catch (error) {
      console.error("Error deleting qualification:", error);
      alert("Failed to delete. Please try again.");
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

    try {
      if (isEditMode) {
        await axios.put(
          `${protocal_url}${name}.${tenant_base_url}/Admin/qualification/edit/${formData.id}`,
          { 
            userId: formData.userId,
            userName: formData.userName,
            qualification: formData.qualification,
            workExpierence:formData.workExpierence,
            skill: formData.skill,
            achievements:formData.achievements,
           },
          config
        );
        alert("Updated successfully");
      } else {
        await axios.post(
          `${protocal_url}${name}.${tenant_base_url}/Admin/qualification/add`,
          {       
            userId: formData.userId,
            userName: formData.userName,
            qualification: formData.qualification,
            workExpierence:formData.workExpierence,
            skill: formData.skill,
            achievements:formData.achievements,
          },
          config
        );
        alert("Added successfully");
      }

      handleLead(); // Refresh the list
      setActive(true); // Switch back to the list view
      setSelectedData(null); // Reset the selected
      setIsEditMode(false); // Reset edit mode
    } catch (error) {
      console.error("Error saving qualification:", error);
      alert("Failed to save. Please try again.");
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
      achievements: "",});

    useEffect(() => {
      setFormData(data || { 
        id: "",
        userId: "",
        userName: "",
        qualification: "",
        workExpierence: "",
        skill: "",
        achievements: "",});
    }, [data]);

    // Handle form input changes
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      handleFormSubmit(formData);
    };

    return (
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-medium">
            {isEditMode ? "Edit Qualification" : "Add Qualification"}
          </h1>
          <button
            onClick={handleCancel}
            className="border border-blue-600 bg-white text-blue-600 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex mt-3">
          <div className="w-full">
            <div className="bg-white rounded-xl shadow-md p-6">
              {/* <label
                htmlFor="qualificationName"
                className="text-sm font-medium text-gray-700"
              >
                Qualification Name
              </label>
              <input
                type="text"
                name="qualificationName"
                value={formData.userName || ""}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              /> */}

              <div className="m-3 shadow-lg">
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
                          name="userId"
                          id="userId"
                          value={formData.userId}
                          className="mt-1 p-2 border border-gray-300 rounded-md"
                          onChange={handleChange}
                          placeholder="Enter User Id"
                        />
                      </div>
                      {/* CLIENT NAME FIELD */}
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor="userName"
                          className="text-sm font-medium text-gray-700"
                        >
                          User Name
                        </label>
                        <input
                          type="text"
                          name="userName"
                          id="userName"
                          value={formData.userName}
                          className="mt-1 p-2 border border-gray-300 rounded-md"
                          onChange={handleChange}
                          placeholder="Enter your User Name"
                        />
                      </div>
                    </div>
                    {/* SECOND ROW */}
                    <div className="flex space-x-4">
                      {/* LANGUAGE FIELD */}
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

              <button
                type="submit"
                className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md"
              >
                {isEditMode ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="m-3">
      {active ? (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-medium">Qualifications</h1>
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white p-2 rounded"
            >
              Add Qualification
            </button>
          </div>
          <div className="overflow-x-auto mt-3">
            <table className="min-w-full bg-white rounded-md">
              <thead>
                <tr className="border-b-2">
                  <th className="px-2 py-3 text-left font-medium">Select</th>
                  <th className="px-2 py-3 text-left font-medium">
                    <div className="flex justify-between items-center">
                      <span>User Name</span>
                      <FaBars />
                    </div>
                  </th>
                  <th className="px-2 py-3 text-left font-medium">
                    <div className="flex justify-between items-center">
                      <span>Qualification</span>
                      <FaBars />
                    </div>
                  </th>
                  <th className="px-2 py-3 text-left font-medium">
                    <div className="flex justify-between items-center">
                      <span>work Experience</span>
                      <FaBars />
                    </div>
                  </th>
                  <th className="px-2 py-3 text-left font-medium">
                    <div className="flex justify-between items-center">
                      <span>Skills</span>
                      <FaBars />
                    </div>
                  </th>
                  <th className="px-2 py-3 text-left font-medium">
                    <div className="flex justify-between items-center">
                      <span>Achievements</span>
                      <FaBars />
                    </div>
                  </th>
                  <th className="px-2 py-3 text-left font-medium">
                    <div className="flex justify-between items-center">
                      <span>Action</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-200 border-b">
                    <td className="px-2 py-3">
                      <input type="checkbox" />
                    </td>
                    <td className="px-2 py-3">{item.userName}</td>
                    <td className="px-2 py-3">{item.qualification}</td>
                    <td className="px-2 py-3">{item.workExpierence}</td>
                    <td className="px-2 py-3">{item.skill}</td>
                    <td className="px-2 py-3">{item.achievements}</td>
                    <td className="px-2 py-3 flex gap-2">
                      <MdEdit
                        size={20}
                        className="cursor-pointer text-blue-500"
                        onClick={() => handleEdit(item)}
                      />
                      <RiDeleteBin6Fill
                        size={20}
                        className="cursor-pointer text-red-500"
                        onClick={() => handleDelete(item.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <EditForm data={selectedData} isEditMode={isEditMode} />
      )}
    </div>
  );
}
