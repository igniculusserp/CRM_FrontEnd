import { useState } from "react";

import {  Box } from "@mui/material";
import Calls from "./Component/Calls";
import Emails from "./Component/Emails";
import SiteVisits from "./Component/SiteVisits";
import FollowUps from "./Component/FollowUps";
import WhatsApp from "./Component/WhatsApp";

export default function Conversations() {
  //---------------------------------------- All States ---------------------------------
  const [selectedButton, setSelectedButton] = useState("Calls");

  //   const openWhatsAppChat = () => {
  //     const formattedNumber = 9630233165; // Remove non-numeric characters
  //     const whatsappUrl = `https://web.whatsapp.com/send?phone=${formattedNumber}`;

  //     window.open(whatsappUrl, "_blank");
  //   };

  return (
    <div className="flex h-full flex-col gap-8 bg-gray-200 p-6">
      {/* --------------------------------------- Heading --------------------------------- */}
      <Box className="relative flex w-full gap-3 rounded-md bg-white p-2">
        {["Calls", "Emails", "Site Visits", "Followups", "Whatsapps"].map(
          (button) => (
            <>
             
                <Box
                  key={button}
                  sx={{ width: "fit-content" }}
                  className={`cursor-pointer rounded-md px-3 py-1 text-sm transition-all ${
                    selectedButton === button
                      ? "bg-cyan-500 text-white shadow-md"
                      : "bg-gray-200 text-black hover:bg-cyan-400 hover:text-white"
                  }`}
                  onClick={() => setSelectedButton(button)}
                >
                  {button}
                <Box></Box>
                </Box>
             
            </>
          ),
        )}
      </Box>
      {/* <Box>
      <button onClick={openWhatsAppChat} className="whatsapp-button">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            width="24"
          />
        </button>
      </Box> */}
      {/* --------------------------- Tabs Import Section ------------------------ */}
      {selectedButton === "Calls" ? <Calls /> : ""}
      {selectedButton === "Emails" ? <Emails /> : ""}
      {selectedButton === "Site Visits" ? <SiteVisits /> : ""}
      {selectedButton === "Followups" ? <FollowUps /> : ""}
      {selectedButton === "Whatsapps" ? <WhatsApp /> : ""}
    </div>
  );
}
