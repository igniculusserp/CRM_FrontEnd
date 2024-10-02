import { FaBars } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Fill } from 'react-icons/ri';

export default function Chat({ currentLogs }) {
  return (
    <table className="min-w-full bg-white">
      {/* -------------- TABLE HEAD START -------------- */}
      <thead>
        <tr className="border-gray-300 border-b-2">
          {/* CHECKBOX */}
          <th className="pl-3 py-3  text-left font-medium ">
            <input type="checkbox" />
          </th>
          {/* FROM USERNAME */}
          <th className="px-3 py-3  text-left  border-r font-medium ">
            <div className="flex items-center justify-between">
              <span>From Username</span>
              <FaBars />
            </div>
          </th>
          {/* TO USERNAME */}
          <th className="px-6 py-3  text-left  border-r font-medium ">
            <div className="flex items-center justify-between">
              <span>To Username</span>
              <FaBars />
            </div>
          </th>
          {/* Message */}
          <th className="px-6 py-3  text-left  border-r font-medium ">
            <div className="flex items-center justify-between">
              <span>Message</span>
              <FaBars />
            </div>
          </th>
          {/* Created Time */}
          <th className="px-6 py-3  text-left  border-r font-medium ">
            <div className="flex items-center justify-between">
              <span>Created Time</span>
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
        {currentLogs?.map((log, i) => (
          <tr
            key={i}
            className="cursor-pointer hover:bg-gray-200 border-gray-300 border-b"
          >
            {/*   CHECKBOX */}
            <td className="pl-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              <input type="checkbox" />
            </td>
            {/*   FROM USERNAME */}
            <td className="px-1 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              <div className="flex gap-2 items-center">{log.fromUsername}</div>
            </td>
            {/*   TO USERNAME */}
            <td className="px-6 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              <div className="flex gap-2 items-center">{log.toUsername}</div>
            </td>
            {/*   MESSAGE */}
            <td className="px-6 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              <div className="flex gap-2 items-center">
                <p className="w-[120px] break-words">{log.message}</p>
              </div>
            </td>
            {/*   CREATED TIME */}
            <td className="px-6 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              <div className="flex gap-2 items-center">{log.created}</div>
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
