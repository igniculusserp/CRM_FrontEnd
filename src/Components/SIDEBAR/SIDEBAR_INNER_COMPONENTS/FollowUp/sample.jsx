import { useState, useEffect } from "react";
//external Packages
import axios from "axios";
import { ImFilter } from "react-icons/im";
//Folder Imported
import { tenant_base_url, protocal_url } from "./../../../../Config/config";
import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";


export default function FollowUp() {

  const bearer_token = localStorage.getItem("token");
  const name = getHostnamePart();
  
  const [followupList, setFollowupList] = useState([]);
 
  //created such that to filter leads according to leadStatus
  const [filteredLeads, setFilteredLeads] = useState([]); // Filtered
  //----------------GET----------------

  // Get Follow up lists
  const getFollowupLists = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/FollowUp/byusertoken`,
        config
      );
      if (response.status === 200) {
        const followup = response.data;
        setFollowupList(followup?.data);
        setFilteredLeads(followup?.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getFollowupLists();
  }, []);


  //---------------------->---------------------->PAGINATION<----------------------<----------------------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Define items per page

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //---------------------->---------------------->PAGINATION->FILTERLEADS/ <----------------------<----------------------
  const currentFollows = filteredLeads?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );



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

    const filteredFollows = getleads.filter((follow) => {
      const callbackDate = new Date(follow.call_bck_DateTime);
      // Log values for debugging
      console.log("Callback Date:", callbackDate, "Start:", start, "End:", end);
      return callbackDate >= start && callbackDate <= end;
    });

    setFilteredLeads(filteredFollows); 
  }

  // Trigger handle_DateRange when startDate or endDate changes
  useEffect(() => {
    if (new Date(startDate) <= new Date(endDate)) {
      handle_DateRange(startDate, endDate);
    } else {
      console.error("Start date cannot be after end date");
    }
  }, [startDate, endDate]);



  return (
    <>
      {/* -------- PARENT -------- */}
      <div className="min-h-screen flex flex-col m-3 ">
      
       
        {/* MIDDLE SECTION */}
        <div className="my-1 flex py-2 items-center justify-between gap-3">
         
          {/* ------------------- Filter by date ----------------- */}

          <div className="flex bg-white border-2 border-gray-300 py-2 rounded-lg justify-center items-center">
            {/* Filter Icon Button */}
            <button className="border-r border-gray-500 px-3">
              <ImFilter />
            </button>

            {/* Date Range Filter Button */}
            <button className="border-r border-gray-500 px-3">Filter By</button>

            {/* Date Range Inputs */}
            <div className="px-3 flex items-center gap-2">
              <label>From:</label>
              <input
                type="date"
                value={startDate}
                className="border rounded px-2 py-1"
                onChange={(e) => setStartDate(e.target.value)}
              />

              <label>To:</label>
              <input
                type="date"
                value={endDate}
                className="border rounded px-2 py-1"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>

       
      </div>
    </>
  );
}
