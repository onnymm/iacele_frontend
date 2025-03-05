export const inputType: Record<IACele.Types.TypeName, React.InputHTMLAttributes<HTMLInputElement>['type']> = {
    'char': 'text',
    'integer': 'number'
}

type ValueValidationFunctionMap = Record<
    IACele.Types.TypeName,
    (
        recordValue: string,
        fieldValue: string
    ) => (IACele.Types.ValueType)
>

/** 
 *  ## Funciones de validación de valor en campo
 *  Estas funciones, indexables por tipo de dato, realizan una validación del
 *  valor para determinar si éste es válido según su tipo de dato. En caso de
 *  no serlo, intentan corregirlo o lo establecen a `undefined`.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `recordValue`: Valor del registro en la base de datos.
 *  - [ `string` ] `fieldValue`: Valor del registro en el campo.
 */ 
export const validationCallbacks: ValueValidationFunctionMap = {
    
    // Validación de valores tipo string
    char: (recordValue, fieldValue) => {

        // Si el texto está vacío se convierte a undefined
        const formattedValue = (
            recordValue !== ''
                ? (
                    fieldValue !== ''
                        ? fieldValue
                        : undefined
                )
                : undefined
        )

        // Retorno del valor formateado
        return formattedValue;
    },

    // Validación de valores tipo integer
    integer: (recordValue, fieldValue) => {

        // Creación de patrón regex
        const pattern: RegExp = /^\d+?$/

        // Si el valor de entrada no es un número se establece en undefined
        const formattedValue = (
            recordValue !== ''
                ? (
                    pattern.test(fieldValue)
                        ? Number(fieldValue)
                        : undefined
                )
                : undefined
        )

        // Retorno del valor formateado
        return formattedValue;
    }
}
