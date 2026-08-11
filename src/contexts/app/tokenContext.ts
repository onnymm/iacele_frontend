import { createContext } from "react";

const TokenContext = createContext<IACeleV2.Context.UserToken>({
    userToken: null,
    setUserToken: () => null,
    removeUserToken: () => null,
});

export default TokenContext;
