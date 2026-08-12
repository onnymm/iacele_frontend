import APIContext from "../contexts/app/apiContext";
import useEventClient from "@/hooks/api/useEventClient";
import useHTTPClient from "@/hooks/api/useHTTPClient";

const APIProvider: React.FC<IACele.Common.SupportsChildren> = ({
    children,
}) => {

    // Inicialización de instancia de conexión al backend
    const { api, appLoading } = useHTTPClient();
    // Inicialización de instancia de conexión a websocket del backend
    const { eventClient,websocketConnected } = useEventClient();

    return (
        <APIContext.Provider value={{ api, appLoading, eventClient, websocketConnected }}>
            {children}
        </APIContext.Provider>
    );
};

export default APIProvider;
