import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import VOID_CALLBACK from "@/constants/app/callbacks";
import FieldConfigContext from "@/contexts/views/fieldConfigContext";
import FieldContext from "@/contexts/views/fieldContext";
import OriginalRecordContext from "@/contexts/views/originalRecordContext";
import RecordEditionContext from "@/contexts/views/recordEditionContext";
import useFieldConfig from "@/hooks/views/useFieldConfig";
import useModelMetadata from "@/hooks/views/useModelMetadata";
import useOpenRecord from "@/hooks/views/useOpenRecord";
import useOriginalRecords from "@/hooks/views/useOriginalRecords";
import useRecordEdition from "@/hooks/views/useRecordEdition";
import EditableRecordProvider from "@/providers/views/EditableRecordProvider";
import RecordInViewProvider from "@/providers/views/RecordInViewProvider";
import FieldComponent from "@/views/FieldComponent";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import IconOption from "../IconOption";
import useRecordEditionParams from "@/hooks/views/useRecordEditionParams";
import InvisibleComponent from "../form/ui/InvisibleComponent";

interface LeadingAndTrailingContextParams {
    setLeading: React.Dispatch<React.SetStateAction<React.ReactNode>>;
    setTrailing: React.Dispatch<React.SetStateAction<React.ReactNode>>;
};

const Tree = <M extends IACele.Data.ModelName>({
    children,
    open,
}: IACele.View.TreeStructure<M, typeof FieldComponent, keyof typeof IconOption>) => {

    // Obtención de configuración de vista y función para suscribir configuración de campos
    const { fieldConfig, suscribeFieldConfig } = useFieldConfig<M>();

    // Tipado de contexto a usar como proveedor
    const ClosureFieldConfigContext: React.Context<IACele.Context.ViewContext.FieldConfig<M, typeof FieldComponent>> = FieldConfigContext;
    // Obtención de función para cuando se da clic en un registro
    const { onRowClick } = useOpenRecord(open);

    return (
        <ClosureFieldConfigContext.Provider value={{
            fieldConfig: fieldConfig as any,
            suscribeFieldConfig,
            onRowClick,
        }}>
            {/* Aquí se obtienen los metadatos de la vista */}
            {children({ ...TreeInspector })}
            {/* Aquí se renderiza la vista */}
            <TreeRender open={open}>
                {children}
            </TreeRender>
        </ClosureFieldConfigContext.Provider>
    );
};

export default Tree;

const TreeInspector = {

    Page: <M extends IACele.Data.ModelName>({
        children,
    }: IACele.View.TreeComponents<M, typeof FieldComponent, keyof typeof IconOption>['Page']) => {

        return (children);
    },

    Field: <M extends IACele.Data.ModelName>({
        name,
        widget,
        decoration,
        label,
    }: IACele.View.TreeComponents<M, typeof FieldComponent, keyof typeof IconOption>['Field']) => {

        // Obtención de función para suscribir configuración de campo
        const { suscribeFieldConfig } = useContext<IACele.Context.ViewContext.FieldConfig<M, typeof FieldComponent>>(FieldConfigContext);

        // Suscripción de campo en efecto
        useEffect(
            () => {
                suscribeFieldConfig({
                    name: name,
                    widget: widget,
                    decoration: decoration,
                    label: label,
                } as any);
            }, [decoration, label, name, suscribeFieldConfig, widget]
        );

        return null;
    },

    List: <M extends IACele.Data.ModelName>({
        children,
    }: IACele.View.TreeComponents<M, typeof FieldComponent, keyof typeof IconOption>['List']) => {

        return (children({ ...ListInspector }));
    },

} as const;

const ListInspector = {

    Item: <M extends IACele.Data.ModelName>({
        children,
    }: IACele.View.ListComponents<M, typeof FieldComponent, keyof typeof IconOption>['Item']) => {

        return (children);
    },

    Leading: <M extends IACele.Data.ModelName>({
        children,
    }: IACele.View.ListComponents<M, typeof FieldComponent, keyof typeof IconOption>['Leading']) => {

        return (children);
    },

    Title: <M extends IACele.Data.ModelName>({
        children,
    }: IACele.View.ListComponents<M, typeof FieldComponent, keyof typeof IconOption>['Title']) => {

        return (children);
    },

    Trailing: <M extends IACele.Data.ModelName>({
        children,
    }: IACele.View.ListComponents<M, typeof FieldComponent, keyof typeof IconOption>['Trailing']) => {

        return (children);
    },

    Field: <M extends IACele.Data.ModelName>({
        name,
        widget,
        label,
    }: IACele.View.ListComponents<M, typeof FieldComponent, keyof typeof IconOption>['Field']) => {

        // Obtención de función para suscribir configuración de campo
        const { suscribeFieldConfig } = useContext<IACele.Context.ViewContext.FieldConfig<M, typeof FieldComponent>>(FieldConfigContext);

        // Suscripción de campo en efecto
        useEffect(
            () => {
                suscribeFieldConfig({
                    name: name,
                    widget: widget,
                    label: label,
                } as any);
            }, [label, name, suscribeFieldConfig, widget]
        );

        return null;
    },

    Icon: () => (null),

};

