import { Outlet } from "react-router-dom";
import Header from "./../SIDEBAR/Header";
import SidebarBar from "./../SIDEBAR/Sidebar";
import "../../ExternalCSS.css"

export default function SidebarBase() {
    return (
        <div className="flex min-h-screen main_Body_Container">
            {/* SidebarBar is fixed in place */}
            <div className="h-screen sticky top-0 overflow-y-auto side_Bar_Container">
                <SidebarBar />
            </div>
            {/* Main content and header */}
            <div className="flex flex-col flex-grow Main_Data_Container">
                <Header />
                {/* Main content scrolls independently */}
                <div className="flex-grow overflow-auto bg-gray-300 ">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
