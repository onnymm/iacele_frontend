import APIContext from "@/contexts/app/apiContext"
import { useContext, useEffect } from "react"

const useWebsocketNotification = (
    eventName: IACele.API.Websocket.MessageName,
    callback: ( () => (void) ),
) => {

    // Obtención de la función de ejecución de funciones tras mensajes de websocket
    const { eventClient } = useContext(APIContext);

    // Registro de la función
    useEffect(
        () => {
            // Si el valor del estado es nulo...
            if ( eventClient === null ) {
                // Se retorna una función vacía
                return ( () => {} );
            };

            // Obtención de la función de desuscripción tras la suscripción de la función
            const unsuscribeCallback = eventClient.on(eventName, callback);

            return unsuscribeCallback;
        }, [callback, eventClient, eventName]
    );
};

export default useWebsocketNotification;
