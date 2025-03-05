import { useState } from "react";
import PropTypes from "prop-types";
import { ImFilter } from "react-icons/im";
import { TbRefresh } from "react-icons/tb";

export default function UseDateFilter({
  onReset,
  originalData,
  setFilteredData,
  filteredData,
}) {
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const onDateChange = (field, value) => {
    let newStartDate = startDate;
    let newEndDate = endDate;

    if (field === "startDate") {
      newStartDate = value;
    } else {
      newEndDate = value;
    }

    // Update state first
    setStartDate(newStartDate);
    setEndDate(newEndDate);

    // Now filter with the updated values
    filterByDateRange(newStartDate, newEndDate);
  };


  const handleResetClick = () => {
    setStartDate(today);
    setEndDate(today);
    setFilteredData(originalData);
    onReset();
  };

  const filterByDateRange = (start, end) => {
    if (!filteredData || filteredData.length === 0) return;

    const startDateObj = new Date(start);
    startDateObj.setHours(0, 0, 0, 0);
    const endDateObj = new Date(end);
    endDateObj.setHours(23, 59, 59, 999);

    const filtered = filteredData.filter((follow) => {
      const callbackDate = new Date(follow.call_bck_DateTime);
      return callbackDate >= startDateObj && callbackDate <= endDateObj;
    });

    setFilteredData(filtered);
  };

  return (
    <div className="date_Filter_Main_Container">
      <div className="flex items-center justify-between p-2 bg-white border-2 border-gray-300 rounded-lg">
        {/* Filter Icon & Label */}
        <div className="flex items-center">
          <button className="pr-2 border-r border-gray-500">
            <ImFilter className="filter_Image_Size" />
          </button>

          <button className="px-2 border-r border-gray-500 filter_Image_Display whitespace-nowrap">
            Filter By
          </button>

          {/* Date Inputs */}
          <div className="flex items-center gap-2 px-2">
            <label className="hide_Filter_Text">From:</label>
            <input
              type="date"
              value={startDate}
              className="px-2 py-2 border rounded filter_Date"
              onChange={(e) => onDateChange("startDate", e.target.value)}
            />

            <label className="hide_Filter_Text">To:</label>
            <input
              type="date"
              value={endDate}
              className="px-2 py-2 border rounded filter_Date"
              onChange={(e) => onDateChange("endDate", e.target.value)}
            />
          </div>
        </div>

        {/* Reset Button */}
        <div
          className="flex items-center gap-2 p-2 border rounded cursor-pointer reset_paddings"
          onClick={() => handleResetClick()}
        >
          <label className="hide_Filter_Text">Reset</label>
          <TbRefresh className="filter_Reset_Image" />
        </div>
      </div>
    </div>
  );
}

UseDateFilter.propTypes = {
  onReset: PropTypes.func.isRequired,
  originalData: PropTypes.array.isRequired,
  setFilteredData: PropTypes.func.isRequired,
  filteredData: PropTypes.array.isRequired,
};
