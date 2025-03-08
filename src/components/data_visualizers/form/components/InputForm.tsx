import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { inputType, parseDisplayValue, parseTo } from "../../core";
import FormContext from "../../../../contexts/formContext";
import Field from "../Field";
import useRecordValue from "../../../../hooks/form/useRecordValue";

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

    // Función de parseo de valor
    const parseValueToDisplay = useMemo(() => parseDisplayValue[type], [type])

    // Función de formateo de valor de input
    const formatRecordValue = useMemo(() => parseTo[type], [type])

    // Obtención de los datos del registro y funciones de cambio  de estado
    const { recordData, setDataChanged, setFormValue, dataChanged, reload, setReload } = useContext<IACele.View.Form.Context | undefined>(FormContext) as IACele.View.Form.Context;
    // Creación de estado de valor de campo actual
    const [ recordValue, setRecordValue ] = useRecordValue(recordData.data[name])

    // Creación de dato estático que almacena el valor original proveniente del backend
    const originalValue = useRef<string | number | undefined>(recordData.data[name] ?? undefined)

    // Valor a mostrar en el campo
    const [ displayValue, setDisplayValue ] = useState<string>(parseValueToDisplay(recordValue))

    // Estado de campo enfocado
    const [ isFocused, setIsFocused ] = useState<boolean>(false);

    // Si el valor estático cambia significa que se hizo recarga de datos
    useEffect(
        () => {
            if ( originalValue.current === recordData.data[name] ) return;
            // Se cambia el indicador de cambio de datos a falso
            setDataChanged(false);
            // Se actualiza el valor estático al valor actualizado de la base de datos
            originalValue.current = recordData.data[name];
        }, [recordData.data, setDataChanged, name]
    );

    // Si el indicador de cambios cambia a falso significa que se guardaron los datos y se establece el valor del formulario al valor original
    useEffect(
        () => {
            if ( dataChanged ) return;
            if ( Object.is(recordValue, originalValue.current) ) return;
            // Cambio del valor del registro
            setRecordValue( originalValue.current )
            // Cambio del valor mostrado
            setDisplayValue( parseValueToDisplay(originalValue.current) )
        }, [recordValue, dataChanged, parseValueToDisplay, setRecordValue]
    )

    // Si se detecta un cambio en el estado del valor pero su valor es igual
    //      al original y el estado de carga es activo, se cambia el estado
    //      de carga a inactivo
    useEffect(
        () => {
            if ( !reload ) return;
            if ( Object.is(recordValue, originalValue.current) ) {
                setReload(false);
            }
        }, [recordValue, reload, setReload]
    )

    // Posición del placeholder visible
    const visiblePlaceholderPosition = (
        isFocused || displayValue !== ''
            ? 'translate-y-[-75%] scale-75 -translate-x-[12.5%]'
            : ''
    )

    // Resaltar color del placeholder
    const highlight = (
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

    // Estilización del símbolo de campo numérico
    const numberSymbol = (
        type === 'monetary'
            ? ''
            : type === 'percentage'
                ? 'right-8'
                : 'hidden'
    )

    // Se muestra o se oculta símbolo de campo numérico
    const hideNumberSymbol = (
        !isFocused && displayValue === ''
            ? 'hidden'
            : ''
    )

    // Símbolo a mostrar en campo numérico
    const symbolToShow = (
        type === 'monetary'
            ? '$'
            : type === 'percentage'
                ? '%'
                : ''
    )

    // Espaciado inicial en input
    const startPadding = (
        type === 'monetary'
            ? 'pl-8'
            : ''
    )

    // Función a ejecutar cuando el campo es desenfocado
    const fieldOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        // Se cambia el estado a desenfocado
        setIsFocused(false)
        // Creación del valor formateado y corregido en caso de ser necesario
        const formattedValue = formatRecordValue(event.target.value)
        // Se prepara el valor en los cambios del formulario para una posible escritura de éstos
        setFormValue(name, formattedValue)
        // Se establece el valor en el input
        setRecordValue(formattedValue)
        // Se establece el valor a mostrar en el campo
        setDisplayValue( parseValueToDisplay(formattedValue) )
    }

    // Función a ejecutar cuando el valor del campo cambia
    const fieldOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Se establece el valor en el input
        setRecordValue( formatRecordValue(event.target.value) )
        // Se establece el valor a mostrar en el campo
        setDisplayValue( event.target.value )
        // Se actualiza el contexto para indicar que hay cambios en los datos
        setDataChanged(true);
    }

    return (
        <div className='relative mt-4 pt-1 w-full'>
            <div className='absolute flex flex-row size-full pointer-events-none select-none'>
                <div className='z-10 px-4 h-full'>
                    <div className={`${visiblePlaceholderPosition} ${highlight} text-nowrap font-light transition h-full flex items-center`}>
                        {title}
                    </div>
                </div>
            </div>
            <div className={`${highlight} ${numberSymbol} ${hideNumberSymbol} absolute flex flex-col justify-center pl-3 h-8`}>
                {symbolToShow}
            </div>
            <input
                type={inputType[type]}
                onChange={fieldOnChange}
                value={displayValue}
                disabled={readonly}
                className={`${colorBorder} ${startPadding} dark:bg-gray-900 scrollbar-hide overflow-y-hidden dark:disabled:bg-gray-800 disabled:bg-gray-200 disabled:border-gray-500/20 disabled:text-gray-500 w-full font-light border px-4 rounded-lg outline-none h-8 text-black`}
                onFocus={() => setIsFocused(true)}
                onBlur={fieldOnBlur}
            />
        </div>
    )
}

export default InputForm;
