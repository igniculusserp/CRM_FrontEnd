import { useState, useEffect } from "react";
//external Packages
import axios from "axios";
//React Icons
import { FaBars } from "react-icons/fa";
import { MdCall } from "react-icons/md";

//Folder Imported
import { tenant_base_url, protocal_url } from "./../../../../Config/config";
import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";
import ManagedByFilter from "../../../../Hooks/ManagedByFilter/ManagedByFilter";

export default function FollowUp() {
  const bearer_token = localStorage.getItem("token");
  const name = getHostnamePart();
  // All States

 
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
        config,
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

  //---------------------->---------------------->PAGINATION->FILTERLEADS/ <----------------------<----------------------
  const currentLeads = filteredLeads;

  
  //------------------------------------------------------Filter Reset Settings ---------------------------------------------
  const [assignedTo, setAssignedTo] = useState("Managed By");

  return (
    <>
      {/* -------- PARENT -------- */}
      <div className="m-3 flex min-h-screen flex-col">
        {/* containerbar*/}
        <ManagedByFilter
         assignedTo={assignedTo}
         onAssignedToSelect={handleAssignedToSelection}
        />
       
        <div className="my-1 flex flex-wrap items-center justify-between gap-3 py-2">
        
          {/* ------------------- Filter by date ----------------- */}
         
        </div>

     
              <table className="leads_Table min-w-full bg-white">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    {/* CHECKBOX for Select All */}
                    <th className="px-2 py-3 text-left font-medium">
                      <input
                        type="checkbox"
                        onClick={selectAllCheckbox}
                        // checked={selectAll}
                      />
                    </th>
                    {/* CLIENT NAME */}
                    <th className="max-w-56 border-r px-1 py-3 text-left font-medium">
                      <div className="">
                        <span className="">Client Name</span>
                      </div>
                    </th>
                    {/* MOBILE */}
                    <th className="border-r px-3 py-3 text-left font-medium">
                      <div className="flex items-center justify-between gap-3">
                        <span>Mobile</span>
                        <span>
                          <FaBars />
                        </span>
                      </div>
                    </th>
                    {/* Email */}
                    <th className="border-r px-1 py-3 text-left font-medium">
                      <div className="flex items-center justify-between gap-3">
                        <span>Email</span>
                        <span>
                          <FaBars />
                        </span>
                      </div>
                    </th>
                    {/* SEGMENT */}
                    <th className="border-r px-3 py-3 text-left font-medium">
                      <div className="flex items-center justify-between gap-3">
                        <span>Segment</span>
                        <span>
                          <FaBars />
                        </span>
                      </div>
                    </th>

                    {/* FOLLOW UP */}
                    <th className="border-r px-3 py-3 text-left font-medium">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-nowrap">Follow Up</span>
                        <span>
                          <FaBars />
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                {/*--------------TABLE HEAD END------------- */}
                {/*--------------TABLE DATA START------------- */}
                <tbody>
                  {currentLeads.map((order) => {
                    return (
                      <tr
                        key={order.id}
                        className="cursor-pointer border-b border-gray-300 hover:bg-gray-200"
                      >
                        {/* CHECKBOX */}
                        <td className="border-b border-gray-300 px-2 py-4 text-sm leading-5 text-gray-600">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              // checked={selectedRows.includes(order.id)}
                              onChange={(e) =>
                                handleCheckboxChange(order.id, order.email, e)
                              }
                            />
                          </div>
                        </td>
                        {/* CLIENT NAME */}
                        <td
                          className="border-b border-gray-300 py-4 text-sm leading-5"
                          onClick={
                            edit || businessRole === "Admin"
                              ? () => handleClick(order.id)
                              : undefined
                          }
                        >
                          <div className="flex items-center">
                            <span className="break-words">{order.name}</span>
                          </div>
                        </td>
                        {/* MOBILE */}
                        <td className="border-b border-gray-300 px-3 py-4 text-sm leading-5">
                          <div className="flex items-center gap-1">
                            <span>
                              <a
                                href={`tel:${order.mobileNo}`}
                                onClick={(event) => event.stopPropagation()}
                              >
                                {order.mobileNo}
                              </a>
                            </span>
                            <span className="text-red-400">
                              <MdCall />
                            </span>
                          </div>
                        </td>
                        {/* Email */}
                        <td className="border-b border-gray-300 px-3 py-4 text-sm leading-5">
                          <div className="flex items-center">{order.email}</div>
                        </td>
                        {/* SEGMENT */}
                        <td className="min-w-24 max-w-36 border-b border-gray-300 px-1 py-4 text-sm">
                          <div className="grid grid-cols-2 items-center gap-1">
                            {order.segments && (
                              <span className="">
                                {order.segments
                                  .filter((segment) => segment.length > 1)
                                  .join(", ")}
                              </span>
                            )}
                          </div>
                        </td>
                        {/* FOLLOW UP */}
                        <td className="border-b border-gray-300 px-3 py-4 text-sm leading-5">
                          <div
                            className="flex items-center text-nowrap"
                            // onClick={() => }
                          >
                            {order.call_bck_DateTime.replace("T", " ")}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                {/*--------------TABLE DATA END------------- */}
              </table>
          
      </div>
    </>
  );
}
