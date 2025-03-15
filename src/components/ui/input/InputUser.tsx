import { UserIcon } from "@heroicons/react/24/solid";
import InputTemplate from "./_InputTemplate";

interface InputUserParams {
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>;
    visiblePlaceholder: string;
    onEnter?: (event: React.KeyboardEvent) => (void);
}

/**
 *  ## Campo de usuario
 *  Este componente renderiza un campo de entrada para utilizarse como entrada
 *  de un nombre de usuario, con los beneficios del ícono, el tipo de valor y
 *  el comportamiento del campo adecuados para éste. Está construído sobre el
 *  componente {@link InputTemplate}.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `string | boolean` ] `value`: Estado del valor a renderizar en el campo.
 *  - [ {@link React.Dispatch} ] `setValue`: Función de cambio de estado para
 *  `value`.
 *  - [ `string` ] `visiblePlaceholder`: Placeholder siempre visible en el 
 *  campo, contenga valor o no.
 *  - [ `function` ] `onEnter`: Función a ejecutar cuando se presiona la tecla
 *  `Enter`.
 */ 
const InputUser: (config: InputUserParams) => (React.JSX.Element) = ({
    value,
    setValue,
    visiblePlaceholder,
    onEnter,
}) => {

    return (
        <InputTemplate
            value={value}
            setValue={setValue}
            visiblePlaceholder={visiblePlaceholder}
            icon={UserIcon}
            autoCapitalize={'off'}
            onEnter={onEnter}
        />
    );
};

export default InputUser;