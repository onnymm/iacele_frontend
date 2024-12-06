interface ToggleSwitchParams {
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
    icon: IconType;
    iconOn?: IconType;
    type?: UIStyle;
    fill?: boolean;
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
 *  - [ {@link UIStyle} ] `type`: Estilo del interruptor. Las opciones
 *  disponibles son:
 *      - `primary`
 *      - `secondary`
 *      - `danger`
 *      - `success`
 *  - [ `boolean` ] `fill`: Indicador de relleno en color del interruptor. El
 *  valor por defecto es `true`.
 */ 
const ToggleSwitch: (config: ToggleSwitchParams) => (React.JSX.Element) = ({
    value,
    setValue,
    icon: Icon,
    iconOn: IconOn,
    type = 'secondary',
    fill = true,
}) => {

    const bgColor = {
        primary: "bg-main-500 dark:bg-main-500",
        secondary: "bg-slate-400 dark:bg-slate-700",
        danger: "bg-red-400",
        success: "bg-green-400",
    };

    const fillColor = {
        primary: "fill-main-500",
        secondary: "fill-slate-400",
        danger: "fill-red-400",
        success: "fill-red-400",
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
