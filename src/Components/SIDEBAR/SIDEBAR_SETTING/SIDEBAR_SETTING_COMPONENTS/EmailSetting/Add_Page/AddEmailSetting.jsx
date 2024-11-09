import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { tenant_base_url, protocal_url } from "./../../../../../../Config/config";
import { getHostnamePart } from "../../../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

//----------------------------Add Email Setting -----------------------
export default function AddEmailSetting({ setActiveComponent, handleGetAll }) {
  const name = getHostnamePart();

  // ------------------------------ Add Email Setting State ------------------------
  const [data, setData] = useState({
    senderEmailId: "",
    relayServerName: "",
    relayPortNo: "",
    serveremail: "",
    key: "",
  });

  // -------------------------------Add Email Setting Handle Cancel Button ------------------------
  const handleCancel = () => {
    setActiveComponent("Table");
    handleGetAll();
  };

  // -------------------------------Add Email Setting Handle Change ------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ------------------------------ Add Email Setting Handle Submit ------------------------
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
      senderEmailId: data.senderEmailId,
      relayServerName: data.relayServerName,
      relayPortNo: data.relayPortNo,
      serveremail: data.serveremail,
      key: data.key,
    };

    console.log("Request Body on Submit:", requestBody);

    try {
      await axios.post(
        `${protocal_url}${name}.${tenant_base_url}/Admin/emailsetting/add`,
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
      <>
        <div className="flex min-w-screen justify-between items-center">
          <h1 className="text-3xl font-medium">Add Email Setting</h1>
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
              <h2 className="font-medium py-2 px-4 rounded-t-xl text-white bg-cyan-500">
                Email Setting
              </h2>
              {/* -------------1------------- */}
              <div className="py-1 px-3 grid gap-2">
                {/* -------------Sender Email ID------------- */}
                <div className="flex space-x-4">
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="senderEmailId"
                      className="text-sm font-medium text-gray-700"
                    >
                      Sender Email ID
                    </label>
                    <input
                      type="text"
                      name="senderEmailId"
                      value={data.senderEmailId}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      placeholder="Enter Sender Email ID"
                    />
                  </div>
                  {/* -------------Port Number------------- */}
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
                  {/* -------------Relay Server Name------------- */}
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="relayServerName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Relay Server Name
                    </label>
                    <input
                      type="text"
                      name="relayServerName"
                      value={data.relayServerName}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  {/* -------------Server Email------------- */}
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="serveremail"
                      className="text-sm font-medium text-gray-700"
                    >
                      Server Email
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
                <div className="flex items-center justify-start max-w-full mb-8">
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
      </>
    </div>
  );
}

AddEmailSetting.propTypes = {
  setActiveComponent: PropTypes.func.isRequired,
  handleGetAll: PropTypes.func.isRequired,
};
