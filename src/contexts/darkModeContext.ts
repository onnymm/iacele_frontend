import { createContext } from "react";
import { DarkModeElements } from "../types/darkModeTypes";

export const DarkModeContext = createContext<DarkModeElements>({
    darkMode: false,
    setDarkMode: () => (null)
});
