import React from "react";
import { setComponentStyle } from "../../functions/tables";
import { commonComponent } from "../../widgets/TableWidgets";
import CellRenderError from "./CellRenderError";

interface TableCellRender {
    columnKey: string; // Llave de la columna a la que la celda pertenece.
    options: ValidationOptions | undefined; // Objeto de funciones de validación para estilización del valor.
    props: DataRecord; // Objeto de registro. Este es un objeto perteneciente a la matriz de registros recibida desde el backend.
    recordConfig: ViewConfig; // Configuración del campo a renderizar.
    fields: DataField[]; // Datos del tipo de campo a renderizar.
}

/** 
 *  ## Celda de tabla
 *  Este componente renderiza celdas del componente {@link Table}, usando los 
 *  datos de campo para renderizar el tipo de dato o recibiendo un componente 
 *  personalizado para renderizar uno o varios atributos del objeto de registro 
 *  proporcionado.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `columnKey`: Llave de la columna a la que la celda pertenece.
 *  - [ {@link ValidationOptions ValidationOptions} `| undefined` ] `options`:
 *  Objeto de funciones de validación para estilización del valor.
 *  - [ {@link DataRecord} ] `props`: Objeto de registro. Este es un objeto 
 *  perteneciente a la matriz de registros recibida desde el backend.
 *  - [ {@link ViewConfig} ] `recordConfig`: Configuración del campo a 
 *  renderizar.
 *  - [ {@link DataField DataField[ ]} ] `fields`: Datos del tipo de campo a renderizar.
 */ 
const CellComponent: (config: TableCellRender) => (React.JSX.Element) = ({
    columnKey,
    props,
    recordConfig,
    fields,
}) => {

    // Inicialización del estilo del componente
    const uiStyle = setComponentStyle(props[columnKey], recordConfig.options);

    // Construcción del componente a renderizar
    const Component = buildCellComponent(recordConfig, fields);

    return (
        <div className={`${uiStyle} overflow-hidden text-ellipsis scrollbar-hide w-full`}>
            <Component {...props} />
        </div>
    );
};

// Constructor del componente de la celda
const buildCellComponent: (recordConfig: ViewConfig, fields: DataField[]) => TableGenericWidget<number> | TableGenericWidget<string> = (
    recordConfig: ViewConfig,
    fields: DataField[],
) => {

    // Si el valor del tipo es un componente personalizado
    if ( typeof recordConfig.type === 'function' ) {
        return recordConfig.type;

    // Si el valor del tipo es un componente base
    } else if ( typeof recordConfig.type === 'string' ) {
        return commonComponent[recordConfig.type](recordConfig.key);

    // Obtención del campo especificado por el backend
    } else {
        // Búsqueda del registro del tipo de campo
        const field = fields.find( (item) => (item.name === recordConfig.key) );

        // Retorno del componente genérico
        if ( field ) {
            return commonComponent[field.ttype](recordConfig.key);

        // Retorno de error en caso de no haber un tipo de campo especificado
        } else {
            return CellRenderError;
        }
    }
};

export default React.memo(CellComponent);
