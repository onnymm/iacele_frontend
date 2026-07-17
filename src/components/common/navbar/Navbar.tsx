import DarkModeSwitch from "@/components/ui/dark-mode-switch/DarkModeSwitch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import MainControlsContext from "@/contexts/ui/mainControlsContext";
import useUserData from "@/hooks/app/useUserData";
import useUserToken from "@/hooks/app/useUserToken";
import { LogOut, SunMoon, UserRoundPen } from "lucide-react";
import { useContext, useEffect, useRef } from "react";

const Navbar = () => {

    const { setElement } = useContext(MainControlsContext);

    const mainControlsRef = useRef<HTMLDivElement>(null)

    useEffect(
        () => {
            setElement(mainControlsRef.current)
        }, [setElement]
    )

    return (
        <nav id="navbar" className="z-20 sticky flex flex-col gap-2 bg-white dark:bg-[#1f2f3f] shadow p-2 w-full transition select-none">
            <div id="navbar-header" className="flex flex-row justify-between items-start h-min min-h-12">
                <div/>
                <div/>
                <Settings />
            </div>
            <div className="flex flex-row justify-between items-center h-min min-h-12">
                <div id="navbar-main-controls" ref={mainControlsRef}/>
            </div>
        </nav>
    );
};

export default Navbar;

const NavbarProfile = () => {

    // Obtención de los datos del usuario de la sesión
    const { userData } = useUserData();

    return (
        <div id="navbar-profile" className="flex flex-row justify-end items-center gap-2 w-[50%] sm:w-72 h-12">
            <div className="flex flex-col items-end">
                <p>{userData.name}</p>
                {userData.role_ids.length && 
                    <p className="text-gray-300 text-xs">@{userData.login}</p>
                }
            </div>
            <img src={`data:image/jpeg;base64,${userData.profile_picture}` as string} alt="" className="rounded-full size-10" />
        </div>
    );
};

const Settings = () => {

    // Obtención de función de remoción de token
    const { removeUserToken } = useUserToken();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <NavbarProfile />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="py-2">

                <DropdownMenuLabel>Preferencias</DropdownMenuLabel>
                <div className="flex flex-row items-center gap-2 px-2 text-sm transition-colors duration-300">
                    <SunMoon />
                    <div className="flex flex-row justify-between w-full">
                        Modo oscuro
                        <DarkModeSwitch />
                    </div>
                </div>

                <DropdownMenuSeparator />
                <DropdownMenuLabel>Ajustes</DropdownMenuLabel>

                <DropdownMenuItem className="gap-4">
                    <UserRoundPen />
                    Mi perfil
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem variant="danger" className="gap-4" onClick={removeUserToken}>
                    <LogOut />
                    Cerrar sesión
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
