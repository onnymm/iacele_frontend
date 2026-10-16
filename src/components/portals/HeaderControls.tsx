import VOID_CALLBACK from "@/constants/app/callbacks";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface HeaderControlsContextParams {
    element: HTMLDivElement | null;
    setElement: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
    headerControls: React.ReactNode;
    setHeaderControls: React.Dispatch<React.SetStateAction<React.ReactNode>>;
};

const HeaderControlsContext = createContext<HeaderControlsContextParams>({
    element: null,
    setElement: VOID_CALLBACK.SYNC,
    headerControls: null,
    setHeaderControls: VOID_CALLBACK.SYNC,
});

const HeaderControls = {

    Provider: ({
        children,
    }: IACele.Common.SupportsChildren) => {

        // Inicialización de estado de componente
        const [ headerControls, setHeaderControls ] = useState<React.ReactNode>(null);
        // Inicialización de estado para almacenar el elemento JSX
        const [ element, setElement ] = useState<HTMLDivElement | null>(null);

        return (
            <HeaderControlsContext.Provider value={{ headerControls, setHeaderControls, element, setElement }}>
                {children}
            </HeaderControlsContext.Provider>
        );
    },

    Portal: ({
        children,
    }: IACele.Common.SupportsChildren) => {

        // Obtención de función para establecer el estado del componente
        const { element } = useContext(HeaderControlsContext);

        // Si no existe elemento para renderizar no se renderiza
        if ( element === null ) return;

        // Creación de portal
        return createPortal(
            children,
            element,
        );
    },

    Render: () => {

        // Obtención de función de cambio de estado para establecer elemento HTML en controles principales
        const { setElement: setHeaderControlsElement, element } = useContext(HeaderControlsContext);

        // Inicialización de referencia de controles principales
        const headerControlsRef = useRef<HTMLDivElement>(null);

        // Efecto para estabelecer la referencia de controles principales como elemento HTML
        useEffect(
            () => {
                setHeaderControlsElement(headerControlsRef.current);
            }, [setHeaderControlsElement]
        );

        return (
            <div className={`${!element ? 'hidden' : ''} flex flex-wrap gap-2 mx-2 w-fit`} ref={headerControlsRef} />
        );
    },

} as const;

export default HeaderControls;
