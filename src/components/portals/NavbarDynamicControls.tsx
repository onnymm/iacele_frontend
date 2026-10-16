import VOID_CALLBACK from "@/constants/app/callbacks";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const NavbarDynamicControls = {

    Provider: ({
        children,
    }: IACele.Common.SupportsChildren) => {

        // Inicialización de estado de componente
        const [ dynamicControls, setDynamicControls ] = useState<React.ReactNode>(null);
        // Inicialización de estado para almacenar el elemento JSX
        const [ element, setElement ] = useState<HTMLDivElement | null>(null);

        return (
            <DynamicControlsContext.Provider value={{ dynamicControls, setDynamicControls, element, setElement }}>
                {children}
            </DynamicControlsContext.Provider>
        );
    },

    Portal: ({
        children,
    }: IACele.Common.SupportsChildren) => {

        // Obtención de función para establecer el estado del componente
        const { element } = useContext(DynamicControlsContext);

        // Si no existe elemento para renderizar no se renderiza nada
        if ( element === null ) return;

        // Creación de portal
        return createPortal(
            children,
            element,
        );
    },

    Render: () => {

        // Obtención de función de cambio de estado para establecer elemento HTML en controles dinámicos
        const { setElement: setDynamicControlsElement } = useContext(DynamicControlsContext);

        // Inicialización de referencia de controles dinámicos
        const dynamicControlsRef = useRef<HTMLDivElement>(null);

        // Efecto para establecer la referencia de controles dinámicos como elemento HTML
        useEffect(
            () => {
                setDynamicControlsElement(dynamicControlsRef.current);
            }, [setDynamicControlsElement]
        );

        return (
            <div id="navbar-dynamic-controls" ref={dynamicControlsRef}/>
        );
    },

} as const;

export default NavbarDynamicControls;

interface DynamicControlsContextParams {
    dynamicControls: React.ReactNode;
    setDynamicControls: React.Dispatch<React.SetStateAction<React.ReactNode>>;
    element: HTMLDivElement | null;
    setElement: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
};

const DynamicControlsContext = createContext<DynamicControlsContextParams>({
    dynamicControls: null,
    setDynamicControls: VOID_CALLBACK.SYNC,
    element: null,
    setElement: VOID_CALLBACK.SYNC,
});
