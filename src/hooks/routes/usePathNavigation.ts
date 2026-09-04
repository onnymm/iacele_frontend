import { useCallback } from "react";
import { useNavigate } from "react-router";

interface Path {
    'view': {
        'name': string;
    };
};

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
            .map( (k) => (`${k}=${params[k]}`) )
            .join('&')
        );

        return `/${pathname}?${queryParamsURLFragment}`;
    };

    return pathname;
};

const usePathNavigation = () => {

    // Obtención de función para navegación
    const navigateTo = useNavigate();

    // Función para navegar
    const toPath = useCallback(
        <P extends keyof Path>(
            path: P,
            params: Path[P],
        ) => {

            // Construcción de URL
            const url = buildPath(path, params);

            // Navegación a la página
            navigateTo(url);
        }, [navigateTo]
    );

    return { toPath };
};

export default usePathNavigation;
