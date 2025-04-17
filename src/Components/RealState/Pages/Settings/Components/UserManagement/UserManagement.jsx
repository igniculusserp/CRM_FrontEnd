import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CardContent, Typography, Box, Modal, Fade } from "@mui/material";

//---------------------------- Icon ---------------------------------
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaUserCog } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { MdEventAvailable } from "react-icons/md";
import { FaBook } from "react-icons/fa6";
import { LuBoxes } from "react-icons/lu";
import { IoInfinite } from "react-icons/io5";
import UpdateCall from "./Components/UpdateCall/UpdateCall";

const data = [
  {
    icon: <FaUserCog style={{ width: "30px", height: "30px" }} />,
    title: "Manage Users",
    desc: "Add users, manage their teams and hierarchy.",
  },
  {
    icon: <FaUsersGear style={{ width: "30px", height: "30px" }} />,
    title: "Manage Teams",
    desc: "Create teams for your users.",
  },
  {
    icon: <MdEventAvailable style={{ width: "30px", height: "30px" }} />,
    title: "Attendance & Availability",
    desc: "Manage call availabilities for your users.",
  },
  {
    icon: <FaBook style={{ width: "30px", height: "30px" }} />,
    title: "Attendance & Availability Logs",
    desc: "View call availability logs for your users.",
  },
  {
    icon: <LuBoxes style={{ width: "30px", height: "30px" }} />,
    title: "Bulk update call Availabilities",
    desc: "Bulk update call availability timings for your users.",
  },
  {
    icon: <IoInfinite style={{ width: "30px", height: "30px" }} />,
    title: "Update call Availabilities",
    desc: "Update call availabilities for users.",
  },
];

export default function UserManagement() {
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
    if (title === "Manage Users") {
      navigate(
        `/panel/${businessType}/setting_management/User_Management/Manage_User`,
      );
    }
    if (title === "Manage Teams") {
      navigate(
        `/panel/${businessType}/setting_management/User_Management/Manage_Teams`,
      );
    }
    if (title === "Attendance & Availability Logs") {
      navigate(
        `/panel/${businessType}/setting_management/User_Management/Availability_Logs`,
      );
    }
    if (title === "Attendance & Availability") {
      navigate(
        `/panel/${businessType}/setting_management/User_Management/Attendance`,
      );
    }
    if (title === "Bulk update call Availabilities") {
      navigate(
        `/panel/${businessType}/setting_management/User_Management/Call_Availabilities`,
      );
    }
    if (title === "Update call Availabilities") {
      setOpen(true);
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
          User Management
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
                <span className="text-xl font-medium text-black">
                  {item.title}
                </span>
                <span className="text-lg text-gray-400">{item.desc}</span>
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
              <Typography>Update Call Availabilities</Typography>
              <IoMdCloseCircleOutline
                color="white"
                className="cursor-pointer"
                onClick={handleClose}
              />
            </div>
            <div className="max-h-[90vh] overflow-y-auto bg-white">
              <UpdateCall />
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
