import DarkModeSwitch from "@/components/ui/dark-mode-switch/DarkModeSwitch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import LABEL from "@/constants/app/label";
import FRONTEND_PATH from "@/constants/routes/paths";
import useUserToken from "@/hooks/app/useUserToken";
import { LogOut, SunMoon, UserRoundPen } from "lucide-react";
import { Link } from "react-router";
import NavbarProfile from "./NavbarProfile";

const NavbarSettings = () => {

    // Obtención de función de remoción de token
    const { removeUserToken } = useUserToken();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
                <NavbarProfile />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="py-2">

                <DropdownMenuLabel>{LABEL.NAVBAR.PREFERENCES}</DropdownMenuLabel>
                <label htmlFor="dark-mode" className="flex flex-row items-center gap-2 hover:bg-accent px-2 rounded-lg h-8 text-sm transition-colors duration-300 cursor-pointer select-none">
                    <SunMoon />
                    <div className="flex flex-row justify-between w-full">
                        {LABEL.NAVBAR.DARK_MODE}
                        <DarkModeSwitch />
                    </div>
                </label>

                <DropdownMenuSeparator />

                <DropdownMenuLabel>{LABEL.NAVBAR.SETTINGS}</DropdownMenuLabel>

                <Link to={FRONTEND_PATH.ME}>
                    <DropdownMenuItem className="gap-4">
                        <UserRoundPen />
                            {LABEL.NAVBAR.ME}
                    </DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator />

                <DropdownMenuItem variant="danger" className="gap-4" onClick={removeUserToken}>
                    <LogOut />
                    {LABEL.NAVBAR.LOGOUT}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default NavbarSettings;
