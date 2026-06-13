import useAPI from "@/hooks/app/useAPI";
import useLoadModelMetadata from "@/hooks/views/useModelMetadata";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import useViewName from "@/hooks/app/useViewPage";
import { Badge } from "@/components/ui/badge";

interface TreeParams<M extends IACele.Data.ModelName> {
    modelName: M;
    children: (params: RenderParams<M>) => React.ReactNode;
    label?: string;
};

interface RenderParams<M extends IACele.Data.ModelName> {
    Field: React.FC<FieldParams<M>>;
};

interface TreeContextParams<M extends IACele.Data.ModelName> {
    fieldsConfig: FieldConfig<M>[];
    suscribeFieldToRead: (config: FieldConfig<M>) => void;
    label?: string;
};

interface FieldParams<M extends IACele.Data.ModelName> {
    name: keyof IACele.Data.ModelDefinition<M>;
};

interface ViewProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
};

interface TreeViewParams<M extends IACele.Data.ModelName> {
    modelName: M;
    data: IACele.API.Response.Tree<M>;
};

interface DynamicWidgetParams<M extends IACele.Data.ModelName, T> {
    modelName: M;
    fieldName: keyof IACele.Data.ModelDefinition<M>;
    value: T;
};

interface FieldConfig<M extends IACele.Data.ModelName> {
    name: keyof IACele.Data.ModelDefinition<M> | [keyof IACele.Data.ModelDefinition<M>, string[]];
};

const useTree = <M extends IACele.Data.ModelName>(
    modelName: M,
) => {

    // Obtención de la instancia de conexión a la API
    const { api } = useAPI();
    // Obtención de estado de carga de los metadatos de campos
    const { loaded: fieldsMetadataLoaded } = useLoadModelMetadata<M>(modelName);
    // Incialización de estado de datos
    const [ data, setData ] = useState<IACele.API.Response.Tree<M> | null>(null);

    // Inicialización de lista de campos a leer
    const fieldsConfig: FieldConfig<M>[] = useMemo(
        () => ([]), []
    );

    // Inicialización de función para añadir nombres de campos a leer
    const suscribeFieldToRead = useCallback(
        (config: FieldConfig<M>) => {
            // Se busca el valor del campo en el array
            const foundValue = fieldsConfig.find( (suscribedConfig) => (
                suscribedConfig.name === config.name
                || (
                    (
                        typeof suscribedConfig.name === 'object'
                        && typeof config.name === 'object'
                    )
                    && suscribedConfig.name[0] === config.name[0]
                )
            ) );
            // Si el nombre del campo no existe en el array...
            if ( !foundValue ) {
                // Se añade éste
                fieldsConfig.push(config);
            };
        }, [fieldsConfig]
    );

    // Inicialización de función de búsqueda y lectura de resultados
    const searchRead = useCallback(
        async () => {
            // Obtención de los datos de registros desde la API
            const data = await api.tree({
                'model_name': modelName,
                'fields': fieldsConfig.map((config) => (config.name)),
                'limit': 40,
            })

            // Se establece el valor del estado
            setData(data);
        }, [api, fieldsConfig, modelName]
    );

    // Obtención de los datos
    useEffect(
        () => {
            searchRead();
        }, [searchRead]
    );

    return { fieldsConfig, suscribeFieldToRead, fieldsMetadataLoaded, data };
};

const Tree = <M extends IACele.Data.ModelName>({
    modelName,
    children,
    label,
}: TreeParams<M>) => {

    // Obtención de estados y funciones desde hook
    const { fieldsConfig, suscribeFieldToRead, fieldsMetadataLoaded, data } = useTree<M>(modelName);

    return (
        <TreeContext.Provider value={{
            fieldsConfig,
            suscribeFieldToRead: suscribeFieldToRead as ( (fieldName: any) => void ),
            label,
        }}>
            {children({ Field })}
            {fieldsMetadataLoaded && data &&
                <TreeView data={data} modelName={modelName} />
            }
        </TreeContext.Provider>
    );
};

export default Tree;

const TreeContext = createContext<TreeContextParams<any>>({
    fieldsConfig: [],
    suscribeFieldToRead: () => null,
    label: undefined,
});

const Field = <M extends IACele.Data.ModelName>({
    name,
}: FieldParams<M>) => {

    // Obtención de función de suscripción de campo
    const { suscribeFieldToRead } = useContext(TreeContext);

    // Suscripción de campo
    suscribeFieldToRead({name});

    return null;
};

const TreeView = <M extends IACele.Data.ModelName>({
    modelName,
    data,
}: TreeViewParams<M>) => {

    // Obtención de arreglo de campos a leer desde el contexto
    const { fieldsConfig, label } = useContext(TreeContext);
    // Obtención de función de consulta de metadatos de campo
    const { fieldsMetadata } = useLoadModelMetadata<M>(modelName);
    // Cambio de nombre de página
    const { setViewName } = useViewName();

    useEffect(
        () => {
            setViewName(label ?? data['model_label']);
        }, [setViewName, label, data]
    )

    // Inicialización de declaración de columnas de vista
    const columns: ColumnDef<IACele.Data.ModelDefinition<M>>[] = Array.from<
        FieldConfig<M>,
        ColumnDef<IACele.Data.ModelDefinition<M>>
    >(
        // Iterable a usar
        (fieldsConfig.map((config) => (config))),
        // Función de mapeo
        ( config ) => {
            
            const fieldName = (
                typeof config.name === 'object'
                    ? config.name[0]
                    : config.name
            ) as keyof IACele.Data.ModelDefinition<M>;

            return ({
                accessorKey: fieldName,
                header: (
                    fieldsMetadata(
                        modelName,
                        fieldName,
                    )['label']
                ),
                cell: ({ row }) => {

                    // Obtención de metadatos
                    const { ttype } = fieldsMetadata(modelName, fieldName);

                    // Obtención de componente a renderizar
                    const Component = widget[ttype];

                    return (
                        <Component
                            value={row.getValue(fieldName as string)}
                            modelName={modelName}
                            fieldName={fieldName}
                        />
                    )
                }
            });
        },
    );

    return (
        <View columns={columns} data={data['data']} />
    );
};

