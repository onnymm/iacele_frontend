import FieldContext from "@/contexts/views/fieldContext";
import { useContext } from "react";
import useRecordEditionParams from "./useRecordEditionParams";

const useFieldParams = <M extends IACeleV2.Data.ModelName>() => {

    // Obtención de los parámetros del campo
    const { params, fieldMetadata } = useContext<IACeleV2.Context.View.Field<M, any>>(FieldContext);
    // Obtención de los parámetros del registro
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
    } = useRecordEditionParams<M>();

    return {
        params,
        fieldMetadata,
        recordId,
        recordInView,
        updateRecordField,
        existingChanges,
        undoChanges,
        saveChanges,
        deleteRecord,
        reload,
        evaluator,
    };
};

export default useFieldParams;
