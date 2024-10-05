import { useState } from 'react';
import GeneralReport from './MisComponents/GeneralReport';
import FtReport from './MisComponents/FtReport';
import PaidClientReport from './MisComponents/PaidClientReport';
import UserReport from './MisComponents/UserReport';
import CallingReport from './MisComponents/CallingReport';
import DNDReport from './MisComponents/DNDReport';
import TrackSheet from './MisComponents/TrackSheet';
import ResearchReport from './MisComponents/ResearchReport';

export default function MISReports() {
  const dynamicButtons = [
    { id: 1, name: 'General Report' },
    { id: 2, name: 'Ft Report' },
    { id: 3, name: 'Paid Client Report' },
    { id: 4, name: 'User Report' },
    { id: 5, name: 'Calling Report' },
    { id: 6, name: 'DND Report' },
    { id: 7, name: 'Track Sheet' },
    { id: 8, name: 'Research Report' },
  ];

  const [activeButtonId, setActiveButtonId] = useState(1);

  const handleDynamicButtonsClick = (id) => {
    setActiveButtonId(id);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col mt-3">
        <div className="flex items-center gap-2 mx-3 px-3 bg-white border rounded py-3">
          {dynamicButtons.map(({ id, name }) => (
            <button
              className={`py-2 px-4 text-gray-700 rounded-md shadow-sm ${
                activeButtonId === id
                  ? 'bg-cyan-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
              key={id}
              onClick={() => handleDynamicButtonsClick(id)}
            >
              {name}
            </button>
          ))}
        </div>
        {/* GENERAL REPORT COMPONENT */}
        {activeButtonId === 1 && <GeneralReport />}
        {/* FT REPORT COMPONENT */}
        {activeButtonId === 2 && <FtReport />}
        {/* PAID CLIENT REPORT COMPONENT */}
        {activeButtonId === 3 && <PaidClientReport />}
        {/* USER REPORT COMPONENT */}
        {activeButtonId === 4 && <UserReport />}
        {/* CALLING REPORT COMPONENT */}
        {activeButtonId === 5 && <CallingReport />}
        {/* DND REPORT COMPONENT */}
        {activeButtonId === 6 && <DNDReport />}
        {/* TRACK SHEET COMPONENT */}
        {activeButtonId === 7 && <TrackSheet />}
        {/* RESEARCH REPORT COMPONENT */}
        {activeButtonId === 8 && <ResearchReport />}
      </div>
    </>
  );
}
