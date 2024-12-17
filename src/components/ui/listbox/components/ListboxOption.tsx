import { createCircle } from "../../../../core/uiEffects";

interface ListboxOptionParams<T extends string | number | boolean> {
    item: OptionObject;
    setActive: (key: T) => (void);
    icon: IconType;
};

/** 
 *  ## Opción de caja de lista de opciones
 *  Este componente renderiza un botón de activación o desactivación de opción
 *  individual del componente {@link Listbox}.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link OptionObject} ] `item`: Elemento individual del tipo
 *  {@link OptionObject} para renderizar.
 *  - [ `undefined` ] `setActive`: Función de cambio de estado de opciones
 *  activas.
 *  - [ {@link IconType} ] `icon`: Ícono descriptivo a renderizar cuando la
 *  opción está activa.
 */ 
const ListboxOption = <T extends string | number | boolean>(
    {
        item,
        setActive,
        icon: Icon,
    }: ListboxOptionParams<T>
): (React.JSX.Element) => {

    // Función de ejecución por el botón
    const handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void = ( event ) => {

        // Efecto visual de pulso
        createCircle(event, "bg-gray-500/50");

        // Ejecución de la función provista
        setActive(item.key as T);
    };

    return (
        <button onClick={handleClick} className="relative flex flex-row items-center gap-2 sm:hover:bg-gray-500/10 dark:sm:hover:bg-white/10 active:bg-gray-500/10 dark:active:bg-white/10 px-4 rounded-lg w-full h-12 sm:h-10 font-light text-gray-600 ui-text-theme sm:dark:hover:text-gray-200 sm:active:text-current sm:hover:text-black active:dark:text-gray-200 active:text-black dark:text-gray-400 whitespace-nowrap duration-300 overflow-hidden">
            <div className={`${!item.active ? "opacity-0" : "opacity-100"} flex justify-center items-center size-4 transition text-main-500`}>
                <Icon className="size-full" />
            </div>
            <p className="text-sm">{item.displayName}</p>
        </button>
    );
};

export default ListboxOption;
