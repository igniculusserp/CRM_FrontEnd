import { FaBars } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function LoginTable({ currentLogs }) {
  return (
    <table className="min-w-full bg-white">
      {/* -------------- TABLE HEAD START -------------- */}
      <thead>
        <tr className="border-b-2 border-gray-300">
          {/* CHECKBOX */}
          <th className="py-3 pl-3 text-left font-medium">
            <input type="checkbox" />
          </th>
          {/* USERNAME */}
          <th className="border-r px-3 py-3 text-left font-medium">
            <div className="flex items-center justify-between">
              <span>Username</span>
              <FaBars />
            </div>
          </th>
          {/* IP ADDRESS */}
          <th className="border-r px-6 py-3 text-left font-medium">
            <div className="flex items-center justify-between">
              <span>IP Address</span>
              <FaBars />
            </div>
          </th>
          {/* MAC ADDRESS */}
          <th className="border-r px-6 py-3 text-left font-medium">
            <div className="flex items-center justify-between">
              <span>Mac Address</span>
              <FaBars />
            </div>
          </th>
          {/* LOGIN TIME */}
          <th className="border-r px-6 py-3 text-left font-medium">
            <div className="flex items-center justify-between">
              <span>Log In Time</span>
              <FaBars />
            </div>
          </th>
          {/* ACTION */}
          <th className="border-r px-6 py-3 text-left font-medium">
            <span>Action</span>
          </th>
        </tr>
      </thead>
      {/* -------------- TABLE HEAD END -------------- */}
      {/* -------------- TABLE BODY START -------------- */}
      <tbody>
        {currentLogs.map((log, i) => (
          <tr
            key={i}
            className="cursor-pointer border-b border-gray-300 hover:bg-gray-200"
          >
            {/*   CHECKBOX */}
            <td className="border-b border-gray-300 py-4 pl-3 text-sm leading-5 text-gray-600">
              <input type="checkbox" />
            </td>
            {/*   USERNAME */}
            <td className="border-b border-gray-300 px-1 py-4 text-sm leading-5 text-gray-600">
              <div className="flex items-center gap-2">{log.username}</div>
            </td>
            {/*   IP ADDRESS */}
            <td className="border-b border-gray-300 px-6 py-4 text-sm leading-5 text-gray-600">
              <div className="flex items-center gap-2">{log.ipAddress}</div>
            </td>
            {/*   MAC ADDRESS */}
            <td className="border-b border-gray-300 px-6 py-4 text-sm leading-5 text-gray-600">
              <p className="w-[120px] break-words">{log.macAddress}</p>
            </td>
            {/*   LOG IN TIME */}
            <td className="border-b border-gray-300 px-6 py-4 text-sm leading-5 text-gray-600">
              <p className="w-[120px] break-words">{log.givenTime}</p>
            </td>
            {/*   ACTIONS */}
            <td className="border-b border-gray-300 px-6 py-4 text-sm leading-5 text-gray-600">
              <div className="flex items-center gap-2 text-blue-600">
                <MdEdit
                  size={25}
                  color="white"
                  className="rounded bg-blue-500"
                />
                <RiDeleteBin6Fill size={25} color="red" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      {/* -------------- TABLE BODY END -------------- */}
    </table>
  );
}
