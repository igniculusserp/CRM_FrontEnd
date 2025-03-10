import { useState,useEffect } from "react";
import { FaBars } from "react-icons/fa";
export default function GeneralReportTable({ currentReports }) {

            //--------------------------------------- Set Business Type --------------------------------------------
                     const [BusinessType, setBusinessType] = useState("");
                      
                     useEffect(() => {
                       const storedType = localStorage.getItem("businessType") || "";
                       setBusinessType(storedType);
                     }, []);

  return (
    <table className="min-w-full bg-white">
      {/* ----------------- TABLE HEAD START ----------------- */}
      <thead>
        <tr className="border-b-2 border-gray-300">
          {/* CHECKBOX */}
          <th className="w-max px-2 py-3">
            <input type="checkbox" />
          </th>
          {/* CREATED START DATE */}
          <th className="border-r px-2 py-3 text-left font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap text-sm">Created Start Date</span>
              <FaBars />
            </div>
          </th>
          {/* CREATED END DATE */}
          <th className="border-r px-2 py-3 text-left font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap text-sm">Created End Date</span>
              <FaBars />
            </div>
          </th>
          {/* MODIFIED START DATE */}
          <th className="border-r px-2 py-3 text-left font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap text-sm">Modified Start Date</span>
              <FaBars />
            </div>
          </th>
          {/* MODIFIED END DATE */}
          <th className="border-r px-2 py-3 text-left font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap text-sm">Modified End Date</span>
              <FaBars />
            </div>
          </th>
          {/* CALLBACK START DATE */}
          <th className="border-r px-2 py-3 text-left font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap text-sm">Callback Start Date</span>
              <FaBars />
            </div>
          </th>
          {/* CALLBACK END DATE */}
          <th className="border-r px-2 py-3 text-left text-sm font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap text-sm">Callback End Date</span>
              <FaBars />
            </div>
          </th>
          {/* LEAD STATUS */}
          <th className="border-r px-2 py-3 text-left font-medium">
            <span className="text-nowrap text-sm">Lead Status</span>
          </th>
        </tr>
      </thead>
      {/* ----------------- TABLE HEAD END ----------------- */}
      {/* ----------------- TABLE BODY START ----------------- */}
      <tbody>
        {currentReports.map((report, i) => (
          <tr
            key={i}
            className="cursor-pointer border-b border-gray-300 hover:bg-gray-200"
          >
            {/* CHECKBOX */}
            <td className="w-max px-3 py-4 text-center">
              <input type="checkbox" />
            </td>
            {/* CREATED START DATE */}
            <td
              className="border-b border-gray-300 px-2 py-4 text-sm leading-5 text-blue-600"
              onClick={() => navigate(`/panel/${BusinessType}/clientso/${report.id}`)}
            >
              {report.createdStartDate}
            </td>
            {/* CREATED END DATE */}
            <td className="border-b border-gray-300 px-2 py-4 text-sm leading-5 text-gray-600">
              {report.createdEndDate}
            </td>
            {/* MODIFIED START DATE */}
            <td className="border-b border-gray-300 px-2 py-4 text-sm leading-5 text-gray-600">
              {report.modifiedStartDate}
            </td>
            {/* MODIFIED END DATE */}
            <td className="border-b border-gray-300 px-2 py-4 text-sm leading-5 text-gray-600">
              {report.modifiedEndDate}
            </td>
            {/* CALLBACK START DATE */}
            <td className="border-b border-gray-300 px-2 py-4 text-sm leading-5 text-gray-600">
              {report.callbackStartDate}
            </td>
            {/* CALLBACK END DATE */}
            <td className="border-b border-gray-300 px-2 py-4 text-sm leading-5 text-gray-600">
              {report.callbackEndDate}
            </td>
            {/* LEAD STATUS */}
            <td className="border-b border-gray-300 px-2 py-4 text-sm leading-5 text-gray-600">
              {report.leadStatus}
            </td>
          </tr>
        ))}
      </tbody>
      {/* ----------------- TABLE BODY END ----------------- */}
    </table>
  );
}
