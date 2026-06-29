import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router";

const buildPath = (
    pathname: string,
    params: Record<string, any> = {},
) => {

    // Obtención de los nombres de los parámetros de query
    const queryParamNames = Object.keys(params) as (keyof typeof params)[];

    // Si existen resultados...
    if ( queryParamNames.length ) {
        // Se construye el fragmento de URL de parámetros
        const queryParamsURLFragment = (
            queryParamNames
            .map(
                (k) => (`${k}=${params[k]}`)
            ).join('&')
        );

        return `${pathname}?${queryParamsURLFragment}`;
    };

    return pathname;
};

const useUpdateQueryParams = () => {

    // Obtención de ruta
    const location = useLocation();
    // Obtención de función de redireccionamiento
    const navigateTo = useNavigate();

    // Función para actualizar los parámetros de la página
    const updateQueryParams = useCallback(
        (params: Record<string, any> = {}) => {
            // Construcción de URL con parámetros
            const url = buildPath(location.pathname, params);
            // Se navega hacia ésta
            navigateTo(url);
        }, [location.pathname, navigateTo]
    );

    return { updateQueryParams };
};

export default useUpdateQueryParams;
