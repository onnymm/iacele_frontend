import MainControls from "@/components/common/navbar/MainControls";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import useAPI from "@/hooks/app/useAPI";
import useFormRecord from "@/hooks/views/useFormRecord";
import { CircleQuestionMark, Save, Undo2, X } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

interface FormParams <M extends IACele.Data.ModelName>{
    modelName: M,
    children: (params: FormChildren<M>) => React.ReactNode; 
};

interface FieldConfig<M extends IACele.Data.ModelName> {
    name: keyof IACele.Data.ModelDefinition<M> | [keyof IACele.Data.ModelDefinition<M>, string[]];
};

interface FormChildren <M extends IACele.Data.ModelName> {
    Page: React.FC<IACele.Common.SupportsChildren>;
    Header: React.FC<IACele.Common.SupportsChildren>;
    Action: React.FC<ActionParams>;
    Sheet: React.FC<IACele.Common.SupportsChildren>;
    Field: React.FC<FieldConfig<M>>;
    Group: React.FC<GroupParams>;
};

interface RecordFormContextParams<M extends IACele.Data.ModelName> {
    modelName: M;
    suscribeFieldToRead: (config: FieldConfig<M>) => void;
    formRecord: IACele.Data.ModelDefinition<M>;
    loaded: boolean,
    getFieldMetadata: <M extends IACele.Data.ModelName>(
        fieldName: keyof IACele.Data.ModelDefinition<M>,
    ) => IACele.Data.Shape.FieldsMetadata;
    setFormRecordField: <F extends IACele.Data.FieldName<M>>(
        name: F,
        value: IACele.Data.ModelDefinition<M>[F],
    ) => void;
    existingChanges: boolean;
    saveChanges: () => Promise<void>;
    undoChanges: () => void;
    reload: () => void;
    recordId: number;
    createMode: boolean;
};

interface Many2OneOption {
    'id': number;
    'display_name': string;
};

type DurationValue = [number, number, number] | [null, null, null];

type Decoration = 'default' | 'info' | 'primary' | 'success' | 'warning' | 'danger';

interface ActionParams {
    name: string;
    label: string;
    decoration?: Decoration;
};

const Form = <M extends IACele.Data.ModelName>({
    modelName,
    children,
}: FormParams<M>) => {

    const {
        loaded,
        formRecord,
        setFormRecordField,
        suscribeFieldToRead,
        getFieldMetadata,
        // deleteRecord,
        // newRecord,
        saveChanges,
        undoChanges,
        existingChanges,
        reload,
        recordId,
        createMode,
    } = useFormRecord(modelName);

    return (
        <RecordFormContext.Provider value={{
            modelName,
            suscribeFieldToRead: suscribeFieldToRead as (config: FieldConfig<any>) => void,
            formRecord,
            loaded,
            getFieldMetadata: getFieldMetadata as (fieldName: any) => IACele.Data.Shape.FieldsMetadata,
            setFormRecordField: setFormRecordField as () => void,
            existingChanges,
            saveChanges,
            undoChanges,
            reload,
            recordId,
            createMode,
        }}>
            <div className="flex flex-row w-full h-min min-h-full">
                {children({ Page, Sheet, Group, Field, Action, Header })}
                <MainControls>
                    <div className="flex flex-row gap-2">
                        <SaveButton />
                        <UndoChangesButton />
                    </div>
                </MainControls>
            </div>
        </RecordFormContext.Provider>
    );
};

export default Form;

const Header: React.FC<IACele.Common.SupportsChildren> = ({
    children,
}) => {

    return (
        <div className="flex flex-wrap gap-2">
            {children}
        </div>
    );
};

