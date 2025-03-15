import React, { useRef } from "react";
import useDropdownOverflow from "../../hooks/ui/useDropdown";

interface FieldDropdownParams extends GenericInvolverComponent {
    show: boolean; // Mostrar el componente.
}

/** 
 *  ## Dropdown para campo de formulario
 *  Este componente renderiza un dropdown para utiizar herramientas como
 *  {@link Calendar} y autocompletar los valores del campo que lo utiliza.
*   
*  `< tsx >...</ tsx >` Contiene elementos hijos.
*   
*   ### Parámetros de entrada
*  - [ `boolean` ] `show`: Mostrar el componente.
*/  
const FieldDropdown: (config: FieldDropdownParams) => (React.JSX.Element) = ({
    show,
    children
}) => {

    // Referencia para el elemento HTML del Dropdown
    const dropdownRef = useRef<HTMLDivElement>(null);
    // Estado para reposicionar el Dropdown dependiendo de la altura de la ventana
    const overflowed = useDropdownOverflow(dropdownRef);

    return (
        <div ref={dropdownRef} className={`${show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} ${overflowed ? 'bottom-8' : 'top-8'} z-50 right-0 absolute transition-opacity duration-200`}>
            {children}
        </div>
    )
}

export default React.memo(FieldDropdown);
