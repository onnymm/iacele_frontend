import { CheckIcon } from "@heroicons/react/16/solid";

interface CheckParams {
    value: boolean; // Valor del checkbox.
    setValue: React.Dispatch<React.SetStateAction<boolean>>; // Función de cambio del valor.
    readonly?: boolean; // Deshabilitado.
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
 *  - [ {@link React.Dispatch<React.SetStateAction<boolean>>} ] `setValue`:
 *  Función de cambio del valor.
 *  - [ `boolean` ] `readonly`: Deshabilitado.
 */ 
const Check: (config: CheckParams) => (React.JSX.Element) = ({
    value,
    setValue,
    readonly = false,
}) => {

    // Clases dinámicas para indicar el valor del estado
    const borderClassName = value ? 'border-main-500' : 'border-gray-500';
    const fillClassName = value ? 'scale-100' : 'scale-0';
    const IconClassName = value ? 'opacity-100 delay-200' : 'opacity-0 delay-0';

    // Función de cambio de estado solo cuando el componente está activo.
    const onClickCallback = () => {
        if ( readonly ) return;
        setValue( (prevState) => (!prevState) );
    }

    return (
        // Borde de la caja
        <div
            className={`${borderClassName} ${readonly ? 'opacity-50' : 'group-hover/label:border-main-500 hover:border-main-500 cursor-pointer'} relative flex justify-center items-center border-2 rounded-md transition-colors duration-200 overflow-hidden size-6`}
            onClick={onClickCallback}
        >
            {/* Relleno de la caja */}
            <span className={`${fillClassName} bg-main-500 rounded-sm duration-300 size-full`}/>
            {/* Ícono de la caja */}
            <CheckIcon className={`${IconClassName} transition duration-200 absolute size-6 fill-white pointer-events-none`} />
        </div>
    );
};

export default Check;
