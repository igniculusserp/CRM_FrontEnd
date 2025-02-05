//Brokerage&Leads

//react
import { useState, useEffect } from "react";

//react_icons
import { LuIndianRupee } from "react-icons/lu";

//charts
import FirstChart from "./ChatComponent/FirstChart";
import BottomChart from "./ChatComponent/BottomChart";
import Circle from "./ChatComponent/Circle";
import SalesCircle from "./ChatComponent/SalesCircle";
import FollowCircle from "./ChatComponent/FollowCircle";
import TeamCircle from "./ChatComponent/TeamCircle";

//react-icons
import { FaArrowAltCircleUp } from "react-icons/fa";
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

  //token
  const bearer_token = localStorage.getItem("token");

  //host
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
    <main className="grid min-h-screen gap-1 mx-1 my-3">
      {/* ------------ TOP SECTION ------------ */}
      {/* ------------ CARD ->>>Parent : 4 Childs<<<- ------------ */}
      <div className="grid items-center grid-cols-4 gap-3 px-2 ">
        
      {/* ------------ CARD ->>> Child : 1 <<<- ------------ */}
        <div className="px-2 py-2 bg-white rounded-md shadow-md ">
          {/* ------------ Inner ------------ */}
          <div className="grid items-center justify-between grid-cols-2">
            {/* ------------ Textual Data ------------ */}
            <div className="grid grid-flow-row-dense gap-2 ">
              {/* ------------ Heading ------------ */}
              <h1 className="text-sm ">
                {/* Total Sales */}
                {business === "Brokerage" ? "TOTAL FUNDS" : "TOTAL SALES"}
              </h1>
              {/* ------------ Button ------------ */}
              <div className="flex items-center ">
                <LuIndianRupee />
                <span className="font-semibold">{totalSales.currentMonthSalesAmount}</span>
              </div>
              {/* ------------ Circle-Bar ------------ */}
              <div
                className={
                  percentageStatus === "Plus"
                    ? "flex items-center justify-center gap-1 rounded-md bg-green-500 shadow-sm shadow-green-700 px-1 py-1 min-w-20 max-w-24"
                    : "flex items-center justify-center gap-1 rounded-md bg-red-500 shadow-sm shadow-red-700 px-1 py-1 min-w-20 max-w-24"
                }
              >
                <FaArrowAltCircleUp
                  className="text-white"
                  style={{
                    transform:
                      percentageStatus === "Minus"
                        ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
                <span className="text-white">{growthPercentage}%</span>
              </div>
            </div>
            <div className="flex items-center justify-end">
              {/* ------------ CIRCLE CHART ------------ */}
              <Circle
                growthPercentage={growthPercentage}
                color={percentageStatus === "Plus" ? "green" : "red"} // Color based on growth status
              />
            </div>
          </div>
        </div>
        {/* ------------------------------------------------------------------------------------------------ */}
        
        {/* ------------ CARD ->>> Child :2 <<<- ------------ */}
        <div className="px-2 py-2 bg-white rounded-md shadow-md ">
          {/* ------------ CARD ------------ */}
           {/* ------------ Inner ------------ */}
           <div className="grid items-center justify-between grid-cols-2">
           {/* ------------ Textual Data ------------ */}
           <div className="grid grid-flow-row-dense gap-2 ">
             {/* ------------ Heading ------------ */}
             <h1 className="text-sm ">
                {business === "Brokerage" ? "TODAY'S FUND" : "TODAY'S SALE"}
              </h1>

                {/* ------------ Amount ------------ */}
                <div className="flex items-center ">
                <LuIndianRupee />
                <span className="font-semibold">{todaySales.todaySalesAmount}</span>
              </div>
              
              <button
                className={
                  todaysPercentageStatus === "Plus"
                     ? "flex items-center justify-center gap-1 rounded-md bg-green-500 shadow-sm shadow-green-700 px-1 py-1 min-w-20 max-w-24"
                    : "flex items-center justify-center gap-1 rounded-md bg-red-500 shadow-sm shadow-red-700 px-1 py-1 min-w-20 max-w-24"
                }
              >
                <FaArrowAltCircleUp
                className="text-white"
                  style={{
                    transform:
                      todaysPercentageStatus === "Minus"
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                  }}
                />
                <span className="text-white">{todaysGrowthPercentage}%</span>
              </button>
            </div>
            {/* ------------ CIRCLE ------------ */}
            <div className="flex items-center justify-end">
            <SalesCircle
              todaysGrowthPercentage={todaysGrowthPercentage}
              color={todaysPercentageStatus === "Plus" ? "green" : "red"} // Color based on growth status
            />
          </div>
          </div>
        </div>

         {/* ------------------------------------------------------------------------------------------------ */}
        
         {/* ------------ CARD ->>> Child :3 <<<- ------------ */}
         <div className="px-2 py-2 bg-white rounded-md shadow-md ">
         {/* ------------ CARD ------------ */}
          {/* ------------ Inner ------------ */}
          <div className="grid items-center justify-between grid-cols-2">
          {/* ------------ Textual Data ------------ */}
          <div className="grid grid-flow-row-dense gap-2 ">
            {/* ------------ Heading ------------ */}
            <h1 className="text-sm ">FOLLOW UP</h1>
            <span>{todayFollowup.todayFollowup}</span>
            
            {/* ------------ Button ------------ */}
              <div
                className={
                  followUpPercentageStatus === "Plus"
                  ? "flex items-center justify-center gap-1 rounded-md bg-green-500 shadow-sm shadow-green-700 px-1 py-1 min-w-20 max-w-24"
                  : "flex items-center justify-center gap-1 rounded-md bg-red-500 shadow-sm shadow-red-700 px-1 py-1 min-w-20 max-w-24"
              }
              >
                <FaArrowAltCircleUp
                className="text-white"
                  style={{
                    transform:
                      followUpPercentageStatus === "Minus"
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                  }}
                />
                {/* ------------ Count ------------ */}
                <span className="text-white">{followUpGrowthPercentage}%</span>
              </div>
            </div>
            {/* ------------ Graph ------------ */}
            <div className="flex items-center justify-end">
            <FollowCircle
              followUpGrowthPercentage={followUpGrowthPercentage}
              color={followUpPercentageStatus === "Plus" ? "green" : "red"} // Color based on growth status
            />
            </div>
          </div>
        </div>
          {/* ------------------------------------------------------------------------------------------------ */}
          
        {/* ------------ CARD ->>> Child :3 <<<- ------------ */}
        <div className="px-2 py-2 bg-white rounded-md shadow-md ">
         {/* ------------ Inner ------------ */}
         <div className="grid items-center justify-between grid-cols-2">
         {/* ------------ Textual Data ------------ */}
         <div className="grid grid-flow-row-dense gap-2 ">
           {/* ------------ Heading ------------ */}
           <h1 className="text-sm ">TEAM MEMBER</h1>
           
           {/* ------------ COUNT ------------ */}
           <strong>10</strong>

           {/* ------------ Button ------------ */}
              <button className="flex items-center justify-center gap-1 px-1 py-1 bg-green-500 rounded-md shadow-sm shadow-green-700 min-w-20 max-w-24">
                <FaArrowAltCircleUp className="text-white" />
                <span className="text-white">73%</span>
              </button>
              
            </div>
            <div className="flex items-center justify-end">
            {/* ------------ Circle-Bar ------------ */}
            <TeamCircle />
          </div>
          </div>
        </div>
      </div>
      
      
      
      
      {/* ------------ 4 GRAPH SECTION ------------ */}
      <div className="grid gap-3 m-3 sm:grid-cols-2 ">
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

      
      <div className="grid grid-cols-1 gap-3 mx-3 sm:grid-cols-2">
        <BottomChart text={`Leads By Stage`} color={`#2B6CB0`} />
        <BottomChart text={`Sales By Stage`} color={`#34d399`} />
      </div>
    </main>
  );
}
