import { useState, useEffect } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import axios from "axios";

import { tenant_base_url, protocal_url } from "./Config/config";
import { getHostnamePart } from "./Components/SIDEBAR/SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

const FollowupNotificationModal = ({ id, onClose }) => {
  const bearer_token = localStorage.getItem("token");
  const name = getHostnamePart();

  const [isLoading, setIsLoading] = useState(false);
  const [followupsData, setFollowupsData] = useState({});

  //--------------------------------------- Set Business Type --------------------------------------------
  const [BusinessType, setBusinessType] = useState("");

  useEffect(() => {
    const storedType = localStorage.getItem("businessType") || "";
    setBusinessType(storedType);
  }, []);

  // Fetch Data by ID
  useEffect(() => {
    if (id) {
      fetchDataById();
    }

    // Close the modal after 30 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 60000);

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [id, onClose]); // Include onClose in the dependency array

  // Function to fetch data by ID
  const fetchDataById = async () => {
    setIsLoading(true);
    const config = { headers: { Authorization: `Bearer ${bearer_token}` } };

    try {
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/FollowUp/getbyid/${id}`,
        config,
      );

      if (response.status === 200 && response.data.isSuccess) {
        setFollowupsData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewClick = (id) => {
    window.location.href = `/panel/${BusinessType}/createfollowup/${id}`; // Navigate to the specified route
    onClose();
  };
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-semibold">Follow-Up Details</h2>

          <div className="flex flex-col gap-2 rounded-lg border-2 bg-white px-2 py-3">
            <div className="flex items-center rounded-lg border-2 bg-gray-100 px-2 py-1">
              <div className="w-2/4 text-sm text-gray-500">Id</div>
              <div className="w-2/4 text-sm font-medium">
                {followupsData.id}
              </div>
            </div>

            <div className="flex items-center rounded-lg border-2 bg-gray-100 px-2 py-1">
              <div className="w-2/4 text-sm text-gray-500">Client Name</div>
              <div className="w-2/4 text-sm font-medium">
                {followupsData.name}
              </div>
            </div>

            <div className="flex items-center rounded-lg border-2 bg-gray-100 px-2 py-1">
              <div className="w-2/4">
                <FaPhoneAlt className="text-xl" />
              </div>
              <div className="w-2/4 text-sm font-medium">
                {followupsData.phoneNo}
              </div>
            </div>

            <div className="flex items-center rounded-lg border-2 bg-gray-100 px-2 py-1">
              <div className="w-2/4 text-sm text-gray-500">Follow Up Date</div>
              <div className="w-2/4 text-sm font-medium">
                {followupsData.call_bck_DateTime
                  ? followupsData.call_bck_DateTime.replace("T", " ")
                  : "No date available"}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <button
              className="mr-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              // onClick={handleViewClick} // Add onClick handler
              onClick={() => handleViewClick(followupsData.id)}
            >
              View
            </button>
            <button
              className="rounded bg-gray-300 px-4 py-2 text-black hover:bg-gray-400"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FollowupNotificationModal;
