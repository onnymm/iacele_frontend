import DynamicControlsContext from "@/contexts/ui/dynamicControlsContext";
import { useState } from "react";

const DynamicControlsProvider = ({
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
};

export default DynamicControlsProvider;
