import { FaBars } from "react-icons/fa";
import PropTypes from "prop-types";

export default function SendEmail({ currentSms }) {
  return (
    <table className="leads_Table min-w-full bg-white">
      {/* ----------------- TABLE HEAD START ----------------- */}
      <thead>
        <tr className="border-b-2 border-gray-300">
          {/* CHECKBOX */}
          <th className="w-max px-3 py-3">
            <input type="checkbox" />
          </th>
          {/* SEGMENT */}
          <th className="border-r px-3 py-3 text-left font-medium">
            <span>Segment</span>
          </th>
          {/* SUBJECT */}
          <th className="border-r px-3 py-3 text-left font-medium">
            <span>Subject</span>
          </th>
          {/* MESSAGE */}
          <th className="border-r px-3 py-3 text-left font-medium">
            <div className="flex items-center justify-between">
              <span>Message</span>
              <FaBars />
            </div>
          </th>
          {/* SENT BY */}
          <th className="border-r px-3 py-3 text-left font-medium">
            <div className="flex items-center justify-between">
              <span>Sent By</span>
              <FaBars />
            </div>
          </th>
          {/* SENT TIME */}
          <th className="border-r px-3 py-3 text-left font-medium">
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
            className="cursor-pointer border-b border-gray-300 hover:bg-gray-200"
          >
            {/*   CHECKBOX */}
            <td className="w-max px-3 py-3 text-center">
              <input
                type="checkbox"
                // onClick={(e) => handleCheckboxClick(e, sms.id)}
              />
            </td>
            {/* SEGMENT */}
            <td className="border-b border-gray-300 px-3 py-4 text-sm leading-5 text-gray-600">
              <span>{sms.products}</span>
            </td>
            {/* SUBJECT */}
            <td className="border-b border-gray-300 px-3 py-4 text-sm leading-5 text-gray-600">
              <span>{sms.subject}</span>
            </td>
            {/* MESSAGE */}
            <td className="border-b border-gray-300 px-3 py-4 text-sm leading-5 text-gray-600">
              {sms.message}
            </td>
            {/* SENT BY */}
            <td className="border-b border-gray-300 px-3 py-4 text-sm leading-5 text-gray-600">
              {sms.lastModifiedBy}
            </td>
            {/* SENT TIME */}
            <td className="border-b border-gray-300 px-3 py-4 text-sm leading-5 text-gray-600">
              {sms.sentDateTime.replace("T", " ")}
            </td>
          </tr>
        ))}
      </tbody>
      {/* ----------------- TABLE BODY END ----------------- */}
    </table>
  );
}

SendEmail.propTypes = {
  currentSms: PropTypes.array.isRequired,
};
