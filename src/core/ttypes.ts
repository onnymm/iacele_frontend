type RecordFormData<M extends IACele.Data.ModelName> = {
    [F in IACele.Data.FieldName<M>]: BaseTType;
};

type EvaluationFormData<M extends IACele.Data.ModelName> = {
    [K in keyof IACele.Data.ModelDefinition<M>]: Partial<IACele.Data.ModelDefinition<M>>[K] | null;
};

const isDefined = <T>(value: T | null | undefined): value is T => {

    return (
        value !== null
        && value !== undefined
    );
};

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

const isDate = satisfiesStructure(/^\d{4}(-\d{2}){2}$/);
const isDatetime = satisfiesStructure(/^\d{4}(-\d{2}){2} \d{2}(:\d{2}){2}$/);
const isTime = satisfiesStructure(/^\d{2}(:\d{2}){2}$/);
const isDuration = satisfiesStructure(/^\d*(:\d{2}){2}$/);

// ----------------------------------------------------------------------------

abstract class ScalarTType<
    T,
    M extends IACele.Data.ModelName,
    F extends IACele.Data.FieldName<M>,
    ST extends 'number' | 'string' | 'boolean',
    R = T,
> {

    name: F;
    completeValue: T | null | undefined;
    viewValue: T | null = null as T;
    abstract scalarType: ST;

    equals = (value: any) => (this.completeValue === value);
    notEqual = (value: any) => (this.completeValue !== value);
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
        '>': (a: R, b: R) => (a > b),
        '>=': (a: R, b: R) => (a >= b),
        '<': (a: R, b: R) => (a < b),
        '<=': (a: R, b: R) => (a <= b),
    } as const;

    asReal = (): R | null => (this.completeValue as R);

    constructor (
        name: F,
        value: T | undefined,
    ) {

        this.name = name;
        this.completeValue = value;
        this.computeViewValue();
    };

    private computeViewValue = () => {
        this.viewValue = (
            this.completeValue !== undefined
                ? this.completeValue
                : null
        ) as T;
    };

    narrowed = (
        other: any,
        o: keyof typeof this.op,
    ) => {

        const asReal = this.asReal();

        if ( typeof other === this.scalarType && isDefined(asReal) ) {
            return this.op[o](asReal, other);
        } else {
            return false;
        };
    };

    compareInArray = (
        arrLike: any,
    ) => {

        if ( Array.isArray(arrLike) ) {
            const found = arrLike.find( (v) => (v === this.completeValue) );
            return found  !== undefined;
        };
        return false;
    };

};

abstract class ArrayTType<
    M extends IACele.Data.ModelName,
    F extends IACele.Data.FieldName<M>
> {

    name: F;
    completeValue: IACele.Data.ModelDefinition<M>[] | null | undefined;
    viewValue: IACele.Data.ModelDefinition<M>[] | null = [];

    constructor (
        name: F,
        value: IACele.Data.ModelDefinition<M>[] | undefined,
    ) {

        this.name = name;
        this.completeValue = (
            value === undefined || value === null
                ? null
                : value.length === 0
                    ? null
                    : value
        );
        this.computeViewValue();
    };

    private computeViewValue = () => {
        this.viewValue = (
            this.completeValue !== undefined
                ? this.completeValue
                : []
        );
    };

    asReal = () => (this.completeValue);

    equals = (value: any) => (this.completeValue === value);
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

// ----------------------------------------------------------------------------

class NumericScalarTType<
    T,
    M extends IACele.Data.ModelName,
    F extends IACele.Data.FieldName<M>,
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
    T,
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
        if ( typeof value === 'string' && typeof this.completeValue === 'string' ) {
            const index = (
                this.completeValue
                .toLowerCase()
                .indexOf(value.toLocaleLowerCase())
            );

            return index !== -1;
        } else {
            return false;
        };
    };
    notIlike = (value: any) => {
        return !this.ilike(value);
    };
    regex = (value: any) => {
        if ( typeof value === 'string' && typeof this.completeValue === 'string' ) {
            try {
                const r = RegExp(value);
                return r.test(this.completeValue);
            } catch {
                return false;
            };
        } else {
            return false;
        };
    };
    regexI = (value: any) => {
        if ( typeof value === 'string' && typeof this.completeValue === 'string' ) {
            try {
                const r = RegExp(value, 'i');
                return r.test(this.completeValue);
            } catch {
                return false;
            };
        } else {
            return false;
        };
    };
};

abstract class TemporalityTType<
    T,
    M extends IACele.Data.ModelName,
    F extends IACele.Data.FieldName<M>,
