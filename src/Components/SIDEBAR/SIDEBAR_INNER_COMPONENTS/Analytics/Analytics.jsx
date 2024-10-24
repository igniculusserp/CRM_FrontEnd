import { FaArrowAltCircleUp } from 'react-icons/fa';
import FirstChart from './ChatComponent/FirstChart';
import BottomChart from './ChatComponent/BottomChart';
import Circle from './ChatComponent/Circle';
import SalesCircle from './ChatComponent/SalesCircle';
import FollowCircle from './ChatComponent/FollowCircle';
import TeamCircle from './ChatComponent/TeamCircle';

export default function Analytics() {
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
              <strong>$1,800,000</strong>
              <button className="flex items-center justify-start gap-1 px-1 py-1 bg-green-100 w-max rounded-md">
                <FaArrowAltCircleUp />
                <span>93%</span>
              </button>
            </div>
            {/* ------------ CIRCLE CHART ------------ */}
            <Circle color={`#6396ff`} />
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
      <div className="mx-3 grid grid-cols-2 grid-rows-1 gap-3">
        <BottomChart text={`Leads By Stage`} color={`#2B6CB0`} />
        <BottomChart text={`Sales By Stage`} color={`#29b6f6`} />
      </div>
    </main>
  );
}
