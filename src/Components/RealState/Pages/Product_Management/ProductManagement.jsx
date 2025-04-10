import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CardContent, Typography, Box, Modal, Fade } from "@mui/material";
//---------------------------- Icon ---------------------------------
import { FaGlobe } from "react-icons/fa";
import { GiOpenBook } from "react-icons/gi";
import { ImDroplet } from "react-icons/im";
import { IoIosSend } from "react-icons/io";
import { FaLink } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
//--------------------------- Local Imports ------------------------
import InventoryTabs from "./Inventory Configuration/InventoryTabs";

const data = [
  {
    icon: <FaGlobe style={{ width: "30px", height: "30px" }} />,
    title: "Inventory Configuration",
    desc: "Setup inventory.",
  },
  {
    icon: <GiOpenBook style={{ width: "30px", height: "30px" }} />,
    title: "Project Tower Stages",
    desc: "Track Tower progress.",
  },
  {
    icon: <GiOpenBook style={{ width: "30px", height: "30px" }} />,
    title: "Project Unit Stages",
    desc: "Track unit progress.",
  },
  {
    icon: <ImDroplet style={{ width: "30px", height: "30px" }} />,
    title: "Products & Services",
    desc: "Manage offerings.",
  },
  {
    icon: <IoIosSend style={{ width: "30px", height: "30px" }} />,
    title: "Developers",
    desc: "Manage dev data.",
  },
  {
    icon: <FaLink style={{ width: "30px", height: "30px" }} />,
    title: "Listing URLs",
    desc: "View pending listings.",
  },
];

export default function ProductManagement() {
  const navigate = useNavigate();
  //------------------------------------------------ All States --------------------------------------------
  const [open, setOpen] = useState(false);
  const [businessType, setBusinessType] = useState("");
  //--------------------------------------- Set Business Type --------------------------------------------

  useEffect(() => {
    const storedType = localStorage.getItem("businessType") || "";
    setBusinessType(storedType);
  }, []);

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
    if (title === "Developers") {
      navigate(`/panel/${businessType}/product_management/all_developers`);
    }
    if (title === "Listing URLs") {
      navigate(`/panel/${businessType}/product_management/Listing_URLS`);
    }
  };

  //---------------------------- Modal Close Button------------------------------------------------
  const handleClose = () => setOpen(false);
  
  return (
    <div className="h-full bg-gray-200 p-6">
      <Box className="mb-4 w-full rounded-md bg-white p-2">
        <Typography
          sx={{ width: "fit-content" }}
          className="rounded-md !bg-cyan-500 px-3 py-1 text-sm !text-white"
        >
          Product Management
        </Typography>
      </Box>
      <div className="grid grid-cols-1 gap-6 rounded-md bg-white px-6 py-8 shadow-md sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item, index) => (
          <Box
            key={index}
            className="cursor-pointer rounded-lg border border-gray-200 shadow-lg transition-colors duration-300 hover:bg-cyan-50"
            onClick={() => handleAction(item.title)}
          >
            <CardContent className="flex flex-col items-start gap-4 !p-6 !pt-8">
              <div className="text-cyan-500">{item.icon}</div>
              <div className="flex flex-col items-start gap-2">
                <span className="text-lg text-gray-400">{item.title}</span>
                <span className="text-xl font-medium text-black">
                  {item.desc}
                </span>
              </div>
            </CardContent>
          </Box>
        ))}
      </div>

      {/* Modal for Inventory Configuration */}
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
  );
}
