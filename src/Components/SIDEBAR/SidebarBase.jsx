import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./../SIDEBAR/Header";
import SidebarBar from "./../SIDEBAR/Sidebar";
import "./../../ExternalCSS/ExternalCSS_Settings.css";
import ChatPopup from "./SIDEBAR_SETTING/ChatPopup";

export default function SidebarBase() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* SidebarBar is fixed in place */}
      <div
        className={`h-screen sticky top-0 scrollbar-hidden ${
          toggle ? "Side_Bar_Large" : "Side_Bar_Small"
        }`}
      >
        <SidebarBar toggle={toggle} />
      </div>
      {/* Main content and header */}
      <div  className={`flex flex-col ${
          toggle ? "Main_Screen_Large" : "Main_Screen_Small"
        }`}>
        <Header toggle={toggle} setToggle={setToggle} />
        {/* Main content scrolls independently */}
        <div className="flex-grow overflow-auto bg-gray-300">
          <Outlet />
          {/* CHAT POPUP */}
          <ChatPopup />
        </div>
      </div>
    </div>
  );
}
