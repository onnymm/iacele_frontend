import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import useAPI from "../app/useAPI";
import { useNavigate } from "react-router";
import useViewName from "../app/useViewPage";
import useReload from "../app/useReload";
import useLoadModelMetadata from "./useModelMetadata";
import useDataView from "../routes/useDataView";
import QUERY_PARAMS from "@/constants/routes/queryParams";
import useUpdateQueryParams from "./useUpdateQueryParams";
import ViewDataContext from "@/contexts/routes/viewDataContext";
import RecordEvaluator from "@/core/ttypes";

interface FieldConfig<M extends IACele.Data.ModelName> {
    name: keyof IACele.Data.ModelDefinition<M> | [keyof IACele.Data.ModelDefinition<M>, string[]];
};

type EvaluationFormData<M extends IACele.Data.ModelName> = {
    [K in keyof IACele.Data.ModelDefinition<M>]: Partial<IACele.Data.ModelDefinition<M>>[K] | null;
};

const useFormRecord = <M extends IACele.Data.ModelName>(
    modelName: M,
) => {

    const { display } = useContext(ViewDataContext);
    // Obtención de la ID del registro y nombre de la vista
    const { recordId, viewDataName } = useDataView();
    // Obtención de función para actualización de parámetros de query
    const { updateQueryParams } = useUpdateQueryParams();
    // Obtención de metadatos del modelo
    const { metadataLoaded, getFieldMetadata, modelMetadata } = useLoadModelMetadata(modelName);
    // Obtención de función para cambio de nombre de vista
    const { setViewName } = useViewName();
    // Obtención de estado y función de recarga
    const { reloadSignal, reload } = useReload();
    // Obtención de la instancia de API
    const { api } = useAPI();
    // Obtención de función de redireccionamiento
    const navigateTo = useNavigate();
    // Inicialización de estado de estado de edición
    const [ formRecord, setFormRecord ] = useState<Partial<IACele.Data.ModelDefinition<M>>>({});

    const [ evaluator, setEvaluator ] = useState<RecordEvaluator<M> | null>(null);
    // Inicialización de estado de carga
    const [ dataLoaded, setDataLoaded ] = useState<boolean>(false);
    // Inicialización de estado de datos del registro de la base de datos
    const [ recordInDatabase, setRecordInDatabase ] = useState<IACele.Data.ModelDefinition<M> | null>(null);
    // Inicialización de estado indicador de cambios existentes
    const [ existingChanges, setExistingChanges ] = useState<boolean>(false);
    // Inicialización de variable de indicador de nuevos datos existentes
    const existingNewData = Object.keys(formRecord).length !== 0;
    // Inicialización de objeto de datos para usarse en modificación de registro
    const [ dataToUpdate, setDataToUpdate ] = useState<Partial<IACele.Data.ModelDefinition<M>>>({});
    // Inicialización de lista de campos a leer
    const fieldsConfig = useRef<FieldConfig<M>[]>([]);
    // Inicialización del estado de modo de formulario
    const createMode = recordId === 0;
    // Inicialización de indicador de datos cargados
    const loaded = useMemo(
        () => (
            dataLoaded && metadataLoaded && evaluator !== null
            && (
                // Si el modo es creación, no se requieren datos iniciales
                createMode
                // Si el modo no es creación se requieren datos iniciales
                || ( !createMode && Boolean(Object.keys(formRecord).length) )
            )
        ),
        [dataLoaded, metadataLoaded, evaluator, createMode, formRecord]
    );

    // Función para actualización instancia de evaluación de datos de registro
    const updateEvaluator = useCallback(
        () => {
            // Si no existen metadatos aún...
            if ( modelMetadata === undefined ) {
                // Se establece el valor como nulo
                setEvaluator(null);
            // Si ya existen metadatos del modelo ...
            } else {
                // Inicialización de objeto de datos para validación
                const dataForValidation: Partial<EvaluationFormData<M>> = {};
                // Iteración por cada elemento de los metadatos
                modelMetadata.forEach(
                    (md) => {
                        // Obtención del valor
                        const value = formRecord[md.name as IACele.Data.FieldName<M>];
                        // Obtención de cada valor del formulario sustituyendo indefinidos por null
                        dataForValidation[md.name as any as keyof EvaluationFormData<M>] = (
                            value !== undefined
                                ? value
                                : null
                            ) as any;
                    }
                );

                // Inicialización de nueva instancia de evaluador
                const evaluatorInstance = new RecordEvaluator(dataForValidation as EvaluationFormData<M>, modelMetadata);
                // Se establece la instancia como valor de estado
                setEvaluator(evaluatorInstance);
            };
        }, [formRecord, modelMetadata]
    );

    // Efecto para actualizar el evaluador cada vez que la función se actualiza
    useEffect(
        () => {
            updateEvaluator();
        }, [updateEvaluator]
    );

    // Inicialización de función para añadir nombres de campos a leer
    const suscribeFieldToRead = useCallback(
        (config: FieldConfig<M>) => {
            // Se busca el valor del campo en el array
            const foundValue = fieldsConfig.current.find( (suscribedConfig) => (
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
                fieldsConfig.current.push(config);
            };
        }, [fieldsConfig]
    );

    // Inicialización de función que cambia valor de un campo de datos del formulario del registro
    const setFormRecordField = useCallback(
        <F extends IACele.Data.FieldName<M>>(
            name: F,
            value: IACele.Data.ModelDefinition<M>[F],
        ) => {

            // Se actualizan los datos del formulario
            setFormRecord(
                (prev) => ({
                    ...prev,
                    [name]: value,
                })
            );

            // Actualización del evaluador
            updateEvaluator();
        }, [updateEvaluator]
    );

    // Creación de la función para cambiar el modo del formulario
    const newRecord = useCallback(
        () => {
            // Se redirecciona a la ruta sin ID
            updateQueryParams({[QUERY_PARAMS.VIEW.NAME]: viewDataName})
            // Se vacía el registro del formulario
            setFormRecord({});
        }, [updateQueryParams, viewDataName]
    );

    // Inicialización de función de creación de registro en base de datos
    const createRecord = useCallback(
        async () => {
            // if ( recordInDatabase === null ) return;
            // Obtención de la ID del registro creado
            const recordId = await api.create({
                'model_name': modelName,
                'data': formRecord,
            });

            // Si el tipo de renderización es de pantalla...
            if ( display === 'screen' ) {
                // Redireccionamiento a ID creada
                updateQueryParams({
                    [QUERY_PARAMS.VIEW.ID]: recordId,
                    [QUERY_PARAMS.VIEW.NAME]: viewDataName,
                });
            };
        }, [api, formRecord, modelName, display, updateQueryParams, viewDataName]
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

            // Si el formulario está en modo de creación...
            if ( createMode ) {
                // Se retrocede una página atrás
                navigateTo(-1);
                // Se ejecuta una recarga de datos
                reload();

            // Si el formulario está en modo de lectura...
            } else {
                // Esto nunca debería suceder
                if ( recordInDatabase === null ) return;
                // Se restablecen los datos del registro de formulario con los datos del registro en la base de datos
                setFormRecord({ ...recordInDatabase });
                // Se restablecen los datos de modificación
                setDataToUpdate({});
            };
        }, [recordInDatabase, createMode, navigateTo, reload, setFormRecord]
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
        }, [formRecord, recordInDatabase]
    );

    // Se realiza una llamada a la API cada vez que se ejecuta la función de recarga
    useEffect(
        () => {
            // Función para ejecutar la lectura del registro
            const read = async () => {
                // Si el modo de formulario es lectura...
                if ( !createMode ) {
                    // Obtención de los datos desde el backend
                    const data = await api.form({
                        'model_name': modelName,
                        'record_ids': recordId,
                        'fields': fieldsConfig.current.map( (config) => (config.name) ),
                    });

                    // Se establece el estado de registro en base de datos
                    setRecordInDatabase({ ...data.record });

                    // Se establece el nombre de la vista
                    setViewName(data.name);
                } else {
                    // Se establecen el estado en nulo de registro en base de datos
                    setRecordInDatabase(null);
                    // Se establece el nombre de la vista como "Nuevo"
                    setViewName('Nuevo');
                };
                // Se establecen los datos como cargados para dar paso a la renderización
                setDataLoaded(true);
            };

            // Lectura del registro
            read();
        }, [api, createMode, fieldsConfig, modelName, recordId, setViewName, reloadSignal]
    );

    useEffect(
        () => {
            // Si no existe registro de base de datos...
            if ( recordInDatabase === null ) {
                // Se establecen los datos de formulario a un objeto vacío
                setFormRecord({});
            // Si existen registro de base de datos...
            } else {
                // Si los datos ya fueron cargados...
                if ( dataLoaded ) {
                    // Se establece una copia en los datos de formulario
                    setFormRecord({ ...recordInDatabase });
                };
            };
        }, [recordInDatabase, dataLoaded]
    );

    return {
        recordId,
        viewDataName,
        loaded,
        reload,
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
        existingNewData,
        evaluator: evaluator as RecordEvaluator<M>,
    };
};

export default useFormRecord;
