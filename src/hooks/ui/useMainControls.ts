import MainControlsContext from "@/contexts/ui/mainControlsContext";
import { useContext, useEffect } from "react";
import { createPortal } from "react-dom";

const useMainControls = (children: React.ReactNode) => {

    // Obtención de función para establecer el estado del componente
    const { element } = useContext(MainControlsContext);

    useEffect(
        () => {
            console.log(children, 'element');
            
            if ( element === null ) return;
            console.log('Se creó el portal');
            
            createPortal(
                children,
                element as HTMLDivElement,
            );
        }, [children, element]
    );

};

export default useMainControls;
