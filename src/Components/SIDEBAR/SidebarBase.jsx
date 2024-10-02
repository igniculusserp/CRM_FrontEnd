import { Outlet } from "react-router-dom";
import Header from "./../SIDEBAR/Header";
import SidebarBar from "./../SIDEBAR/Sidebar";

export default function SidebarBase() {
    return (
        <div className="flex min-h-screen">
            {/* SidebarBar is fixed in place */}
            <div className="w-64 h-screen sticky top-0 overflow-y-auto">
                <SidebarBar />
            </div>
            {/* Main content and header */}
            <div className="flex flex-col flex-grow">
                <Header />
                {/* Main content scrolls independently */}
                <div className="flex-grow overflow-auto bg-gray-300 ">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
