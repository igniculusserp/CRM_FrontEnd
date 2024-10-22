import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { tenant_base_url, protocal_url } from "./../../../../../Config/config";
import { getHostnamePart } from "../../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";
import { FaAngleDown } from "react-icons/fa";

const LeadStatusModal = ({ onClose }) => {
  const bearer_token = localStorage.getItem("token");
  const name = getHostnamePart();

  const [loading, setLoading] = useState(false);
  const [leadCount, setLeadCount] = useState("");
  const [leadeStatus, setLeadeStatus] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "leadCount") {
      setLeadCount(value);
    }
  };


  //----------------------------------------------- Submit function----------------------------------------------------
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

      alert("Status Change successfully!");
      onClose();
      // window.location.reload();
    } catch (error) {
      console.error("Error response:", error.response);
    } finally {
      setLoading(false);
    }
  };


    //----------------------------------------------------------------------------------------
  //LeadStatusDropDown GET API Is being used here
  const [leadStatus, setleadStatus] = useState("");

  async function handleLeadStatus() {
    const bearer_token = localStorage.getItem("token");

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Admin/leadstatus/getall`,
        config
      );
      setleadStatus(response.data.data);
      console.log("status:", response.data.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
      // Optionally, set an error state to display a user-friendly message
    }
  }

  useEffect(() => {
    handleLeadStatus();
  }, []);


  const [defaultTextLeadStatusDropDown, setdefaultTextLeadStatusDropDown] =
    useState('Select Status');
  const [isDropdownVisibleLeadStatus, setisDropdownVisibleLeadStatus] =
    useState(false);

  const toggleDropdownLeadStatus = () => {
    setisDropdownVisibleLeadStatus(!isDropdownVisibleLeadStatus);
  };

  const handleDropdownLeadStatus = (leadStatus) => {
    setLeadeStatus(leadStatus);
    setisDropdownVisibleLeadStatus(!isDropdownVisibleLeadStatus);
  };




  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">
          Change Status
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
                  <div className="flex flex-col w-full relative">
                    <label
                      htmlFor="leadesStatus"
                      className="text-sm font-medium text-gray-700"
                    >
                      Lead Status
                    </label>
                    <div
                      className="relative"
                      onClick={toggleDropdownLeadStatus}
                      onMouseLeave={()=>(setisDropdownVisibleLeadStatus(false ))}
                    >
                      <button
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                        id="LeadStatusDropDown"
                        type="button"
                      >
                        {leadeStatus!="" ? leadeStatus : defaultTextLeadStatusDropDown}
                        <FaAngleDown className="ml-2 text-gray-400" />
                      </button>
                      {isDropdownVisibleLeadStatus && (
                        <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10.5 z-10">
                          <ul className="py-2 text-sm text-gray-700">
                            {leadStatus.map(({ key, status }) => (
                              <li
                                key={key}
                                onClick={() => handleDropdownLeadStatus(status)}
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

LeadStatusModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default LeadStatusModal;
