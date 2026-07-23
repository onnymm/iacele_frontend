import DarkModeSwitch from "@/components/ui/dark-mode-switch/DarkModeSwitch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import APIContext from "@/contexts/app/apiContext";
import MainControlsContext from "@/contexts/ui/mainControlsContext";
import useUserData from "@/hooks/app/useUserData";
import useUserToken from "@/hooks/app/useUserToken";
import { LogOut, SunMoon, UserRoundPen } from "lucide-react";
import { useContext, useEffect, useRef } from "react";
import { Link } from "react-router";

const Navbar = () => {

    // Obtención de función de cambio de estado para establecer elemento HTML
    const { setElement } = useContext(MainControlsContext);
    // Inicialización de referencia de controles principales
    const mainControlsRef = useRef<HTMLDivElement>(null);

    // Efecto para establecer la referencia de controles principales como elemento HTML
    useEffect(
        () => {
            setElement(mainControlsRef.current);
        }, [setElement]
    );

    return (
        <nav id="navbar" className="z-20 sticky flex flex-col gap-2 bg-white dark:bg-[#1f2f3f] shadow p-2 w-full transition select-none">
            <div id="navbar-header" className="flex flex-row justify-between items-start gap-2 h-min min-h-12">
                <div className="flex justify-between items-center w-[50%] h-12">
                    <div />
                    <WebsocketConnection />
                </div>
                <Settings />
            </div>
            <div className="flex flex-row justify-between items-center h-min min-h-12">
                <div id="navbar-main-controls" ref={mainControlsRef}/>
            </div>
        </nav>
    );
};

export default Navbar;

const WebsocketConnection = () => {

    // Obtención del estado de websocket conectado
    const { websocketConnected } = useContext(APIContext);

    return (
        <div className={`${websocketConnected ? 'bg-success' : 'bg-danger'} rounded-full size-4`} />
    );
};

const NavbarProfile = () => {

    // Obtención de los datos del usuario de la sesión
    const { userData } = useUserData();

    return (
        <div id="navbar-profile" className="flex flex-row justify-end items-center gap-2 w-full h-12 cursor-pointer">
            <div className="flex flex-col items-end w-[calc(100%-3rem)]">
                <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap">{userData.name}</p>
                <p className="text-gray-300 text-xs">@{userData.login}</p>
            </div>
            <img src={`data:image/jpeg;base64,${userData.profile_picture}` as string} className="rounded-full size-10" />
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

                <Link to={'/me'}>
                    <DropdownMenuItem className="gap-4">
                        <UserRoundPen />
                            Mi perfil
                    </DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator />

                <DropdownMenuItem variant="danger" className="gap-4" onClick={removeUserToken}>
                    <LogOut />
                    Cerrar sesión
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
