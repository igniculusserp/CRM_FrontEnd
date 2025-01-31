//react icons
import { FaBars, FaPhone } from "react-icons/fa";

//prop
import PropTypes from "prop-types";
export default function LeadOperations({
  currentLeads,
  selectedIds,
  handleOnCheckBox,
  isSelectAllChecked,
  handleSelectAllCheckbox,
}) {
  return (
    <>
      <table className="min-w-full bg-white">
        {/* ----------------- TABLE HEAD START ----------------- */}
        <thead>
          <tr className="border-b-2 border-gray-300">
            {/* CHECKBOX */}
            <th className="w-max px-1 py-3">
              <input
                type="checkbox"
                checked={isSelectAllChecked}
                onChange={handleSelectAllCheckbox}
              />
            </th>
            {/* CLIENT NAME */}
            <th className="border-r px-3 py-3 text-left font-medium">
              <div className="flex items-center justify-between">
                <span>Client Name</span>
                <FaBars />
              </div>
            </th>
            {/* MOBILE */}
            <th className="border-r px-3 py-3 text-left font-medium">
              <div className="flex items-center justify-between">
                <span>Mobile</span>
                <FaBars />
              </div>
            </th>
            {/* ASSIGNED TO */}
            <th className="border-r px-3 py-3 text-left font-medium">
              <div className="flex items-center justify-between">
                <span>Assigned To</span>
                <FaBars />
              </div>
            </th>
            {/* LEAD STATUS */}
            <th className="border-r px-3 py-3 text-left font-medium">
              <div className="flex items-center justify-between">
                <span>Lead Status</span>
                <FaBars />
              </div>
            </th>
            {/* LEAD SOURCE */}
            <th className="border-r px-3 py-3 text-left font-medium">
              <div className="flex items-center justify-between">
                <span>Lead Source</span>
                <FaBars />
              </div>
            </th>
            {/* SEGMENT */}
            <th className="border-r px-3 py-3 text-left font-medium">
              <div className="flex items-center justify-between">
                <span>Segment</span>
                <FaBars />
              </div>
            </th>
            {/* BP NAME */}
            <th className="border-r px-3 py-3 text-left font-medium">
              <div className="flex items-center justify-between">
                <span>BP Name</span>
                <FaBars />
              </div>
            </th>
          </tr>
        </thead>
        {/* ----------------- TABLE BODY START ----------------- */}
        <tbody>
          {currentLeads.map((lead, index) => (
            <tr
              key={index}
              className="cursor-pointer border-b border-gray-300 hover:bg-gray-200"
            >
              {/* CHECKBOX */}
              <td className="w-max px-3 py-4 text-center">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(lead.id)}
                  onChange={(e) => handleOnCheckBox(e, lead)}
                />
              </td>
              {/* CLIENT NAME */}
              <td className="border-b border-gray-300 px-3 py-4 text-sm leading-5 text-gray-600">
                <div className="flex items-center">
                  <span className="ml-2 w-[80px] break-words">{lead.name}</span>
                </div>
              </td>
              {/* MOBILE */}
              <td className="border-b border-gray-300 px-3 py-4 text-sm leading-5 text-gray-600">
                <div className="flex items-center gap-2">
                  {lead.mobileNo}
                  <FaPhone className="text-sm text-red-400" />
                </div>
              </td>
              {/* ASSIGNED TO */}
              <td className="border-b border-gray-300 px-3 py-4 text-sm leading-5 text-gray-600">
                {lead.assigned_To}
              </td>
              {/* LEAD STATUS */}
              <td className="border-b border-gray-300 px-3 py-4 text-sm leading-5 text-gray-600">
                {lead.leadesStatus}
              </td>
              {/* LEAD SOURCE */}
              <td className="border-b border-gray-300 px-3 py-4 text-sm leading-5 text-gray-600">
                <p className="text-blue-600">{lead.leadsSource}</p>
              </td>
              {/* SEGMENT */}
              <td className="border-b border-gray-300 px-3 py-4 text-sm leading-5 text-gray-600">
                <div>
                  {lead.segments && (
                    <span>
                      {lead.segments
                        .filter((segment) => segment.length > 1)
                        .join(", ")}
                    </span>
                  )}
                </div>
              </td>
              {/* BP NAME */}
              <td className="border-b border-gray-300 px-3 py-4 text-sm leading-5 text-gray-600">
                <p>{lead.bpName}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

// PropTypes validation
LeadOperations.propTypes = {
  currentLeads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      mobileNo: PropTypes.string,
      assigned_To: PropTypes.string,
      leadesStatus: PropTypes.string,
      leadsSource: PropTypes.string,
      segments: PropTypes.arrayOf(PropTypes.string),
      bpName: PropTypes.string,
    }),
  ).isRequired,
  selectedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleOnCheckBox: PropTypes.func.isRequired,
  isSelectAllChecked: PropTypes.bool.isRequired,
  handleSelectAllCheckbox: PropTypes.func.isRequired,
};
