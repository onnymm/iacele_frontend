// Tipos de dato genéricos para renderizar en vistas de datos
type WidgetComponent = 'char' | 'badge' | 'monetary' | 'datetime' | 'date' | 'time' | 'many2one' | 'float' | 'percentage' | 'check' | 'integer';

// Valor genérico
type DataValue = string | number | boolean;

// Función de validación de valor
type ValidationCallback<T extends DataValue> = (value: T) => boolean;

// Widget de tabla
type TableGenericWidget<T extends string | number | boolean> = (config: { [ key: string ]: T }) => (React.JSX.Element)

// Tipo de emparejamiento de búsqueda
type SearchType = 're' | 'contains' | 'match'

// Dominio de búsqueda
type SearchScope = Record<string, SearchType>

// Estructura de dominio de búsqueda
interface SearchStructure {
    text: string;
    method:  {
        field: string;
        type: SearchType;
    }[]
}

// Interfaz de funciones de validación
interface ValidationOptions {
    info?: ValidationCallback;
    success?: ValidationCallback;
    warning?: ValidationCallback;
    danger?: ValidationCallback;
}

// Posición de kanban
type KanbanPosition = 'title'| 'description' | 'check' | 'fixed' | 'details' | 'none';

// Interfaz de configuración de vista de datos
interface ViewConfig extends SelectableOption<string> {
    kanban?: KanbanPosition;
    kanbanDisplayName?: boolean;
    canSort?: boolean;
    toggleable?: boolean;
    tableHide?: boolean;
    tableVisible?: boolean;
    type?: WidgetComponent | ((config: {[key: string]: DataValue}) => (React.JSX.Element));
    options?: ValidationOptions;
}

// Registro recibido desde el backend
type DataRecord = {
    [ key: string ]: DataValue;
};

// Información de tipo de dato
interface DataField {
    name: string;
    ttype: WidgetComponent;
};

// Estructura de datos recibida desde el backend
interface ResponseDataStructure {
    data: DataRecord[];
    count: number;
    fields: DataField[];
};

// Operador lógico
type LogicOperator = '&' | '|'

// Operador de comparación
type ComparisonOperator = '=' | '!=' | '>' | '>=' | '<' | '<=' | '><' | 'in' | 'not in' | 'ilike' | 'not ilike' | '~' | '~*'

// Formato de valures de tripleta
type TripletValue = number | string | boolean | number[]

// Tripleta
type Triplete = [string, ComparisonOperator, TripleteValue]

// Estructura de criterio de búsqueda
type CriteriaStructure = (LogicOperator | Triplete)[]

// Interfaz de función de solicitud de datos al backend
type GenericDataViewAPICallback = (
    params: object,
    setState: React.Dispatch<React.SetStateAction<DataViewData | undefined>>,
) => (void)

// Filtro seleccionable para vista de datos
interface DataFilter extends SelectableOption<number> {
    criteria: CriteriaStructure;
}

// Interfaz de filtros
interface DataViewFilters {
    default: {
        criteria: CriteriaStructure;
    };
    available: DataFilter[]
}

// Interfaz de anchos de columna de tabla
interface ColumnWidths {
    [ key: string ]: number | null
};
