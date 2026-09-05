import DynamicControlsContext from "@/contexts/ui/dynamicControlsContext";
import { useContext } from "react";
import { createPortal } from "react-dom";

const DynamicControls = ({
    children,
}: IACele.Common.SupportsChildren) => {

    // Obtención de función para establecer el estado del componente
    const { element } = useContext(DynamicControlsContext);

    // Si no existe elemento para renderizar no se renderiza nada
    if ( element === null ) return;

    // Creación de portal
    return createPortal(
        children,
        element,
    );
};

export default DynamicControls;
