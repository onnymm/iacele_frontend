import EventClient from "@/api/eventClient";
import { useCallback, useState } from "react";
import useUserToken from "../app/useUserToken";
import showToast from "@/components/ui/toast/toast";
import { Unplug } from "lucide-react";
import useEventListener from "../ui/useEventListener";

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

    // Función para conectar el websocket
    const handlePageShow = useCallback(
        () => {
            // Si no existe token de usuario...
            if (!userToken) {
                // Se establece el estado en nulo
                setEventClient(null);
                // Se termina la ejecución
                return;
            };
            // Inicialización de conexión a websocket
            const client = new EventClient(userToken, setWebsocketConnected, clientConfig,);
            // Se establece el estado
            setEventClient(client);
        }, [userToken]
    );

    // Función para desconectar el websocket
    const handlePageHide = useCallback(
        () => {
            if ( eventClient === null ) return;
                // Se cierra la conexión del websocket
                eventClient.close();
        }, [eventClient]
    );

    // Se añaden las funciones en escuchadores de eventos
    useEventListener<'window'>(
        window,
        'pageshow',
        handlePageShow,
    );
    useEventListener<'window'>(
        window,
        'pagehide',
        handlePageHide,
    );

    return { eventClient, websocketConnected };
};

export default useEventClient;
