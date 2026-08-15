import HeaderControlsContext from "@/contexts/ui/headerControlsContext";
import { useContext, useEffect, useRef } from "react";

const HeaderControlsBearer = () => {

    // Obtención de estado de controles de encabezasdo y función para establecer referencia
    const { setPortalRef, portalRef } = useContext(HeaderControlsContext);
    // Inicialización de referencia de controles de encabezado
    const headerControlsRef = useRef<HTMLDivElement>(null);

    // Efecto para establecer la referencia para uso en portal
    useEffect(
        () => {
            setPortalRef(headerControlsRef.current);
        }, [setPortalRef]
    );

    return (
        <div className={`${!portalRef ? 'hidden' : ''} flex flex-wrap gap-2 mx-2 w-fit`} ref={headerControlsRef} />
    );
};

export default HeaderControlsBearer;