> extends ScalarTType<T, M, F, 'string'> {
    scalarType = 'string' as const;
    abstract validate: (v: any,) => v is string;
    abstract replaceChars: string[];

    private tempOp = {
        '>': (a: number, b: number) => (a > b),
        '<': (a: number, b: number) => (a < b),
        '>=': (a: number, b: number) => (a >= b),
        '<=': (a: number, b: number) => (a <= b),
    };

    private compareValues = (
        a: any,
        b: any,
        op: keyof typeof this.tempOp,
    ) => {

        if ( this.validate(a) && this.validate(b) ) {
            this.replaceChars.forEach(
                (rc) => {
                    a = a.replace(rc, '');
                    b = b.replace(rc, '');
                }
            );
            const na = Number(a);
            const nb = Number(b);
            return this.tempOp[op](na, nb);
        } else {
            return false;
        };
    };

    gt = (value: any) => (this.compareValues(this.completeValue, value, '>'));
    ge = (value: any) => (this.compareValues(this.completeValue, value, '>='));
    lt = (value: any) => (this.compareValues(this.completeValue, value, '<'));
    le = (value: any) => (this.compareValues(this.completeValue, value, '<='));
    isin = (value: any) => (this.compareInArray(value));
    notIn = (value: any) => (!this.compareInArray(value));
    ilike = () => (false);
    notIlike = () => (false);
    regex = () => (false);
    regexI = () => (false);
};

abstract class NonComparableTType<
    T,
    M extends IACele.Data.ModelName,
    F extends IACele.Data.FieldName<M>,
