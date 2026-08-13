import useRecordEditionParams from "@/hooks/views/useRecordEditionParams";
import { useMemo } from "react";

type InvisibleComponentParams <M extends IACele.Data.ModelName> = (
    & IACele.Common.SupportsChildren
    & IACele.View.SupportsInvisibleParams<M>
);

const InvisibleComponent = <M extends IACele.Data.ModelName>({
    invisible = false,
    children,
}: InvisibleComponentParams<M>) => {

    // Obtención del validador del registro
    const { evaluator } = useRecordEditionParams<M>();

    // Evaluación de si el componente es invisible
    const isComponentInvisible = useMemo(
        () => (invisible && evaluator.evaluate(invisible)),
        [evaluator, invisible]
    );

    // Si se determina que el componente es invisible no se retorna nada
    if ( isComponentInvisible ) return (null);

    return (children);
};

export default InvisibleComponent;
