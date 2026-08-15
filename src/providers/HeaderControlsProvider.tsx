import HeaderControlsContext from "@/contexts/ui/headerControlsContext";
import { useState } from "react";

const HeaderControlsProvider: React.FC<IACele.Common.SupportsChildren> = ({
    children,
}) => {

    // Inicialización de estado de referencia para uso de portal
    const [ portalRef, setPortalRef ] = useState<HTMLDivElement | null>(null);

    return (
        <HeaderControlsContext.Provider value={{ portalRef, setPortalRef }}>
            {children}
        </HeaderControlsContext.Provider>
    );
};

export default HeaderControlsProvider;
