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


            <div className="p-1 border rounded cursor-pointer" onClick={() => setFilteredLeads(getleads)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="26"
                  height="26"
                  viewBox="0,0,256,256"
                >
                  <g
                    fill="#06b6d4"
                    fillRule="nonzero"
                    stroke="none"
                    strokeWidth="1"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    strokeMiterlimit="10"
                    strokeDasharray=""
                    strokeDashoffset="0"
                    fontFamily="none"
                    fontWeight="none"
                    fontSize="none"
                    textAnchor="none"
                    style={{ mixBlendMode: "normal" }} // Fixed style prop
                  >
                    <g transform="scale(8.53333,8.53333)">
                      <path d="M15,3c-2.9686,0 -5.69718,1.08344 -7.79297,2.875c-0.28605,0.22772 -0.42503,0.59339 -0.36245,0.95363c0.06258,0.36023 0.31676,0.6576 0.66286,0.77549c0.3461,0.1179 0.72895,0.03753 0.99842,-0.20959c1.74821,-1.49444 4.01074,-2.39453 6.49414,-2.39453c5.19656,0 9.45099,3.93793 9.95117,9h-2.95117l4,6l4,-6h-3.05078c-0.51129,-6.14834 -5.67138,-11 -11.94922,-11zM4,10l-4,6h3.05078c0.51129,6.14834 5.67138,11 11.94922,11c2.9686,0 5.69718,-1.08344 7.79297,-2.875c0.28605,-0.22772 0.42504,-0.59339 0.36245,-0.95363c-0.06258,-0.36023 -0.31676,-0.6576 -0.66286,-0.7755c-0.3461,-0.1179 -0.72895,-0.03753 -0.99842,0.20959c-1.74821,1.49444 -4.01074,2.39453 -6.49414,2.39453c-5.19656,0 -9.45099,-3.93793 -9.95117,-9h2.95117z"></path>
                    </g>
                  </g>
                </svg>
            </div>


          </div>
        </div>

       
      </div>
    </>
  );
}



  //------------------------------------------------------Filter Reset Settings ---------------------------------------------

  const handleResetFilter = () => {
    setFilteredLeads(getleads);
    setLeadStatus('All Lead');
    setAssignedTo("Managed By");
  };


  onClick={handleResetFilter}