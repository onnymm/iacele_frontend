import { useCallback, useEffect, useState } from "react";
import useAPI from "../app/useAPI";
import useReload from "../app/useReload";
import useGetModelNameFromView from "./useGetModelNameFromView";
import useSuscribeFieldsToRead from "./useSuscribeFieldsToRead";

const useReadRecordsFromAPI = <M extends IACele.Data.ModelName>() => {

    // Obtención del nombre del modelo
    const { modelName } = useGetModelNameFromView<M>();
    // Obtención de la instancia de conexión a la API
    const { api } = useAPI();
    // Obtención de estado y función de recarga
    const { reload, reloadSignal } = useReload();
    // Inicialización de estado de datos del registro de la base de datos
    const [ dataFromAPI, setDataFromAPI ] = useState<IACele.Data.RecordFromDatabase<M>[] | null>(null);
    // Inicialización de lista de campos a leer
    const { fieldsToRead, suscribeFieldToRead } = useSuscribeFieldsToRead<M>();
    // Inicialización de función y valores para establecer el ordenamiento
    const { sortby, toggleSortby } = useSortby<M>();

    // Función para leer el registro
    const read = useCallback(
        async (fieldsToRead: React.RefObject<IACele.Data.ReadField<M>[]>) => {
            // Obtención de los datos desde la API
            const data = await api.tree({
                'model_name': modelName,
                'fields': fieldsToRead.current,
                'limit': 40,
                'sortby': sortby['sortby'],
                'ascending': sortby['ascending'],
            });
            // Se establece el estado de los datos
            setDataFromAPI(data['data']);
        }, [api, modelName, sortby]
    );

    // Efecto para ejecutar la función de lectura
    useEffect(
        () => {
            read(fieldsToRead);
        }, [read, reloadSignal, fieldsToRead]
    );

    return {
        dataFromAPI,
        fieldsToRead,
        suscribeFieldToRead,
        reload,
        toggleSortby,
        sortby,
    };
};

export default useReadRecordsFromAPI;

const useSortby = <M extends IACele.Data.ModelName>() => {

    // Inicialización de valor de ordenamiento por columna
    const [ sortby, setSortby ] = useState<IACele.View.Sortby<M>>({
        sortby: null,
        ascending: null,
    });

    // Función para cambiar el ordenamiento
    const toggleSortby = useCallback(
        (fieldName: IACele.Data.FieldName<M>) => {

            // Cambio de estado
            setSortby(
                (prev) => {
                    // Si no hay campo ordenando o el campo actual es distinto al ingresado...
                    if ( prev['sortby'] === null || prev['sortby'] !== fieldName ) {
                        // Se establece el ordenamiento ascendente por el campo entrante
                        return ({
                            sortby: fieldName,
                            ascending: true,
                        });
                    // Si el campo actual es igual al campo entrante...
                    } else {
                        // Si el ordenamiento es ascendente...
                        if ( prev['ascending'] === true ) {
                            // Se establece ordenamiento descendente por el campo entrante
                            return ({
                                sortby: fieldName,
                                ascending: false,
                            });
                        // Si el ordenamiento es descendente
                        } else {
                            // Se restablece el ordenamiento a nulo
                            return ({
                                sortby: null,
                                ascending: null,
                            });
                        };
                    };
                }
            );
        }, []
    );

    return { sortby, toggleSortby };
};
