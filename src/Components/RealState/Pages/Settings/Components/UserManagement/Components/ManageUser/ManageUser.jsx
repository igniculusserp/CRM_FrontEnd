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
  Box,
  Modal,
  Fade,
  Typography,
} from "@mui/material";

//------------------------------------ React Icons ----------------------------
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
import { Search } from "lucide-react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import NewUser from "./Components/NewUser/NewUser";
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

export default function ManageUser() {
  //---------------------------------------- All States ---------------------------------

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editButton, setEditButton] = useState(false);
  const [open, setOpen] = useState(false);

  //---------------------------- Modal Close Button------------------------------------------------
  const handleClose = () => setOpen(false);

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

  // ------------------------------------------------------ Handle Edit User -----------------------------------

  const handleEditUser = () => {
    setEditButton(true);
    setOpen(true);
  };

  // ------------------------------------------------------ Handle New User -----------------------------------

  const handleNewUser = () => {
    setEditButton(false);
    setOpen(true);
  };

  return (
    <div className="flex h-full flex-col gap-8 bg-gray-200 p-6 max-[400px]:p-1 max-[400px]:py-4">
      {/* --------------------------------------- Heading --------------------------------- */}
      <Box className="flex w-full gap-3 rounded-md bg-white p-2">
        {["All Users"].map((button) => (
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

            {/*  Button */}
            <button
              onClick={handleNewUser}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-cyan-500 px-4 py-2 text-white shadow-md hover:bg-cyan-600 md:w-auto"
            >
              <span>New User</span>
            </button>
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
            {/* MUI Menu Component */}
            <Menu
              anchorEl={menuAnchorEl}
              open={Boolean(menuAnchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              <MenuItem onClick={handleEditUser}>Edit</MenuItem>
              <MenuItem onClick={() => console.log("Preview", selectedRow)}>
                Call Availabilities
              </MenuItem>
              <MenuItem onClick={() => console.log("Preview", selectedRow)}>
                Reset password
              </MenuItem>
              <MenuItem onClick={() => console.log("Preview", selectedRow)}>
                Delete
              </MenuItem>
              <MenuItem onClick={() => console.log("Details", selectedRow)}>
                Deactivate
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

      {/* Modal for Inventory Configuration */}
      <Modal open={open} onClose={handleClose} closeAfterTransition>
        <Fade in={open}>
          <Box className="gap-5 flex flex-col absolute right-0 top-0 h-full w-full rounded-t-xl bg-white px-4 py-5 sm:w-3/4 sm:px-6 md:w-2/3 lg:w-1/2">
            <div className="flex items-center justify-between rounded-md bg-cyan-500 px-4 py-2 !text-white shadow-sm">
              <Typography>{editButton ? "Edit User" : "New User"}</Typography>
              <IoMdCloseCircleOutline
                color="white"
                className="cursor-pointer"
                onClick={handleClose}
              />
            </div>
            <div className="max-h-[90vh] overflow-y-auto bg-white">
             <NewUser />
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
