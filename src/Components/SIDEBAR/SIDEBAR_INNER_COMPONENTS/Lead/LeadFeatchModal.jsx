//react
import { useState } from "react";
//props
import PropTypes from "prop-types";
//axios
import axios from "axios";
//url
import { tenant_base_url, protocal_url } from "./../../../../Config/config";
//name
import { ImCancelCircle } from "react-icons/im";
import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

//toast
import { ToastContainer } from "react-toastify";
import {
  showSuccessToast,
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

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
        <div className="w-10/12 bg-white rounded-lg sm:w-4/12">
          <div className="flex items-center justify-center px-2 py-2 text-xl font-medium text-white rounded-t-lg bg-cyan-500">
            <h2 className="mx-auto">Fetch Leads</h2>
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
                        className="p-2 mt-1 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid justify-end grid-cols-2 gap-5 mt-4">
              <button
                type="submit"
                className="p-2 mb-3 text-white border-2 rounded-md border-cyan-500 bg-cyan-500 hover:bg-white hover:text-cyan-500"
                disabled={loading}
              >
                {loading ? "Sending..." : "Submit"}
              </button>
              <button
                type="button"
                className="p-2 mb-3 font-semibold text-gray-500 border-2 border-gray-300 rounded-md hover:bg-gray-300 hover:text-white"
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
