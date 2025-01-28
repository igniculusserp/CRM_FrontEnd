import { useState, useEffect } from "react";
import axios from "axios";
import { tenant_base_url, protocal_url } from "./Config/config";
import { getHostnamePart } from "./Components/SIDEBAR/SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";
import FollowupNotificationModal from "./FollowupNotificationModal";
import moment from "moment";

export default function FollowUpNotificationProvider({ children }) {
  const bearer_token = localStorage.getItem("token");
  const name = getHostnamePart();

  const [isNotification, setIsNotification] = useState(false);
  const [notificationData, setNotificationData] = useState("");
  const [followupList, setFollowupList] = useState([]);

  // Get Follow up lists
  const getFollowupLists = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/FollowUp/byusertoken`,
        config,
      );
      if (response.status === 200) {
        const followup = response.data;
        setFollowupList(followup?.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getFollowupLists();
    const interval = setInterval(() => {
      getFollowupLists();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Notifications
  const openNotification = (id) => {
    if (id) {
      setNotificationData(id);
      setIsNotification(true);
    } else {
      alert("Process Failed");
    }
  };

  const closeNotification = () => {
    setIsNotification(false);
    setNotificationData("");
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = moment(); // Current time using moment.js
      const oneBeforeCurrent = currentTime.clone().subtract(20, "minute");
      const TwoBeforeCurrent = currentTime.clone().subtract(40, "minute");
      const ThreeBeforeCurrent = currentTime.clone().subtract(60, "minute");
      const FourBeforeCurrent = currentTime.clone().subtract(80, "minute");

      followupList.forEach((item) => {
        const callbackTime = moment(item.call_bck_DateTime);
        if (
          currentTime.isSame(callbackTime, "minute") ||
          oneBeforeCurrent.isSame(callbackTime, "minute") ||
          TwoBeforeCurrent.isSame(callbackTime, "minute") ||
          ThreeBeforeCurrent.isSame(callbackTime, "minute") ||
          FourBeforeCurrent.isSame(callbackTime, "minute")
        ) {
          openNotification(item.id);
        }
      });
    }, 35000); // Check every 30 seconds

    return () => clearInterval(intervalId);
  }, [followupList]);

  return (
    <>
      {children}
      {isNotification && (
        <FollowupNotificationModal
          id={notificationData}
          onClose={closeNotification}
        />
      )}
    </>
  );
}
