const char = (field: string): TableGenericWidget<string | number> => {
    const CharComponent: TableGenericWidget<string | number> = ({
        [ field ]: content,
    }) => {
        return (
            <span className="w-full text-current text-ellipsis whitespace-nowrap">
                { String(content) }
            </span>
        );
    };
    return CharComponent;
};

const integer = (field: string): TableGenericWidget<number> => {
    const IntegerComponent: TableGenericWidget<number> = ({
        [ field ]: content,
    }) => {
        return (
            <span className="w-full text-current text-ellipsis whitespace-nowrap">
                { Number(content) }
            </span>
        );
    };
    return IntegerComponent;
};

const badge = (field: string): TableGenericWidget<string | number> => {
    const BadgeComponent: TableGenericWidget<string | number> = ({
        [ field ]: content,
    }) => {
        return (
            <div className="bg-current px-2 rounded-full w-min text-ellipsis whitespace-nowrap">
                <span className="text-white text-sm">
                    { String(content) }
                </span>
            </div>
        );
    };
    return BadgeComponent;
}

const date = (field: string): TableGenericWidget<string> => {
    const DateComponent: TableGenericWidget<string> = ({
        [ field ]: content,
    }) => {
        const [ year, month, day ] = content.split("-");
        return (
            <span className="w-full text-current text-ellipsis whitespace-nowrap">
                {`${day}/${month}/${year}`}
            </span>
        );
    };
    return DateComponent;
}

const monetary = (field: string): TableGenericWidget<number> => {
    const MonetaryComponent: TableGenericWidget<number> = ({
        [ field ]: content,
    }) => {
        return (
            <span className="w-full text-current text-ellipsis whitespace-nowrap">
                {Number(content).toLocaleString('es-MX', {style: 'currency', currency: 'MXN'})}
            </span>
        );
    };
    return MonetaryComponent;
};

const float = (field: string): TableGenericWidget<number> => {
    const FloatComponent: TableGenericWidget<number> = ({
        [ field ]: content,
    }) => {
        return (
            <span className="w-full text-current text-ellipsis whitespace-nowrap">
                {Number(content).toFixed(2)}
            </span>
        );
    };
    return FloatComponent;
};

const percentage = (field: string): TableGenericWidget<number> => {
    const PercentageComponent: TableGenericWidget<number> = ({
        [ field ]: content,
    }) => {
        return (
            <span className="w-full text-current text-ellipsis whitespace-nowrap">
                {( Number(content) * 100 ).toFixed(2) + '%'}
            </span>
        );
    };
    return PercentageComponent;
};

/**
 *  ## CommonComponent
 *  
 *  Este objeto proporciona componentes para renderizar datos con formatos
 *  dinámicos en una tabla. Cada propiedad es una función que retorna un
 *  componente TSX específico para renderizar un tipo de dato correspondiente a
 *  un atributo del objeto de datos proporcionado.
 *  
 *  ### Componentes disponibles:
 *  
 *  - `char`: Renderiza texto simple, valores genéricos en la tabla.
 *  - `integer`: Renderiza números enteros.
 *  - `badge`: Renderiza etiquetas con estilo distintivo.
 *  - `date`: Renderiza fechas en formato dinámico.
 *  - `float`: Renderiza valores numéricos con 2 decimales.
 *  - `monetary`: Renderiza valores numéricos en formato monetario.
 *  - `percentage`: Renderiza valores como porcentajes con 2 decimales. 
 *  
 *  ### Ejemplo de uso:
 *  ```tsx
 *  const FloatComponent = commonComponent.float('price');
 *  const PercentageComponent = commonComponent.percentage('discount');
 *  ```
 */ 
export const commonComponent = {
    char,
    integer,
    badge,
    date,
    datetime: char,
    time: char,
    many2one: char,
    float: float,
    monetary,
    percentage: percentage,
    selection: char,
    check: char,
};
