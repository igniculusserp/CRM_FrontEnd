import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  Pagination,
  Menu,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Select,
  Typography,
} from "@mui/material";

//---------------------------- React Icon -------------------------------
// import { FaEdit } from "react-icons/fa";
import { LiaColumnsSolid } from "react-icons/lia";
import BuyerTable from "./BuyerTable";
import SellerTable from "./SellerTable";

//----------------------------- Dummy Data ----------------------------

const buyerData = [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890", location: "New York", budget: "$500,000" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210", location: "California", budget: "$700,000" },
  ];
  
  const sellerData = [
    { id: 1, name: "David Johnson", email: "david@example.com", phone: "555-123-4567", propertyType: "Apartment", askingPrice: "$450,000" },
    { id: 2, name: "Sarah Brown", email: "sarah@example.com", phone: "555-987-6543", propertyType: "Villa", askingPrice: "$900,000" },
  ];

export default function RealEstateLeads() {
    const navigate = useNavigate();

    //--------------------------------------- Set Business Type --------------------------------------------
    const [businessType, setBusinessType] = useState("");
  
    useEffect(() => {
      const storedType = localStorage.getItem("businessType") || "";
      setBusinessType(storedType);
    }, []);

  //---------------------------------------- All States ---------------------------------
  const [selectedButton, setSelectedButton] = useState("Buyers");
  const [selectedColumns, setSelectedColumns] = useState([
    "name",
    "email",
    "phone",
    "location",
    "budget",
  ]);

  //---------------------------------------- Pagination --------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBuyers = buyerData.slice(startIndex, endIndex);
  const paginatedSellers = sellerData.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => setCurrentPage(value);

  //------------------------------------------------------ Table Heading And Table Data ------------------------------------------

  const allColumns = [
    { field: "name", headerName: "Name", minWidth: 150, flex: 1 },
    { field: "email", headerName: "Email", minWidth: 150, flex: 1 },
    { field: "phone", headerName: "Phone", minWidth: 150, flex: 1 },
    { field: "location", headerName: "Location", minWidth: 150, flex: 1 }, // Only for buyers
    { field: "budget", headerName: "Budget", minWidth: 150, flex: 1 }, // Only for buyers
    { field: "propertyType", headerName: "PropertyType", minWidth: 150, flex: 1 }, // Only for sellers
    { field: "askingPrice", headerName: "AskingPrice", minWidth: 150, flex: 1 }, // Only for sellers
  ];

  //------------------------------------------------------ Handle Columns ------------------------------------------------------
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleColumnToggle = (field) => {
    setSelectedColumns((prev) =>
      prev.includes(field) ? prev.filter((col) => col !== field) : [...prev, field]
    );
  };

  return (
    <div className="flex h-full flex-col gap-8 bg-gray-200 p-6 max-[400px]:p-1 max-[400px]:py-4">
      {/* --------------------------------------- Heading --------------------------------- */}
      <Box className="flex w-full gap-3 rounded-md bg-white p-2">
        <Typography
          sx={{ width: "fit-content" }}
          className="rounded-md !bg-gray-200 px-3 py-1 text-sm !text-black cursor-pointer hover:!bg-cyan-400 hover:!text-white"
          onClick={() => {
            navigate(`/panel/${businessType}/leads/search_lead`);
          }}
        >
          Search
        </Typography>
        <Typography
          sx={{ width: "fit-content" }}
          className="rounded-md !bg-cyan-500 px-3 py-1 text-sm !text-white cursor-pointer"
        >
          All Leads
        </Typography>
      </Box>
      {/* ----------------------------------------- Buttons --------------------------------- */}
      <Box className="flex flex-wrap justify-between gap-5">
        {/* Columns Button */}
        <div className="flex gap-3 max-[420px]:w-full">
          {/* Manage Columns Button */}
          <button
            onClick={handleOpenMenu}
            className="flex w-fit items-center justify-center gap-2 rounded-md border border-cyan-500 bg-white px-3 py-2 text-cyan-500 shadow-md transition-all duration-200 hover:bg-cyan-500 hover:text-white "
          >
            <LiaColumnsSolid className="h-8 w-8" />
          </button>

          {/* Column Management Dropdown */}
          <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
            {allColumns
              .filter((col) =>
                selectedButton === "Buyers"
                  ? ["name", "email", "phone", "location", "budget"].includes(col.field)
                  : ["name", "email", "phone", "propertyType", "askingPrice"].includes(col.field)
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
          {/* All Leads */}
          <Select
            value="Leads"
            className="w-fit max-[420px]:w-full !bg-white !shadow-md"
            sx={{ height: 50 }}
          >
            <MenuItem value="Leads">All Leads</MenuItem>
            <MenuItem value="Project1">Project 1</MenuItem>
            <MenuItem value="Project2">Project 2</MenuItem>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="flex max-[420px]:w-full justify-start gap-3 ">
          {/* Buyer Button */}
          <button
            className={`flex w-fit max-[420px]:w-full items-center justify-center gap-2 rounded-md px-4 py-2 text-white shadow-md transition-all ${
              selectedButton === "Buyers"
                ? "bg-cyan-600"
                : "bg-cyan-500 hover:bg-cyan-600"
            }`}
            onClick={() => setSelectedButton("Buyers")}
          >
            <span>Buyers</span>
          </button>

          {/* Seller Button */}
          <button
            className={`flex w-fit max-[420px]:w-full items-center justify-center gap-2 rounded-md px-4 py-2 text-white shadow-md transition-all ${
              selectedButton === "Sellers"
                ? "bg-cyan-600"
                : "bg-cyan-500 hover:bg-cyan-600"
            }`}
            onClick={() => setSelectedButton("Sellers")}
          >
            <span>Sellers</span>
          </button>
        </div>
      </Box>

      {/* ------------------------------------------- Table --------------------------------- */}
      {selectedButton === "Buyers" ? (
        <BuyerTable
          buyers={paginatedBuyers}
          selectedColumns={selectedColumns}
        />
      ) : (
        <SellerTable
          sellers={paginatedSellers}
          selectedColumns={selectedColumns}
        />
      )}
      {/* --------------------------------------- Pagination ------------------------------------------ */}
      <Stack spacing={2} className="mb-1 mt-4">
        <Pagination
          count={Math.ceil(
            (selectedButton === "Buyers"
              ? buyerData.length
              : sellerData.length) / itemsPerPage,
          )}
          page={currentPage}
          onChange={handlePageChange}
          sx={{
            display: "flex",
            justifyContent: "center",
            "& .MuiPaginationItem-root": { fontSize: "1.2rem" },
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
