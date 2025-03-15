import { shortDayNames } from "../../../../constants/date"; // eslint-disable-line

/** 
 *  ## Nombre del día para calendario
 *  Este componente renderiza un bloque que muestra el nombre del día. Requiere
 *  los individuos de la constante {@link shortDayNames}.
 *  
 *  `< tsx >...</ tsx >` Contiene elementos hijos.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */ 
const DayName: (config: GenericInvolverComponent) => (React.JSX.Element) = ({
    children
}) => {

    return (
        <div className="flex flex-row justify-center items-center w-8 h-6 font-bold text-[10px] text-gray-500 uppercase">
            {children}
        </div>
    );
};

export default DayName;
