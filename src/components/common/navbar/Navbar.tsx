import MainControlsContext from "@/contexts/ui/mainControlsContext";
import { useContext, useEffect, useRef } from "react";
import NavbarSettings from "./NavbarSettings";
import WebsocketConnection from "./WebsocketConnection";

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
            <div id="navbar-header" className="group flex flex-row justify-between items-start gap-2 h-min min-h-12 iacele-navbar">
                <div className="flex justify-between items-center w-[50%] h-12">
                    <div />
                    <WebsocketConnection />
                </div>
                <NavbarSettings />
            </div>
            <div className="flex flex-row justify-between items-center h-min min-h-12">
                <div id="navbar-main-controls" ref={mainControlsRef}/>
            </div>
        </nav>
    );
};

export default Navbar;
