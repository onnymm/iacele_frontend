import { useCallback, useEffect, useMemo, useState } from "react";
import useAPI from "../app/useAPI";
import useReload from "../app/useReload";
import useGetModelNameFromView from "./useGetModelNameFromView";
import useSuscribeFieldsToRead from "./useSuscribeFieldsToRead";
import useModelMetadata from "./useModelMetadata";

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
    // Inicialización de valores de paginación
    const { page, setPage, limit, totalPages, initializeTotalItems, offset } = usePagination();

    // Función para leer el registro
    const read = useCallback(
        async (fieldsToRead: React.RefObject<IACele.Data.ReadField<M>[]>) => {
            // Obtención de los datos desde la API
            const data = await api.tree({
                'model_name': modelName,
                'fields': fieldsToRead.current,
                'offset': offset,
                'limit': limit,
                'sortby': sortby['sortby'],
                'ascending': sortby['ascending'],
            });
            // Se establece el estado de los datos
            setDataFromAPI(data['data']);
            // Se establece el número total de elementos
            initializeTotalItems(data['count']);
        }, [api, initializeTotalItems, limit, modelName, offset, sortby]
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
        page,
        setPage,
        limit,
        totalPages,
    };
};

export default useReadRecordsFromAPI;

const usePagination = () => {

    // Inicialización de valor de página
    const [ page, setPage ] = useState<number>(0);
    // Inicialización de valor de elementos por página
    const [ limit ] = useState<number>(40);

    // Inicialización de elementos totales
    const [ totalItems, setTotalItems ] = useState<number | null>(0);

    const totalPages = useMemo(
        () => (
            totalItems !== null
                ? (
                    Math.ceil(totalItems / limit)
                )
                : 1
        ), [limit, totalItems]
    );

    // Función para inicializar el número total de elementos
    const initializeTotalItems = useCallback(
        (n: number) => {
            setTotalItems(n);
        }, []
    );

    const offset = useMemo(
        () => (page * limit),
        [page, limit]
    );

    return { page, setPage, limit, totalPages, initializeTotalItems, offset };
};

const useSortby = <M extends IACele.Data.ModelName>() => {

    // Obtención de los metadatos del modelo
    const { modelMetadata } = useModelMetadata<M>();

    // Inicialización de valor de ordenamiento por columna
    const [ sortby, setSortby ] = useState<IACele.View.Sortby<M>>({
        sortby: null,
        ascending: null,
    });

    // Función para cambiar el ordenamiento
    const toggleSortby = useCallback(
        (fieldName: IACele.Data.FieldName<M>) => {

            // Obtención del tipo de dato del campo
            const ttype = modelMetadata[fieldName]['ttype']
            // Inicialización de valor de nombre de campo para reordenar los datos
            const sortingFieldName: IACele.Data.FieldName<M> = (
                ttype === 'many2one'
                    ? `${String(fieldName)}.display_name` as IACele.Data.FieldName<M>
                    : fieldName
            );

            // Cambio de estado
            setSortby(
                (prev) => {
                    // Si no hay campo ordenando o el campo actual es distinto al ingresado...
                    if ( prev['sortby'] === null || prev['sortby'] !== sortingFieldName ) {
                        // Se establece el ordenamiento ascendente por el campo entrante
                        return ({
                            sortby: sortingFieldName,
                            ascending: true,
                        });
                    // Si el campo actual es igual al campo entrante...
                    } else {
                        // Si el ordenamiento es ascendente...
                        if ( prev['ascending'] === true ) {
                            // Se establece ordenamiento descendente por el campo entrante
                            return ({
                                sortby: sortingFieldName,
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
        }, [modelMetadata]
    );

    return { sortby, toggleSortby };
};
