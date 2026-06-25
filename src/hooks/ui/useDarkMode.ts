import DarkModeContext from "@/contexts/ui/darkModeContext";
import { useCallback, useContext } from "react"

const useDarkMode = () => {

    // Obtención del estado y función de estado desde el contexto
    const { darkMode, setDarkMode } = useContext(DarkModeContext);

    // Función para cambiar el modo oscuro sin importar el estado anterior y posterior
    const switchDarkMode = useCallback(
        () => {
            setDarkMode( (prev) => (!prev) );
        }, [setDarkMode]
    );

    return { darkMode, setDarkMode, switchDarkMode };
};

export default useDarkMode;
