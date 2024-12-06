import { createCircle } from "../../../../core/uiEffects";
import { IconType } from "../../../../types/commonTypes";

interface ListboxOptionParams {
    item: OptionObject;
    setActive: (key: string | number | boolean) => (void);
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
const ListboxOption: (config: ListboxOptionParams) => (React.JSX.Element) = ({
    item,
    setActive,
    icon: Icon,
}) => {

    // Función de ejecución por el botón
    const handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void = ( event ) => {

        // Efecto visual de pulso
        createCircle(event, "bg-gray-500/50");

        // Ejecución de la función provista
        setActive(item.key);
    };

    return (
        <button onClick={handleClick} className="relative flex flex-row items-center gap-2 sm:hover:bg-gray-500/10 dark:sm:hover:bg-white/10 active:bg-gray-500/10 dark:active:bg-white/10 px-4 rounded-lg w-full h-12 sm:h-10 font-light ui-text-theme duration-300 overflow-hidden">
            <div className={`${!item.active ? "opacity-0" : "opacity-100"} flex justify-center items-center size-4 transition text-main-500`}>
                <Icon className="size-full" />
            </div>
            <p>{item.displayName}</p>
        </button>
    );
};

export default ListboxOption;