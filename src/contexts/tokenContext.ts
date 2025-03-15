import { createContext } from "react";

export const TokenContext = createContext<TokenElements>({
    token: null,
    setToken: () => null,
});
