import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import FieldContext from "@/contexts/views/fieldContext";
import useFieldParams from "@/hooks/views/useFieldParams";
import useModelMetadata from "@/hooks/views/useModelMetadata";
import FieldComponent from "@/views/FieldComponent";
import { CircleQuestionMark } from "lucide-react";
import { useMemo, type Context } from "react";
import InvisibleComponent from "../ui/InvisibleComponent";

const Field = <M extends IACele.Data.ModelName>({
    name,
    invisible,
    readonly,
    domain = [],
    widget = 'default',
}: IACele.View.FormFieldComponentProps<M, typeof FieldComponent>) => {

    // Contexto tipado
    const ClosureFieldContext: Context<IACele.Context.ViewContext.Field<M, typeof FieldComponent>> = FieldContext;

    // Obtención de los metadatos del campo
    const { modelMetadata } = useModelMetadata<M>();

    // Obtención del tipo de dato del campo
    const ttype = useMemo(
        () => (modelMetadata[name]['ttype']),
        [modelMetadata, name]
    );

    // Definición del componente a usar para renderizar el valor del campo
    const Component = useMemo(
        () => (FieldComponent[ttype][widget as 'default']),
        [ttype, widget]
    );

    return (
        <InvisibleComponent invisible={invisible}>
            <ClosureFieldContext.Provider value={{
                params: { name, domain, invisible, widget, readonly } as IACele.View.FormFieldComponentProps<M, typeof FieldComponent>,
                fieldMetadata: modelMetadata[name],
            }}>
                <Label />
                {Component !== undefined
                    ? <Component />
                    : <div>{String(name)}</div>
                }
            </ClosureFieldContext.Provider>
        </InvisibleComponent>
    );
};

export default Field;

const Label = <M extends IACele.Data.ModelName>() => {

    // Obtención de los metadatos del campo
    const { fieldMetadata } = useFieldParams<M>();

        return (
        <p className="flex flex-row items-center gap-1 my-1 text-primary text-sm select-none">
            {fieldMetadata['label']}
            {fieldMetadata['help_info'] &&
                <Tooltip>
                    <TooltipTrigger tabIndex={-1}>
                        <CircleQuestionMark className="size-3" />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        {fieldMetadata['help_info']}
                    </TooltipContent>
                </Tooltip>
            }
        </p>
    );
};
