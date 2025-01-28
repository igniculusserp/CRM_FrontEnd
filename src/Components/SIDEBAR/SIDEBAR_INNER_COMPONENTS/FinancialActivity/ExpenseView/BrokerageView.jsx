import { useState, useEffect } from "react";
//external Packages
import axios from "axios";
import PropTypes from "prop-types";
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
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../../utils/toastNotifications";

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
        config,
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
      const callbackDate = new Date(follow.date);
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
    const bearer_token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      await axios.delete(
        `${protocal_url}${name}.${tenant_base_url}/FinancialActivity/brokeragedetail/delete/${id}`,
        config,
      );
      showSuccessToast("Deleted successfully");
      setFilteredLeads((prevData) => prevData.filter((item) => item.id !== id));
      // handleLead();
    } catch (error) {
      showErrorToast(error.response.data.message);
    }
  };

  const ViewTable = () => {
    return (
      <>
        {/* -------- PARENT -------- */}
        <div className="my-3 flex min-h-screen flex-col">
          {/* MIDDLE SECTION */}
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
                    onBlur={(e) => setStartDate(e.target.value)}
                  />

                  <label className="hide_Filter_Text">To:</label>
                  <input
                    type="date"
                    value={endDate}
                    className="filter_Date rounded border px-2 py-2"
                    onBlur={(e) => setEndDate(e.target.value)}
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

          {/* Add SECTION */}
          <div className="min-w-screen my-4 flex flex-wrap items-center justify-between gap-3">
            <h1 className="finance_Heading_Text whitespace-nowrap text-3xl font-medium">
              Brokerage View
            </h1>
            <button
              onClick={handleAdd}
              className="min-w-10 whitespace-nowrap rounded bg-blue-600 p-2 text-sm text-white"
            >
              Add Brokerage View
            </button>
          </div>

          {/* TABLE VIEW */}
          <div className="leads_Table_Main_Container overflow-x-auto">
            <div className="leads_Table_Container min-w-full rounded-md">
              {/*--------------TABLE HEAD START------------- */}

              <table className="leads_Table min-w-full bg-white">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="px-1 py-3">
                      <input type="checkbox" />
                    </th>
                    <th className="border-r px-2 py-3 text-left font-medium">
                      <div className="flex items-center justify-between text-sm">
                        <span>Username</span>
                        <FaBars />
                      </div>
                    </th>
                    <th className="border-r px-2 py-3 text-left font-medium">
                      <div className="flex items-center justify-between text-sm">
                        <span>Brokerage Amount</span>
                        <FaBars />
                      </div>
                    </th>
                    <th className="border-r px-2 py-3 text-left font-medium">
                      <div className="flex items-center justify-between text-sm">
                        <span>Date</span>
                        <FaBars />
                      </div>
                    </th>
                    <th className="border-r px-2 py-3 text-left font-medium">
                      <div className="flex items-center justify-between text-sm">
                        <span>Reference No</span>
                        <FaBars />
                      </div>
                    </th>
                    <th className="border-r px-2 py-3 text-left font-medium">
                      <div className="flex items-center justify-between text-sm">
                        <span>Remark</span>
                        <FaBars />
                      </div>
                    </th>
                    <th className="border-r px-2 py-3 text-left font-medium">
                      <div className="flex items-center justify-between text-sm">
                        <span>Last Modified By</span>
                        <FaBars />
                      </div>
                    </th>
                    <th className="border-r px-2 py-3 text-left font-medium">
                      <div className="flex items-center justify-between text-sm">
                        <span>Action</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentLeads.map((data) => (
                    <tr
                      key={data.id}
                      className="cursor-pointer border-b border-gray-300 hover:bg-gray-200"
                    >
                      <td className="px-1 py-3 text-center">
                        <input type="checkbox" />
                      </td>
                      <td className="max-w-24 break-words px-2 py-4 text-sm">
                        {data.userName}
                      </td>
                      <td className="max-w-24 break-words px-2 py-4 text-sm">
                        {data.brokerageAmount}
                      </td>
                      <td className="max-w-24 break-words px-2 py-4 text-sm">
                        {data?.date?.split("T")[0]}
                      </td>
                      <td className="max-w-24 break-words px-2 py-4 text-sm">
                        {data.referenceno}
                      </td>

                      <td className="max-w-24 break-words px-2 py-4 text-sm">
                        {data?.remarks}
                      </td>
                      <td className="max-w-24 break-words px-2 py-4 text-sm">
                        {data.lastmodifiedby}
                      </td>
                      <td className="flex gap-3 px-2 py-4">
                        <MdEdit
                          size={25}
                          color="white"
                          className="rounded bg-blue-500"
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

            <div className="my-4 flex justify-end">
              {/* //---------------------->---------------------->PAGINATION-RENDERER<----------------------<---------------------- */}
              <nav className="mx-auto mt-4 flex items-center justify-center gap-2 text-center">
                {/* /---------------------->Previous Button <----------------------< */}
                <button
                  onClick={() => paginate(currentPage - 1)}
                  className={`rounded-full p-1 text-white shadow-md ${
                    currentPage === 1
                      ? "border-2 border-gray-200"
                      : "border-2 border-gray-100 bg-cyan-500"
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
                          className={`mx-1 rounded px-4 py-2 ${
                            currentPage === page
                              ? "bg-blue-600 text-white"
                              : "border bg-white text-gray-700"
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
                  },
                )}

                {/* Next Button */}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  className={`rounded-full p-1 shadow-md text-white${
                    currentPage === totalPage
                      ? "border-2 border-gray-200"
                      : "border-2 border-gray-100 bg-cyan-500"
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
        <AddBrokerage
          setActive={setActive}
          setShowTopSection={setShowTopSection}
        />
      ) : (
        <EditBrokerage
          setActive={setActive}
          setShowTopSection={setShowTopSection}
          editBrokerageId={editId}
        />
      )}
    </>
  );
}
