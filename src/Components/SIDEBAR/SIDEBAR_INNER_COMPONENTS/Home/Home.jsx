//react
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for navigation

//external
import axios from "axios";

//reactIcons
import { ImCancelCircle } from "react-icons/im";
import { FaArrowAltCircleDown, FaArrowAltCircleUp, FaUsers } from "react-icons/fa";
import { LuIndianRupee } from "react-icons/lu";
import { MdOutlineGroups2 } from "react-icons/md";
import { GiHumanPyramid } from "react-icons/gi";
import { FaUsersRectangle } from "react-icons/fa6";
import { GrContactInfo } from 'react-icons/gr';


//Chart
import SalesPipelineChart from "./homeComponents/SalesPipelineChart";
import LeadSourceChart from "./homeComponents/LeadSourceChart";
import SalesReportChart from "./homeComponents/SalesReportChart";
import CustomerSegmentationChart from "./homeComponents/CustomerSegmentationChart";

//imports
import { tenant_base_url, protocal_url } from "../../../../Config/config";
import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

export default function Home() {
  const bearer_token = localStorage.getItem("token");
  const name = getHostnamePart();

  //------- Business Type --------
  const businessType = localStorage.getItem("businessType");
  const [business, setBusiness] = useState("");

  //
  const navigate = useNavigate();

  //
  const [salesData, setSalesData] = useState([]);
  const [leadsData, setLeadsData] = useState([]);
  const [kycData, setKycData] = useState([]);
  const [data, setData] = useState([]);

  //
  const [targetAchievedData, setTargetAchievedData] = useState([]);

  // ------------- GET TARGET API -------------
  const fetchTargetData = async () => {
    const token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const targetRes = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Report/targetreports/byusertoken`,
        config
      );

      const res = targetRes?.data?.data;
      setData(res);
      console.log(data);
    } catch (err) {
      console.log("Error while fetching target api", err);
    }
  };

  // ------------- GET TARGET API -------------
  const fetchTargetAchievedData = async () => {
    const token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const targetAchievedRes = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Report/brokaragetreports/byusertoken`,
        config
      );

      const targetAchievedDat = targetAchievedRes?.data?.data;

      setTargetAchievedData(targetAchievedDat);
      console.log(targetAchievedData);
      // console.log(targetAchievedRes?.data?.data)
    } catch (err) {
      console.log("Error while fetching target api", err);
    }
  };

  // TO FETCH DATA WHEN COMPONENT RENDERS AT FIRST
  useEffect(() => {
    fetchTargetData();
    fetchTargetAchievedData();
  }, []);

  //ByPass OTP -> CHECK 
  const checkStoredOtp = () => {
    const storedOtp = localStorage.getItem("otp"); // Retrieve OTP from localStorage
    if (!storedOtp || storedOtp.length !== 6) {
      navigate("/tenantloginOTP"); // Redirect if OTP is not valid or doesn't have 6 characters
    }
  };
  //----------calling data in effect-----------
  useEffect(() => {
    checkStoredOtp();
    handleGetApis();
    //------- Business Type --------
    console.log("Bussiness Type Dash Board : ", businessType);
    setBusiness(businessType);
  }, [navigate]);

  //------------------------------------------------------------------------------------------------
  //----------------GET----------------
  async function handleGetApis() {
    const bearer_token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };

      // First API call: current month sales report
      const reportRes = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Report/currrentmonthSales/report`,
        config
      );
      const reportData = reportRes.data.data;
      setSalesData(reportData?.salesData); // Set sales data after the first API call is complete

      // Second API call: current month leads report
      const leadRes = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Report/currentmonthLeads/report`,
        config
      );
      const leadData = leadRes.data.data;
      setLeadsData(leadData); // Set leads data after the second API call is complete

      // Third API call: current month leads report
      const kycRes = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Report/currentmonthKYC/report`,
        config
      );
      const Kyc = kycRes.data.data;
      setKycData(Kyc); // Set KYC data after the Third API call is complete
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  //------------ Destructure salesData with fallback values to prevent null or undefined issues-----------------
  const {
    currentMonthSales = 0,
    previousMonthSales = 0,
    currentMonthClientCount = 0,
    previousMonthClientCount = 0,
  } = salesData || {};

  //----------------Calculate percentage increase for clients-----------------
  const clientPercentageChange =
    previousMonthClientCount === 0
      ? currentMonthClientCount * 100
      : ((currentMonthClientCount - previousMonthClientCount) /
        previousMonthClientCount) *
      100;
  //---------------------last month diffrence-------------------------

  const clientDiffrence = currentMonthClientCount - previousMonthClientCount;

  //-------------------------- Calculate percentage increase for revenue-----------------------------
  const revenuePercentageChange =
    previousMonthSales === 0
      ? currentMonthSales * 100
      : ((currentMonthSales - previousMonthSales) /
        previousMonthSales) *
      100;

  //---------------------last month diffrence-------------------------
  const revenueDiffrence = currentMonthSales - previousMonthSales;

  //-------------------------- Determine increase or decrease status for revenue and sales--------------------------
  const revenueStatus = revenuePercentageChange > 0 ? "up" : "down";
  const clientStatus = clientPercentageChange > 0 ? "up" : "down";

  //----------------------for leads and intrested leads-----------------------------
  const {
    currentMonthLeads = 0,
    previousMonthLeads = 0,
    currentMonthInterestedLeads = 0,
    previousMonthInterestedLeads = 0,
  } = leadsData || {};

  //----------------Calculate percentage increase for leads-----------------

  const leadsPercentage =
    previousMonthLeads === 0
      ? currentMonthLeads * 100
      : ((currentMonthLeads - previousMonthLeads) /
        previousMonthLeads) *
      100;
  //---------------------last month diffrence-------------------------
  const leadsDiffrence = currentMonthLeads - previousMonthLeads;

  //-------------------------- Calculate percentage increase for intrested leads-----------------------------
  const intrestedPercentageChange =
    previousMonthInterestedLeads === 0
      ? currentMonthInterestedLeads * 100 // Multiply current leads directly by 100 if no previous leads.
      : ((currentMonthInterestedLeads - previousMonthInterestedLeads) /
        previousMonthInterestedLeads) *
      100;
  const intrestedLeadsDiffrence =
    currentMonthInterestedLeads - previousMonthInterestedLeads;
  //-------------------------- Determine increase or decrease status for leads and intrested leads--------------------------


  const leadStatus = leadsPercentage > 0 ? "up" : "down";
  const intrestedLeadStatus = intrestedPercentageChange > 0 ? "up" : "down";


  //------------ Destructure KYC with fallback values to prevent null or undefined issues-----------------


  const currentMonthKYC = kycData.currentMonthKYC;
  const previousMonthKYC = kycData.previousMonthKYC;


  //----------------Calculate percentage increase for clients-----------------
  const kycPercentageChange =
    previousMonthKYC === 0
      ? currentMonthKYC * 100
      : ((currentMonthKYC - previousMonthKYC) /
        previousMonthKYC) *
      100;
  //---------------------last month diffrence-------------------------
  const kycDiffrence = currentMonthKYC - previousMonthKYC;

  //-------------------------- Determine increase or decrease status for revenue and sales--------------------------
  const kycStatus = kycPercentageChange > 0 ? "up" : "down";

  // ------------ DATA FUNCTIONALITY STARTS FROM HERE ------------
  const [remainingDays, setRemainingDays] = useState(0);
  const [showSubscription, setShowSubscription] = useState(true);

  const user = JSON.parse(localStorage.getItem("userDetail"));
  // USERNAME
  const firstName = user?.userDetail?.firstName;

  useEffect(() => {
    if (!user?.tenantCreationDate) return;

    const subscriptionStartDate = new Date(user.tenantCreationDate);
    const subscriptionEndDate = new Date(subscriptionStartDate);
    subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);

    const calculateRemainingDays = () => {
      const today = new Date();
      const timeDifference =
        Date.UTC(
          subscriptionEndDate.getFullYear(),
          subscriptionEndDate.getMonth(),
          subscriptionEndDate.getDate()
        ) - Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
      const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      return days > 0 ? days : 0;
    };

    setRemainingDays(calculateRemainingDays());

    // Schedule the next update at midnight
    const now = new Date();
    const timeUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;

    const timeout = setTimeout(() => {
      setRemainingDays(calculateRemainingDays());
    }, timeUntilMidnight);

    return () => clearTimeout(timeout);
  }, [user]);

  //------------------------------------------------------ Get API ----------------------------------------------------

  const [totalBrokerage, setTotalBrokerage] = useState(0);
  const [targetAchieved, setTargetAchieved] = useState(0);

  const getDetails = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Report/brokaragetreports/byusertoken`,
        config
      );
      if (response.status === 200) {
        const Details = response.data.data.totalBrokerage;
        setTargetAchieved(Details);
        console.log("Target Achieved", Details);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getAchieveDetails = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Report/targetreports/byusertoken`,
        config
      );
      if (response.status === 200) {
        const Details = response.data.data.totalTarget;
        setTotalBrokerage(Details);
        console.log("Total Target", Details);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getDetails();
    getAchieveDetails();
  }, []);

  const Remain = totalBrokerage - targetAchieved;

  return (
    <>
      <div className="min-h-screen flex flex-col gap-1 ">
        {showSubscription && (
          <div className="
            flex items-center justify-between 
            bg-white 
            shadow-md 
            border-t-2 
            transition transform duration-500 ease-in-out animate-fade-in animate-slide-down 
            text-white 
            py-2 px-3
            "
          >
            <div className="flex flex-col justify-start">
              {/*Condition if reamining days are less than 5  */}
              <h1
                className={`${remainingDays < 5 ? "text-red-500" : "text-gray-700"
                  } text-xl font-semibold`}
              >
                Clock is ticking! {remainingDays} day&apos;s are left in your
                trail.
              </h1>
              <p className="text-xs font-semibold text-gray-500">
                Pick a perfect plan for your business needs before your trial
                period gets over.
              </p>
            </div>
            {/* SECOND */}
            <div className="flex items-center gap-4">
              <Link to="/panel/subscription/">
                <button className="cursor-pointer py-2 bg-cyan-500 text-white text-sm rounded-md px-2 border-none font-semibold hover:shadow-md">
                  Choose Plan
                </button>
              </Link>
              <Link to="/panel" onClick={() => setShowSubscription(false)}>
                <ImCancelCircle color="red" size={25} />
              </Link>
            </div>
          </div>
        )}
        {/* FIRST NAME */}
        <h1 className="text-2xl sm:text-3xl my-2 font-semibold text-gray-700 px-3 pb-1">
          Hello, {firstName || ""}
        </h1>
        {/* ------- TOP CARDS ------- */}
        {/* ------- 4 Card, Charo ki alag alag CSS {Parent}  ------- */}
        <div className="sm:grid sm:grid-cols-2 items-center px-2 sm:gap-3 gap-2 grid grid-cols-2 lg:flex">
          {/* ------- CARD --> CHILD:1------- */}
          <div className="flex flex-col justify-between bg-white p-2 sm:p-4 sm:gap-4 rounded-md shadow-lg sm:min-h-52 h-44 md:w-4/4  lg:w-1/4">
            <div className="flex flex-col">
              { }
              <h1 className="font-light uppercase text-sm font-medium	">
                {business === "Brokerage" ? "Leads" : "Lead this month"}
              </h1>
              {/* ------- CARD--> 1 ---> Logo and SideText --> Parent ----------- */}
              <div className="flex items-center justify-between mt-2  ">

                {/* ------- CARD--> 1 ---> Logo --> C1 ----------- */}
                <div className=" px-2 h-12 w-12 sm:h-20 sm:w-20 rounded-full bg-teal-500 text-white flex items-center justify-center">
                  {/* ------- CARD--> 1 ---> Logo --> C1 ----------- */}
                  <GrContactInfo className="text-2xl sm:text-5xl " />
                </div>
                {/* ------- CARD--> 1 ---> SideText --> Parent --> {top-bottom TEXTS}  C2 ----------- */}
                <div className="flex flex-col items-center justify-center gap-1 ">

                  <span className="text-lg font-semibold sm:text-xl sm:font-bold">
                    {currentMonthLeads}
                  </span>

                  <div
                    className={`
                      flex items-center gap-1 p-1 rounded-lg
                      ${leadStatus == "up" ? "bg-green-200" : "bg-red-200"}
                    `}
                  >
                    {leadStatus == "up" ? (
                      <FaArrowAltCircleUp className="text-sm" />
                    ) : (
                      <FaArrowAltCircleDown className="text-sm" />
                    )}
                    <span className="text-sm sm:text-md">{Math.round(leadsPercentage)}%</span>

                  </div>
                </div>
              </div>
            </div>
            {/* ------- CARD--> 1 ---> PROGRESS BAR  --> C3 ----------- */}
            <div className="h-2 w-full bg-transparent border border-gray-500 rounded-lg ">
              <div
                className={`h-full ${leadStatus == "up" ? "bg-blue-600" : "bg-red-500"
                  }`}
                style={{
                  maxWidth: `${Math.abs(Math.round(leadsPercentage))}%`,
                }}
              ></div>
            </div>
            {/* ------- CARD--> 1 ---> Last Line{Text}--> C4 ----------- */}
            <h3 className="font-light text-sm">
              Last Month Relative:{" "}
              <span className="text-sm">{leadsDiffrence}</span>
            </h3>
          </div>
          {/* ---------------------------------------------------------------------------------------------------------------- */}
          {/* ------- CARD --> CHILD:2 ------- */}
          <div className="flex flex-col justify-between bg-white p-2 sm:p-4 sm:gap-4 rounded-md shadow-lg sm:min-h-52 h-44  md:w-4/4  lg:w-1/4">
            <div className="flex flex-col">
              <h1 className="font-light uppercase text-sm font-medium">
                {business === "Brokerage" ? "Funds" : "REVENUE THIS MONTH"}
              </h1>
              {/* ------- CARD--> 2 ---> Logo and SideText --> Parent ----------- */}
              <div className="flex items-center justify-between mt-2">
                {/* ------- CARD--> 2 ---> Logo --> C1 ----------- */}
                <div className="px-2 h-12 w-12 sm:h-20 sm:w-20 rounded-full bg-rose-500 text-white flex items-center justify-center">
                  <LuIndianRupee className="text-2xl sm:text-5xl " />
                </div>
                {/* ------- CARD--> 2 ---> SideText --> Parent --> {top-bottom TEXTS}  C2 ----------- */}
                <div className="flex flex-col items-center justify-center gap-1 ">
                  <span className="text-lg font-semibold sm:text-xl sm:font-bold">
                    {currentMonthSales}
                  </span>

                  <div
                    className={`
                  flex items-center gap-1 p-1 rounded-lg
                  ${leadStatus == "up" ? "bg-green-200" : "bg-red-200"}
                `}
                  >
                    {leadStatus == "up" ? (
                      <FaArrowAltCircleUp className="text-sm" />
                    ) : (
                      <FaArrowAltCircleDown className="text-sm" />
                    )}
                    <span className="text-sm sm:text-md">{Math.round(leadsPercentage)}%</span>

                  </div>
                </div>
              </div>
            </div>
            {/* ------- CARD--> 2 ---> PROGRESS BAR  --> C3 ----------- */}
            <div className="h-2 w-full bg-transparent border border-gray-500 rounded-lg ">
              <div
                className={`h-full ${leadStatus == "up" ? "bg-blue-600" : "bg-red-600"
                  }`}
                style={{
                  maxWidth: `${Math.abs(Math.round(leadsPercentage))}%`,
                }}
              ></div>
            </div>
            {/* ------- CARD--> 2 ---> Last Line{Text}--> C4 ----------- */}
            <h3 className="font-light text-sm">
              Last Month Relative:{" "}
              <span className="text-sm">{revenueDiffrence}</span>
            </h3>
          </div>
          {/* ---------------------------------------------------------------------------------------------------------------- */}
          {/* ------- CARD --> CHILD:3------- */}
          <div className="flex flex-col justify-between bg-white p-2 sm:p-4 sm:gap-4 rounded-md shadow-lg sm:min-h-52 h-44 md:w-4/4  lg:w-1/4">
            <div className="flex flex-col">
              { }
              <h1 className="font-light uppercase text-sm font-medium	">
                {business === "Brokerage" ? "KYC" : "CLIENT THIS MONTH"}
              </h1>
              {/* ------- CARD--> 3 ---> Logo and SideText --> Parent ----------- */}
              <div className="flex items-center justify-between mt-2  ">
                {/* ------- CARD--> 3 ---> Logo --> C1 ----------- */}
                <div className=" px-2 h-12 w-12 sm:h-20 sm:w-20 rounded-full bg-lime-500 text-white flex items-center justify-center">
                  <MdOutlineGroups2 className="text-2xl sm:text-5xl " />
                </div>
                {/* ------- CARD--> 3 ---> SideText --> Parent --> {top-bottom TEXTS}  C2 ----------- */}

                <div className="flex flex-col items-center justify-center gap-1 ">

                  <span className="text-lg font-semibold sm:text-xl sm:font-bold ">

                    {business === "Brokerage" ? currentMonthKYC : currentMonthClientCount}
                  </span>
                  {business === "Brokerage" ?
                    <div
                      className={`
                      flex items-center gap-1 p-1 rounded-lg
                      ${leadStatus == "up" ? "bg-green-200" : "bg-red-200"}
                    `}
                    >
                      {kycStatus == "up" ? (
                        <FaArrowAltCircleUp className="text-sm" />
                      ) : (
                        <FaArrowAltCircleDown className="text-sm" />
                      )}
                      <span className="text-sm sm:text-md">{Math.round(kycPercentageChange)}%</span>
                    </div>
                    :
                    <div
                      className={`
                    flex items-center gap-1 p-1 rounded-lg
                    ${leadStatus == "up" ? "bg-green-200" : "bg-red-200"}
                  `}
                    >
                      {clientStatus == "up" ? (
                        <FaArrowAltCircleUp className="text-sm" />
                      ) : (
                        <FaArrowAltCircleDown className="text-sm" />
                      )}
                      <span className="text-sm sm:text-md">{Math.round(clientPercentageChange)}%</span>
                    </div>
                  }

                </div>
              </div>
            </div>
            {/* ------- CARD--> 3  --> PROGRESS BAR  --> C3 ----------- */}
            <div className="h-2 w-full bg-transparent border border-gray-500 rounded-lg ">
              {business === "Brokerage" ?
                <div
                  className={`h-full ${clientStatus == "up" ? "bg-blue-600" : "bg-red-600"
                    }`}
                  style={{
                    maxWidth: `${Math.abs(Math.round(kycPercentageChange))}%`,
                  }}
                ></div>
                :
                <div
                  className={`h-full ${clientStatus == "up" ? "bg-blue-600" : "bg-red-600"
                    }`}
                  style={{
                    maxWidth: `${Math.abs(Math.round(clientPercentageChange))}%`,
                  }}
                >
                </div>
              }

            </div>
            <h3 className="font-light text-sm">
              Last Month Relative:{" "}
              {business === "Brokerage" ?
                <span className="text-sm">{kycDiffrence}</span>
                :
                <span className="text-sm">{clientDiffrence}</span>
              }

            </h3>
          </div>
          {/* ---------------------------------------------------------------------------------------------------------------- */}
          {/* ------- CARD --> CHILD -> 4 ------- */}
          <div className="flex flex-col justify-between bg-white p-2 sm:p-4 sm:gap-4 rounded-md shadow-lg sm:min-h-52 h-44 md:w-4/4  lg:w-1/4">
            <div className="flex flex-col">
              { }
              <h1 className="font-light uppercase text-sm font-medium	">
                {business === "Brokerage"
                  ? "Interested Clients"
                  : "SALES IN PIPELINE"}
              </h1>
              {/* ------- CARD--> 4 ---> Logo and SideText --> Parent ----------- */}
              <div className="flex items-center justify-between mt-2  ">
                <div className=" px-2 h-12 w-12 sm:h-20 sm:w-20 rounded-full bg-sky-500 text-white flex items-center justify-center">
                {/* ------- CARD--> 4 ---> Logo --> C1 ----------- */}
                  <GiHumanPyramid className="text-2xl sm:text-5xl  " />
                </div>
                {/* ------- CARD--> 4 ---> SideText --> Parent --> {top-bottom TEXTS}  C2 ----------- */}

                
                <div className="flex flex-col items-center justify-center gap-1 ">

                
                <span className="text-lg font-semibold sm:text-xl sm:font-bold">
                {currentMonthInterestedLeads}
              </span>

                  <button
                    className={`
                      flex items-center gap-1 p-1 rounded-lg
                      ${leadStatus == "up" ? "bg-green-200" : "bg-red-200"}
                    `}
                  >
                    {intrestedLeadStatus == "up" ? (
                      <FaArrowAltCircleUp className="text-sm"  />
                    ) : (
                      <FaArrowAltCircleDown className="text-sm"  />
                    )}
                    <span className="text-sm sm:text-md">{Math.round(intrestedPercentageChange)}%</span>
                  </button>
                </div>
              </div>
            </div>
            {/* ------- CARD--> 4 ---> PROGRESS BAR  --> C3 ----------- */}
             {/* ------- CARD--> 4 ---> PROGRESS BAR  --> C3 ----------- */}
             <div className="h-2 w-full bg-transparent border border-gray-500 rounded-lg ">
             <div
               className={`h-full ${leadStatus == "up" ? "bg-blue-600" : "bg-red-500"
                 }`}
               style={{
                 maxWidth: `${Math.abs(Math.round(leadsPercentage))}%`,
               }}
             ></div>
           </div>
           {/* ------- CARD--> 1 ---> Last Line{Text}--> C4 ----------- */}
           <h3 className="font-light text-sm">
             Last Month Relative:{" "}
             <span className="text-sm">{intrestedLeadsDiffrence}</span>
           </h3>
         </div>
        </div>
          {/* ---------------------------------------------------------------------------------------------------------------- */}

        <div className="sm:flex gap-3 m-2 grid grid-cols-1">
          <div className="flex-4 flex flex-col bg-white py-4 px-4 rounded-md shadow-md sm:w-96 w-full  justify-between">
            <h1 className="font-normal text-xl">
              {business === "Brokerage" ? "Brokerage" : "Custom Segmentation"}
            </h1>
            <div className="flex items-center flex-col gap-2">
              <CustomerSegmentationChart
                totalBrokerage={totalBrokerage}
                businessType={businessType}
                targetAchieved={targetAchieved}
              />
              {businessType === "Brokerage" ? (
                <>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-3 bg-orange-600"></div>
                      <span className="text-sm">Total Target</span>
                    </div>
                    <div className="flex gap-1">
                      <span className="text-sm text-gray-700">
                        {totalBrokerage}
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-3 bg-green-300"></div>
                      <span className="text-sm">
                        Traget Achieved (Brokerage)
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <span className="text-sm text-gray-700">
                        {targetAchieved}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-3 bg-orange-600"></div>
                      <span className="text-sm">Small Business</span>
                    </div>
                    <div className="flex gap-1">
                      <span className="text-sm text-gray-700">1.650</span>
                      <span className="text-green-400 text-sm">↑ 424</span>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-3 bg-orange-300"></div>
                      <span className="text-sm">Enterprise</span>
                    </div>
                    <div className="flex gap-1">
                      <span className="text-sm text-gray-700">1.650</span>
                      <span className="text-green-400 text-sm">↑ 424</span>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-3 bg-blue-600"></div>
                      <span className="text-sm">Company</span>
                    </div>
                    <div className="flex gap-1">
                      <span className="text-sm text-gray-700">1.650</span>
                      <span className="text-green-400 text-sm">↑ 424</span>
                    </div>
                  </div>
                </>
              )}

              <h2 className="font-bold">
                Remaining:{" "}
                {businessType === "Brokerage"
                  ? Remain <= 0
                    ? "0"
                    : Remain
                  : "900"}
              </h2>
            </div>
          </div>
          {/* ------- PROGRESS CARD ------- */}
          <div className="flex-1 flex flex-col bg-white rounded-md shadow-md px-4 py-4 justify-between ">
            <SalesReportChart
              businessType={businessType}
              totalBrokerage={totalBrokerage}
              targetAchieved={targetAchieved}
            />
          </div>
        </div>
        {/* ------- BOTTOM CARDS ------- */}
        {business === "Brokerage" ? (
          ""
        ) :
          (
          <div className="sm:flex gap-3 mx-2 md:grid md:grid-cols-1 gap-3">
            {/* ------- BOTTOM CARD ------- */}
            <div className="flex  flex-col bg-white shadow-sm py-6 px-3 rounded-md">
              <SalesPipelineChart />
            </div>
            {/* ------- BOTTOM CARD ------- */}
            <div className="flex  py-4 px-4 gap-4  bg-blue-50 rounded-md shadow-md mt-3 h-[400px] mb-4">
              <LeadSourceChart />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
