import { useState } from "react";
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
  const [leadeStatus, setLeadeStatus] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const defaultTextassigned_ToDropDown = "Select Lead Status";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "leadCount") {
      setLeadCount(value);
    }
  };

  // Dropdown toggle function
  const toggleDropdownassigned_ToDropDown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Handle dropdown selection
  const handleDropdownassigned_ToDropDown = (status) => {
    setLeadeStatus(status);
    setIsDropdownOpen(false);
  };

  // Submit function
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
        leadeStatus: leadeStatus,
      };

      await axios.post(
        `${protocal_url}${name}.${tenant_base_url}/LeadOpration/leads/multiplechangestatus`,
        formData_POST,
        config
      );

      alert("Assign Leads successfully!");
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error response:", error.response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">
          Change Multiple Lead Status
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="shadow-lg">
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
                    <div className="flex flex-col w-full relative">
                      <label
                        htmlFor="leadStatus"
                        className="text-sm font-medium text-gray-700"
                      >
                        Lead Status
                      </label>
                      <div
                        className="relative"
                        onClick={toggleDropdownassigned_ToDropDown}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                      >
                        <button
                          className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                          id="LeadStatusDropDown"
                          type="button"
                        >
                          {leadeStatus === ""
                            ? defaultTextassigned_ToDropDown
                            : leadeStatus}
                          <FaAngleDown className="ml-2 text-gray-400" />
                        </button>
                        {isDropdownOpen && (
                          <div className="absolute w-full bg-white border border-gray-300 rounded-md top-11 z-10">
                            <ul className="py-2 text-sm text-gray-700">
                              {["Pending", "Assigned"].map((status) => (
                                <li
                                  key={status}
                                  onClick={() =>
                                    handleDropdownassigned_ToDropDown(status)
                                  }
                                  className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                                >
                                  {status}
                                </li>
                              ))}
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
          <div className="flex justify-end mt-4 gap-4">
            <button
              type="submit"
              className={`px-12 py-4 mb-3 bg-cyan-500 text-white border-2 border-cyan-500 rounded hover:text-cyan-500 hover:bg-white ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Sending..." : "Submit"}
            </button>
            <button
              type="button"
              className="px-12 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 mb-3 border-2"
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
