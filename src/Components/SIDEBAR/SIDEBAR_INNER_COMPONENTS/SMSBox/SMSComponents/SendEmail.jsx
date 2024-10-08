import { FaBars } from 'react-icons/fa';

export default function SendEmail({ currentSms }) {
  return (
    <table className="min-w-full bg-white">
      {/* ----------------- TABLE HEAD START ----------------- */}
      <thead>
        <tr className="border-gray-300 border-b-2">
          {/* CHECKBOX */}
          <th className="px-3 py-3 w-max">
            <input type="checkbox" />
          </th>
          {/* SEGMENT */}
          <th className="px-3 py-3 text-left border-r font-medium">
            <span>Segment</span>
          </th>
          {/* SUBJECT */}
          <th className="px-3 py-3 text-left border-r font-medium">
            <span>Subject</span>
          </th>
          {/* MESSAGE */}
          <th className="px-3 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span>Message</span>
              <FaBars />
            </div>
          </th>
          {/* SENT BY */}
          <th className="px-3 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span>Sent By</span>
              <FaBars />
            </div>
          </th>
          {/* SENT TIME */}
          <th className="px-3 py-3 text-left border-r font-medium">
            <span>Sent Time</span>
          </th>
        </tr>
      </thead>
      {/* ----------------- TABLE HEAD END ----------------- */}
      {/* ----------------- TABLE BODY START ----------------- */}
      <tbody>
        {currentSms.map((sms, index) => (
          <tr
            key={index}
            onClick={() => handleClick(sms)}
            className="cursor-pointer hover:bg-gray-200 border-gray-300 border-b"
          >
            {/*   CHECKBOX */}
            <td className="px-3 py-3 text-center w-max">
              <input
                type="checkbox"
                onClick={(e) => handleCheckboxClick(e, sms.id)}
              />
            </td>
            {/* SEGMENT */}
            <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              <span>{sms.segment}</span>
            </td>
            {/* SUBJECT */}
            <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              <span>{sms.subject}</span>
            </td>
            {/* MESSAGE */}
            <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {sms.message}
            </td>
            {/* SENT BY */}
            <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {sms.sentBy}
            </td>
            {/* SENT TIME */}
            <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {sms.sentTime}
            </td>
          </tr>
        ))}
      </tbody>
      {/* ----------------- TABLE BODY END ----------------- */}
    </table>
  );
}
