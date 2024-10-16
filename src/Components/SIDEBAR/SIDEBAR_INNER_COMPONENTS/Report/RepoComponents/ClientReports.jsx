import { FaBars } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
export default function ClientReports({ currentReports }) {
  const navigate = useNavigate(); // Add this line
  return (
    <table className="min-w-full bg-white">
      {/* ----------------- TABLE HEAD START ----------------- */}
      <thead>
        <tr className="border-gray-300 border-b-2">
          {/* CHECKBOX */}
          <th className="px-3 py-3 w-max">
            <input type="checkbox" />
          </th>
          {/* CLIENT ID */}
          <th className="px-2 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap pr-2">Client ID</span>
              <FaBars />
            </div>
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
          {/* VIEW SO */}
          <th className="px-2 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap pr-2">View So</span>
              <FaBars />
            </div>
          </th>
          {/* MANAGED BY */}
          <th className="px-2 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap pr-2">Managed By</span>
              <FaBars />
            </div>
          </th>
          {/* MANAGER */}
          <th className="px-2 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap pr-2">Manager</span>
              <FaBars />
            </div>
          </th>
          {/* TOTAL AMOUNT TOKEN */}
          <th className="px-2 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap pr-2">Total Amount Taken</span>
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
            {/* CLIENT ID */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-blue-600"
             onClick={() =>
              navigate(`/sidebar/Client_SO/${report.id}`)
            }
            >
              {report.id}
            </td>
            {/* CLIENT NAME */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.clientName}
            </td>
            {/* MOBILE */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.mobileNo}
            </td>
            {/* VIEW SO */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.saleS_ODR_NO}
            </td>
            {/* ASSIGNED TO */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.assigned_To}
            </td>
            {/* MANAGER */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.manager}
            </td>
            {/* TOTAL AMOUNT TOKEN */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.amount_paid}
            </td>
            {/* LAST REMARKS */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.remarks}
            </td>
          </tr>
        ))}
      </tbody>
      {/* ----------------- TABLE BODY END ----------------- */}
    </table>
  );
}