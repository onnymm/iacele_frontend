import { createContext } from "react";

const TokenContext = createContext<IACele.App.Context.UserToken>({
    userToken: null,
    setUserToken: () => null,
    removeUserToken: () => null,
});

export default TokenContext;
