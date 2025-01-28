import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { tenant_base_url, protocal_url } from "./../../../../../Config/config";
import { getHostnamePart } from "../../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";
import { FaAngleDown } from "react-icons/fa";

const MultipleAssignModal = ({ onClose, multiIds }) => {
  const bearer_token = localStorage.getItem("token");
  const name = getHostnamePart();

  const [loading, setLoading] = useState(false);
  const [assignedTo, setAssignedTo] = useState("");
  const [assigned_ToDropDown, setassigned_ToDropDown] = useState([]);
  const [defaultTextassigned_ToDropDown, setdefaultTextassigned_ToDropDown] =
    useState("Select Assigned");
  const [isDropdownassigned_ToDropDown, setisDropdownassigned_ToDropDown] =
    useState(false);

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
        leadIds: multiIds,
        assignedTo: assignedTo,
      };

      await axios.post(
        `${protocal_url}${name}.${tenant_base_url}/Lead/leads/changemultipleAssignTo`,
        formData_POST,
        config,
      );

      alert("Assign Leads successfully!");
      onClose();
    } catch (error) {
      console.error("Error response:", error.response);
      alert("Failed to assign leads. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAssigned_To = useCallback(async () => {
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
    } catch (error) {
      console.error("Error fetching leads:", error);
      alert("Failed to fetch user data. Please try again.");
    }
  }, [bearer_token, name]);

  useEffect(() => {
    handleAssigned_To();
  }, [handleAssigned_To]);

  const toggleDropdownassigned_ToDropDown = () => {
    setisDropdownassigned_ToDropDown(!isDropdownassigned_ToDropDown);
  };

  const handleDropdownassigned_ToDropDown = (assigned_To_Username) => {
    setdefaultTextassigned_ToDropDown(assigned_To_Username);
    setisDropdownassigned_ToDropDown(false);
    setAssignedTo(assigned_To_Username);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Multiple Assign</h2>
        <form onSubmit={handleSubmit}>
          <div className="shadow-lg">
            <h1 className="text-md rounded-t-lg bg-cyan-500 px-1 py-2 font-medium text-white">
              Details
            </h1>
            <div className="rounded-b-xl bg-white px-1">
              <div className="grid gap-2 p-2">
                <div className="flex space-x-4">
                  <div className="flex w-full flex-col">
                    <div className="relative flex w-full flex-col">
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
                          type="button"
                          className="mt-1 flex w-full items-center justify-between rounded-md border border-gray-300 p-2"
                          id="LeadStatusDropDown"
                          aria-haspopup="menu"
                        >
                          {assignedTo === ""
                            ? defaultTextassigned_ToDropDown
                            : assignedTo}
                          <FaAngleDown className="ml-2 text-gray-400" />
                        </button>
                        {isDropdownassigned_ToDropDown && (
                          <div
                            className="absolute top-11 z-10 w-full rounded-md border border-gray-300 bg-white"
                            role="menu"
                          >
                            <ul className="py-2 text-sm text-gray-700">
                              {assigned_ToDropDown.map(
                                ({ key, userName, role }) => (
                                  <li
                                    key={key}
                                    role="menuitem"
                                    onClick={() =>
                                      handleDropdownassigned_ToDropDown(
                                        userName,
                                      )
                                    }
                                    className="block cursor-pointer border-b px-4 py-2 hover:bg-cyan-500 hover:text-white"
                                  >
                                    {userName}-({role})
                                  </li>
                                ),
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
          <div className="mt-4 flex justify-end gap-5">
            <button
              type="submit"
              className={`mb-2 rounded border-2 border-cyan-500 bg-cyan-500 px-12 py-1 text-white shadow-md hover:bg-white hover:text-cyan-500 ${
                loading ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Sending..." : "Submit"}
            </button>
            <button
              type="button"
              className="mb-2 rounded border-2 bg-gray-300 px-12 py-1 text-black shadow-md hover:bg-gray-400"
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

MultipleAssignModal.propTypes = {
  multiIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MultipleAssignModal;
