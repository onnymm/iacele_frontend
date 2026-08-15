import useRequiresField from "@/hooks/views/useRequiresField";
import { useEffect } from "react";
import type FieldComponent from "../FieldComponent";
import type IconOption from "../IconOption";

const FormViewInspector = <M extends IACele.Data.ModelName>({
    children,
}: IACele.View.FormStructure<M, typeof FieldComponent, keyof typeof IconOption>) => {

    return children({
        Field: InspectView.Field,
        Header: InspectView.Header,
        Action: InspectView.Action,
        Wizard: InspectView.Wizard,
        Page: InspectView.Page,
        Sheet: InspectView.Sheet,
        Group: InspectView.Group,
        Icon: InspectView.Icon,
    });
};

const InspectView = {

    Page: ({ children }: IACele.Common.SupportsChildren) => (children),

    Header: ({ children }: IACele.Common.SupportsChildren) => (children),

    Action: () => (null),

    Wizard: () => (null),

    Sheet: ({ children }: IACele.Common.SupportsChildren) => (children),

    Group: ({ children }: IACele.Common.SupportsChildren) => (children),

    Field: <M extends IACele.Data.ModelName>({
        name,
    }: IACele.View.FormFieldComponentProps<M, typeof FieldComponent>) => {
        // Obtención de función de campo requerido
        const { requiresField } = useRequiresField<M>();
        // Registro de campo requerido
        useEffect(() => {requiresField(name)}, [name, requiresField]);

        return null;
    },

    Icon: () => (null),

} as const;

export default FormViewInspector;
