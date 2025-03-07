import { useContext, useEffect, useRef, useState } from "react";
import { inputType, parseDisplayValue, validationCallbacks } from "../../core";
import FormContext from "../../../../contexts/formContext";
import Field from "../Field";

/** 
 *  ## Input de formulario
 *  Este componente renderiza un input editable o de solo lectura, que obtiene
 *  los datos del contexto de vista del componente {@link DataViewForm} y se
 *  usa en el componente {@link Field}.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `name`: Nombre del campo en la tabla de la base de datos.
 *  - [ `string` ] `title`: Nombre visible del campo en el placeholder.
 *  - [ {@link IACele.Types.TypeName} ] `type`: Tipo de valor del campo.
 *  - [ `boolean` ] `readonly`: Modo "sólo lectura".
 */ 
const InputForm: (config: IACele.UI.Field) => (React.JSX.Element) = ({
    name,
    type,
    title,
    readonly,
}) => {

    // Creación de la función de validación de valor
    const validateValue = validationCallbacks[type];

    // Obtención de los datos del registro y funciones de cambio  de estado
    const { recordData, setDataChanged, setFormValue, dataChanged, reload, setReload } = useContext<IACele.View.Form.Context | undefined>(FormContext) as IACele.View.Form.Context;
    // Creación de estado de valor de campo actual
    const [ recordValue, setRecordValue ] = useState<IACele.Types.ValueType>(recordData.data[name]);
    // Creación de dato estático que almacena el valor original proveniente del backend
    const originalValue = useRef<string | number | undefined>(recordData.data[name])
    // Función de cambio de valor de referencia
    const setOriginalValue = (value: string | number | undefined) => {
        originalValue.current = value
    }
    const [ displayValue, setDisplayValue ] = useState<string>(parseDisplayValue[type](recordValue))

    // Si el valor estático cambia significa que se hizo recarga de datos
    useEffect(
        () => {
            // Se cambia el indicador de cambio de datos a falso
            setDataChanged(false);
            // Se actualiza el valor estático al valor actualizado de la base de datos
            setOriginalValue(recordData.data[name]);
        }, [recordData.data, setDataChanged, name]
    );

    // Si el indicador de cambios es falso se establece el valor del formulario al valor original
    useEffect(
        () => {
            if ( dataChanged ) return;
            setRecordValue(recordData.data[name])
            setDisplayValue(parseDisplayValue[type](recordData.data[name]))
        }, [recordData, name, dataChanged, type]
    )

    // Si el valor del campo ha cambiado se indica al estado del contexto que los datos han sufrido cambios
    useEffect(
        () => {
            if ( recordValue === originalValue.current || reload ) return;
            setDataChanged(true);
        }, [recordValue, setDataChanged, reload, recordData, setRecordValue, name]
    )

    // Si se detecta un cambio en el estado del valor pero su valor es igual
    //      al original y el estado de carga es activo, se cambia el estado
    //      de carga a inactivo
    useEffect(
        () => {
            if ( recordValue === originalValue.current && reload ) {
                setReload(false);
            }
        }, [recordValue, reload, setReload]
    )

    // Estado de campo enfocado
    const [ isFocused, setIsFocused ] = useState<boolean>(false);

    // Posición del placeholder visible
    const visiblePlaceholderPosition = (
        (isFocused) || recordValue !== undefined
            ? 'translate-y-[-75%] scale-75 -translate-x-[12.5%]'
            : ''
    )

    // Resaltar color del placeholder
    const highlightVisibleholder = (
        (isFocused)
            ? 'text-main-500'
            : 'dark:text-gray-400 text-gray-500'
    )

    // Resaltar color del borde del campo
    const colorBorder = (
        (isFocused)
            ? 'border-main-500'
            : 'border-gray-500/50'
    )

    const fieldOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        // Se cambia el estado a desenfocado
        setIsFocused(false)
        // Creación del valor formateado y corregido en caso de ser necesario
        const formattedValue = validateValue(String(recordValue), event.target.value)
        // Se prepara el valor en los cambios del formulario para una posible escritura de éstos
        setFormValue(name, formattedValue)
        // Se establece el valor en el input
        setRecordValue(formattedValue)
        // Se establece el valor a mostrar en el campo
        setDisplayValue( parseDisplayValue[type](formattedValue) )
    }

    // Creación de función a ejecutar cuando existan cambios
    const fieldOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Se establece el valor en el input
        setRecordValue( event.target.value)
        // Se establece el valor a mostrar en el campo
        setDisplayValue( event.target.value )
    }

    return (
        <div className='relative mt-4 pt-1 w-full'>
            <div className='absolute flex flex-row size-full pointer-events-none select-none'>
                <div className='z-10 px-4 h-full'>
                    <div className={`${visiblePlaceholderPosition} ${highlightVisibleholder} text-nowrap font-light transition h-full flex items-center`}>
                        {title}
                    </div>
                </div>
            </div>
            <div className={`${highlightVisibleholder} ${type !== 'monetary' ? 'hidden' : ''} ${!isFocused && displayValue === '' ? 'hidden' : ''} absolute flex flex-col justify-center pl-3 h-8`}>
                $
            </div>
            <input
                type={inputType[type]}
                step={0.01}
                onChange={fieldOnChange}
                value={displayValue}
                disabled={readonly}
                className={`${colorBorder} ${type === 'monetary' ? 'pl-8' : ''} dark:bg-gray-900 scrollbar-hide overflow-y-hidden dark:disabled:bg-gray-800 disabled:bg-gray-200 disabled:border-gray-500/20 disabled:text-gray-500 w-full font-light border px-4 rounded-lg outline-none h-8 text-black`}
                onFocus={() => setIsFocused(true)}
                onBlur={fieldOnBlur}
            />
        </div>
    )
}

export default InputForm;
