import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { tenant_base_url, protocal_url } from "./../../../../../Config/config";
import { getHostnamePart } from "../../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";
import { FaAngleDown } from "react-icons/fa";

const LeadAssignModal = ({ onClose }) => {
  const bearer_token = localStorage.getItem("token");
  const name = getHostnamePart();

  const [loading, setLoading] = useState(false);
  const [leadCount, setLeadCount] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "leadCount") {
      setLeadCount(value);
    } else if (name === "assignedTo") {
      setAssignedTo(value);
    }
  };

//   --------------------------------------------------SUBMIT-----------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!bearer_token) {
      alert("No token found, please log in again.");
      return;
    }

    setLoading(true);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
          "Content-Type": "application/json",
        },
      };

      const formData_POST = {
        leadCount: leadCount,
        assignedTo: assignedTo,
      };

      await axios.post(
        `${protocal_url}${name}.${tenant_base_url}/LeadOpration/leads/multipleAssign`,
        formData_POST,
        config
      );

      alert("Assign Leads successfully!");
      onClose();
    // window.location.reload();
    } catch (error) {
      console.error("Error response:", error.response);
    } finally {
      setLoading(false);
    }
  };

  

  // ------------------------------------Assigned To Dropdown -----------------------------------

  const [assigned_ToDropDown, setassigned_ToDropDown] = useState([]);
  const [defaultTextassigned_ToDropDown, setdefaultTextassigned_ToDropDown] =
    useState("Select Assigned");
  const [isDropdownassigned_ToDropDown, setisDropdownassigned_ToDropDown] =
    useState(false);

  const handleAssigned_To = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Setting/Alluser`,
        config
      );
      setassigned_ToDropDown(response.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
      alert("Failed to fetch user data. Please try again.");
    }
  };

  useEffect(() => {
    handleAssigned_To();
  }, []);

  const toggleDropdownassigned_ToDropDown = () => {
    setisDropdownassigned_ToDropDown(!isDropdownassigned_ToDropDown);
  };

  const handleDropdownassigned_ToDropDown = (assigned_To_Username) => {
    setdefaultTextassigned_ToDropDown(assigned_To_Username);
    setisDropdownassigned_ToDropDown(!isDropdownassigned_ToDropDown);
    setAssignedTo(assigned_To_Username); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">Assign Multiple Leads</h2>
        <form onSubmit={handleSubmit}>
          <div className=" shadow-lg">
            <h1 className="py-2 px-1 rounded-t-lg bg-cyan-500 text-white text-md font-medium">
              Details
            </h1>
            <div className="bg-white px-1 rounded-b-xl">
              <div className="grid gap-2 p-2">
                <div className="flex space-x-4">
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="leadCount"
                      className="text-sm font-medium text-gray-700"
                    >
                      Lead Count:
                    </label>
                    <input
                      type="number"
                      name="leadCount"
                      id="leadCount"
                      value={leadCount}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="flex flex-col w-full">
                    <div className="flex flex-col w-1/1 relative">
                      <label
                        htmlFor="assignedTo"
                        className="text-sm font-medium text-gray-700"
                      >
                        Assigned to
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
                          {assignedTo === ""
                            ? defaultTextassigned_ToDropDown
                            : assignedTo}
                          <FaAngleDown className="ml-2 text-gray-400" />
                        </button>
                        {isDropdownassigned_ToDropDown && (
                          <div className="absolute w-full bg-white border border-gray-300 rounded-md top-11 z-10">
                            <ul className="py-2 text-sm text-gray-700">
                              {assigned_ToDropDown.map(
                                ({ key, userName, role }) => (
                                  <li
                                    key={key}
                                    onClick={() =>
                                      handleDropdownassigned_ToDropDown(
                                        userName
                                      )
                                    }
                                    className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                                  >
                                    {userName}-({role})
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4 gap-5">
            <button
              type="submit"
              className={`shadow-md px-12 py-1 mb-2 bg-cyan-500 text-white border-2 border-cyan-500 rounded hover:text-cyan-500 hover:bg-white ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Sending..." : "Submit"}
            </button>
            <button
              type="button"
              className="shadow-md px-12 py-1 bg-gray-300 text-black rounded hover:bg-gray-400 mb-2  border-2 "
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

LeadAssignModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default LeadAssignModal;
