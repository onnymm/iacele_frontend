import VOID_CALLBACK from "@/constants/app/callbacks";
import { createContext } from "react";

interface DarkModeContextParams {
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const DarkModeContext = createContext<DarkModeContextParams>({
    darkMode: false,
    setDarkMode: VOID_CALLBACK.SYNC,
});

export default DarkModeContext;
