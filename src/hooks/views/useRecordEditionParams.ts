import RecordEditionContext from "@/contexts/views/recordEditionContext";
import { useContext } from "react";

const useRecordEditionParams = <M extends IACeleV2.Data.ModelName>() => {

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
    } = useContext<IACeleV2.Context.ViewContext.RecordEdition<M>>(RecordEditionContext);

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
    };
};

export default useRecordEditionParams;
