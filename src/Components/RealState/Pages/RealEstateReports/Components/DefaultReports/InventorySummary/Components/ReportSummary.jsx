import { useState } from "react";
import { Paper, Stack, Pagination } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";


//----------------------------- Dummy Data ----------------------------
const dummyData = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: `Project ${index + 1}`,
  description: `Description for Project ${index + 1}`,
}));

//------------------------------------ Per Page Size ----------------------------------
const itemsPerPage = 10;

export default function ReportSummary() {
  //---------------------------------------- Pagination --------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = dummyData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (event, value) => setCurrentPage(value);
  //------------------------------------------------------ Table Heading And Table Data ------------------------------------------

  const columns = [
    { field: "APIKey", headerName: "API Key", minWidth: 150, flex: 1 },
    { field: "Received", headerName: "Received Form", minWidth: 150, flex: 1 },
    { field: "Received", headerName: "Received At", minWidth: 150, flex: 1 },
    { field: "Listing_URL", headerName: "Listing URL", minWidth: 150, flex: 1 },
    { field: "Listing_ID", headerName: "Listing ID", minWidth: 150, flex: 1 },
  ];

  return (
    <div className="flex h-full flex-col gap-8">
      <div className="flex h-full flex-col gap-8">
        {/* ------------------------------------------- Table --------------------------------- */}
        <Paper sx={{ width: "100%", border: "1px solid gray" }}>
          <DataGrid
            rows={currentData} // Row Data
            columns={columns} // Headings
            pagination={false}
            checkboxSelection
            // onRowSelectionModelChange={(newSelection) =>
            //   handleSelectionChange(newSelection)
            // }
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
        {/* --------------------------------------- Pagination ------------------------------------------ */}
        <Stack spacing={2} className="mb-1 mt-4">
          <Pagination
            count={Math.ceil(dummyData.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            sx={{
              display: "flex",
              justifyContent: "center",
              "& .MuiPaginationItem-root": {
                fontSize: "1.2rem",
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
  );
}
