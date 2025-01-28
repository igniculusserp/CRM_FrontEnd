import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { tenant_base_url, protocal_url } from "./../../../../Config/config";
import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import {
  // showSuccessToast,
  showErrorToast,
} from "./../../../../utils/toastNotifications";

const LeadFeatchModal = ({ onClose }) => {
  const bearer_token = localStorage.getItem("token");
  const name = getHostnamePart();

  const [loading, setLoading] = useState(false);
  const [leadCount, setLeadCount] = useState("");

  const handleInputChange = (e) => {
    const { value } = e.target;

    setLeadCount(value);
  };

  //   --------------------------------------------------SUBMIT-----------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!bearer_token) {
      showErrorToast("No token found, please log in again.");
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
      };

      const response = await axios.post(
        `${protocal_url}${name}.${tenant_base_url}/LeadOpration/leads/fetchleads`,
        formData_POST,
        config,
      );

      if (response.data.status === 200) {
        toast.success(response.data.message, {
          onClose: () => {
            onClose(); // Close modal after the toast is dismissed
          },
          autoClose: 2000,
          theme: "colored",
        });
      } else if (response.data.status === 402) {
        showErrorToast(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          showErrorToast(error.response.data.message);
        } else if (error.response.status === 402) {
          showErrorToast(error.response.data.message);
        } else {
          showErrorToast(error.response.data.message);
        }
      } else {
        showErrorToast("Network error. Please try again.", {
          onClose: () => {
            console.log("Network error toast closed");
          },
        });
      }
      console.error("Error response:", error.response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-semibold">Fetch Lead</h2>
          <form onSubmit={handleSubmit}>
            <div className="shadow-lg">
              <h1 className="text-md rounded-t-lg bg-cyan-500 px-1 py-2 font-medium text-white">
                Details
              </h1>
              <div className="rounded-b-xl bg-white px-1">
                <div className="grid gap-2 p-2">
                  <div className="flex space-x-4">
                    <div className="flex w-full flex-col">
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
                        className="mt-1 rounded-md border border-gray-300 p-2"
                      />
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
    </>
  );
};

LeadFeatchModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default LeadFeatchModal;
