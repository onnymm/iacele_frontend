import { useCallback, useEffect, useState } from "react";
import useAPI from "../app/useAPI";
import useReload from "../app/useReload";
import useGetModelNameFromView from "./useGetModelNameFromView";
import useSuscribeFieldsToRead from "./useSuscribeFieldsToRead";

const useReadRecordsFromAPI = <M extends IACeleV2.Data.ModelName>() => {

    // Obtención del nombre del modelo
    const { modelName } = useGetModelNameFromView<M>();
    // Obtención de la instancia de conexión a la API
    const { api } = useAPI();
    // Obtención de estado y función de recarga
    const { reload, reloadSignal } = useReload();
    // Inicialización de estado de datos del registro de la base de datos
    const [ dataFromAPI, setDataFromAPI ] = useState<IACeleV2.Data.RecordFromDatabase<M>[] | null>(null);
    // Inicialización de lista de campos a leer
    const { fieldsToRead, suscribeFieldToRead } = useSuscribeFieldsToRead<M>();

    // Función para leer el registro
    const read = useCallback(
        async (fieldsToRead: React.RefObject<IACeleV2.Data.ReadField<M>[]>) => {
            // Obtención de los datos desde la API
            const data = await api.treeV2({
                'model_name': modelName,
                'fields': fieldsToRead.current,
                'limit': 40,
            });
            // Se establece el estado de los datos
            setDataFromAPI(data['data']);
        }, [api, modelName]
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
    };
};

export default useReadRecordsFromAPI;
