import { FaBars } from "react-icons/fa";
import PropTypes from "prop-types";
import { useState } from "react";
// import 

export default function LeadsReport({ currentReports }) {
  const [selectedLeads, setSelectedLeads] = useState([]);

  const handleSelectLead = (id) => {
    setSelectedLeads((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((leadId) => leadId !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <table className="min-w-full bg-white">
      {/* ----------------- TABLE HEAD START ----------------- */}
      <thead>
        <tr className="border-gray-300 border-b-2">
          {/* CHECKBOX */}
          <th className="px-3 py-3 w-max">
            <input type="checkbox" />
          </th>
          {/* LEAD ID */}
          <th className="px-2 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap pr-2">Lead ID</span>
              <FaBars />
            </div>
          </th>
          {/* LEAD NAME */}
          <th className="px-2 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap pr-2">Lead Name</span>
              <FaBars />
            </div>
          </th>
          {/* MOBILE */}
          <th className="px-2 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap pr-2">Mobile</span>
              <FaBars />
            </div>
          </th>
          {/* MANAGE BY */}
          <th className="px-2 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap pr-2">Managed By</span>
              <FaBars />
            </div>
          </th>
          {/* LEAD STATUS */}
          <th className="px-2 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap pr-2">Lead Status</span>
              <FaBars />
            </div>
          </th>
          {/* LEAD SOURCE */}
          <th className="px-2 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap pr-2">Lead Source</span>
              <FaBars />
            </div>
          </th>
          {/* CLIENT CONTACT */}
          <th className="px-2 py-3 text-left border-r font-medium">
            <div className="flex items-center justify-between">
              <span className="text-nowrap pr-2">Segments</span>
              <FaBars />
            </div>
          </th>
          {/* LAST REMARKS */}
          <th className="px-2 py-3 text-left border-r font-medium">
            <span className="text-nowrap pr-2">Last Remarks</span>
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
            <td className="px-3 py-4 text-center w-max">
              <input
                type="checkbox"
                checked={selectedLeads.includes(report.id)}
                onChange={() => handleSelectLead(report.id)}
              />
            </td>
            {/* LEAD ID */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.id}
            </td>
            {/* LEAD NAME */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.name}
            </td>
            {/* MOBILE */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.mobileNo}
            </td>
            {/* ASSIGNED TO */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.assigned_To}
            </td>
            {/* LEAD STATUS */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.leadesStatus}
            </td>
            {/* LEAD SOURCE */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              {report.leadsSource}
            </td>
             {/* SEGMENT */}
             <td className="px-1 py-4 border-b border-gray-300 text-sm max-w-36 min-w-24">
                          <div className="grid grid-cols-2 gap-1 items-center">
                            {report.segments &&
                              report.segments.map(
                                (segment, index) =>
                                  segment.length > 1 && (
                                    <span key={index} className="">
                                      {segment}
                                    </span>
                                  )
                              )}
                          </div>
                        </td>
            {/* LAST REMARKS */}
            <td className="px-2 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
              <div
                dangerouslySetInnerHTML={{ __html: report.description }}
              />
            </td>
          </tr>
        ))}
      </tbody>
      {/* ----------------- TABLE BODY END ----------------- */}
    </table>
  );
}

LeadsReport.propTypes = {
  currentReports: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      mobileNo: PropTypes.string.isRequired,
      assigned_To: PropTypes.string.isRequired,
      leadesStatus: PropTypes.string.isRequired,
      leadsSource: PropTypes.string.isRequired,
      contactId: PropTypes.string.isRequired,
      lastRemarks: PropTypes.string.isRequired,
    })
  ).isRequired,
};
