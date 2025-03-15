import { useContext } from "react"
import { AppContext } from "../contexts/appContext"

/** 
 *  ## Control de la barra lateral
 *  Este Custom Hook obtiene los valores la barra lateral desde el contexto
 *  de la aplicación y controla el cierre de la barra lateral en base a si ésta
 *  está bloqueada o no. Si la barra lateral está bloqueada, no se cerrará
 *  aunque el estado de apertura se establezca a `false`, permanecerá en
 *  `true`.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 *  
 *  ### Retorno:
 *  Este Custom Hook retorna:
 *  - [ `boolean` ] `isSidebarOpen`: Estado de barra lateral abierta o cerrada.
 *  - [ {@link React.Dispatch<SetStateAction>} ] `setIsSidebarOpen`: Función de
 *  cambio de estado de barra lateral abierta o cerrada.
 *  - [ `boolean` ] `isSidebarLocked`: Estado de barra lateral bloqueada.
 *  - [ {@link React.Dispatch<SetStateAction>} ] `setIsSidebarLocked`: Función
 *  de cambio de estado de barra lateral bloqueada.
 */
const useSidebar = () => {

    // Obtención de los valores del contexto renombrando `setIsSidebarOpen`
    const { isSidebarOpen, setIsSidebarOpen: internalSetIsSidebarOpen, isSidebarLocked, setIsSidebarLocked } = useContext(AppContext);

    // Declaración de función `setIsSidebarOpen` controlada
    const setIsSidebarOpen: (state: boolean) => (void) = (state) => {

        // Control de cierre de la barra lateral si ésta está bloqueada
        if ( !isSidebarLocked && !state ) {
            internalSetIsSidebarOpen(state);
        } else if ( state ) {
            internalSetIsSidebarOpen(state);
        }
    };

    // Retorno de los valores de contexto junto con función de control
    return { isSidebarOpen, setIsSidebarOpen, isSidebarLocked, setIsSidebarLocked };
}

export default useSidebar;
