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
  //------- Business Type --------
  const businessType = localStorage.getItem("businessType");
  const [business, setBusiness] = useState("");
  //------------------- Total Sales ---------------------
  const [totalSales, setTotalSales] = useState([]);
  const [growthPercentage, setGrowthPercentage] = useState("");
  const [percentageStatus, setPercentageStatus] = useState("");
  //------------------- Today's Sales ---------------------
  const [todaySales, setTodaySales] = useState([]);
  const [todaysGrowthPercentage, setTodaysGrowthPercentage] = useState("");
  const [todaysPercentageStatus, setTodaysPercentageStatus] = useState("");
  //------------------- Today's Follow Up ---------------------
  const [todayFollowup, setTodayFollowup] = useState([]);
  const [followUpGrowthPercentage, setFollowUpGrowthPercentage] = useState("");
  const [followUpPercentageStatus, setFollowUpPercentageStatus] = useState("");

  const bearer_token = localStorage.getItem("token");
  const name = getHostnamePart();

  // Get Total Sales Analytics lists
  const getTotalSaleAnalytics = async () => {
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
        config,
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

  // Get Today's Sales Analytics lists
  const getTodaySaleAnalytics = async () => {
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
        `${protocal_url}${name}.${tenant_base_url}/Analytics/todaytotalsales/byusertoken`,
        config,
      );

      if (response.status === 200) {
        const sales = response.data;
        console.log("SalesData", sales);
        setTodaySales(sales?.data);
      }
    } catch (error) {
      console.error("Error fetching analytics", error);
    }
  };

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
        `${protocal_url}${name}.${tenant_base_url}/Analytics/todayfollowup/byusertoken`,
        config,
      );

      if (response.status === 200) {
        const sales = response.data;
        console.log("todayfollowup", sales);
        setTodayFollowup(sales?.data);
      }
    } catch (error) {
      console.error("Error fetching analytics", error);
    }
  };

  useEffect(() => {
    getTotalSaleAnalytics();
    getTodaySaleAnalytics();
    getTodayFollowUpAnalytics();
    //------- Business Type --------
    console.log("Bussiness Type Dash Board : ", businessType);
    setBusiness(businessType);
  }, []);

  useEffect(() => {
    if (totalSales) {
      console.log("Total Sales", totalSales);
      const growthPercentage = calculateGrowthPercentage(
        totalSales.currentMonthSalesAmount,
        totalSales.previousMonthSalesAmount,
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
    if (todaySales) {
      console.log("Total Sales", todaySales);
      const growthPercentage = calculateTodaysGrowthPercentage(
        todaySales.todaySalesAmount,
        todaySales.previousDaySalesAmount,
      );
      console.log("Growth Percentage:", growthPercentage + "%");
      setTodaysGrowthPercentage(growthPercentage);
      if (todaySales.todaySalesAmount - todaySales.previousDaySalesAmount > 0) {
        setTodaysPercentageStatus("Plus");
        console.log("True");
      } else {
        setTodaysPercentageStatus("Minus");
        console.log("False");
      }
    }
  }, [todaySales]);

  const calculateTodaysGrowthPercentage = (current, previous) => {
    if (previous === 0) {
      return current > 0 ? 100 : 0;
    }
    const growth = ((current - previous) / previous) * 100;
    return growth.toFixed(2);
  };

  useEffect(() => {
    if (todayFollowup) {
      console.log("Total Sales", todayFollowup);
      const growthPercentage = calculatefollowUpGrowthPercentage(
        todayFollowup.todayFollowup,
        todayFollowup.previousDayFollowup,
      );
      console.log("Growth Percentage:", growthPercentage + "%");
      setFollowUpGrowthPercentage(growthPercentage);
      if (todayFollowup.todayFollowup - todayFollowup.previousDayFollowup > 0) {
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
    <main className="mx-1 my-3 flex min-h-screen flex-col gap-1">
      {/* ------------ TOP SECTION ------------ */}
      <div className="flex items-center gap-3 px-2">
        {/* ------------ CARD ------------ */}
        <div className="flex w-1/4 flex-col rounded-md bg-white px-2 py-2 shadow-lg">
          {/* ------------ CARD ------------ */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-[5px]">
              <h1>
                {/* Total Sales */}
                {business === "Brokerage" ? "Total Fund" : "Total Sales"}
              </h1>
              <strong>$ {totalSales.currentMonthSalesAmount}</strong>
              <button
                className={
                  percentageStatus === "Plus"
                    ? "flex w-max items-center justify-start gap-1 rounded-md bg-green-100 px-1 py-1"
                    : "flex w-max items-center justify-start gap-1 rounded-md bg-red-100 px-1 py-1"
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
        <div className="flex w-1/4 flex-col rounded-md bg-white px-2 py-2 shadow-lg">
          {/* ------------ CARD ------------ */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-[5px]">
              <h1>
                {/* Today&apos;s Sales */}
                {business === "Brokerage" ? "Today's Fund" : "Today's Sales"}
              </h1>
              <strong>$ {todaySales.todaySalesAmount}</strong>
              <button
                className={
                  todaysPercentageStatus === "Plus"
                    ? "flex w-max items-center justify-start gap-1 rounded-md bg-green-100 px-1 py-1"
                    : "flex w-max items-center justify-start gap-1 rounded-md bg-red-100 px-1 py-1"
                }
              >
                <FaArrowAltCircleUp
                  style={{
                    transform:
                      todaysPercentageStatus === "Minus"
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                  }}
                />
                <span>{todaysGrowthPercentage}%</span>
              </button>
            </div>
            {/* ------------ CIRCLE ------------ */}
            <SalesCircle
              todaysGrowthPercentage={todaysGrowthPercentage}
              color={todaysPercentageStatus === "Plus" ? "green" : "red"} // Color based on growth status
            />
          </div>
        </div>
        {/* ------------ CARD ------------ */}
        <div className="flex w-1/4 flex-col rounded-md bg-white px-2 py-2 shadow-lg">
          {/* ------------ CARD ------------ */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-[5px]">
              <h1>Today&apos;s Follow Up</h1>
              <strong>{todayFollowup.todayFollowup}</strong>
              <button
                className={
                  followUpPercentageStatus === "Plus"
                    ? "flex w-max items-center justify-start gap-1 rounded-md bg-green-100 px-1 py-1"
                    : "flex w-max items-center justify-start gap-1 rounded-md bg-red-100 px-1 py-1"
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
        {/* ------------ CARD ------------ */}
        <div className="flex w-1/4 flex-col rounded-md bg-white px-2 py-2 shadow-lg">
          {/* ------------ CARD ------------ */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-[5px]">
              <h1>Team Member</h1>
              <strong>10</strong>
              <button className="flex w-max items-center justify-start gap-1 rounded-md bg-green-100 px-1 py-1">
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
        <FirstChart
          text={business === "Brokerage" ? `Top 5 SRM` : `Top 5 BA`}
        />
        <FirstChart
          text={business === "Brokerage" ? `Top 5 RM` : `Top 5 SBA`}
        />
        <FirstChart text={`Top 5 TL`} />
        <FirstChart
          text={business === "Brokerage" ? `Top 5 Executive` : `Top SR-TL`}
        />
      </div>
      <div className="mx-3 grid grid-cols-2 gap-3">
        <BottomChart text={`Leads By Stage`} color={`#2B6CB0`} />
        <BottomChart text={`Sales By Stage`} color={`#34d399`} />
      </div>
    </main>
  );
}
