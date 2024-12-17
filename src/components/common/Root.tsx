import { useContext } from "react";
import Content from "./Content.tsx"
import Navbar from "./navbar/Navbar"
import Sidebar from "./sidebar/Sidebar.tsx"
import { AppContext } from "../../contexts/appContext";

/** 
 *  ## App iaCele
 *  Este componente renderiza la aplicación iaCele después del inicio de
 *  sesión.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */ 
const Root: () => (React.JSX.Element) = () => {

    // Obtención del estado de barra lateral desde el contexto
    const { isSidebarLocked, isSidebarOpen } = useContext(AppContext);

    return (
        <div className="relative h-full">
            {/* Barra superior */}
            <Navbar />

            {/* Contenido de la aplicación */}
            <div className="flex flex-row flex-shrink h-[calc(100%_-_5rem)] max-h-[calc(100%_-_5rem)]">
                <div className={`${isSidebarOpen && isSidebarLocked ? "w-72" : "w-0"} h-full transition-width duration-300`}/>
                {/* Se contiene sólo esta parte para evitar renderizaciones innecesarias */}
                <Content />
            </div>

            {/* Barra lateral */}
            <Sidebar />
        </div>
    )
}

export default Root;
