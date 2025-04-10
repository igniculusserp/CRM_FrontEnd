import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

//---------------------------- MUI Imports ----------------------------
import { DataGrid } from "@mui/x-data-grid";
import {
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Fade,
  Typography,
  Box,
} from "@mui/material";

//------------------------------------ React Icon ----------------------------
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
import { IoMdCloseCircleOutline } from "react-icons/io";

//---------------------------------- Local Imports --------------------------------
import PreviewDetails from "./Common/PreviewDetails";
import { printSelectedRow } from "./Common/PrintScreen/printSelectedRow";

export default function BuyerTable({ buyers, selectedColumns }) {
  const navigate = useNavigate();

  //--------------------------------------- Set Business Type --------------------------------------------
  const [businessType, setBusinessType] = useState("");

  useEffect(() => {
    const storedType = localStorage.getItem("businessType") || "";
    setBusinessType(storedType);
  }, []);
  //------------------------------------------------ All States --------------------------------------------
  const [open, setOpen] = useState(false);
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
    if (option === "Preview") {
      setOpen(true);
    }
    if (option === "Print") {
      printSelectedRow(selectedRow);
    }
    if (option === "Details") {
      navigate(`/panel/${businessType}/leads/Lead_Details`);
    }
    handleMenuClose();
  };

  // Define table columns
  const columns = [
    { field: "name", headerName: "Name", minWidth: 150, flex: 1 },
    { field: "email", headerName: "Email", minWidth: 200, flex: 1 },
    { field: "phone", headerName: "Phone", minWidth: 150, flex: 1 },
    { field: "location", headerName: "Location", minWidth: 150, flex: 1 },
    { field: "budget", headerName: "Budget", minWidth: 150, flex: 1 },
    {
      field: "action",
      headerName: "Action",
      minWidth: 80,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={(event) => handleMenuOpen(event, params.row)}>
            <PiDotsThreeOutlineVerticalLight size={24} />
          </IconButton>
        </>
      ),
    },
  ].filter(
    (col) => col.field === "action" || selectedColumns.includes(col.field),
  );

  //---------------------------- Modal Close Button------------------------------------------------
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* ------------------------------ Table -------------------------------- */}
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <DataGrid
          rows={buyers} // Row Data
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
        {/* MUI Menu Component */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <MenuItem onClick={() => handleMenuClick("Preview")}>
            Preview
          </MenuItem>
          <MenuItem onClick={() => handleMenuClick("Details")}>
            Details
          </MenuItem>
          <MenuItem onClick={() => handleMenuClick("Print")}>Print</MenuItem>
        </Menu>
      </Paper>
      {/* ---------------------------- Preview Modal -------------------------- */}
      {/* Modal for Inventory Configuration */}
      <Modal open={open} onClose={handleClose} closeAfterTransition>
        <Fade in={open}>
          <Box className="absolute right-0 top-0 h-full w-full rounded-t-xl bg-white px-2 py-4 sm:w-3/4 sm:px-3 md:w-2/3">
            <div className="flex items-center justify-between rounded-md bg-cyan-500 px-4 py-2 !text-white shadow-sm">
              <Typography>Name</Typography>
              <IoMdCloseCircleOutline
                color="white"
                className="cursor-pointer"
                onClick={handleClose}
              />
            </div>

            <div className="max-h-[90vh] overflow-y-auto bg-white">
              <PreviewDetails />
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

// ✅ Add PropTypes Validation
BuyerTable.propTypes = {
  buyers: PropTypes.array.isRequired, // Array of buyer objects
  selectedColumns: PropTypes.arrayOf(PropTypes.string).isRequired, // Array of column names
};
