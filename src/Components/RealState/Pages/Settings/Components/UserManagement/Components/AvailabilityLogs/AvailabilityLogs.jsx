import { useState } from "react";

//---------------------------- MUI Imports ----------------------------
import { DataGrid } from "@mui/x-data-grid";
import {
  Paper,
  Stack,
  Pagination,
  Box,
} from "@mui/material";

//------------------------------------ React Icons ----------------------------
import { Search } from "lucide-react";
//----------------------------- Dummy Data ----------------------------

const buyerData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    location: "New York",
    budget: "$500,000",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "987-654-3210",
    location: "California",
    budget: "$700,000",
  },
];

export default function AvailabilityLogs() {
  //---------------------------------------- All States ---------------------------------


  //---------------------------------------- Pagination --------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBuyers = buyerData.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => setCurrentPage(value);

  //------------------------------------------------------ Table Heading And Table Data ------------------------------------------

  const allColumns = [
    { field: "name", headerName: "Name", minWidth: 150, flex: 1 },
    { field: "email", headerName: "Email", minWidth: 150, flex: 1 },
    { field: "phone", headerName: "Phone", minWidth: 150, flex: 1 },
    { field: "location", headerName: "Location", minWidth: 150, flex: 1 }, // Only for buyers
    { field: "budget", headerName: "Budget", minWidth: 150, flex: 1 }, // Only for buyers
    {
      field: "propertyType",
      headerName: "Property Type",
      minWidth: 150,
      flex: 1,
    }, // Only for sellers
    {
      field: "askingPrice",
      headerName: "Asking Price",
      minWidth: 150,
      flex: 1,
    },
  ];



  return (
    <div className="flex h-full flex-col gap-8 bg-gray-200 p-6 max-[400px]:p-1 max-[400px]:py-4">
      {/* --------------------------------------- Heading --------------------------------- */}
      <Box className="flex w-full gap-3 rounded-md bg-white p-2">
        {["Availability Logs"].map((button) => (
          <Box
            key={button}
            sx={{ width: "fit-content" }}
            className="whitespace-nowrap rounded-md bg-cyan-500 !px-3 !py-1 text-sm text-white shadow-md transition-all"
          >
            {button}
          </Box>
        ))}
      </Box>
      {/* --------------------------- Body Section ------------------------ */}
      <div className="flex min-h-screen flex-col gap-4 py-3">
        <>
          {/* ----------------------------------------- Buttons --------------------------------- */}
          <Box className="flex flex-wrap justify-between gap-5">
            {/*------------------------------------------- Search Bar ----------------------------------------------*/}
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search..."
                className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-4 pr-10 text-gray-700 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </Box>

          {/* ------------------------------ Table -------------------------------- */}
          <Paper sx={{ width: "100%" }}>
            <DataGrid
              rows={paginatedBuyers} // Row Data
              columns={allColumns} // Headings
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
              count={Math.ceil(buyerData.length / itemsPerPage)}
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
        </>
      </div>
    </div>
  );
}
