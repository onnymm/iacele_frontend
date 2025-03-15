export const inputType: Record<IACele.Types.TypeName, React.InputHTMLAttributes<HTMLInputElement>['type']> = {
    'char': 'text',
    'integer': 'number',
    'float': 'number',
    'monetary': 'text',
    'percentage': 'text',
    'boolean': 'checkbox',
    'date': 'text',
}

/** 
 *  ## Funciones de validación de valor en campo
 *  Estas funciones, indexables por tipo de dato, realizan una validación del
 *  valor para determinar si éste es válido según su tipo de dato. En caso de
 *  no serlo, intentan corregirlo o lo establecen a `undefined`.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `value`: Valor del registro en el campo.
 */ 
export const parseTo: Record<string, (value: string) => IACele.Types.ValueType> = {

    char: (value: string): IACele.Types.Char => {

        return (
            value !== ''
                ? value
                : undefined
        )
    },

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
                    matchType.monetary.test(value)
                        ? Number(value.replace(/^\$?(\d+?)(\.)?((\d+)?)$/, '$1$2$3'))
                        : matchType.integer.test(value)
                            ? Number(value)
                            : undefined
                )
                : undefined
        )
    },

    percentage: (value: string): IACele.Types.Percentage => {
        return (
            value !== ''
                ? (
                    matchType.percentage.test(value)
                        ? Number(value.replace(/^\$?(\d+?)(\.)?((\d+)?)%?/, '$1$2$3'))
                        : matchType.integer.test(value)
                            ? Number(value)
                            : undefined
                )
                : undefined
        )
    },

    date: (value: string): IACele.Types.Date => {
        return (
            value !== ''
                ? /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value)
                    ? (
                        value
                        .replace(/^(\d{1})\/(\d{1,2})\/(\d{4}$)/, '0$1/$2/$3')
                        .replace(/^(\d{2})\/(\d{1})\/(\d{4}$)/, '$1/0$2/$3')
                        .replace(/^(\d{2})\/(\d{2})\/(\d{4}$)/, '$3-$2-$1')
                    )
                    : undefined
                : undefined
        )
    }
}

/** 
 *  ## Parseo de valor a mostrar
 *  Este componente renderiza Este mapa de funciones indexable por el tipo de
 *  dato a parsear formatea el valor entrante y lo convierte en una cadena de
 *  texto que se mostrará como valor del componente {@link InputForm}.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */ 
export const parseDisplayValue: Record<IACele.Types.TypeName, (value: IACele.Types.ValueType) => string | boolean> = {
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
    },
    percentage: (value) => {
        if ( typeof value === 'number' ) return value.toFixed(2);
        return '';
    },
    boolean: (value) => {
        if ( typeof value === 'boolean' ) return value;
        return false;
    },
    date: (value) => {
        if ( typeof value === 'string' ) return value.replace(/^(\d{4})-(\d{1,2})-(\d{1,2})/, '$3/$2/$1');
        return '';
    }
};

// Funciones para validar si un campo es directamente convertible
const matchType = {
    integer: /^\d+?$/,
    float: /^\d+?\.(\d+)?$/,
    monetary: /^\$?\d+?\.?(\d+)?$/,
    percentage: /^\$?\d+?\.?(\d+)?%?$/,
}
