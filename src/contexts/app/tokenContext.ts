import VOID_CALLBACK from "@/constants/app/callbacks";
import { createContext } from "react";

const TokenContext = createContext<IACele.Context.UserToken>({
    userToken: null,
    setUserToken: VOID_CALLBACK.SYNC,
    removeUserToken: VOID_CALLBACK.SYNC,
});

export default TokenContext;
