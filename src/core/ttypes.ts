const notNull = <T>(value: T | null): value is T => (value !== null);

const satisfiesStructure = (st: RegExp) => {
    const callback = (
        structureLike: any,
    ): structureLike is string => {

        return (
            typeof structureLike === 'string'
            && st.test(structureLike)
        );
    };

    return callback;
};

const validate = {
    isDate: satisfiesStructure(/^\d{4}(-\d{2}){2}$/),
    isDatetime: satisfiesStructure(/^\d{4}(-\d{2}){2} \d{2}(:\d{2}){2}$/),
    isTime: satisfiesStructure(/^\d{2}(:\d{2}){2}$/),
    isDuration: satisfiesStructure(/^\d*(:\d{2}){2}$/),
};

abstract class ScalarTType<
    T extends IACele.Data.Validator.Mode,
    M extends IACele.Data.ModelName,
    F extends IACele.Data.FieldName<M>,
    ST extends 'number' | 'string' | 'boolean',
> {

    name: F;
    validationValue: T['validate'] | null;
    abstract scalarType: ST;

    equals = (value: any) => (this.validationValue === value);
    notEqual = (value: any) => (this.validationValue !== value);
    abstract gt: (value: any) => boolean;
    abstract lt: (value: any) => boolean;
    abstract ge: (value: any) => boolean;
    abstract le: (value: any) => boolean;
    abstract isin: (value: any) => boolean;
    abstract notIn: (value: any) => boolean;
    abstract ilike: (value: any) => boolean;
    abstract notIlike: (value: any) => boolean;
    abstract regex: (value: any) => boolean;
    abstract regexI: (value: any) => boolean;

    private op = {
        '>': (a: T['view'], b: T['view']) => (a > b),
        '>=': (a: T['view'], b: T['view']) => (a >= b),
        '<': (a: T['view'], b: T['view']) => (a < b),
        '<=': (a: T['view'], b: T['view']) => (a <= b),
    } as const;

    constructor (
        name: F,
        value: T['view'],
    ) {

        this.name = name;
        this.validationValue = this.parse(value);
    };

    parse: (value: T['view']) => (T['validate'] | null) = (value: T['view']) => (value as T['validate'] | null)

    compareInArray = (
        arrLike: any,
    ): boolean => {

        if ( Array.isArray(arrLike) ) {
            const found = arrLike.find( (v) => ( v === this.validationValue ) );
            return found !== undefined;
        };
        return false;
    };

    narrowed = (
        other: any,
        o: keyof typeof this.op,
    ) => {

        if ( typeof other === this.scalarType && notNull(this.validationValue) ) {
            return this.op[o](this.validationValue, other);
        };
        return false;
    }
};

abstract class ArrayTType<
    T extends IACele.Data.Validator.Mode<IACele.Data.RecordForView<any>[], number[]>,
    M extends IACele.Data.ModelName,
    F extends IACele.Data.FieldName<M>,
> {
    name: F;
    viewValue: T['validate'];

    constructor (
        name: F,
        value: T['view'],
    ) {

        this.name = name;
        this.viewValue = value.map((record) => (record['id']));
    };

    equals = (value: any) => {
        if ( value === null && ( this.viewValue === null || this.viewValue.length === 0 ) ) {
            return true;
        };
        return false;
    };
    notEqual = () => (false);
    gt = () => (false);
    lt = () => (false);
    ge = () => (false);
    le = () => (false);
    isin = () => (false);
    notIn = () => (false);
    ilike = () => (false);
    notIlike = () => (false);
    regex = () => (false);
    regexI = () => (false);
};


class NumericScalarTType<
    T extends IACele.Data.Validator.Mode,
    M extends IACele.Data.ModelName,
    F extends IACele.Data.FieldName<M>
> extends ScalarTType<T, M, F, 'number'> {
    scalarType = 'number' as const;

    gt = (value: any) => (this.narrowed(value, '>'));
    ge = (value: any) => (this.narrowed(value, '>='));
    lt = (value: any) => (this.narrowed(value, '<'));
    le = (value: any) => (this.narrowed(value, '<='));
    isin = (value: any) => (this.compareInArray(value));
    notIn = (value: any) => (!this.compareInArray(value));
    ilike = () => (false);
    notIlike = () => (false);
    regex = () => (false);
    regexI = () => (false);
};

class StringScalarTType<
    T extends IACele.Data.Validator.Mode,
    M extends IACele.Data.ModelName,
    F extends IACele.Data.FieldName<M>,
