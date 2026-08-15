import HeaderControlsContext from "@/contexts/ui/headerControlsContext";
import { useCallback, useContext } from "react";
import { createPortal } from "react-dom";

const useAppHeaderControls = () => {

    // Obtención de función para renderizar los controles
    const { portalRef } = useContext(HeaderControlsContext);

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

            return (null);
        }, [portalRef]
    );

    return { renderHeaderControls };
};

export default useAppHeaderControls;