const Action = <M extends IACele.Data.ModelName>({
    name,
    label,
    decoration = 'default'
}: ActionParams) => {

    const { api, appLoading } = useAPI();
    const { reload, saveChanges, recordId, createMode, modelName } = useContext<RecordFormContextParams<M>>(RecordFormContext);

    const execute = useCallback(
        async () => {
            // Si el formulario está en modo creación...
            if ( createMode ) {
                // Se guardan los cambios primero para obtener la ID de registro
                await saveChanges();
            };

            // Ejecución de la acción
            await api.action({
                'model_name': modelName,
                'record_id': recordId,
                'name': name,
            });
            // Se vuelve a cargar el registro
            reload();
        }, [createMode, saveChanges, api, modelName, recordId, name, reload]
    );

    return (
        <Button
            disabled={appLoading}
            onClick={execute}
            className="cursor-pointer"
            variant={decoration}
        >
            {label}
        </Button>
    );
};

const SaveButton = <M extends IACele.Data.ModelName>() => {

    // Obtención de valores desde el contexto
    const { existingChanges, saveChanges } = useContext<RecordFormContextParams<M>>(RecordFormContext);

    // Si existen cambios a guardar...
    if ( existingChanges ) {
        return (
            <Button onClick={saveChanges} variant='success' size='icon'>
                <Save className="stroke-white" />
            </Button>
        );
    };
};

const UndoChangesButton = <M extends IACele.Data.ModelName>() => {

    // Obtención de valores desde el contexto
    const { existingChanges, undoChanges } = useContext<RecordFormContextParams<M>>(RecordFormContext);

    // Si existen cambios a guardar...
    if ( existingChanges ) {
        return (
            <Button onClick={undoChanges} variant='default' size='icon'>
                <Undo2 className="stroke-white" />
            </Button>
        );
    };
};

const Field = <M extends IACele.Data.ModelName>({
    name,
}: FieldConfig<M>) => {

    // Obtención de valores desde el contexto
    const { suscribeFieldToRead, loaded } = useContext<RecordFormContextParams<M>>(RecordFormContext);

    // Suscripción del campo
    useEffect(
        () => {
            suscribeFieldToRead({ name });
        }, [suscribeFieldToRead, name]
    );

    if ( loaded ) {
        return (
            <FormScalarFieldWrapper name={name} />
        );
    };
};

const FormScalarFieldWrapper = <M extends IACele.Data.ModelName>({
    name,
}: FieldConfig<M>) => {

    // Obtención de función de cambio de valor
    const { getFieldMetadata } = useContext<RecordFormContextParams<M>>(RecordFormContext);
    // Obtención de metadatos de campo
    const metadata = getFieldMetadata(name as keyof IACele.Data.ModelDefinition<M>);
    // Definición de componente a usar para renderizar el dato
    const FieldComponent = useMemo(
        () => (
            FieldWidget[metadata.ttype]
        ), [metadata.ttype]
    );

    return (
        <div>
            <FormFieldContext.Provider value={{ name: name as keyof IACele.Data.ModelDefinition<M>, metadata }}>
                <FieldLabel />
                <FieldComponent />
            </FormFieldContext.Provider>
        </div>
    );
};

const FieldLabel = <M extends IACele.Data.ModelName>() => {

    // Obtención de metadatos de campos
    const { metadata } = useContext<FormFieldContextParams<M>>(FormFieldContext);

    return (
        <p className="flex flex-row items-center gap-1 my-1 text-primary text-sm select-none">
            {metadata['label']}
            {metadata['help_info'] &&
                <Tooltip>
                    <TooltipTrigger tabIndex={-1}>
                        <CircleQuestionMark className="size-3" />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        {metadata['help_info']}
                    </TooltipContent>
                </Tooltip>
            }
        </p>
    );
};

