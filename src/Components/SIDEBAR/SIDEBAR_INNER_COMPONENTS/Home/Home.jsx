import {
  FaArrowAltCircleDown,
  FaArrowAltCircleUp,
  FaUsers,
} from 'react-icons/fa';
import { CiBadgeDollar } from 'react-icons/ci';
import { FcSalesPerformance } from 'react-icons/fc';
import SalesPipelineChart from './homeComponents/SalesPipelineChart';
import LeadSourceChart from './homeComponents/LeadSourceChart';
import SalesReportChart from './homeComponents/SalesReportChart';
import CustomerSegmentationChart from './homeComponents/CustomerSegmentationChart';
import { useEffect, useState } from 'react';

import { tenant_base_url, protocal_url } from '../../../../Config/config';
import { getHostnamePart } from '../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl';
import axios from 'axios';
import { FaUsersRectangle } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

export default function Home() {
  //DND
  const name = getHostnamePart();
  const [salesData, setSalesData] = useState([]);
  const [leadsData, setLeadsData] = useState([]);

  //----------calling data in effect-----------
  useEffect(() => {
    handleGetApis();
  }, []);

  //------------------------------------------------------------------------------------------------
  //----------------GET----------------
  async function handleGetApis() {
    const bearer_token = localStorage.getItem('token');
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
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  //------------ Destructure salesData with fallback values to prevent null or undefined issues-----------------arvind
  const {
    currentMonthSales = 0,
    previousMonthSales = 0,
    currentMonthClientCount = 0,
    previousMonthClientCount = 0,
  } = salesData || {};

  //----------------Calculate percentage increase for clients-----------------
  const clientPercentageChange =
    previousMonthClientCount === 0
      ? currentMonthClientCount > 0
        ? 100
        : 0
      : ((currentMonthClientCount - previousMonthClientCount) /
          previousMonthClientCount) *
        100;
  //---------------------last month diffrence-------------------------
  const clientDiffrence = currentMonthClientCount - previousMonthClientCount;
  //-------------------------- Calculate percentage increase for revenue-----------------------------
  const revenuePercentageChange =
    previousMonthSales === 0
      ? currentMonthSales > 0
        ? 100
        : 0
      : ((currentMonthSales - previousMonthSales) / previousMonthSales) * 100;
  const revenueDiffrence = currentMonthSales - previousMonthSales;
  //-------------------------- Determine increase or decrease status for revenue and sales--------------------------
  const revenueStatus = revenuePercentageChange > 0 ? 'up' : 'down';
  const clientStatus = clientPercentageChange > 0 ? 'up' : 'down';

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
      ? currentMonthLeads > 0
        ? 100
        : 0
      : ((currentMonthLeads - previousMonthLeads) / previousMonthLeads) * 100;
  //---------------------last month diffrence-------------------------
  const leadsDiffrence = currentMonthLeads - previousMonthLeads;
  //-------------------------- Calculate percentage increase for intrested leads-----------------------------
  const intrestedPercentageChange =
    previousMonthInterestedLeads === 0
      ? currentMonthInterestedLeads > 0
        ? 100
        : 0
      : ((currentMonthInterestedLeads - previousMonthInterestedLeads) /
          previousMonthInterestedLeads) *
        100;
  const intrestedLeadsDiffrence =
    currentMonthInterestedLeads - previousMonthInterestedLeads;
  //-------------------------- Determine increase or decrease status for leads and intrested leads--------------------------
  const leadStatus = leadsPercentage > 0 ? 'up' : 'down';
  const intrestedLeadStatus = intrestedPercentageChange > 0 ? 'up' : 'down';

  // ------------ DATA FUNCTIONALITY STARTS FROM HERE ------------
  const [remainingDays, setRemainingDays] = useState(0);
  const [showSubscription, setShowSubscription] = useState(true);

  const user = JSON.parse(localStorage.getItem('userDetail'));
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

  return (
    <>
      <main className="min-h-screen flex flex-col gap-1">
        {showSubscription && (
          <div className="flex items-center justify-between bg-white shadow-md px-3 py-1.5 border-[0.5px] border-top transition transform duration-500 ease-in-out animate-fade-in animate-slide-down text-white p-4">
            <div className="flex flex-col justify-start">
              <h1
                className={`${
                  remainingDays < 5 ? 'text-red-500' : 'text-gray-700'
                } text-xl font-semibold`}
              >
                Clock is ticking! {remainingDays} day's are left in your trail.
              </h1>
              <p className="text-xs font-semibold text-gray-500">
                Pick a perfect plan for your business needs before your trial
                period gets over.
              </p>
            </div>
            {/* SECOND */}
            <div className="flex items-center gap-4">
              <Link to="/sidebar/subscription/">
                <button className="cursor-pointer py-2 bg-cyan-400 text-white text-sm rounded-md px-2 border-none font-semibold shadow-md">
                  Choose Plan
                </button>
              </Link>
              <Link to="/sidebar" onClick={() => setShowSubscription(false)}>
                <button className="py-[2px] border-[0.5px] border-red-400 cursor-pointer px-2 rounded-md text-red-600">
                  X
                </button>
              </Link>
            </div>
          </div>
        )}
        {/* FIRST NAME */}
        <h1 className="text-3xl my-2 font-semibold text-gray-700 px-3 pb-1">
          Hello, {firstName || 'Shubh'}
        </h1>
        {/* ------- TOP CARDS ------- */}
        <div className="flex items-center px-2 gap-3">
          {/* ------- CARDS ------- */}
          <div className="flex flex-col justify-between bg-white py-4 px-4 rounded-md shadow-lg h-[210px] w-1/4">
            <div className="flex flex-col gap-2">
              <h1 className="font-light uppercase text-sm">Lead this month</h1>
              {/* ------- MIDDLE SECTION ----------- */}
              <div className="flex items-center gap-4 mt-2">
                <button className="py-3 px-3 h-20 w-20 rounded-[90%] bg-blue-500 text-white flex items-center justify-center">
                  {/* <img src={Group} alt="Home Icon" /> */}

                  <FaUsersRectangle className="text-3xl" />
                </button>
                <div className="flex flex-col items-center justify-center">
                  <span className="font-bold text-xl">{currentMonthLeads}</span>
                  <button
                    className={`flex text-[12px] font-thin p-1 items-center ${
                      leadStatus == 'up' ? 'bg-green-100' : 'bg-red-100'
                    } w-max rounded-md justify-between gap-1`}
                  >
                    {leadStatus == 'up' ? (
                      <FaArrowAltCircleUp />
                    ) : (
                      <FaArrowAltCircleDown />
                    )}
                    <span>{Math.round(leadsPercentage)}%</span>
                  </button>
                </div>
              </div>
            </div>
            {/* ---------- PROGRESS BAR --------- */}
            <div className="h-2 w-full bg-transparent border border-gray-600 rounded-lg mt-2">
              <div
                className={`h-full ${
                  leadStatus == 'up' ? 'bg-blue-600' : 'bg-red-600'
                }`}
                style={{
                  maxWidth: `${Math.abs(Math.round(leadsPercentage))}%`,
                }}
              ></div>
            </div>
            <h3 className="font-light text-sm">
              Last Month Relative:{' '}
              <span className="text-sm">{leadsDiffrence}</span>
            </h3>
          </div>
          {/* ------- CARD ------- */}
          <div className="flex flex-col justify-between py-4 px-4 bg-white rounded-md shadow-lg h-[210px] w-1/4">
            <div className="flex flex-col gap-2">
              <h1 className="font-light uppercase text-sm">
                REVENUE THIS MONTH
              </h1>
              <div className="flex gap-4 items-center mt-2">
                <button className="py-3 px-3 h-20 w-20 rounded-[90%] bg-orange-300 text-white flex items-center justify-center">
                  {/* <img src={Dollar} alt="Profile Icon" /> */}

                  <CiBadgeDollar className="text-4xl" />
                </button>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-xl">
                    $ {currentMonthSales}
                  </span>
                  <button
                    className={`flex text-[12px] font-thin p-1 items-center ${
                      revenueStatus == 'up' ? 'bg-green-100' : 'bg-red-100'
                    } w-max rounded-md justify-between gap-1`}
                  >
                    {revenueStatus == 'up' ? (
                      <FaArrowAltCircleUp />
                    ) : (
                      <FaArrowAltCircleDown />
                    )}
                    <span>{Math.round(revenuePercentageChange)}%</span>
                  </button>
                </div>
              </div>
            </div>
            {/* ---------- PROGRESS BAR --------- */}
            <div className="h-2 w-full bg-transparent border border-gray-600 rounded-lg mt-2">
              <div
                className={`h-full ${
                  revenueStatus == 'up' ? 'bg-blue-600' : 'bg-red-600'
                }`}
                style={{
                  maxWidth: `${Math.abs(Math.round(revenuePercentageChange))}%`,
                }}
              ></div>
            </div>
            <h3 className="font-light text-sm">
              Last Month Relative: ${' '}
              <span className="text-sm">{revenueDiffrence}</span>
            </h3>
          </div>
          {/* ------- CARD ------- */}
          <div className="flex flex-col justify-between bg-white py-4 px-4 rounded-md shadow-lg h-[210px] w-1/4">
            <div className="flex flex-col gap-2">
              <h1 className="font-light uppercase text-sm">
                SALES IN PIPELINE
              </h1>
              <div className="flex gap-4 items-center mt-2">
                <button className="py-3 px-3 h-20 w-20 rounded-[90%] bg-red-500 text-white flex items-center justify-center">
                  {/* <img src={Price} alt="Profile Icon" /> */}

                  <FcSalesPerformance className="text-white text-3xl" />
                </button>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-xl">
                    {currentMonthInterestedLeads}
                  </span>
                  <button
                    className={`flex text-[12px] font-thin p-1 items-center ${
                      intrestedLeadStatus == 'up'
                        ? 'bg-green-100'
                        : 'bg-red-100'
                    } w-max rounded-md justify-between gap-1`}
                  >
                    {intrestedLeadStatus == 'up' ? (
                      <FaArrowAltCircleUp />
                    ) : (
                      <FaArrowAltCircleDown />
                    )}
                    <span>{Math.round(intrestedPercentageChange)}%</span>
                  </button>
                </div>
              </div>
            </div>
            {/* ---------- PROGRESS BAR --------- */}
            <div className="h-2 w-full bg-transparent border border-gray-600 rounded-lg mt-2">
              <div
                className={`h-full ${
                  intrestedLeadStatus == 'up' ? 'bg-blue-600' : 'bg-red-600'
                }`}
                style={{
                  maxWidth: `${Math.abs(
                    Math.round(intrestedPercentageChange)
                  )}%`,
                }}
              ></div>
            </div>
            <h3 className="font-light text-sm">
              Last Month Relative:{' '}
              <span className="text-sm">{intrestedLeadsDiffrence}</span>
            </h3>
          </div>
          {/* ------- CARD ------- */}
          <div className="flex flex-col justify-between bg-white py-4 px-4 rounded-md shadow-lg h-[210px] w-1/4">
            <div className="flex flex-col gap-2">
              <h1 className="font-light uppercase text-sm">
                CLIENT THIS MONTH
              </h1>
              <div className="flex gap-4 items-center mt-2">
                <button className="py-3 px-3 h-20 w-20 rounded-[90%] bg-cyan-500 text-white flex items-center justify-center">
                  {/* <img src={Profile} alt="Profile Icon" /> */}

                  <FaUsers className="text-white text-3xl" />
                </button>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-xl">
                    {currentMonthClientCount}
                  </span>
                  <button
                    className={`flex text-[12px] font-thin p-1 items-center ${
                      clientStatus == 'up' ? 'bg-green-100' : 'bg-red-100'
                    } w-max rounded-md justify-between gap-1`}
                  >
                    {clientStatus == 'up' ? (
                      <FaArrowAltCircleUp />
                    ) : (
                      <FaArrowAltCircleDown />
                    )}
                    <span>{Math.round(clientPercentageChange)}%</span>
                  </button>
                </div>
              </div>
            </div>
            {/* ---------- PROGRESS BAR --------- */}
            <div className="h-2 w-full bg-transparent border border-gray-600 rounded-lg mt-2">
              <div
                className={`h-full ${
                  clientStatus == 'up' ? 'bg-blue-600' : 'bg-red-600'
                }`}
                style={{
                  maxWidth: `${Math.abs(Math.round(clientPercentageChange))}%`,
                }}
              ></div>
            </div>
            <h3 className="font-light text-sm">
              Last Month Relative:{' '}
              <span className="text-sm">{clientDiffrence}</span>
            </h3>
          </div>
        </div>
        {/* ------- PROGRESS BAR ------- */}
        <div className="flex gap-3 m-2">
          {/* ------- PROGRESS CARD ------- */}
          <div className="flex-4 flex flex-col bg-white py-4 px-4 rounded-md shadow-md w-[400px] justify-between">
            <h1 className="font-thin text-xl">Custom Segmentation</h1>
            <div className="flex items-center flex-col gap-2">
              <CustomerSegmentationChart />
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
              <h2 className="font-bold">Remaining: 990</h2>
            </div>
          </div>
          {/* ------- PROGRESS CARD ------- */}
          <div className="flex-1 flex flex-col bg-white rounded-md shadow-md px-4 py-4 justify-between">
            <SalesReportChart />
          </div>
        </div>
        {/* ------- BOTTOM CARDS ------- */}
        <div className="flex gap-3 mx-2">
          {/* ------- BOTTOM CARD ------- */}
          <div className="flex-1 flex flex-col bg-white shadow-sm py-6 px-3 rounded-md">
            <SalesPipelineChart />
          </div>
          {/* ------- BOTTOM CARD ------- */}
          <div className="flex-5 flex flex-col py-4 px-4 gap-4 items-center bg-blue-50 rounded-md shadow-md">
            <LeadSourceChart />
          </div>
        </div>
      </main>
    </>
  );
}
