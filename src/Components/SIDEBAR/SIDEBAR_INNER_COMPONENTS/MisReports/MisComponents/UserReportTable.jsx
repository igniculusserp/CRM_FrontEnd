import { FaBars } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Fill } from 'react-icons/ri';

export default function UserReportTable({ currentReports }) {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr className="border-gray-300 border-b-2">
          <th className="px-1 py-3">
            <input type="checkbox" />
          </th>
          <th className="px-2 py-3 text-left border-r font-medium">
            <div className="flex justify-between items-center text-sm">
              <span>Status</span>
              <FaBars />
            </div>
          </th>
          <th className="px-20 py-3 text-left border-r font-medium">
            <div className="flex justify-end items-center text-sm">
              <span>Action</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {currentReports.map((report) => (
          <tr
            key={report.id}
            className="cursor-pointer hover:bg-gray-200 border-gray-300 border-b"
          >
            <td className="px-1 py-3 text-center">
              <input type="checkbox" />
            </td>
            <td className="px-2 py-4 text-sm max-w-24 break-words">
              {report.status}
            </td>
            <td className="px-2 py-4 flex gap-3 justify-end pr-12">
              <MdEdit size={25} color="white" className="bg-blue-500 rounded" />
              <RiDeleteBin6Fill size={25} color="red" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
