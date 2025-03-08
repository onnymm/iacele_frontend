import { useState } from "react";

/** 
 *  ## Estado de valor de registro
 *  Este Custom Hook realiza la creación del estado y la función de cambio de
 *  estado para el valor del registro a renderizar en el componente
 *  {@InputForm}. La función de cambio de estado retornada es una función
 *  envuelta que realiza la validación del dato entrante y lo corrige si es
 *  necesario antes de realizar el cambio del estado.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */ 
const useRecordValue = (
    dataValue: IACele.Types.ValueType
) => {

    // Inicialización del estado a usar
    const [ value, setValue ] = useState<IACele.Types.ValueType>(dataValue ?? undefined)

    // Función para cambiar el valor del estado de manera controlada
    const setRecordValue = (newValue: IACele.Types.ValueType): (void) => {
        setValue(newValue ?? undefined)
    }

    return [ value, setRecordValue ] as const;
}

export default useRecordValue;
