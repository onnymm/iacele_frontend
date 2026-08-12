import { createContext } from "react";
import UserSession from "../../resources/userSession";
import Client from "../../api/client";

// Inicialización de objeto plantilla
const sessionTemplate = new UserSession(
    () => null,
    () => null,
    () => null,
    () => null,
    () => null,
);

const APIContext = createContext<IACele.Context.API<Client>>({
    api: new Client(sessionTemplate),
    appLoading: false,
    websocketConnected: false,
    eventClient: null,
});

export default APIContext;
