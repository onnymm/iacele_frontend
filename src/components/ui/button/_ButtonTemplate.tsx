import { createCircle } from "../../../core/uiEffects";
import ButtonIcon from "./ButtonIcon"; // eslint-disable-line
import ButtonText from "./ButtonText"; // eslint-disable-line
import ButtonTextIcon from "./ButtonTextIcon"; // eslint-disable-line

interface ButtonTemplateParams {
    className?: string;
    children: React.JSX.Element | React.JSX.Element[] | string;
    onClick: (e: GenericEvent) => void;
    disabled?: boolean;
    type?: UIStyle;
}

/** 
 *  ## Componente base de Botón
 *  Este es el componente base del que derivan los componentes
 *  {@link ButtonIcon}, {@link ButtonText} y {@link ButtonTextIcon}.
 *  
 *  `< tsx >...</ tsx >` Contiene elementos hijos.
 *  
 *  ### Parámetros de entrada:
 *  - [ `string` ] `className`: Nombres de clase para añadirse a las clases CSS
 *  del componente.
 *  - [ `function` ] `onClick`: Función a ejecutar cuando el botón es presionado.
 *  - [ `boolean` ] `disabled`: Condición para deshabilitar el botón.
 *  - [ {@link UIStyle} ]: `type`: Estilo de botón a renderizar. Las
 *  opciones disponibles son:
 *      - `primary`
 *      - `secondary`
 *      - `danger`
 *      - `success`
 */ 
const ButtonTemplate: (config: ButtonTemplateParams) => (React.JSX.Element) = ({
    className = "", // Nombres de clase
    children, // Contenido
    onClick, // Función a ejecutar
    disabled, // Desahbilitado
    type = 'secondary', // Estilo de botón a renderizar
}) => {

    // Apariencia del botón
    const buttonType = {
        primary: 'bg-main-500 sm:hover:bg-main-400 text-white border-transparent disabled:border-gray-500/50',
        secondary: 'text-gray-500 bg-white dark:bg-gray-500/30 sm:hover:bg-gray-50/20 dark:sm:hover:bg-white/10 border-gray-500/50 dark:text-white',
        danger: 'text-red-500 border-red-500/50 sm:hover:bg-red-500/20 dark:text-red-400 border dark:border-red-400/50',
        success: 'text-green-500 border-green-500/50 sm:hover:bg-green-500/20 dark:text-green-400 dark:border border-green-400/50'
    };

    // Color del efecto de pulso en el botón
    const circleEffectColor = {
        primary: 'bg-white/25',
        secondary: 'bg-gray-600/25 dark:bg-white/50',
        danger: 'bg-white/25',
        success: 'bg-white/25',
    }

    // Función de ejecución por el botón
    const handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void = ( event ) => {

        // Efecto visual de pulso
        createCircle(event, circleEffectColor[type]);

        // Ejecución de la función provista
        onClick(event);
    }

    return (
        <button
            className={`${className} ${buttonType[type]} h-12 min-w-12 sm:min-w-10 sm:h-10 p-2 w-min rounded-xl group-[.ui-layout-group]:w-full sm:text-sm whitespace-nowrap flex justify-center items-center shadow-md overflow-hidden relative active:scale-95 transition duration-150 disabled:transform-none disabled:bg-gray-300 disabled:dark:bg-transparent disabled:hover:bg-gray-300 disabled:hover:dark:bg-transparent dark:disabled:border disabled:border-transparent border disabled:dark:border-gray-500/50 disabled:dark:text-gray-500/50`}
            onClick={handleClick}
            disabled={disabled}
        >
            <div className="flex justify-center items-center content-center w-min h-full">
                {children}
            </div>
        </button>
    )
}

export default ButtonTemplate;