const View = <TData, TValue>({
    columns,
    data,
}: ViewProps<TData, TValue>) => {

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Table>
            <TableHeader>
                {
                    table
                    .getHeaderGroups()
                    .map(
                        (headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {
                                    headerGroup.headers.map(
                                        (header) => (
                                            <TableHead key={header.id}>
                                                {
                                                    header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext(),
                                                        )
                                                }
                                            </TableHead>
                                        )
                                    )
                                }
                            </TableRow>
                        )
                    )
                }
            </TableHeader>

            <TableBody>
                {
                    table
                    .getRowModel()
                    .rows
                    ?.length
                        ? (
                            table.getRowModel().rows.map(
                                (row) => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                        {
                                            row.getVisibleCells().map(
                                                (cell) => (
                                                    <TableCell key={cell.id}>
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </TableCell>
                                                )
                                            )
                                        }
                                    </TableRow>
                                )
                            )
                        )
                        : (
                            <TableRow>
                                <TableCell colSpan={columns.length}>
                                    No hay registros
                                </TableCell>
                            </TableRow>
                        )
                }
            </TableBody>
        </Table>
    );
};

// ----------------------------------------------------------------------------

const Widget = {

    Integer: ({
        value,
    }: DynamicWidgetParams<any, IACele.Data.TType.Integer>) => {

        return (
            value
        );
    },

    Char: ({
        value,
    }: DynamicWidgetParams<any, IACele.Data.TType.Char>) => {

        return (
            value
        );
    },

    Boolean: ({
        value = false,
    }: DynamicWidgetParams<any, IACele.Data.TType.Boolean>) => {

        if ( value === null ) {
            value = false;
        }

        return (
            <Checkbox checked={value} disabled />
        );
    },

    Float: ({
        value,
    }: DynamicWidgetParams<any, IACele.Data.TType.Float>) => {

        return (
            value
        );
    },

    Selection: ({
        value,
        modelName,
        fieldName,
    }: DynamicWidgetParams<any, IACele.Data.TType.Selection<string>>) => {

        // Obtención de función de consulta de metadatos de campo
        const { fieldsMetadata } = useLoadModelMetadata(modelName);

        // Obtención de valores de selección
        const selectionIds = fieldsMetadata(modelName, fieldName)['selection_ids']

        // Obtención de leyenda de selección
        const selectionLegend = (
            selectionIds
            .find(
                ( selectionRecord ) => (selectionRecord.name == value)
            )
            ?.label as string
        )

        return (
            selectionLegend
        );
    },

    Text: ({
        value,
    }: DynamicWidgetParams<any, IACele.Data.TType.Text>) => {

        return (
            value
        );
    },

    Many2One: ({
        value,
    }: DynamicWidgetParams<any, IACele.Data.TType.Many2One>) => {

        return (
            value !== null
                ? <span className="font-bold text-primary">{value[1]}</span>
                : null
        );
    },

    JSON: ({
        value,
    }: DynamicWidgetParams<any, IACele.Data.TType.JSON>) => {

        return (
            <span className="bg-neutral-700 shadow-sm px-2 border border-gray-300 rounded-sm ring-transparent font-mono text-green-500">
                {
                    value === null
                        ? 'null'
                        : typeof value === 'string'
                            ? `"${value}"`
                            : `${value}`
                }
            </span>
        );
    },

    ArrayTags: ({
        value,
    }: DynamicWidgetParams<any, IACele.Data.TType.One2Many>) => {

        return (
            <ArrayTags value={(value as {id: number; display_name: string;}[])} />
        );
    },

    Generic: ({
        value,
    }: DynamicWidgetParams<any, IACele.Data.TType.Char>) => {

        return value;
    },

};

const ArrayTags: React.FC<{value: {id: number; display_name: string;}[]}> = ({
    value,
}) => {

    return (
        <div className="flex flex-wrap gap-1">
            {
                value.map(
                    (record) => (
                        <Badge
                            key={record['id']}
                            className="bg-primary/80"
                        >
                            {record['display_name']}
                        </Badge>
                    )
                )
            }
        </div>
    );
};

const widget: Record<IACele.Data.TTypeName, React.FC<DynamicWidgetParams<any, any>>> = {
    'char': Widget.Char,
    'boolean': Widget.Boolean,
    'integer': Widget.Integer,
    'float': Widget.Float,
    'selection': Widget.Selection,
    'text': Widget.Text,
    'many2one': Widget.Many2One,
    'json': Widget.JSON,

    'date': Widget.Generic,
    'datetime': Widget.Generic,
    'time': Widget.Generic,
    'duration': Widget.Generic,
    'file': Widget.Generic,
    'one2many': Widget.ArrayTags,
    'many2many': Widget.ArrayTags,
};
