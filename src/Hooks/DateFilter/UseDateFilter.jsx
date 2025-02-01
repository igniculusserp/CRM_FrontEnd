import { useState, useEffect } from "react";
import { ImFilter } from "react-icons/im";
import { TbRefresh } from "react-icons/tb";

export default function UseDateFilter() {

  // ----------------------------- Date Filter -----------------------------

  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  // Function to filter based on date range
  function handle_DateRange(startDate, endDate) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0); // Set to the start of the day

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Set to the end of the day

    const filteredFollows = followupList.filter((follow) => {
      const callbackDate = new Date(follow.call_bck_DateTime);
      // Log values for debugging
      console.log("Callback Date:", callbackDate, "Start:", start, "End:", end);
      return callbackDate >= start && callbackDate <= end;
    });

    setFilteredLeads(filteredFollows); // Update filtered results
  }

  // Trigger handle_DateRange when startDate or endDate changes
  useEffect(() => {
    if (new Date(startDate) <= new Date(endDate)) {
      handle_DateRange(startDate, endDate);
    } else {
      console.error("Start date cannot be after end date");
    }
  }, [startDate, endDate]);


    //------------------------------------------------------Filter Reset Settings ---------------------------------------------
    const handleResetFilter = () => {
      setFilteredLeads(followupList);
      // setLeadStatus('All Lead');
      setAssignedTo("Managed By");
    };


  return (
    <>
      
       
          {/* ------------------- Filter by date ----------------- */}
          <div className="date_Filter_Main_Container">
            {/* ------------------- Filter by date ----------------- */}
            <div className="date_Filter_Main_Container flex items-center justify-between rounded-lg border-2 border-gray-300 bg-white p-2">
              {/* Filter Icon Button */}
              <div className="flex items-center">
                <button className="border-r border-gray-500 pr-2">
                  <ImFilter className="filter_Image_Size" />
                </button>

                {/* Date Range Filter Button */}
                <button className="filter_Image_Display whitespace-nowrap border-r border-gray-500 px-2">
                  Filter By
                </button>

                {/* Date Range Inputs */}
                <div className="filter_Date_Container flex items-center gap-2 px-2">
                  <label className="hide_Filter_Text">From:</label>
                  <input
                    type="date"
                    value={startDate}
                    className="filter_Date rounded border px-2 py-2"
                    onChange={(e) => setStartDate(e.target.value)}
                  />

                  <label className="hide_Filter_Text">To:</label>
                  <input
                    type="date"
                    value={endDate}
                    className="filter_Date rounded border px-2 py-2"
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              <div
                className="reset_paddings flex cursor-pointer items-center gap-2 rounded border p-2"
                onClick={handleResetFilter}
              >
                <label className="hide_Filter_Text">Reset</label>
                <TbRefresh className="filter_Reset_Image" />
              </div>
            </div>
          </div>
    </>
  );
}
