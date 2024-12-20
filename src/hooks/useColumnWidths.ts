import { useState } from "react";
import Table from "../components/table/Table"; // eslint-disable-line

/** 
 *  ## Anchos de columna
 *  Este Custom Hook crea un estado de anchos de columna para poder actualizar
 *  las medidas de las celdas del componente {@link Table}.
 *   
 *  ### Parámetros de entrada
 *  - [ {@link ViewConfig ViewConfig[ ]} ]: `viewConfig`: Interfaz de
 *  configuración de vista de datos.
 *  
 *  ### Retorno
 *  Este Custom Hook retorna:
 *  - [ {@link ColumnWidths} ] `columnWidths`: objeto contenedor de anchos de 
 *  columnas.
 *  - [ `function` ] `resizeColumn`: Función de redimensionamiento de columna 
 *  individual.
 */ 
export const useColumnWidths = (viewConfig: ViewConfig[]) => {

    // Inicialización de objeto contenedor de anchos de columnas
    const initColumnWidths: ColumnWidths = {};

    // Asignación inicial de valores nulos
    viewConfig.forEach(
        (setting) => {
            initColumnWidths[setting.key] = null;
        }
    )

    // Inicialización de estado
    const [ columnWidths, setColumnWiths ] = useState<ColumnWidths>(initColumnWidths);

    // Función para redimensionar columnas
    const resizeColumn = (columnKey: string, width: number | null): void => {

        // Creación de copia de anchos de columnas
        const columnWidthsCopy = { ...columnWidths }

        // Actualización de valor de ancho de columna en columna manipulada
        columnWidthsCopy[columnKey] = width

        // Cambio de estado
        setColumnWiths(columnWidthsCopy)
    }

    // Retorno de estado y función de actualización de ancho de columnas
    return { columnWidths, resizeColumn }
}
