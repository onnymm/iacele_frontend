import useUserToken from "@/hooks/app/useUserToken";
import APIContext from "../contexts/app/apiContext";
import { useContext, useMemo, useState } from "react";
import UserDataContext from "@/contexts/app/userDataContext";
import UserSession from "@/resources/userSession";
import Client from "@/api/client";

const APIProvider: React.FC<IACele.Common.SupportsChildren> = ({
    children,
}) => {

    // Obtención de la función de establecer valor de token
    const { setUserToken, removeUserToken } = useUserToken();
    // Inicialización de estado de carga de la aplicación
    const [ appLoading, setAppLoading ] = useState<boolean>(false);
    // Obtención de funciones para actualizar los datos del usuario
    const { setUserData, removeUserData } = useContext(UserDataContext);
    // Inicialización de instancia de conexión a la API
    const api = useMemo(
        () => {
            // Inicialización de objeto de sesión de usuario
            const userSession = new UserSession(
                setUserToken,
                removeUserToken,
                setAppLoading,
                setUserData,
                removeUserData,
        );
            // Inicialización de objeto de cliente
            return new Client(userSession)
        }, [setUserToken, removeUserToken, setUserData, removeUserData]
    );

    return (
        <APIContext.Provider value={{ api, appLoading }}>
            {children}
        </APIContext.Provider>
    );
};

export default APIProvider;
