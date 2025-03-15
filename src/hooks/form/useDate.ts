import { useCallback, useRef, useState } from "react";
import { formatDate, parseDateToString } from "../../core/calendar/utils";

/** 
 *  ## Fecha para calendario
 *  Custom Hook crea un estado de fecha, una función de cambio de estado de
 *  fecha y una referencia del día de hoy para ser usados por el componente
 *  {@link Calendar}.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link Date | string} ] `initialDate`: Fecha de referencia inicial.
 */ 
const useDate = (initialDate: Date | string) => {

    // Inicialización del estado
    const [ value, setValue ] = useState<string>( formatDate(initialDate) );

    // Referencia del día de hoy para señalar la fecha actual en el calendario
    const todayRef = useRef<string>( parseDateToString(new Date()) );

    // Función envuelta
    const setTextValue = useCallback(
        (rawDate: Date | string) => {
            setValue( formatDate(rawDate) );
        }, []
    );

    return [ value, setTextValue as React.Dispatch<React.SetStateAction<Date | string>>, todayRef ] as const;
}

export default useDate;
