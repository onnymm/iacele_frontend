import { useCallback, useEffect, useState } from "react";
import useAPI from "./useAPI";
import type { AxiosError } from "axios";

const useLogin = () => {

    // Obtención de la instancia de conexión a la API
    const { api, appLoading } = useAPI();
    // Inicialización de estados
    const [ user, setUser ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ authenticationError, setAuthenticationError ] = useState<boolean>(false);
    const [ errorDetail, setErrorDetail ] = useState<string | undefined>(undefined);
    const [ loading, setLoading ] = useState<boolean>(false);

    // Función que se ejecuta tras haber un error
    const onError = useCallback(
        (e: AxiosError<{detail: string}>) => {
            // Se establece el error de autenticación en verdadero
            setAuthenticationError(true);
            setErrorDetail(e.response?.data.detail)
        }, []
    );

    // Tras un error, cualquier cambio en los datos ejecutará...
    useEffect(
        () => {
            // Remoción del indicador de error
            setAuthenticationError(false);
            // Remoción del detalle de error
            setErrorDetail(undefined);
        }, [user, password]
    );

    useEffect(
        () => {
            // Si el estado de carga cambia a falso...
            if ( !appLoading ) {
                // Se establece a falso el estado de carga del botón
                setLoading(false);
            };
        }, [appLoading]
    );

    // Función para inicio de sesión
    const login = useCallback(
        (e: React.SubmitEvent) => {
            // Prevención de comportamiento predeterminado
            e.preventDefault();
            // Se establece estado de carga
            setLoading(true);
            // Intento de inicio de sesión
            api.login(user, password, onError);
        }, [api, user, password, onError]
    );

    return { user, setUser, password, setPassword, login, authenticationError, loading, errorDetail };
};

export default useLogin;
