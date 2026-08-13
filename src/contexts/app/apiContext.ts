import { createContext } from "react";
import UserSession from "../../resources/userSession";
import Client from "../../api/client";
import VOID_CALLBACK from "@/constants/app/callbacks";

// Inicialización de objeto plantilla
const sessionTemplate = new UserSession(
    VOID_CALLBACK.SYNC,
    VOID_CALLBACK.SYNC,
    VOID_CALLBACK.SYNC,
    VOID_CALLBACK.SYNC,
    VOID_CALLBACK.SYNC,
);

const APIContext = createContext<IACele.Context.API<Client>>({
    api: new Client(sessionTemplate),
    appLoading: false,
    websocketConnected: false,
    eventClient: null,
});

export default APIContext;
