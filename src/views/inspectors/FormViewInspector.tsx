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
        Page: InspectView.Page,
        Sheet: InspectView.Sheet,
        Group: InspectView.Group,
    });
};

const InspectView = {

    Page: ({ children }: IACele.Common.SupportsChildren) => (children),

    Header: ({ children }: IACele.Common.SupportsChildren) => (children),

    Action: () => (null),

    Sheet: ({ children }: IACele.Common.SupportsChildren) => (children),

    Group: ({ children }: IACele.Common.SupportsChildren) => (children),

    Field: <M extends IACeleV2.Data.ModelName>({
        name,
    }: IACeleV2.View.FormComponents<M, typeof FieldComponent>['Field']) => {
        // Obtención de función de campo requerido
        const { requiresField } = useRequiresField<M>();
        // Registro de campo requerido
        useEffect(() => {requiresField(name)}, [name, requiresField]);

        return null;
    },

} as const;

export default FormViewInspector;
