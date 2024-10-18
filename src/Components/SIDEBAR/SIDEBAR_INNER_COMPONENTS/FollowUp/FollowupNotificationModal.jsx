import { useState, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import axios from "axios";

import { tenant_base_url, protocal_url } from "../../../../Config/config";
import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

const FollowupNotificationModal = ({ id, onClose }) => {
  const bearer_token = localStorage.getItem("token");
  const name = getHostnamePart();

  const [followupsData, setFollowupsData] = useState({
    id: "",
    leadId: "",
    name: "",
    language: "",
    mobileNo: "",
    phoneNo: "",
    email: "",
    assigned_To: "",
    segments: [],
    call_bck_DateTime: "",
    lastModifiedBy: "",
    description: "",
  });

  // Fetch Data by ID
  useEffect(() => {
    if (id) {
      fetchDataById();
    }
  }, [id]);

  // Function to fetch data by ID
  const fetchDataById = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${bearer_token}`,
      },
    };

    try {
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/FollowUp/getbyid/${id}`,
        config
      );

      if (response.status === 200 && response.data.isSuccess) {
        const followup = response.data.data;
        setFollowupsData({
          id: followup.id,
          leadId: followup.leadId || "",
          name: followup.name || "",
          language: followup.language || "",
          mobileNo: followup.mobileNo || "",
          phoneNo: followup.phoneNo || "",
          email: followup.email || "",
          assigned_To: followup.assigned_To || "",
          segments: followup.segments || [],
          call_bck_DateTime: followup.call_bck_DateTime || "",
          lastModifiedBy: followup.lastModifiedBy || "",
          description: followup.description || "",
        });
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <h2 className="text-xl font-semibold mb-4">Follow-Up Details</h2>
          
          <div className="flex flex-col gap-2 bg-white px-2 py-3 rounded-lg border-2">
           

            <div className="flex px-2 py-1 bg-gray-100 border-2 items-center rounded-lg">
              <div className="w-2/4 text-gray-500 text-sm">Client Name</div>
              <div className="w-2/4 font-medium text-sm">
                {followupsData.name}
              </div>
            </div>

            <div className="flex px-2 py-1 bg-gray-100 border-2 items-center rounded-lg">
              <div className="w-2/4">
                <IoIosMail className="text-2xl" />
              </div>
              <div className="w-2/4 font-medium text-sm">{followupsData.email}</div>
            </div>

            <div className="flex px-2 py-1 bg-gray-100 border-2 items-center rounded-lg">
              <div className="w-2/4">
                <FaPhoneAlt className="text-xl" />
              </div>
              <div className="w-2/4 font-medium text-sm">{followupsData.phoneNo}</div>
            </div>

            <div className="flex px-2 py-1 bg-gray-100 border-2 items-center rounded-lg">
              <div className="w-2/4 text-gray-500 text-sm">Follow Up Date</div>
              <div className="w-2/4 font-medium text-sm">
                {followupsData.call_bck_DateTime.replace("T", " ")}
              </div>
            </div>

            <div className="flex px-2 py-1 bg-gray-100 border-2 items-center rounded-lg">
              <div className="w-2/4 text-gray-500 text-sm">Segment</div>
              <div className="w-2/4 font-medium text-sm">
                {followupsData.segments.length > 0 &&
                  followupsData.segments
                    .filter((segment) => segment.length > 1)
                    .join(", ")}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <button
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
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