const ListComponent = {

    Page: <M extends IACele.Data.ModelName>({
        children,
    }: IACele.View.TreeComponents<M, typeof FieldComponent, keyof typeof IconOption>['Page']) => {

        return (children);
    },

    Field: () => {

        return (null);
    },

    List: <M extends IACele.Data.ModelName>({
        children,
    }: IACele.View.TreeComponents<M, typeof FieldComponent, keyof typeof IconOption>['List']) => {

        // Obtención de los registros originales desde el contexto
        const { originalRecords } = useOriginalRecords<M>();

        return (
            originalRecords.map(
                (record, indexI) => (
                    <OriginalRecordContext.Provider key={indexI} value={{
                        originalRecord: record,
                        reload: VOID_CALLBACK.SYNC,
                        deleteOriginalRecord: VOID_CALLBACK.ASYNC,
                        updateOriginalRecord: VOID_CALLBACK.ASYNC as unknown as () => (Promise<number>),
                        recordId: record.id as number,
                    }}>
                        <RecordInViewProvider>
                        <EditableRecordProvider>
                            {children({ ...ItemComponent })}
                        </EditableRecordProvider>
                        </RecordInViewProvider>

                    </OriginalRecordContext.Provider>
                )
            )
        );
    },

} as const;

const LeadingAndTrailingContext = createContext<LeadingAndTrailingContextParams>({
    setLeading: VOID_CALLBACK.SYNC,
    setTrailing: VOID_CALLBACK.SYNC,
});

