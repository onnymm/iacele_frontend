import MainControlsContext from "@/contexts/ui/mainControlsContext";
import { useContext } from "react";
import { createPortal } from "react-dom";

const MainControls: React.FC<IACele.Common.SupportsChildren> = ({
    children,
}) => {

    // Obtención de función para establecer el estado del componente
    const { element } = useContext(MainControlsContext);

    // Si no existe elemento para renderizar no se renderiza nada
    if ( element === null ) return;

    // Creación de portal
    return createPortal(
        children,
        element as HTMLDivElement,
    );
};

export default MainControls;
