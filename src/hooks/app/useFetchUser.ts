import { useCallback, useContext, useEffect } from "react"
import APIContext from "../../contexts/app/apiContext"
import useUserToken from "./useUserToken";
import useWebsocketNotification from "./useWebsocketNotification";

const useFetchUser = (): void => {

    // Obtención de la instancia de conexión a la API desde el contexto
    const { api } = useContext(APIContext);
    // Obtención de 
    const { userToken } = useUserToken();

    // Función para actualización de los datos del usuario de la sesión
    const updateUserData = useCallback(
        async () => {
            await api.me()
        }, [api]
    );

    // Registro de la función
    useWebsocketNotification('profile.update', updateUserData);

    // Función para obtención de los datos del usuario
    const fetchUser = useCallback(
        async () => {
            await api.me()
        }, [api]
    );

    useEffect(
        () => {
            // Si no existe token, no se intenta la obtención de datos
            if ( userToken === null ) return;
            // Obtención de datos del usuario de la sesión
            fetchUser();
        }, [fetchUser, userToken]
    );
};

export default useFetchUser;
