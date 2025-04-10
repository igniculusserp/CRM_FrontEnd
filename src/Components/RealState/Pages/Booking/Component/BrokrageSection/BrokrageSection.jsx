import { useState } from "react";
import {
  Box,
  Paper,
  Stack,
  Pagination,
  MenuItem,
  IconButton,
  Menu, Modal, Fade,  Typography
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

//---------------------------- React Icon -------------------------------
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import InvoiceForm from "./InvoiceForm";

//----------------------------- Dummy Data ----------------------------
const dummyData = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: `Project ${index + 1}`,
  description: `Description for Project ${index + 1}`,
}));

//------------------------------------ Per Page Size ----------------------------------
const itemsPerPage = 10;

export default function BrokrageSection() {
    //------------------------------------------------ All States --------------------------------------------
        const [open, setOpen] = useState(false);
  // State for menu anchor and selected row
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  
  //---------------------------- Modal Close Button------------------------------------------------
  const handleClose = () => setOpen(false);

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
    { field: "Listing_URL", headerName: "Listing URL", minWidth: 150, flex: 1 },
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
      {/* ----------------------------------------- Button Section --------------------------------- */}
      <Box className="flex flex-wrap  gap-5">
        {/* Columns Button */}
        {/* New Invoice Button */}
        <button onClick={()=>{ setOpen(true);}} className="flex w-fit items-center justify-center gap-2 rounded-md bg-cyan-500 px-4 py-2 text-white shadow-md hover:bg-cyan-600 max-[400px]:w-full">
          <span>New Invoice</span>
        </button>
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
          <MenuItem onClick={() => handleMenuClick("Details")}>Edit</MenuItem>
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
          {/* ---------------------------- Preview Modal -------------------------- */}
       {/* Modal for Inventory Configuration */}
            <Modal open={open} onClose={handleClose} closeAfterTransition>
              <Fade in={open}>
                <Box className="absolute right-0 top-0 h-full w-full rounded-t-xl bg-white px-2 py-4 sm:w-3/4 sm:px-3 md:w-2/3 ">
                  <div className="flex items-center justify-between rounded-md bg-cyan-500 px-4 py-2 !text-white shadow-sm">
                    <Typography>Add Brokerage Invoice</Typography>
                    <IoMdCloseCircleOutline
                      color="white"
                      className="cursor-pointer"
                      onClick={handleClose}
                    />
                  </div>
      
                  <div className="max-h-[90vh] overflow-y-auto bg-white ">
                    <InvoiceForm />
                  </div>
                </Box>
              </Fade>
            </Modal>
    </div>
  );
}
