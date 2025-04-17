import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CardContent, Typography, Box, Modal, Fade } from "@mui/material";
//---------------------------- Icon ---------------------------------
import { PiListDashesFill } from "react-icons/pi";
import { GoGoal } from "react-icons/go";
import { IoBriefcaseSharp } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { IoReceiptOutline } from "react-icons/io5";
import { TbListSearch } from "react-icons/tb";
import { RiListSettingsLine } from "react-icons/ri";
import { TiExportOutline } from "react-icons/ti";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { BiCustomize } from "react-icons/bi";
import { FaGlobe } from "react-icons/fa";

const data = [
  {
    icon: <PiListDashesFill style={{ width: "30px", height: "30px" }} />,
    title: "Booking Lists",
    desc: "Smart Lists for you customers.",
  },
  {
    icon: <GoGoal style={{ width: "30px", height: "30px" }} />,
    title: "Goals",
    desc: "Add and Manage goals.",
  },
  {
    icon: <IoBriefcaseSharp style={{ width: "30px", height: "30px" }} />,
    title: "Company Details",
    desc: "Manage your common company details.",
  },
  {
    icon: <FaRegUser style={{ width: "30px", height: "30px" }} />,
    title: "User Management",
    desc: "Add users, manage their teams and hierarchy.",
  },
  {
    icon: <IoReceiptOutline style={{ width: "30px", height: "30px" }} />,
    title: "Billing",
    desc: "Download your Invoices & check your dues.",
  },
  {
    icon: <TbListSearch style={{ width: "30px", height: "30px" }} />,
    title: "Search Lists",
    desc: "Use Smart Lists to segment your leads.",
  },
  {
    icon: <RiListSettingsLine style={{ width: "30px", height: "30px" }} />,
    title: "Lead Settings",
    desc: "Customise Lead forms, pipeline stages, manage lead access & more.",
  },
  {
    icon: <TiExportOutline style={{ width: "30px", height: "30px" , transform: 'scaleX(-1)'}} />,
    title: "Import",
    desc: "Import your data in bulk.",
  },
  {
    icon: <TiExportOutline style={{ width: "30px", height: "30px" }} />,
    title: "Export",
    desc: "Download your leads, calls, activities & more.",
  },
  {
    icon: <BsTelephone style={{ width: "30px", height: "30px" }} />,
    title: "Telephony",
    desc: "Setup & manage your telephony & IVR.",
  },
  {
    icon: <MdOutlineNotificationsActive style={{ width: "30px", height: "30px" }} />,
    title: "Notification Settings",
    desc: "Manage your Notification Settings.",
  },
  {
    icon: <BiCustomize style={{ width: "30px", height: "30px" }} />,
    title: "Custom Fields",
    desc: "Customise your account with custom fields.",
  },
  {
    icon: <FaGlobe style={{ width: "30px", height: "30px" }} />,
    title: "Website",
    desc: "Template integration for Property Landing page.",
  },
];


export default function Settings() {
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
   
    if (title === "Booking Lists") {
      navigate(`/panel/${businessType}/setting_management/Booking_List`);
    }
    if (title === "Goals") {
      navigate(`/panel/${businessType}/setting_management/Goals`);
    }
    if (title === "Search Lists") {
      navigate(`/panel/${businessType}/setting_management/All_List`);
    }
    if (title === "User Management") {
      navigate(`/panel/${businessType}/setting_management/User_Management`);
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
          Settings Management
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
                <span className="text-xl font-medium text-black">{item.title}</span>
                <span className="text-lg text-gray-400">
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
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
