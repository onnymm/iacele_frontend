import FieldContext from "@/contexts/views/fieldContext";
import { useContext, useMemo } from "react";
import useRecordEditionParams from "./useRecordEditionParams";

const useFieldParams = <M extends IACeleV2.Data.ModelName>() => {

    // Obtención de los parámetros del campo
    const { params, fieldMetadata } = useContext<IACeleV2.Context.ViewContext.Field<M, any>>(FieldContext);

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

    // Evaluación de parámetro de solo lectura
    const isReadonly = useMemo(
        () => (
            evaluator.evaluate(
                (
                    params.readonly
                    || fieldMetadata.readonly
                    || fieldMetadata.is_computed
                ) ?? false
            )
        ),
        [evaluator, fieldMetadata.is_computed, fieldMetadata.readonly, params.readonly]
    );

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
        isReadonly,
    };
};

export default useFieldParams;
