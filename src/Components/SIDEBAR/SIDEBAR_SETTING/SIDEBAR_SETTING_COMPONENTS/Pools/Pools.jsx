import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import axios from "axios";
import { tenant_base_url, protocal_url } from "./../../../../../Config/config";

export default function Pools() {
  const [data, setData] = useState([]);
  const [active, setActive] = useState(true);
  const [selectedPool, setSelectedPool] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const fullURL = window.location.href;
  const url = new URL(fullURL);
  const name = url.hostname.split(".")[0];

  // Fetch all pool data
  async function handleLead() {
    const bearer_token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Admin/pool/getall`,
        config
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  }

  useEffect(() => {
    handleLead(); // Fetch the pools list on initial load
  }, []);

  // Delete pool by ID
  const handleDelete = async (id) => {
    const bearer_token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      await axios.delete(
        `${protocal_url}${name}.${tenant_base_url}/Admin/pool/delete/${id}`,
        config
      );
      setData((prevData) => prevData.filter((item) => item.id !== id));
      alert("Pool deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to delete pool. Please try again.");
    }
  };

  // Handle switching to the form for adding or editing
  const handleEdit = (pool) => {
    setSelectedPool(pool);
    setActive(false);
    setIsEditMode(true);
  };

  const handleAdd = () => {
    setSelectedPool({ id: "", poolName: "" });
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
          `${protocal_url}${name}.${tenant_base_url}/Admin/pool/edit/${formData.id}`,
          { poolName: formData.poolName },
          config
        );
        alert("Pool updated successfully");
      } else {
        await axios.post(
          `${protocal_url}${name}.${tenant_base_url}/Admin/pool/add`,
          { poolName: formData.poolName },
          config
        );
        alert("Pool added successfully");
      }

      handleLead(); // Refresh the list of pools
      setActive(true); // Switch back to the list view
      setSelectedPool(null); // Reset the selected pool
      setIsEditMode(false); // Reset edit mode
    } catch (error) {
      console.error("Error saving pool name", error);
      alert("Failed to save pool. Please try again.");
    }
  };

  // Handle cancel form action
  const handleCancel = () => {
    setActive(true);
    setSelectedPool(null);
    setIsEditMode(false);
  };

  // Form Component for Adding/Updating Pools
  const PoolForm = ({ pool, isEditMode }) => {
    const [formData, setFormData] = useState({ id: "", poolName: "" });

    useEffect(() => {
      setFormData(pool || { id: "", poolName: "" });
    }, [pool]);

    // Handle form input changes
    const handleChange = (e) => {
      setFormData({
        ...formData,
        poolName: e.target.value,
      });
    };


    const [errors, setErrors] = useState({})

    const handleSubmit = (e) => {
      e.preventDefault();

      const errors = {};

    if (
      !formData.poolName ||
      formData.poolName.trim() === ''
    ) {
      errors.poolName = 'Pool name is required';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }


      handleFormSubmit(formData);
    };

    return (
      <div>
        <div className="flex min-w-screen justify-between items-center">
          <h1 className="text-3xl font-medium">
            {isEditMode ? "Edit Pool" : "Add Pool"}
          </h1>
          <button
            onClick={handleCancel}
            className="border border-blue-600 bg-white text-blue-600 px-4 py-2 min-w-10 text-sm rounded"
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex">
          <div className="w-full">
            <div className="mt-3 bg-white rounded-xl shadow-md flex-grow">
              <h2 className="font-medium py-2 px-4 rounded-t-xl text-white bg-cyan-500">
                Pool Information
              </h2>
              <div className="py-2 px-4 min-h-screen relative">
                <div className="flex space-x-4">
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="poolName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Pool Name
                    </label>
                    <input
                      type="text"
                      name="poolName"
                      value={formData.poolName || ""}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                    />
                    {errors.poolName && (
                      <span style={{ color: 'red' }}>
                        {errors.poolName}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-4 hover:bg-cyan-500 border border-cyan-500 text-cyan-500 hover:text-white px-4 py-4 rounded-md absolute top-[200px]"
                >
                  {isEditMode ? "Update Pool" : "Save Pool"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="m-3 min-w-screen">
      {active ? (
        <>
          <div className="flex min-w-screen justify-between items-center">
            <h1 className="text-3xl font-medium">Pools</h1>
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white p-2 min-w-10 text-sm rounded"
            >
              Add Pool
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
                        <span>Pools Name</span>
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
                  {data.map((pool) => (
                    <tr
                      key={pool.id}
                      className="cursor-pointer hover:bg-gray-200 border-gray-300 border-b"
                    >
                      <td className="px-1 py-3 text-center">
                        <input type="checkbox" />
                      </td>
                      <td className="px-2 py-4 text-sm max-w-24 break-words">
                        {pool.poolName}
                      </td>
                      <td className="px-2 py-4 flex gap-3 justify-center">
                        <MdEdit
                          size={25}
                          color="white"
                          className="bg-blue-500 rounded"
                          onClick={() => handleEdit(pool)}
                        />
                        <RiDeleteBin6Fill
                          size={25}
                          color="red"
                          onClick={() => handleDelete(pool.id)}
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
        <PoolForm pool={selectedPool} isEditMode={isEditMode} />
      )}
    </div>
  );
}
