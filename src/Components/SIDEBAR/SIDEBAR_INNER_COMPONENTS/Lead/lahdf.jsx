import { useState, useEffect } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";
import FollowCircle from "./ChatComponent/FollowCircle";

//external Packages
import axios from "axios";

//Folder Imported
import { tenant_base_url, protocal_url } from "./../../../../Config/config";
import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

export default function Analytics() {
  const [todayFollowup, setTodayFollowup] = useState([]);
  const [followUpGrowthPercentage, setFollowUpGrowthPercentage] = useState("");
  const [followUpPercentageStatus, setFollowUpPercentageStatus] = useState("");
  const bearer_token = localStorage.getItem("token");
  const name = getHostnamePart();



    // Get Today's Follow Up Analytics lists
    const getTodayFollowUpAnalytics = async () => {
      if (!bearer_token) {
        console.log("No token found in localStorage");
        return;
      }
  
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${bearer_token}`,
          },
        };
        const response = await axios.get(
          `${protocal_url}${name}.${tenant_base_url}Analytics/todayfollowup/byusertoken`,
          config
        );
  
        if (response.status === 200) {
          const sales = response.data;
          console.log("SalesData", sales);
          setTodayFollowup(sales?.data);
        }
      } catch (error) {
        console.error("Error fetching analytics", error);
      }
    };

  useEffect(() => {
    getTodayFollowUpAnalytics();
  }, []);


  useEffect(() => {
    if (todayFollowup) {
      console.log("Total Sales", todayFollowup);
      const growthPercentage = calculatefollowUpGrowthPercentage(
        todayFollowup.todayFollowupAmount,
        todayFollowup.previousDaySalesAmount
      );
      console.log("Growth Percentage:", growthPercentage + "%");
      setFollowUpGrowthPercentage(growthPercentage);
      if (
        todayFollowup.todayFollowupAmount -
          todayFollowup.previousDaySalesAmount >
        0
      ) {
        setFollowUpPercentageStatus("Plus");
        console.log("True");
      } else {
        setFollowUpPercentageStatus("Minus");
        console.log("False");
      }
    }
  }, [todayFollowup]);

  const calculatefollowUpGrowthPercentage = (current, previous) => {
    if (previous === 0) {
      return current > 0 ? 100 : 0;
    }
    const growth = ((current - previous) / previous) * 100;
    return growth.toFixed(2);
  };



  return (
    <main className="min-h-screen flex flex-col my-3 gap-1 mx-1">
      {/* ------------ TOP SECTION ------------ */}
      <div className="flex items-center px-2 gap-3">
        {/* ------------ CARD ------------ */}
        <div className="flex flex-col bg-white py-2 px-2 rounded-md shadow-lg w-1/4">
          {/* ------------ CARD ------------ */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-[5px]">
              <h1>Today&apos;s Follow Up</h1>
              <strong>{todayFollowup.todayFollowupAmount}</strong>
              <button 
               className={
                followUpPercentageStatus === "Plus"
                  ? "flex items-center justify-start gap-1 px-1 py-1 bg-green-100 w-max rounded-md"
                  : "flex items-center justify-start gap-1 px-1 py-1 bg-red-100 w-max rounded-md"
              }
              >
                <FaArrowAltCircleUp 
                  style={{
                    transform:
                    followUpPercentageStatus === "Minus"
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                  }}
                />
                <span>{followUpGrowthPercentage}%</span>
              </button>
            </div>
            {/* ------------ CIRCLE ------------ */}
            <FollowCircle 
             followUpGrowthPercentage={followUpGrowthPercentage}
             color={followUpPercentageStatus === "Plus" ? "green" : "red"} // Color based on growth status
            />
          </div>
        </div>
        
      </div>
    
    </main>
  );
}
