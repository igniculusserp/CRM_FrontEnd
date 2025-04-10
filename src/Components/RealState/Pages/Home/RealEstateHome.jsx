//react
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//---------------------------------- MUI Imports --------------------------------------
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { CalendarToday, AccessTime, Cached } from "@mui/icons-material";

//reactIcons
import { ImCancelCircle } from "react-icons/im";
import { FaCalendar } from "react-icons/fa";

//Local Import
import SummarySection from "./SummarySection/SummarySection";
import BarChartTabs from "./BarChartSection/BarChartTabs";
import TotalData from "./TotalDataSection/TotalData";
import ListTabs from "./ListTabSection/ListTabs";

export default function RealEstateHome() {
  //------- Business Type --------
  const businessType = localStorage.getItem("businessType");

  //--------------------------------------- Set Business Type --------------------------------------------
  const [BusinessType, setBusinessType] = useState("");

  useEffect(() => {
    const storedType = localStorage.getItem("businessType") || "";
    setBusinessType(storedType);
  }, []);

  // ------------ DATA FUNCTIONALITY STARTS FROM HERE ------------
  const [remainingDays, setRemainingDays] = useState(0);
  const [showSubscription, setShowSubscription] = useState(true);

  const user = JSON.parse(localStorage.getItem("userDetail"));
  // USERNAME
  const firstName = user?.userDetail?.firstName;

  useEffect(() => {
    if (!user?.tenantCreationDate) return;

    const subscriptionStartDate = new Date(user.tenantCreationDate);
    const subscriptionEndDate = new Date(subscriptionStartDate);
    subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);

    const calculateRemainingDays = () => {
      const today = new Date();
      const timeDifference =
        Date.UTC(
          subscriptionEndDate.getFullYear(),
          subscriptionEndDate.getMonth(),
          subscriptionEndDate.getDate(),
        ) - Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
      const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      return days > 0 ? days : 0;
    };

    setRemainingDays(calculateRemainingDays());

    // Schedule the next update at midnight
    const now = new Date();
    const timeUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;

    const timeout = setTimeout(() => {
      setRemainingDays(calculateRemainingDays());
    }, timeUntilMidnight);

    return () => clearTimeout(timeout);
  }, [user]);

  return (
    <>
      <div className="flex min-h-screen flex-col gap-1 bg-gray-100">
        {/* ------------------------------------------------------ show Subscription Bar ---------------------------------------- */}
        {showSubscription && (
          <div className="animate-fade-in flex transform animate-slide-down items-center justify-between border-t-2 bg-white px-3 py-2 text-white shadow-md transition duration-500 ease-in-out">
            <div className="flex flex-col justify-start">
              {/*Condition if reamining days are less than 5  */}
              <h1
                className={`${
                  remainingDays < 5 ? "text-red-500" : "text-gray-700"
                } text-xl font-semibold`}
              >
                Clock is ticking! {remainingDays} day&apos;s are left in your
                trail.
              </h1>
              <p className="text-xs font-semibold text-gray-500">
                Pick a perfect plan for your business needs before your trial
                period gets over.
              </p>
            </div>
            {/* SECOND */}
            <div className="flex items-center gap-4">
              <Link to={`/panel/${BusinessType}/subscription/`}>
                <button className="cursor-pointer rounded-md border-none bg-cyan-500 px-2 py-2 text-sm font-semibold text-white hover:shadow-md">
                  Choose Plan
                </button>
              </Link>
              <Link
                to={`/panel/${businessType}/dashboard`}
                onClick={() => setShowSubscription(false)}
              >
                <ImCancelCircle color="red" size={25} />
              </Link>
            </div>
          </div>
        )}
        {/*-------------------------------------------------- Welcome Bar -------------------------------------------*/}
        <h1 className="my-2 px-3 pb-1 text-2xl font-semibold text-gray-700 sm:text-3xl">
          Hello, {firstName || ""}
        </h1>
        {/* ---------------------------------------------------- Main Body ----------------------------------------- */}
        <div className="flex flex-col gap-6 border px-6 py-4 max-[400px]:px-1">
          {/*---------------------------------------------- First Section -------------------------------------------*/}
          <Box className="rounded-lg border bg-white px-4 py-3 shadow-md">
            <div className="flex items-end justify-between gap-4 sm:items-center max-[400px]:flex-col max-[400px]:items-start">
              <div className="grid w-full grid-cols-1 sm:grid-cols-3 items-center gap-4">
                <Select
                  value="Select"
                  className="w-full shadow-sm"
                  sx={{ height: 50 }}
                >
                  <MenuItem value="Select">Select Value</MenuItem>
                  <MenuItem value="Project1">Project 1</MenuItem>
                  <MenuItem value="Project2">Project 2</MenuItem>
                </Select>

                <Select
                  value="Select"
                  className="w-full shadow-sm"
                  sx={{ height: 50 }}
                >
                  <MenuItem value="Select">Select Value</MenuItem>
                  <MenuItem value="Source1">Source 1</MenuItem>
                  <MenuItem value="Source2">Source 2</MenuItem>
                </Select>

                <Select
                  value="Select"
                  className="w-full shadow-sm"
                  sx={{ height: 50 }}
                >
                  <MenuItem value="Select">Select Value</MenuItem>
                  <MenuItem value="Person1">Person 1</MenuItem>
                  <MenuItem value="Person2">Person 2</MenuItem>
                </Select>
              </div>
              {/* Buttons Row */}
              <div className="flex items-center justify-center rounded-lg border border-gray-400 p-1 shadow-sm ">
                <IconButton className="text-purple-500">
                  <Cached />
                </IconButton>
              </div>
            </div>
          </Box>

          {/*--------------------------------------------- Second Section -------------------------------------------*/}
          <Box className="rounded-lg border bg-white px-4 py-3 shadow-md ">
            <div className="flex items-end justify-between gap-4 xl:items-center max-[400px]:flex-col max-[400px]:items-start">
              <div className="grid grid-cols-1 w-full items-center gap-4 xl:grid-cols-3">
                <Select className="w-full" sx={{ height: 50 }} value="Select">
                  <MenuItem value="Select">Select Value</MenuItem>
                  <MenuItem value="Monthly">Monthly</MenuItem>
                </Select>

                {/* ----------- Date and Time ------------------- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                  <TextField
                    type="date"
                    defaultValue="2025-03-01"
                    className="w-full"
                    InputProps={{
                      sx: { height: 50 }, // Correct way to set height
                      startAdornment: (
                        <CalendarToday className="mr-2 text-gray-400" />
                      ),
                    }}
                  />

                  <TextField
                    type="time"
                    defaultValue="00:00"
                    className="w-full"
                    InputProps={{
                      sx: { height: 50 },
                      startAdornment: (
                        <AccessTime className="mr-2 text-gray-400" />
                      ),
                    }}
                  />
                </div>

                {/* ----------- Date and Time ------------------- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                  <TextField
                    type="date"
                    defaultValue="2025-03-20"
                    className="w-full"
                    InputProps={{
                      sx: { height: 50 },
                      startAdornment: (
                        <CalendarToday className="mr-2 text-gray-400" />
                      ),
                    }}
                  />

                  <TextField
                    type="time"
                    defaultValue="23:59"
                    className="w-full"
                    InputProps={{
                      sx: { height: 50 },
                      startAdornment: (
                        <AccessTime className="mr-2 text-gray-400" />
                      ),
                    }}
                  />
                </div>
              </div>

              {/* ----- Button ------- */}
              <div className="flex justify-end gap-3 max-[400px]:w-full max-[400px]:justify-start">
                <Button
                  variant="contained"
                  className="!rounded-lg !bg-cyan-500 !font-semibold !text-white max-[400px]:w-full"
                  sx={{
                    height: 50,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: "unset",
                  }}
                >
                  Apply
                </Button>
              </div>
            </div>
          </Box>
          {/*-------------------------------------------- Third Section ---------------------------------------------*/}
          <Box className="flex w-full gap-4 flex-col xl:flex-row">
            {/*----------------------------------- Summary And Chart Bar Section ------------------------------------*/}
            <Box className="flex w-full xl:w-3/5 flex-col gap-3">
              {/* ------------------------------------------- Summary Section -----------------------------------------*/}
              <SummarySection />
              {/* ------------------------------------------ Bar Chart Section ----------------------------------------*/}
              <Box className="rounded-lg bg-gray-50 px-4 py-6 shadow-md">
                <BarChartTabs />
              </Box>
            </Box>
            {/*-------------------------------------- Data And List Section -------------------------------------------*/}
            <Box className="flex xl:w-2/5 flex-col gap-3">
              {/* --------------------------------------- Data Section ------------------------------------------------*/}
              <TotalData />
              {/* -----------------------------------List and Tabs Section ------------------------------------------ */}
              <Box className="flex flex-col justify-between gap-6 rounded-lg bg-white px-4 py-6 shadow-md" >
                {/* Heading */}
                <Box className="flex justify-between">
                  <Typography className="!text-xl !font-semibold">
                    Tue, 18 March
                  </Typography>
                  <FaCalendar color="gray" />
                </Box>
                {/* Body */}
                <Box>
                  <ListTabs />
                </Box>
              </Box>
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
}
