import { useEffect, useState } from "react";

/** 
 *  ## Desbordamiento vertical de Dropdown
 *  Este componente renderiza un estado que indica si un Dropdown se
 *  desbordaríade la ventana al desplegarse hacia abajo, permitiendo que éste
 *  se posicione hacia arriba alternativamente si este escenario se presenta.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link React.RefObject<HTMLDivElement>} ] `dropdownRef`: Referencia del
 *  componente del Dropdown.
 */ 
const useDropdownOverflow = (dropdownRef: React.RefObject<HTMLDivElement>) => {

    // Obtención de la altura de la ventana
    const windowHeight = window.innerHeight;
    // Inicialización del estado
    const [ overflowed, setOverflowed ] = useState<boolean>(false);

    useEffect(
        () => {
            // Si existe el elemento HTML...
            if ( dropdownRef.current ) {
                const { y, height } = dropdownRef.current.getBoundingClientRect();
                if ( y + height > windowHeight ) {
                    // Si la posición Y del contenedor mas su altura exceden la altura de la ventana...
                    setOverflowed(true);
                } else {
                    // Si la posición Y del contenedor mas su altura no exceden la altura de la ventana...
                    setOverflowed(false);
                }
            }
        }, [dropdownRef, windowHeight]
    );

    return overflowed;
}

export default useDropdownOverflow;
