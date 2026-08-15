import FieldContext from "@/contexts/views/fieldContext";
import { useContext, useMemo } from "react";
import useRecordEditionParams from "./useRecordEditionParams";
import individualRecordViewContext from "@/contexts/views/individualRecordViewContext";

const useFieldParams = <M extends IACele.Data.ModelName>() => {

    // Obtención de los parámetros del campo
    const { params, fieldMetadata } = useContext<IACele.Context.ViewContext.Field<M, any>>(FieldContext);
    // Obtención de parámetro desde el contexto
    const { viewReadonly } = useContext(individualRecordViewContext);

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
            // Si la vista no está en modo creación y fue establecida como solo lectura
            ) || ( !createMode && viewReadonly )
        ),
        [createMode, evaluator, fieldMetadata.is_computed, fieldMetadata.readonly, params.readonly, viewReadonly]
    );

    // Evaluación de color de decoración
    const decorationColor = useMemo(
        () => {
            // Inicialización de un color predeterminado
            let color: IACele.UI.Variant = 'default';

            // Si existen valor de decoración provisto...
            if ( params.decoration ) {
                // Validación de color por orden prioritario, se sobreescriben si más de uno es verdadero
                if ( params.decoration.info && evaluator.evaluate(params.decoration.info) ) {
                    color = 'info';
                };
                if ( params.decoration.primary && evaluator.evaluate(params.decoration.primary) ) {
                    color = 'primary';
                };
                if ( params.decoration.success && evaluator.evaluate(params.decoration.success) ) {
                    color = 'success';
                };
                if ( params.decoration.warning && evaluator.evaluate(params.decoration.warning) ) {
                    color = 'warning';
                };
                if ( params.decoration.danger && evaluator.evaluate(params.decoration.danger) ) {
                    color = 'danger';
                };
            };

            return color;
        }, [evaluator, params.decoration]
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
        decorationColor,
    };
};

export default useFieldParams;
