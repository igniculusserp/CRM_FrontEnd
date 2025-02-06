import { useState, useEffect } from "react";

//external Packages
import axios from "axios";
//React Icons
//Folder Imported
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { tenant_base_url, protocal_url } from "./../../../../Config/config";
import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";
import ManagedByFilter from "../../../../Hooks/ManagedByFilter/ManagedByFilter";
import UseFilterBySegment from "../../../../Hooks/FilterBySegment/UseFilterBySegment";

export default function FollowUp() {
  const bearer_token = localStorage.getItem("token");
  const name = getHostnamePart();
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

  //---------------------------------------------> Grid Pagination <-----------------------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  //------------------------------------------------------ Table Heading And Table Data ------------------------------------------
  const columns = [
    { field: "id", headerName: "ID", minWidth: 70, flex: 1 },
    {
      field: "name",
      headerName: "Client Name",
      minWidth: 200,
      flex: 1,
    },
    { field: "mobileNo", headerName: "Mobile", minWidth: 150, flex: 1 },
    { field: "email", headerName: "Email", minWidth: 200, flex: 1 },
    {
      field: "segments",
      headerName: "Segment",
      minWidth: 200,
      flex: 1,
      renderCell: (params) => params.row.segments.join(", "),
    },
  ];
  // ------------------------------------------------- FOLLOW UP By State  --------------------------------------
  const [followUpBy, setFollowUpBy] = useState("Follow Up By");
  // ------------------------------------------------- Managed By State -----------------------------------------
  const [assignedTo, setAssignedTo] = useState("Managed By");
  return (
    <>
      {/* -------- PARENT -------- */}
      <div className="m-3 flex min-h-screen flex-col">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-white px-3 py-2">
          {/* container- FollowUp, search */}
          <div className="contact_Dropdown_Main_Container flex flex-wrap items-center justify-start gap-3">
            {/*-------------------------------------- ALL FOLLOW UPS DROPDOWN --------------------------------- */}
            <UseFilterBySegment
              followUpBy={followUpBy} // Sending Value
              setFollowUpBy={setFollowUpBy} // Pass function to update state in FollowUp
              setFilteredData={setFilteredData} // Pass function to update filtered data
              filteredData={filteredData} // Pass original data for filtering
            />

            {/* ---------------------------------- Managed BY Filter ----------------------------------------------*/}
            <ManagedByFilter
              assignedTo={assignedTo} // Sending Value
              setAssignedTo={setAssignedTo} // Pass function to update state in FollowUp
              setFilteredData={setFilteredData} // Pass function to update filtered data
              filteredData={filteredData} // Pass original data for filtering
            />
            {/* ---------------------------------------- SEARCH DROPDOWN ------------------------------------------- */}
          </div>
        </div>

        {/* TABLE VIEW */}
        <div className="leads_Table_Main_Container overflow-x-auto">
          <div className="leads_Table_Container min-w-full rounded-md">
            {/*---------------------------------------TABLE HEAD START---------------------------------------- */}

            <Paper sx={{ width: "100%" }}>
              <DataGrid
                rows={currentData} // Row Data
                columns={columns} // Headings
                pagination={false}
                checkboxSelection
                sx={{
                  border: 0,
                  width: "100%",
                  "& .MuiDataGrid-columnHeaderTitle": {
                    fontWeight: "bold",
                  },
                  "& .MuiDataGrid-footerContainer": {
                    display: "none",
                  },
                }}
              />
            </Paper>
          </div>

          {/* --------------------------------------- Pagination ------------------------------------------ */}
          <Stack spacing={2} className="mb-1 mt-4">
            <Pagination
              count={Math.ceil(filteredData.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              sx={{
                display: "flex",
                justifyContent: "center",
                "& .MuiPaginationItem-root": {
                  fontSize: "1.3 rem",
                },
                "& .MuiPaginationItem-root.Mui-selected": {
                  backgroundColor: "rgba(6, 182, 212, 1)",
                  color: "#fff",
                },
              }}
            />
          </Stack>
        </div>
      </div>
    </>
  );
}
