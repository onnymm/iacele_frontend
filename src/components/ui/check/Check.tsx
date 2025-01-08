import { CheckIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

interface CheckParams {
    value: boolean; // Valor del checkbox
    onClick?: (value: boolean) => void; // Función a ejecutar por el checkbox
}

/** 
 *  ## Checkbox
 *  Este componente renderiza un checkbox que ejecuta una función con el valor,
 *  de ser provista.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `boolean` ] `value`: Valor del checkbox.
 *  - [ `function` ] `onClick`: Función a ejecutar por el checkbox.
 */ 
const Check: (config: CheckParams) => (React.JSX.Element) = ({
    value,
    onClick,
}) => {

    // Inicialización del estado a usar en el componente renderizado
    const [ checked, setChecked ] = useState<boolean>(value);

    // Clases dinámicas para indicar el valor del estado
    const borderClassName = checked ? 'border-main-500' : 'border-gray-500';
    const fillClassName = checked ? 'scale-100' : 'scale-0';
    const IconClassName = checked ? 'opacity-100 delay-200' : 'opacity-0 delay-0'

    // Función a ejecutar cuando el checkbox se marca o se desmarca
    const internalOnClick: () => (void) = () => {

        // Si se proporcionó una función...
        if ( onClick ) {
            // Se ejecuta la función con el estado forzado a actualización
            onClick(!checked)
        }

        // Se cambia el valor del estado de marcado
        setChecked( (prevState) => (!prevState) )
    }

    return (
        // Borde de la caja
        <div
            className={`${borderClassName} relative flex justify-center items-center border-2 hover:border-main-500 rounded-md transition-colors duration-200 cursor-pointer overflow-hidden size-6`}
            onClick={internalOnClick}
        >
            {/* Relleno de la caja */}
            <span className={`${fillClassName} bg-main-500 rounded-sm duration-300 size-full`}/>
            {/* Ícono de la caja */}
            <CheckIcon className={`${IconClassName} transition duration-200 absolute size-6 fill-white pointer-events-none`} />
        </div>
    )
}

export default Check;
