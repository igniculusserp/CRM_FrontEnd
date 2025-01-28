import { FaBars } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function UserReportTable({ currentReports }) {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr className="border-b-2 border-gray-300">
          <th className="px-1 py-3">
            <input type="checkbox" />
          </th>
          <th className="border-r px-2 py-3 text-left font-medium">
            <div className="flex items-center justify-between text-sm">
              <span>Status</span>
              <FaBars />
            </div>
          </th>
          <th className="border-r px-20 py-3 text-left font-medium">
            <div className="flex items-center justify-end text-sm">
              <span>Action</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {currentReports.map((report) => (
          <tr
            key={report.id}
            className="cursor-pointer border-b border-gray-300 hover:bg-gray-200"
          >
            <td className="px-1 py-3 text-center">
              <input type="checkbox" />
            </td>
            <td className="max-w-24 break-words px-2 py-4 text-sm">
              {report.status}
            </td>
            <td className="flex justify-end gap-3 px-2 py-4 pr-12">
              <MdEdit size={25} color="white" className="rounded bg-blue-500" />
              <RiDeleteBin6Fill size={25} color="red" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
