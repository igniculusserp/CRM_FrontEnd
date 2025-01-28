import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { tenant_base_url, protocal_url } from "./../../../../../Config/config";
import { getHostnamePart } from "../../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";
import { FaAngleDown } from "react-icons/fa";

const MultipleStatusModal = ({ onClose, multiIds }) => {
  const bearer_token = localStorage.getItem("token");
  const name = getHostnamePart();

  const [loading, setLoading] = useState(false);
  const [leadStatusSelected, setLeadStatusSelected] = useState("");
  const [availableLeadStatuses, setAvailableLeadStatuses] = useState([]);
  const [isDropdownVisibleLeadStatus, setIsDropdownVisibleLeadStatus] =
    useState(false);
  const [defaultTextLeadStatusDropDown, setDefaultTextLeadStatusDropDown] =
    useState("Select Status");

  //----------------------------------------------- Submit function ----------------------------------------------------
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
        leadStatus: leadStatusSelected,
      };

      await axios.post(
        `${protocal_url}${name}.${tenant_base_url}/Lead/leads/changemultiplestatus`,
        formData_POST,
        config,
      );

      alert("Status Change successfully!");
      onClose();
    } catch (error) {
      console.error("Error response:", error.response);
      alert("Failed to change status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  //----------------------------------------------- Fetch Lead Statuses -------------------------------------------------
  const fetchLeadStatuses = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Admin/leadstatus/getall`,
        config,
      );
      setAvailableLeadStatuses(response.data.data);
    } catch (error) {
      console.error("Error fetching lead statuses:", error);
      alert("Failed to fetch lead statuses.");
    }
  };

  useEffect(() => {
    fetchLeadStatuses();
  }, []);

  //----------------------------------------------- Dropdown Handlers -------------------------------------------------
  const toggleDropdownLeadStatus = () => {
    setIsDropdownVisibleLeadStatus(!isDropdownVisibleLeadStatus);
  };

  const handleDropdownLeadStatus = (status) => {
    setLeadStatusSelected(status);
    setIsDropdownVisibleLeadStatus(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Multiple Change Status</h2>
        <form onSubmit={handleSubmit}>
          <div className="shadow-lg">
            <h1 className="text-md rounded-t-lg bg-cyan-500 px-1 py-2 font-medium text-white">
              Details
            </h1>
            <div className="rounded-b-xl bg-white px-1">
              <div className="grid gap-2 p-2">
                <div className="relative flex w-full flex-col">
                  <label
                    htmlFor="leadStatusSelected"
                    className="text-sm font-medium text-gray-700"
                  >
                    Lead Status
                  </label>
                  <div className="relative" onClick={toggleDropdownLeadStatus}>
                    <button
                      className="mt-1 flex w-full items-center justify-between rounded-md border border-gray-300 p-2"
                      id="LeadStatusDropDown"
                      type="button"
                    >
                      {leadStatusSelected || defaultTextLeadStatusDropDown}
                      <FaAngleDown className="ml-2 text-gray-400" />
                    </button>
                    {isDropdownVisibleLeadStatus && (
                      <div className="top-10.5 absolute z-10 w-full rounded-md border border-gray-300 bg-white">
                        <ul className="py-2 text-sm text-gray-700">
                          {availableLeadStatuses.map(({ key, status }) => (
                            <li
                              key={key}
                              onClick={() => handleDropdownLeadStatus(status)}
                              className="block cursor-pointer border-b px-4 py-2 hover:bg-cyan-500 hover:text-white"
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
          <div className="mt-4 flex justify-end gap-5">
            <button
              type="submit"
              className={`mb-2 rounded border-2 border-cyan-500 bg-cyan-500 px-12 py-1 text-white shadow-md hover:bg-white hover:text-cyan-500 ${loading ? "cursor-not-allowed opacity-50" : ""}`}
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

MultipleStatusModal.propTypes = {
  multiIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MultipleStatusModal;