const ItemComponent = {

    Item: <M extends IACele.Data.ModelName>({
        children,
    }: IACele.View.ListComponents<M, typeof FieldComponent, keyof typeof IconOption>['Item']) => {

        // Contexto tipado
        const ClosureRecordContext: React.Context<IACele.Context.ViewContext.RecordEdition<M>> = RecordEditionContext;
        // Obtención de función para cuando se da clic en un registro
        const { onRowClick } = useContext<IACele.Context.ViewContext.FieldConfig<M, typeof FieldComponent>>(FieldConfigContext);

        // Obtención de valores desde el hook
        const {
            recordId,
            recordInView,
            existingChanges,
            undoChanges,
            updateRecordField,
            saveChanges,
            deleteRecord,
            reload,
            executeAction,
            evaluator,
            createMode,
            newRecord,
            undoNewRecord,
            undoChangesSignal,
            updateEditableRecordField,
            updateRecordInViewField,
        } = useRecordEdition<M>();

        // Inicialización de estado de elemento JSX Leading
        const [ leading, setLeading ] = useState<React.ReactNode>(null);
        // Inicialización de estado de elemento JSX Trailing
        const [ trailing, setTrailing ] = useState<React.ReactNode>(null);

        return (
            <ClosureRecordContext.Provider value={{
                recordId,
                recordInView,
                existingChanges,
                undoChanges,
                updateRecordField,
                saveChanges,
                deleteRecord,
                executeAction,
                reload,
                evaluator,
                createMode,
                newRecord,
                undoNewRecord,
                undoChangesSignal,
                updateEditableRecordField,
                updateRecordInViewField,
            }}>
                <LeadingAndTrailingContext.Provider value={{ setLeading, setTrailing }}>
                    <div className="group flex flex-col bg-card shadow-sm hover:brightness-110 p-2 rounded-sm transition-all duration-300 cursor-pointer iacele-item" onClick={() => {onRowClick(recordInView)}}>
                        <div className="relative flex flex-row justify-between gap-2 w-full">
                            {/* Leading */}
                            <div className="flex justify-end items-center shrink">{leading}</div>
                            {/* Contenido */}
                            <div className="flex flex-col w-full text-gray-400">
                                {children}
                            </div>
                            {/* Trailing */}
                            <div className="flex flex-col items-end gap-2 w-max">{trailing}</div>
                        </div>
                    </div>
                </LeadingAndTrailingContext.Provider>
            </ClosureRecordContext.Provider>
        );
    },

    Title: <M extends IACele.Data.ModelName>({
        children,
    }: IACele.View.ListComponents<M, typeof FieldComponent, keyof typeof IconOption>['Title']) => {

        return (
            <div className="text-foreground">
                {children}
            </div>
        );
    },

    Leading: <M extends IACele.Data.ModelName>({
        children,
    }: IACele.View.ListComponents<M, typeof FieldComponent, keyof typeof IconOption>['Leading']) => {

        // Obtención de función para obtener el leading
        const { setLeading } = useContext<LeadingAndTrailingContextParams>(LeadingAndTrailingContext);

        useEffect(
            () => {
                // Si no existen elementos a renderizar se termina la ejecución
                if (!children) return;
                // Se establecen los elementos a renderizar en el estado
                setLeading(children);
            }, [children, setLeading]
        );

        return (null);
    },

    Trailing: <M extends IACele.Data.ModelName>({
        children,
    }: IACele.View.ListComponents<M, typeof FieldComponent, keyof typeof IconOption>['Trailing']) => {

        // Obtención de función para obtener el leading
        const { setTrailing } = useContext<LeadingAndTrailingContextParams>(LeadingAndTrailingContext);

        useEffect(
            () => {
                // Si no existen elementos a renderizar se termina la ejecución
                if (!children) return;
                // Se establecen los elementos a renderizar en el estado
                setTrailing(children);
            }, [children, setTrailing]
        );

        return (null);
    },

    Field: <M extends IACele.Data.ModelName>({
        name,
        widget = 'default',
        decoration,
        invisible,
    }: IACele.View.ListComponents<M, typeof FieldComponent, keyof typeof IconOption>['Field']) => {

        // Contexto tipado
        const ClosureFieldContext: React.Context<IACele.Context.ViewContext.Field<M, typeof FieldComponent>> = FieldContext;

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
                    params: { name,  widget, readonly: true, decoration } as IACele.View.FormFieldComponentProps<M, typeof FieldComponent>,
                    fieldMetadata: modelMetadata[name],
                }}>
                    {Component !== undefined
                        ? <Component />
                        : <div>{String(name)}</div>
                    }
                </ClosureFieldContext.Provider>
            </InvisibleComponent>
        );
    },

    Icon: <M extends IACele.Data.ModelName>({
        icon,
        decoration,
        invisible,
    }: IACele.View.ListComponents<M, typeof FieldComponent, keyof typeof IconOption>['Icon']) => {

        // Obtención de la instancia de evaluador
        const { evaluator } = useRecordEditionParams<M>();

        // Evaluación de color de decoración
        const decorationColor = useMemo(
            () => {
                // Inicialización de un color predeterminado
                let color: IACele.UI.Variant = 'default';

                // Si existen valor de decoración provisto...
                if ( decoration ) {
                    // Validación de color por orden prioritario, se sobreescriben si más de uno es verdadero
                    if ( decoration.info && evaluator.evaluate(decoration.info) ) {
                        color = 'info';
                    };
                    if ( decoration.primary && evaluator.evaluate(decoration.primary) ) {
                        color = 'primary';
                    };
                    if ( decoration.success && evaluator.evaluate(decoration.success) ) {
                        color = 'success';
                    };
                    if ( decoration.warning && evaluator.evaluate(decoration.warning) ) {
                        color = 'warning';
                    };
                    if ( decoration.danger && evaluator.evaluate(decoration.danger) ) {
                        color = 'danger';
                    };
                };

                return color;
            }, [decoration, evaluator]
        );

        // Obtención de ícono a renderizar
        const Icon = useMemo(
            () => (IconOption[icon]), [icon]
        );

        return (
            <InvisibleComponent invisible={invisible}>
                <Icon className={`stroke-${decorationColor} size-5`} />
            </InvisibleComponent>
        );
    },
};

const TreeRender = <M extends IACele.Data.ModelName>({
    children,
}: IACele.View.TreeStructure<M, typeof FieldComponent, keyof typeof IconOption>) => {

    // Inicialización de estado de carga en falso
    const [ loaded, setLoaded ] = useState<boolean>(false);

    // Se establece el estado de carga en verdadero para provocar la renderización
    useEffect(
        () => {
            setLoaded(true);
        }, []
    );

    // Si el estado de carga es falso no se renderiza nada
    if (!loaded) return null;

    return (
        <>
            <div className="hidden lg:block size-full">
                <Table className="relative">
                    <TableHeader className="top-0 z-1 sticky bg-white/30 dark:bg-[#1f2f3f]/70 shadow backdrop-blur-sm">
                        <TreeComponent.Columns />
                    </TableHeader>
                    <TableBody>
                        <TreeComponent.Rows>
                            <TreeComponent.RecordRowProvider>
                                <TreeComponent.Row />
                            </TreeComponent.RecordRowProvider>
                        </TreeComponent.Rows>
                    </TableBody>
                </Table>
            </div>
            <div className="lg:hidden flex flex-col gap-2 md:grid md:grid-cols-2 p-2">
                {children({ ...ListComponent })}
            </div>
        </>
    );
};