const preprocess = {

    integer: (value: string) => (
        value === ''
            ? null
            : Number(value.replace(/\D/, ''))
    ),

    char: (value: string) => (
        value === ''
            ? null
            : value
    ),

    boolean: (value: boolean | 'indeterminate' | null) => (
        value === null
            ? false
            : value === 'indeterminate'
                ? false
                : value
    ),

    float: (value: string) => (
        value === ''
            ? null
            : value.replace(/[^0-9.]/g, '')
    ),

    date: (value: string) => (value),

    datetime: (value: string) => (
        value === ''
            ? null
            : (
                /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)
                    ? `${value}:00`
                    : value
            )
            .replace('T', ' ')
    ),

    time: (value: string) => (value),

    'duration': (value: string) => (
        value === ''
            ? 0
            : Number(value.replace(/\D/, ''))
    ),

    selection: (value: string | null) => (
        value === ''
            ? null
            : value
    ),

    text: (value: string) => (
        value === ''
            ? null
            : value
    ),

    many2one: (value: string) => (
        value === ''
            ? null
            : Number(value)
    ),
};

const IntegerField = <M extends IACele.Data.ModelName>() => {

    // Obtención de valores desde los contextos
    const { name } = useContext<FormFieldContextParams<M>>(FormFieldContext);
    const { formRecord, setFormRecordField } = useContext<RecordFormContextParams<M>>(RecordFormContext);

    // Valor del registro
    const recordValue = formRecord[name] as IACele.Data.TType.Integer;

    // Función para establecer el valor
    const setValue = useCallback(
        (event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
            const value = preprocess.integer(event.target.value);
            setFormRecordField(name, value as any);
        }, [name, setFormRecordField]
    );

    // Valor actualizado
    const value = useMemo(
        () => (recordValue ?? ''),
        [recordValue]
    );

    return (
        <Input
            type="text"
            inputMode="numeric"
            onChange={setValue}
            value={value}
        />
    );
};

const CharField = <M extends IACele.Data.ModelName>() => {

    // Obtención de valores desde los contextos
    const { name } = useContext<FormFieldContextParams<M>>(FormFieldContext);
    const { formRecord, setFormRecordField } = useContext<RecordFormContextParams<M>>(RecordFormContext);

    // Valor del registro
    const recordValue = formRecord[name] as IACele.Data.TType.Char;

    // Función para establecer el valor
    const setValue = useCallback(
        (event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
            const value = preprocess.char(event.target.value);
            setFormRecordField(name, value as any);
        }, [name, setFormRecordField]
    );

    // Valor actualizado
    const value = useMemo(
        () => (recordValue ?? ''),
        [recordValue]
    );

    return (
        <Input
            onChange={setValue}
            value={value}
        />
    );
};

const BooleanField = <M extends IACele.Data.ModelName>() => {

    // Obtención de valores desde los contextos
    const { name } = useContext<FormFieldContextParams<M>>(FormFieldContext);
    const { formRecord, setFormRecordField } = useContext<RecordFormContextParams<M>>(RecordFormContext);

    // Valor del registro
    const recordValue = formRecord[name] as IACele.Data.TType.Boolean;

    // Función para establecer el valor
    const setValue = useCallback(
        (value: boolean | 'indeterminate' | null) => {
            value = preprocess.boolean(value);
            setFormRecordField(name, value as any);
        }, [name, setFormRecordField]
    );

    // Valor actualizado
    const value = useMemo(
        () => (
            (recordValue as boolean)
        ), [recordValue]
    );

    return (
        <Checkbox
            checked={value}
            onCheckedChange={setValue}
        />
    );
};

const FloatField = <M extends IACele.Data.ModelName>() => {

    // Obtención de valores desde los contextos
    const { name } = useContext<FormFieldContextParams<M>>(FormFieldContext);
    const { formRecord, setFormRecordField } = useContext<RecordFormContextParams<M>>(RecordFormContext);

    // Valor del registro
    const recordValue = formRecord[name] as IACele.Data.TType.Float;

    // Valor actualizado
    const value = useMemo(
        () => (recordValue ?? ''),
        [recordValue]
    );

    // Inicialización de valor de campo
    const [ inputValue, setInputValue ] = useState<number | string>(value);

    // Efecto para actualizar el valor del campo cuando el valor del formulario cambie
    useEffect(
        () => {
            setInputValue(value);
        }, [value]
    );

    // Función para establecer el valor
    const setValue = useCallback(
        (event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
            const cleanValue = preprocess.float(event.target.value);
            const isValid = (
                cleanValue === null
                || !( /^\d*\.$/.test(cleanValue) )
            );

            if ( isValid ) {
                setFormRecordField(name, cleanValue ?? '' as any);
            } else {
                setInputValue(cleanValue);
            };
        }, [name, setFormRecordField]
    );

    return (
        <Input
            type="text"
            inputMode="numeric"
            onChange={setValue}
            value={inputValue}
        />
    );
};

