import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import axios from "axios";
import Switch from "react-switch"; // Import react-switch
import { tenant_base_url, protocal_url } from "./../../../../../Config/config";

export default function BranchTarget() {
  const { id } = useParams();
  const [active, setActive] = useState(true);
  const [users, setUsers] = useState([
    {
      id: "1",
      jaisonDocument: "Verify your Account",
      popup: true, // Use true/false for toggle state
    },
    {
      id: "2",
      jaisonDocument: "Verify your Account",
      popup: false, // Another user with toggle off
    },
  ]);

  const [formData, setFormData] = useState({
    id: "",
    jaisonDocument: "",
    popup: false, // Default to false for the toggle
  });

  const [isEditMode, setIsEditMode] = useState(false);

  const handleActiveState = () => {
    setActive(!active);
    setIsEditMode(false); // Reset edit mode when switching views
    setFormData({
      id: "",
      jaisonDocument: "",
      popup: false, // Reset popup to false (disabled)
    });
  };

  const handleClick = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);
    if (userToEdit) {
      setFormData({
        ...userToEdit,
        popup: userToEdit.popup, // Set initial popup state as boolean
      });
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

  const handleToggle = (checked) => {
    setFormData((prevData) => ({
      ...prevData,
      popup: checked, // Update popup state based on toggle (checked = true/false)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.jaisonDocument) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const submittedData = {
      ...formData,
      popup: formData.popup ? "enabled" : "disabled", // Convert boolean to string for submission
    };

    if (isEditMode) {
      console.log("Edit User:", submittedData);
      // Add logic to submit the edited user data
    } else {
      console.log("Add User:", submittedData);
      setActive(true); // Switch back to view mode
      // Add logic to add a new user
    }
  };

  useEffect(() => {
    // handleGroup fetch logic
  }, []);

  return (
    <>
      <div className="m-3 min-w-screen">
        {active ? (
          <>
            <div className="flex min-w-screen justify-between items-center">
              <h1 className="text-3xl font-medium">NotificationPopup</h1>
              <button
                onClick={handleActiveState}
                className="bg-blue-600 text-white p-2 min-w-10 text-sm rounded"
              >
                Add NotificationPopup
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
                          <span>Jaison Document</span>
                          <FaBars />
                        </div>
                      </th>
                      <th className="px-2 py-3 text-left border-r font-medium">
                        <div className="flex justify-between items-center text-sm">
                          <span>Popup</span>
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
                            onClick={(e) => console.log(`Checkbox clicked for user: ${user.id}`)}
                          />
                        </td>
                        <td className="px-2 py-4 text-sm max-w-24 break-words">
                          {user.jaisonDocument}
                        </td>
                        <td className="px-2 py-4 text-sm max-w-24 break-words">
                          <Switch
                            checked={user.popup}
                            onChange={() => console.log(`Toggle changed for user: ${user.id}`)}
                            height={20}
                            width={48}
                            onColor="#86d3ff"
                            onHandleColor="#2693e6"
                            handleDiameter={30}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            className="react-switch"
                          />
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
                {isEditMode ? "Edit Branch Target" : "Add Branch Target"}
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
                    Branch Target
                  </h2>
                  <div className="py-2 px-4 min-h-screen relative">
                    <div className="flex space-x-4">
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor="jaisonDocument"
                          className="text-sm font-medium text-gray-700"
                        >
                          Jaison Document
                        </label>
                        <input
                          type="text"
                          name="jaisonDocument"
                          value={formData.jaisonDocument}
                          onChange={handleChange}
                          className="mt-1 p-2 border border-gray-300 rounded-md"
                          placeholder="Enter Jaison Document"
                        />
                      </div>

                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor="popup"
                          className="text-sm font-medium text-gray-700"
                        >
                          Popup
                        </label>
                        <Switch
                          checked={formData.popup}
                          onChange={handleToggle}
                          height={20}
                          width={48}
                          onColor="#86d3ff"
                          onHandleColor="#2693e6"
                          handleDiameter={30}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          className="react-switch"
                        />
                        <span className="text-sm">
                          {formData.popup ? "Enabled" : "Disabled"}
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="mt-4 hover:bg-cyan-500 border border-cyan-500 text-cyan-500 hover:text-white px-4 py-4 rounded-md absolute  top-[300px]"
                    >
                      {isEditMode ? "Edit Plan" : "Add Plan"}
                    </button>
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
