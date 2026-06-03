import { useCallback, useState } from "react";

const useFocus = () => {

    // Inicialización de estado de enfocado
    const [ isFocused, setIsFocused ] = useState<boolean>(false);

    // Función para encender el enfoque
    const setFocusOn = useCallback(
        () => {
            setIsFocused(true);
        }, []
    );

    // Función para apagar el enfoque
    const setFocusOff = useCallback(
        () => {
            setIsFocused(false);
        }, []
    );

    return { isFocused, setFocusOn, setFocusOff };
};

export default useFocus;
