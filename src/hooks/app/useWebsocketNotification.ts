import APIContext from "@/contexts/app/apiContext"
import { useContext, useEffect } from "react"

const useWebsocketNotification = (
    name: IACele.API.Websocket.MessageName,
    callback: ( () => (void) ),
) => {

    // Obtención de la función de ejecución de funciones tras mensajes de websocket
    const { onWebsocketMessage } = useContext(APIContext);

    // Registro de la función
    useEffect(
        () => {
            const stopListening = onWebsocketMessage(name, callback);
            return (
                () => {stopListening();}
            );
        }, [callback, name, onWebsocketMessage]
    );
};

export default useWebsocketNotification;
