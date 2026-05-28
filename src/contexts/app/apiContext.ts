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

const APIContext = createContext<IACele.App.Context.API>({
    api: new Client(sessionTemplate),
    appLoading: false,
});

export default APIContext;
