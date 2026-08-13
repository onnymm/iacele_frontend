import { useCallback, useState } from "react";

const EMPTY_DETAIL = {
    icon: null,
    variant: undefined,
    message: undefined,
    display: false,
} as const;

const useAlert = <O extends string>(options: IACele.UI.Alert.Options<O>) => {

    // Inicialización de estado de detalle del componente
    const [ detail, setDetail ] = useState<IACele.UI.Alert.Detail | IACele.UI.Alert.EmptyDetail>(EMPTY_DETAIL);

    // Función para establecer algún estado de las opciones
    const setAlertDetail = useCallback(
        (
            option: O,
            message: string,
        ) => {

            // Obtención de los atributos
            const attributes = options[option];
            // Se establece el estado
            setDetail({
                icon: attributes.icon,
                message: message,
                variant: attributes.variant,
                display: true,
            });
        }, [options]
    );

    // Función para establecer el estado a nulo
    const resetDetail = useCallback(
        () => {
            setDetail(EMPTY_DETAIL);
        }, []
    );

    return { detail, setAlertDetail, resetDetail };
};

export default useAlert;
