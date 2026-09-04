import PATH from "@/constants/api/path";
import BACKEND_URL from "@/constants/app/backendURL";
import VOID_CALLBACK from "@/constants/app/callbacks";
import QUERY_PARAMS from "@/constants/routes/queryParams";
import CONFIG from "@/settings/config";

class EventClient {
    private userToken: string;
    private setWebsocketConnected: React.Dispatch<React.SetStateAction<boolean>>;
    private ws: WebSocket;
    private hub: Record<string, Record<number, () => (void)>>;
    private config: IACele.API.Websocket.EventClientConfig;
    private mustReconnect: boolean = true;
    private reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
    private DEFAULT_CONFIG: IACele.API.Websocket.EventClientConfig = {
        onopen: VOID_CALLBACK.SYNC,
        onclose: VOID_CALLBACK.SYNC,
        defaultNotification: (payload) => {
            console.log(payload);
        },
    };

    constructor (
        userToken: string,
        setWebsocketConnected: React.Dispatch<React.SetStateAction<boolean>>,
        config: Partial<IACele.API.Websocket.EventClientConfig> = {},
    ) {

        // Asignación del token de usuario
        this.userToken = userToken
        // Asignación de función de cambio de estado
        this.setWebsocketConnected = setWebsocketConnected;
        // Inicialización del objeto de centro de funciones a ejecutar en los mensajes de websocket
        this.hub = {};
        // Inicialización del objeto de configuración
        this.config = { ...this.DEFAULT_CONFIG, ...config};
        // Inicialización del websocket
        this.ws = this.initializeWebsocket();
    };

    close = () => {

        // Se indica que el websocket no debe intentar reconectarse
        this.mustReconnect = false;
        // Se detiene temporizador de reconexión si es que existe
        this.stopReconnectionSchedule();
        // Se cierra la conexión con el websocket
        this.ws.close();
    };

    pause = () => {

        // Se establece que el websocket no debe reconectarse
        this.mustReconnect = false;
        // Se detiene temporizador de reconexión si es que existe
        this.stopReconnectionSchedule();

        // Inicialización de indicador de websocket
        const websocketIsOpenOrConnecting = (
            this.ws.readyState === WebSocket.OPEN
            || this.ws.readyState === WebSocket.CONNECTING
        );

        // Si el websocket no está activo ni conectándose...
        if ( websocketIsOpenOrConnecting ) {
            // Se cierra el websocket
            this.ws.close();
        };
    };

    resume = () => {

        // Se establece que el websocket debe reconectarse
        this.mustReconnect = true;

        // Inicialización de indicador de websocket
        const webSocketIsClosingOrClosing = (
            this.ws.readyState === WebSocket.CLOSED
            || this.ws.readyState === WebSocket.CLOSING
        );

        // Si el websocket está cerrado o cerrándose...
        if ( webSocketIsClosingOrClosing ) {
            // Inicialización del websocket
            this.ws = this.initializeWebsocket();
        };
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
        const indexes = Object.keys(messageCallbacks).map( (k) => (Number(k)) );
        // Obtención del índice mayor
        const max = Math.max(...indexes);
        // Índice a usar
        const index = max + 1;
        // Registro de la función
        messageCallbacks[index] = callback;
        // Creación de función de desuscripción
        const unsuscribeCallback = () => {
            delete messageCallbacks[index];
        };

        return unsuscribeCallback;
    };

    private scheduleReconnect = () => {

        // Si el websocket no debería seguir activo...
        if ( !this.mustReconnect ) {
            // Se termina la ejecución
            return;
        };

        // Si existe un temporizador de reconexión activo...
        if ( this.reconnectTimeout !== null ) {
            // Se termina la ejecución
            return;
        };

        // Función para crear una nueva conexión
        const createConnection = () => {
            // Se restablece el temporizador de reconexión
            this.reconnectTimeout = null;

            // Si el websocket debería seguir activo
            if ( this.mustReconnect ) {
                // Inicialización del websocket
                this.ws = this.initializeWebsocket();
            };
        };

        // Se reprograma conexión
        this.reconnectTimeout = setTimeout(createConnection, CONFIG.NETWORK.WEBSOCKET.RECONNECTION_ATTEMPT_MS);
    };

    private stopReconnectionSchedule = () => {

        // Si existe un temporizador de reconexión activo...
        if ( this.reconnectTimeout !== null ) {
            // Se detiene éste
            clearTimeout(this.reconnectTimeout);
            // Se borra éste
            this.reconnectTimeout = null;
        };
    };

    private initializeWebsocket = () => {

        // Construcción de la URL para conexión del websocket
        const URL = `${BACKEND_URL}${PATH.WEBSOCKET}/?${QUERY_PARAMS.WEBSOCKET.TOKEN}=${this.userToken}`
        // Inicialización del websocket
        const ws = new WebSocket(URL);

        // Función que se ejecuta cuando el websocket se conecta
        ws.onopen = () => {
            this.setWebsocketConnected(true);
            this.config.onopen();
        };
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
        ws.onclose = () => {
            // Ejecución de función cuando el websocket se desconecta
            this.config.onclose();
            // Se indica que el websocket se desconectó
            this.setWebsocketConnected(false);
            // Se reprograma intento de reconexión
            this.scheduleReconnect();
        };

        return ws;
    };
};

export default EventClient;
