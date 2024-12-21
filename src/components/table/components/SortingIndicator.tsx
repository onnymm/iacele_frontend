import { ChevronUpDownIcon } from "@heroicons/react/16/solid"
import Table from "../Table"; // eslint-disable-line

/** 
 *  ## Indicador de ordenamiento
 *  Este componente renderiza un ícono que indica que una columna del
 *  componente {@link Table} puede ordenar datos.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */ 
const SortingIndicator = (): (React.JSX.Element) => {

    return (
        <div className="right-2 absolute opacity-0 group-hover:opacity-100 min-w-4 h-4 transition-opacity duration-300 pointer-events-none">
            <ChevronUpDownIcon />
        </div>
    )
}

export default SortingIndicator;
