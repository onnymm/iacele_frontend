import { useCallback, useEffect, useState } from "react";
import useAPI from "./useAPI";
import { useNavigate } from "react-router";
import useUserToken from "./useUserToken";
import useAlert from "../ui/useAlert";
import { ServerOff, ShieldAlert } from "lucide-react";

const useLogin = () => {

    // Definición de opciones de detalle
    const { detail, resetDetail, setAlertDetail } = useAlert<'password' | 'connection'>({
        'password': {
            icon: ShieldAlert,
            variant: 'danger',
        },
        'connection': {
            icon: ServerOff,
            variant: 'danger',
        },
    });

    // Obtención de valor de token desde el contexto
    const { userToken } = useUserToken();
    // Obtención de la instancia de conexión a la API
    const { api, appLoading } = useAPI();
    // Obtención de función de navegación}
    const navigateTo = useNavigate();
    // Inicialización de estados
    const [ user, setUser ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ authenticationError, setAuthenticationError ] = useState<boolean>(false);
    const [ loading, setLoading ] = useState<boolean>(false);

    // Función que se ejecuta tras haber un error
    const onError = useCallback(
        (e: {status?: number; detail?: string;}) => {
            if ( e.status === 408 ) {
                setAlertDetail('connection', 'No se puede conectar con el servidor.');
            } else {
                setAlertDetail('password', e.detail as string);
                setAuthenticationError(true);
            };
        }, [setAlertDetail]
    );

    // Tras un error, cualquier cambio en los datos ejecutará...
    useEffect(
        () => {
            // Remoción del indicador de error
            setAuthenticationError(false);
            resetDetail();
        }, [user, password, resetDetail]
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
        async (e: React.SubmitEvent) => {
            // Prevención de comportamiento predeterminado
            e.preventDefault();
            // Se establece estado de carga
            setLoading(true);
            // Intento de inicio de sesión
            await api.login(user, password, onError);
        }, [api, user, password, onError]
    );

    useEffect(
        () => {
            // Si es estableció un valor de token...
            if ( userToken ) {
                // Se navega hacia el inicio
                navigateTo('/');
            };
        }, [userToken, navigateTo]
    );

    return { user, setUser, password, setPassword, login, authenticationError, loading, detail };
};

export default useLogin;
