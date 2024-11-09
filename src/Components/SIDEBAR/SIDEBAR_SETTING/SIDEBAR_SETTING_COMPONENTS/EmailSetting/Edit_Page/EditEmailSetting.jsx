import { useState,useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  tenant_base_url,
  protocal_url,
} from "./../../../../../../Config/config";
import { getHostnamePart } from "../../../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

//----------------------------Edit Email Setting -----------------------

export default function EditEmailSetting({ setActiveComponent, handleGetAll, id }) {

  const name = getHostnamePart();
  
  // ------------------------------ Edit Email Setting State ------------------------
  const [data, setData] = useState({
    id:"",
    senderEmailId: "",
    relayServerName: "",
    relayPortNo: "",
    serveremail: "",
    key: "",
  });

  // -------------------------------Edit Email Setting Handle Cancel Button ------------------------
  const handleCancel = () => {
    setActiveComponent("Table");
    handleGetAll();
  };

  // -------------------------------Edit Email Setting Handle Change ------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ------------------------------Edit Access Control Get By ID ------------------------

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
        `${protocal_url}${name}.${tenant_base_url}/Admin/emailsetting/get/${id}`,
        config
      );

      if (response.status === 200 && response.data.isSuccess) {
        const ResData = response.data.data;
        setData({
          id: ResData.id,
          senderEmailId: ResData.senderEmailId,
          relayServerName: ResData.relayServerName,
          relayPortNo: ResData.relayPortNo,
          serveremail: ResData.serveremail,
          key: ResData.key,
        });
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // ------------------------------Edit Access Control Handle Submit ------------------------

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
      senderEmailId: data.senderEmailId,
      relayServerName: data.relayServerName,
      relayPortNo: data.relayPortNo,
      serveremail: data.serveremail,
      key: data.key,
    };

    console.log("Request Body on Submit:", requestBody);

    try {
      await axios.put(
        `${protocal_url}${name}.${tenant_base_url}/Admin/emailsetting/edit/${id}`,
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
      <>
        <div className="flex min-w-screen justify-between items-center">
          <h1 className="text-3xl font-medium">Edit Email Setting</h1>
          <div
            onClick={handleCancel}
            className="px-4 py-1.5 rounded mx-3 border border-blue-500 text-blue-500 cursor-pointer bg-white"
          >
            Cancel
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="flex">
          <div className="w-full">
            <div className="mt-3 bg-white rounded-xl shadow-md flex-grow">
              <h2 className="font-medium py-2 px-4 rounded-t-xl text-white bg-cyan-500">
                Email Setting
              </h2>
              {/* -------------1------------- */}
              <div className="py-1 px-3 grid gap-2">
                {/* -------------Sender Email------------- */}
                <div className="flex space-x-4">
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="senderEmailId"
                      className="text-sm font-medium text-gray-700"
                    >
                      Sender Email
                    </label>
                    <input
                      type="text"
                      name="senderEmailId"
                      value={data.senderEmailId}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      placeholder="Enter Sender Email"
                    />
                  </div>
                  {/* -------------Port------------- */}
                  <div className="flex flex-col w-1/2 relative">
                    <label
                      htmlFor="relayPortNo"
                      className="text-sm font-medium text-gray-700"
                    >
                      Port Number
                    </label>
                    <input
                      type="text"
                      name="relayPortNo"
                      value={data.relayPortNo}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                {/* -------------2------------- */}
                <div className="flex space-x-4">
                  {/* -------------Server Oblig Relay------------- */}
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="relayServerName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Relay Server Name / Host Name
                    </label>
                    <input
                      type="text"
                      name="relayServerName"
                      value={data.relayServerName}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  {/* -------------Key Email Template------------- */}
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="serveremail"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      name="serveremail"
                      value={data.serveremail}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                {/* -------------3------------- */}
                <div className="flex space-x-4">
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="key"
                      className="text-sm font-medium text-gray-700"
                    >
                      Key
                    </label>
                    <input
                      type="text"
                      name="key"
                      value={data.key}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                {/* -------------Button------------- */}
                <div className=" flex items-center justify-start max-w-full mb-8">
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
      </>
    </div>
  );
}

EditEmailSetting.propTypes = {
  setActiveComponent: PropTypes.func.isRequired,
  handleGetAll: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
