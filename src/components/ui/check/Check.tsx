import { CheckIcon } from "@heroicons/react/16/solid";

interface CheckParams {
    value: boolean; // Valor del checkbox
    setValue: React.Dispatch<React.SetStateAction<boolean>>; //
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
 *  - [ `setValue` ] {@link React.Dispatch<React.SetStateAction<boolean>>}: Función de cambio de estado de valor.
 */ 
const Check: (config: CheckParams) => (React.JSX.Element) = ({
    value,
    setValue,
}) => {

    // Clases dinámicas para indicar el valor del estado
    const borderClassName = value ? 'border-main-500' : 'border-gray-500';
    const fillClassName = value ? 'scale-100' : 'scale-0';
    const IconClassName = value ? 'opacity-100 delay-200' : 'opacity-0 delay-0'

    return (
        // Borde de la caja
        <div
            className={`${borderClassName} relative flex justify-center items-center border-2 hover:border-main-500 rounded-md transition-colors duration-200 cursor-pointer overflow-hidden size-6`}
            onClick={() => setValue( (prevState) => (!prevState) )}
        >
            {/* Relleno de la caja */}
            <span className={`${fillClassName} bg-main-500 rounded-sm duration-300 size-full`}/>
            {/* Ícono de la caja */}
            <CheckIcon className={`${IconClassName} transition duration-200 absolute size-6 fill-white pointer-events-none`} />
        </div>
    )
}

export default Check;
