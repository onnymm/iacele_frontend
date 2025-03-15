import { useEffect, useState } from "react";
import InputTemplate from "./_InputTemplate";

interface InputTextParams {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string | number>> | React.Dispatch<React.SetStateAction<string>>;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => (void);
    onEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => (void);
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => (void);
    blurOnEnter?: boolean;
    maxLength?: number;
    placeholder?: string;
    visiblePlaceholder?: string;
    icon?: IconType;
    autoCapitalize?: InputAutoCapitalizeType;
}

/**
 *  ## Componente campo de texto
 *  Este componente renderiza un campo de texto. También controla la longitud
 *  máxima del valor. Está construído sobre el componente
 *  {@link InputTemplate}.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `string | boolean` ] `value`: Estado del valor a renderizar en el
 *  campo.
 *  - [ {@link React.Dispatch<React.SetStateAction>} ] `setValue`: Función de cambio
 *  de estado para
 *  `value`.
 *  - [ `function` ] `onChange`: Función a ejecutar cuando el valor del campo
 *  cambia.
 *  - [ `function` ] `onEnter`: Función a ejecutar cuando se presiona la tecla
 *  `Enter`.
 *  - [ `function` ] `onBlur`: Función a ejecutar cuando se desenfoca el
 *  componente.
 *  - [ `boolean` ] `blurOnEnter`: Indicador si el componente se va a
 *  desenfocar cuando una función fue provista al parámetro `onEnter`. El valor
 *  por defecto es `true`.
 *  - [ `string` ] `placeholder`: Placeholder del campo cuando éste está vacío.
 *  - [ `string` ] `visiblePlaceholder`: Placeholder siempre visible en el 
 *  campo, contenga valor o no.
 *  - [ {@link IconType} ] `icon`: Ícono descriptivo del campo.
 *  - [ {@link AutoCapitalizeOptions} ] `autoCapitalize`: Tipo de
 *  capitalización de la entrada de texto. El valor por defecto es
 *  `"sentences"`.
 */ 
const InputText: (config: InputTextParams) => (React.JSX.Element) = ({
    value,
    setValue,
    onChange,
    onEnter,
    onBlur,
    blurOnEnter,
    maxLength,
    placeholder,
    visiblePlaceholder,
    icon,
    autoCapitalize = 'sentences',
}) => {

    // Valor controlado
    const [ inputValue, setInputValue ] = useState<string>(value);

    // Control de longitud
    useEffect(
        () => {
            if ( maxLength && inputValue.length > maxLength ) {
                setInputValue(inputValue.slice(0, maxLength));
            } else {
                setValue(inputValue);
            }
        }, [maxLength, inputValue, setValue]
    );

    return (
        <InputTemplate
            value={value}
            setValue={setInputValue}
            type={'text'}
            autoCapitalize={autoCapitalize}
            onChange={onChange}
            onEnter={onEnter}
            onBlur={onBlur}
            blurOnEnter={blurOnEnter}
            placeholder={placeholder}
            visiblePlaceholder={visiblePlaceholder}
            icon={icon}
        />
    );
};

export default InputText;
