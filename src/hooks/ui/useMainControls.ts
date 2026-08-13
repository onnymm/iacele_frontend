import MainControlsContext from "@/contexts/ui/mainControlsContext";
import { useContext, useEffect } from "react";
import { createPortal } from "react-dom";

const useMainControls = (children: React.ReactNode) => {

    // Obtención de función para establecer el estado del componente
    const { element } = useContext(MainControlsContext);

    useEffect(
        () => {

            // SI no hay elemento para renderizar se termina la ejecución
            if ( element === null ) return;

            // Creación del portal
            createPortal(
                children,
                element as HTMLDivElement,
            );
        }, [children, element]
    );
};

export default useMainControls;
