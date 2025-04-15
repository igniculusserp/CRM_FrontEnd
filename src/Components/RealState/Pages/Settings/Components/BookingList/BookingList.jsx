import { useState } from "react";
import {
  Box,
  Paper,
  Stack,
  Pagination,
  MenuItem,
  IconButton,
  Menu,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

//---------------------------- React Icon -------------------------------
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";

//----------------------------- Dummy Data ----------------------------
const dummyData = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: `Project ${index + 1}`,
  description: `Description for Project ${index + 1}`,
}));

//------------------------------------ Per Page Size ----------------------------------
const itemsPerPage = 10;

export default function BookingList() {
  // State for menu anchor and selected row
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  // Open menu
  const handleMenuOpen = (event, rowData) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(rowData);
  };

  // Close menu
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  // Handle menu option click
  const handleMenuClick = (option) => {
    console.log(`Selected: ${option}`, selectedRow);

    handleMenuClose();
  };
  //---------------------------------------- Pagination --------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = dummyData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (event, value) => setCurrentPage(value);
  //------------------------------------------------------ Table Heading And Table Data ------------------------------------------

  const columns = [
    { field: "Name", headerName: "Name", minWidth: 150, flex: 1 },
    { field: "Createdon", headerName: "Created On", minWidth: 150, flex: 1 },
    {
      field: "action",
      headerName: "Action",
      minWidth: 80,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              handleMenuOpen(event, params.row);
            }}
          >
            <PiDotsThreeOutlineVerticalLight size={24} />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div className="flex h-full flex-col gap-8 bg-gray-200 p-6 max-[400px]:p-1 max-[400px]:py-4">
      {/* --------------------------------------- Heading --------------------------------- */}
      <Box className="flex w-full gap-3 rounded-md bg-white p-2">
        {["Booking List"].map((button) => (
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
      <div className="flex h-full flex-col gap-8 bg-gray-200">
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
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <MenuItem onClick={() => handleMenuClick("Preview")}>Edit</MenuItem>
            <MenuItem onClick={() => handleMenuClick("Details")}>
              Delete
            </MenuItem>
          </Menu>
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
