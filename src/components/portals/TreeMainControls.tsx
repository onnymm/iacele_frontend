import TreeMainControlsContext from "@/contexts/portals/treeMainControls";
import { useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const TreeMainControls = {

    Provider: ({
        children,
    }: IACele.Common.SupportsChildren) => {

        // Inicialización de estado de componente
        const [ treeMainControls, setTreeMainControls ] = useState<React.ReactNode>(null);
        // Incialización de estado para almacenar el elemento JSX
        const [ element, setElement ] = useState<HTMLDivElement | null>(null);

        return (
            <TreeMainControlsContext.Provider value={{
                treeMainControls,
                setTreeMainControls,
                element,
                setElement,
            }}>
                {children}
            </TreeMainControlsContext.Provider>
        );
    },

    Render: () => {

        // Inicialización de referencia de controles principales para árbol
        const treeMainControlsRef = useRef<HTMLDivElement>(null);
        // Obtención de función de cambio de estado para establecer elemento HTML en controles principales de árbol
        const { setElement: setTreeMainControlsElement } = useContext(TreeMainControlsContext);

        useEffect(
            () => {
                setTreeMainControlsElement(treeMainControlsRef.current);
            }, [setTreeMainControlsElement]
        );

        return (
            <div ref={treeMainControlsRef} />
        );
    },

    Portal: ({
        children,
    }: IACele.Common.SupportsChildren) => {

        // Obtención de función para establecer el estado del componente
        const { element } = useContext(TreeMainControlsContext);

        // Si no existe elemento para renderizar, no se renderiza nada
        if ( element === null ) {
            return;
        };

        // Creación del portal
        return createPortal(
            children,
            element,
        );
    },

} as const;

export default TreeMainControls;
