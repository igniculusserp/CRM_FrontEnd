import { FaBars } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function UserReportTable({currentReports}) {
  return (
    <table className="min-w-full bg-white">
      {/* ----------------- TABLE HEAD START ----------------- */}
      <thead>
        <tr className="border-gray-300 border-b-2">
          {/* CHECKBOX */}
          <th className="px-1 py-3 w-max">
            <input type="checkbox" />
          </th>
          {/* STATUS */}
          <th className="py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between px-3">
              <span className="text-nowrap">Status</span>
              <FaBars />
            </div>
          </th>
          {/* ACTIONS BUTTON */}
          <th className="px-8 py-3 border-r font-medium text-right">
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
            <td className="px-1 py-4 text-center w-max">
              <input type="checkbox" />
            </td>
            {/* STATUS */}
            <td className="px-1 py-4 border-b border-gray-300 text-sm leading-5 text-blue-600">
              {report.status}
            </td>
            {/* ACTIONS */}
            <td className="py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              <div className="flex gap-2 items-center text-blue-600 justify-end px-6">
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
