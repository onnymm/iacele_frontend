import APIContext from "../contexts/app/apiContext";
import useEventClient from "@/hooks/api/useEventClient";
import useHTTPClient from "@/hooks/api/useHTTPClient";

const APIProvider: React.FC<IACele.Common.SupportsChildren> = ({
    children,
}) => {

    // Inicialización de instancia de conexión al backend
    const { api, appLoading } = useHTTPClient();
    // Inicialización de instancia de conexión a websocket del backend
    const { eventClient } = useEventClient();

    return (
        <APIContext.Provider value={{ api, appLoading, eventClient }}>
            {children}
        </APIContext.Provider>
    );
};

export default APIProvider;
