import { useContext } from "react";
import FormContext from "../../../../contexts/formContext";
import Field from "../Field";
import DataViewForm from "../../DataViewForm"; // eslint-disable-line
import { parseDisplayValue } from "../../core";

/** 
 *  ## Input "sólo lectura" de formulario
 *  Este componente renderiza de solo lectura, que obtiene los datos del
 *  contexto de vista del componente {@link DataViewForm} y se usa en el
 *  componente {@link Field}.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `name`: Nombre del campo en la tabla de la base de datos.
 *  - [ `string` ] `title`: Nombre visible del campo en el placeholder.
 */ 
const InputFormReadonly: (config: IACele.UI.Field) => (React.JSX.Element) = ({
    name,
    title,
    type,
}) => {

    // Obtención de los datos del registro actual
    const { recordData } = useContext<IACele.View.Form.Context | undefined>(FormContext) as IACele.View.Form.Context;

    // Obtención del valor para el campo
    const recordValue = parseDisplayValue[type](recordData.data[name]);

    // Posicionamiento del símbolo de moneda
    const currencySymbolDisplay = (
        recordValue !== '' && type === 'monetary'
            ? 'pr-2'
            : 'hidden'
    );

    // Posicionamiento del símbolo de porcentaje
    const percentageSymbolDisplay = (
        recordValue !== '' && type === 'percentage'
            ? 'absolute right-8'
            : 'hidden'
    );

    return (
        <div className='relative mt-4 pt-1 pr-4 w-full scrollbar-hide'>
            <div className='absolute flex flex-row size-full text-nowrap pointer-events-none select-none'>
                <div className='z-10 px-4 h-full'>
                    <div className='flex items-center h-full font-light text-main-500 scale-75 -translate-x-[12.5%] translate-y-[-75%]'>
                        {title}
                    </div>
                </div>
            </div>
            <div
                className='relative flex flex-row items-center px-4 rounded-lg outline-none w-full h-8 overflow-x-hidden font-light text-ellipsis'
            >
                <span className={`${currencySymbolDisplay} select-none`}>$</span>
                {recordValue ? recordValue : ''}
                <span className={`${percentageSymbolDisplay} select-none`}>%</span>
            </div>
        </div>
    );
};

export default InputFormReadonly;
