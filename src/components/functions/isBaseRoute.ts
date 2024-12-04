import { MenuRoute } from "../../settings/types";

/** 
 *  ## Es ruta base
 *  Esta función valida si una cadena de ruta es ruta base de la ubicación
 *  provista.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `location`: Ruta de ubicación provista desde el hook
 *  {@link useLocation} desde el atributo `pathname`.
 *  - [ `string` ] `route`: Ruta de referencia para la evaluación.
 *  
 *  ### Retorno
 *  Esta función retorna:
 *  - [ `boolean` ] `*` : Validación si la ruta provista es base de la
 *  ubicación actual.
 */ 
const isBaseRoute: (location: string, route: string | MenuRoute[] | undefined) => (boolean) = (location, route) => {

    // Creación de patrón de expresión regular para validar
    const pattern = RegExp(`^(${route})/?`);

    // Evaluación de la ruta
    const match = pattern.exec(location)

    // Retorno de validación
    if ( match ) return match[1] === route;
    return false;
}

export default isBaseRoute;
