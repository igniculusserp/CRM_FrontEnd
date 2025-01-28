import { useState, useEffect } from "react";
import { FaAngleDown, FaBars } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import axios from "axios";
import { tenant_base_url, protocal_url } from "./../../../../../Config/config";

export default function CallingExtension() {
  const { id } = useParams();
  const [active, setActive] = useState(true);
  const [users, setUsers] = useState([
    {
      id: "1",
      callingName: "Vibrant Call",
      callingType: "Direct Call",
    },
    {
      id: "2",
      callingName: "Vibrant Call",
      callingType: "Direct Call",
    },
  ]);

  const [formData, setFormData] = useState({
    id: "",
    callingName: "",
    callingType: "",
  });

  const [editLead, setEditLead] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Calling Type Dropdown
  const [callingTypes, setCallingTypes] = useState([]);
  const [defaultTextCallingTypeDropDown, setDefaultTextCallingTypeDropDown] =
    useState("Select Calling Type");
  const [isDropdownVisibleCallingType, setIsDropdownVisibleCallingType] =
    useState(false);

  const handleActiveState = () => {
    setActive(!active);
    setIsEditMode(false); // Reset edit mode when switching views
    setFormData({
      id: "",
      callingName: "",
      callingType: "",
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
    if (!formData.callingName || !formData.callingType) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    if (isEditMode) {
      console.log("Edit Calling Extension:", formData);
      // Add logic to submit the edited data
    } else {
      console.log("Add Calling Extension:", formData);
      setActive(true); // Switch to list view after adding
      // Add logic to add a new user
    }
  };

  const handleCheckboxClick = (e, userId) => {
    e.stopPropagation();
    console.log(`Checkbox clicked for user: ${userId}`);
  };

  // Calling Type Dropdown
  const toggleDropdownCallingType = () => {
    setIsDropdownVisibleCallingType(!isDropdownVisibleCallingType);
  };

  const handleDropdownCallingType = (callingType) => {
    setFormData((prevData) => ({
      ...prevData,
      callingType,
    }));
    setDefaultTextCallingTypeDropDown(callingType);
    setIsDropdownVisibleCallingType(false);
  };

  async function fetchCallingTypes() {
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
        }.${tenant_base_url}/Admin/callingtypes/getall`,
        config,
      );
      setCallingTypes(response.data.data);
      console.log("Calling Types:", response.data.data);
    } catch (error) {
      console.error("Error fetching calling types:", error);
    }
  }

  useEffect(() => {
    fetchCallingTypes();
  }, []);

  return (
    <>
      <div className="m-3 min-w-screen">
        {active ? (
          <>
            <div className="flex min-w-screen justify-between items-center flex-wrap gap-5">
              <h1 className="text-3xl font-medium">Calling Extension</h1>
              <button
                onClick={handleActiveState}
                className="bg-blue-600 text-white p-2 min-w-10 text-sm rounded"
              >
                Add Calling Extension
              </button>
            </div>
            <div className="overflow-x-auto mt-3 shadow-md leads_Table_Main_Container">
              <div className="min-w-full rounded-md leads_Table_Container">
                <table className="min-w-full bg-white leads_Table">
                  <thead>
                    <tr className="border-gray-300 border-b-2">
                      <th className="px-1 py-3">
                        <input type="checkbox" />
                      </th>
                      <th className="px-2 py-3 text-left border-r font-medium">
                        <div className="flex justify-between items-center text-sm">
                          <span>Calling Name</span>
                          <FaBars />
                        </div>
                      </th>
                      <th className="px-2 py-3 text-left border-r font-medium">
                        <div className="flex justify-between items-center text-sm">
                          <span>Calling Type</span>
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
                          {user.callingName}
                        </td>
                        <td className="px-2 py-4 text-sm max-w-24 break-words">
                          {user.callingType}
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
                {isEditMode
                  ? "Edit Calling Extension"
                  : "Add Calling Extension"}
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
                    Calling Extension Form
                  </h2>
                  <div className="py-2 px-3 grid gap-2">
                    {/* Calling Name */}
                    <div className="flex space-x-4">
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor="callingName"
                          className="text-sm font-medium text-gray-700"
                        >
                          Calling Name
                        </label>
                        <input
                          type="text"
                          name="callingName"
                          value={formData.callingName}
                          onChange={handleChange}
                          className="p-2 border border-gray-300 rounded-md"
                          placeholder="Enter Calling Name"
                        />
                      </div>

                      {/* Calling Type Dropdown */}
                      <div className="flex flex-col w-1/2 relative">
                        <label
                          htmlFor="callingType"
                          className="text-sm font-medium text-gray-700"
                        >
                          Calling Type
                        </label>
                        <div
                          className="relative"
                          onClick={toggleDropdownCallingType}
                          onMouseLeave={() =>
                            setIsDropdownVisibleCallingType(false)
                          }
                        >
                          <div className="p-2 border border-gray-300 rounded-md flex justify-between items-center cursor-pointer">
                            {defaultTextCallingTypeDropDown}
                            <FaAngleDown />
                          </div>
                          {isDropdownVisibleCallingType && (
                            <div className="absolute z-10 mt-2 w-full bg-white shadow-lg border border-gray-200 rounded-md">
                              {callingTypes.map((callingType, index) => (
                                <div
                                  key={index}
                                  className="p-2 hover:bg-gray-100 cursor-pointer"
                                  onClick={() =>
                                    handleDropdownCallingType(callingType)
                                  }
                                >
                                  {callingType}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* -------------Button------------- */}

                    <div className="mb-8">
                      <button
                        type="submit"
                        className="mt-4 hover:bg-cyan-500 border border-cyan-500 text-cyan-500 hover:text-white px-4 py-4 rounded-md"
                      >
                        {isEditMode ? "Edit Extension" : "Add Extension"}
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
