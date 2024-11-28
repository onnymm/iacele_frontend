import { GenericEvent, StyleCategoryOptions } from "../../types";
import ButtonTemplate from "./_ButtonTemplate";

interface ButtonTextParams {
    className?: string;
    children: React.JSX.Element | string;
    onClick: (e: GenericEvent) => void;
    disabled?: boolean;
    type?: StyleCategoryOptions;
}

/** 
 *  ## Botón de texto
 *  Este componente renderiza un botón con un texto en él. Está construido
 *  sobre el componente base {@link ButtonTemplate}
 *  
 *  `< tsx >...</ tsx >` Contiene elementos hijos.
 *  
 *  ### Parámetros de entrada:
 *  - [ `string` ] `className`: Nombres de clase para añadirse a las clases CSS
 *  del componente.
 *  - [ `function` ] `onClick`: Función a ejecutar cuando el botón es presionado.
 *  - [ `boolean` ] `disabled`: Condición para deshabilitar el botón.
 *  - [ {@link StyleCategory} ]: `type`: Estilo de botón a renderizar. Las
 *  opciones disponibles son:
 *      - `primary`
 *      - `secondary`
 *      - `danger`
 *      - `success`
 */ 
const ButtonText: (config: ButtonTextParams) => (React.JSX.Element) = ({
    className = "", // Nombres de clase
    children, // Contenido
    onClick, // Función a ejecutar
    disabled, // Deshabilitado
    type, // Estilo del botón a renderizar
}) => {

    return (
        <ButtonTemplate className={className} type={type} onClick={onClick} disabled={disabled}>
            {children}
        </ButtonTemplate>
    )
}

export default ButtonText;