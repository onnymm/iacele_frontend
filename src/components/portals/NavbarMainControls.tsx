import VOID_CALLBACK from "@/constants/app/callbacks";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const NavbarMainControls = {

    Provider: ({
        children,
    }: IACele.Common.SupportsChildren) => {

        // Inicialización de estado de componente
        const [ mainControls, setMainControls ] = useState<React.ReactNode>(null);
        // Inicialización de estado para almacenar el elemento JSX
        const [ element, setElement ] = useState<HTMLDivElement | null>(null);

        return (
            <MainControlsContext.Provider value={{ mainControls, setMainControls, element, setElement }}>
                {children}
            </MainControlsContext.Provider>
        );
    },

    Portal: ({
        children,
    }: IACele.Common.SupportsChildren) => {

        // Obtención de función para establecer el estado del componente
        const { element } = useContext(MainControlsContext);

        // Si no existe elemento para renderizar no se renderiza nada
        if ( element === null ) return;

        // Creación de portal
        return createPortal(
            children,
            element as HTMLDivElement,
        );
    },

    Render: () => {

        // Obtención de función de cambio de estado para establecer elemento HTML en controles principales
        const { setElement: setMainControlsElement } = useContext(MainControlsContext);

        // Inicialización de referencia de controles principales
        const mainControlsRef = useRef<HTMLDivElement>(null);

        // Efecto para establecer la referencia de controles principales como elemento HTML
        useEffect(
            () => {
                setMainControlsElement(mainControlsRef.current);
            }, [setMainControlsElement]
        );

        return (
            <div id="navbar-main-controls" ref={mainControlsRef}/>
        );
    },

} as const;

export default NavbarMainControls;

interface MainControlsContextParams {
    mainControls: React.ReactNode;
    setMainControls: React.Dispatch<React.SetStateAction<React.ReactNode>>;
    element: HTMLDivElement | null,
    setElement: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
};

const MainControlsContext = createContext<MainControlsContextParams>({
    mainControls: null,
    setMainControls: VOID_CALLBACK.SYNC,
    element: null,
    setElement: VOID_CALLBACK.SYNC,
});
