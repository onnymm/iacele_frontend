import { useCallback } from "react";

const useLocalValue = (name: string) => {

    // Inicialización de función para guardar el valor en el almacenamiento local
    const saveValue = useCallback(
        (value: string) => {

            // Se guarda el valor en el almacenamiento local
            localStorage.setItem(name, value);
        }, [name]
    );

    // Inicialización de función para cargar el valor desde el almacenamiento local
    const loadValue = useCallback(
        (): string | null => {

            // Obtención del valor desde el almacenamiento local
            const value = localStorage.getItem(name);

            return value as (string | null);
        }, [name]
    );

    // Inicialización de función para remover el valor en el almacenamiento local
    const removeValue = useCallback(
        () => {

            // Se remueve el valor guardado en el almacenamiento local
            localStorage.removeItem(name);
        }, [name]
    );

    return [ saveValue, loadValue, removeValue ] as const;
};

export default useLocalValue;
