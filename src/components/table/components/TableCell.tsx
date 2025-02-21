import { useColumnWidths } from "../../../hooks/useColumnWidths"; // eslint-disable-line
import CellComponent from "./CellComponent";

interface TableCellParams {
    columnKey: string; // Llave de la columna del dato a renderizar.
    width: number | null; // Valor de ancho de columna, obtenido desde el Custom Hook {@link useColumnWidths}.
    record: DataRecord; // Objeto de registro. Este es un objeto perteneciente a la matriz de registros recibida desde el backend.
    recordConfig: ViewConfig; // Configuración del campo a renderizar.
    fields: DataField[]; // Datos del tipo de campo a renderizar.
}

/** 
 *  ## Celda de tabla
 *  Este componente renderiza una celda del componente {@link Table} y el 
 *  componente respectivo al valor que ésta deberá mostrar.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `columnKey`: Llave de la columna del dato a renderizar.
 *  - [ {@link number | null} ] `width`: Valor de ancho de columna, obtenido
 *  desde el Custom Hook {@link useColumnWidths}.
 *  - [ {@link DataRecord} ] `record`: Objeto de registro. Este es un objeto
 *  perteneciente a la matriz de registros recibida desde el backend.
 *  - [ {@link ViewConfig} ] `recordConfig`: Configuración del campo a
 *  renderizar.
 *  - [ {@link DataField[]} ] `fields`: Datos del tipo de campo a renderizar.
 */ 
const TableCell: (config: TableCellParams) => (React.JSX.Element) = ({
    columnKey,
    width,
    record,
    recordConfig,
    fields
}) => {

    return (
        <td
            className="group-hover:*:text-main-500 min-w-4 h-full overflow-hidden font-light text-gray-600 dark:text-white/70 text-start *:transition-colors"
            >
            <div
                style={width ? {width: width + 'px'} : undefined}
                className="scrollbar-hidden px-4 py-2 w-full min-w-14 max-w-full overflow-hidden"
            >
                <CellComponent columnKey={columnKey} recordConfig={recordConfig} props={record} fields={fields} options={recordConfig.options} />
            </div>
        </td>
    )
}

export default TableCell;
