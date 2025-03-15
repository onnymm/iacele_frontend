import { useContext } from "react"
import ToggleSwitch from "./ToggleSwitch"
import { DarkModeContext } from "../../../contexts/darkModeContext"
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";

/** 
 *  ## Interruptor de modo oscuro
 *  Este componente renderiza un interruptor de modo oscuro
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */
const ToggleDarkMode: () => (React.JSX.Element) = () => {

    // Obtención del contexto de modo oscuro
    const { darkMode, setDarkMode } = useContext(DarkModeContext);

    return (
        <ToggleSwitch
            value={darkMode}
            setValue={setDarkMode}
            type='primary'
            icon={SunIcon}
            iconOn={MoonIcon}
        />
    );
};

export default ToggleDarkMode;
