import PATH from "@/constants/api/path";
import BACKEND_URL from "@/constants/app/backendURL";
import QUERY_PARAMS from "@/constants/routes/queryParams";

class EventClient {
    private ws: WebSocket;
    private hub: Record<string, Record<number, () => (void)>>;

    constructor (
        userToken: string,
    ) {

        // Inicialización del objeto de centro de funciones a ejecutar en los mensajes de websocket
        this.hub = {};
        // Inicialización del websocket
        this.ws = this.initializeWebsocket(userToken);
    };

    close = () => {
        // Se cierra la conexión con el websocket
        this.ws.close();
    };

    on = (
        messageName: string,
        callback: () => (void),
    ) => {

        // Obtención de los mensajes observados
        const messages = Object.keys(this.hub);
        // Búsqueda del mensaje a usar
        const found = messages.find( (k) => (k === messageName) );
        // Si el mensaje no fue encontrado...
        if ( !found ) {
            // Se inicializa un objeto en el índice del nombre
            this.hub[messageName] = {};
        };

        // Obtención del objeto de funciones del mensaje observado
        const messageCallbacks = this.hub[messageName];

        // Obtención de los índices del objeto
        const indexes = Object.keys(messageCallbacks).map((k) => (Number(k)));
        // Obtención del índice mayor
        const max = Math.max(...indexes);
        // Índice a usar
        const index = max + 1;
        // Registro de la funci+on
        messageCallbacks[index] = callback;
        // Creación de función de desuscripción
        const unsuscribeCallback = () => {delete messageCallbacks[index]};

        return unsuscribeCallback;
    };

    private initializeWebsocket = (
        userToken: string,
    ) => {

        // Construcción de la URL para conexión del websocket
        const URL = `${BACKEND_URL}${PATH.WEBSOCKET}/?${QUERY_PARAMS.WEBSOCKET.TOKEN}=${userToken}`
        // Inicialización del websocket
        const ws = new WebSocket(URL);

        // Función que se ejecuta cuando el websocket se conecta
        ws.onopen = () => {
            console.log('Websocket conectado');
        };
        // Función para cuando el websocket recibe un mensaje
        ws.onmessage = (event: MessageEvent<string>) => {
            // Obtención de los datos en formato JSON
            const payload: IACele.API.Websocket.MessagePayload = JSON.parse(event.data);

            try {
                // Obtención del objeto de funciones del mensaje
                const messageCallbacks = this.hub[payload.event];
                // Obtención de los índices del objeto
                const indexes = Object.keys(messageCallbacks);
                // Iteración por cada índice
                indexes.forEach(
                    (k) => {
                        // Obtención de la función a ejecutar
                        const callback = messageCallbacks[Number(k)];
                        // Ejecución de la función registrada
                        callback();
                    }
                );

            } catch {
                // No hacer nada
            };
        };

        // Función que se ejecuta cuando el websocket se desconecta
        ws.onclose = () => {
            console.log('Websocket desconectado');
        };

        return ws;
    };
};

export default EventClient;
