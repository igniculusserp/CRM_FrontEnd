import { useEffect } from "react";
import PropTypes from "prop-types";
import { ImFilter } from "react-icons/im";
import { TbRefresh } from "react-icons/tb";

export default function UseDateFilter({
  startDate,
  endDate,
  onDateChange,
  onReset,
  followupList,
  setFilteredLeads,
}) {
  // Function to filter leads based on date range
  const filterByDateRange = () => {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const filtered = followupList.filter((follow) => {
      const callbackDate = new Date(follow.call_bck_DateTime);
      return callbackDate >= start && callbackDate <= end;
    });

    setFilteredLeads(filtered);
  };

  // Apply filter on date change
  useEffect(() => {
    filterByDateRange();
  }, [startDate, endDate]);

  return (
    <div className="date_Filter_Main_Container">
      <div className="flex items-center justify-between rounded-lg border-2 border-gray-300 bg-white p-2">
        {/* Filter Icon & Label */}
        <div className="flex items-center">
          <button className="border-r border-gray-500 pr-2">
            <ImFilter className="filter_Image_Size" />
          </button>

          <button className="filter_Image_Display whitespace-nowrap border-r border-gray-500 px-2">
            Filter By
          </button>

          {/* Date Inputs */}
          <div className="flex items-center gap-2 px-2">
            <label className="hide_Filter_Text">From:</label>
            <input
              type="date"
              value={startDate}
              className="filter_Date rounded border px-2 py-2"
              onChange={(e) => onDateChange("startDate", e.target.value)}
            />

            <label className="hide_Filter_Text">To:</label>
            <input
              type="date"
              value={endDate}
              className="filter_Date rounded border px-2 py-2"
              onChange={(e) => onDateChange("endDate", e.target.value)}
            />
          </div>
        </div>

        {/* Reset Button */}
        <div
          className="reset_paddings flex cursor-pointer items-center gap-2 rounded border p-2"
          onClick={onReset}
        >
          <label className="hide_Filter_Text">Reset</label>
          <TbRefresh className="filter_Reset_Image" />
        </div>
      </div>
    </div>
  );
}

UseDateFilter.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  onDateChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  followupList: PropTypes.array.isRequired,
  setFilteredLeads: PropTypes.func.isRequired,
};
