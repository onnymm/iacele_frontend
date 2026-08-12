import { createContext } from "react";

const TokenContext = createContext<IACele.Context.UserToken>({
    userToken: null,
    setUserToken: () => null,
    removeUserToken: () => null,
});

export default TokenContext;