const DateField = <M extends IACele.Data.ModelName>() => {

    // Obtención de valores desde los contextos
    const { name } = useContext<FormFieldContextParams<M>>(FormFieldContext);
    const { formRecord, setFormRecordField } = useContext<RecordFormContextParams<M>>(RecordFormContext);

    // Valor del registro
    const recordValue = formRecord[name] as IACele.Data.TType.Date;

    // Función para establecer el valor
    const setValue = useCallback(
        (event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
            const value = preprocess.date(event.target.value);
            setFormRecordField(name, value as any);
        }, [name, setFormRecordField]
    );

    // Valor actualizado
    const value = useMemo(
        () => (recordValue ?? ''),
        [recordValue]
    );

    return (
        <Input
            type="date"
            value={value}
            onChange={setValue}
            step={1}
        />
    );
};

const DatetimeField = <M extends IACele.Data.ModelName>() => {

    // Obtención de valores desde los contextos
    const { name } = useContext<FormFieldContextParams<M>>(FormFieldContext);
    const { formRecord, setFormRecordField } = useContext<RecordFormContextParams<M>>(RecordFormContext);

    // Valor del registro
    const recordValue = formRecord[name] as IACele.Data.TType.Datetime;

    // Función para establecer el valor
    const setValue = useCallback(
        (event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
            const value = preprocess.datetime(event.target.value);
            setFormRecordField(name, value as any);
        }, [name, setFormRecordField]
    );

    // Valor actualizado
    const value = useMemo(
        () => (recordValue ?? ''),
        [recordValue]
    );

    return (
        <Input
            type="datetime-local"
            value={value}
            onChange={setValue}
            step={1}
        />
    );
};

const TimeField = <M extends IACele.Data.ModelName>() => {

    // Obtención de valores desde los contextos
    const { name } = useContext<FormFieldContextParams<M>>(FormFieldContext);
    const { formRecord, setFormRecordField } = useContext<RecordFormContextParams<M>>(RecordFormContext);

    // Valor del registro
    const recordValue = formRecord[name] as IACele.Data.TType.Time;

    // Función para establecer el valor
    const setValue = useCallback(
        (event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
            const value = preprocess.time(event.target.value);
            setFormRecordField(name, value as any);
        }, [name, setFormRecordField]
    );

    // Valor actualizado
    const value = useMemo(
        () => (recordValue ?? ''),
        [recordValue]
    );

    return (
        <Input
            type="time"
            value={value}
            onChange={setValue}
            step={1}
        />
    );
};

const SelectionField = <M extends IACele.Data.ModelName> () => {

    // Obtención de valores desde los contextos
    const { name, metadata } = useContext<FormFieldContextParams<M>>(FormFieldContext);
    const { formRecord, setFormRecordField } = useContext<RecordFormContextParams<M>>(RecordFormContext);

    // Valor del registro
    const recordValue = formRecord[name] as IACele.Data.TType.Selection<string>;

    // Función para establecer el valor
    const setValue = useCallback(
        (inputValue: string | null) => {
            const value = preprocess.selection(inputValue);
            setFormRecordField(name, value as any);
        }, [name, setFormRecordField]
    );

    // Valor actualizado
    const value = useMemo(
        () => (recordValue ?? ''),
        [recordValue]
    );

    return (
        <div className="flex flex-row gap-2">
            <Select onValueChange={setValue} value={value}>
                <SelectTrigger className="w-full">
                    <SelectValue className="bg-green-500" placeholder="Selecciona un valor"/>
                </SelectTrigger>
                <SelectContent>
                    {
                        metadata['selection_ids'].map(
                            ( selection ) => (
                                <SelectItem
                                    key={selection.id}
                                    value={selection.name}
                                >
                                    {selection.label}
                                </SelectItem>
                            )
                        )
                    }
                </SelectContent>
            </Select>
            <Button size='icon' variant={"secondary"} onClick={() => setValue(null)}>
                <X className="stroke-foreground" />
            </Button>
        </div>
    );
};

