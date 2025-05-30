import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import axios from "axios";
import { tenant_base_url, protocal_url } from "./../../../../../Config/config";
import { getHostnamePart } from "../../ReusableComponents/GlobalHostUrl";

import Breadcrumb from "../Breadcrumb/Breadcrumb";


import { ToastContainer } from "react-toastify";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../../utils/toastNotifications";

export default function EmailTemplate() {
  const name = getHostnamePart();
  const bearer_token = localStorage.getItem("token");

  const pathnames = location.pathname.split("/").filter((x) => x);

  const [data, setData] = useState([]);
  const [active, setActive] = useState(true);
  const [selectedData, setSelectedData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

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
        `${protocal_url}${name}.${tenant_base_url}/Admin/emailtemplates/getall`,
        config,
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  }

  useEffect(() => {
    handleLead(); // Fetch the  list on initial load
  }, []);

  // Delete  by ID
  const handleDelete = async (id) => {
    const bearer_token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      await axios.delete(
        `${protocal_url}${name}.${tenant_base_url}/Admin/emailtemplates/delete/${id}`,
        config,
      );
      showSuccessToast("Data deleted Successfully");
      setData((prevData) => prevData.filter((item) => item.id !== id));
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
    setSelectedData({ templateDescription: "" });
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

    try {
      if (isEditMode) {
        if (!formData.templateDescription) {
          showErrorToast("Please enter details");
          return;
        }
        await axios.put(
          `${protocal_url}${name}.${tenant_base_url}/Admin/emailtemplates/edit/${formData.id}`,
          formData,
          config,
        );
        showSuccessToast("Data updated successfully");
      } else {
        if (!formData.templateDescription) {
          showErrorToast("Please enter details");
          return;
        }
        await axios.post(
          `${protocal_url}${name}.${tenant_base_url}/Admin/emailtemplates/add`,
          formData,
          config,
        );
        showSuccessToast("Lead status Added successfully");
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
      id: "",
      templateDescription: "",
    });

    useEffect(() => {
      setFormData(data || { id: "", templateDescription: "" });
    }, [data]);

    // Handle form input changes
    const handleChange = (e) => {
      setFormData({
        ...formData,
        templateDescription: e.target.value,
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      handleFormSubmit(formData);
    };

    return (
      <>
        <ToastContainer />
        <div className="flex items-center justify-between min-w-screen">
          <h1 className="text-3xl font-medium">
            {isEditMode ? "Edit" : "Add"}
          </h1>
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-sm text-blue-600 bg-white border border-blue-600 rounded min-w-10"
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex">
          <div className="w-full">
            <div className="flex-grow mt-3 bg-white shadow-md rounded-xl">
              <h2 className="px-4 py-2 font-medium text-white rounded-t-xl bg-cyan-500">
                Email Template
              </h2>
              <div className="relative min-h-screen px-4 py-2">
                <div className="flex space-x-4">
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="templateDescription"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email Template
                    </label>
                    <input
                      type="text"
                      name="templateDescription"
                      value={formData.templateDescription || ""}
                      onChange={handleChange}
                      className="p-2 mt-1 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="absolute top-[200px] mt-4 rounded-md border border-cyan-500 px-4 py-4 text-cyan-500 hover:bg-cyan-500 hover:text-white"
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
    <>
      <ToastContainer />
      <div className="m-3 min-w-screen">
        {active ? (
          <>
            <div className="flex flex-wrap items-center justify-between gap-5 min-w-screen">
              <h1 className="text-3xl font-medium">Email Template</h1>
              <button
                onClick={handleAdd}
                className="p-2 text-sm text-white bg-blue-600 rounded min-w-10"
              >
                Add Email Template
              </button>
            </div>

              {/*---------------------------------------------------------------- BreadCrumb PROP  ----------------------------------------------------------------*/}
            <Breadcrumb pathnames={pathnames} />
            
            <div className="mt-3 overflow-x-auto shadow-md leads_Table_Main_Container">
              <div className="min-w-full rounded-md leads_Table_Container">
                <table className="min-w-full bg-white leads_Table">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="px-1 py-3">
                        <input type="checkbox" />
                      </th>
                      <th className="px-2 py-3 font-medium text-left border-r">
                        <div className="flex items-center justify-between text-sm">
                          <span>Email Template</span>
                          <FaBars />
                        </div>
                      </th>
                      <th className="px-2 py-3 font-medium text-left border-r">
                        <div className="flex items-center justify-between text-sm">
                          <span>Action</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((data) => (
                      <tr
                        key={data.id}
                        className="border-b border-gray-300 cursor-pointer hover:bg-gray-200"
                      >
                        <td className="px-1 py-3 text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="px-2 py-4 text-sm break-words max-w-24">
                          {data.templateDescription}
                        </td>
                        <td className="flex justify-center gap-3 px-2 py-4">
                          <MdEdit
                            size={25}
                            color="white"
                            className="bg-blue-500 rounded"
                            onClick={() => handleEdit(data)}
                          />
                          <RiDeleteBin6Fill
                            size={25}
                            color="red"
                            onClick={() => handleDelete(data.id)}
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
