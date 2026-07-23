import HeaderControlsContext from "@/contexts/ui/headerControlsContext";
import { useContext, useEffect, useRef } from "react";

const HeaderControlsBearer = () => {

    // Obtención de estado de controles de encabezasdo y función para establecer referencia
    const { headerControls, setPortalRef } = useContext(HeaderControlsContext);
    // Inicialización de referencia de controles de encabezado
    const headerControlsRef = useRef<HTMLDivElement>(null);

    // Efecto para establecer la referencia para uso en portal
    useEffect(
        () => {
            setPortalRef(headerControlsRef.current);
        }, [setPortalRef]
    );

    return (
        <div className="flex flex-wrap gap-2 mx-2 mt-2 w-full" ref={headerControlsRef}>
            {headerControls}
        </div>
    );
};

export default HeaderControlsBearer;
