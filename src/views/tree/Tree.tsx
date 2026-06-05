import useAPI from "@/hooks/app/useAPI";
import useLoadModelMetadata from "@/hooks/views/useModelMetadata";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

interface TreeParams<M extends IACele.Data.ModelName> {
    modelName: M;
    children: (params: RenderParams<M>) => React.ReactNode;
};

interface RenderParams<M extends IACele.Data.ModelName> {
    Field: React.FC<FieldParams<M>>;
};

interface TreeContextParams<M extends IACele.Data.ModelName> {
    fieldsToRead: (keyof IACele.Data.ModelDefinition<M>)[];
    suscribeFieldToRead: (fieldName: keyof IACele.Data.ModelDefinition<M>) => void;
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

interface DynamicWidgetParams<T> {
    value: T;
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
    const fieldsToRead: (keyof IACele.Data.ModelDefinition<M>)[] = useMemo(
        () => ([]), []
    );

    // Inicialización de función para añadir nombres de campos a leer
    const suscribeFieldToRead = useCallback(
        (fieldName: keyof IACele.Data.ModelDefinition<M>) => {
            // Se busca el valor del campo en el array
            const foundValue = fieldsToRead.find( (value) => (value === fieldName) );
            // Si el nombre del campo no existe en el array...
            if ( !foundValue ) {
                // Se añade éste
                fieldsToRead.push(fieldName);
            };
        }, [fieldsToRead]
    );

    // Inicialización de función de búsqueda y lectura de resultados
    const searchRead = useCallback(
        async () => {
            // Obtención de los datos de registros desde la API
            const data = await api.tree({
                'model_name': modelName,
                'fields': fieldsToRead,
                'limit': 40,
            })
            console.log(data);
            // Se establece el valor del estado
            setData(data);
        }, [api, fieldsToRead, modelName]
    );

    // Obtención de los datos
    useEffect(
        () => {
            searchRead();
        }, [searchRead]
    );

    return { fieldsToRead, suscribeFieldToRead, fieldsMetadataLoaded, data };
};

const Tree = <M extends IACele.Data.ModelName>({
    modelName,
    children,
}: TreeParams<M>) => {

    // Obtención de estados y funciones desde hook
    const { fieldsToRead, suscribeFieldToRead, fieldsMetadataLoaded, data } = useTree<M>(modelName);

    return (
        <TreeContext.Provider value={{
            fieldsToRead,
            suscribeFieldToRead: suscribeFieldToRead as ( (fieldName: any) => void ),
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
    fieldsToRead: [],
    suscribeFieldToRead: () => null,
});

const Field = <M extends IACele.Data.ModelName>({
    name,
}: FieldParams<M>) => {

    // Obtención de función de suscripción de campo
    const { suscribeFieldToRead } = useContext(TreeContext);
    // Suscripción de campo
    suscribeFieldToRead(name);

    return null;
};

const TreeView = <M extends IACele.Data.ModelName>({
    modelName,
    data,
}: TreeViewParams<M>) => {

    // Obtención de arreglo de campos a leer desde el contexto
    const { fieldsToRead } = useContext(TreeContext);
    // Obtención de función de consulta de metadatos de campo
    const { fieldsMetadata } = useLoadModelMetadata<M>(modelName);

    // Inicialización de declaración de columnas de vista
    const columns: ColumnDef<IACele.Data.ModelDefinition<M>>[] = Array.from<
        keyof IACele.Data.ModelDefinition<M>,
        ColumnDef<IACele.Data.ModelDefinition<M>>
    >(
        // Iterable a usar
        (fieldsToRead as (keyof IACele.Data.ModelDefinition<M>)[]),
        // Función de mapeo
        ( fieldName ) => ({
            accessorKey: fieldName,
            header: fieldsMetadata(modelName, fieldName)['label'],
            cell: ({ row }) => {
                // Obtención de metadatos
                const { ttype } = fieldsMetadata(modelName, fieldName);

                const Component = widget[ttype];
                return (
                    <Component value={row.getValue(fieldName as string)} />
                )
            }
        }),
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
                    table.getHeaderGroups().map(
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
                    table.getRowModel().rows?.length
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
    }: DynamicWidgetParams<IACele.Data.TType.Integer>) => {

        return (
            value
        );
    },

    Char: ({
        value,
    }: DynamicWidgetParams<IACele.Data.TType.Char>) => {

        return (
            value
        );
    },

    Boolean: ({
        value = false,
    }: DynamicWidgetParams<IACele.Data.TType.Boolean>) => {

        if ( value === null ) {
            value = false;
        }

        return (
            <Checkbox checked={value} disabled />
        );
    },

    Float: ({
        value,
    }: DynamicWidgetParams<IACele.Data.TType.Float>) => {

        return (
            value
        );
    },

    Selection: ({
        value,
    }: DynamicWidgetParams<IACele.Data.TType.Selection<string>>) => {

        return (
            value
        );
    },

    Text: ({
        value,
    }: DynamicWidgetParams<IACele.Data.TType.Text>) => {

        return (
            value
        );
    },

    Many2One: ({
        value,
    }: DynamicWidgetParams<IACele.Data.TType.Many2One>) => {

        return (
            value !== null
                ? <span className="font-bold text-primary">{value[1]}</span>
                : null
        );
    },

    JSON: ({
        value,
    }: DynamicWidgetParams<IACele.Data.TType.JSON>) => {

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

    Generic: ({
        value,
    }: DynamicWidgetParams<IACele.Data.TType.Char>) => {

        return value;
    },

};

const widget: Record<IACele.Data.TTypeName, React.FC<DynamicWidgetParams<any>>> = {
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
    'one2many': Widget.Generic,
    'many2many': Widget.Generic,
};
