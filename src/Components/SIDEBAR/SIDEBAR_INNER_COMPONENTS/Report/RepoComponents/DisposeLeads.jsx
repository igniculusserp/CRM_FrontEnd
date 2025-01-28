import { FaBars } from "react-icons/fa";

export default function DisposeLeads({ currentReports }) {
  return (
    <>
      <table className="min-w-full bg-white leads_Table">
        {/* ----------------- TABLE HEAD START ----------------- */}
        <thead>
          <tr className="border-gray-300 border-b-2">
            {/* CHECKBOX */}
            <th className="px-3 py-3 w-max">
              <input type="checkbox" />
            </th>
            {/* CLIENT NAME */}
            <th className="px-2 py-3 text-left border-r font-medium">
              <div className="flex items-center justify-between">
                <span className="text-nowrap pr-2">Client Name</span>
                <FaBars />
              </div>
            </th>
            {/* MOBILE */}
            <th className="px-2 py-3 text-left border-r font-medium">
              <div className="flex items-center justify-between">
                <span className="text-nowrap pr-2">Mobile</span>
                <FaBars />
              </div>
            </th>
            {/* DISPOSE BY */}
            <th className="px-2 py-3 text-left border-r font-medium">
              <div className="flex items-center justify-between">
                <span className="text-nowrap pr-2">Dispose By</span>
                <FaBars />
              </div>
            </th>
            {/* LEAS SOURCE */}
            <th className="px-2 py-3 text-left border-r font-medium">
              <div className="flex items-center justify-between">
                <span className="text-nowrap pr-2">Lead Source</span>
                <FaBars />
              </div>
            </th>
            {/* REMARK */}
            <th className="px-2 py-3 text-left border-r font-medium">
              <div className="flex items-center justify-between">
                <span className="text-nowrap pr-2">Remark</span>
                <FaBars />
              </div>
            </th>
            {/* DISPOSE TIME */}
            <th className="px-2 py-3 text-left border-r font-medium">
              <span className="text-nowrap pr-2">Dispose Time</span>
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
              {/* CLIENT NAME */}
              <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                {report.clientName}
              </td>
              {/* MOBILE */}
              <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                {report.mobile}
              </td>
              {/* DISPOSE BY */}
              <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                {report.disposeBy}
              </td>
              {/* LEAD SOURCE */}
              <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                {report.leadSource}
              </td>
              {/* REMARK */}
              <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                {report.remark}
              </td>
              {/* DISPOSE TIME */}
              <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                {report.disposeTime}
              </td>
            </tr>
          ))}
        </tbody>
        {/* ----------------- TABLE BODY END ----------------- */}
      </table>
      {/* ------------------- COMING SOON TAB ----------------------- */}
      <div className="mt-[2rem] mx-auto flex items-center w-[300px] justify-center py-8 bg-white rounded-md shadow-lg gap-3">
        <h1 className="text-xl font-medium text-red-500 text-center">
          This feature is coming soon...
        </h1>
      </div>
      {/* ------------------- END ------------------- */}
    </>
  );
}
