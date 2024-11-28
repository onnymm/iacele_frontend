import { IconType } from "../../../types/commonTypes";
import { StyleCategory, StyleCategoryOptions } from "../../types";

interface ToggleSwitchParams {
    value: boolean; // Valor para renderizar el estado del componente.
    setValue: React.Dispatch<React.SetStateAction<boolean>>; // Función de cambio de estado del valor.
    icon: IconType; // Ícono descriptivo indicador de valor activo.
    iconOn?: IconType; // Ícono descriptivo indicador de valor inactivo.
    type?: StyleCategoryOptions; // Estilo del interruptor.
    fill?: boolean; // Indicador de relleno en color del interruptor. El valor por defecto es `true`.
}

interface StateIconParams {
    icon: IconType;
}

/** 
 *  ## Botón interruptor
 *  Este componente renderiza un botón interruptor que realiza un cambio de
 *  estado booleano.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `boolean` ] `value`: Valor para renderizar el estado del componente.
 *  - [ {@link React.Dispatch<React.SetStateAction<boolean>>} ] `setValue`:
 *  Función de cambio de estado del valor.
 *  - [ {@link IconType} ] `icon`: Ícono descriptivo indicador de valor activo.
 *  - [ {@link IconType} ] `iconOn`: Ícono descriptivo indicador de valor
 *  inactivo.
 *  - [ {@link StyleCategoryOptions} ] `type`: Estilo del interruptor.
 *  - [ `boolean` ] `fill`: Indicador de relleno en color del interruptor. El
 *  valor por defecto es `true`.
 */ 
const ToggleSwitch: (config: ToggleSwitchParams) => (React.JSX.Element) = ({
    value,
    setValue,
    icon: Icon,
    iconOn: IconOn,
    type = StyleCategory.Secondary,
    fill = true,
}) => {

    const bgColor = {
        [StyleCategory.Primary]: "bg-main-500 dark:bg-main-500",
        [StyleCategory.Secondary]: "bg-slate-400 dark:bg-slate-700",
        [StyleCategory.Danger]: "bg-red-400",
        [StyleCategory.Success]: "bg-green-400",
    };

    const fillColor = {
        [StyleCategory.Primary]: "fill-main-500",
        [StyleCategory.Secondary]: "fill-slate-400",
        [StyleCategory.Danger]: "fill-red-400",
        [StyleCategory.Success]: "fill-red-400",
    };

    // Componente del ícono
    const StateIcon: (config: StateIconParams) => (React.JSX.Element | undefined) = ({ icon: Icon }) => {

        // Si hay ícono se retorna éste
        if ( Icon ) {
            return (
                <Icon className={`${ value && fill ? `${fillColor[type]}` : "fill-gray-500 dark:fill-gray-400" } size-3`} />
            );
        // En caso contrario se retorna `null`
        } else {
            return undefined;
        }
    };

    // Ícono a renderizar en base a los SVGs provistos y el valor del estado
    const IconToRender = (
        IconOn
            // Si fue provisto un ícono de indicador de estado activo
            ? (
                // Indicadores de valor de estado
                value ? IconOn : Icon
            )
            // Si sólo fue provisto el ícono general sólo se muestra éste.
            : Icon
    );

    return (
        <button onClick={() => setValue( (prevState) => (!prevState) )} className={`${value ? bgColor[type] : ""} bg-gray-300 dark:bg-gray-900 shadow-inverted p-[2px] rounded-full w-12 h-6 duration-100`}>
            <div className={`${value ? "translate-x-6" : ""} flex items-center justify-center transition shadow-button-round rounded-full bg-gray-50 size-5 dark:bg-gray-800`}>
                <StateIcon icon={IconToRender} />
            </div>
        </button>
    );
}

export default ToggleSwitch;
