import useRequiresField from "@/hooks/views/useRequiresField";
import type FieldComponent from "../FieldComponent";
import { useEffect } from "react";

const TreeViewInspector = <M extends IACele.Data.ModelName>({
    children,
}: IACele.View.TreeStructure<M, typeof FieldComponent>) => {

    return (children({ ...InspectView }));
};

const InspectView = {

    Page: <M extends IACele.Data.ModelName>({
        children,
    }: IACele.View.TreeComponents<M, typeof FieldComponent>['Page']) => (children),

    Field: <M extends IACele.Data.ModelName>({
        name,
    }: IACele.View.TreeComponents<M, typeof FieldComponent>['Field']) => {
        // Obtención de función de campo requerido
        const { requiresField } = useRequiresField<M>();
        // Registro de campo requerido
        useEffect(() => {requiresField(name)}, [name, requiresField]);

        return (null);
    },

} as const;

export default TreeViewInspector;
