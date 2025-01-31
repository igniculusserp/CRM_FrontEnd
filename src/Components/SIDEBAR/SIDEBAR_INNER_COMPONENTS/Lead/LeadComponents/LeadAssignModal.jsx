import { useState,  } from "react";

import PropTypes from "prop-types";

import axios from "axios";

import { tenant_base_url, protocal_url } from "./../../../../../Config/config";

import { getHostnamePart } from "../../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

import useManagedBy from "../../../../../Hooks/ManagedBy/useManagedBy";


import { FaAngleDown } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";

const LeadAssignModal = ({ onClose }) => {
  const bearer_token = localStorage.getItem("token");
  const name = getHostnamePart();

  const { managedBy } = useManagedBy();

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
        config,
      );

      alert("Leads Allotment successfully!");
      onClose();
      // window.location.reload();
    } catch (error) {
      console.error("Error response:", error.response);
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------Assigned To Dropdown -----------------------------------


  const [defaultTextassigned_ToDropDown, setdefaultTextassigned_ToDropDown] =
    useState("Select Assigned");
  const [isDropdownassigned_ToDropDown, setisDropdownassigned_ToDropDown] =
    useState(false);

  const toggleDropdownassigned_ToDropDown = () => {
    setisDropdownassigned_ToDropDown(!isDropdownassigned_ToDropDown);
  };

  const handleDropdownassigned_ToDropDown = (assigned_To_Username) => {
    setdefaultTextassigned_ToDropDown(assigned_To_Username);
    setisDropdownassigned_ToDropDown(!isDropdownassigned_ToDropDown);
    setAssignedTo(assigned_To_Username);
  };

  return (
    <>
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
      <div className="w-10/12 bg-white rounded-lg sm:w-4/12">
      <div className="flex items-center justify-center px-2 py-2 text-xl font-medium text-white rounded-t-lg bg-cyan-500">
        <h2 className="mx-auto">Leads Allotment</h2>
      <ImCancelCircle onClick={onClose} size={22} />
        </div>
        <form onSubmit={handleSubmit} className="px-4">
          <div className="mt-3">
            <h1 className="px-4 py-2 font-medium text-white rounded-t-lg text-md bg-cyan-500">
              Details
            </h1>
            <div className="px-1 bg-white border-2 border-t-0 rounded-b-xl border-cyan-500">
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
                      className="p-2 mt-1 border border-gray-300 rounded-md outline-none"
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="flex flex-col w-full">
                    <div className="relative flex flex-col w-1/1">
                      <label
                        htmlFor="assignedTo"
                        className="text-sm font-medium text-gray-700 outline-none"
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
                          className="flex items-center justify-between w-full p-2 mt-1 border border-gray-300 rounded-md"
                          id="LeadStatusDropDown"
                          type="button"
                        >
                          {assignedTo === ""
                            ? defaultTextassigned_ToDropDown
                            : assignedTo}
                          <FaAngleDown className="ml-2 text-gray-400" />
                        </button>
                        {isDropdownassigned_ToDropDown && (
                          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md top-11">
                            <ul className="text-sm text-gray-700 ">
                              {managedBy.map(
                                ({ key, userName, role }) => (
                                  <li
                                    key={key}
                                    onClick={() =>
                                      handleDropdownassigned_ToDropDown(
                                        userName,
                                      )
                                    }
                                    className="block px-4 py-2 border-b cursor-pointer hover:bg-cyan-500 hover:text-white"
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
          <div className="grid justify-end grid-cols-2 gap-5 mt-4">
            <button
              type="submit"
              className="p-2 mb-3 text-white border-2 rounded-md bg-cyan-500 hover:bg-white hover:text-cyan-500 border-cyan-500"            
              disabled={loading}
            >
              {loading ? "Sending..." : "Submit"}
            </button>
            <button
            type="button"
            className="p-2 mb-3 font-semibold text-gray-500 border-2 border-gray-300 rounded-md hover:text-white hover:bg-gray-300"            
            onClick={onClose}
          >
            Close
          </button>
           
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

LeadAssignModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default LeadAssignModal;
