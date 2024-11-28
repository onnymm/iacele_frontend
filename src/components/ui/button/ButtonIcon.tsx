import { IconType } from "../../../types/commonTypes";
import { GenericEvent, StyleCategoryOptions } from "../../types";
import ButtonTemplate from "./_ButtonTemplate";

interface ButtonIconParams {
    className?: string;
    icon: IconType;
    onClick: (e: GenericEvent) => void;
    disabled?: boolean;
    type?: StyleCategoryOptions;
}

/** 
 *  ## Botón de ícono
 *  Este componente renderiza un botón con un ícono en él. Está construido
 *  sobre el componente base {@link ButtonTemplate}
 *  
 *  `< tsx />` Se autocierra.
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
const ButtonIcon: (config: ButtonIconParams) => (React.JSX.Element) = ({
    className = "", // Nombres de clase
    icon: Icon, // Ícono del botón
    onClick, // Función del botón
    disabled, // Estado de botón deshabilitado
    type, // Apariencia del botón
}) => {

    return (
        <ButtonTemplate className={`${className} group-[.ui-layout-group]:w-12 group-[.ui-layout-group]:sm:w-10`} onClick={onClick} disabled={disabled} type={type}>
            <div className="sm:size-5 size-7">
                <Icon className="duration-current fill-current" />
            </div>
        </ButtonTemplate>
    )
}

export default ButtonIcon;
