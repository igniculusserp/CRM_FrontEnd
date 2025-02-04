import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//external Packages
import axios from "axios";
//React Icons
import { FaAngleDown, FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
//Folder Imported
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { tenant_base_url, protocal_url } from "./../../../../Config/config";
import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";
import { SearchElement } from "../SearchElement/SearchElement";
import ManagedByFilter from "../../../../Hooks/ManagedByFilter/ManagedByFilter";
import UseAction from "../../../../Hooks/Action/useAction";
import UseDateFilter from "../../../../Hooks/DateFilter/UseDateFilter";
import UseGridFilter from "../../../../Hooks/GridFilter/UseGridFilter";

export default function FollowUp() {
  const navigate = useNavigate();
  const bearer_token = localStorage.getItem("token");
  const name = getHostnamePart();
  //------------------------------------------------- All States----------------------------------------------------------
  const [selectedRowsId, setSelectedRowsId] = useState([]);
  const [selectedRowEmails, setSelectedRowEmails] = useState([]);
  const [followupDropdown, setFollowupDropdown] = useState(false);
  //-------------------------------------------------- GET Data ----------------------------------------------------
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const getApiData = async () => {
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
        setOriginalData(followup?.data);
        setFilteredData(followup?.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getApiData();
  }, []);
  
  //---------------------->----------------------> Data Transfer <----------------------<----------------------
  const currentData = filteredData;
  //------------------------------------------------------ Table Heading And Table Data ------------------------------------------
  const columns = [
    { field: "id", headerName: "ID", minWidth: 70 ,flex: 1,},
    { field: "name", headerName: "Client Name", minWidth: 200 ,flex: 1,
      renderCell: (params) => (
        <span
          onClick={() => handleClick(params.row.id)}
          style={{ cursor: "pointer", color: "blue", fontWeight:500 }}
        >
          {params.value}
        </span>
      ),
    },
    { field: "mobileNo", headerName: "Mobile", minWidth: 150 ,flex: 1,},
    { field: "email", headerName: "Email", minWidth: 200 ,flex: 1,},
    { 
      field: "segments", 
      headerName: "Segment", 
      minWidth: 200,flex: 1,
      renderCell: (params) => params.row.segments.join(", ")
    },
    { 
      field: "call_bck_DateTime", 
      headerName: "Follow Up", 
      minWidth: 200,flex: 1, 
      renderCell: (params) => params.value?.replace("T", " ") || "",
    }
  ];

  //------------------------------------------------------ Check Box Data ------------------------------------------
  const handleSelectionChange = (selectionModel) => {
    const selectedRows = currentData.filter((row) =>
      selectionModel.includes(row.id)
    );
    const selectedIDs = selectedRows.map((row) => row.id);
    const selectedEmails = selectedRows.map((row) => row.email);
    setSelectedRowsId(selectedIDs);
    setSelectedRowEmails(selectedEmails);
  };
   // -------------------------------------------- Navigate to Edit Screen ----------------------------------------
   const handleClick = (id) => {
    if(edit || businessRole === "Admin"){
      navigate(`/panel/createfollowup/${id}`);
    }
  };
  //-----------------------------------------------STRIPE BAR DROPDOWN--------------------------------------------------
  const [selectedViewValue, setSelectedViewValue] = useState("Table View");
  // -----------------------------------------------  TOGGLE FOLLOWUP DROPDOWN ------------------------------------------------
  const toggleFollowupDropdown = () => {
    setFollowupDropdown(!followupDropdown);
  };
  // --------------------------------------------------------   FOLLOW UP DROPDOWN DATA -----------------------------------------
  const followup = [
    { key: 1, value: "Man Insited" },
    { key: 2, value: "Man Insited" },
  ];
  //----------------------------------------------------ACTION BAR DROPDOWN---------------------------------------------------------
  const actions = [
    { key: 1, value: "Mass Delete" },
    { key: 3, value: "Mass E-Mail" },
    { key: 6, value: "Sheet View" },
    { key: 7, value: "Print View" },
  ];
  // ------------------------------------------Managed By Fillters---------------------------------
  function handleAssignedToSelection(assignedToValue) {
    setAssignedTo(assignedToValue); // Update state in FollowUp component

    let filtered = originalData;
    if (assignedToValue !== "Managed By") {
      filtered = filtered.filter(
        (lead) => lead.assigned_To === assignedToValue,
      );
    }
    setFilteredData(filtered);
  }
  // ----------------------------- Date Filter -----------------------------
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  // -------------------------------------- Function to update date states ---------------------------------------
  const handleDateChange = (field, value) => {
    if (field === "startDate") setStartDate(value);
    else setEndDate(value);
  };
  // ------------------------------ Search Function ----------------------------------
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  useEffect(() => {
    const filtered = originalData.filter(
      (lead) =>
        lead.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        lead.mobileNo?.includes(searchTerm),
    );
    setFilteredData(filtered);
  }, [searchTerm, originalData]);
  //------------------------------------------------------Filter Reset Settings ---------------------------------------------
  const [assignedTo, setAssignedTo] = useState("Managed By");
  const handleResetFilter = () => {
    setStartDate(today);
    setEndDate(today);
    setFilteredData(originalData);
    setAssignedTo("Managed By");
  };
  //---------------------------------------------------- Roles & Permissions ----------------------------------------------------
  const businessRole = localStorage.getItem("businessRole");
  const [edit, setEdit] = useState(false);
  async function handleGetPermission() {
    const bearer_token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Security/rolesandpermissions/getgroupwise/${businessRole}`,
        config,
      );
      console.log("Permission Data : ", response.data.data);
      const permissionsList = response?.data?.data;

      if (permissionsList) {
        const serviceBoxPermissions = permissionsList.find(
          (item) => item.moduleName === "Follow Up",
        );

        if (serviceBoxPermissions) {
          const permissionsArray = serviceBoxPermissions.permissions.split(",");

          console.log("List : ", permissionsArray);
          setEdit(permissionsArray.includes("Edit Follow Up"));
        }
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  }
  useEffect(() => {
    handleGetPermission();
  }, []);


  return (
    <>
      {/* -------- PARENT -------- */}
      <div className="m-3 flex min-h-screen flex-col">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-white px-3 py-2">
          {/* container- FollowUp, search */}
          <div className="contact_Dropdown_Main_Container flex flex-wrap items-center justify-start gap-3">
            {/* ALL FOLLOW UPS DROPDOWN */}
            <div
              className="contact_Dropdown_Container relative whitespace-nowrap"
              onClick={toggleFollowupDropdown}
              onMouseLeave={() => setFollowupDropdown(false)}
            >
              <button
                className="contact_Dropdown_Button flex min-w-40 items-center justify-between truncate rounded-md border px-4 py-2"
                id="dropdownDefaultButton"
                type="button"
              >
                All Follow Up
                <FaAngleDown className="ml-2 text-gray-900" />
              </button>
              {followupDropdown && (
                <div className="absolute top-10 z-10 rounded-md border border-gray-300 bg-white">
                  <ul className="py-2 text-sm text-gray-700">
                    {followup.map(({ key, value }) => (
                      <li
                        className="block w-56 cursor-pointer border-b px-4 py-2 hover:bg-cyan-500 hover:text-white"
                        key={key}
                      >
                        {value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {/* All ASSIGNED_TO  DropDown*/}
            <ManagedByFilter
              assignedTo={assignedTo}
              onAssignedToSelect={handleAssignedToSelection}
            />
            {/* SEARCH DROPDOWN */}
            <SearchElement
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="action_Button_Main_Container flex items-center justify-start gap-3">
            {/* Stripe-BarDropDown */}
          <UseGridFilter 
            selectedViewValue={selectedViewValue}
            setSelectedViewValue={setSelectedViewValue}
          />
            {/* ACTIONS DROPDWON */}
            <UseAction
              originalData={originalData}
              getApiData={getApiData}
              screenName="FollowUpScreen"
              selectedRowsId={selectedRowsId}
              selectedRowEmails={selectedRowEmails}
              actions={actions}
            />
            {/* END ACTIONS DROPDWON */}
          </div>
        </div>
        {/* MIDDLE SECTION */}
        <div className="my-1 flex flex-wrap items-center justify-between gap-3 py-2">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-3xl font-medium">Follow Up</h1>
            <h1 className="min-w-10 rounded-md bg-blue-600 p-2 text-center text-sm text-white shadow-md">
              {currentData.length}{" "}
            </h1>
          </div>
          {/* ------------------- Filter by date ----------------- */}
          <UseDateFilter
            startDate={startDate}
            endDate={endDate}
            onDateChange={handleDateChange}
            onReset={handleResetFilter}
            originalData={originalData}
            setFilteredData={setFilteredData}
          />
        </div>
        {/* TABLE VIEW */}
        <div className="leads_Table_Main_Container overflow-x-auto">
          <div className="leads_Table_Container min-w-full rounded-md">
            {/*--------------TABLE HEAD START------------- */}
            {selectedViewValue === "Table View" && (
              <Paper sx={{ width: "100%" }}>
              <DataGrid
                rows={currentData}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                    },
                  },
                }}
                pageSizeOptions={[10]}
                checkboxSelection
                onRowSelectionModelChange={(newSelection) =>
                  handleSelectionChange(newSelection)
                }
                sx={{
                  border: 0,
                  width: "100%", 
                  "& .MuiDataGrid-columnHeaderTitle": {
                    fontWeight: "bold",
                  },
                }}
              />
            </Paper>
            )}
          </div>
          {/* Grid View */}
          {selectedViewValue === "Grid View" && (
            <>
              <div className="min-w-full">
                <div className="grid grid-cols-3 gap-3">
                  {/*---------Card starts Here */}
                  {currentData.map((item) => (
                    <div
                      className="flex flex-col gap-2 rounded-lg border-2 bg-white px-2 py-3"
                      key={item.id}
                    >
                      <div className="flex items-center gap-3">
                        <img src={item.img} height={60} width={60} />
                        <div className="flex grow flex-col">
                          <div className="flex justify-between font-medium">
                            <span className="text-indigo-500">{item.name}</span>
                            <BiEdit
                              size={25}
                              className="rounded-full bg-white p-1 text-blue-500 shadow-md"
                              onClick={() => handleClick(item.id)}
                            />
                          </div>
                          <div className="flex items-center gap-2 text-sm font-medium">
                            {item.leadesStatus}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center rounded-lg border-2 bg-gray-100 px-2 py-1">
                        <div className="w-2/4 text-sm text-gray-500">
                          Client Name
                        </div>
                        <div className="2-2/4 text-sm font-medium">
                          {item.name}
                        </div>
                      </div>

                      <div className="flex items-center rounded-lg border-2 bg-gray-100 px-2 py-1">
                        <div className="w-2/4">
                          <IoIosMail className="text-2xl" />
                        </div>
                        <div className="2-2/4 text-sm font-medium">
                          {item.email}
                        </div>
                      </div>

                      <div className="flex items-center rounded-lg border-2 bg-gray-100 px-2 py-1">
                        <div className="w-2/4">
                          <FaPhoneAlt className="text-xl" />
                        </div>
                        <div className="2-2/4 text-sm font-medium">
                          {item.phoneNo}
                        </div>
                      </div>
                      <div className="flex items-center rounded-lg border-2 bg-gray-100 px-2 py-1">
                        <div className="w-2/4 text-sm text-gray-500">
                          Follow Up Date
                        </div>
                        <div className="2-2/4 text-sm font-medium">
                          {item.call_bck_DateTime.replace("T", " ")}
                        </div>
                      </div>
                      <div className="flex items-center rounded-lg border-2 bg-gray-100 px-2 py-1">
                        <div className="w-2/4 text-sm text-gray-500">
                          Segment
                        </div>
                        <div className="2-2/4 text-sm font-medium">
                          {item.segments && (
                            <span className="">
                              {item.segments
                                .filter((segment) => segment.length > 1)
                                .join(", ")}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
       
        </div>
      </div>
    </>
  );
}
