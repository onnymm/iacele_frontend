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
    setFormRecordField: (name: F, value: IACele.Data.ModelDefinition<M>[F]) => void;
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
        setFormRecordField: (name: F, value: IACele.Data.ModelDefinition<M>[F]) => void,
    ) {

        this.name = name;
        this.completeValue = value;
        this.setFormRecordField = setFormRecordField;
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
    completeValue: IACele.Data.ModelDefinition<M>[] | undefined;
    viewValue: IACele.Data.ModelDefinition<M>[] = [];
    setFormRecordField: (name: F, value: IACele.Data.ModelDefinition<M>[F]) => void;

    constructor (
        name: F,
        value: IACele.Data.ModelDefinition<M>[] | undefined,
        setFormRecordField: (name: F, value: IACele.Data.ModelDefinition<M>[F]) => void,
    ) {

        this.name = name;
        this.completeValue = value;
        this.setFormRecordField = setFormRecordField;
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

    equals = () => (false);
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

interface X {
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

type Y<M extends IACele.Data.ModelName> = {
    [F in IACele.Data.FieldName<M>]: X;
};

class RecordEvaluator<M extends IACele.Data.ModelName> {

    constructor (
        data: IACele.Data.ModelDefinition<M>,
        metadata: IACele.Data.Shape.FieldsMetadata[],
    ) {

        const formData: Y<M> = {} as Y<M>;

        ( Object.keys(data) as IACele.Data.FieldName<M>[] )
        .forEach(
            (fieldName) => {
                const fieldMetadata = metadata.find( (m) => (m.name === fieldName) ) as IACele.Data.Shape.FieldsMetadata
                formData[fieldName] = new TType[fieldMetadata.ttype](
                    fieldName as any,
                    formData[fieldName] as any,
                    () => null,
                );
            }
        );
    };
}

export default RecordEvaluator;
