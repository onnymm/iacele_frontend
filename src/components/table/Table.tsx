import React from "react";
import { DataViewData } from "../../api/dataVisualization";
import TableColumns from "./components/TableColumns";
import { useColumnWidths } from "../../hooks/useColumnWidths";
import TableBody from "./components/TableBody";
import TableNoRecords from "./components/TableNoRecords";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import { COMMON_LEGEND } from "../../settings/appSettings";
import Fallback from "../misc/Fallback";
import { TableCellsIcon } from "@heroicons/react/24/solid";
import useSortingFields from "../../hooks/useSortingFields"; // eslint-disable-line

interface TableParams {
    data: DataViewData; // Matriz de datos a renderizar.
    viewConfig: ViewConfig[]; // Configuración de vista de datos.
    sortingFieldKey: string | undefined; // Indicador de cuál columna está ordenando los datos actualmente.
    ascending: boolean | undefined; // Indicador de dirección de ordenamiento a mostrar en caso de que la columna esté ordenando datos actualmente, obtenido desde el Custom Hook {@link useSortingFields}.
    visibleColumns: OptionObject[]; // Estado {@link OptionObject OptionObject[ ]} de columnas visibles.
    setSortingColumn: (key: string) => void; // Función de cambio de estado para establecer esta columna como ordenadora de datos, obtenida desde el Custom Hook {@link useSortingFields}.
    loading: boolean; // Indicador de estado de carga, en espera de respuesta del backend.
    tableRef: React.RefObject<HTMLDivElement>; // Referencia a utilizar para reiniciar deslizamiento en los datos de la tabla.
    noRecordsIcon: IconType; // Ícono descriptivo de ausencia de datos en la tabla.
    noRecordsMessage: string; // Mensaje descriptivo que indica la ausencia de datos.
}

/** 
 *  ## Tabla asíncrona de datos
 *  Este componente renderiza una tabla para visualización dinámica de datos
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link DataViewData} ] `data`: Matriz de datos a renderizar.
 *  - [ {@link ViewConfig ViewConfig[ ]} ] `viewConfig`: Configuración de vista de datos.
 *  - [ `string | undefined` ] `sortingFieldKey`: Indicador de cuál
 *  columna está ordenando los datos actualmente.
 *  - [ `boolean | undefined` ] `ascending`: Indicador de dirección de
 *  ordenamiento a mostrar en caso de que la columna esté ordenando datos
 *  actualmente, obtenido desde el Custom Hook {@link useSortingFields}.
 *  - [ {@link OptionObject OptionObject[ ]} ] `visibleColumns`: Estado
 *  {@link OptionObject OptionObject[ ]} de columnas visibles.
 *  - [ `undefined` ] `setSortingColumn`: Función de cambio de estado para
 *  establecer esta columna como ordenadora de datos, obtenida desde el Custom
 *  Hook {@link useSortingFields}.
 *  - [ `boolean` ] `loading`: Indicador de estado de carga, en espera de
 *  respuesta del backend.
 *  - [ {@link React.RefObject<HTMLDivElement>} ] `tableRef`: Referencia a
 *  utilizar para reiniciar deslizamiento en los datos de la tabla.
 *  - [ {@link IconType} ] `noRecordsIcon`: Ícono descriptivo de ausencia de
 *  datos en la tabla.
 *  - [ `string` ] `noRecordsMessage`: Mensaje descriptivo que indica la
 *  ausencia de datos.
 */ 
const Table = ({
    data,
    viewConfig,
    sortingFieldKey,
    ascending,
    visibleColumns,
    setSortingColumn,
    loading,
    tableRef,
    noRecordsIcon: NoRecordsIcon = ListBulletIcon,
    noRecordsMessage = COMMON_LEGEND.NO_RECORDS_MESSAGE,
}: TableParams): React.JSX.Element => {

    const isDataEmpty = data.data.length === 0;

    // Inicialización de anchos de columnas
    const { columnWidths, resizeColumn } = useColumnWidths(viewConfig);

    return (
        <div id="table-component" className="relative z-0 sm:flex flex-col flex-grow hidden max-w-full overflow-hidden scrollbar-hide size-full">
            <div id="table-visible-area" className={`${isDataEmpty ? "w-full" : "w-max max-w-full"} relative border-gray-500/30 bg-white dark:bg-gray-800 shadow-md p-2 border rounded-xl transition duration-100 overflow-hidden scrollbar-hide size-full`}>
                
                {/* Tabla con datos */}
                <div id="table-data" className={`${loading ? 'flex-grow flex opacity-0 pointer-events-none' : ""} ${isDataEmpty ? "w-full" : "max-w-max"} ui-table-data overflow-scroll scrollbar-hide relative flex rounded-lg min-h-full h-full`} ref={tableRef}>

                    {/* Contenedor para efecto de sombra en encabezado */}
                    <div id="table-header" className={`${loading || isDataEmpty ? "flex-grow flex opacity-0" : ""} z-10 h-10 absolute pointer-events-none shadow-md dark:border-none rounded-lg w-full`}/>

                    {/* Tabla con datos */}
                    {data && !isDataEmpty &&
                        <div id="table-container" className="relative flex rounded-lg min-w-full h-max">
                            <table role="grid" className="block z-1 table-fixed mb-2 min-w-full size-full">

                                <TableColumns
                                    viewConfig={viewConfig}
                                    sortingFieldKey={sortingFieldKey}
                                    ascending={ascending}
                                    setSortingColumn={setSortingColumn}
                                    visibleColumns={visibleColumns}
                                    resizeColumn={resizeColumn}
                                />

                                <TableBody
                                    data={data}
                                    viewConfig={viewConfig}
                                    visibleColumns={visibleColumns}
                                    columnWidths={columnWidths}
                                />

                            </table>
                        </div>
                    }

                    {/* Indicador de tabla vacía */}
                    {isDataEmpty && !loading &&
                        <div className="flex-grow p-2 size-full">
                            <TableNoRecords icon={NoRecordsIcon} message={noRecordsMessage} />
                        </div>
                    }
                </div>

                {/* Estado de tabla cargando */}
                {!isDataEmpty && loading &&
                    <div className="top-0 left-0 absolute flex-grow p-2 size-full">
                        <Fallback icon={TableCellsIcon} />
                    </div>
                }
            </div>
        </div>
    );
};

export default Table;
