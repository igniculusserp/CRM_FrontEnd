import { FaBars } from 'react-icons/fa';

export default function SalesReports({ currentReports, btn }) {
  return (
    <>
      {/* SOURCE WISE TABLE */}
      {currentReports && btn === 1 && (
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-gray-300 border-b-2">
              <th className="px-1 py-3 w-max">
                <input type="checkbox" />
              </th>
              <th className="px-1 py-3 text-left border-r font-medium">
                <div className="flex items-center justify-between">
                  <span className="text-nowrap pr-2">Source</span>
                  <FaBars />
                </div>
              </th>
              <th className="px-2 py-3 text-left border-r font-medium">
                <div className="flex items-center justify-between">
                  <span className="text-nowrap pr-2">Net Total</span>
                  <FaBars />
                </div>
              </th>
              <th className="px-2 py-3 text-left border-r font-medium">
                <span className="text-nowrap pr-2">Grand Total</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentReports.map((report, i) => (
              <tr key={i} className="cursor-pointer hover:bg-gray-200 border-gray-300 border-b">
                <td className="px-1 py-4 text-center w-max">
                  <input type="checkbox" />
                </td>
                <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                  {report.leadSource}
                </td>
                <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                  {report.netTotal}
                </td>
                <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                  {report.grandTotal}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      {/* EMPLOYEE WISE TABLE */}
      {currentReports && btn === 2 && (
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-gray-300 border-b-2">
              <th className="px-1 py-3 w-max">
                <input type="checkbox" />
              </th>
              <th className="px-1 py-3 text-left border-r font-medium">
                <div className="flex items-center justify-between">
                  <span className="text-nowrap pr-2">Employee Name</span>
                  <FaBars />
                </div>
              </th>
              <th className="px-2 py-3 text-left border-r font-medium">
                <div className="flex items-center justify-between">
                  <span className="text-nowrap pr-2">Net Total</span>
                  <FaBars />
                </div>
              </th>
              <th className="px-2 py-3 text-left border-r font-medium">
                <span className="text-nowrap pr-2">Grand Total</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentReports.map((report, i) => (
              <tr key={i} className="cursor-pointer hover:bg-gray-200 border-gray-300 border-b">
                <td className="px-1 py-4 text-center w-max">
                  <input type="checkbox" />
                </td>
                <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                  {report.employeeName}
                </td>
                <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                  {report.netTotal}
                </td>
                <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                  {report.grandTotal}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
