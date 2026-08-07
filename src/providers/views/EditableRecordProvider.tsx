import EditableRecordContext from "@/contexts/views/editableRecordContext";
import useAPI from "@/hooks/app/useAPI";
import useDataView from "@/hooks/routes/useDataView";
import useGetModelNameFromView from "@/hooks/views/useGetModelNameFromView";
import useModelMetadata from "@/hooks/views/useModelMetadata";
import useOriginalRecord from "@/hooks/views/useOriginalRecord";
import { useCallback, useEffect, useState } from "react";

const EditableRecordProvider = <M extends IACeleV2.Data.ModelName>({
    children,
}: IACele.Common.SupportsChildren) => {

    // Obtención de la instancia de conexión a la API
    const { api } = useAPI();
    // Obtención del nombre del modelo de la vista
    const { modelName } = useGetModelNameFromView<M>();
    // Obtención de los datos del registro original desde el contexto
    const { recordId, originalRecord, updateOriginalRecord, reload } = useOriginalRecord<M>();
    // Inicialización de estado del objeto de registro en edición
    const [ editableRecord, setEditableRecord ] = useState<IACeleV2.Data.EditableRecord<M>>({});
    // Obtención de función para obtener los metadatos de los campos del modelo
    const { modelMetadata } = useModelMetadata<M>();
    // Inicialización de función para deshacer cambios
    const undoChangesInEditableRecord = useCallback(
        () => {
            setEditableRecord({});
        }, []
    );
    // Obtención de funciones de ejecución tras creación/modificación
    const { onCreate, onUpdate } = useDataView();

    // Inicialización de indicador booleano de cambios existentes
    const existingChanges = Object.keys(editableRecord).length > 0;
    // Indicador de modo de edición
    const createMode = recordId === 0;

    // Función para extraer la referencia de valores de tipo many2one
    const extractM2OReference = useCallback(
        (m2oValue: IACeleV2.Data.TType.Many2One['database']) => {

            // Si el valor entrante es nulo...
            if ( m2oValue === null ) {
                return null;
            };
            // Se retorna el valor de ID de éste
            return m2oValue[0];
        }, []
    );

    // Función para eliminar un valor en registro editable que es igual en el registro original
    const deleteChangesInField = useCallback(
        (fieldName: IACeleV2.Data.FieldName<M>) => {

            // Intento de actualización de estado
            setEditableRecord(
                (record) => {
                    // Obtención de una copia del registro
                    const recordCopy = { ...record };
                    // Intento de obtención del valor actual en el registro editable
                    const currentValue = recordCopy[fieldName];
                    // Si el valor no es indefinido...
                    if ( currentValue !== undefined ) {
                        // Se elimina la llave de éste
                        delete recordCopy[fieldName];
                        // Actualización del valor
                        return recordCopy;
                    } else {
                        // Se mantiene la misma referencia
                        return record;
                    };
                }
            );
        }, []
    );

    // Función para actualizar valor de campo
    const updateFieldValue = useCallback(
        <F extends IACeleV2.Data.FieldName<M>>(
            fieldName: F,
            inputValue: IACeleV2.Data.RecordForView<M>[F],
        ) => {

            // Actualización del valor
            setEditableRecord(
                (record) => ({
                    ...record,
                    [fieldName]: inputValue,
                })
            );
        }, []
    );

    // Inicialización de función para editar el registro
    const updateEditableRecordField = useCallback(
        <F extends IACeleV2.Data.FieldName<M>>(
            fieldName: F,
            inputValue: IACeleV2.Data.RecordForView<M>[F],
        ) => {

            // Obtención del valor del campo en el registro
            const originalValue = originalRecord[fieldName];

            // Obtención del ttype del campo
            const ttype = (modelMetadata)[fieldName]['ttype'];
            // Comparación con el valor de la base de datos en base al tipo de dato
            switch ( ttype ) {
                case 'integer':
                case 'char':
                case 'boolean':
                case 'float':
                case 'date':
                case 'datetime':
                case 'time':
                case 'duration':
                case 'selection':
                case 'text':
                case 'file':
                case 'json':
                    // Si el valor es distinto al de la base de datos...
                    if ( inputValue !== originalValue ) {
                        // Actualización del valor
                        updateFieldValue(fieldName, inputValue);
                        // Si el valor no es distinto...
                    } else {
                        // Intento de actualización de estado
                        deleteChangesInField(fieldName);
                    };
                    break;
                case 'many2one': {
                    // Obtención del valor ingresado
                    const inputM2OValue = extractM2OReference(inputValue as IACeleV2.Data.TType.Many2One['database']);
                    // Obtención del valor de la base de datos
                    const currentM2OValue = extractM2OReference(originalValue as IACeleV2.Data.TType.Many2One['database']);
                    // Si el valor es distinto al de la base de datos...
                    if ( inputM2OValue !== currentM2OValue ) {
                        // Actualización del valor
                        updateFieldValue(fieldName, inputValue);
                        // Si el valor no es distinto...
                    } else {
                        // Intento de actualización de estado
                        deleteChangesInField(fieldName);
                    };
                    break;
                };
                case 'one2many':
                case 'many2many':
                    // Si comandos de relación...
                    if ( Object.keys(inputValue as IACeleV2.Data.RelationCommand<M>).length ) {
                        // Actualización del valor
                        updateFieldValue(fieldName, inputValue);
                        // Si no existen comandos de relación
                    } else {
                        // Intento de actualización de estado
                        deleteChangesInField(fieldName);
                    };
                    break;
            };
        }, [deleteChangesInField, extractM2OReference, modelMetadata, originalRecord, updateFieldValue]
    );

    // Función para actualizar el registro original
    const saveChanges = useCallback(
        async () => {
            // Uso de la función de actualización del registro original
            const response = await updateOriginalRecord(editableRecord);

            // Si el modo es creación...
            if ( createMode ) {
                // Ejecución de función tras creación
                onCreate({ recordId: response as number });
            // Si el modo es edición
            } else {
                // Ejecución de función tras modificación
                onUpdate({ reload });
            };

            return response;
        }, [createMode, editableRecord, onCreate, onUpdate, reload, updateOriginalRecord]
    );

    // Función de ejecución de acción
    const executeAction = useCallback(
        async (actionName: string) => {
            // Si existen cambios a guardar...
            if ( existingChanges ) {
                // Se guardan primero los cambios
                await saveChanges();
            };

            // Ejecución de la acción
            await api.actionV2({
                'model_name': modelName,
                'name': actionName,
                'record_id': recordId,
            });

            // Se vuelve a cargar el registro
            reload();
        }, [api, existingChanges, modelName, recordId, reload, saveChanges]
    );

    // Restauración del objeto de edición cuando el objeto original cambia
    useEffect(
        () => {
            setEditableRecord({});
        }, [originalRecord]
    );

    return (
        <EditableRecordContext.Provider value={{
            editableRecord,
            existingChanges,
            undoChangesInEditableRecord,
            updateEditableRecordField: updateEditableRecordField as (() => {}),
            saveChanges: saveChanges as () => (any),
            executeAction,
            createMode,
        }}>
            {children}
        </EditableRecordContext.Provider>
    );
};

export default EditableRecordProvider;
