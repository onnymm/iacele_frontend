import { createContext } from "react";
import { TokenElements } from "../types/Token";

export const TokenContext = createContext<TokenElements>({
    token: null,
    setToken: () => null,
})
