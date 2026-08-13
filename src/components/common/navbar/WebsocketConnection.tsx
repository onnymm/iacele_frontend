import APIContext from "@/contexts/app/apiContext";
import { useContext } from "react";

const WebsocketConnection = () => {

    // Obtención del estado de websocket conectado
    const { websocketConnected } = useContext(APIContext);

    return (
        <div className={`${websocketConnected ? 'bg-success' : 'bg-danger'} rounded-full size-4`} />
    );
};

export default WebsocketConnection;
