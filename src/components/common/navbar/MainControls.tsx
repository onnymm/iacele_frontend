import MainControlsContext from "@/contexts/ui/mainControlsContext";
import { useContext } from "react";
import { createPortal } from "react-dom";

const MainControls: React.FC<IACeleV2.Common.SupportsChildren> = ({
    children,
}) => {

    // Obtención de función para establecer el estado del componente
    const { element } = useContext(MainControlsContext);


    if ( element === null ) return;
    
    return createPortal(
        children,
        element as HTMLDivElement,
    );
};

export default MainControls;
