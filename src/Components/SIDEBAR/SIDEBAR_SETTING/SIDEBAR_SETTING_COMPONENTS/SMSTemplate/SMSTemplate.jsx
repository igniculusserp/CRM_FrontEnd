import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import axios from "axios";
import { tenant_base_url, protocal_url } from "./../../../../../Config/config";

export default function SMSTemplate() {

  const [data, setData] = useState([]);
  const [active, setActive] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false); // Default to add mode
  const [addSegment, setAddSegment] = useState({ id: "", segment: "" });
  const { id } = useParams(); 

  const fullURL = window.location.href;
  const url = new URL(fullURL);
  const name = url.hostname.split(".")[0]; 

  // Fetch all segments
  async function handleLead() {
    const bearer_token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Admin/segment/getall`,
        config
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching segments:", error);
    }
  }

  useEffect(() => {
    handleLead(); 
  }, []); 

  // Delete segment
  const handleClick = async (id) => {
    const bearer_token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      await axios.delete(
        `${protocal_url}${name}.${tenant_base_url}/Admin/segment/delete/${id}`,
        config
      );
      setData((prevData) => prevData.filter((item) => item.id !== id));
      alert("Segment deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to delete segment. Please try again.");
    }
  };

  // Fetch segment by ID
  const fetchLeadById = async (id) => {
    const bearer_token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Admin/segment/get/${id}`,
        config
      );
      const data = response.data.data;
      setAddSegment({
        id: data.id,
        segment: data.segment,
      });
      setIsEditMode(true); // Switch to edit mode
    } catch (error) {
      console.error("There was an error fetching!", error);
      alert("Failed to fetch. Please try again.");
    }
  };

  // Manage the toggle between adding and editing
  const handleActiveState = () => {
    setActive(!active);
    if (active) {
      setIsEditMode(false); // When switching to add mode, reset isEditMode
      setAddSegment({ id: "", segment: "" }); // Clear form for adding
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    setAddSegment({
      ...addSegment,
      segment: e.target.value,
    });
  };

  // Handle form submission (either add or edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const bearer_token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${bearer_token}`,
      },
    };

    try {
      if (isEditMode) {
        // Update segment
        await axios.put(
          `${protocal_url}${name}.${tenant_base_url}/Admin/segment/edit/${addSegment.id}`,
          { segment: addSegment.segment },
          config
        );
        alert("Segment updated successfully");
      } else {
        // Add new segment
        await axios.post(
          `${protocal_url}${name}.${tenant_base_url}/Admin/segment/add`,
          { segment: addSegment.segment },
          config
        );
        alert("Segment added successfully");
      }

      handleLead(); // Refresh the list
      handleActiveState(); // Toggle back to list view

    } catch (error) {
      console.error("Error saving segment", error);
      alert("Failed to save segment. Please try again.");
    }
  };

  return (
    <div className="m-3 min-w-screen">
      {active ? (
        <>
          <div className="flex min-w-screen justify-between items-center">
            <h1 className="text-3xl font-medium">SMS Template</h1>
            <button
              onClick={handleActiveState}
              className="bg-blue-600 text-white p-2 min-w-10 text-sm rounded"
            >
            Add SMS Template
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
                        <span>SMS Template Name</span>
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
                  {data.map((user) => (
                    <tr
                      key={user.id}
                      className="cursor-pointer hover:bg-gray-200 border-gray-300 border-b"
                    >
                      <td className="px-1 py-3 text-center">
                        <input type="checkbox" />
                      </td>
                      <td className="px-2 py-4 text-sm max-w-24 break-words">
                        {user.segment}
                      </td>
                      <td className="px-2 py-4 flex gap-3 justify-center">
                        <MdEdit
                          size={25}
                          color="white"
                          className="bg-blue-500 rounded"
                          onClick={() => {
                            fetchLeadById(user.id); 
                            setActive(false); // Switch to form view when editing
                          }}
                        />
                        <RiDeleteBin6Fill
                          size={25}
                          color="red"
                          onClick={() => handleClick(user.id)}
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
        <>
          <div className="flex min-w-screen justify-between items-center">
            <h1 className="text-3xl font-medium">
              {isEditMode ? "Edit SMS Template" : "Add SMS Template"}
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
                SMS Template
                </h2>
                <div className="py-2 px-4 min-h-screen relative">
                  <div className="flex space-x-4">
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="segment"
                        className="text-sm font-medium text-gray-700"
                      >
                        {isEditMode ? "Edit SMS Template Name" : "SMS Template Name"}
                      </label>
                      <input
                        type="text"
                        name="segment"
                        value={addSegment.segment || ""}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-4 hover:bg-cyan-500 border border-cyan-500 text-cyan-500 hover:text-white px-4 py-4 rounded-md absolute  top-[200px]"
                  >
                    {isEditMode ? "Update" : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
