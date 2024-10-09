
import PropTypes from 'prop-types';
import { FaBars } from 'react-icons/fa'; // Assuming you are using Font Awesome

export default function EmployeeReport({ currentReports }) {
  return (
    <table className="min-w-full bg-white">
      {/* ----------------- TABLE HEAD START ----------------- */}
      <thead>
        <tr className="border-gray-300 border-b-2">
          {/* CHECKBOX */}
          <th className="px-3 py-3 w-max">
            <input type="checkbox" />
          </th>
          {/* FULL NAME */}
          <th className="px-2 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap pr-2">Full Name</span>
              <FaBars />
            </div>
          </th>
          {/* USERNAME */}
          <th className="px-2 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap pr-2">Username</span>
              <FaBars />
            </div>
          </th>
          {/* TARGET */}
          <th className="px-2 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap pr-2">Target</span>
              <FaBars />
            </div>
          </th>
          {/* TARGET ACHIEVED */}
          <th className="px-2 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap pr-2">Target Achieved</span>
              <FaBars />
            </div>
          </th>
          {/* TARGET REMAINING */}
          <th className="px-2 py-3 text-left border-r font-medium">
          <div className="flex items-center justify-between">
              <span className="text-nowrap pr-2">Target Remaining</span>
              <FaBars />
            </div>
          </th>
        </tr>
      </thead>
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
            {/* FULL NAME */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.fullName}
            </td>
            {/* USER NAME */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.userName}
            </td>
            {/* TARGET */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.targetAmount}
            </td>
            {/* TARGET ACHIEVED */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.targetAchieved}
            </td>
            {/* TARGET REMAINING */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.remainingTarget}
            </td>
          </tr>
        ))}
      </tbody>
      {/* ----------------- TABLE HEAD END ----------------- */}
    </table>
  );
}

EmployeeReport.propTypes = {
  currentReports: PropTypes.arrayOf(
    PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
      target: PropTypes.number.isRequired,
      targetAchieved: PropTypes.number.isRequired,
      targetRemaining: PropTypes.number.isRequired,
    })
  ).isRequired,
};
