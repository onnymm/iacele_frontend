import { useCallback, useContext, useEffect } from "react"
import APIContext from "../../contexts/app/apiContext"
import useUserToken from "./useUserToken";

const useFetchUser = (): void => {

    // Obtención de la instancia de conexión a la API desde el contexto
    const { api } = useContext(APIContext);
    // Obtención de 
    const { userToken } = useUserToken();

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
