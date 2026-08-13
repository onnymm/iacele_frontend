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
import { useContext, useEffect, useMemo, useState } from "react";

const Tree = <M extends IACele.Data.ModelName>({
    children,
    open,
}: IACele.View.TreeStructure<M, typeof FieldComponent>) => {

    // Obtención de configuración de vista y función para suscribir configuración de campos
    const { fieldConfig, suscribeFieldConfig } = useFieldConfig<M>();

    // Tipado de contexto a usar como proveedor
    const ClosureFieldConfigContext: React.Context<IACele.Context.ViewContext.FieldConfig<M, typeof FieldComponent>> = FieldConfigContext;

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
            <TreeRender />
        </ClosureFieldConfigContext.Provider>
    );
};

export default Tree;

const TreeInspector = {

    Page: <M extends IACele.Data.ModelName>({
        children,
    }: IACele.View.TreeComponents<M, typeof FieldComponent>['Page']) => {

        return (children);
    },

    Field: <M extends IACele.Data.ModelName>({
        name,
        widget,
    }: IACele.View.TreeComponents<M, typeof FieldComponent>['Field']) => {

        // Obtención de función para suscribir configuración de campo
        const { suscribeFieldConfig } = useContext<IACele.Context.ViewContext.FieldConfig<M, typeof FieldComponent>>(FieldConfigContext);

        // Suscripción de campo en efecto
        useEffect(
            () => {
                suscribeFieldConfig({
                    name: name,
                    widget: widget,
                } as any);
            }, [name, suscribeFieldConfig, widget]
        );

        return null;
    },

} as const;

const TreeRender = () => {

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
        <div className="size-full">
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
                                {modelMetadata[config.name].label}
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
            }}>
                {children}
            </ClosureRecordContext.Provider>
        );
    },

    Row: <M extends IACele.Data.ModelName>() => {

        // Obtención de la configuración de campos desde el contexto
        const { fieldConfig, onRowClick } = useContext<IACele.Context.ViewContext.FieldConfig<M, typeof FieldComponent>>(FieldConfigContext);
        // Obtención del registro en vista
        const { recordInView } = useContext<IACele.Context.ViewContext.RecordEdition<M>>(RecordEditionContext)

        return (
            <TableRow onClick={() => {onRowClick(recordInView)}} className="cursor-pointer">
                {
                    fieldConfig.current.map(
                        (config, indexJ) => {

                            return (
                                <TableCell className="w-min" key={indexJ}>
                                    <CellRender name={config.name as any} widget={config.widget as any} />
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
                readonly: true,
            },
        }}>
            <Component />
        </FieldContext.Provider>
    );
};
