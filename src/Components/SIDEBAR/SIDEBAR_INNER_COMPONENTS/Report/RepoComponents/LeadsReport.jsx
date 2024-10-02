import { FaBars } from 'react-icons/fa';

export default function LeadsReport({ currentReports }) {
  return (
    <table className="min-w-full bg-white">
      {/* ----------------- TABLE HEAD START ----------------- */}
      <thead>
        <tr className="border-gray-300 border-b-2">
          {/* CHECKBOX */}
          <th className="px-3 py-3 w-max">
            <input type="checkbox" />
          </th>
          {/* LEAD ID */}
          <th className="px-2 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap pr-2">Lead ID</span>
              <FaBars />
            </div>
          </th>
          {/* LEAD NAME */}
          <th className="px-2 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap pr-2">Lead Name</span>
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
          {/* ASSIGNED TO */}
          <th className="px-2 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap pr-2">Assigned To</span>
              <FaBars />
            </div>
          </th>
          {/* LEAD STATUS */}
          <th className="px-2 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap pr-2">Lead Status</span>
              <FaBars />
            </div>
          </th>
          {/* LEAD SOURCE */}
          <th className="px-2 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap pr-2">Lead Source</span>
              <FaBars />
            </div>
          </th>
          {/* CLIENT CONTACT */}
          <th className="px-2 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap pr-2">Client Contact</span>
              <FaBars />
            </div>
          </th>
          {/* LAST REMARKS */}
          <th className="px-2 py-3 text-left border-r font-medium">
            <span className="text-nowrap pr-2">Last Remarks</span>
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
            {/* LEAD ID */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.leadId}
            </td>
            {/* LEAD NAME */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.leadName}
            </td>
            {/* MOBILE */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.mobile}
            </td>
            {/* ASSIGNED TO */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.assignedTo}
            </td>
            {/* LEAD STATUS */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-green-600">
              {report.leadStatus}
            </td>
            {/* LEAD SOURCE */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.leadSource}
            </td>
            {/* CLIENT CONTACT */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.clientContact}
            </td>
            {/* LAST REMARKS */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.lastRemarks}
            </td>
          </tr>
        ))}
      </tbody>
      {/* ----------------- TABLE BODY END ----------------- */}
    </table>
  );
}