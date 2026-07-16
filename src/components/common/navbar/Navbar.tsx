import { Button } from "@/components/ui/button";
import DarkModeSwitch from "@/components/ui/dark-mode-switch/DarkModeSwitch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import MainControlsContext from "@/contexts/ui/mainControlsContext";
import useUserData from "@/hooks/app/useUserData";
import useUserToken from "@/hooks/app/useUserToken";
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

const Separator = () => {

    return (
        <div
            className="m-2 border w-[calc(100%) - 1rem]"
        />
    );
};

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

    return (
        <Popover>
            <PopoverTrigger className="cursor-pointer">
                <NavbarProfile />
            </PopoverTrigger>
            <PopoverContent className="gap-1 p-2 py-4 border">
                <div className="flex flex-row justify-between items-center px-4">
                    Modo oscuro
                    <DarkModeSwitch />
                </div>
                <Separator />
                <Button>
                    Mi perfil
                </Button>
                <LogoutButton />
            </PopoverContent>
        </Popover>
    );
};

const LogoutButton = () => {

    // Obtención de función de remoción de token
    const { removeUserToken } = useUserToken();

    return (
        <Button variant='danger' onClick={removeUserToken}>
            Cerrar sesión
        </Button>
    );
};
