import { useCallback, useEffect, useMemo, useState } from "react";
import useAPI from "../app/useAPI";
import { useLocation, useNavigate } from "react-router";
import useViewName from "../app/useViewPage";
import useReload from "../app/useReload";
import useRecordId from "./useRecordId";
import useLoadModelMetadata from "./useModelMetadata";

interface FieldConfig<M extends IACele.Data.ModelName> {
    name: keyof IACele.Data.ModelDefinition<M> | [keyof IACele.Data.ModelDefinition<M>, string[]];
};

const useFormRecord = <M extends IACele.Data.ModelName>(
    modelName: M,
) => {

    // Obtención de metadatos del modelo
    const { metadataLoaded, getFieldMetadata } = useLoadModelMetadata(modelName);
    // Obtención de función para cambio de nombre de vista
    const { setViewName } = useViewName();
    // Obtención de estado y función de recarga
    const { reloadSignal, reload } = useReload();
    // Obtención de la ID del registro
    const { recordId } = useRecordId();
    // Obtención de la instancia de API
    const { api } = useAPI();
    // Obtención de función de redireccionamiento
    const navigateTo = useNavigate();
    // Obtención de ruta
    const location = useLocation();
    // Inicialización de estado de estado de edición
    const [ formRecord, setFormRecord ] = useState<Partial<IACele.Data.ModelDefinition<M>>>({});
    // Inicialización de estado de carga
    const [ dataLoaded, setDataLoaded ] = useState<boolean>(false);
    // Inicialización de estado de datos del registro de la base de datos
    const [ recordInDatabase, setRecordInDatabase ] = useState<IACele.Data.ModelDefinition<M> | null>(null);
    // Inicialización de estado indicador de cambios existentes
    const [ existingChanges, setExistingChanges ] = useState<boolean>(false);
    // Inicialización de objeto de datos para usarse en modificación de registro
    const [ dataToUpdate, setDataToUpdate ] = useState<Partial<IACele.Data.ModelDefinition<M>>>({});
    // Inicialización del estado de modo de formulario
    const [ createMode, setCreateMode ] = useState<boolean>(
        () => ( recordId === 0 )
    );
    // Inicialización de lista de campos a leer
    const fieldsConfig: FieldConfig<M>[] = useMemo(
        () => ([]), []
    );
    // Inicialización de indicador de datos cargados
    const loaded = useMemo(
        () => ( dataLoaded && metadataLoaded ),
        [dataLoaded, metadataLoaded]
    );
    // Inicialización de función para añadir nombres de campos a leer
    const suscribeFieldToRead = useCallback(
        (config: FieldConfig<M>) => {
            // Se busca el valor del campo en el array
            const foundValue = fieldsConfig.find( (suscribedConfig) => (
                suscribedConfig.name === config.name
                || (
                    (
                        typeof suscribedConfig.name === 'object'
                        && typeof config.name === 'object'
                    )
                    && suscribedConfig.name[0] === config.name[0]
                )
            ) );
            // Si el nombre del campo no existe en el array...
            if ( !foundValue ) {
                // Se añade éste
                fieldsConfig.push(config);
            };
        }, [fieldsConfig]
    );

    const [ checkChanges, setCheckChanges ] = useState<boolean>(false);

    // Inicialización de función que cambia valor de un campo de datos del formulario del registro
    const setFormRecordField = useCallback(
        <F extends IACele.Data.FieldName<M>>(
            name: F,
            value: IACele.Data.ModelDefinition<M>[F],
        ) => {

            // Se reasigna el estado
            setFormRecord(
                (prev) => {
                    prev[name] = value
                    return prev
                }
            );
            setCheckChanges((prev) => (!prev))
        }, []
    );

    // Inicialización de función para lectura de datos
    const read = useCallback(
        async () => {
            // Si el modo de formulario es lectura...
            if ( !createMode ) {
                // Obtención de los datos desde el backend
                const data = await api.form({
                    'model_name': modelName,
                    'record_ids': recordId,
                    'fields': fieldsConfig.map( (config) => (config.name) ),
                });

                setRecordInDatabase(data.record);
                setViewName(data.name);
                setFormRecord({ ...data.record });
            } else {
                setRecordInDatabase(null);
                setViewName('Nuevo');
                setFormRecord({});
            };
            setDataLoaded(true);
        }, [api, modelName, recordId, fieldsConfig, setViewName, createMode]
    );

    // Creación de la función para cambiar el modo del formulario
    const newRecord = useCallback(
        () => {
            // Se redirecciona a la ruta sin ID
            navigateTo(location.pathname);
            // Se cambia el modo del formulario
            setCreateMode(true);
            // Se vacía el registro del formulario
            setFormRecord({});
        }, [navigateTo, location]
    );

    // Inicialización de función de creación de registro en base de datos
    const createRecord = useCallback(
        async () => {
            if ( recordInDatabase === null ) return;
            // Obtención de la ID del registro creado
            const recordId = await api.create({
                'model_name': modelName,
                'data': formRecord,
            });

            // Redireccionamiento a ID creada
            navigateTo(`${location.pathname}?id=${recordId}`);
            // Se establece el modo de formulario como lectura
            setCreateMode(false);
        }, [recordInDatabase, formRecord, api, modelName, navigateTo, location]
    );

    // Inicialización de función de actualización de registro en la base de datos
    const updateRecord = useCallback(
        async () => {

            // Si no hay cambios a realizarse, se finaliza la ejecución
            if ( !existingChanges ) return;
            // Escritura del registro
            await api.update({
                'model_name': modelName,
                'record_ids': recordId,
                'data': dataToUpdate,
            });

            // Se vuelven a cargar los datos para actualizar el registro
            reload();
        }, [existingChanges, api, modelName, recordId, dataToUpdate, reload]
    );

    // Inicialización de función para deshacer cambios
    const undoChanges = useCallback(
        () => {

            // Esto nunca debería suceder
            if ( recordInDatabase === null ) return;

            // Si el formulario está en modo de creación...
            if ( createMode ) {
                // Se retrocede una página atrás
                navigateTo(-1);
                // Se establece el formulario en lectura
                setCreateMode(false);
                // Se ejecuta una recarga de datos
                reload();

            // Si el formulario está en modo de lectura...
            } else {
                // Se restablecen los datos del registro de formulario con los datos del registro en la base de datos
                setFormRecord({ ...recordInDatabase });
                // Se restablecen los datos de modificación
                setDataToUpdate({});
            };
        }, [recordInDatabase, createMode, navigateTo, setCreateMode, reload, setFormRecord]
    );

    // Inicialización de la función para eliminar el registro
    const deleteRecord = useCallback(
        async () => {

            // Si el formulario está en modo de creación no se ejecuta nada
            if ( createMode ) return;

            // Se realiza la eliminación del registro
            await api.delete({
                'model_name': modelName,
                'record_ids': recordId,
            });
            // Se redirecciona hacia atrás para eliminar el registro
            navigateTo(-1);
        }, [createMode, api, modelName, recordId, navigateTo]
    );

    // Creación de la función de guardar (Creación o modificación)
    const saveChanges = useCallback(
        async () => {

            // Si el formulario está en modo creación...
            if ( createMode ) {
                // Se ejecuta la función de creación
                await createRecord();

            // Si el formulario está en modo de lectura
            } else {
                // Se ejecuta la función de modificación
                await updateRecord();
            };
        }, [createMode, createRecord, updateRecord]
    );

    // Efecto para actualización de datos a enviar en modificación
    useEffect(
        () => {
            if ( recordInDatabase === null ) return;
            setDataToUpdate(
                (currentData) => {
                    console.log('No hace nada', recordInDatabase === formRecord);
                    // Copia de los datos entrantes a la función
                    const dataToUpdateCopy = { ...currentData };

                    // Obtención de los nombres de campo del registro
                    const fieldNames = Object.keys(formRecord) as IACele.Data.FieldName<M>[];

                    // Se inicia el estado de cambios en falso
                    setExistingChanges(false);

                    // Se llena el objeto que se usará para actualizar los datos del registro
                    fieldNames.forEach(
                        ( fieldName ) => {
                            // Si hay diferencias de valores...
                            if ( formRecord[fieldName] !== recordInDatabase[fieldName] ) {
                                // Asignación del valor
                                dataToUpdateCopy[fieldName] = formRecord[fieldName];
                                // Se establece el indicador de cambios a verdadero
                                setExistingChanges(true);
                            };
                        }
                    );

                    return dataToUpdateCopy;
                }
            );
        }, [formRecord, recordInDatabase, checkChanges]
    );

    // Se realiza una llamada a la API cada vez que se ejecuta la función de recarga
    useEffect(
        () => {
            read();
        }, [read, reloadSignal]
    );

    return {
        loaded,
        reload,
        recordId,
        createMode,
        suscribeFieldToRead,
        setFormRecordField,
        newRecord,
        undoChanges,
        deleteRecord,
        saveChanges,
        formRecord,
        getFieldMetadata,
        existingChanges,
    };
};

export default useFormRecord;
