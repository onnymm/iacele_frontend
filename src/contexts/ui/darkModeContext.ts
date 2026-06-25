import { createContext } from "react";

interface DarkModeContextParams {
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const DarkModeContext = createContext<DarkModeContextParams>({
    darkMode: false,
    setDarkMode: () => null,
});

export default DarkModeContext;
