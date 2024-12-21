import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import Table from "../Table"; // eslint-disable-line

interface SortingDirectionParams {
    ascending: boolean | undefined; // Estado de dirección de ordenamiento, obtenido desde el Custok Hook {@link useSortingFields}.
}

/** 
 *  ## Dirección de ordenamiento
 *  Este componente renderiza un ícono que indica la dirección de ordenamiento 
 *  de una columna del componente {@link Table}.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `boolean | undefined}` ] `ascending`: Estado de dirección de
 *  ordenamiento, obtenido desde el Custok Hook {@link useSortingFields}.
 */ 
const SortingDirection = ({
    ascending
}: SortingDirectionParams): (React.JSX.Element) => {

    return (
        <div className="right-2 absolute min-w-4 h-4 pointer-events-none">
            {ascending
                ? <ChevronDownIcon />
                : <ChevronUpIcon />
            }
        </div>
    )
}

export default SortingDirection;
