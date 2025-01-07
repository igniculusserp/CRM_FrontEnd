import { useState, useEffect } from "react";
//external Packages
import axios from "axios";
import PropTypes from 'prop-types';
//React Icons
import { FaBars } from "react-icons/fa";
import { ImFilter } from "react-icons/im";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { TbRefresh } from "react-icons/tb";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";

//Folder Imported
import { tenant_base_url, protocal_url } from "./../../../../../Config/config";
import { getHostnamePart } from "../../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";


import { ToastContainer } from "react-toastify";
import { showErrorToast, showSuccessToast } from "../../../../../utils/toastNotifications";

//Components
import AddBrokerage from "./Brokerage/AddBrokerage";
import EditBrokerage from "./Brokerage/EditBrokerage";


export default function BrokerageView({ setShowTopSection }) {
  //   const bearer_token = localStorage.getItem("token");
  const name = getHostnamePart();
  // All States
  //created such that to filter leads according to leadStatus
  const [rawData, setRawData] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [active, setActive] = useState(true);
  const [view, setView] = useState(false);
  const [editId, setEditId] = useState();





  //-------------------get-------------------get-------------------get-------------------get-------------------
  async function handleLead() {
    const bearer_token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/FinancialActivity/brokeragedetail/getall`,
        config
      );
      setRawData(response.data.data);
      setFilteredLeads(response.data.data);
    } catch (error) {
      showErrorToast(error.response.data.message);
    }
  }

  useEffect(() => {
    handleLead(); // Fetch the  list on initial load
  }, [active]);

  //---------------------->---------------------->PAGINATION<----------------------<----------------------
  //controlled from the bottom of the page
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Define items per page
  const totalPage = Math.ceil(filteredLeads.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  //---------------------->---------------------->PAGINATION->FILTERLEADS/ <----------------------<----------------------
  const currentLeads = filteredLeads?.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

    const filteredFollows = rawData.filter((follow) => {
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
    setFilteredLeads(rawData);
  };

  //----------------------------------------------------Handle Add ----------------------------------------------------------


  const handleAdd = () => {
    setActive(false);
    setView(true);
    setShowTopSection(false);
  };


  const handleEdit = (id) => {
    console.log("Editing ID:", id);
    setActive(false);
    setView(false);
    if (setShowTopSection) setShowTopSection(false);
    setEditId(id);
  };




  //--------------------------------------------------------Handle Delete--------------------------------------------

  const handleDelete = async (id) => {
    const bearer_token = localStorage.getItem('token');
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      await axios.delete(
        `${protocal_url}${name}.${tenant_base_url}/FinancialActivity/brokeragedetail/delete/${id}`,
        config
      );
      showSuccessToast('Deleted successfully');
      setFilteredLeads((prevData) => prevData.filter((item) => item.id !== id));
      // handleLead();
    } catch (error) {
      showErrorToast(error.response.data.message)
    }
  };

  const ViewTable = () => {
    return (
      <>
        {/* -------- PARENT -------- */}
        <div className="min-h-screen flex flex-col my-3 ">
          {/* MIDDLE SECTION */}
          <div className="my-1 flex py-2 items-center justify-end gap-3 bg-white border-2 border-gray-300 pr-2 rounded-lg">
            {/* ------------------- Filter by date ----------------- */}

            <div className="flex bg-white border-2 border-gray-300 py-2 pr-2 rounded-lg justify-center items-center">
              {/* Filter Icon Button */}
              <button className="border-r border-gray-500 px-3">
                <ImFilter />
              </button>

              {/* Date Range Filter Button */}
              <button className="border-r border-gray-500 px-3">
                Filter By
              </button>

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

              <div
                className="p-1 border rounded cursor-pointer"
                onClick={handleResetFilter}
              >
                <TbRefresh size={25} />
              </div>
            </div>
          </div>

          {/* Add SECTION */}
          <div className="flex min-w-screen justify-between items-center my-4">
            <h1 className="text-3xl font-medium">Brokerage View</h1>
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white p-2 min-w-10 text-sm rounded"
            >
              Add Brokerage View
            </button>
          </div>

          {/* TABLE VIEW */}
          <div className="overflow-x-auto leads_Table_Main_Container">
            <div className="min-w-full rounded-md leads_Table_Container">
              {/*--------------TABLE HEAD START------------- */}

              <table className="min-w-full bg-white leads_Table">
                <thead>
                  <tr className="border-gray-300 border-b-2">
                    <th className="px-1 py-3">
                      <input type="checkbox" />
                    </th>
                    <th className="px-2 py-3 text-left border-r font-medium">
                      <div className="flex justify-between items-center text-sm">
                        <span>Username</span>
                        <FaBars />
                      </div>
                    </th>
                    <th className="px-2 py-3 text-left border-r font-medium">
                      <div className="flex justify-between items-center text-sm">
                        <span>Brokerage Amount</span>
                        <FaBars />
                      </div>
                    </th>
                    <th className="px-2 py-3 text-left border-r font-medium">
                      <div className="flex justify-between items-center text-sm">
                        <span>Date</span>
                        <FaBars />
                      </div>
                    </th>
                    <th className="px-2 py-3 text-left border-r font-medium">
                      <div className="flex justify-between items-center text-sm">
                        <span>Reference No</span>
                        <FaBars />
                      </div>
                    </th>
                    <th className="px-2 py-3 text-left border-r font-medium">
                      <div className="flex justify-between items-center text-sm">
                        <span>Remark</span>
                        <FaBars />
                      </div>
                    </th>
                    <th className="px-2 py-3 text-left border-r font-medium">
                      <div className="flex justify-between items-center text-sm">
                        <span>Last Modified By</span>
                        <FaBars />
                      </div>
                    </th>
                    <th className="px-2 py-3 text-left border-r font-medium">
                      <div className="flex justify-between items-center text-sm">
                        <span>Action</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentLeads.map((data) => (
                    <tr
                      key={data.id}
                      className="cursor-pointer hover:bg-gray-200 border-gray-300 border-b"
                    >
                      <td className="px-1 py-3 text-center">
                        <input type="checkbox" />
                      </td>
                      <td className="px-2 py-4 text-sm max-w-24 break-words">
                        {data.userName}
                      </td>
                      <td className="px-2 py-4 text-sm max-w-24 break-words">
                        {data.brokerageAmount}
                      </td>
                      <td className="px-2 py-4 text-sm max-w-24 break-words">
                        {data?.date?.split("T")[0]}
                      </td>
                      <td className="px-2 py-4 text-sm max-w-24 break-words">
                        {data.referenceno}
                      </td>

                      <td className="px-2 py-4 text-sm max-w-24 break-words">
                        {data?.remarks}
                      </td>
                      <td className="px-2 py-4 text-sm max-w-24 break-words">
                        {data.lastmodifiedby}
                      </td>
                      <td className="px-2 py-4 flex gap-3">
                        <MdEdit
                          size={25}
                          color="white"
                          className="bg-blue-500 rounded"
                          onClick={() => handleEdit(data.id)}
                        />
                        <RiDeleteBin6Fill
                          size={25}
                          color="red"
                          onClick={() => handleDelete(data.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end my-4">
              {/* //---------------------->---------------------->PAGINATION-RENDERER<----------------------<---------------------- */}
              <nav className="flex items-center justify-center text-center  mx-auto gap-2 mt-4">
                {/* /---------------------->Previous Button <----------------------< */}
                <button
                  onClick={() => paginate(currentPage - 1)}
                  className={`p-1 shadow-md rounded-full text-white ${currentPage === 1
                      ? "border-gray-200 border-2"
                      : "bg-cyan-500 border-2 border-gray-100"
                    }`}
                  disabled={currentPage === 1}
                >
                  <GrFormPrevious size={25} />
                </button>

                {/* /---------------------->Dynamic Page Numbers <----------------------< */}
                {Array.from({ length: totalPage }, (_, i) => i + 1).map(
                  (page) => {
                    // Logic for ellipsis and showing only a subset of pages
                    if (
                      page === 1 ||
                      page === totalPage ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => paginate(page)}
                          className={`px-4 py-2 rounded mx-1 ${currentPage === page
                              ? "bg-blue-600 text-white"
                              : "bg-white text-gray-700 border"
                            }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      (page === currentPage - 2 && page > 1) || // Add ellipsis before current
                      (page === currentPage + 2 && page < totalPage) // Add ellipsis after current
                    ) {
                      return (
                        <span key={page} className="px-2 text-gray-500">
                          ...
                        </span>
                      );
                    }
                    return null;
                  }
                )}

                {/* Next Button */}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  className={`p-1 shadow-md rounded-full text-white${currentPage === totalPage
                      ? " border-gray-200 border-2"
                      : " bg-cyan-500 border-2 border-gray-100"
                    }`}
                  disabled={currentPage === totalPage}
                >
                  <GrFormNext size={25} />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </>
    );
  };


  return (
    <>
      <ToastContainer />
      {active ? (
        <ViewTable />
      ) : view ? (
        <AddBrokerage setActive={setActive} setShowTopSection={setShowTopSection} />
      ) : (

        <EditBrokerage setActive={setActive} setShowTopSection={setShowTopSection} editBrokerageId={editId} />

      )}
    </>
  );
}



