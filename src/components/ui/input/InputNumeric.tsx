import { useState } from "react";
import InputTemplate from "./_InputTemplate";
import { InputType } from "../../types";
import { IconType } from "../../../types/commonTypes";

interface InputNumericParams {
    value: number | undefined;
    setValue: React.Dispatch<React.SetStateAction<number | undefined>>;
    min?: number;
    max?: number;
    onChange?: (controlledValue: number, event: React.ChangeEvent<HTMLInputElement>) => (void);
    onEnter?: (controlledValue: number, event: React.KeyboardEvent<HTMLInputElement>) => (void);
    onBlur?: (controlledValue: number, event: React.FocusEvent<HTMLInputElement>) => (void);
    placeholder?: string;
    visiblePlaceholder?: string;
    icon?: IconType;
}

/**
 *  ## Componente de campo numérico
 *  Este componente renderiza un campo numérico. También controla el rango
 *  inferior y superior del estado del valor provisto. Está construído sobre el
 *  componente {@link InputTemplate}.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `string | boolean` ] `value`: Estado del valor a renderizar en el campo.
 *  - [ `function` ] `onChange`: Función a ejecutar cuando el valor del campo
 *  cambia. Se retornan dos parámetros:
 *      - [`number`] `controlledValue`: Valor controlado por rango mínimo y superior.
 *      - [ {@link React.ChangeEvent} ] `event`: Evento de cambio de valor.
 *  - [ `function` ] `onEnter`: Función a ejecutar cuando se presiona la tecla
 *  `Enter`. Se retornan dos parámetros:
 *      - [`number`] `controlledValue`: Valor controlado por rango mínimo y superior.
 *      - [ {@link React.KeyboardEvent} ] `event`: Evento de teclado.
 *  - [ `function` ] `onBlur`: Función a ejecutar cuando se desenfoca el
 *  componente. Se retornan dos parámetros:
 *      - [`number`] `controlledValue`: Valor controlado por rango mínimo y superior.
 *      - [ {@link React.FocusEvent} ] `event`: Evento de foco.
 *  - [ `boolean` ] `blurOnEnter`: Indicador si el componente se va a
 *  desenfocar cuando una función fue provista al parámetro `onEnter`. El valor
 *  por defecto es `true`.
 *  - [ {@link IconType} ] `icon`: Ícono descriptivo del campo.
 *  - [ `boolean` ] `loading`: Estado de carga para componentes de campo
 *  asíncronos.
 *  - [ {@link InputType} ] `type`: Tipo de campo a renderizar. El valor por
 *  defecto es `"text"`.
 *  - [ {@link AutoCapitalizeOptions} ] `autoCapitalize`: Tipo de
 *  capitalización de la entrada de texto. El valor por defecto es `"sentences"`.
 *  - [ {@link IconType} ] `_iconOn`: Ícono de estado encendido, para
 *  componentes de campo de búsqueda.
 *  - [ {@link IconType} ] `_iconOff`: Ícono de estado apagado, para
 *  componentes de campo de búsqueda.
 */ 
const InputNumeric: (config: InputNumericParams) => (React.JSX.Element) = ({
    value,
    setValue,
    min,
    max,
    onChange,
    onEnter,
    onBlur,
    placeholder = "",
    visiblePlaceholder = "",
    icon = undefined,
}) => {

    // Uso de nuevo valor para el componente
    const [ inputValue, setInputValue ] = useState<string>(value ? String(value) : "");

    // Validación de rango
    const controlValue: () => (number) = () => {
        // Se recibe el texto y se parsea a número
        if ( !inputValue ) return 0;
        const numericValue = (Number(inputValue));

        // Validación de rango
        if ( min && numericValue < min ) {
            setInputValue( String(min) );
            return Number(min);
        } else if ( max && numericValue > max ) {
            setInputValue( String(max) );
            return Number(max);
        }
        return numericValue;
    }

    // Funciones provistas envueltas en validación de rango para controlar el flujo
    const internalOnChange: (event: React.ChangeEvent<HTMLInputElement>) => (void) = (event) => {
        // Ejecución de función provista
        if ( onChange ) {
            onChange(controlValue(), event);
            setValue(controlValue());
        } else {
            // Validación de rango
            controlValue();
        }
    }
    const internalOnEnter: (event: React.KeyboardEvent<HTMLInputElement>) => (void) = (event) => {
        // Ejecución de función provista
        if ( onEnter ) {
            onEnter(controlValue(), event);
        } else {
            // Validación de rango
            controlValue();
        }
    }
    const internalOnBlur: (event: React.FocusEvent<HTMLInputElement>) => (void) = (event) => {
        // Ejecución de función provista
        if ( onBlur ) {
            onBlur(controlValue(), event);
        } else {
            // Validación de rango
            controlValue();
        }
    }

    return (
        <InputTemplate
            value={inputValue}
            setValue={setInputValue}
            onChange={internalOnChange}
            onEnter={internalOnEnter}
            onBlur={internalOnBlur}
            type={InputType.Number}
            placeholder={placeholder}
            visiblePlaceholder={visiblePlaceholder}
            icon={icon}
        />
    )
}

export default InputNumeric;
