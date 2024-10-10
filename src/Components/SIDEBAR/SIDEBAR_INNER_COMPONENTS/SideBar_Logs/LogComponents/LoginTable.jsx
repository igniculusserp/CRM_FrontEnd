import { FaBars } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Fill } from 'react-icons/ri';

export default function LoginTable({ currentLogs }) {
  return (
    <table className="min-w-full bg-white">
      {/* -------------- TABLE HEAD START -------------- */}
      <thead>
        <tr className="border-gray-300 border-b-2">
          {/* CHECKBOX */}
          <th className="pl-3 py-3  text-left font-medium ">
            <input type="checkbox" />
          </th>
          {/* USERNAME */}
          <th className="px-3 py-3  text-left  border-r font-medium ">
            <div className="flex items-center justify-between">
              <span>Username</span>
              <FaBars />
            </div>
          </th>
          {/* IP ADDRESS */}
          <th className="px-6 py-3  text-left  border-r font-medium ">
            <div className="flex items-center justify-between">
              <span>IP Address</span>
              <FaBars />
            </div>
          </th>
          {/* MAC ADDRESS */}
          <th className="px-6 py-3  text-left  border-r font-medium ">
            <div className="flex items-center justify-between">
              <span>Mac Address</span>
              <FaBars />
            </div>
          </th>
          {/* LOGIN TIME */}
          <th className="px-6 py-3  text-left  border-r font-medium ">
            <div className="flex items-center justify-between">
              <span>Log In Time</span>
              <FaBars />
            </div>
          </th>
          {/* ACTION */}
          <th className="px-6 py-3  text-left  border-r font-medium ">
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
            className="cursor-pointer hover:bg-gray-200 border-gray-300 border-b"
          >
            {/*   CHECKBOX */}
            <td className="pl-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              <input type="checkbox" />
            </td>
            {/*   USERNAME */}
            <td className="px-1 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              <div className="flex gap-2 items-center">{log.username}</div>
            </td>
            {/*   IP ADDRESS */}
            <td className="px-6 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              <div className="flex gap-2 items-center">
                {log.ipAddress}
              </div>
            </td>
            {/*   MAC ADDRESS */}
            <td className="px-6 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              <p className="w-[120px] break-words">{log.macAddress}</p>
            </td>
            {/*   LOG IN TIME */}
            <td className="px-6 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              <p className="w-[120px] break-words">{log.givenTime}</p>
            </td>
            {/*   ACTIONS */}
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
      {/* -------------- TABLE BODY END -------------- */}
    </table>
  );
}