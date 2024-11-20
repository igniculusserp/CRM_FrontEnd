import { FaBars } from 'react-icons/fa';
import PropTypes from "prop-types";

export default function SendSMS({ currentSms }) {
  return (
    <table className="min-w-full bg-white">
      {/* ----------------- TABLE HEAD START ----------------- */}
      <thead>
        <tr className="border-gray-300 border-b-2">
          {/* CHECKBOX */}
          <th className="px-3 py-3 w-max">
            <input type="checkbox" />
          </th>
          {/* CLIENT NAME */}
          <th className="px-3 py-3 text-left border-r font-medium">
            <span>Segment</span>
          </th>
          {/* MOBILE */}
          <th className="px-3 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span>Message</span>
              <FaBars />
            </div>
          </th>
          {/* SMS */}
          <th className="px-3 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span>Sent By</span>
              <FaBars />
            </div>
          </th>
          {/* TYPE */}
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
            // onClick={() => handleClick(sms)}
            className="cursor-pointer hover:bg-gray-200 border-gray-300 border-b"
          >
            {/*   CHECKBOX */}
            <td className="px-3 py-3 text-center w-max">
              <input
                type="checkbox"
                // onClick={(e) => handleCheckboxClick(e, sms.id)}
              />
            </td>
            {/* CLIENT NAME AND IMAGE */}
            <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              <div className="flex items-center">
                <span>{sms.products}</span>
              </div>
            </td>
            {/* MOBILE */}
            <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {sms.textMessage}
            </td>
            {/* SMS */}
            <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {sms.lastModifiedBy}
            </td>
            {/* TYPE */}
            <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {sms.sentDateTime.replace("T", " ")}
            </td>
          </tr>
        ))}
      </tbody>
      {/* ----------------- TABLE BODY END ----------------- */}
    </table>
  );
}
SendSMS.propTypes = {
  currentSms: PropTypes.array.isRequired,
};
