import { useRef, useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import ButtonToggleIcon from "./ButtonToggleIcon";

import InputText from "./InputText"; // eslint-disable-line
import InputNumber from "./InputNumeric"; // eslint-disable-line
import InputUser from "./InputUser"; // eslint-disable-line
import InputPassword from "./InputPassword"; // eslint-disable-line
import InputSearch from "./InputSearch"; // eslint-disable-line


interface _InputParams {
    value: string | number;
    setValue: React.Dispatch<React.SetStateAction<string | number>> | React.Dispatch<React.SetStateAction<string>>;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => (void);
    onEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => (void);
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => (void);
    blurOnEnter?: boolean;
    placeholder?: string;
    visiblePlaceholder?: string;
    icon?: IconType;
    loading?: boolean;
    type?: InputType;
    autoCapitalize?: InputAutoCapitalizeType;
    _iconOn?: IconType;
    _iconOff?: IconType;
    componentBefore?: React.JSX.Element | React.JSX.Element[];
    componentAfter?: React.JSX.Element | React.JSX.Element[];
}

/**
 *  ## Componente base de campo de entrada
 *  Este es el componente base del que se derivan los componentes
 *  {@link InputText}, {@link InputNumber}, {@link InputUser},
 *  {@link InputPassword} y {@link InputSearch} entre otros.
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
 *  - [ `boolean` ] `loading`: Estado de carga para componentes de campo
 *  asíncronos.
 *  - [ {@link InputType} ] `type`: Tipo de campo a renderizar. El valor por
 *  defecto es `"text"`.
 *  - [ {@link AutoCapitalizeOptions} ] `autoCapitalize`: Tipo de
 *  capitalización de la entrada de texto. El valor por defecto es
 *  `"sentences"`.
 *  - [ {@link IconType} ] `_iconOn`: Ícono de estado encendido, para
 *  componentes de campo de búsqueda.
 *  - [ {@link IconType} ] `_iconOff`: Ícono de estado apagado, para
 *  componentes de campo de búsqueda.
 *  - [ {@link React.JSX.Element} ] `componentBefore`: Componente a renderizar
 *  en el lado izquierdo del campo.
 *  - [ {@link React.JSX.Element} ] `componentAftere`: Componente a renderizar
 *  en el lado derecho del campo.
 */ 
const InputTemplate: (config: _InputParams) => (React.JSX.Element) = ({
    value,
    setValue,
    onChange = undefined,
    onEnter = undefined,
    onBlur = undefined,
    blurOnEnter = true,
    placeholder = "",
    visiblePlaceholder = "",
    icon: Icon = undefined,
    loading = undefined,
    type = 'text',
    autoCapitalize = "sentences",
    _iconOn = undefined,
    _iconOff = undefined,
    componentBefore = undefined,
    componentAfter = undefined,
}): React.JSX.Element => {

    // Estado de indicador de foco
    const [ focus, setFocus ] = useState(false);

    // Referencia del elemento
    const inputRef = useRef<HTMLInputElement>(null);

    // Función de ejecución al haber un cambio en el valor del input
    const internalOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        // Si se provió una función de ejecución en cambio
        if ( onChange ) {
            // Se ejecuta la función provista
            onChange(event);
        }

        // Se establece el valor en el estado
        setValue(event.target.value);
    }

    const internalOnEnter: (event: React.KeyboardEvent<HTMLInputElement>) => (void) = (event) => {
        // Ejecución de la función provista
        if ( onEnter ) {
            onEnter(event);
        }
        // Se desenfoca el elemento si `blurOnEnter` está activado.
        if ( blurOnEnter ) {
            inputRef.current?.blur();
        }
    }

    // Función de ejecución a haber una tecla presionada
    const keyDownCallback = (event: React.KeyboardEvent<HTMLInputElement>) => {

        // Ejecución en tecla enter
        if ( event.key === "Enter" && onEnter ) {
            internalOnEnter(event);
        }
    }

    // Mapa de opciones de entrada
    const inputTypeOptions: {[key: string]: string} = {
        search: "text",
        password: "password",
        undefined: "text",
        number: "number",
    };

    const [ showPassword, setShowPassword ] = useState(false);
    
    const computedInputType = (
        inputTypeOptions[type] === "password"
        ? (
            showPassword
            ? "text"
            : "password"
        )
        : inputTypeOptions[type]
    );

    // Nombres de clase para espaciado en campos de tipo Contraseña
    const letterSpacing = computedInputType === "password" ? "tracking-widest" : "";

    // Clases para posicionamiento de placeholder visible
    const positionateVisiblePlaceholder = (
        focus || value
            ? "translate-y-[-25%] scale-75 -translate-x-[calc(12.5%)]"
            : ""
    );

    // Clases para resaltar el placeholder visible
    const colorVisiblePlaceholder = (
        focus
            ? "text-main-500"
            : ""
    );

    // Clases de padding left si el componente tiene ícono o no
    const hasIcon = (
        Icon
            ? "pl-12 sm:pl-10"
            : "pl-2"
    );

    // Clases de padding right si el componente tiene estado o no
    const hasStatus = (
        inputTypeOptions[type] === "password" || loading !== undefined
            ? "pr-12 sm:pr-10"
            : "pr-2"
    );

    const hasVisiblePlaceholder = (
        visiblePlaceholder
        ? "pt-4 sm:pt-3"
        : ""
    );

    const internalOnBlur: (event: React.FocusEvent<HTMLInputElement>) => (void) = (event) => {

        setFocus(false);

        if ( onBlur ) {
            onBlur(event);
        }
    };

    return (
        <div className="group-[.ui-layout-group]:w-full relative flex flex-row gap-2 w-56 max-w-full">

            {/* Compónente del lado izquierdo */}
            {componentBefore}

            <div className="relative w-full">
                {/* Sección de indicadores visuales del campo */}
                <div className="absolute flex flex-row size-full pointer-events-none">
                    {/* Ícono */}
                    {Icon &&
                        <div className="z-10 flex justify-center items-center size-12 sm:size-10">
                            <Icon className={`${colorVisiblePlaceholder} text-gray-500 size-[50%]`} />
                        </div>
                    }
                    {/* Placeholder */}
                    <div className={`${!Icon ? "pl-4" : ""} z-10 flex-grow h-full`}>
                        <div className={`${positionateVisiblePlaceholder} ${colorVisiblePlaceholder} select-none text-gray-500 transition left flex flex-row items-center size-full`}>{visiblePlaceholder}</div>
                    </div>
                    {/* Estado de carga (Para componente de campo de búsqueda) */}
                    {loading !== undefined &&
                        <div className={`${loading ? "opacity-1" : "opacity-0"} size-12 sm:size-10 z-10 flex justify-center items-center`}>
                            <ArrowPathIcon className={`text-main-500 animate-loading-spin size-[50%]`} />
                        </div>
                    }
                </div>

                {/* Campo */}
                <input
                    onFocus={() => setFocus(true)}
                    className={`${hasIcon} ${hasStatus} ${hasVisiblePlaceholder} ${letterSpacing} w-full relative border-gray-500/50 focus:border-main-500 bg-white dark:bg-gray-800 pb-0 border rounded-lg h-12 sm:h-10 sm:text-sm transition overflow-visible outline-none`}
                    type={computedInputType}
                    autoCapitalize={autoCapitalize}
                    value={value}
                    onChange={internalOnChange}
                    onKeyDown={keyDownCallback}
                    onBlur={internalOnBlur}
                    placeholder={placeholder}
                    ref={inputRef}
                    spellCheck={false}
                />

            </div>
            {type === "password" && _iconOn && _iconOff &&
                <div className="right-0 absolute flex justify-center items-center size-12 sm:size-10">
                    <ButtonToggleIcon iconOn={_iconOn} iconOff={_iconOff} value={showPassword} setValue={setShowPassword}/>
                </div>
            }

            {/* Componente del lado derecho */}
            {componentAfter}

        </div>
    );
};

export default InputTemplate;