> extends ScalarTType<T, M, F, 'string'> {
    scalarType = 'string' as const;

    gt = () => (false);
    ge = () => (false);
    lt = () => (false);
    le = () => (false);
    isin = (value: any) => (this.compareInArray(value));
    notIn = (value: any) => (!this.compareInArray(value));
    ilike = (value: any) => {
        if ( typeof value === 'string' && typeof this.validationValue === 'string' ) {
            const index = (
                this.validationValue
                .toLocaleLowerCase()
                .indexOf(value.toLocaleLowerCase())
            );

            return index !== -1;
        };
        return false;
    };
    notIlike = (value: any) => {
        return !this.ilike(value);
    };
    regex = (value: any) => {
        if ( typeof value === 'string' && typeof this.validationValue === 'string' ) {
            try {
                const r = RegExp(value);
                return r.test(this.validationValue);
            } catch {
                return false;
            };
        };
        return false;
    };
    regexI = (value: any) => {
        if ( typeof value === 'string' && typeof this.validationValue === 'string' ) {
            try {
                const r = RegExp(value, 'i');
                return r.test(this.validationValue);
            } catch {
                return false;
            };
        };
        return false;
    };
};

abstract class TemporalityTType <
    T extends IACele.Data.Validator.Mode,
    M extends IACele.Data.ModelName,
    F extends IACele.Data.FieldName<M>,
> extends ScalarTType<T, M, F, 'string'> {
    scalarType = 'string' as const;
    abstract isValidFormat: (value: any) => value is string;
    abstract replaceChars: string[];

    private tempOp = {
        '>': (a: number, b: number) => (a > b),
        '>=': (a: number, b: number) => (a >= b),
        '<': (a: number, b: number) => (a < b),
        '<=': (a: number, b: number) => (a <= b),
    };

    private compareValues = (
        a: any,
        b: any,
        op: keyof typeof this.tempOp,
    ) => {

        if ( this.isValidFormat(a) && this.isValidFormat(b) ) {
            this.replaceChars.forEach(
                (rc) => {
                    a = a.replace(rc, '');
                    b = b.replace(rc, '');
                }
            );
            const na = Number(a);
            const ba = Number(b);
            return this.tempOp[op](na, ba);
        } else {
            return false;
        };
    };

    gt = (value: any) => (this.compareValues(this.validationValue, value, '>'));
    ge = (value: any) => (this.compareValues(this.validationValue, value, '>='));
    lt = (value: any) => (this.compareValues(this.validationValue, value, '<'));
    le = (value: any) => (this.compareValues(this.validationValue, value, '<='));
    isin = (value: any) => (this.compareInArray(value));
    notIn = (value: any) => (!this.compareInArray(value));
    ilike = () => (false);
    notIlike = () => (false);
    regex = () => (false);
    regexI = () => (false);
};

abstract class NonComparableTType<
    T extends IACele.Data.Validator.Mode,
    M extends IACele.Data.ModelName,
    F extends IACele.Data.FieldName<M>,
> extends ScalarTType<T, M, F, 'string'> {
    scalarType = 'string' as const;

    comparse = (value: any) => {
        if ( value === null ) {
            return this.validationValue === value;
        } else {
            return false;
        };
    };

    equals = (value: any) => (this.comparse(value));
    notEqual = (value: any) => (!this.comparse(value));
    gt = () => (false);
    lt = () => (false);
    ge = () => (false);
    le = () => (false);
    isin = () => (false);
    notIn = () => (false);
    ilike = () => (false);
    notIlike = () => (false);
    regex = () => (false);
    regexI = () => (false);
};


class Integer<
    M extends IACele.Data.ModelName,
    F extends IACele.Data.FieldName<M>,
> extends NumericScalarTType<IACele.Data.TType.Integer<'not_null'>, M, F> {};

class Char<
    M extends IACele.Data.ModelName,
    F extends IACele.Data.FieldName<M>,
> extends StringScalarTType<IACele.Data.TType.Char<'not_null'>, M, F> {};

class Boolean<
    M extends IACele.Data.ModelName,
    F extends IACele.Data.FieldName<M>,
> extends ScalarTType<IACele.Data.TType.Boolean<'not_null'>, M, F, 'boolean'> {
    scalarType = 'boolean' as const;

    gt = () => (false);
    ge = () => (false);
    lt = () => (false);
    le = () => (false);
    isin = (value: any) => (this.compareInArray(value));
    notIn = (value: any) => (!this.compareInArray(value));
    ilike = () => (false);
    notIlike = () => (false);
    regex = () => (false);
    regexI = () => (false);
};

