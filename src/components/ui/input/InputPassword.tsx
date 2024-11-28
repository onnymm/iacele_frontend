import { EyeIcon, EyeSlashIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import InputTemplate from "./_InputTemplate";
import { SetStateAction } from "react";
import { InputType } from "../../types";

interface InputPasswordParams {
    value: string;
    setValue: React.Dispatch<SetStateAction<string>>;
    visiblePlaceholder: string;
    onEnter?: (event: React.KeyboardEvent) => (void);
}

/**
 *  ## Componente de campo de contraseña
 *  Este componente renderiza un campo de contraseña, con botón para mostrarla
 *  u ocultarla. Está construído sobre el componente {@link InputTemplate}.
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
 */ 
const InputPassword: (config: InputPasswordParams) => (React.JSX.Element) = ({
    value,
    setValue,
    visiblePlaceholder,
    onEnter
}) => {

    return (
        <InputTemplate value={value} setValue={setValue} visiblePlaceholder={visiblePlaceholder} type={InputType.Password} _iconOn={EyeSlashIcon} _iconOff={EyeIcon} icon={LockClosedIcon} onEnter={onEnter} />
    )
}

export default InputPassword;
