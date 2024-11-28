import { SetStateAction } from "react";
import { IconType } from "../../../types/commonTypes";

interface ButtonToggleIconParams {
    value: boolean; // Valor para renderizar el estado del componente.
    setValue: React.Dispatch<SetStateAction<boolean>>; // Función de cambio de estado del valor
    iconOn: IconType; // Ícono descriptivo indicador de valor activo.
    iconOff: IconType; // Ícono descriptivo indicador de valor inactivo.
}

interface IconIndicatorParams {
    icon: IconType
}

/** 
 *  ## Ícono interruptor
 *  Este componente renderiza un ícono que realiza un cambio de estado booleano.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `boolean` ] `value`: Valor para renderizar el estado del componente.
 *  - [ {@link React.Dispatch<SetStateAction>} ] `setValue`: Función de cambio
 *  de estado del valor
 *  - [ {@link IconType} ] `iconOn`: Ícono descriptivo indicador de valor
 *  activo.
 *  - [ {@link IconType} ] `iconOff`: Ícono descriptivo indicador de valor
 *  inactivo.
 */ 
const ButtonToggleIcon: (config: ButtonToggleIconParams) => (React.JSX.Element) = ({
    value,
    setValue,
    iconOn,
    iconOff
}) => {

    return (
        <button onClick={() => setValue(state => !state)} className="text-gray-500 hover:text-main-500 dark:hover:text-main-500 dark:text-gray-200 transition size-[50%]">
            <IconIndicator icon={value ? iconOn : iconOff} />
        </button>
    )
}

export default ButtonToggleIcon;

const IconIndicator: (config: IconIndicatorParams) => (React.JSX.Element) = ({ icon: Icon }) => {

    return (
        <Icon className="fill-current"/>
    )
}
