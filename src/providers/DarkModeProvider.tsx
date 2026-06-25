import LOCAL_STORAGE from "@/constants/app/localStorage";
import THEME from "@/constants/app/theme";
import DarkModeContext from "@/contexts/ui/darkModeContext";
import { useEffect, useState } from "react";

type DarkModeOnLocalStorage = "false" | "true";

const DarkModeProvider: React.FC<IACele.Common.SupportsChildren> = ({
    children,
}) => {

    const [ darkMode, setDarkMode ] = useState<boolean>(
        () => {

            // Obtención de la configuración del modo oscuro desde el dispositivo
            const storedDarkMode = localStorage.getItem(LOCAL_STORAGE.DARK_MODE) as DarkModeOnLocalStorage | null;

            // Si existe una configuración guardada se establece ésta
            if ( storedDarkMode !== null ) {

                // Índice para conversión a booleano
                const keyValue = {
                    'true': true,
                    'false': false,
                };

                // Retorno de la configuración guardada convertida a booleano
                return keyValue[storedDarkMode];
            };

            // En caso de no existir se toma la configuración del tema del dispositivo
            const systemDarkMode = (
                window.matchMedia('(prefers-color-scheme: dark)')
                .matches
            );

            return systemDarkMode;
        }
    );

    useEffect(
        () => {

            // Si el modo oscuro está activado...
            if ( darkMode ) {
                document.documentElement.classList.add(THEME.DARK);
                // Si el modo oscuro está desactivado...
            } else {
                document.documentElement.classList.remove(THEME.DARK);
            };

            // Se guarda la configuración actual
            localStorage.setItem(LOCAL_STORAGE.DARK_MODE, String(darkMode));
        }, [darkMode]
    );

    return (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export default DarkModeProvider;
