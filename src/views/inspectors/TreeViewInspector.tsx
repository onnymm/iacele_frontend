import useRequiresField from "@/hooks/views/useRequiresField";
import type FieldComponent from "../FieldComponent";
import { useContext, useEffect } from "react";
import RequiresFieldContext from "@/contexts/views/requiresFieldContext";

const TreeViewInspector = <M extends IACele.Data.ModelName>({
    children,
}: IACele.View.TreeStructure<M, typeof FieldComponent>) => {

    // Obtención de función de campo requerido
    const { requiresField } = useRequiresField<M>();

    return (
        <RequiresFieldContext.Provider value={{
            requiresField: requiresField as () => (void),
        }}>
            {children({ ...InspectView })}
        </RequiresFieldContext.Provider>
    );
};

const InspectView = {

    Page: <M extends IACele.Data.ModelName>({
        children,
    }: IACele.View.TreeComponents<M, typeof FieldComponent>['Page']) => (children),

    Field: <M extends IACele.Data.ModelName>({
        name,
    }: IACele.View.TreeComponents<M, typeof FieldComponent>['Field']) => {

        // Obtención de función de campo requerido
        const { requiresField } = useContext(RequiresFieldContext);

        // Registro de campo requerido
        useEffect(() => {requiresField(name)}, [name, requiresField]);

        return (null);
    },

    List: <M extends IACele.Data.ModelName>({
        children,
    }: IACele.View.TreeComponents<M, typeof FieldComponent>['List']) => {

        return (children({ ...ListInspectView }))
    },

} as const;

const ListInspectView = {

    Item: <M extends IACele.Data.ModelName>({
        children,
    }: IACele.View.ListComponents<M, typeof FieldComponent>['Item']) => {

        return (children);
    },

    Leading: <M extends IACele.Data.ModelName>({
        children,
    }: IACele.View.ListComponents<M, typeof FieldComponent>['Leading']) => {

        return (children);
    },

    Title: <M extends IACele.Data.ModelName>({
        children,
    }: IACele.View.ListComponents<M, typeof FieldComponent>['Title']) => {

        return (children);
    },

    Trailing: <M extends IACele.Data.ModelName>({
        children,
    }: IACele.View.ListComponents<M, typeof FieldComponent>['Trailing']) => {

        return (children);
    },

    Field: <M extends IACele.Data.ModelName>({
        name,
    }: IACele.View.TreeComponents<M, typeof FieldComponent>['Field']) => {

        // Obtención de función de campo requerido
        const { requiresField } = useContext(RequiresFieldContext);

        // Registro de campo requerido
        useEffect(() => {requiresField(name)}, [name, requiresField]);

        return null;
    },

} as const;

export default TreeViewInspector;
