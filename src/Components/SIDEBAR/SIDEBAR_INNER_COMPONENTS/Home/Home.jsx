import {
  FaArrowAltCircleDown,
  FaArrowAltCircleUp,
  FaUsers,
} from 'react-icons/fa';
import { CiBadgeDollar } from 'react-icons/ci';
import { FcSalesPerformance } from 'react-icons/fc';
import Profile from '../../../../assets/images/users-svgrepo-com 1.png';
import SalesPipelineChart from './homeComponents/SalesPipelineChart';
import LeadSourceChart from './homeComponents/LeadSourceChart';
import SalesReportChart from './homeComponents/SalesReportChart';
import CustomerSegmentationChart from './homeComponents/CustomerSegmentationChart';
import { useEffect, useState } from 'react';

import { tenant_base_url, protocal_url } from '../../../../Config/config';
import { getHostnamePart } from '../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl';
import axios from 'axios';
import { FaUsersRectangle } from 'react-icons/fa6';

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

  return (
    <main className="min-h-screen flex flex-col my-3 gap-1 mx-1">
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
                <span className="font-bold text-2xl">{currentMonthLeads}</span>
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
              style={{ maxWidth: `${Math.abs(Math.round(leadsPercentage))}%` }}
            ></div>
          </div>
          <h3 className="font-light">Last Month Relative: {leadsDiffrence}</h3>
        </div>
        {/* ------- CARD ------- */}
        <div className="flex flex-col justify-between py-4 px-4 bg-white rounded-md shadow-lg h-[210px] w-1/4">
          <div className="flex flex-col gap-2">
            <h1 className="font-light uppercase text-sm">REVENUE THIS MONTH</h1>
            <div className="flex gap-4 items-center mt-2">
              <button className="py-3 px-3 h-20 w-20 rounded-[90%] bg-orange-300 text-white flex items-center justify-center">
                {/* <img src={Dollar} alt="Profile Icon" /> */}

                <CiBadgeDollar className="text-4xl" />
              </button>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-2xl">
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
          <h3 className="font-light">
            Last Month Relative: $ {revenueDiffrence}
          </h3>
        </div>
        {/* ------- CARD ------- */}
        <div className="flex flex-col justify-between bg-white py-4 px-4 rounded-md shadow-lg h-[210px] w-1/4">
          <div className="flex flex-col gap-2">
            <h1 className="font-light uppercase text-sm">SALES IN PIPELINE</h1>
            <div className="flex gap-4 items-center mt-2">
              <button className="py-3 px-3 h-20 w-20 rounded-[90%] bg-red-500 text-white flex items-center justify-center">
                {/* <img src={Price} alt="Profile Icon" /> */}

                <FcSalesPerformance className="text-white text-3xl" />
              </button>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-2xl">
                  {currentMonthInterestedLeads}
                </span>
                <button
                  className={`flex text-[12px] font-thin p-1 items-center ${
                    intrestedLeadStatus == 'up' ? 'bg-green-100' : 'bg-red-100'
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
                maxWidth: `${Math.abs(Math.round(intrestedPercentageChange))}%`,
              }}
            ></div>
          </div>
          <h3 className="font-light">
            Last Month Relative: {intrestedLeadsDiffrence}
          </h3>
        </div>
        {/* ------- CARD ------- */}
        <div className="flex flex-col justify-between bg-white py-4 px-4 rounded-md shadow-lg h-[210px] w-1/4">
          <div className="flex flex-col gap-2">
            <h1 className="font-light uppercase text-sm">CLIENT THIS MONTH</h1>
            <div className="flex gap-4 items-center mt-2">
              <button className="py-3 px-3 h-20 w-20 rounded-[90%] bg-cyan-500 text-white flex items-center justify-center">
                {/* <img src={Profile} alt="Profile Icon" /> */}

                <FaUsers className="text-white text-3xl" />
              </button>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-2xl">
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
          <h3 className="font-light">Last Month Relative: {clientDiffrence}</h3>
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
                <div className="w-1 h-3 bg-blue-300"></div>
                <span className="text-sm">Enterprise</span>
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
  );
}