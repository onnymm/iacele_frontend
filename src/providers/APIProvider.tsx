import useUserToken from "@/hooks/app/useUserToken";
import APIContext from "../contexts/app/apiContext";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import UserDataContext from "@/contexts/app/userDataContext";
import UserSession from "@/resources/userSession";
import Client from "@/api/client";
import SyncClient from "@/api/syncClient";

const APIProvider: React.FC<IACele.Common.SupportsChildren> = ({
    children,
}) => {

    // Obtención de la función de establecer valor de token
    const { userToken, setUserToken, removeUserToken } = useUserToken();
    // Inicialización de estado de carga de la aplicación
    const [ appLoading, setAppLoading ] = useState<boolean>(false);
    // Obtención de funciones para actualizar los datos del usuario
    const { setUserData, removeUserData } = useContext(UserDataContext);
    // Inicialización de estado de conexión a websocket
    const [websocket, setWebsocket] = useState<SyncClient | null>(null);
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

    // Inicialización de función de ejecución tras mensaje de websocket
    const onWebsocketMessage = useCallback(
        (
            name: IACele.API.Websocket.MessageName,
            callback: () => (void),
        ) => {

            // Si el valor del estado es nulo...
            if ( websocket === null ) {
                // Se retorna una función vacía
                return ( () => {} );
            };

            // Obtención de la función de desuscripción tras la suscripción de la función
            const stopListening = websocket.onNotify(name, callback);

            return stopListening;
        }, [websocket]
    );

    useEffect(
        () => {
            if (!userToken) {
                setWebsocket(null);
                return;
            };

            // Inicialización de conexión a websocket
            const sc = new SyncClient(userToken);
            // Se establece el estado
            setWebsocket(sc);

            // Retorno para desconectar el websocket cuando el componente se desmonte
            return (
                () => {sc.close()}
            );
        }, [userToken]
    );

    return (
        <APIContext.Provider value={{ api, appLoading, websocket: websocket, onWebsocketMessage }}>
            {children}
        </APIContext.Provider>
    );
};

export default APIProvider;
