import { IconType } from "../../../types/commonTypes";
import { GenericEvent } from "../../types";
import ButtonTemplate from "./_ButtonTemplate";

interface ButtonTextParams {
    className?: string;
    icon: IconType;
    children: React.JSX.Element | string | (React.JSX.Element | string)[];
    onClick: (e: GenericEvent) => void;
    disabled?: boolean;
    type?: UIStyle;
}

/** 
 *  ## Botón de ícono
 *  Este componente renderiza un botón con un ícono y un texto en él. Está
 *  construido sobre el componente base {@link ButtonTemplate}
 *  
 *  `< tsx >...</ tsx >` Contiene elementos hijos.
 *  
 *  ### Parámetros de entrada:
 *  - [ `string` ] `className`: Nombres de clase para añadirse a las clases CSS
 *  del componente.
 *  - [ {@link IconType} ] `icon`: Ícono a renderizar.
 *  - [ `function` ] `onClick`: Función a ejecutar cuando el botón es presionado.
 *  - [ `boolean` ] `disabled`: Condición para deshabilitar el botón.
 *  - [ {@link StyleCategory} ]: `type`: Estilo de botón a renderizar. Las
 *  opciones disponibles son:
 *      - `primary`
 *      - `secondary`
 *      - `danger`
 *      - `success`
 */ 
const ButtonTextIcon: (config: ButtonTextParams) => (React.JSX.Element) = ({
    className = "", // Nombres de clase
    icon: Icon, // Ícono del botón
    children, // Contenido
    onClick, // Función del botón
    disabled, // Estado de botón deshabilitado
    type, // Apariencia del botón
}) => {

    return (
        <ButtonTemplate className={className} onClick={onClick} disabled={disabled} type={type}>
            <div className="mr-2 sm:ml-1 h-[75%] duration-current aspect-square fill-current">
                {Icon && <Icon />}
            </div>
            <div className="flex flex-row items-center gap-1 pr-2">
                {children}
            </div>
        </ButtonTemplate>
    )
}

export default ButtonTextIcon;
