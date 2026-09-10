import EventClient from "@/api/eventClient";
import { useEffect, useState } from "react";
import useUserToken from "../app/useUserToken";
import showToast from "@/components/ui/toast/toast";
import { Unplug } from "lucide-react";

const clientConfig: IACele.API.Websocket.EventClientConfig = {
    onopen: () => {showToast({title: 'Websocket', content: 'La conexión ha sido establecida.', type: 'success', icon: Unplug})},
    onclose: () => {showToast({title: 'Websocket', content: 'La conexión ha sido cerrada.', type: 'danger', icon: Unplug})},
    defaultNotification: (payload) => {showToast({content: JSON.stringify(payload)})}
};

const useEventClient = () => {

    // Inicialización de estado de cliente de eventos
    const [ eventClient, setEventClient ] = useState<EventClient | null>(null);
    // Inicialización de estado de websocket conectado
    const [ websocketConnected, setWebsocketConnected ] = useState<boolean>(false);
    // Obtención de la función de establecer valor de token
    const { userToken } = useUserToken();

    useEffect(
        () => {
            // Si no existe token de usuario...
            if ( !userToken ) {
                // Se establece el estado en nulo
                setEventClient(
                    (prev) => {
                        // Se cierra la conexión del websocket
                        prev?.close();
                        return (null);
                    }
                );
                // Se termina la ejecución
                return;
            };

            // Inicialización de conexión a websocket
            const client = new EventClient(userToken, setWebsocketConnected, clientConfig);
            // Se establece el estado
            setEventClient(client);
        }, [userToken]
    );

    return { eventClient, websocketConnected };
};

export default useEventClient;
