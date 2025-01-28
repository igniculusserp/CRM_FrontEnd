import { useState } from "react";
import axios from "axios";
import {
  tenant_base_url,
  protocal_url,
} from "./../../../../../../Config/config";
import { getHostnamePart } from "../../../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";
import PropTypes from "prop-types";
import BrowserRestriction from "./BrowserRestriction";

export default function AddAccessControl({ onCancel }) {
  const name = getHostnamePart();

  //----------------------------Access Control Details -----------------------

  // ------------------------------ Access Control State ------------------------
  const [controlDetails, setControlDetails] = useState({
    title: "",
    description: "",
    enabled: true,
    validDuration: "Custom",
    validFrom: "",
    validTo: "",
    risk: "",
    category: "",
    eventType: "Browser Restriction",
  });

  // ------------------------------ Access Control Handle Change ------------------------

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setControlDetails((prevDetails) => {
      const updatedDetails = {
        ...prevDetails,
        [name]:
          name === "validDuration"
            ? checked
              ? "Valid Always"
              : "Custom"
            : type === "checkbox"
              ? checked
              : value,
      };
      console.log("Updated Control Details:", updatedDetails); // Log updated control details
      return updatedDetails;
    });
  };

  // ------------------------------ Access Control Handle Submit ------------------------

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const bearer_token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${bearer_token}`,
      },
    };

    // Constructing the request body
    const requestBody = {
      title: controlDetails.title,
      description: controlDetails.description,
      enabled: controlDetails.enabled,
      validDuration: controlDetails.validDuration,
      validFrom: controlDetails.validFrom,
      validTo: controlDetails.validTo,
      risk: controlDetails.risk,
      category: controlDetails.category,
      eventType: controlDetails.eventType,
    };

    console.log("Request Body on Submit:", requestBody); // Log final form submission data

    try {
      await axios.post(
        `${protocal_url}${name}.${tenant_base_url}/Security/accesscontrol/add`,
        requestBody,
        config,
      );
      alert("Successfully Added");
      onCancel();
    } catch (error) {
      console.error("Error saving pool name", error);
      alert("Failed to save pool. Please try again.");
    }
  };

  // ------------------------------ Option Control ------------------------

  // ------------------------------ Option Control State ------------------------

  const [selectedId, setSelectedId] = useState(1);

  // ------------------------------ Option Control Handle Click ------------------------

  const handleOptionClick = (id, text) => {
    setSelectedId(id);
    setControlDetails((prevDetails) => {
      const updatedDetails = {
        ...prevDetails,
        eventType: text, // Update the eventType directly with the button text
      };
      console.log("Updated Control Details:", updatedDetails); // Log updated control details
      return updatedDetails;
    });
  };

  // ------------------------------ Option Control Buttons ------------------------

  const buttons = [
    { id: 1, text: "Browser Restriction" },
    { id: 2, text: "IP Restriction" },
    { id: 3, text: "Time Restriction" },
    { id: 4, text: "Device Restriction" },
    { id: 5, text: "Geo Location" },
  ];

  return (
    <div className="flex flex-col m-3 overflow-x-auto overflow-y-hidden">
      <form onSubmit={handleFormSubmit}>
        <div className="flex py-2 px-2 items-center justify-between bg-white rounded-md shadow-md">
          <h1 className="text-xl">Access Control</h1>
          {/*------------------------------------------------- Cancel Button--------------------------------------------- */}
          <button
            onClick={onCancel}
            className="px-4 py-1 rounded mx-3 border border-blue-500 text-blue-500"
          >
            Cancel
          </button>
        </div>
        {/* ------------------------------------------ Top Section -------------------------------------------- */}
        <div className="overflow-hidden shadow-md">
          <div className="py-2 px-3 bg-cyan-500 rounded-t-xl mt-3">
            <h1 className="text-white">Access Control Details</h1>
          </div>
          <div className="flex flex-col py-2 px-4 bg-white rounded-b-xl">
            <div className="flex gap-4">
              <div className="grid gap-2 pb-3 w-full">
                <div className="flex space-x-4">
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="title"
                      className="text-sm font-medium text-gray-700"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={controlDetails.title}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Enter device type"
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="description"
                      className="text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      value={controlDetails.description}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Enter device type"
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="flex flex-col flex-1 w1/2 gap-1 justify-start items-start">
                    <label
                      htmlFor="enabled"
                      className="text-sm font-medium text-gray-700"
                    >
                      Enabled
                    </label>
                    <input
                      type="checkbox"
                      name="enabled"
                      checked={controlDetails.enabled}
                      className="flex justify-start py-1 px-1 h-5 w-5"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-1 flex-col w1/2 gap-1 justify-start items-start">
                    <label
                      htmlFor="validDuration"
                      className="text-sm font-medium text-gray-700"
                    >
                      Valid Always
                    </label>
                    <input
                      type="checkbox"
                      name="validDuration"
                      checked={controlDetails.validDuration === "Valid Always"}
                      className="flex justify-start py-1 px-1 h-5 w-5"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="validFrom"
                      className="text-sm font-medium text-gray-700"
                    >
                      Valid From
                    </label>
                    <input
                      disabled={controlDetails.validDuration === "Valid Always"}
                      type="date"
                      name="validFrom"
                      value={controlDetails.validFrom}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Enter date"
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="validTo"
                      className="text-sm font-medium text-gray-700"
                    >
                      Valid To
                    </label>
                    <input
                      disabled={controlDetails.validDuration === "Valid Always"}
                      type="date"
                      name="validTo"
                      value={controlDetails.validTo}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Enter date"
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="risk"
                      className="text-sm font-medium text-gray-700"
                    >
                      Risk
                    </label>
                    <input
                      type="text"
                      name="risk"
                      value={controlDetails.risk}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Enter risk level"
                    />
                  </div>
                </div>
                <h2 className="text-md font-medium">Category</h2>
                <div className="flex space-x-4">
                  <div className="flex flex-1 w1/2 gap-10 justify-start items-start">
                    <div>
                      <label
                        htmlFor="default"
                        className="text-sm font-medium text-gray-700"
                      >
                        Default
                      </label>
                      <input
                        type="checkbox"
                        name="default"
                        checked={controlDetails.category === "default"}
                        className="flex justify-start py-1 px-1 h-5 w-5"
                        onChange={() =>
                          setControlDetails((prev) => ({
                            ...prev,
                            category: "default", // Set category to 'default' when checked
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="apps"
                        className="text-sm font-medium text-gray-700"
                      >
                        Apps
                      </label>
                      <input
                        type="checkbox"
                        name="apps"
                        checked={controlDetails.category === "apps"}
                        className="flex justify-start py-1 px-1 h-5 w-5"
                        onChange={() =>
                          setControlDetails((prev) => ({
                            ...prev,
                            category: "apps", // Set category to 'apps' when checked
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*------------------------------------------------- Bottom Section--------------------------------------------- */}
        <div className="flex flex-col overflow-x-auto overflow-y-hidden">
          <div className="overflow-hidden shadow-md">
            {/*------------------------------------------------- Button Section--------------------------------------------- */}
            <div className="flex gap-3 my-3 items-center">
              {buttons.map(({ id, text }) => (
                <button
                  key={id}
                  onClick={() => handleOptionClick(id, text)}
                  className={`px-3 py-2 rounded font-light text-md
                ${
                  selectedId === id
                    ? "bg-cyan-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }
              `}
                >
                  {text}
                </button>
              ))}
            </div>

            {/*------------------------------------------------- Restriction Section--------------------------------------------- */}
            {/* BROWSE RESTRICTION */}
            {selectedId === 1 && (
              <>
                <BrowserRestriction />
              </>
            )}

            {/* IP RESTRICTION */}
            {selectedId === 2 && <>2</>}
            {/* TIME RESTRICTION */}
            {selectedId === 3 && <>3</>}
            {/* DEVICE RESTRICTION */}
            {selectedId === 4 && <>4</>}
            {/* GEO LOCATION */}
            {selectedId === 5 && <>5</>}

            {/*------------------------------------------------- Save Button Section--------------------------------------------- */}
            <div className="flex justify-end px-4 bg-white">
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-32 py-4 mt-16 mb-8 bg-cyan-500 text-white hover:text-cyan-500 hover:bg-white border-2 border-cyan-500 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
AddAccessControl.propTypes = {
  onCancel: PropTypes.func.isRequired,
};
