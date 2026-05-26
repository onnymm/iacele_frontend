import { useMemo, useState } from "react";
import useUserToken from "./useUserToken";
import UserSession from "../../resources/userSession";
import Client from "../../api/client";

const useAPI = () => {

    // Obtención de la función de establecer valor de token
    const { setUserToken } = useUserToken();
    // Inicialización de estado de carga de la aplicación
    const [ appLoading, setAppLoading ] = useState<boolean>(false);
    // Inicialización de instancia de conexión a la API
    const api = useMemo(
        () => {
            // Inicialización de objeto de sesión de usuario
            const userSession = new UserSession(setUserToken, setAppLoading);
            // Inicialización de objeto de cliente
            return new Client(userSession)
        }, [setUserToken]
    );

    return { api, appLoading };
};

export default useAPI;
