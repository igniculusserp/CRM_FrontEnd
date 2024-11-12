import { useState } from "react";

import PropTypes from "prop-types";

import axios from "axios";

import {tenant_base_url, protocal_url,} from "./../../../../../../Config/config";

import { getHostnamePart } from "../../../ReusableComponents/GlobalHostUrl";

import { ToastContainer } from 'react-toastify';
import { showErrorToast } from "../../../../../../utils/toastNotifications"; 

//----------------------------Add SMS Setting -----------------------

export default function AddSMSSetting({ setActiveComponent, handleGetAll }) {
  const name = getHostnamePart();

  // ------------------------------ Add SMS Setting State ------------------------
  const [data, setData] = useState({
    senderId: "",
    apiKey: "",
  });

  // -------------------------------Add SMS Setting Handle Cancel Button ------------------------
  const handleCancel = () => {
    setActiveComponent("Table");
    handleGetAll();
  };

  // -------------------------------Add SMS Setting Handle Change ------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ------------------------------ Add SMS Setting Handle Submit ------------------------
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
      senderId: data.senderId,
      apiKey: data.apiKey,
    };

    if(!requestBody.senderId){
      showErrorToast('Please enter sender-Id')
      return;
    }  
    if(!requestBody.apiKey){
      showErrorToast('Please enter API-Key')
      return;
    }


    try {
      await axios.post(
        `${protocal_url}${name}.${tenant_base_url}/Admin/smssetting/add`,
        requestBody,
        config
      );
      alert("Successfully Added");
      handleCancel();
    } catch (error) {
      console.error("Error saving email setting", error);
      alert("Failed to save settings. Please try again.");
    }
  };

  return (
    <div className="m-3 min-w-screen">
      <div className="flex min-w-screen justify-between items-center">
        <h1 className="text-3xl font-medium">Add SMS Setting</h1>
        <button
          className="border border-blue-600 bg-white text-blue-600 px-4 py-2 min-w-10 text-sm rounded"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleFormSubmit} className="flex">
        <div className="w-full">
          <div className="mt-3 bg-white rounded-xl shadow-md flex-grow">
            <h2 className="font-medium text-3xl py-2 px-4 rounded-t-xl text-white bg-cyan-500">
              SMS Setting
            </h2>
            {/* -------------1------------- */}
            <div className="py-2 px-4 grid gap-2">
              {/* -------------API Server ID------------- */}
              <div className="flex space-x-4">
                <div className="flex flex-col w-1/2">
                  <label
                    htmlFor="senderId"
                    className="text-sm font-medium text-gray-700"
                  >
                    Sender ID
                  </label>
                  <input
                    type="text"
                    name="senderId"
                    value={data.senderId}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                    placeholder="Enter API Sender ID"
                  />
                </div>
                {/* -------------API Server Name------------- */}
                <div className="flex flex-col w-1/2 relative">
                  <label
                    htmlFor="apiKey"
                    className="text-sm font-medium text-gray-700"
                  >
                    API Key
                  </label>
                  <input
                    type="text"
                    name="apiKey"
                    value={data.apiKey}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                    placeholder="Enter API Key"
                  />
                </div>
              </div>

              {/* -------------Button------------- */}
              <div className="mb-3 flex items-center justify-start max-w-full">
                <button
                  type="submit"
                  className="mt-4 hover:bg-cyan-500 border border-cyan-500 text-cyan-500 hover:text-white px-6 py-4 rounded-md w-max"
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

AddSMSSetting.propTypes = {
  setActiveComponent: PropTypes.func.isRequired,
  handleGetAll: PropTypes.func.isRequired,
};
