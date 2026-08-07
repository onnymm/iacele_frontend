import { useCallback, useMemo } from "react";
import useEditableRecord from "./useEditableRecord";
import useOriginalRecord from "./useOriginalRecord"
import useRecordInView from "./useRecordInView";
import RecordEvaluator from "@/core/ttypesV2";
import useModelMetadata from "./useModelMetadata";
import useDataView from "../routes/useDataView";

const useRecordEdition = <M extends IACeleV2.Data.ModelName>() => {

    // Obtención de valores desde los hooks
    const { recordId, deleteOriginalRecord, reload } = useOriginalRecord<M>();
    const { recordInView, updateRecordInViewField, undoChangesInRecordInView } = useRecordInView<M>();
    const { updateEditableRecordField, undoChangesInEditableRecord, existingChanges, saveChanges, executeAction, createMode } = useEditableRecord<M>();

    // Obtención de función para crear registro
    const { newRecord, undoNewRecord } = useDataView();

    // Obtención de los metadatos del campo
    const { modelMetadata } = useModelMetadata<M>();

    // Función para modificación de valor de campo en registros de edición y vista
    const updateRecordField = useCallback(
        <F extends IACeleV2.Data.FieldName<M>>(
            fieldName: F,
            value: IACeleV2.Data.RecordForView<M>[F],
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
        newRecord: newRecord ?? (() => {}),
        undoNewRecord: undoNewRecord ?? (() => {}),
    };
};

export default useRecordEdition;
