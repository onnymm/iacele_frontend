import { useCallback } from "react";

const useLocalValue = <T, R extends string>(
    name: string,
    process: (v: R | null) => (T),
) => {

    // Inicialización de función para cargar el valor desde el almacenamiento local
    const loadValue = useCallback(
        () => {

            // Obtención del valor desde el almacenamiento local
            const value = localStorage.getItem(name);

            return process(value as R);
        }, [name, process]
    );

    // Inicialización de función para guardar el valor en el almacenamiento local
    const saveValue = useCallback(
        (value: string) => {

            // Se guarda el valor en el almacenamiento local
            localStorage.setItem(name, value);
        }, [name]
    );

    // Inicialización de función para remover el valor en el almacenamiento local
    const removeValue = useCallback(
        () => {

            // Se remueve el valor guardado en el almacenamiento local
            localStorage.removeItem(name);
        }, [name]
    );

    return [ loadValue, saveValue, removeValue ] as const;
};

export default useLocalValue;
