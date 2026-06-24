import { useCallback, useState } from "react";

const useReload = () => {

    // Inicialización de estado de carga
    const [ reloadSignal, setReloadSignal ] = useState<boolean>(false);

    // Función para ejecutar una recarga de datos
    const reload = useCallback(
        () => {
            // Se cambia el estado
            setReloadSignal( (prev) => (!prev) );
        }, []
    );

    return { reloadSignal, reload };
};

export default useReload;
