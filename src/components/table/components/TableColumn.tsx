import React, { useEffect, useRef } from "react";
import SortingDirection from "./SortingDirection";
import SortingIndicator from "./SortingIndicator";
import useResize from "../../../hooks/useResize";
import Table from "../Table"; // eslint-disable-line
import useSortingFields from "../../../hooks/useSortingFields"; // eslint-disable-line

interface TableColumnParams {
    columnKey: string; // Llave de la columna a renderizar.
    title?: string; // Título de la columna.
    canSort?: boolean; // Indicador de si la columna puede ordenar datos en base al campo que representa.
    isSorting: boolean; // Indicador de si la columna está ordenando datos actualmente, obtenido desde el Custom Hook {@link useSortingFields}.
    ascending: boolean | undefined; // Indicador de dirección de ordenamiento a mostrar en caso de que la columna esté ordenando datos actualmente, obtenido desde el Custom Hook {@link useSortingFields}.
    setSortingColumn: (key: string) => void; // Función de cambio de estado para establecer esta columna como ordenadora de datos, obtenida desde el Custom Hook {@link useSortingFields}.
    resizeColumn: (columnKey: string, width: number | null) => void; // Función para redimensionar la columna, obtenida desde el Custom Hook {@link useResize}.
}

/** 
 *  ## Columna de tabla
 *  Este componente renderiza una columna del componente {@link Table}.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `columnKey`: Llave de la columna a renderizar.
 *  - [ `string` ] `title`: Título de la columna.
 *  - [ `boolean` ] `canSort`: Indicador de si la columna puede ordenar datos 
 *  en base al campo que representa.
 *  - [ `boolean` ] `isSorting`: Indicador de si la columna está ordenando 
 *  datos actualmente, obtenido desde el Custom Hook {@link useSortingFields}.
 *  - [ `boolean | undefined` ] `ascending`: Indicador de dirección de 
 *  ordenamiento a mostrar en caso de que la columna esté ordenando datos 
 *  actualmente, obtenido desde el Custom Hook {@link useSortingFields}.
 *  - [ `function` ] `setSortingColumn`: Función de cambio de estado para 
 *  establecer esta columna como ordenadora de datos, obtenida desde el Custom 
 *  Hook {@link useSortingFields}.
 *  - [ `function` ] `resizeColumn`: Función para redimensionar la columna, 
 *  obtenida desde el Custom Hook {@link useResize}.
 */ 
const TableColumn = ({
    columnKey,
    title,
    canSort,
    isSorting,
    ascending,
    setSortingColumn,
    resizeColumn,
}: TableColumnParams): (React.JSX.Element) => {

    const columnWidth = useRef<number | null>(null);

    // Color de fondo
    const bgClassName = {
        true: "bg-main-300/50 hover:bg-main-200/50 dark:hover:bg-main-200/50",
        false: "bg-gray-200/50 hover:bg-gray-300/50 dark:bg-gray-500/50 dark:hover:bg-gray-100/40",
    };

    // Referencia al contenedor redimensionable
    const resizableRef = useRef(null);
    // Referencia al objeto redimensionador
    const resizerRef = useRef<HTMLDivElement>(null);

    const initialWidth = useResize(resizableRef, resizerRef, columnKey, resizeColumn);

    useEffect(
        () => {
            columnWidth.current = initialWidth.current;
        }, [initialWidth]
    );

    return (
        <th
            id={`table-column-[${columnKey}]`}
            className={`${bgClassName[`${isSorting}`]} w-min overflow-hidden first-of-type:rounded-l-lg last-of-type:rounded-r-lg group backdrop-blur-sm z-99 font-light text-start align-middle select-none transition-colors duration-500 dark:text-white`}
            role="columnheader"
            
        >
            <ColumnContent
                columnKey={columnKey}
                resizableRef={resizableRef}
                resizerRef={resizerRef}
                columnWidth={columnWidth}
                initialWidth={initialWidth}
                content={title}
                canSort={canSort}
                isSorting={isSorting}
                ascending={ascending}
                setSortingColumn={setSortingColumn}
                // resizeColumn={resizeColumn}
            />
        </th>
    );
};

export default TableColumn;

interface ColumnContentParams {
    columnKey: string;
    resizableRef: React.MutableRefObject<null | HTMLDivElement>;
    resizerRef: React.MutableRefObject<null | HTMLDivElement>;
    columnWidth: React.MutableRefObject<number | null>;
    initialWidth: React.RefObject<number>;
    content?: string;
    canSort?: boolean;
    isSorting: boolean;
    ascending: boolean | undefined;
    setSortingColumn: (key: string) => void;
    // resizeColumn: (columnKey: string, width: number) => void;
}

// Contenido de la columna
const ColumnContent = React.memo<(config: ColumnContentParams) => (React.JSX.Element)>(
    ({
        columnKey,
        resizableRef,
        resizerRef,
        columnWidth,
        initialWidth,
        content,
        canSort,
        isSorting,
        ascending,
        setSortingColumn,
        // resizeColumn,
    }) => {

        return (
            <div
                className="relative flex flex-row items-center h-full overflow-hidden"
                style={!initialWidth.current ? {width: '100%'} : undefined}
            >
                <div
                    ref={resizableRef}
                    style={initialWidth.current ? {width: columnWidth.current as number} : {width: '100%'}}
                    className="ui-table-column relative flex flex-row items-center gap-2 py-2 pr-10 pl-4 min-w-12 h-full overflow-hidden"
                    onClick={canSort ? () => setSortingColumn(columnKey) : () => (null)}
                >
                    <span className="text-ellipsi">{content ? content : ""}</span>

                </div>
                    {/* Ícono del estatus de orden */}
                    {canSort
                        ? (isSorting
                            ? <SortingDirection ascending={ascending} />
                            : <SortingIndicator />
                        )
                        : undefined
                    }
                <div ref={resizerRef} className="-right-[1px] absolute bg-white/50 opacity-0 group-hover:opacity-100 w-1 h-[calc(100%_+_2px)] cursor-col-resize"/>
            </div>
        );
    }
);
