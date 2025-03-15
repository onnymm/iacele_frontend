import React from "react";
import { inputType } from "../../core";
import CalendarTool from "../../../widgets/field/CalendarWidget";

interface KeyboardInputParams extends IACele.UI.Core.Input {
    recordValue: IACele.Types.ValueType;
    setDisplayValue: React.Dispatch<React.SetStateAction<string | boolean>>; // Función de cambio de estado de valor a mostrar en el campo.
    formatRecordValue: (value: string) => IACele.Types.ValueType; // Función para formatear el valor del campo.
    parseValueToDisplay: (value: IACele.Types.ValueType) => string | boolean; // Función para parsear el valor a mostrar en el campo.
    setIsFocused: React.Dispatch<React.SetStateAction<boolean>>; // Función de cambio de estado de enfocado.
}

/** 
 *  ## Campo de teclado
 *  Este componente renderiza un campo de texto o numérico (entero o flotante)
 *  manipulable por medio del teclado.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `name`: Nombre del campo en la tabla de la base de datos.
 *  - [ `string` ] `title`: Nombre visible del campo en el placeholder.
 *  - [ {@link IACele.Types.TypeName} ] `type`: Tipo de valor del campo.
 *  - [ `boolean` ] `readonly`: Modo "sólo lectura".
 *  - [ {@link string | boolean} ] `displayValue`: Valor a mostrar en el campo.
 *  - [ `boolean` ] `isFocused`: El campo está enfocado.
 *  - [ `undefined` ] `setRecordValue`: Función de cambio de estado de valor
 *  del registro.
 *  - [ {@link React.Dispatch<React.SetStateAction<boolean>>} ]
 *  `setDataChanged`: Función de cambio de estado de cambio de datos.
 *  - [ `undefined` ] `setFormValue`: Función de cambio de estado de valor de
 *  formulario.
 *  - [ {@link React.Dispatch<React.SetStateAction<string | boolean>>} ]
 *  `setDisplayValue`: Función de cambio de estado de valor a mostrar en el
 *  campo.
 *  - [ `undefined` ] `formatRecordValue`: Función para formatear el valor del
 *  campo.
 *  - [ `undefined` ] `parseValueToDisplay`: Función para parsear el valor a
 *  mostrar en el campo.
 *  - [ {@link React.Dispatch<React.SetStateAction<boolean>>} ] `setIsFocused`:
 *  Función de cambio de estado de enfocado.
 */ 
const KeyboardInput: (config: KeyboardInputParams) => (React.JSX.Element) = ({
    name,
    title,
    type,
    readonly = false,
    displayValue,
    isFocused,
    recordValue,
    setRecordValue,
    setDataChanged,
    setFormValue,
    setDisplayValue,
    formatRecordValue,
    parseValueToDisplay,
    setIsFocused,
}) => {

    // Posición del placeholder visible
    const visiblePlaceholderPosition = (
        isFocused || displayValue !== ''
            ? 'translate-y-[-75%] scale-75 -translate-x-[12.5%]'
            : ''
    );

    // Resaltar color del placeholder
    const highlight = (
        (isFocused)
            ? 'text-main-500'
            : 'dark:text-gray-400 text-gray-500'
    );

    // Resaltar color del borde del campo
    const colorBorder = (
        (isFocused)
            ? 'border-main-500'
            : 'border-gray-500/50'
    );

    // Estilización del símbolo de campo numérico
    const numberSymbol = (
        type === 'monetary'
            ? ''
            : type === 'percentage'
                ? 'right-8'
                : type === 'date'
                    ? 'right-2'
                    : 'hidden'
    );

    // Se muestra o se oculta símbolo de campo numérico
    const hideNumberSymbol = (
        !isFocused && displayValue === ''
            ? 'hidden'
            : ''
    );

    // Símbolo a mostrar en campo numérico
    const symbolToShow = (
        type === 'monetary'
            ? '$'
            : type === 'percentage'
                ? '%'
                : ''
    );

    // Espaciado inicial en input
    const startPadding = (
        type === 'monetary'
            ? 'pl-8'
            : ''
    );

    // Función a ejecutar cuando el campo es desenfocado
    const fieldOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        // Se cambia el estado a desenfocado
        setIsFocused(false);
        // Creación del valor formateado y corregido en caso de ser necesario
        const formattedValue = formatRecordValue(event.target.value);
        // Se prepara el valor en los cambios del formulario para una posible escritura de éstos
        if ( formattedValue !== recordValue ) setFormValue(name, formattedValue);
        // Se establece el valor en el input
        setRecordValue(formattedValue);
        // Se establece el valor a mostrar en el campo
        setDisplayValue( parseValueToDisplay(formattedValue) );
    };

    // Función a ejecutar cuando el valor del campo cambia
    const fieldOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Se establece el valor a mostrar en el campo
        setDisplayValue( event.target.value );
        // Se actualiza el contexto para indicar que hay cambios en los datos
        setDataChanged(true);
    };

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
                value={displayValue as string}
                disabled={readonly}
                className={`${colorBorder} ${startPadding} dark:bg-gray-900 scrollbar-hide overflow-y-hidden dark:disabled:bg-gray-800 disabled:bg-gray-200 disabled:border-gray-500/20 disabled:text-gray-500 w-full font-light border px-4 rounded-lg outline-none h-8 text-black`}
                onFocus={() => setIsFocused(true)}
                onBlur={fieldOnBlur}
            />
            {type === 'date' && !readonly && typeof displayValue === 'string' &&
                <CalendarTool
                    setRecordValue={setRecordValue}
                    setDisplayValue={setDisplayValue}
                    parseValueToDisplay={parseValueToDisplay}
                    setDataChanged={setDataChanged}
                    setFormValue={setFormValue}
                    displayValue={displayValue}
                    recordValue={recordValue}
                    name={name}
                    isFocused={isFocused}
                />
            }
        </div>
    );
};

export default React.memo(KeyboardInput);
