import { FaArrowAltCircleUp } from 'react-icons/fa';
import Price from '../../../../assets/images/sales-badge-svgrepo-com 1.png';
import Group from '../../../../assets/images/Group.png';
import Dollar from '../../../../assets/images/price-label-svgrepo-com 1.png';
import Profile from '../../../../assets/images/users-svgrepo-com 1.png';
import SalesPipelineChart from './homeComponents/SalesPipelineChart';
import LeadSourceChart from './homeComponents/LeadSourceChart';
import SalesReportChart from './homeComponents/SalesReportChart';
import CustomerSegmentationChart from './homeComponents/CustomerSegmentationChart';

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