const TreeComponent = {

    Columns: <M extends IACele.Data.ModelName>() => {

        // Obtención de los metadatos del modelo
        const { modelMetadata } = useModelMetadata<M>();
        // Obtención de la configuración de campos desde el contexto
        const { fieldConfig } = useContext<IACele.Context.ViewContext.FieldConfig<M, typeof FieldComponent>>(FieldConfigContext);

        return (
            <TableRow>
                {
                    fieldConfig.current.map(
                        (config, i) => (
                            <TableHead className="hover:bg-primary/30 transition-colors duration-300 select-none" key={i}>
                                {config.label ?? modelMetadata[config.name].label}
                            </TableHead>
                        )
                    )
                }
            </TableRow>
        )
    },

    Rows: <M extends IACele.Data.ModelName>({
        children,
    }: IACele.Common.SupportsChildren) => {

        // Obtención de los registros originales desde el contexto
        const { originalRecords } = useOriginalRecords<M>();

        return (
            originalRecords.map(
                (record, indexI) => (

                    <OriginalRecordContext.Provider key={indexI} value={{
                        originalRecord: record,
                        reload: VOID_CALLBACK.SYNC,
                        deleteOriginalRecord: VOID_CALLBACK.ASYNC,
                        updateOriginalRecord: VOID_CALLBACK.ASYNC as unknown as () => (Promise<number>),
                        recordId: record.id as number,
                    }}>
                        <RecordInViewProvider>
                        <EditableRecordProvider>
                            {children}
                        </EditableRecordProvider>
                        </RecordInViewProvider>

                    </OriginalRecordContext.Provider>
                )
            )
        );
    },

    RecordRowProvider: <M extends IACele.Data.ModelName>({
        children,
    }: IACele.Common.SupportsChildren) => {

        // Contexto tipado
        const ClosureRecordContext: React.Context<IACele.Context.ViewContext.RecordEdition<M>> = RecordEditionContext;

        // Obtención de valores desde el hook
        const {
            recordId,
            recordInView,
            existingChanges,
            undoChanges,
            updateRecordField,
            saveChanges,
            deleteRecord,
            reload,
            executeAction,
            evaluator,
            createMode,
            newRecord,
            undoNewRecord,
            undoChangesSignal,
            updateEditableRecordField,
            updateRecordInViewField,
        } = useRecordEdition<M>();

        return (
            <ClosureRecordContext.Provider value={{
                recordId,
                recordInView,
                existingChanges,
                undoChanges,
                updateRecordField,
                saveChanges,
                deleteRecord,
                executeAction,
                reload,
                evaluator,
                createMode,
                newRecord,
                undoNewRecord,
                undoChangesSignal,
                updateEditableRecordField,
                updateRecordInViewField,
            }}>
                {children}
            </ClosureRecordContext.Provider>
        );
    },

    Row: <M extends IACele.Data.ModelName>() => {

        // Obtención de la configuración de campos desde el contexto
        const { fieldConfig, onRowClick } = useContext<IACele.Context.ViewContext.FieldConfig<M, typeof FieldComponent>>(FieldConfigContext);
        // Obtención del registro en vista
        const { recordInView } = useContext<IACele.Context.ViewContext.RecordEdition<M>>(RecordEditionContext);

        return (
            <TableRow onClick={() => {onRowClick(recordInView)}} className="cursor-pointer">
                {
                    fieldConfig.current.map(
                        (config, indexJ) => {
                            return (
                                <TableCell className="w-min" key={indexJ}>
                                    <CellRender
                                        name={config.name as any}
                                        label={config.label}
                                        widget={config.widget as any}
                                        decoration={config.decoration as any}
                                    />
                                </TableCell>
                            );
                        }
                    )
                }
            </TableRow>
        )
    },

} as const;

const CellRender = <M extends IACele.Data.ModelName>({
    name,
    widget = 'default',
    decoration,
}: IACele.View.TreeFieldComponentProps<M, typeof FieldComponent>) => {

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
        <FieldContext.Provider value={{
            fieldMetadata: modelMetadata[name],
            params: {
                name: name as any,
                decoration,
            },
        }}>
            <Component />
        </FieldContext.Provider>
    );
};
