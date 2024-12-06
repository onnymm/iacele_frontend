import { IconType } from "../../../types/commonTypes"
import ListboxOption from "./components/ListboxOption"

interface ListboxParams {
    items: OptionObject[];
    setActive: (key: string | number | boolean) => (void);
    iconActive: IconType;
    _listboxRef?: React.MutableRefObject<HTMLDivElement | null>;
}

/** 
 *  ## Lista de opciones
 *  Este componente renderiza una caja de lista de opciones que se pueden
 *  activar o desactivar dependiendo del comportamiento asignado, obtenidas
 *  desde el Custom Hook {@link useOptions}.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link OptionObject OptionObject[ ] } ] `items`: Arreglo de elementos de opciones
 *  obtenidos del Custom Hook {@link useOptions} para renderizar en la caja de
 *  lista de opciones.
 *  - [ `undefined` ] `setActive`: Función de cambio de estado de opciones
 *  activas obtenida del Custom Hook {@link useOptions}.
 *  - [ {@link IconType} ] `iconActive`: Ícono descriptivo a renderizar en las
 *  opciones cuando están activas.
 */ 
const Listbox: (config: ListboxParams) => (React.JSX.Element) = ({
    items,
    setActive,
    iconActive: IconActive,
    _listboxRef, // Referencia usada por el componente Select.
}) => {

    return (
        <div className="border-gray-500/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm py-2 border rounded-lg">
            <div ref={_listboxRef ? _listboxRef : undefined} className="p-2 max-h-94 sm:max-h-50 overflow-y-scroll md:dsk-vertical-difuminate mob-vertical-difuminate scrollbar-hide">
                {
                    items.map(
                        (item, key) => (
                            <ListboxOption item={item} icon={IconActive} key={key} setActive={setActive} />
                        )
                    )
                }
            </div>
        </div>
    )
}

export default Listbox
