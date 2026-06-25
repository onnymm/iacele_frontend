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
            <div id="navbar-header" className="flex flex-row justify-between items-start border h-min min-h-12">
                <div/>
                <div/>
                <div id="navbar-profile" className="flex flex-row justify-between gap-4 pr-4 border sm:w-72 h-12">
                    <NavbarProfile />
                </div>
            </div>
            <div className="flex flex-row justify-between items-center border border-green-500 h-min min-h-12">
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
        <Popover>
            <PopoverTrigger asChild>
                <div>{userData.name}</div>
            </PopoverTrigger>
            <PopoverContent>
                <div className="flex flex-row justify-between items-center">
                    Modo oscuro
                    <DarkModeSwitch />
                </div>
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
