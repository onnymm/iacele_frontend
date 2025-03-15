import { createContext } from "react";

export const DarkModeContext = createContext<DarkModeElements>({
    darkMode: false,
    setDarkMode: () => (null),
});
