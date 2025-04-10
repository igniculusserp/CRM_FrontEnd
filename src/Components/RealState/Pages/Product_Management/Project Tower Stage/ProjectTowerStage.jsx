import { useState,useEffect } from "react";
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
  Fade
} from "@mui/material";

//------------------------------------ React Icon ---------------------------------
import { IoAddOutline } from "react-icons/io5";
import { BiSolidEdit } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";  

//--------------------------- Local Imports ------------------------
import InventoryTabs from "../Inventory Configuration/InventoryTabs";

export default function ProjectTowerStage() {
  const navigate = useNavigate();
  //----------------------------------------------------- All States ----------------------------------------
  const [unSavedStages, setUnSavedStages] = useState([]);
  const [savedStages, setSavedStages] = useState([
    "Booking",
    "Agreement",
    "Possession",
  ]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [stageName, setStageName] = useState("");
  const [businessType, setBusinessType] = useState("");
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
  const handleOpen = (stage) => {
    setStageName(stage); 
    setEditModalOpen(true);
  };
  const handleEditClose = () => setEditModalOpen(false);
  const handleClose = () => setOpen(false);

  //--------------------------------------------------------- States -------------------------------------------------
  const handleAddStage = () => {
    setUnSavedStages([...unSavedStages, ""]);
  };

  //--------------------------------------------------------- Save Stage Changes ---------------------------------------
  const handleStageChange = (index, value) => {
    const updatedStages = [...unSavedStages];
    updatedStages[index] = value;
    setUnSavedStages(updatedStages);
  };

  //----------------------------------------------------------- Modal Save Event -----------------------------------------
  const handleSave = () => {
    const updatedStages = savedStages.map((stage) =>
      stage === stageName ? stageName : stage,
    );
    setSavedStages(updatedStages);
    console.log("Stage Name Saved:", updatedStages);
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
          Project Tower Stages
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
          <Paper className="flex w-full flex-col gap-5 p-4 md:w-1/3 !rounded-lg">
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
                    item === "Project Tower Stages" ? "bg-cyan-100" : "bg-white"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </Paper>

          {/* Right Section */}
          <Paper className="flex w-full flex-col gap-4 p-4 md:w-2/3 !rounded-lg">
            {savedStages.map((stage, index) => (
              <Box
                key={index}
                className="flex items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-3 shadow-md"
              >
                <span>{stage}</span>
                <button
                  onClick={() => handleOpen(stage)}
                  className="flex cursor-pointer items-center gap-2 text-cyan-500 hover:text-cyan-600"
                >
                  <BiSolidEdit className="cursor-pointer text-cyan-500" />
                </button>
              </Box>
            ))}

            {unSavedStages.map((stage, index) => (
              <TextField
                key={index}
                placeholder="Add new stage"
                value={stage}
                onChange={(e) => handleStageChange(index, e.target.value)}
                fullWidth
                variant="outlined"
                InputProps={{
                  className: "shadow-md",
                }}
              />
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
          <Box className="absolute left-1/2 top-1/2 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white shadow-lg">
            {/* Modal Header */}
            <div className="flex items-center justify-between rounded-t-lg bg-cyan-500 p-2 text-white">
              <Typography className="font-semibold">
                Edit Project Tower Stage
              </Typography>
              <IconButton onClick={handleEditClose} className="text-white">
                <IoClose />
              </IconButton>
            </div>

            {/* Modal Body */}
            <Box className="flex flex-col gap-4 p-4">
            <Box className="flex flex-col gap-2">
              <Typography>Project Tower Stage</Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={stageName}
                onChange={(e) => setStageName(e.target.value)}
                placeholder="Enter stage name"
              />
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
