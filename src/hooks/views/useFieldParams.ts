import FieldContext from "@/contexts/views/fieldContext";
import { useContext, useMemo } from "react";
import useRecordEditionParams from "./useRecordEditionParams";

const useFieldParams = <M extends IACele.Data.ModelName>() => {

    // Obtención de los parámetros del campo
    const { params, fieldMetadata } = useContext<IACele.Context.ViewContext.Field<M, any>>(FieldContext);

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
        createMode,
    } = useRecordEditionParams<M>();

    // Evaluación de parámetro de solo lectura
    const isReadonly = useMemo(
        () => (
            (
                // Si se especificó un parámetro de modo lectura...
                params.readonly !== undefined
                    ? (
                        // Validación del argumento de solo lectura del campo
                        evaluator.evaluate(params.readonly)
                        // O si el campo ya es de solo lectura
                        || fieldMetadata.readonly
                    )
                    : (
                        // Si el registro no está en modo de creación
                        !createMode
                        // Y si el campo ya es de solo lectura
                        && fieldMetadata.readonly
                    )
            )
            // O si el campo es computado (por defecto se hace solo lectura)
            || fieldMetadata.is_computed
        ),
        [createMode, evaluator, fieldMetadata.is_computed, fieldMetadata.readonly, params.readonly]
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
