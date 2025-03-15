import { useEffect, useState } from "react";

/**
 *  ## Uso del modo oscuro
 *  Este Custom Hook utiliza el estado del modo oscuro y su interruptor de
 *  encendido y apagado, para usarse como se desee dentro de la aplicación.
 *  
 *  Este custom hook toma la configuración guardada en almacenamiento del
 *  cliente. En caso de no hallarla buscará la configuración por defecto del
 *  navegador.
 *  
 *  ### Parámetros de entrada:
 *  Este Custom Hook no recibe ningún parámetro de entrada.
 *  
 *  ### Retorno
 *  Este Custom Hook retorna:
 *  - [ `boolean` ] `darkMode`: Estado del modo oscuro.
 *  - [ {@link React.Dispatch<React.SetStateAction<boolean>>} ] `useDarkMode`:
 *  Función de cambio de estado del modo oscuro.
 */ 
const useDarkMode: () => ({
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}) = () => {

    const [ darkMode, setDarkMode ] = useState<boolean>(
        () => {

            // Se obtiene la configuración del modo oscuro desde el dispositivo
            const storedDarkMode = localStorage.getItem("darkMode") as 'false' | 'true' | null;

            // Si existe una configuración guardada se establece ésta
            if ( storedDarkMode !== null ) {

                // Índice para conversión a booleano
                const keyValue = {
                    'false': false,
                    'true': true,
                };

                // Retorno de la configuración guardada, convertida a booleano
                return Boolean( keyValue[storedDarkMode] );
            }

            // En caso de no existir se toma la configuración del tema del dispositivo
            const systemDarkMode = (
                window.matchMedia(
                    '(prefers-color-scheme: dark)'
                )
                .matches
            );

            // Se retorna la preferencia del usuario en el dispositivo
            return systemDarkMode;
        }
    );

    useEffect(
        () => {

            // Si el modo oscuro está activado
            if ( darkMode ) {
                document.documentElement.classList.add("dark");
            // Si el modo oscuro está desactivado
            } else {
                document.documentElement.classList.remove("dark");
            }

            // Se guarda la configuración actual
            localStorage.setItem("darkMode", String(darkMode));
        }
    );

    // Retorno de estado y función de cambio de estado
    return { darkMode, setDarkMode };
};

export default useDarkMode;
