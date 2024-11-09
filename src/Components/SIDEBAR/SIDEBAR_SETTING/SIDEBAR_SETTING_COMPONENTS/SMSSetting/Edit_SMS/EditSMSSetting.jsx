import { useState,useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  tenant_base_url,
  protocal_url,
} from "./../../../../../../Config/config";
import { getHostnamePart } from "../../../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

//----------------------------Edit SMS Setting -----------------------

export default function EditSMSSetting({setActiveComponent, handleGetAll, id}) {

  const name = getHostnamePart();
  
  // ------------------------------ Edit SMS Setting State ------------------------
  const [data, setData] = useState({
    id:"",
    senderId: "",
    apiKey: "",
  });

  // -------------------------------Edit SMS Setting Handle Cancel Button ------------------------
  const handleCancel = () => {
    setActiveComponent("Table");
    handleGetAll();
  };

  // -------------------------------Edit SMS Setting Handle Change ------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ------------------------------Edit SMS Control Get By ID ------------------------

  useEffect(() => {
    fetchDataById();
  }, [id]);

  // Function to fetch data by ID
  const fetchDataById = async () => {
    const bearer_token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${bearer_token}`,
      },
    };

    try {
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Admin/smssetting/get/${id}`,
        config
      );

      if (response.status === 200 && response.data.isSuccess) {
        const ResData = response.data.data;
        setData({
          id: ResData.id,
          senderId: ResData.senderId,
          apiKey: ResData.apiKey,
          
        });
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // ------------------------------Edit SMS Control Handle Submit ------------------------

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const bearer_token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${bearer_token}`,
      },
    };

    const requestBody = {
      id: data.id,
      senderId: data.senderId,
      apiKey: data.apiKey,
     
    };

    console.log("Request Body on Submit:", requestBody);

    try {
      await axios.put(
        `${protocal_url}${name}.${tenant_base_url}/Admin/smssetting/edit/${id}`,
        requestBody,
        config
      );
      alert("Successfully Updated");
      handleCancel();
    } catch (error) {
      console.error("Error saving pool name", error);
      alert("Failed to save pool. Please try again.");
    }
  };



  return (
    <div className="m-3 min-w-screen">
      <div className="flex min-w-screen justify-between items-center">
        <h1 className="text-3xl font-medium">
        Edit SMS 
        </h1>
        <button
          onClick={handleCancel}
          className="border border-blue-600 bg-white text-blue-600 px-4 py-2 min-w-10 text-sm rounded"
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
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

EditSMSSetting.propTypes = {
  setActiveComponent: PropTypes.func.isRequired,
  handleGetAll: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
