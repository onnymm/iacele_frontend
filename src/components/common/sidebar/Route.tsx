import React from "react";
import isBaseRoute from "../../functions/isBaseRoute";

interface RouteParams {
    height: number; // Altura del grupo de subrutas.
    isOpen: boolean; // Estado de si el grupo está desplegado o no.
    listRef: React.RefObject<HTMLDivElement>; // Referencia de la lista de grupo de rutas.
    routes: MenuRoute[]; // Grupo de rutas
    callback: (route: string) => (void); //  Función a ejecutar por el botón cuando recibe un clic.
}

/** 
 *  ## Botón de grupo de rutas
 *  Este componente renderiza un botón que contiene una ruta o despliega un
 *  grupo de rutas.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `number` ] `height`: Altura del grupo de subrutas.
 *  - [ `boolean` ] `isOpen`: Estado de si el grupo está desplegado o no.
 *  - [ {@link React.RefObject} ] `listRef`: Referencia de la
 *  lista de grupo de rutas.
 *  - [ {@link MenuRoute  Array[ MenuRoute ]} ] `routes`: Grupo de rutas
 *  - [ `undefined` ] `callback`:  Función a ejecutar por el botón cuando
 *  recibe un clic.
 */ 
const Route = React.memo(({
    height,
    isOpen,
    routes,
    listRef,
    callback
}: RouteParams) => {

    return (
        <div
            id="sidebar-dropdown-button"
            style={{'height': isOpen && height ? height : 0}}
            className="flex flex-col gap-2 mx-8 px-4 text-gray-300/70 transition-height duration-300 overflow-y-hidden"
        >
        <div ref={listRef} className="flex flex-col gap-2 py-2 w-full h-min">
            {
                routes.map(
                    (route, routeKey) => {
                        return (
                            <button onClick={() => callback(route.route)} className={`${isBaseRoute(location.pathname, route.route) ? "text-white" : ""} text-start sm:hover:text-white active:text-white duration-300`} key={routeKey}>
                                {route.name}
                            </button>
                        )
                    }
                )
            }
        </div>
    </div>
    )
})

export default Route;
