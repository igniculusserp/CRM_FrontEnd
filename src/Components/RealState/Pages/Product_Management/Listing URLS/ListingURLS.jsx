import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Paper, Stack, Pagination } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

//---------------------------- React Icon -------------------------------
import { BsPlusCircleDotted } from "react-icons/bs";
import { IoArrowBack } from "react-icons/io5";

//----------------------------- Dummy Data ----------------------------
const dummyData = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: `Project ${index + 1}`,
  description: `Description for Project ${index + 1}`,
}));

//------------------------------------ Per Page Size ----------------------------------
const itemsPerPage = 10;

export default function ListingURLS() {
  const navigate = useNavigate();

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
    <div className="flex h-full flex-col gap-8 bg-gray-200 p-6">
      {/* --------------------------------------- Heading --------------------------------- */}
      <Box className="w-full rounded-md bg-white p-2">
        <Typography
          sx={{ width: "fit-content" }}
          className="rounded-md !bg-cyan-500 px-3 py-1 text-sm !text-white"
        >
        Listing URLS
        </Typography>
      </Box>
      {/* ----------------------------------------- Buttons --------------------------------- */}
      <Box className="flex flex-wrap justify-between gap-5">
        {/* Back Button */}
        <div className="w-full md:w-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex w-full items-center justify-center gap-2 rounded-md border border-cyan-500 bg-white px-4 py-2 text-cyan-500 shadow-md transition-all duration-200 hover:bg-cyan-500 hover:text-white md:w-auto"
          >
            <IoArrowBack className="text-lg" />
            <span>Back</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex w-full flex-wrap justify-start gap-3 md:w-auto">
          {/* New Project Button */}
          <button className="flex w-full items-center justify-center gap-2 rounded-md bg-cyan-500 px-4 py-2 text-white shadow-md hover:bg-cyan-600 md:w-auto">
            <BsPlusCircleDotted className="text-lg" />
            <span>Bulk Add</span>
          </button>
        </div>
      </Box>

      {/* ------------------------------------------- Table --------------------------------- */}
      <Paper sx={{ width: "100%" }}>
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
  );
}
