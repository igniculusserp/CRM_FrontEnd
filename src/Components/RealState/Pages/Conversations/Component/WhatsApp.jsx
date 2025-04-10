import { useState } from "react";
import {
  Box,
  Paper,
  Stack,
  Pagination,
  Select,
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

export default function WhatsApp() {
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
    { field: "APIKey", headerName: "API Key", minWidth: 150, flex: 1 },
    { field: "Received", headerName: "Received Form", minWidth: 150, flex: 1 },
    { field: "Received", headerName: "Received At", minWidth: 150, flex: 1 },
    { field: "Listing_URL", headerName: "Listing URL", minWidth: 150, flex: 1 },
    { field: "Listing_ID", headerName: "Listing ID", minWidth: 150, flex: 1 },
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
    <div className="flex h-full flex-col gap-8 bg-gray-200">
      {/* ----------------------------------------- Filter & Search Section --------------------------------- */}
      {/* ----------------------------------------- Buttons --------------------------------- */}
      <Box className="flex flex-wrap justify-between gap-5">
        {/* Columns Button */}
        <div className="flex w-full gap-3 md:w-auto">
          {/* All Leads */}
          <Select
            value="Leads"
            className="w-full !rounded-md !bg-white !shadow-md"
            sx={{ height: 42 }}
          >
            <MenuItem value="Leads">All</MenuItem>
            <MenuItem value="Project1">Project 1</MenuItem>
            <MenuItem value="Project2">Project 2</MenuItem>
          </Select>
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
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <MenuItem onClick={() => handleMenuClick("Details")}>
            Go To Lead
          </MenuItem>
          
          <MenuItem onClick={() => handleMenuClick("Print")}>Print</MenuItem>
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
  );
}
