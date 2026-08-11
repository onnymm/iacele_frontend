import useRequiresField from "@/hooks/views/useRequiresField";
import { useEffect } from "react";
import type FieldComponent from "../FieldComponent";

const FormViewInspector = <M extends IACeleV2.Data.ModelName>({
    children,
}: IACeleV2.View.FormStructure<M, typeof FieldComponent>) => {

    return children({
        Field: InspectView.Field,
        Header: InspectView.Header,
        Action: InspectView.Action,
        Wizard: InspectView.Wizard,
        Page: InspectView.Page,
        Sheet: InspectView.Sheet,
        Group: InspectView.Group,
    });
};

const InspectView = {

    Page: ({ children }: IACeleV2.Common.SupportsChildren) => (children),

    Header: ({ children }: IACeleV2.Common.SupportsChildren) => (children),

    Action: () => (null),

    Wizard: () => (null),

    Sheet: ({ children }: IACeleV2.Common.SupportsChildren) => (children),

    Group: ({ children }: IACeleV2.Common.SupportsChildren) => (children),

    Field: <M extends IACeleV2.Data.ModelName>({
        name,
    }: IACeleV2.View.FormFieldComponentProps<M, typeof FieldComponent>) => {
        // Obtención de función de campo requerido
        const { requiresField } = useRequiresField<M>();
        // Registro de campo requerido
        useEffect(() => {requiresField(name)}, [name, requiresField]);

        return null;
    },

} as const;

export default FormViewInspector;
