import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface GroupRouteButtonParams {
    name: string;
    callback: () => (void);
    icon: IconType;
    isActiveLocation: boolean;
    isOpen: boolean;
    routes: string | MenuRoute[] | undefined;
}

/** 
 *  ## Botón de grupo de rutas
 *  Este componente renderiza un botón que contiene una ruta o despliega un
 *  grupo de rutas.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `name`: Nombre de la ruta.
 *  - [ `function` ] `callback`: Función a ejecutar por el botón cuando
 *  recibe un clic.
 *  - [ {@link IconType} ] `icon`: Ícono descriptivo a renderizar en el botón
 *  de la ruta
 *  - [ `boolean` ] `isActiveLocation`: Estado de si la ubicación es base de la
 *  ruta o el grupo de rutasd e este componente.
 *  - [ `boolean` ] `isOpen`: Estado de si el grupo está desplegado o no.
 *  - [ {@link string | MenuRoute[] | undefined} ] `routes`: Ruta individual o
 *  grupo de rutas.
 */  
const GroupRouteButton: (config: GroupRouteButtonParams) => (React.JSX.Element) = ({
    name,
    callback,
    icon: Icon,
    isActiveLocation,
    isOpen,
    routes
}) => {

    return (
            <button onClick={callback} className={`${isActiveLocation ? "shadow-md active:shadow-md backdrop-saturate-115 backdrop-brightness-125" : ""} flex flex-row items-center gap-2 sm:hover:shadow-md active:shadow-md sm:hover:backdrop-saturate-115 sm:hover:backdrop-brightness-125 active:backdrop-saturate-115 active:backdrop-brightness-125 px-4 rounded-md w-full h-12 sm:h-10 transition`}>
                <div className="flex justify-center items-center min-w-9 sm:min-w-7 h-9 sm:h-7">
                    <Icon className="text-current size-[75%]" />
                </div>
                <span className="flex-grow text-start">{name}</span>
                {typeof routes === 'object' &&
                    <div className="flex justify-center items-center min-w-9 sm:min-w-7 h-9 sm:h-7">
                        <ChevronDownIcon className={`${isOpen ? 'rotate-180' : ''} duration-300 transition text-current size-[75%]`} />
                    </div>
                }
            </button>
    )
}

export default GroupRouteButton;