const TextField = <M extends IACele.Data.ModelName>() => {

    // Obtención de valores desde los contextos
    const { name } = useContext<FormFieldContextParams<M>>(FormFieldContext);
    const { formRecord, setFormRecordField } = useContext<RecordFormContextParams<M>>(RecordFormContext);

    // Valor del registro
    const recordValue = formRecord[name] as IACele.Data.TType.Text;

    // Función para establecer el valor
    const setValue = useCallback(
        (event: React.ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>) => {
            const value = preprocess.text(event.target.value);
            setFormRecordField(name, value as any);
        }, [name, setFormRecordField]
    );

    // Valor actualizado
    const value = useMemo(
        () => (recordValue ?? ''),
        [recordValue]
    );

    return (
        <Textarea
            onChange={setValue}
            value={value}
        />
    );
};

const Many2OneField = <M extends IACele.Data.ModelName>() => {

    // Obtención de la instancia de API
    const { api } = useAPI();

    // Inicialización de estado de carga
    const [ loading, setLoading ] = useState<boolean>(false);
    // Inicialización de lista desplegada
    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    // Obtención de valores desde los contextos
    const { name, metadata } = useContext<FormFieldContextParams<M>>(FormFieldContext);
    const { formRecord, setFormRecordField } = useContext<RecordFormContextParams<M>>(RecordFormContext);

    // Valor del registro
    const recordValue = formRecord[name] as IACele.Data.TType.Many2One;

    // Función para establecer el valor
    const setValue = useCallback(
        (inputValue: string) => {
            const value = preprocess.many2one(inputValue);
            setFormRecordField(name, value as any);
        }, [name, setFormRecordField]
    );

    // Función para borrar el valor
    const deleteValue = useCallback(
        () => {
            setValue('');
        }, [setValue]
    );

    // Valor actualizado
    const value = useMemo<string>(
        () => {
            if ( recordValue === null ) return ('');
            if ( typeof recordValue === 'number' ) return String(recordValue);
            const [ recordId ] = recordValue;
            return String(recordId);
        }, [recordValue]
    );

    // Inicialización de estado de opciones a seleccionar
    const [ options, setOptions ] = useState<Many2OneOption[]>(
        () => {
            // Si el valor del formulario es nulo, se retorna una lista vacía
            if ( recordValue === null ) return ([]);
            // Extracción de ID y nombre de registro referenciado
            const [ id, displayName ] = recordValue;
            // Inicialización  de lista de opciones donde se muestra el registro para que se procese correctamente
            const recordInOptions: Many2OneOption[] = [
                {
                    'id': id,
                    'display_name': displayName
                },
            ];
            return recordInOptions;
        }
    );

    // Función para obtener registros y usarlos como opciones seleccionables en el componente
    const load = useCallback(
        async () => {
            // Si el estado es verdadero
            if ( isOpen ) {
                // Se contrae la lista
                setIsOpen(false);
                // Se termina la ejecución
                return;
            };
            // Se inicia el estado de carga
            setLoading(true);
            // Obtención de registros
            const records = await api.searchRead({
                'model_name': metadata['related_model'],
            });

            // Se establecen los registros en las opciones
            setOptions(records);
            // Se termina el estado de carga
            setLoading(false);
            // Se despliega la lista
            setIsOpen(true);
        }, [isOpen, api, metadata]
    );

    return (
        <div className="flex flex-row gap-2">
            <Select onOpenChange={load} open={isOpen} onValueChange={setValue} value={value}>
                <SelectTrigger className="w-full">
                    {
                        loading
                            ? <Spinner />
                            : <SelectValue placeholder="Selecciona un valor"/>
                    }
                </SelectTrigger>
                <SelectContent>
                    {
                        options.map(
                            ( selection ) => (
                                <SelectItem
                                    key={String(selection.id)}
                                    value={String(selection.id)}
                                >
                                    {selection.display_name}
                                </SelectItem>
                            )
                        )
                    }
                </SelectContent>
            </Select>
            <Button size='icon' variant="secondary" onClick={deleteValue}>
                <X className="stroke-foreground" />
            </Button>
        </div>
    );
};

