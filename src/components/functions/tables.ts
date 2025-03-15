import { UI_CLASS_NAMES } from "../../settings/ui";

/** 
 *  ## Estilización de valor de celda
 *  Esta función asigna una clase CSS que estiliza un valor de un componente en
 *  base a su valor y condiciones.
 *  
 *  ### Parámetros de entrada
 *  - [ `string | number | boolean` ] `property`: Valor del dato.
 *  - [ {@link ValidationOptions} `| undefined` ] `options`: Objeto de funciones 
 *  de validación.
 */ 
export const setComponentStyle: (
    property: string | number | boolean,
    options: ValidationOptions | undefined,
) => ( string ) = (
    property,
    options,
) => {

    // Si no hay validaciones disponibles se retorna
    if ( !options ) return UI_CLASS_NAMES.NONE;

    // Validación del valor entrante
    if ( options?.danger && options.danger(property) ) {
        return UI_CLASS_NAMES.DANGER;

    } else if ( options?.warning && options.warning(property) ) {
        return UI_CLASS_NAMES.WARNING;

    } else if ( options?.success && options.success(property) ) {
        return UI_CLASS_NAMES.SUCCESS;

    } else if ( options?.info && options.info(property) ) {
        return UI_CLASS_NAMES.INFO;

    } else {
        return UI_CLASS_NAMES.NONE;
    }
};
