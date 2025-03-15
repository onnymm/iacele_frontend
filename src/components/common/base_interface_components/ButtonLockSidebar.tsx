import { useContext } from "react";
import { AppContext } from "../../../contexts/appContext";
import { LockClosedIcon } from "@heroicons/react/24/solid";

/** 
 *  ## Bloqueo de barra lateral
 *  Este componente renderiza un botón que bloquea la barra lateral de la 
 *  interfaz base.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */ 
const ButtonLockSidebar: () => (React.JSX.Element) = () => {

    // Obtención de estado y función de cambio de estado de bloqueo de barra lateral
    const { isSidebarLocked, setIsSidebarLocked } = useContext(AppContext);

    return (
        <button
            onClick={() => setIsSidebarLocked((prevState => !prevState))}
            className={`${isSidebarLocked ? "bg-slate-900" : ""} hidden sm:block hover:bg-slate-900 rounded-md size-12 sm:size-10`}
        >
            <div className="p-2 size-full">
                <LockClosedIcon className="fill-white size-8 sm:size-6" />
            </div>
        </button>
    );
};

export default ButtonLockSidebar;