> extends ScalarTType<T, M, F, 'string'> {
    scalarType = 'string' as const;

    compare = (value: any) => {
        if ( value === null ) {
            return this.completeValue === value;
        } else {
            return false;
        };
    };

    equals = (value: any) => (this.compare(value));
    notEqual = (value: any) => (!this.compare(value));
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

// ----------------------------------------------------------------------------

class Integer<
    M extends IACele.Data.ModelName,
    F extends IACele.Data.FieldName<M>,
> extends NumericScalarTType<IACele.Data.TType.Integer<'not_null'>, M, F> {};

class Float<
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

class Date<
    M extends IACele.Data.ModelName,
    F extends IACele.Data.FieldName<M>,
> extends TemporalityTType<IACele.Data.TType.Date<'not_null'>, M, F> {
    replaceChars = ['-'];
    validate = isDate;
};

class Datetime<
    M extends IACele.Data.ModelName,
    F extends IACele.Data.FieldName<M>,
> extends TemporalityTType<IACele.Data.TType.Datetime<'not_null'>, M, F> {
    replaceChars = ['-', ' ', ':'];
    validate = isDatetime;
};

class Time<
    M extends IACele.Data.ModelName,
    F extends IACele.Data.FieldName<M>,
> extends TemporalityTType<IACele.Data.TType.Time<'not_null'>, M, F> {
    replaceChars = [':'];
    validate = isTime;
};

class Duration<
    M extends IACele.Data.ModelName,
    F extends IACele.Data.FieldName<M>,
> extends TemporalityTType<IACele.Data.TType.Duration<'not_null'>, M, F> {
    replaceChars = [':'];
    validate = isDuration;
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
> extends ScalarTType<IACele.Data.TType.Many2One<'not_null'>, M, F, 'number', number> {
    scalarType = 'number' as const;

    asReal = () => (this.recordId());

    recordId = () => {
        if ( isDefined(this.completeValue) ) return this.completeValue[0];
        return null;
    };

    equals = (value: any) => (this.recordId() === value);
    notEqual = (value: any) => (this.recordId() !== value);
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

class Text<
    M extends IACele.Data.ModelName,
    F extends IACele.Data.FieldName<M>,
> extends StringScalarTType<IACele.Data.TType.Text<'not_null'>, M, F> {};

class One2Many<
    M extends IACele.Data.ModelName,
    F extends IACele.Data.FieldName<M>
> extends ArrayTType<M, F> {};

class Many2Many<
    M extends IACele.Data.ModelName,
    F extends IACele.Data.FieldName<M>
> extends ArrayTType<M, F> {};

class JSON<
    M extends IACele.Data.ModelName,
    F extends IACele.Data.FieldName<M>,
> extends NonComparableTType<IACele.Data.TType.JSON<'not_null'>, M, F> {};

const TType = {
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

interface BaseTType {
    equals: (value: any) => boolean;
    notEqual: (value: any) => boolean;
    gt: (value: any) => boolean;
    lt: (value: any) => boolean;
    ge: (value: any) => boolean;
    le: (value: any) => boolean;
    isin: (value: any) => boolean;
    notIn: (value: any) => boolean;
    ilike: (value: any) => boolean;
    notIlike: (value: any) => boolean;
    regex: (value: any) => boolean;
    regexI: (value: any) => boolean;

    asReal: () => any;
    completeValue: any;
};

class RecordEvaluator<M extends IACele.Data.ModelName> {

    private formData: RecordFormData<M>;

    private op: Record<
        IACele.Data._Definition.CriteriaStructure.ComparisonOperator,
        (o: BaseTType) => ( (value: any) => boolean )
    > = {
        '=': (obj) => obj.equals,
        '!=': (obj) => obj.notEqual,
        '>': (obj) => obj.gt,
        '<': (obj) => obj.lt,
        '>=': (obj) => obj.ge,
        '<=': (obj) => obj.le,
        'in': (obj) => obj.isin,
        'not in': (obj) => obj.notIn,
        'ilike': (obj) => obj.ilike,
        'not ilike': (obj) => obj.notIlike,
        '~': (obj) => obj.regex,
        '~*': (obj) => obj.regexI,
    };

    private join: Record<
        IACele.Data._Definition.CriteriaStructure.LogicOperator,
        ( (a: boolean, b: boolean) => (boolean) )
    > = {
        '&': (a, b) => (a && b),
        '|': (a, b) => (a || b),
    };

    LOGIC_OPERATORS: (IACele.Data._Definition.CriteriaStructure.LogicOperator | boolean )[] = ['|', '&'];

    constructor (
        data: EvaluationFormData<M>,
        metadata: IACele.Data.Shape.FieldsMetadata[],
    ) {

        // Inicialización del objeto de validación
        this.formData = {} as RecordFormData<M>;

        // Iteración por cada nombre de campo
        ( Object.keys(data) as IACele.Data.FieldName<M>[] )
        .forEach(
            (fieldName) => {
                // Obtención de los metadatos del campo
                const fieldMetadata = metadata.find( (m) => (m.name === fieldName) ) as IACele.Data.Shape.FieldsMetadata;
                // Inicialización de una instancia de campo
                this.formData[fieldName] = new TType[fieldMetadata.ttype](
                    fieldName as keyof IACele.Data._CommonFieldsProperties,
                    data[fieldName] as any,
                );
            }
        );
    };

    evaluate = (
        evaluationCriteria: IACele.Data.CriteriaStructure<M> | boolean,
    ) => {

        if ( typeof evaluationCriteria === 'boolean' ) {
            return evaluationCriteria;
        };

        // Resolución de tripletas de condición
        let arrayResult = this.resolveTriplets(evaluationCriteria);

        // Mientras la longitod del criterio sea mayor a 1
        while ( arrayResult.length > 1 ) {
            // Iteración por la longitud del criterio
            for ( let i = 0; i <= arrayResult.length; i++ ) {

                // Asignación de valores
                const a = arrayResult[i];
                const b = arrayResult[i + 1];
                const c = arrayResult[i + 2];

                // Evaluación de valores
                const aIsOp = this.isLogicOperator(a)
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
                    // Obtención de la rebanada final del criterio
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

    private getOperation = <O extends BaseTType>(
        op: IACele.Data._Definition.CriteriaStructure.ComparisonOperator,
        obj: O,
    ): ( (value: any) => (boolean) ) => {

        // Obtención del método de evaluación
        const operatorCallback = this.op[op](obj);

        return operatorCallback;
    };

    private evaluateField = <F extends IACele.Data.FieldName<M>>(
        name: F,
        op: IACele.Data._Definition.CriteriaStructure.ComparisonOperator,
        value: any,
    ) => {

        // Obtención de la instancia de campo a evaluar
        const fieldInstance = this.formData[name];
        // Obtención del método de evaluación
        const operatorCallback = this.getOperation(op, fieldInstance);
        // Evaluación con el valor
        const result = operatorCallback(value);

        return result;
    };

    private isLogicOperator = (
        element: IACele.Data._Definition.CriteriaStructure.LogicOperator | boolean,
    ): element is IACele.Data._Definition.CriteriaStructure.LogicOperator => {

        return this.LOGIC_OPERATORS.indexOf(element) !== -1;
    };

    private resolveTriplets = (evaluationCriteria: IACele.Data.CriteriaStructure<M>) => {

        // Inicialización del resultado en array
        const arrayResult: (
            | IACele.Data._Definition.CriteriaStructure.LogicOperator
            | IACele.Data._Definition.CriteriaStructure.Triplet<M>
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

        return arrayResult as (IACele.Data._Definition.CriteriaStructure.LogicOperator | boolean)[];
    };
};

export default RecordEvaluator;
