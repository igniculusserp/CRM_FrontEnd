import { FaBars } from "react-icons/fa";

export default function LeadAction({ currentLeads }) {
  return (
    <table className="min-w-full bg-white">
      {/* ----------------- TABLE HEAD START ----------------- */}
      <thead>
        <tr className="border-gray-300 border-b-2">
          {/* CHECKBOX */}
          <th className="px-1 py-3">
            <input type="checkbox" />
          </th>
          {/* CLIENT NAME */}
          <th className="px-3 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span>Client Name</span>
              <FaBars />
            </div>
          </th>
          {/* LEAD COUNT */}
          <th className="px-3 py-3 text-left border-r font-medium">
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
            className="cursor-pointer hover:bg-gray-200 border-gray-300 border-b"
          >
            {/* CHECKBOX */}
            <td className="px-3 py-4 text-center w-max">
              <input type="checkbox" />
            </td>
            {/* CLIENT NAME */}
            <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              <div className="flex items-center">
                {/* <img className="h-8 w-8 rounded-full" src={lead.img} alt="DP" /> */}
                <span className="ml-2 w-[80px] break-words">
                  {lead.userName}
                </span>
              </div>
            </td>
            {/* LEAD COUNT */}
            <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              <p>{lead.totalLeads}</p>
            </td>
          </tr>
        ))}
      </tbody>
      {/* ----------------- TABLE BODY END ----------------- */}
    </table>
  );
}