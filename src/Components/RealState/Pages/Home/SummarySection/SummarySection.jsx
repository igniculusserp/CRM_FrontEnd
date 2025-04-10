//---------------------------------- MUI Imports --------------------------------------
import { Box, Typography, Card } from "@mui/material";

//---------------------------------- Images -------------------------------------------
import Leads from "../../../../../assets/Home/Leads.png";
import Agreement from "../../../../../assets/Home/Agreement.png";
import Booking from "../../../../../assets/Home/Booking.png";
import Construction from "../../../../../assets/Home/Construction.png";

export default function SummarySection() {
  return (
    <>
      <Box className="flex flex-col justify-between gap-6 rounded-lg bg-white px-4 py-6 shadow-md">
        {/* Heading */}
        <Box>
          <Typography className="!text-2xl !font-semibold">
            Quick Summary
          </Typography>
        </Box>
        {/* Cards Container*/}
        <Box className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
          {/* Total Leads */}
          <Card className="flex items-center justify-between gap-4 !rounded-xl px-4 py-7 shadow-md">
            <div className="flex h-full flex-col items-start justify-between">
              <Typography className="!text-gray-500">Total Leads</Typography>
              <Typography className="!text-2xl !font-bold">10</Typography>
            </div>
            <div className="flex h-20 w-20 items-center justify-center rounded-full border bg-blue-600">
              <img src={Leads} alt="Leads" />
            </div>
          </Card>

          {/* Conducted Site Visits */}
          <Card className="flex items-center justify-between gap-4 !rounded-xl px-4 py-7 shadow-md">
            <div className="flex h-full flex-col items-start justify-between">
              <Typography className="!text-gray-500">
                Conducted Site Visits
              </Typography>
              <Typography className="!text-2xl !font-bold">4</Typography>
            </div>
            <div className="flex h-20 w-20 items-center justify-center rounded-full border bg-yellow-400">
              <img src={Construction} alt="Construction" />
            </div>
          </Card>

          {/* Bookings */}
          <Card className="flex items-center justify-between gap-4 !rounded-xl px-4 py-7 shadow-md">
            <div className="flex h-full flex-col items-start justify-between">
              <Typography className="!text-gray-500">Bookings</Typography>
              <Typography className="!text-2xl !font-bold">5</Typography>
            </div>
            <div className="flex h-20 w-20 items-center justify-center rounded-full border bg-red-400">
              <img src={Booking} alt="Booking" />
            </div>
          </Card>

          {/* Agreement Value */}
          <Card className="flex items-center justify-between gap-4 !rounded-xl px-4 py-7 shadow-md">
            <div className="flex h-full flex-col items-start justify-between">
              <Typography className="!text-gray-500">
                Agreement Value (INR)
              </Typography>
              <Typography className="!text-xl !font-bold">
                40,30,00,000
              </Typography>
            </div>
            <div className="flex h-20 w-20 items-center justify-center rounded-full border bg-teal-300">
              <img src={Agreement} alt="Agreement" />
            </div>
          </Card>
        </Box>
      </Box>
    </>
  );
}
