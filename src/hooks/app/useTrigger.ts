import { useCallback, useState } from "react"

const useTrigger = () => {

    // Inicialización de estado para usarse como señal
    const [ signal, setSignal ] = useState<boolean>(false);

    // Inicialización de función para enviar cambio de señal
    const trigger = useCallback(
        () => {
            // Cambio de estado
            setSignal( (prev) => (!prev) );
        }, []
    );

    return [ signal, trigger ] as const;
};

export default useTrigger;