class Float<
    M extends IACele.Data.ModelName,
    F extends IACele.Data.FieldName<M>,
> extends NumericScalarTType<IACele.Data.TType.Float<'not_null'>, M, F> {};

class Date<
    M extends IACele.Data.ModelName,
    F extends IACele.Data.FieldName<M>,
> extends TemporalityTType<IACele.Data.TType.Date<'not_null'>, M, F> {
    replaceChars = ['-'];
    isValidFormat = validate.isDate;
};

class Datetime<
    M extends IACele.Data.ModelName,
    F extends IACele.Data.FieldName<M>,
> extends TemporalityTType<IACele.Data.TType.Datetime<'not_null'>, M, F> {
    replaceChars = ['-', ' ', ':'];
    isValidFormat = validate.isDatetime;
};

class Time<
    M extends IACele.Data.ModelName,
    F extends IACele.Data.FieldName<M>,
> extends TemporalityTType<IACele.Data.TType.Time<'not_null'>, M, F> {
    replaceChars = [':'];
    isValidFormat = validate.isTime;
};

class Duration<
    M extends IACele.Data.ModelName,
    F extends IACele.Data.FieldName<M>,
> extends TemporalityTType<IACele.Data.TType.Duration<'not_null'>, M, F> {
    replaceChars = [':'];
    isValidFormat = validate.isDuration;
};

class File<
    M extends IACele.Data.ModelName,
    F extends IACele.Data.FieldName<M>,
> extends NonComparableTType<IACele.Data.TType.File<'not_null'>, M, F> {};

class Selection<
    M extends IACele.Data.ModelName,
    F extends IACele.Data.FieldName<M>,
> extends StringScalarTType<IACele.Data.TType.Selection<string, 'not_null'>, M, F> {};

class Many2One<
    M extends IACele.Data.ModelName,
    F extends IACele.Data.FieldName<M>,
> extends NumericScalarTType<IACele.Data.TType.Many2One<'not_null'>, M, F> {
    scalarType = 'number' as const;

    parse = (value: IACele.Data.TType.Many2One<'not_null'>['view']) => {
        if ( value === null ) {
            return null;
        };
        return value[0];
    };
};

class Text<
    M extends IACele.Data.ModelName,
    F extends IACele.Data.FieldName<M>,
> extends StringScalarTType<IACele.Data.TType.Text<'not_null'>, M, F> {};

class One2Many<
    M extends IACele.Data.ModelName,
    F extends IACele.Data.FieldName<M>
> extends ArrayTType<IACele.Data.TType.One2Many<any>,  M, F> {};

class Many2Many<
    M extends IACele.Data.ModelName,
    F extends IACele.Data.FieldName<M>
> extends ArrayTType<IACele.Data.TType.One2Many<any>,  M, F> {};

class JSON<
    M extends IACele.Data.ModelName,
    F extends IACele.Data.FieldName<M>,
> extends NonComparableTType<IACele.Data.TType.JSON, M, F> {};

const Validator = {
    'integer': Integer,
    'char': Char,
    'boolean': Boolean,
    'float': Float,
    'date': Date,
    'datetime': Datetime,
    'time': Time,
    'duration': Duration,
    'file': File,
    'text': Text,
    'selection': Selection,
    'many2one': Many2One,
    'one2many': One2Many,
    'many2many': Many2Many,
    'json': JSON,
} as const;

class RecordEvaluator<M extends IACele.Data.ModelName> {

    private data: IACele.Data.Validator.RecordValidation<M>;
    private op: Record<IACele.Data.ComparisonOperator, ( (o: IACele.Data.Validator.BaseTType) => ((value: any) => boolean) )> = {
        '=': (obj) => (obj.equals),
        '!=': (obj) => (obj.notEqual),
        '>': (obj) => (obj.gt),
        '<': (obj) => (obj.lt),
        '>=': (obj) => (obj.ge),
        '<=': (obj) => (obj.le),
        'in': (obj) => (obj.isin),
        'not in': (obj) => (obj.notIn),
        'ilike': (obj) => (obj.ilike),
        'not ilike': (obj) => (obj.notIlike),
        '~': (obj) => (obj.regex),
        '~*': (obj) => (obj.regexI),
    };
    private join: Record<IACele.Data.LogicOperator, (a: boolean, b: boolean) => (boolean)> = {
        '&': (a, b) => (a && b),
        '|': (a, b) => (a || b),
    };
    private LOGIC_OPERATORS: (IACele.Data.LogicOperator | boolean)[] = ['&', '|'];

