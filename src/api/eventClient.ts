import PATH from "@/constants/api/path";
import BACKEND_URL from "@/constants/app/backendURL";
import QUERY_PARAMS from "@/constants/routes/queryParams";

const DEFAULT_CONFIG: IACele.API.Websocket.EventClientConfig = {
    onopen: () => {
        console.log('Websocket conectado');
    },
    onclose: () => {
        console.log('Websocket desconectado');
    },
    defaultNotification: (
        payload
    ) => {
        console.log(payload);
    },
};

class EventClient {
    private ws: WebSocket;
    private hub: Record<string, Record<number, () => (void)>>;
    private config: IACele.API.Websocket.EventClientConfig;

    constructor (
        userToken: string,
        config: Partial<IACele.API.Websocket.EventClientConfig> = {},
    ) {

        // Inicialización del objeto de centro de funciones a ejecutar en los mensajes de websocket
        this.hub = {};
        // Inicialización del objeto de configuración
        this.config = { ...DEFAULT_CONFIG, ...config};
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
        ws.onopen = this.config.onopen;
        // Función para cuando el websocket recibe un mensaje
        ws.onmessage = (event: MessageEvent<string>) => {
            // Obtención de los datos en formato JSON
            const message: IACele.API.Websocket.message = JSON.parse(event.data);

            // Se intenta ejecutar funciones suscritas
            try {
                // Obtención del objeto de funciones del mensaje
                const messageCallbacks = this.hub[message.event];
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

            // Si no hay funciones suscritas al evento...
            } catch {
                // Se usa la función predeterminada para mostrar el evento
                this.config.defaultNotification(message.event, message.payload);
            };
        };

        // Función que se ejecuta cuando el websocket se desconecta
        ws.onclose = this.config.onclose;

        return ws;
    };
};

export default EventClient;
