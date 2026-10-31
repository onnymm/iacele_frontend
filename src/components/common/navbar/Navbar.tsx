import NavbarCentralControls from "@/components/portals/NavbarCentralControls";
import NavbarSettings from "./NavbarSettings";
import WebsocketConnection from "./WebsocketConnection";
import NavbarDynamicControls from "@/components/portals/NavbarDynamicControls";
import NavbarMainControls from "@/components/portals/NavbarMainControls";

const Navbar = () => {

    return (
        <nav id="navbar" className="z-20 sticky flex flex-col gap-2 bg-white dark:bg-[#1f2f3f] shadow p-2 w-full transition select-none">
            <div id="navbar-header" className="group flex flex-row justify-between items-start gap-2 h-min min-h-12 iacele-navbar">
                <div className="flex justify-between items-center w-[50%] h-12">
                    <div />
                    <WebsocketConnection />
                </div>
                <NavbarSettings />
            </div>
            <div className="relative justify-between items-center grid grid-cols-3 h-min min-h-12">
                <div className="flex gap-2 md:gap-0 md:grid grid-cols-2 col-span-2 w-full">
                    <NavbarMainControls.Render />
                    <NavbarCentralControls.Render />
                </div>
                <NavbarDynamicControls.Render />
            </div>
        </nav>
    );
};

export default Navbar;
