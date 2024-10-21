// import { useState, useEffect } from "react";

import { FaBars, FaPhone } from 'react-icons/fa';

export default function LeadOperations({ currentLeads }) {

  return (
    <>
    <table className="min-w-full bg-white">
      {/* ----------------- TABLE HEAD START ----------------- */}
      <thead>
        <tr className="border-gray-300 border-b-2">
          {/* CHECKBOX */}
          <th className="px-1 py-3 w-max">
            <input type="checkbox" />
          </th>
          {/* LEAD ID */}
          <th className="px-3 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span>Client Name</span>
              <FaBars />
            </div>
          </th>
          {/* NAME */}
          <th className="px-3 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span>Mobile</span>
              <FaBars />
            </div>
          </th>
          {/* DISPOSITION */}
          <th className="px-3 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span>Assigned To</span>
              <FaBars />
            </div>
          </th>
          {/* EMPLOYEE NAME */}
          <th className="px-3 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span>Lead Status</span>
              <FaBars />
            </div>
          </th>
          {/* CALL DATE */}
          <th className="px-3 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span>Lead Source</span>
              <FaBars />
            </div>
          </th>
          {/* SOURCE */}
          <th className="px-3 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span>Segment</span>
              <FaBars />
            </div>
          </th>
          {/* DURATION */}
          <th className="px-3 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span>BP Name</span>
              <FaBars />
            </div>
          </th>
        </tr>
      </thead>
      {/* ----------------- TABLE HEAD END ----------------- */}

      {/* ----------------- TABLE BODY START ----------------- */}
      <tbody>
        {currentLeads.map((lead, index) => (
          <tr
            key={index}
            onClick={() => handleClick(lead)}
            className="cursor-pointer hover:bg-gray-200 border-gray-300 border-b"
          >
            {/* CHECKBOX */}
            <td className="px-3 py-4 text-center w-max">
              <input type="checkbox" />
            </td>
            {/* CLIENT NAME */}
            <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              <div className="flex items-center">
                {/* <img className="h-8 w-8 rounded-full" src={lead.img} alt="DP" /> */}
                <span className="ml-2 w-[80px] break-words">
                  {lead.name}
                </span>
              </div>
            </td>
            {/* MOBILE */}
            <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              <div className="flex items-center gap-2">
                {lead.mobileNo}
                <FaPhone className="text-red-400 text-sm" />
              </div>
            </td>
            {/* ASSIGNED TO */}
            <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {lead.assigned_To}
            </td>
            {/* LEAD STATUS */}
            <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {lead.leadesStatus}
            </td>
            {/* LEAD SOURCE */}
            <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              <p className="text-blue-600">{lead.leadsSource}</p>
            </td>
            {/* SEGMENT */}
            <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
            <div>
                       {lead.segments && (
                              <span className="">
                                {lead.segments
                                  .filter((segment) => segment.length > 1)
                                  .join(", ")}
                              </span>
                            )}
                      </div>
            </td>
            {/* BP NAME */}
            <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              <p>{lead.bpName}</p>
            </td>
          </tr>
        ))}
      </tbody>
      {/* ----------------- TABLE BODY END ----------------- */}
    </table>
    </>
  );
}