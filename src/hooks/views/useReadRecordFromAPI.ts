import { useCallback, useEffect, useRef, useState } from "react";
import useAPI from "../app/useAPI";
import useReload from "../app/useReload";
import useDataView from "../routes/useDataView";
import useGetModelNameFromView from "./useGetModelNameFromView";

const useReadRecordFromAPI = <M extends IACeleV2.Data.ModelName>() => {

    // Obtención del tipo de renderización, la ID del registro y nombre de la vista
    const { recordId } = useDataView();
    // Obtención del nombre del modelo
    const { modelName } = useGetModelNameFromView<M>();
    // Obtención de la instancia de API
    const { api } = useAPI();
    // Obtención de estado y función de recarga
    const { reloadSignal, reload } = useReload();
    // Inicialización de estado de datos del registro de la base de datos
    const [ dataFromAPI, setDataFromAPI ] = useState<IACeleV2.Data.RecordFromDatabase<M> | null>(null);
    // Inicialización de lista de campos a leer
    const fieldsToRead = useRef<IACeleV2.Data.ReadField<M>[]>([]);

    // Función para suscribir campo para lectura
    const suscribeFieldToRead = useCallback(
        (fieldName: IACeleV2.Data.ReadField<M>) => {
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

    // Función para leer el registro
    const read = useCallback(
        async () => {
            // Obtención de los datos desde la API
            const data = await api.formv2({
                'model_name': modelName,
                'record_ids': recordId,
                'fields': fieldsToRead.current,
            });
            // Se establece el estado de los datos
            setDataFromAPI({ ...data['record'] });
        }, [api, modelName, recordId]
    );

    // Función para actualizar el valor
    const updateRecordInDatabase = useCallback(
        async (recordInEdition: IACeleV2.Data.EditableRecord<M>) => {

            // Se envían los datos a guardar
            await api.updateV2({
                'model_name': modelName,
                'record_ids': [recordId],
                'data': recordInEdition,
            });
        }, [api, modelName, recordId]
    );

    // Función para eliminar el registro
    const deleteRecordInDatabase = useCallback(
        async () => {

            // Se envían los datos para eliminar el registro
            await api.deleteV2({
                'model_name': modelName,
                'record_ids': [recordId],
            });
        }, [api, modelName, recordId]
    );

    // Efecto para ejecutar la función de lectura
    useEffect(
        () => {
            read();
        }, [read, reloadSignal]
    );

    return {
        recordId,
        dataFromAPI,
        suscribeFieldToRead,
        reload,
        updateRecordInDatabase,
        deleteRecordInDatabase,
    };
};

export default useReadRecordFromAPI;
