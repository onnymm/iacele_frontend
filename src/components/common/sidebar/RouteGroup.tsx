import { useLocation, useNavigate } from "react-router";
import React, { useEffect, useRef, useState } from "react";
import useSidebar from "../../../hooks/useSidebar";
import isBaseRoute from "../../functions/isBaseRoute";
import GroupRouteButton from "./GroupRouteButton";
import Route from "./Route";


/** 
 *  ## Grupo de rutas
 *  Este componente renderiza un botón que despliega grupo de rutas o un botón 
 *  que direcciona a una ruta.
 *   
 *  `< tsx />` Se autocierra.
 *   
 *  ### Parámetros de entrada
 *  - [ `string` ] `name`: Nombre del grupo.
 *  - [ {@link IconType} ] `icon`: Ícono del grupo.
 *  - [ {@link MenuRoute Array[ MenuRoute ]} ] `routes`: Ruta o grupo de rutas.
 */ 
const RouteGroup: (config: MenuGroup) => (React.JSX.Element) = ({
    name,
    icon: Icon,
    routes,
}) => {

    // Obtención de función de cambio de estado de barra lateral
    const { setIsSidebarOpen } = useSidebar()

    // Inicialización de función de navegación
    const navigateTo = useNavigate();
    // Referencia a contenedor de lista para obtener su altura
    const listRef = useRef<HTMLDivElement>(null)

    // Inicialización de estado de lista de rutas abierta
    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    // Inicialización de estado para computar la altura del contenedor de lista de rutas
    const [ height, setHeight ] = useState<number>(0);
    // Inicialización de ruta activa
    const [ isActiveLocation, setIsActiveLocation ] = useState<boolean>(false);

    // Obtención de la ubicación actual de la URL
    const location  = useLocation()

    console.log("routes", routes, ( isBaseRoute(location.pathname, routes)))

    // Función a ejecutar por rutas de grupo
    const routeCallback: (route: string) => (void) = (route) => {

        // Navegación a la ruta
        navigateTo(route)
        // Se intenta cerrar la barra lateral
        setIsSidebarOpen(false);
    }

    // Función a ejecutar por el botón de grupo de rutas
    const groupCallback: () => (void) = () => {

        // Si el grupo sólo es una ruta se navega hacia ella
        if ( typeof routes === 'string' ) {
            // Se ejecuta la función de ruta
            routeCallback(routes);
        // Si el grupo es una lista de rutas, el botón despliega o contrae la lista de rutas
        } else {
            setIsOpen( (prevState: boolean) => (!prevState) )
        }
    }

    // Ejecución de efecto para calcular la altura de contenedor de rutas
    useEffect(
        () => {
            // Si existe un elemento
            if ( listRef.current ) {
                // Se toma la altura del contenedor de lista de rutas
                setHeight(listRef.current.offsetHeight)
            }
        }, [setHeight]
    )

    // Validación si la ruta actual coincide con la ruta de este componente
    // o alguna de las rutas contenidas pertenece a este grupo de rutas
    useEffect(
        () => {

            // Validación de ruta del grupo si es una cadena de texto
            if ( typeof routes === "string") {
                // Si la ruta es base...
                if ( isBaseRoute(location.pathname, routes) ) {
                    // Se cambia el estado de ubicación activa a verdadero
                    setIsActiveLocation(true)
                } else {
                    // Se cambia el estado de ubicación activa a falso
                    // Normalmente casi todos los casos terminan aquí pero se debe
                    // mantener el estado en falso de todos modos.
                    setIsActiveLocation(false)
                }
            
            // Si la ruta es un objeto, significa que es un grupo de rutas
            // (Esto debería ser un else)
            } else if ( typeof routes === "object" ){

                // Iteración por cada una de las rutas del grupo
                routes.forEach(
                    (route) => {
                        // Si alguna de las rutas del grupo es base de la ubicación actual
                        if ( isBaseRoute(location.pathname, route.route) ) {
                            // Se cambia el estado de ubicación activa a verdadero
                            setIsActiveLocation(true)
                        } else {
                            // Se cambia el estado de ubicación activa a falso
                            // Normalmente casi todos los casos terminan aquí pero se debe
                            // mantener el estado en falso de todos modos.
                            setIsActiveLocation(false)
                        }
                    }
                )
            }
        }, [location, routes]
    )

    return (
        <div className="flex flex-col w-full h-min">
            {/* Botón de grupo de rutas */}
            <GroupRouteButton name={name} callback={groupCallback} icon={Icon} isActiveLocation={isActiveLocation} isOpen={isOpen} routes={routes} />

            {/* Lista de rutas, en caso de existir */}
            {typeof routes === 'object' &&
                <Route height={height} isOpen={isOpen} listRef={listRef} routes={routes} callback={routeCallback} />
            }
        </div>
    )
}

export default RouteGroup;
