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
        <main className="flex-grow">
            <Outlet />
        </main>
    )
}

export default React.memo(Content);
