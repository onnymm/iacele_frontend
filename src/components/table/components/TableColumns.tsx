import TableColumn from "./TableColumn";
import Table from "../Table"; // eslint-disable-line
import useSortingFields from "../../../hooks/useSortingFields"; // eslint-disable-line
import useResize from "../../../hooks/useResize"; // eslint-disable-line

interface TableColumnsParams {
    viewConfig: ViewConfig[]; // Configuración de vista de datos.
    visibleColumns: OptionObject[]; // Estado {@link OptionObject OptionObject[ ]} de columnas visibles.
    sortingFieldKey: string | undefined; // Indicador de cuál columna está ordenando los datos actualmente.
    ascending: boolean | undefined; // Indicador de dirección de ordenamiento a mostrar en caso de que la columna esté ordenando datos actualmente, obtenido desde el Custom Hook {@link useSortingFields}.
    setSortingColumn: (key: string) => void; // Función de cambio de estado para establecer esta columna como ordenadora de datos, obtenida desde el Custom Hook {@link useSortingFields}.
    resizeColumn: (columnKey: string, width: number | null) => void; // Función para redimensionar la columna, obtenida desde el Custom Hook {@link useResize}.
}

/** 
 *  ## Columnas de tabla
 *  Este componente renderiza las columnas del componente {@link Table}.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link ViewConfig ViewConfig[]} ] `viewConfig`: Configuración de vista de datos.
 *  - [ {@link OptionObject OptionObject[]} ] `visibleColumns`: Estado
 *  {@link OptionObject OptionObject[ ]} de columnas visibles.
 *  - [ `string | undefined` ] `sortingFieldKey`: Indicador de cuál
 *  columna está ordenando los datos actualmente.
 *  - [ `boolean | undefined` ] `ascending`: Indicador de dirección de
 *  ordenamiento a mostrar en caso de que la columna esté ordenando datos
 *  actualmente, obtenido desde el Custom Hook {@link useSortingFields}.
 *  - [ `undefined` ] `setSortingColumn`: Función de cambio de estado para
 *  establecer esta columna como ordenadora de datos, obtenida desde el Custom
 *  Hook {@link useSortingFields}.
 *  - [ `undefined` ] `resizeColumn`: Función para redimensionar la columna,
 *  obtenida desde el Custom Hook {@link useResize}.
 */ 
const TableColumns: (config: TableColumnsParams) => (React.JSX.Element) = ({
    viewConfig,
    visibleColumns,
    sortingFieldKey,
    ascending,
    setSortingColumn,
    resizeColumn,
}) => {

    return (
        <thead role="rowgroup relative">
            <tr role="row" className="top-0 z-10 sticky rounded-lg w-full max-w-full h-10 whitespace-nowrap">
                {
                    viewConfig.map(
                        (column, i) => {

                            const isVisible = visibleColumns.find( (item) => (item.key == column.key) )

                            if ( column.tableVisible === undefined || isVisible?.active ) {
                                return (
                                    <TableColumn
                                        key={i}
                                        columnKey={column.key}
                                        title={column.displayName}
                                        canSort={column.canSort !== false}
                                        isSorting={column.key === sortingFieldKey}
                                        ascending={ascending}
                                        setSortingColumn={setSortingColumn}
                                        resizeColumn={resizeColumn}
                                    />
                                )
                            }
                        }
                    )
                }
                <th className="left-0 absolute border border-gray-400/30 rounded-lg w-full h-full pointer-events-none"></th>
            </tr>
        </thead>
    );
};

export default TableColumns;
