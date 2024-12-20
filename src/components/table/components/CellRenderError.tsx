import { COMMON_LEGEND } from "../../../settings/appSettings";

/** 
 *  ## Error de renderización de componente en celda
 *  Este componente renderiza un mensaje de error de renderización en una celda
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */ 
const CellRenderError = (): (React.JSX.Element) => {

    return (
        <div className="size-full">
            { COMMON_LEGEND.CELL_RENDER_ERROR }
        </div>
    )
}

export default CellRenderError;
