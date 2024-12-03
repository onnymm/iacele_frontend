import React from "react";

/** 
 *  ## Sección de menú de la barra lateral
 *  Este componente renderiza la sección de menú de la barra lateral.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */ 
const SidebarContent = () => {

    return (
        <div className="flex flex-col flex-grow gap-2">
            Información del Sidebar
        </div>
    )
}

export default React.memo(SidebarContent);
