import MainControlsContext from "@/contexts/ui/mainControlsContext";
import { useContext, useEffect, useRef } from "react";
import NavbarSettings from "./NavbarSettings";
import WebsocketConnection from "./WebsocketConnection";
import DynamicControlsContext from "@/contexts/ui/dynamicControlsContext";

const Navbar = () => {

    // Obtención de función de cambio de estado para establecer elemento HTML en controles principales
    const { setElement: setMainControlsElement } = useContext(MainControlsContext);
    // Obtención de función de cambio de estado para establecer elemento HTML en controles dinámicos
    const { setElement: setDynamicControlsElement } = useContext(DynamicControlsContext);
    // Inicialización de referencia de controles principales
    const mainControlsRef = useRef<HTMLDivElement>(null);
    // Inicialización de referencia de controles dinámicos
    const dynamicControlsRef = useRef<HTMLDivElement>(null);

    // Efecto para establecer la referencia de controles principales como elemento HTML
    useEffect(
        () => {
            setMainControlsElement(mainControlsRef.current);
        }, [setMainControlsElement]
    );

    // Efecto para establecer la referencia de controles dinámicos como elemento HTML
    useEffect(
        () => {
            setDynamicControlsElement(dynamicControlsRef.current);
        }, [setDynamicControlsElement]
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
                <div id="navbar-dynamic-controls" ref={dynamicControlsRef}/>
            </div>
        </nav>
    );
};

export default Navbar;
