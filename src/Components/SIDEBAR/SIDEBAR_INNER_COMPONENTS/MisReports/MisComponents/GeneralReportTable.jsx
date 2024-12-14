import { FaBars } from "react-icons/fa";

export default function GeneralReportTable({ currentReports }) {
  return (
    <table className="min-w-full bg-white">
      {/* ----------------- TABLE HEAD START ----------------- */}
      <thead>
        <tr className="border-gray-300 border-b-2">
          {/* CHECKBOX */}
          <th className="px-2 py-3 w-max">
            <input type="checkbox" />
          </th>
          {/* CREATED START DATE */}
          <th className="px-2 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap text-sm">Created Start Date</span>
              <FaBars />
            </div>
          </th>
          {/* CREATED END DATE */}
          <th className="px-2 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap text-sm">Created End Date</span>
              <FaBars />
            </div>
          </th>
          {/* MODIFIED START DATE */}
          <th className="px-2 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap text-sm">Modified Start Date</span>
              <FaBars />
            </div>
          </th>
          {/* MODIFIED END DATE */}
          <th className="px-2 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap text-sm">Modified End Date</span>
              <FaBars />
            </div>
          </th>
          {/* CALLBACK START DATE */}
          <th className="px-2 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap text-sm">Callback Start Date</span>
              <FaBars />
            </div>
          </th>
          {/* CALLBACK END DATE */}
          <th className="px-2 py-3 text-left border-r font-medium text-sm">
            <div className="flex items-center justify-between">
              <span className="text-nowrap text-sm">Callback End Date</span>
              <FaBars />
            </div>
          </th>
          {/* LEAD STATUS */}
          <th className="px-2 py-3 text-left border-r font-medium">
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
            className="cursor-pointer hover:bg-gray-200 border-gray-300 border-b"
          >
            {/* CHECKBOX */}
            <td className="px-3 py-4 text-center w-max">
              <input type="checkbox" />
            </td>
            {/* CREATED START DATE */}
            <td
              className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-blue-600"
              onClick={() => navigate(`/panel/clientso/${report.id}`)}
            >
              {report.createdStartDate}
            </td>
            {/* CREATED END DATE */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.createdEndDate}
            </td>
            {/* MODIFIED START DATE */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.modifiedStartDate}
            </td>
            {/* MODIFIED END DATE */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.modifiedEndDate}
            </td>
            {/* CALLBACK START DATE */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.callbackStartDate}
            </td>
            {/* CALLBACK END DATE */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.callbackEndDate}
            </td>
            {/* LEAD STATUS */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.leadStatus}
            </td>
          </tr>
        ))}
      </tbody>
      {/* ----------------- TABLE BODY END ----------------- */}
    </table>
  );
}