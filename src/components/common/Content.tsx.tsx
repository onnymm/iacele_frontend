import React from "react";
import { Outlet } from "react-router";

/** 
 *  ## Contenido de aplicación
 *  Este componente renderiza todo el contenido de la aplicación.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */ 
const Content: () => (React.JSX.Element) = () => {

    return (
        <main id="app-content" className="flex-grow p-2 min-h-full max-h-full overflow-y-auto">
            <Outlet />
        </main>
    );
};

export default React.memo(Content);