const useDuration = (recordValue: string | null) => {

    // Mapeo de índices
    const INDEX = useMemo(
        () => ({
            HOURS: 0,
            MINUTES: 1,
            SECONDS: 2,
        }), []
    );

    // Función para parsear valor entrante como nulo o cadena de texto en tupla de nulos o números
    const parseValue = useCallback(
        (): DurationValue => {
            if ( recordValue === null ) return ([null, null, null]);
            return (
                (recordValue as string)
                .split(':')
                .map(
                    (value) => (Number(value))
                ) as DurationValue
            );
        }, [recordValue]
    );

    // Inicialización de estado de valor como array
    const [ arrayValue, setArrayValue ] = useState<DurationValue>(parseValue);

    // Efecto para actualizar el valor del array cada vez que el valor del formulario cambia
    useEffect(
        () => {
            setArrayValue(parseValue);
        }, [recordValue, parseValue]
    );

    // Función para cambiar el valor de horas, minutos o segundos del valor como array
    const setValue = useCallback(
        (value: number, index: number) => {
            setArrayValue(
                ( prev ) => (
                    prev.map(
                        // Se recorre cada uno de los elementos
                        ( v, i ) => {
                            // Se cambia el elemento del índice por el valor provisto
                            if ( i === index ) {
                                return (value);
                            // Manejo con el resto de valores: La tupla debe ser toda de números en el caso de esta función
                            } else {
                                // En cambio de valor, el resto de valores tienen que convertise en ceros si son nulos
                                if ( v === null ) {
                                    return (0);
                                // Si el valor ya no era nulo, se mantiene igual
                                } else {
                                    return (v);
                                };
                            };
                        }
                    ) as DurationValue
                )
            );
        }, []
    );

    // Función para borrar el valor
    const deleteValue = useCallback(
        () => {
            setArrayValue([null, null, null]);
        }, []
    );

    // Valor parseado para ser enviado a creación o actualización
    const parsedValue = useMemo(
        () => (
            arrayValue[INDEX.HOURS] === null
                ? null
                : arrayValue.map(
                    (value) => ((
                        (value as number) <= 9
                            ? `0${value}`
                            : value
                    ))
                ).join(':')
        ), [arrayValue, INDEX]
    );

    return {
        value: arrayValue,
        INDEX,
        deleteValue,
        setValue,
        parsedValue,
    };
};

const DurationField = <M extends IACele.Data.ModelName>() => {

    // Obtención de valores desde los contextos
    const { name } = useContext<FormFieldContextParams<M>>(FormFieldContext);
    const { formRecord, setFormRecordField } = useContext<RecordFormContextParams<M>>(RecordFormContext);

    // Valor del registro
    const recordValue = formRecord[name] as IACele.Data.TType.Duration;

    // Obtención de valores y funciones desde el hook
    const { INDEX, value, setValue, deleteValue, parsedValue } = useDuration(recordValue);

    // Actualización del valor del registro cada vez que el valor parseado cambie
    useEffect(
        () => {
            setFormRecordField(name, parsedValue as any)
        }, [parsedValue, setFormRecordField, name]
    );

    return (
        <div className="flex flex-row gap-2">
            <Input
                type="number"
                value={value[INDEX.HOURS] ?? ''}
                onChange={(event) => setValue(preprocess.duration(event.target.value), INDEX.HOURS)}
                />
            <Input
                type="number"
                value={value[INDEX.MINUTES] ?? ''}
                onChange={(event) => setValue(preprocess.duration(event.target.value), INDEX.MINUTES)}
                />
            <Input
                type="number"
                value={value[INDEX.SECONDS] ?? ''}
                onChange={(event) => setValue(preprocess.duration(event.target.value), INDEX.SECONDS)}
            />
            <Button size='icon' variant={"secondary"} onClick={deleteValue}>
                <X className="stroke-foreground" />
            </Button>
        </div>
    );
};

