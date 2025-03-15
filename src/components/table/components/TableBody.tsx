import { useColumnWidths } from "../../../hooks/useColumnWidths"; // eslint-disable-line
import Table from "../Table"; // eslint-disable-line
import TableRow from "./TableRow";

interface TableBodyParams {
    data: ResponseDataStructure; // Matriz de datos a renderizar.
    viewConfig: ViewConfig[]; // Configuración de vista de datos.
    visibleColumns: OptionObject[]; // Estado {@link OptionObject OptionObject[ ]} de columnas visibles.
    columnWidths: WidthsValues; // Estado de ancho de columnas, obtenido desde el Custom Hook {@link useColumnWidths}.
}

/** 
 *  ## Cuerpo de tabla
 *  Este componente renderiza el cuerpo del componente {@link Table} en donde 
 *  se renderizarán los valores de los datos en filas.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link ResponseDataStructure} ] `data`: Matriz de datos a renderizar.
 *  - [ {@link ViewConfig ViewConfig[]} ] `viewConfig`: Configuración de vista de datos.
 *  - [ {@link OptionObject OptionObject[]} ] `visibleColumns`: Estado
 *  {@link OptionObject OptionObject[ ]} de columnas visibles.
 *  - [ {@link WidthsValues} ] `columnWidths`: Estado de ancho de columnas, 
 *  obtenido desde el Custom Hook {@link useColumnWidths}.
 */ 
const TableBody = ({
    data,
    viewConfig,
    columnWidths,
    visibleColumns,
}: TableBodyParams): (React.JSX.Element) => {

    return (
        <tbody className="p-t-10 rounded-lg size-full overflow-hidden">
            {
                data.data.map(
                    (record, i) => (
                        <TableRow key={i} record={record} viewConfig={viewConfig} fields={data.fields} visibleColumns={visibleColumns} columnWidths={columnWidths} />
                    )
                )
            }
        </tbody>
    );
};

export default TableBody;
