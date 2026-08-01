import { useCallback } from "react";
import useEditableRecord from "./useEditableRecord";
import useOriginalRecord from "./useOriginalRecord"
import useRecordInView from "./useRecordInView";

const useRecordEdition = <M extends IACeleV2.Data.ModelName>() => {

    // Obtención de valores desde los hooks
    const { recordId, deleteOriginalRecord, reload } = useOriginalRecord<M>();
    const { recordInView, updateRecordInViewField, undoChangesInRecordInView } = useRecordInView<M>();
    const { updateEditableRecordField, undoChangesInEditableRecord, existingChanges, updateRecord, executeAction } = useEditableRecord<M>();

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

    return {
        recordId,
        recordInView,
        updateRecordField,
        existingChanges,
        undoChanges,
        updateRecord,
        deleteRecord: deleteOriginalRecord,
        executeAction,
        reload,
    };
};

export default useRecordEdition;
