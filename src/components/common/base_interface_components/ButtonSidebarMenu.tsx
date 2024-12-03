import { useContext } from "react";
import { AppContext } from "../../../contexts/appContext";

/** 
 *  ## Botón de menú lateral
 *  Este componente renderiza el botón del menú de la barra lateral
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */ 
const ButtonSidebarMenu: () => (React.JSX.Element) = () => {

    // Obtención de función de cambio de estado de barra lateral abierta
    const { setIsSidebarOpen } = useContext(AppContext)

    return (
        <label htmlFor="button-menu" className="flex flex-row justify-center items-center size-14 ui-label-button">
            <button id="button-menu" onClick={() => setIsSidebarOpen(prevState => !prevState)} className="flex flex-col justify-center items-center size-10 ui-interactive sm:size-12">
                <div className="flex flex-col items-center gap-[4px] p-2 w-10 h-min">
                    <span className="bg-[#1f2f3f] dark:bg-white opacity-70 rounded-full w-full h-[2px] transition duration-1000 delay-500"/>
                    <span className="bg-[#1f2f3f] dark:bg-white opacity-70 rounded-full w-full h-[2px] transition duration-500 delay-0"/>
                    <span className="bg-[#1f2f3f] dark:bg-white opacity-70 rounded-full w-full h-[2px] transition duration-500 delay-300"/>
                </div>
            </button>
        </label>
    )
}

export default ButtonSidebarMenu;
