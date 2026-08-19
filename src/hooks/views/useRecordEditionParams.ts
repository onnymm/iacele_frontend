import RecordEditionContext from "@/contexts/views/recordEditionContext";
import { useContext } from "react";

const useRecordEditionParams = <M extends IACele.Data.ModelName>() => {

    // Obtención del registro editable y función para modificación de valor de campo
    const {
        recordId,
        recordInView,
        updateRecordField,
        existingChanges,
        undoChanges,
        saveChanges,
        deleteRecord,
        reload,
        evaluator,
        createMode,
        newRecord,
        undoNewRecord,
        updateRecordInViewField,
        updateEditableRecordField,
        undoChangesSignal,
    } = useContext<IACele.Context.ViewContext.RecordEdition<M>>(RecordEditionContext);

    return {
        recordId,
        recordInView,
        updateRecordField,
        existingChanges,
        undoChanges,
        saveChanges,
        deleteRecord,
        reload,
        evaluator,
        createMode,
        newRecord,
        undoNewRecord,
        updateRecordInViewField,
        updateEditableRecordField,
        undoChangesSignal,
    };
};

export default useRecordEditionParams;
