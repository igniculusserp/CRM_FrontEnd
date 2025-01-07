
import PropTypes from 'prop-types';
import { FaBars } from 'react-icons/fa'; // Assuming you are using Font Awesome
import { GoDot } from "react-icons/go";

export default function Monitoring({ currentReports }) {
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
          {/* FULL NAME */}
          <th className="px-2 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap pr-2">Username</span>
              <FaBars />
            </div>
          </th>
          {/* USERNAME */}
          <th className="px-2 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap pr-2">Date</span>
              <FaBars />
            </div>
          </th>
          {/* TARGET */}
          <th className="px-2 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap pr-2">Login Time</span>
              <FaBars />
            </div>
          </th>
          {/* TARGET ACHIEVED */}
          <th className="px-2 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap pr-2">Logout Time</span>
              <FaBars />
            </div>
          </th>
          {/* TARGET REMAINING */}
          <th className="px-2 py-3 text-left border-r font-medium">
          <div className="flex items-center justify-between">
              <span className="text-nowrap pr-2">Total Leads Disposed</span>
              <FaBars />
            </div>
          </th>

          {/* TARGET REMAINING */}
          <th className="px-2 py-3 text-left border-r font-medium">
          <div className="flex items-center justify-between">
              <span className="text-nowrap pr-2">Status</span>
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
            {/* USER NAME */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.userName}
            </td>
            {/* TARGET */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.date?.split('T')[0] || ''}
            </td>
            {/* TARGET ACHIEVED */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.logInTime?.replace('T', ' ')}
            </td>
            {/* TARGET REMAINING */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
            {report.logoutTime?.replace('T', ' ')}
            </td>
            {/* TARGET REMAINING */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.noOfLeadUpdate}
            </td>
            {/* TARGET REMAINING */}
            <td className=" px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.status === false && (
                <>
                <div className='flex justify-items items-center gap-1'>
                <GoDot className=' border rounded-full bg-red-400 text-red-700 shadow-sm    shadow-red-300' />
                Offline
                </div>
                </>
              )}
                {report.status === true && (
                <>
               <div className='flex justify-items items-center gap-1'>
                <GoDot className=' border rounded-full bg-green-500 text-green-300 shadow-md   shadow-green-300' />
                Online
                </div>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
      {/* ----------------- TABLE HEAD END ----------------- */}
    </table>
    </>
  );
}

Monitoring.propTypes = {
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
