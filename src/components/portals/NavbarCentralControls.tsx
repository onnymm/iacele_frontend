import VOID_CALLBACK from "@/constants/app/callbacks";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface NavbarCentralControlsContextParams {
    element: HTMLDivElement | null;
    setElement: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
    navbarCentralControls: React.ReactNode;
    setNavbarCentralControls: React.Dispatch<React.SetStateAction<React.ReactNode>>;
};

const NavbarCentralControlsContext = createContext<NavbarCentralControlsContextParams>({
    element: null,
    setElement: VOID_CALLBACK.SYNC,
    navbarCentralControls: null,
    setNavbarCentralControls: VOID_CALLBACK.SYNC,
});

const NavbarCentralControls = {

    Provider: ({
        children,
    }: IACele.Common.SupportsChildren) => {

        // Inicialización de estado de componente
        const [ navbarCentralControls, setNavbarCentralControls ] = useState<React.ReactNode>(null);
        // Inicialización de estado para almacenar el elemento JSX
        const [ element, setElement ] = useState<HTMLDivElement | null>(null);

        return (
            <NavbarCentralControlsContext.Provider value={{
                element,
                setElement,
                navbarCentralControls,
                setNavbarCentralControls,
            }}>
                {children}
            </NavbarCentralControlsContext.Provider>
        );
    },

    Portal: ({
        children,
    }: IACele.Common.SupportsChildren) => {

        // Obtención de elemento de renderización desde el contexto
        const { element } = useContext(NavbarCentralControlsContext);

        // Si no existe elemento para renderizar no se renderiza
        if ( element === null ) return;

        // Creación de portal
        return createPortal(
            children,
            element,
        );
    },

    Render: () => {

        // Obtención de función de cambio de estado para establecer elemento HTML en controles centrales
        const { setElement: setNavbarCentralControlsElement, element } = useContext(NavbarCentralControlsContext);

        // Inicialización de referencia de controles centrales
        const navbarCentralControlsRef = useRef<HTMLDivElement>(null);

        // Efecto para establecer la referencia de controles principales como elemento HTML
        useEffect(
            () => {
                setNavbarCentralControlsElement(navbarCentralControlsRef.current);
            }, [setNavbarCentralControlsElement]
        );

        return (
            <div className={`${!element ? 'hidden' : ''}`} ref={navbarCentralControlsRef} />
        );
    },

};

export default NavbarCentralControls;