    constructor (
        data: IACele.Data.RecordForView<M>,
        metadata: IACele.Data.FieldsMetadata<M>,
    ) {

        // Inicialización del objeto de validación
        this.data = {} as IACele.Data.Validator.RecordValidation<M>;

        // Obtención de los nombres de los campos
        const fieldNames = Object.keys(data) as IACele.Data.FieldName<M>[];

        // Inicialización de objeto de validación
        fieldNames.forEach(
            (fieldName) => {
                // Obtención de los metadatos del campo
                const fieldMetadata = metadata[fieldName];
                // Obtención de clase de validador
                const TTypeClass = Validator[fieldMetadata.ttype]
                // Inicialización de instancia de campo
                const fieldInstance = new TTypeClass<M, typeof fieldName>(fieldName, data[fieldName] as never);
                // Asignación de la instancia en el objeto de validación
                this.data[fieldName] = fieldInstance;
            }
        );
    };

    evaluate = (
        conditionOrBoolean: IACele.Data.CriteriaStructure<M> | boolean,
    ) => {

        // Si la condición provista es un booleano...
        if ( typeof conditionOrBoolean === 'boolean' ) {
            return conditionOrBoolean;
        };

        // Resolución de tripletas de condición
        let arrayResult = this.resolveTriplets(conditionOrBoolean);

        // Mientras la longitud del criterio sea mayor a 1...
        while ( arrayResult.length > 1 ) {
            // Iteración por la longitud del criterio
            for ( let i = 0; i <= arrayResult.length; i++ ) {

                // Asignación de valores
                const a = arrayResult[i];
                const b = arrayResult[i + 1];
                const c = arrayResult[i + 2];

                // Evaluación de valores
                const aIsOp = this.isLogicOperator(a);
                const bIsBool = typeof b === 'boolean';
                const cIsBool = typeof c === 'boolean';

                // Si las tres condiciones de los valores se cumplen...
                if ( aIsOp && bIsBool && cIsBool ) {
                    // Obtención de la unión de los dos booleanos
                    const evaluation = this.join[a](b, c);
                    // Obtención del índice superior
                    const supIndex = Math.min(i + 3, arrayResult.length);

                    // Obtención de la rebanada inicial del criterio
                    const initialSlice = arrayResult.slice(0, i);
                    // Ibtención de la rebanada final del criterio
                    const finalSlice = arrayResult.slice(supIndex);

                    // Reasignación del resultado del array
                    arrayResult = [ ...initialSlice, evaluation, ...finalSlice ];

                    // Se interrumpe el ciclo
                    break;
                };
            };
        };

        // Destructuración del resultado final
        const [ expression ] = (arrayResult as [boolean]);

        return expression;
    };

    private isLogicOperator = (
        element: IACele.Data.LogicOperator | boolean,
    ): element is IACele.Data.LogicOperator => {

        return this.LOGIC_OPERATORS.indexOf(element) !== -1;
    };

    private resolveTriplets = (
        evaluationCriteria: IACele.Data.CriteriaStructure<M>
    ) => {

        // Inicialización del resultado en array
        const arrayResult: (
            | IACele.Data.LogicOperator
            | IACele.Data.Triplet<M>
            | boolean
        )[] = [ ...evaluationCriteria ];

        // Iteración por cada elemento del resultado en array
        arrayResult.forEach(
            (element, index) => {
                // Si el elemento es una tripleta...
                if ( typeof element === 'object' ) {
                    // Destructuración de los elementos correspondientes
                    const [ fieldName, op, value ] = element;
                    // Evaluación del resultado
                    const evaluationResult = this.evaluateField(fieldName, op, value);
                    // Asignación del resultado de la evaluación
                    arrayResult[index] = evaluationResult;
                };
            }
        );

        return arrayResult as (IACele.Data.LogicOperator | boolean)[];
    };

    private evaluateField = <F extends IACele.Data.FieldName<M>>(
        name: F,
        op: IACele.Data.ComparisonOperator,
        value: any,
    ) => {

        // Obtención de la instancia del campo a evaluar
        const fieldInstance = this.data[name];
        // Obtención del método de evaluación
        const operatorCallback = this.getOperation(op, fieldInstance);
        // Evaluación con el valor
        const result = operatorCallback(value);

        return result;
    };

    private getOperation = <O extends IACele.Data.Validator.BaseTType>(
        op: IACele.Data.ComparisonOperator,
        obj: O,
    ): ( (value: any) => (boolean) ) => {

        // Obtención del método de evaluación
        const operatorCallback = this.op[op](obj);

        return operatorCallback;
    };

};

export default RecordEvaluator;
