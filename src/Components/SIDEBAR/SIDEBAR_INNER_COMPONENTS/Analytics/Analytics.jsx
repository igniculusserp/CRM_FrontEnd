import { useState, useEffect } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";
import FirstChart from "./ChatComponent/FirstChart";
import BottomChart from "./ChatComponent/BottomChart";
import Circle from "./ChatComponent/Circle";
import SalesCircle from "./ChatComponent/SalesCircle";
import FollowCircle from "./ChatComponent/FollowCircle";
import TeamCircle from "./ChatComponent/TeamCircle";

//external Packages
import axios from "axios";

//Folder Imported
import { tenant_base_url, protocal_url } from "./../../../../Config/config";
import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

export default function Analytics() {
  const [totalSales, setTotalSales] = useState([]);
  const [growthPercentage, setGrowthPercentage] = useState("");
  const [percentageStatus, setPercentageStatus] = useState("");
  const bearer_token = localStorage.getItem("token");
  const name = getHostnamePart();

  // Get Analytics lists

  // Get Analytics lists
  const getAnalytics = async () => {
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
        `${protocal_url}${name}.${tenant_base_url}/Analytics/totalsales/byusertoken`,
        config
      );

      if (response.status === 200) {
        const sales = response.data;
        console.log("SalesData", sales);
        setTotalSales(sales?.data);
      }
    } catch (error) {
      console.error("Error fetching analytics", error);
    }
  };

  useEffect(() => {
    getAnalytics();
  }, []);

  useEffect(() => {
    if (totalSales) {
      console.log("Total Sales", totalSales);
      const growthPercentage = calculateGrowthPercentage(
        totalSales.currentMonthSalesAmount,
        totalSales.previousMonthSalesAmount
      );
      console.log("Growth Percentage:", growthPercentage + "%");
      setGrowthPercentage(growthPercentage);
      if (
        totalSales.currentMonthSalesAmount -
          totalSales.previousMonthSalesAmount >
        0
      ) {
        setPercentageStatus("Plus");
        console.log("True");
      } else {
        setPercentageStatus("Minus");
        console.log("False");
      }
    }
  }, [totalSales]);

  const calculateGrowthPercentage = (current, previous) => {
    if (previous === 0) {
      return current > 0 ? 100 : 0;
    }
    const growth = ((current - previous) / previous) * 100;
    return growth.toFixed(2);
  };

  useEffect(() => {
    console.log("Updated Percentage Status:", percentageStatus); // Log to check if `percentageStats` updates
  }, [percentageStatus]);

  return (
    <main className="min-h-screen flex flex-col my-3 gap-1 mx-1">
      {/* ------------ TOP SECTION ------------ */}
      <div className="flex items-center px-2 gap-3">
        {/* ------------ CARD ------------ */}
        <div className="flex flex-col bg-white py-2 px-2 rounded-md shadow-lg w-1/4">
          {/* ------------ CARD ------------ */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-[5px]">
              <h1>Total Sales</h1>
              <strong>$ {totalSales.currentMonthSalesAmount}</strong>
              <button
                className={
                  percentageStatus === "Plus"
                    ? "flex items-center justify-start gap-1 px-1 py-1 bg-green-100 w-max rounded-md"
                    : "flex items-center justify-start gap-1 px-1 py-1 bg-red-100 w-max rounded-md"
                }
              >
                <FaArrowAltCircleUp
                  style={{
                    transform:
                      percentageStatus === "Minus"
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                  }}
                />
                <span>{growthPercentage}%</span>
              </button>
            </div>
            {/* ------------ CIRCLE CHART ------------ */}
            <Circle
              growthPercentage={growthPercentage}
              color={percentageStatus === "Plus" ? "green" : "red"} // Color based on growth status
            />
          </div>
        </div>
        {/* ------------ CARD ------------ */}
        <div className="flex flex-col bg-white py-2 px-2 rounded-md shadow-lg w-1/4">
          {/* ------------ CARD ------------ */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-[5px]">
              <h1>Today's Sales</h1>
              <strong>400</strong>
              <button className="flex items-center justify-start gap-1 px-1 py-1 bg-green-100 w-max rounded-md">
                <FaArrowAltCircleUp />
                <span>43%</span>
              </button>
            </div>
            {/* ------------ CIRCLE ------------ */}
            <SalesCircle />
          </div>
        </div>
        {/* ------------ CARD ------------ */}
        <div className="flex flex-col bg-white py-2 px-2 rounded-md shadow-lg w-1/4">
          {/* ------------ CARD ------------ */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-[5px]">
              <h1>Today's Follow Up</h1>
              <strong>10</strong>
              <button className="flex items-center justify-start gap-1 px-1 py-1 bg-green-100 w-max rounded-md">
                <FaArrowAltCircleUp />
                <span>73%</span>
              </button>
            </div>
            {/* ------------ CIRCLE ------------ */}
            <FollowCircle />
          </div>
        </div>
        {/* ------------ CARD ------------ */}
        <div className="flex flex-col bg-white py-2 px-2 rounded-md shadow-lg w-1/4">
          {/* ------------ CARD ------------ */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-[5px]">
              <h1>Team Member</h1>
              <strong>10</strong>
              <button className="flex items-center justify-start gap-1 px-1 py-1 bg-green-100 w-max rounded-md">
                <FaArrowAltCircleUp />
                <span>73%</span>
              </button>
            </div>
            {/* ------------ CIRCLE ------------ */}
            <TeamCircle />
          </div>
        </div>
      </div>
      {/* ------------ BOTTOM SECTION ------------ */}
      <div className="m-3 grid grid-cols-2 grid-rows-2 gap-3">
        <FirstChart text={`Top 5 BA`} />
        <FirstChart text={`Top 5 SBA`} />
        <FirstChart text={`Top 5 TL`} />
        <FirstChart text={`Top SR-TL`} />
      </div>
      <div className="mx-3 grid grid-cols-2 gap-3">
        <BottomChart text={`Leads By Stage`} color={`#2B6CB0`} />
        <BottomChart text={`Sales By Stage`} color={`#34d399`} />
      </div>
    </main>
  );
}
