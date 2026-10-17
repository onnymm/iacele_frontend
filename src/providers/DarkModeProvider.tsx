import LOCAL_STORAGE from "@/constants/app/localStorage";
import THEME from "@/constants/app/theme";
import DarkModeContext from "@/contexts/ui/darkModeContext";
import useLocalValue from "@/hooks/app/useLocalValue";
import { useEffect, useState } from "react";

type StringBoolean = 'false' | 'true';

const DarkModeProvider = ({
    children,
}: IACele.Common.SupportsChildren) => {

    const [ loadDarkMode, saveDarkMode ] = useLocalValue<boolean, StringBoolean>(
        LOCAL_STORAGE.DARK_MODE,
        (rawValue) => {

            // Si existe una configuración guardada...
            if ( rawValue !== null ) {

                // Se parsea el valor
                return JSON.parse(rawValue);
            // En caso de no existir una configuración guardada
            } else {

                // Se toma la configuración del tema del dispositivo
                return (
                    window.matchMedia('(prefers-color-scheme: dark)')
                    .matches
                );
            };
        },
    );

    // Inicialización de estado de modo oscuro
    const [ darkMode, setDarkMode ] = useState<boolean>(loadDarkMode);

    useEffect(
        () => {

            // Si el modo oscuro está activado...
            if ( darkMode ) {
                // Se añade la clase
                document.documentElement.classList.add(THEME.DARK);
            // Si el modo oscuro está desactivado...
            } else {
                // Se descarta la clase
                document.documentElement.classList.remove(THEME.DARK);
            };

            // Se guarda la configuración actual
            saveDarkMode(String(darkMode) as StringBoolean);
        }, [darkMode, saveDarkMode]
    );

    return (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export default DarkModeProvider;
