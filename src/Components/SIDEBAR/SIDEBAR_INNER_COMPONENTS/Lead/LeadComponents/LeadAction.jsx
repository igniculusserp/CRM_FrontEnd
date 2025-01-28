import { FaBars } from "react-icons/fa";
import PropTypes from "prop-types";

export default function LeadAction({ currentLeads }) {
  return (
    <table className="min-w-full bg-white">
      {/* ----------------- TABLE HEAD START ----------------- */}
      <thead>
        <tr className="border-b-2 border-gray-300">
          {/* CHECKBOX */}
          <th className="px-1 py-3">
            <input type="checkbox" />
          </th>
          {/* CLIENT NAME */}
          <th className="border-r px-3 py-3 text-left font-medium">
            <div className="flex items-center justify-between">
              <span>Employee Name</span>
              <FaBars />
            </div>
          </th>
          {/* LEAD COUNT */}
          <th className="border-r px-3 py-3 text-left font-medium">
            <span>Lead Count</span>
          </th>
        </tr>
      </thead>
      {/* ----------------- TABLE HEAD END ----------------- */}

      {/* ----------------- TABLE BODY START ----------------- */}
      <tbody>
        {currentLeads.map((lead, index) => (
          <tr
            key={index}
            className="cursor-pointer border-b border-gray-300 hover:bg-gray-200"
          >
            {/* CHECKBOX */}
            <td className="w-max px-3 py-4 text-center">
              <input type="checkbox" />
            </td>
            {/* CLIENT NAME */}
            <td className="border-b border-gray-300 px-3 py-4 text-sm leading-5 text-gray-600">
              <div className="flex items-center">
                {/* <img className="h-8 w-8 rounded-full" src={lead.img} alt="DP" /> */}
                <span className="ml-2 w-[80px] break-words">
                  {lead.userName}
                </span>
              </div>
            </td>
            {/* LEAD COUNT */}
            <td className="border-b border-gray-300 px-3 py-4 text-sm leading-5 text-gray-600">
              <p>{lead.totalLeads}</p>
            </td>
          </tr>
        ))}
      </tbody>
      {/* ----------------- TABLE BODY END ----------------- */}
    </table>
  );
}

// PropTypes validation
LeadAction.propTypes = {
  currentLeads: PropTypes.arrayOf(
    PropTypes.shape({
      userName: PropTypes.string,
      totalLeads: PropTypes.number,
    }),
  ).isRequired,
};
