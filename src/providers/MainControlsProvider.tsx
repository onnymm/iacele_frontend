import MainControlsContext from "@/contexts/ui/mainControlsContext";
import { useState } from "react";

const MainControlsProvider: React.FC<IACele.Common.SupportsChildren> = ({
    children,
}) => {

    // Inicialización de estado de componente
    const [ mainControls, setMainControls ] = useState<React.ReactNode>(null);

    const [ element, setElement ] = useState<HTMLDivElement | null>(null);

    return (
        <MainControlsContext.Provider value={{ mainControls, setMainControls, element, setElement }}>
            {children}
        </MainControlsContext.Provider>
    );
};

export default MainControlsProvider;
