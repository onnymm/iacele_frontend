export const inputType: Record<IACele.Types.TypeName, React.InputHTMLAttributes<HTMLInputElement>['type']> = {
    'char': 'text',
    'integer': 'number',
    'float': 'number',
    'monetary': 'text',
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
    integer: (_, fieldValue) => {

        // Si el valor de entrada no es un número se establece en undefined
        const formattedValue = parseTo.integer(fieldValue)

        // Retorno del valor formateado
        return formattedValue;
    },

    // Validación de valores tipo float
    float: (_, fieldValue) => {

        // Si el valor de entrada no es un número se establece en undefined
        const formattedValue = parseTo.float(fieldValue)

        // Retorno del valor formateado
        return formattedValue;
    },

    // Validación de tipo monetario
    monetary: (_, fieldValue) => {

        // Si el valor de entrada no es un número se establece en undefined
        const formattedValue = parseTo.float(fieldValue)

        // Retorno del valor formateado
        return formattedValue;
    }
}

const parseTo: Record<string, (value: string) => IACele.Types.ValueType> = {
    integer: (value: string): IACele.Types.Integer => {

        return (
            value !== ''
                ? (
                    matchType.integer.test(value)
                        ? Number(value)
                        : matchType.float.test(value)
                            ? Number( value.replace(/^(\d+?)\.\d+?$/, '$1') )
                            : undefined
                )
                : undefined
        )
    },

    float: (value: string): IACele.Types.Float => {

        return (
            value !== ''
                ? (
                    matchType.float.test(value)
                        ? Number(value)
                        : matchType.integer.test(value)
                            ? Number( `${value}.00` )
                            : undefined
                )
                : undefined
        )
    },

    monetary: (value: string): IACele.Types.Monetary => {

        return (
            value !== ''
                ? (
                    matchType.float.test(value)
                        ? Number(value)
                        : matchType.integer.test(value)
                            ? Number(value)
                            : undefined
                )
                : undefined
        )
    }
}

export const parseDisplayValue: Record<IACele.Types.TypeName, (value: IACele.Types.ValueType) => string> = {
    char: (value) => {
        if ( typeof value === 'string' ) return value;
        return '';
    },
    integer: (value) => {
        if ( typeof value === 'number' ) return String(value);
        return '';
    },
    float: (value) => {
        if ( typeof value === 'number' ) return value.toFixed(2);
        return '';
    },
    monetary: (value) => {
        if ( typeof value === 'number' ) return value.toFixed(2);
        return ''
    }
}

// Funciones para validar si un campo es directamente convertible
const matchType = {
    integer: /^\d+?$/,
    float: /^\d+?\.\d+?$/
}
