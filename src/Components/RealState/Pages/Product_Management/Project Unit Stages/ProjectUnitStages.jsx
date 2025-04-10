import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//---------------------------------- MUI Imports --------------------------------------
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Modal,
  IconButton,
  Fade,
} from "@mui/material";

//------------------------------------ React Icon ---------------------------------
import { IoAddOutline } from "react-icons/io5";
import { BiSolidEdit } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";

//--------------------------- Local Imports ------------------------
import InventoryTabs from "../Inventory Configuration/InventoryTabs";

export default function ProjectUnitStages() {
  const navigate = useNavigate();
  //----------------------------------------------------- All States ----------------------------------------
  const [unSavedStages, setUnSavedStages] = useState([]);
  const [savedStages, setSavedStages] = useState([
    { name: "Available", category: "Available", colorCode: "" },
    { name: "Booked", category: "Booked", colorCode: "" },
    { name: "Hold", category: "Hold", colorCode: "" },
    { name: "Not Available", category: "Not Available", colorCode: "" },
  ]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [businessType, setBusinessType] = useState("");
  const [selectedStageIndex, setSelectedStageIndex] = useState(null);
  const [selectedStage, setSelectedStage] = useState({
    name: "",
    category: "",
    colorCode: "",
  });
  //--------------------------------------- Set Business Type --------------------------------------------

  useEffect(() => {
    const storedType = localStorage.getItem("businessType") || "";
    setBusinessType(storedType);
  }, []);
  //--------------------------------------------------- Handle Actions --------------------------------
  const handleAction = (title) => {
    if (title === "Inventory Configuration") {
      setOpen(true);
    }
    if (title === "Project Tower Stages") {
      navigate(`/panel/${businessType}/product_management/ProjectTowerStage`);
    }
    if (title === "Project Unit Stages") {
      navigate(`/panel/${businessType}/product_management/ProjectUnitStages`);
    }
    if (title === "Products & Services") {
      navigate(`/panel/${businessType}/product_management/product_&_Services`);
    }
    if (title === "All Developers") {
      navigate(`/panel/${businessType}/product_management/all_developers`);
    }
    if (title === "Listing URLS") {
      navigate(`/panel/${businessType}/product_management/Listing_URLS`);
    }
  };

  //--------------------------------------------------------- Modal Open And Closed Events----------------------------------------
  const handleOpen = (stage, index) => {
    setSelectedStage(stage);
    setSelectedStageIndex(index);
    setEditModalOpen(true);
  };
  const handleEditClose = () => setEditModalOpen(false);
  const handleClose = () => setOpen(false);

  //-------------------------------------------------- Handle Changes in Modal Fields -----------------------------------------
  const handleFieldChange = (field, value) => {
    setSelectedStage({ ...selectedStage, [field]: value });
  };

  //--------------------------------------------------------- States -------------------------------------------------
  const handleAddStage = () => {
    setUnSavedStages([
      ...unSavedStages,
      { name: "", category: "", colorCode: "" },
    ]);
  };

  //--------------------------------------------------------- Save Stage Changes ---------------------------------------
  const handleNewStageChange = (index, field, value) => {
    const updatedStages = [...unSavedStages];
    updatedStages[index][field] = value;
    setUnSavedStages(updatedStages);
  };

  //----------------------------------------------------------- Modal Save Event -----------------------------------------
  const handleSave = () => {
    if (
      !selectedStage.name ||
      !selectedStage.category ||
      !selectedStage.colorCode
    ) {
      alert("Please fill out all fields.");
      return;
    }

    const updatedStages = [...savedStages];
    updatedStages[selectedStageIndex] = selectedStage;

    setSavedStages(updatedStages);
    handleEditClose();
  };

  return (
    <div className="flex flex-col gap-8 p-6">
      {/* --------------------------------------- Heading --------------------------------- */}
      <Box className="w-full rounded-md bg-white p-2">
        <Typography
          sx={{ width: "fit-content" }}
          className="rounded-md !bg-cyan-500 px-3 py-1 text-sm !text-white"
        >
          Project Unit Stages
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
      </Box>
      {/* ---------------------------------------- Main Body -------------------------------------- */}
      <div className="flex min-h-screen flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row">
          {/* Left Section */}
          <Paper className="flex w-full flex-col gap-5 !rounded-lg p-4 md:w-1/3">
            <Typography
              variant="subtitle1"
              className="mb-4 rounded-lg bg-cyan-500 p-2 text-white shadow-md"
            >
              Projects & Inventory
            </Typography>
            <div className="flex flex-col gap-2 rounded-lg border p-2 shadow-lg">
              {[
                "Products & Services",
                "All Developers",
                "Inventory Configuration",
                "Project Tower Stages",
                "Project Unit Stages",
                "Listing URLS",
              ].map((item, index) => (
                <div
                  onClick={() => handleAction(item)}
                  key={index}
                  className={`cursor-pointer rounded-lg border p-2 hover:bg-cyan-100 ${
                    item === "Project Unit Stages" ? "bg-cyan-100" : "bg-white"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </Paper>

          {/* Right Section */}
          <Paper className="flex w-full flex-col gap-4 !rounded-lg p-4">
            <Box className="grid grid-cols-3 gap-4">
              <span className="font-semibold">Name</span>
              <span className="font-semibold">Category</span>
              <span className="font-semibold">Color Code</span>
            </Box>

            {savedStages.map((stage, index) => (
              <Box
                key={index}
                className="grid grid-cols-3 gap-4 rounded-md bg-white"
              >
                <TextField
                  value={stage.name}
                  variant="outlined"
                  InputProps={{ readOnly: true, className: "!bg-white" }}
                />

                <TextField
                  value={stage.category}
                  variant="outlined"
                  InputProps={{ readOnly: true, className: "!bg-white" }}
                />

                <Box className="flex items-center gap-2">
                  <TextField
                    placeholder="Enter Color Code"
                    variant="outlined"
                    InputProps={{ className: "!bg-white" }}
                  />
                  <button
                    onClick={() => handleOpen(stage, index)}
                    className="flex cursor-pointer items-center gap-2 text-cyan-500 hover:text-cyan-600"
                  >
                    <BiSolidEdit className="cursor-pointer text-cyan-500" />
                  </button>
                </Box>
              </Box>
            ))}
            {/* Newly Added Stages */}
            {unSavedStages.map((stage, index) => (
              <Box
                key={`new-${index}`}
                className="grid grid-cols-3 gap-4 rounded-md bg-white"
              >
                <TextField
                  value={stage.name}
                  placeholder="Enter Name"
                  onChange={(e) =>
                    handleNewStageChange(index, "name", e.target.value)
                  }
                  variant="outlined"
                />
                <TextField
                  value={stage.category}
                  placeholder="Enter Category"
                  onChange={(e) =>
                    handleNewStageChange(index, "category", e.target.value)
                  }
                  variant="outlined"
                />
                <Box className="flex items-center gap-2">
                  <TextField
                    value={stage.colorCode}
                    placeholder="Enter Color Code"
                    onChange={(e) =>
                      handleNewStageChange(index, "colorCode", e.target.value)
                    }
                    variant="outlined"
                  />
                  <div></div>
                </Box>
              </Box>
            ))}
          </Paper>
        </div>

        {/*---------------------------------------------------- Buttons Section ------------------------------------------------------*/}
        <div className="flex justify-end gap-3">
          <Button variant="contained" className="!bg-cyan-500 !text-white">
            Save
          </Button>
          <Button
            onClick={handleAddStage}
            variant="outlined"
            className="!border-2 !border-cyan-600 !font-semibold !text-cyan-600"
            startIcon={<IoAddOutline />}
          >
            Add a stage
          </Button>
        </div>

        {/*------------------------------------------------------ Edit Buton Modal -------------------------------------------------------------*/}
        <Modal open={editModalOpen} onClose={handleEditClose}>
          <Box className="absolute left-1/2 top-1/2 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white shadow-lg">
            {/* Modal Header */}
            <div className="flex items-center justify-between rounded-t-lg bg-cyan-500 p-2 text-white">
              <Typography className="font-semibold">
                Edit Project Unit Stage
              </Typography>
              <IconButton onClick={handleEditClose} className="text-white">
                <IoClose />
              </IconButton>
            </div>

            {/* Modal Body */}
            <Box className="flex flex-col gap-3 px-4 py-3">
              <Box className="flex flex-col gap-2">
                <Box className="flex flex-col gap-1">
                  <Typography>Project Unit Stage</Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={selectedStage.name}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
                    placeholder="Enter stage name"
                  />
                </Box>
                <Box className="flex flex-col gap-1">
                  <Typography>Category</Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={selectedStage.category}
                    onChange={(e) =>
                      handleFieldChange("category", e.target.value)
                    }
                    placeholder="Enter category"
                  />
                </Box>
                <Box className="flex flex-col gap-1">
                  <Typography>
                    Color Code (Please select a lighter color)
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={selectedStage.colorCode}
                    onChange={(e) =>
                      handleFieldChange("colorCode", e.target.value)
                    }
                    placeholder="Enter color code"
                  />
                </Box>
              </Box>

              {/* Buttons Section */}
              <Box className="mt-4 flex justify-end gap-3">
                <Button
                  onClick={handleSave}
                  variant="contained"
                  className="!bg-cyan-500 !text-white"
                >
                  Save
                </Button>
                <Button
                  onClick={handleEditClose}
                  variant="outlined"
                  className="!border-cyan-500 !text-cyan-500"
                >
                  Close
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
        {/*------------------------------------------- Modal for Inventory Configuration ---------------------------------------- */}
        <Modal open={open} onClose={handleClose} closeAfterTransition>
          <Fade in={open}>
            <Box className="absolute right-0 top-0 h-full w-full rounded-t-xl bg-white px-4 py-5 sm:w-3/4 sm:px-6 md:w-2/3 lg:w-1/2">
              <div className="flex items-center justify-between rounded-md bg-cyan-500 px-4 py-2 !text-white shadow-sm">
                <Typography>Inventory Configuration</Typography>
                <IoMdCloseCircleOutline
                  color="white"
                  className="cursor-pointer"
                  onClick={handleClose}
                />
              </div>

              <div className="max-h-[90vh] overflow-y-auto bg-white pt-6">
                <InventoryTabs />
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}
