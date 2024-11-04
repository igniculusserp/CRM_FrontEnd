//react inbuilt
import { useState, useEffect } from "react";

//external
import axios from "axios";
//reactIcons
import { FaBars  } from "react-icons/fa";

//Folder Imported
import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";
import { tenant_base_url, protocal_url } from "./../../../../Config/config";
import {SearchElement} from "../SearchElement/SearchElement";

//------------------------------------------------------------------------------->CODE STARTS FROM HERE<-------------------------------------------------------------------------------
export default function FreeTrail() {

  const bearer_token = localStorage.getItem("token");
  const name = getHostnamePart();

  //This is to store the upcoming data from API
  const [freeTrial, setFreeTrial] = useState([]);
  //created such that to filter leads according to leadStatus
  const [filteredTrails, setFilteredTrails] = useState([]); // Filtered

  //------------------------------------------------------------------------------------------------
  //----------------GET----------------
  const getFreeTrail = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Trail/alltrail/byusertoken`,
        config
      );
      if (response.status === 200) {
        const followup = response?.data?.data; // Get the user data
        //  console.log("@@@@====", response.data);
        console.log("@@@@====", followup[0]);
        setFreeTrial(followup); // Set the user data for editing
        setFilteredTrails(followup);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  useEffect(() => {
    getFreeTrail();
  }, [bearer_token, protocal_url, name, tenant_base_url]);


  //---------------------->---------------------->PAGINATION<----------------------<----------------------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Define items per page

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //---------------------->---------------------->PAGINATION->FILTERLEADS/ <----------------------<----------------------
  const currentTrials = filteredTrails?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  
  // ------------------------------ Search Function ----------------------------------

  
  const [searchTerm, setSearchTerm] = useState(""); // State for search term


  useEffect(() => {
    const filtered = freeTrial.filter((lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.mobileNo.includes(searchTerm)
    );
    setFilteredTrails(filtered);
  }, [searchTerm, freeTrial]);



  return (
    <div className="min-h-screen flex flex-col m-3">
  

      <div className="py-2 px-3 bg-white flex items-center justify-between rounded-md">
        <div className="flex gap-3">
         

       

          {/* SEARCH DROPDOWN */}
          <SearchElement value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

      </div>
      {/* FILTER BY */}
      
      {/* TABLE VIEW */}
      <div className="overflow-x-auto ">
        <div className="min-w-full rounded-md overflow-hidden">
          {/*-------Table-------*/}
          <table className="min-w-full bg-white">
              {/*--------------TABLE DATA START------------- */}
              <thead>
                <tr className="border-gray-300 border-b-2">
                  {/* CHECKBOX */}
                  <th className="px-3 py-3  text-left font-medium ">
                    <input
                      type="checkbox"
                    />
                  </th>
                  {/* CLIENT NAME */}
                  <th className="px-1 py-3  text-left  border-r font-medium ">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-nowrap">Client Name</span>
                      <span>
                        <FaBars />
                      </span>
                    </div>
                  </th>
                  {/* MOBILE */}
                  <th className="px-1 py-3  text-left  border-r font-medium ">
                    <div className="flex items-center justify-between gap-3">
                      <span>Mobile</span>
                      <span>
                        <FaBars />
                      </span>
                    </div>
                  </th>
                  {/* Phone */}
                  {/* Email */}
                  <th className="px-1 py-3  text-left  border-r font-medium ">
                    <div className="flex items-center justify-between gap-3">
                      <span>Email</span>
                      <span>
                        <FaBars />
                      </span>
                    </div>
                  </th>
                  {/* MANAGED BY */}
                  <th className="px-1 py-3  text-left  border-r font-medium ">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-nowrap">Managed By</span>
                      <span>
                        <FaBars />
                      </span>
                    </div>
                  </th>
                  {/* SEGMENT */}
                  <th className="px-1 py-3  text-left  border-r font-medium ">
                    <div className="flex items-center justify-between gap-3">
                      <span>Segment</span>
                      <span>
                        <FaBars />
                      </span>
                    </div>
                  </th>
                  {/* Trail Start Date */}
                  <th className="px-1 py-3  text-left  border-r font-medium ">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-nowrap">Trail Start Date</span>
                      <span>
                        <FaBars />
                      </span>
                    </div>
                  </th>
                  {/* Trail End Date */}
                  <th className="pr-3 pl-1 py-3  text-left  border-r font-medium ">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-nowrap">Trail End Date</span>
                      <span>
                        <FaBars />
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              {/*--------------TABLE DATA END------------- */}
              {/*--------------TABLE DATA------------- */}
              <tbody>
                {currentTrials.map((order, index) => (
                  <tr
                    key={index}
                    className="cursor-pointer hover:bg-gray-200 border-gray-300 border-b"
                  >
                    {/* CHECKBOX */}
                    <td className="px-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          
                        />
                      </div>
                    </td>
                    {/* CLIENT NAME */}
                    <td
                      className="px-1 py-4 border-b border-gray-300 text-sm leading-5 "
                      
                    >
                      <div className="flex items-center">
                        <span className="ml-2 w-[80px] break-all">
                          {order.name}
                        </span>
                      </div>
                    </td>
                    {/* MOBILE */}
                    <td className="px-1 py-4 border-b border-gray-300 text-sm leading-5 ">
                      <div className="flex items-center gap-1">
                        <span className="break-all">{order.mobileNo}</span>
                        <span className="text-red-400">
                        
                        </span>
                      </div>
                    </td>
                    {/* Email */}
                    <td className="px-1 py-4 border-b border-gray-300 text-sm leading-5 ">
                      <div className="break-all">{order.email}</div>
                    </td>
                    {/* Assigned To */}
                    <td className="px-1 py-4 border-b border-gray-300 text-sm">
                      <div>{order.assigned_To}</div>
                    </td>
                    {/* SEGMENT */}
                    <td className="px-1 py-4 border-b border-gray-300 text-sm max-w-36 min-w-24">
                      <div>
                        {order.segments && (
                          <span className="">
                            {order.segments
                              .filter((segment) => segment.length > 1)
                              .join(", ")}
                          </span>
                        )}
                      </div>
                    </td>
                    {/* Trial Start Date */}
                    <td className="px-1 py-4 border-b border-gray-300 text-sm leading-5 ">
                      <div className="flex items-center break-words">
                        {order.trialStartDate
                          ? order.trialStartDate
                              .replace("T", " ")
                              .split(":")
                              .slice(0, 2)
                              .join(":")
                          : "N/A"}
                      </div>
                    </td>
                    {/* Trial End Date */}
                    <td className="pr-3 pl-1 py-4 border-b border-gray-300 text-sm leading-5 ">
                      <div className="flex items-center break-words">
                        {order.trialEndDate
                          ? order.trialEndDate
                              .replace("T", " ")
                              .split(":")
                              .slice(0, 2)
                              .join(":")
                          : "N/A"}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/*--------------TABLE DATA END------------- */}
            </table>
        </div>
      </div>

      <div className="flex justify-end m-4">
        <nav>
          <ul className="inline-flex items-center">
            {Array.from(
              { length: Math.ceil(freeTrial.length / itemsPerPage) },
              (_, i) => (
                <li key={i + 1}>
                  <button
                    onClick={() => paginate(i + 1)}
                    className={`px-4 py-2 mx-1 ${
                      currentPage === i + 1
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700 border"
                    }`}
                  >
                    {i + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}
