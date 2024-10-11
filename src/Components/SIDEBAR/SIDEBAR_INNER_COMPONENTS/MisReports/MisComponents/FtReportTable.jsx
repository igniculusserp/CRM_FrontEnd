import { FaBars } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Fill } from 'react-icons/ri';

export default function FtReportTable({ currentReports }) {
  return (
    <table className="min-w-full bg-white">
      {/* ----------------- TABLE HEAD START ----------------- */}
      <thead>
        <tr className="border-gray-300 border-b-2">
          {/* CHECKBOX */}
          <th className="px-3 py-3 w-max">
            <input type="checkbox" />
          </th>
          {/* FREE TRAIL START DATE */}
          <th className="px-2 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap pr-2">Free Trail Start Date</span>
              <FaBars />
            </div>
          </th>
          {/* FREE TRAIL END DATE */}
          <th className="px-2 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap pr-2">Free Trail End Date</span>
              <FaBars />
            </div>
          </th>
          {/* ACTIONS BUTTON */}
          <th className="px-2 py-3 text-left border-r font-medium">
              <span className="text-nowrap pr-2">Action</span>
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
            {/* FREE TRAIL START DATE */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-blue-600">
              {report.freeTrailStartDate}
            </td>
            {/* FREE TRAIL END DATE */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.freeTrailEndDate}
            </td>
            {/* ACTIONS */}
            <td className="px-6 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              <div className="flex gap-2 items-center text-blue-600">
                <MdEdit
                  size={25}
                  color="white"
                  className="bg-blue-500 rounded"
                />
                <RiDeleteBin6Fill size={25} color="red" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      {/* ----------------- TABLE BODY END ----------------- */}
    </table>
  );
}
