import EventClient from "@/api/eventClient";
import { useEffect, useState } from "react";
import useUserToken from "../app/useUserToken";

const useEventClient = () => {

    // Inicialización de estado de cliente de eventos
    const [eventClient, setEventClient] = useState<EventClient | null>(null);
    // Obtención de la función de establecer valor de token
    const { userToken } = useUserToken();

    // Efecto para la inicialización del cliente de eventos
    useEffect(
        () => {
            // Si no existe token de usuario...
            if (!userToken) {
                // Se establece el estado en nulo
                setEventClient(null);
                // Se termina la ejecución
                return;
            };

            // Inicialización de conexión a websocket
            const client = new EventClient(userToken);
            // Se establece el estado
            setEventClient(client);

            // Función para desconectar el websocket
            const disconnectWebsocket = () => {
                client.close();
            };

            // Retorno de la función para desconectar el websocket cuando el componente se desmonte
            return disconnectWebsocket;
        }, [userToken]
    );

    return { eventClient };
};

export default useEventClient;
