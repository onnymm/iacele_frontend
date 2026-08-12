import HeaderControlsContext from "@/contexts/ui/headerControlsContext";
import RenderHeaderControlsContext from "@/contexts/ui/renderHeaderControlsContext";
import { useCallback, useState } from "react";
import { createPortal } from "react-dom";

const HeaderControlsProvider: React.FC<IACele.Common.SupportsChildren> = ({
    children,
}) => {

    // Inicialización de elemento de controles de encabezado
    const [ headerControls, setHeaderControls ] = useState<React.ReactNode>(null);
    // Inicialización de estado de referencia para uso de portal
    const [ portalRef, setPortalRef ] = useState<HTMLDivElement | null>(null);

    // Inicialización de función para renderizar controles de encabezado
    const renderHeaderControls = useCallback(
        (element: React.ReactNode) => {
            // Si existe una referencia para usarse como portal...
            if ( portalRef ) {
                // Se crea el portal
                return createPortal(
                    element,
                    portalRef,
                );
            };

            return null;
        }, [portalRef]
    );

    return (
        <HeaderControlsContext.Provider value={{ headerControls, setHeaderControls, portalRef, setPortalRef }}>
            <RenderHeaderControlsContext.Provider value={{ renderHeaderControls }}>
                {children}
            </RenderHeaderControlsContext.Provider>
        </HeaderControlsContext.Provider>
    );
};

export default HeaderControlsProvider;