const RecordTags = <M extends IACele.Data.ModelName>() => {

    // Obtención de valores desde los contextos
    const { name } = useContext<FormFieldContextParams<M>>(FormFieldContext);
    const { formRecord } = useContext<RecordFormContextParams<M>>(RecordFormContext);

    // Valor del registro
    const recordValue = formRecord[name] as IACele.Data.TType.One2Many<'tuples'>;

    return (
        <div className="flex flex-wrap gap-2">
            {
                recordValue.map(
                    (record) => (
                        <Badge id={String(record['id'])} className="select-none">
                            {record['display_name']}
                        </Badge>
                    )
                )
            }
        </div>
    );
};

const FieldWidget: Record<IACele.Data.TTypeName, React.FC> = {
    'integer': IntegerField,
    'char': CharField,
    'boolean': BooleanField,
    'float': FloatField,
    'date': DateField,
    'datetime': DatetimeField,
    'time': TimeField,
    'duration': DurationField,
    'selection': SelectionField,
    'text': TextField,
    'many2one': Many2OneField,
    'one2many': RecordTags,
    'many2many': RecordTags,
    'file': CharField,
    'json': CharField,
};

// --------------------------------------------

interface FormFieldContextParams <M extends IACele.Data.ModelName>{
    name: keyof IACele.Data.ModelDefinition<M>;
    metadata: IACele.Data.Shape.FieldsMetadata;
};

const FormFieldContext = createContext<FormFieldContextParams<any>>({
    name: '',
    metadata: {} as any,
});

const Page: React.FC<IACele.Common.SupportsChildren> = ({
    children,
}) => {

    return (
        <div className="flex flex-col gap-2 p-2 w-full h-max min-h-full max-h-full">
            {children}
        </div>
    );
};

const Sheet: React.FC<IACele.Common.SupportsChildren> = ({
    children,
}) => {

    return (
        <div className="group bg-card shadow-md pt-2 pb-4 border border-gray-500/20 rounded-lg w-full h-full min-h-screen grow">
            <div className="grid grid-cols-1 md:grid-cols-2 h-min">
                {children}
            </div>
        </div>
    );
};

interface GroupParams extends IACele.Common.SupportsChildren {
    label?: string;
};

const Group: React.FC<GroupParams> = ({
    children,
    label,
}) => {

    return (
        <div className="flex flex-col px-4 group-[.ui-group]:px-0 py-2 group-[.ui-group]:pb-0">
            <p className="group-[.ui-group]:hidden opacity-50 pb-1 border-gray-500/50 border-b h-5 font-semibold text-xs uppercase select-none">
                {label}
            </p>
            <div className="group ui-group flex flex-col gap-x-4 group-[.ui-group]:grid group-[.ui-group]:grid-cols-2 py-1">
                {children}
            </div>
        </div>
    );
};

const RecordFormContext = createContext<RecordFormContextParams<any>>({
    modelName: null,
    suscribeFieldToRead: () => {},
    formRecord: {},
    loaded: false,
    getFieldMetadata: () => (null) as any,
    setFormRecordField: () => {},
    existingChanges: false,
    saveChanges: async () => {},
    undoChanges: () => {},
    createMode: true,
    recordId: 0,
    reload: () => {},
});
