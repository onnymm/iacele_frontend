import { useCallback, useRef } from "react";

const useSuscribeFieldsToRead = <M extends IACele.Data.ModelName>() => {

    // Inicialización de lista de campos a leer
    const fieldsToRead = useRef<IACele.Data.ReadField<M>[]>([]);

    // Función para suscribir campo para lectura
    const suscribeFieldToRead = useCallback(
        (fieldName: IACele.Data.ReadField<M>) => {
            // Se busca el valor del campo en el array
            const foundValue = fieldsToRead.current.find(
                ( suscribedFieldName ) => {
                    // Si el tipo de dato de los campos a comparar es string...
                    if ( typeof fieldName === 'string' && typeof suscribedFieldName === 'string' ) {
                        // Se busca igualdad con los campos
                        return ( suscribedFieldName === fieldName );

                    // Si el tipo de dato de los campos a comparar es array...
                    } else if ( typeof fieldName === 'object' && typeof suscribedFieldName === 'object' ) {
                        // Extracción del campo expandido suscrito
                        const expandedSuscribedField = suscribedFieldName[0];
                        // Extracción del campo expandido a suscribir
                        const expandedField = fieldName[0];
                        // Se busca igual con los campos
                        return ( expandedSuscribedField === expandedField );
                    };

                    return false;
                },
            );
            // Si el nombre del campo no existe en el array...
            if ( !foundValue ) {
                // Se añade éste
                fieldsToRead.current.push(fieldName);
            };
        }, []
    );

    return { fieldsToRead, suscribeFieldToRead };
};

export default useSuscribeFieldsToRead;
