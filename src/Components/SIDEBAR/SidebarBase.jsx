import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./../SIDEBAR/Header";
import SidebarBar from "./../SIDEBAR/Sidebar";
import "./../../ExternalCSS/ExternalCSS_Settings.css";
import ChatPopup from "./SIDEBAR_SETTING/ChatPopup";

export default function SidebarBase() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="reative flex">
      {/* SidebarBar is fixed in place */}
      <div
        className={toggle ? "hide_View" : "Show_View"}
        onClick={() => {
          setToggle(false);
        }}
      />
      <div
        className={`scrollbar-hidden sticky top-0 h-screen bg-cyan-500 ${
          toggle ? "Side_Bar_Large" : "Side_Bar_Small"
        }`}
      >
        <SidebarBar toggle={toggle} setToggle={setToggle} />
      </div>
      {/* Main content and header */}
      <div
        className={`flex h-screen flex-col ${
          toggle ? "Main_Screen_Large" : "Main_Screen_Small"
        }`}
      >
        <Header toggle={toggle} setToggle={setToggle} />
        {/* Main content scrolls independently */}
        <div className="flex-grow overflow-auto bg-gray-300">
          <Outlet />
          {/* CHAT POPUP */}
        </div>
      </div>
    </div>
  );
}
