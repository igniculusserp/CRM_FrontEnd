import { useState } from "react";

//---------------------------- MUI Imports ----------------------------
import { DataGrid } from "@mui/x-data-grid";
import {
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Pagination,
  Checkbox,
  Box,
  FormControlLabel,
} from "@mui/material";

//------------------------------------ React Icons ----------------------------
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
import { LiaColumnsSolid } from "react-icons/lia";

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

const MatchingProperties = () => {
  //---------------------------------------- All States ---------------------------------

  const [selectedColumns, setSelectedColumns] = useState([
    "name",
    "email",
    "phone",
    "location",
    "budget",
  ]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const open = Boolean(anchorEl);

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
    {
      field: "action",
      headerName: "Action",
      minWidth: 80,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton onClick={(event) => handleThreeMenu(event, params.row)}>
          <PiDotsThreeOutlineVerticalLight size={24} />
        </IconButton>
      ),
    },
  ];

  // Open menu
  const handleThreeMenu = (event, rowData) => {
    setMenuAnchorEl(event.currentTarget); // Store button reference
    setSelectedRow(rowData); // Store row data
  };

  // Close menu
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedRow(null);
  };

  // Define table columns
  const columns = allColumns.filter(
    (col) => col.field === "action" || selectedColumns.includes(col.field),
  );

  //------------------------------------------------------ Handle Columns ------------------------------------------------------

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleColumnToggle = (field) => {
    setSelectedColumns((prev) =>
      prev.includes(field)
        ? prev.filter((col) => col !== field)
        : [...prev, field],
    );
  };

  return (
    <div className="flex min-h-screen flex-col gap-4 py-3">
      <>
        {/* --------------------------------------- Header And Stats ---------------------------- */}
        <div className="w-full rounded-lg border bg-white p-2 shadow-md">
          <div className="flex border-b">
            <div className="flex-1 px-4 py-3 text-sm text-gray-500">
              Lead Requirement Configurations
            </div>
            <div className="flex-1 px-4 py-3 text-sm text-gray-500">Budget</div>
            <div className="flex-1 px-4 py-3 text-sm text-gray-500">
              Location
            </div>
            <div className="flex-1 px-4 py-3 text-sm text-gray-500">
              Interested Project Names
            </div>
          </div>
          <div className="flex">
            <div className="flex-1 px-4 py-3 font-semibold text-gray-900">
              .......
            </div>
            <div className="flex-1 px-4 py-3 font-semibold text-gray-900">
              .......
            </div>
            <div className="flex-1 px-4 py-3 font-semibold text-gray-900">
              .......
            </div>
            <div className="flex-1 px-4 py-3 font-semibold text-gray-900">
              .......
            </div>
          </div>
        </div>

        {/* ----------------------------------------- Buttons --------------------------------- */}
        <Box className="flex flex-wrap justify-between gap-5">
          {/* Columns Button */}
          <div className="flex w-full gap-3 md:w-auto">
            {/* Manage Columns Button */}
            <button
              onClick={handleMenuOpen}
              className="flex w-full items-center justify-center gap-2 rounded-md border border-cyan-500 bg-white px-3 py-2 text-cyan-500 shadow-md transition-all duration-200 hover:bg-cyan-500 hover:text-white md:w-auto"
            >
              <LiaColumnsSolid className="h-8 w-8" />
            </button>

            {/* Column Management Dropdown */}
            <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
              {allColumns
                .filter((col) =>
                  ["name", "email", "phone", "location", "budget"].includes(
                    col.field,
                  ),
                )
                .map((column) => (
                  <MenuItem key={column.field}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedColumns.includes(column.field)}
                          onChange={() => handleColumnToggle(column.field)}
                        />
                      }
                      label={column.headerName}
                    />
                  </MenuItem>
                ))}
            </Menu>
          </div>
        </Box>

        {/* ------------------------------ Table -------------------------------- */}
        <Paper sx={{ width: "100%" }}>
          <DataGrid
            rows={paginatedBuyers} // Row Data
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
          {/* MUI Menu Component */}
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <MenuItem onClick={() => console.log("Preview", selectedRow)}>
              Mark As Interested
            </MenuItem>
            <MenuItem onClick={() => console.log("Details", selectedRow)}>
              Mark As Booked
            </MenuItem>
          </Menu>
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
  );
};

export default MatchingProperties;
