import { useColumnWidths } from "../../../hooks/useColumnWidths"; // eslint-disable-line
import Table from "../Table"; // eslint-disable-line
import TableCell from "./TableCell";

interface TableRowParams {
    record: GenericObject;  // Objeto de registro. Este es un objeto perteneciente a la matriz de registros recibida desde el backend.
    viewConfig: ViewConfig[]; // Configuración de vista de datos.
    visibleColumns: OptionObject[]; // Estado {@link OptionObject OptionObject[ ]} de columnas visibles.
    fields: DataField[]; // Datos del tipo de campos a renderizar.
    columnWidths: WidthsValues; // Estado de ancho de columnas, obtenido desde el Custom Hook {@link useColumnWidths}.
}

/** 
 *  ## Fila de tabla
 *  Este componente renderiza una fila del componente {@link Table} y sus
 *  respectivas celdas.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link GenericObject} ] `record`: Objeto de registro. Este es un objeto
 *  perteneciente a la matriz de registros recibida desde el backend.
 *  - [ {@link ViewConfig ViewConfig[ ]} ] `viewConfig`: Configuración de vista de datos.
 *  - [ {@link OptionObject OptionObject[ ]} ] `visibleColumns`: Estado
 *  {@link OptionObject OptionObject[ ]} de columnas visibles.
 *  - [ {@link DataField DataField[ ]} ] `fields`: Datos del tipo de campos a renderizar.
 *  - [ {@link WidthsValues} ] `columnWidths`: Estado de
 *  ancho de columnas, obtenido desde el Custom Hook {@link useColumnWidths}.
 */
const TableRow = ({
    record,
    viewConfig,
    visibleColumns,
    fields,
    columnWidths,
}: TableRowParams) => {

    return (
        <tr>
            {
                (
                    // Filtro por las columnas visibles
                    viewConfig.filter(
                        (recordConfig) => {
                            // Mostrar columna desde configuración
                            const configShowColumn = !recordConfig.tableHide
                            // Columna visible
                            const isVisible = visibleColumns.find(
                                (item) => (item.key === recordConfig.key)
                            )
                            return ( configShowColumn && isVisible?.active )
                        }
                    )
                    .map(
                        (recordConfig, i) => {

                            return (
                                <TableCell
                                    key={i}
                                    columnKey={recordConfig.key}
                                    width={columnWidths[recordConfig.key]}
                                    record={record}
                                    recordConfig={recordConfig}
                                    fields={fields}
                                />
                            )
                        }
                    )
                )
            }
        </tr>
    )
}

export default TableRow;
