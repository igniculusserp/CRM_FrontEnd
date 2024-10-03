import { FaArrowAltCircleUp } from 'react-icons/fa';
import MyGaugeChart from './MyGaugeChart';
import ProgressBarChart from './ProgressBarChat';
import Price from '../../../assets/images/sales-badge-svgrepo-com 1.png';
import Group from '../../../assets/images/Group.png';
import Dollar from '../../../assets/images/price-label-svgrepo-com 1.png';
import Profile from "../../../assets/images/users-svgrepo-com 1.png"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col mt-3 gap-1">
      {/* ------- TOP CARDS ------- */}
      <div className="flex items-center px-2 gap-3">
        {/* ------- CARD ------- */}
        <div className="flex flex-col justify-between bg-white py-4 px-4 rounded-md shadow-lg h-[210px] w-1/4">
          <div className="flex flex-col gap-2">
            <h1 className="font-light uppercase text-sm">Lead this month</h1>
            {/* ------- MIDDLE SECTION ----------- */}
            <div className="flex items-center gap-2 mt-2">
              <button className="py-3 px-3 h-20 w-20 rounded-[90%] bg-blue-500 text-white flex items-center justify-center">
                <img src={Group} alt="Home Icon" />
              </button>
              <div className="flex flex-col items-center justify-center">
                <span className="font-bold text-2xl">10</span>
                <button className="flex text-[12px] font-thin p-1 items-center bg-green-100 w-max rounded-md justify-between gap-1">
                  <FaArrowAltCircleUp />
                  <span>100%</span>
                </button>
              </div>
            </div>
          </div>
          {/* ---------- PROGRESS BAR --------- */}
          <div className="h-2 w-full bg-transparent border border-gray-600 rounded-lg mt-2">
            <div className="h-full w-12 bg-blue-600"></div>
          </div>
          <h3 className="font-light">Last Month Relative: 0</h3>
        </div>
        {/* ------- CARD ------- */}
        <div className="flex flex-col justify-between py-4 px-4 bg-white rounded-md shadow-lg h-[210px] w-1/4">
          <div className="flex flex-col gap-2">
            <h1 className="font-light uppercase text-sm">REVENUE THIS MONTH</h1>
            <div className="flex gap-4 items-center mt-2">
              <button className="py-3 px-3 h-20 w-20 rounded-[90%] bg-orange-300 text-white flex items-center justify-center">
                <img src={Dollar} alt="Profile Icon" />
              </button>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-2xl">$ 35,00.00</span>
                <button className="flex text-[12px] font-thin p-1 items-center bg-green-100 w-max rounded-md justify-between gap-1">
                  <FaArrowAltCircleUp />
                  <span>100%</span>
                </button>
              </div>
            </div>
          </div>
          {/* ---------- PROGRESS BAR --------- */}
          <div className="h-2 w-full bg-transparent border border-gray-600 rounded-lg mt-2">
            <div className="h-full w-12 bg-blue-600"></div>
          </div>
          <h3 className="font-light">Last Month Relative: 0</h3>
        </div>
        {/* ------- CARD ------- */}
        <div className="flex flex-col justify-between bg-white py-4 px-4 rounded-md shadow-lg h-[210px] w-1/4">
          <div className="flex flex-col gap-2">
            <h1 className="font-light uppercase text-sm">SALES IN PIPELINE</h1>
            <div className="flex gap-4 items-center mt-2">
              <button className="py-3 px-3 h-20 w-20 rounded-[90%] bg-red-700 text-white flex items-center justify-center">
                <img src={Price} alt="Profile Icon" />
              </button>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-2xl">10</span>
                <button className="flex text-[12px] font-thin p-1 items-center bg-green-100 w-max rounded-md justify-between gap-1">
                  <FaArrowAltCircleUp />
                  <span>100%</span>
                </button>
              </div>
            </div>
          </div>
          {/* ---------- PROGRESS BAR --------- */}
          <div className="h-2 w-full bg-transparent border border-gray-600 rounded-lg mt-2">
            <div className="h-full w-12 bg-blue-600"></div>
          </div>
          <h3 className="font-light">Last Month Relative: 0</h3>
        </div>
        {/* ------- CARD ------- */}
        <div className="flex flex-col justify-between bg-white py-4 px-4 rounded-md shadow-lg h-[210px] w-1/4">
          <div className="flex flex-col gap-2">
            <h1 className="font-light uppercase text-sm">CLIENT THIS MONTH</h1>
            <div className="flex gap-4 items-center mt-2">
              <button className="py-3 px-3 h-20 w-20 rounded-[90%] bg-cyan-500 text-white flex items-center justify-center">
                <img src={Profile} alt="Profile Icon" />
              </button>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-2xl">10</span>
                <button className="flex text-[12px] font-thin p-1 items-center bg-green-100 w-max rounded-md justify-between gap-1">
                  <FaArrowAltCircleUp />
                  <span>100%</span>
                </button>
              </div>
            </div>
          </div>
          {/* ---------- PROGRESS BAR --------- */}
          <div className="h-2 w-full bg-transparent border border-gray-600 rounded-lg mt-2">
            <div className="h-full w-12 bg-blue-600"></div>
          </div>
          <h3 className="font-light">Last Month Relative: 0</h3>
        </div>
      </div>
      {/* ------- PROGRESS BAR ------- */}
      <div className="flex gap-3 m-2">
        {/* ------- PROGRESS CARD ------- */}
        <div className="flex-4 flex flex-col bg-white py-4 px-4 rounded-md shadow-md h-[300px] w-[400px] justify-between">
          <h1 className="font-light text-sm">
            LEAD GENERATION TARGET - THIS YEAR
          </h1>
          <div className="flex items-center flex-col gap-2">
            <MyGaugeChart />
            <h2 className="font-bold">Remaining: 990</h2>
          </div>
        </div>
        {/* ------- PROGRESS CARD ------- */}
        <div className="flex-1 flex flex-col bg-white rounded-md shadow-md px-4 py-4 h-[300px] justify-between">
          <h1 className="font-light text-sm">REVENUE TARGET - THIS YEAR</h1>
          <div className="flex flex-col gap-2 items-center">
            <ProgressBarChart />

            <h3 className="font-bold">Sum of Amount</h3>
            <p className="flex items-center gap-1">
              <span className="py-[2px] px-[5px] bg-cyan-500 h-[10px] w-[3px]"></span>
              <span className="font-light text-sm">Achieved</span>
            </p>
          </div>
        </div>
      </div>
      {/* ------- BOTTOM CARDS ------- */}
      <div className="flex gap-3 mx-2">
        {/* ------- BOTTOM CARD ------- */}
        <div className="flex-2 flex flex-col bg-white shadow-sm py-6 px-3 relative">
          <h1 className="text-left font-thin">
            LAST MONTHS PERFORMANCE MONIT..
          </h1>
          <div className="flex items-center justify-end">
            <p className="mt-8">December 2023</p>
          </div>
          <div className="w-[138px] h-[3px] bg-cyan-500 flex items-center justify-end m-auto mr-0"></div>
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between px-5">
              <h3 className="text-sm uppercase">Leads Created</h3>
              <span>10</span>
            </div>
            <div className="flex items-center justify-between px-5">
              <h3 className="text-sm uppercase">Deals Created</h3>
              <span>10</span>
            </div>
          </div>
          <div className="absolute h-[120px] w-[2px] bg-gray-300 bottom-3 right-[150px]"></div>
        </div>
        {/* ------- BOTTOM CARD ------- */}
        <div className="flex-1 flex flex-col py-8 px-2 gap-4 items-center bg-blue-50 rounded-md shadow-md">
          <h1 className="font-light text-sm items-baseline">LEADS BY SOURCE</h1>
          <div className="flex bg-white gap-4 py-4 px-1 rounded-md shadow-md w-[400px]">
            {/* FIRST */}
            <div className="flex-1 flex flex-col gap-3 px-4">
              <div className="flex items-center gap-3">
                <span className="py-2 px-2 bg-purple-500 h-[10px] w-[10px] rounded-sm"></span>
                <h1 className="font-light text-gray-700">Seminar Partner</h1>
              </div>
              <div className="flex items-center gap-3">
                <span className="py-2 px-2 bg-orange-500 h-[10px] w-[10px] rounded-sm"></span>
                <h1 className="font-light text-gray-700">Online Store</h1>
              </div>
              <div className="flex items-center gap-3">
                <span className="py-2 px-2 bg-yellow-500 h-[10px] w-[10px] rounded-sm"></span>
                <h1 className="font-light text-gray-700">Partner</h1>
              </div>
              <div className="flex items-center gap-3">
                <span className="py-2 px-2 bg-cyan-800 h-[10px] w-[10px] rounded-sm"></span>
                <h1 className="font-light text-gray-700">Cold Call</h1>
              </div>
            </div>
            {/* SECOND */}
            <div className="flex-1 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="py-2 px-2 bg-cyan-500 h-[10px] w-[10px] rounded-sm"></span>
                <h1 className="font-light text-gray-700">Web Download</h1>
              </div>
              <div className="flex items-center gap-3">
                <span className="py-2 px-2 bg-blue-700 h-[10px] w-[10px] rounded-sm"></span>
                <h1 className="font-light text-gray-700">External Referrals</h1>
              </div>
              <div className="flex items-center gap-3">
                <span className="py-2 px-2 bg-green-500 h-[10px] w-[10px] rounded-sm"></span>
                <h1 className="font-light text-gray-700">Advertisement</h1>
              </div>
            </div>
          </div>
        </div>
        {/* ------- BOTTOM CARD ------- */}
        <div className="flex-2 py-6 px-3 w-[300px] flex flex-col bg-gray-100 shadow-md gap-1">
          <h1 className="font-thin">PROLIFIC SALES REPS</h1>
          <div className="flex items-center justify-between border-b pb-2">
            <p>1. Shubham Mishra</p>
            <span>$ 35,000.00</span>
          </div>
        </div>
      </div>
    </main>
  );
}
