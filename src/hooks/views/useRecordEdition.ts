import { useCallback, useEffect, useMemo } from "react";
import useEditableRecord from "./useEditableRecord";
import useOriginalRecord from "./useOriginalRecord"
import useRecordInView from "./useRecordInView";
import RecordEvaluator from "@/core/ttypes";
import useModelMetadata from "./useModelMetadata";
import useDataView from "../routes/useDataView";
import useDataContext from "./useDataContext";
import VOID_CALLBACK from "@/constants/app/callbacks";

const useRecordEdition = <M extends IACele.Data.ModelName>() => {

    // Obtención de valores desde los hooks
    const { recordId, deleteOriginalRecord, reload } = useOriginalRecord<M>();
    const { recordInView, updateRecordInViewField, undoChangesInRecordInView } = useRecordInView<M>();
    const { updateEditableRecordField, undoChangesInEditableRecord, existingChanges, saveChanges, executeAction, createMode } = useEditableRecord<M>();
    // Obtención de datos de contexto
    const { contextData } = useDataContext<M>();

    // Obtención de función para crear registro
    const { newRecord, undoNewRecord } = useDataView();

    // Obtención de los metadatos del campo
    const { modelMetadata } = useModelMetadata<M>();

    // Función para modificación de valor de campo en registros de edición y vista
    const updateRecordField = useCallback(
        <F extends IACele.Data.FieldName<M>>(
            fieldName: F,
            value: IACele.Data.RecordForView<M>[F],
        ) => {

            // Actualización de valor en registro de vista
            updateRecordInViewField<F>(fieldName, value);
            // Actualización de valor en registro de edición
            updateEditableRecordField<F>(fieldName, value);
        }, [updateEditableRecordField, updateRecordInViewField]
    );

    // Función para deshacer cambios
    const undoChanges = useCallback(
        () => {

            // Se deshacen cambios en el registro de vista
            undoChangesInRecordInView();
            // Se deshacen cambios en el registro de edición
            undoChangesInEditableRecord();
        }, [undoChangesInEditableRecord, undoChangesInRecordInView]
    );

    // Inicialización de instancia de evaluador
    const evaluator = useMemo(
        () => (new RecordEvaluator<M>(recordInView, modelMetadata)),
        [modelMetadata, recordInView]
    );

    useEffect(
        () => {
            // Obtención de los nombres de campos de datos del contexto
            const fieldNames = Object.keys(contextData) as IACele.Data.FieldName<M>[];
            // Iteración por los nombres de campo
            fieldNames.forEach(
                (fieldName) => {
                    // Actualización de valores del registro actual
                    updateRecordField(fieldName, contextData[fieldName]);
                }
            );
        }, [contextData, updateRecordField]
    );

    return {
        recordId,
        recordInView,
        updateRecordField,
        existingChanges,
        undoChanges,
        saveChanges,
        deleteRecord: deleteOriginalRecord,
        executeAction,
        reload,
        evaluator,
        createMode,
        newRecord: newRecord ?? (VOID_CALLBACK.SYNC),
        undoNewRecord: undoNewRecord ?? (VOID_CALLBACK.SYNC),
    };
};

export default useRecordEdition;
