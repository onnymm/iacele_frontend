import MainControls from "@/components/common/navbar/MainControls";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import useAPI from "@/hooks/app/useAPI";
import useFormRecord from "@/hooks/views/useFormRecord";
import { CircleQuestionMark, Save, Undo2, X } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import ViewDataContext from "@/contexts/routes/viewDataContext";
import type VIEW from "../Views";
import useView from "../useView";
import type RecordEvaluator from "@/core/ttypes";
import { useNavigate } from "react-router";

type BooeanOrConditionalStatement<M extends IACele.Data.ModelName> = IACele.Data.CriteriaStructure<M> | boolean;

interface FormParams <M extends IACele.Data.ModelName>{
    modelName: M,
    create?: boolean;
    children: (params: FormChildren<M>) => React.ReactNode;
    contextData?: Partial<IACele.Data.ModelDefinition<M>>;
};

interface _SupportsInvisibleParams<M extends IACele.Data.ModelName> {
    invisible?: BooeanOrConditionalStatement<M>;
};

interface _SupportsReadonlyParams<M extends IACele.Data.ModelName> {
    readonly?: BooeanOrConditionalStatement<M>;
};

interface _FieldConfig<M extends IACele.Data.ModelName> {
    name: keyof IACele.Data.ModelDefinition<M> | [keyof IACele.Data.ModelDefinition<M>, (keyof IACele.Data.ModelDefinition<any>)[]];
    readonly?: BooeanOrConditionalStatement<M>;
    open?: keyof typeof VIEW;
};

type FieldConfig<M extends IACele.Data.ModelName> = (
    & _FieldConfig<M>
    & _SupportsInvisibleParams<M>
    & _SupportsReadonlyParams<M>
);

interface FormChildren <M extends IACele.Data.ModelName> {
    Page: React.FC<IACele.Common.SupportsChildren>;
    Header: React.FC<IACele.Common.SupportsChildren>;
    Action: React.FC<ActionParams<M>>;
    Sheet: React.FC<IACele.Common.SupportsChildren>;
    Field: React.FC<FieldConfig<M>>;
    Group: React.FC<GroupParams<M>>;
    Wizard: React.FC<WizardParams<M>>;
};

interface RecordFormContextParams<M extends IACele.Data.ModelName> {
    modelName: M;
    create: boolean;
    suscribeFieldToRead: (config: _FieldConfig<M>) => void;
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
    newRecord: () => void;
    existingNewData: boolean;
    parent: IACele.Data.ModelDefinition<M>;
    evaluator: RecordEvaluator<M> | null;
};

interface Many2OneOption {
    'id': number;
    'display_name': string;
};

type DurationValue = [number, number, number] | [null, null, null];

type Decoration = 'default' | 'info' | 'primary' | 'success' | 'warning' | 'danger';

interface ActionParamsv0 {
    name: string;
    label: string;
    decoration?: Decoration;
};

type ActionParams<M extends IACele.Data.ModelName> = (
    & ActionParamsv0
    & _SupportsInvisibleParams<M>
);

const Form = <M extends IACele.Data.ModelName>({
    modelName,
    create = true,
    children,
}: FormParams<M>) => {

    const {
        loaded,
        formRecord,
        setFormRecordField,
        suscribeFieldToRead,
        getFieldMetadata,
        // deleteRecord,
        newRecord,
        saveChanges,
        undoChanges,
        existingChanges,
        reload,
        recordId,
        createMode,
        existingNewData,
        evaluator,
        // viewDataName,
    } = useFormRecord(modelName);

    // Obtención de datos de contexto por si se está renderizando un formulario anidado
    const { contextData } = useContext<ContextDataContextParams<M>>(ContextDataContext)

    useEffect(
        () => {
            // Si los datos ya fueron cargados, el modo es creación, el formulario está vacío y existen datos de contexto...
            if ( loaded && createMode && !Object.keys(formRecord).length && contextData ) {
                // Iteración por cada llave de los datos de contexto
                (Object.keys(contextData) as IACele.Data.FieldName<M>[]).forEach(
                    (k) => {
                        // Se establecen los datos de contexto
                        setFormRecordField(k, contextData[k] as any);
                    }
                );
            };
        }, [loaded, contextData, setFormRecordField, createMode, formRecord]
    );

    return (
        <RecordFormContext.Provider value={{
            modelName,
            create,
            suscribeFieldToRead: suscribeFieldToRead as (config: _FieldConfig<any>) => void,
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
            newRecord,
            existingNewData,
            parent: formRecord,
            evaluator,
        }}>
            <div className="flex flex-row w-full h-min min-h-full">
                {children({ Page, Sheet, Group, Field, Action, Header, Wizard })}
                <FormControls />
            </div>
        </RecordFormContext.Provider>
    );
};

export default Form;

const FormControls = () => {

    // Obtención de tipo de renderización
    const { display } = useContext(ViewDataContext);
    // Obtención de función para establecer el estado de comando de modal
    const { setCommand } = useContext(ContextDataContext);
    // Obtención de función para guardar cambios
    const { saveChanges } = useContext(RecordFormContext)

    // Se establece la función de guardar cambios en el estado de comando
    useEffect(
        () => {
            setCommand(() => (saveChanges));
        }, [setCommand, saveChanges]
    );

    // Si el tipo de renderización es de pantalla...
    if ( display === 'screen' ) {
        return (
            <MainControls>
                <div className="flex flex-row gap-2">
                    <NewRecordButton />
                    <SaveButton />
                    <UndoChangesButton />
                </div>
            </MainControls>
        );
    };
};

const Header: React.FC<IACele.Common.SupportsChildren> = ({
    children,
}) => {

    return (
        <div className="flex flex-wrap gap-2">
            {children}
        </div>
    );
};

const SupportsInvisible = <M extends IACele.Data.ModelName>({
    invisible,
    children,
}: _SupportsInvisibleParams<M> & IACele.Common.SupportsChildren) => {

    // Obtención de valores desde el contexto
    const { evaluator } = useContext<RecordFormContextParams<M>>(RecordFormContext);

    // Evaluación de si el componente es visible
    const isComponentInvisible = useMemo(
        () => (invisible && evaluator ? evaluator.evaluate(invisible) : false),
        [evaluator, invisible]
    );

    // Si se determina que el componente es invisible no se retorna nada
    if ( isComponentInvisible ) return null;

    return (children);
};

const Action = <M extends IACele.Data.ModelName>({
    name,
    label,
    decoration = 'default',
    invisible,
}: ActionParams<M>) => {

    const { api, appLoading } = useAPI();
    const { reload, saveChanges, recordId, createMode, modelName, loaded } = useContext<RecordFormContextParams<M>>(RecordFormContext);

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

    if ( loaded ) {
        return (
            <SupportsInvisible invisible={invisible}>
                <Button
                    disabled={appLoading}
                    onClick={execute}
                    className="cursor-pointer"
                    variant={decoration}
                    >
                    {label}
                </Button>
            </SupportsInvisible>
        );
    };
};

const NewRecordButton = <M extends IACele.Data.ModelName>() => {

    // Obtención de valores desde el contexto
    const { createMode, create, newRecord } = useContext<RecordFormContextParams<M>>(RecordFormContext);

    // Si el modo de creación no está establecido...
    if ( !createMode && create ) {
        return (
            <Button onClick={newRecord} variant='primary'>
                Nuevo
            </Button>
        );
    };
};

const SaveButton = <M extends IACele.Data.ModelName>() => {

    // Obtención de valores desde el contexto
    const { existingChanges, saveChanges, existingNewData, createMode } = useContext<RecordFormContextParams<M>>(RecordFormContext);

    // Si existen cambios a guardar...
    if ( existingChanges || ( existingNewData && createMode ) ) {
        return (
            <Button onClick={saveChanges} variant='success' size='icon'>
                <Save className="stroke-white" />
            </Button>
        );
    };
};

const UndoChangesButton = <M extends IACele.Data.ModelName>() => {

    // Obtención de valores desde el contexto
    const { existingChanges, undoChanges, existingNewData, createMode } = useContext<RecordFormContextParams<M>>(RecordFormContext);

    // Si existen cambios a guardar...
    if ( existingChanges || ( existingNewData && createMode) ) {
        return (
            <Button onClick={undoChanges} variant='default' size='icon'>
                <Undo2 className="stroke-white" />
            </Button>
        );
    };
};

const useReadonly = <M extends IACele.Data.ModelName>(
    readonly: IACele.Data.CriteriaStructure<M> | boolean | undefined,
) => {

    // Obtención de valores desde el contexto
    const { getFieldMetadata, evaluator, createMode } = useContext<RecordFormContextParams<M>>(RecordFormContext);
    // Obtención de valores desde los contextos
    const { name } = useContext<FormFieldContextParams<M>>(FormFieldContext);

    // Evaluación de si el componente es visible
    const isComponentReadonly = useMemo(
        () => (readonly !== undefined && evaluator ? evaluator.evaluate(readonly) : false),
        [evaluator, readonly]
    );

    const staticReadonly = useMemo(
        () => {
            const metadata = getFieldMetadata(name);
            const isReadonlyField = metadata['readonly'];
            const isComputedField = metadata['is_computed'];
            return (
                (isReadonlyField || isComputedField)
                && !createMode
            );
        }, [getFieldMetadata, name, createMode]
    );

    const isReadonly = (
        staticReadonly
            ? true
            : isComponentReadonly
    )

    return { isReadonly };
};

const Field = <M extends IACele.Data.ModelName>({
    name,
    invisible,
    readonly,
    open,
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
            <SupportsInvisible invisible={invisible}>
                <FormScalarFieldWrapper name={name} readonly={readonly} open={open} />
            </SupportsInvisible>
        );
    };
};

const FormScalarFieldWrapper = <M extends IACele.Data.ModelName>({
    name,
    readonly,
    open,
}: _FieldConfig<M>) => {

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
            <FormFieldContext.Provider value={{
                name: name as keyof IACele.Data.ModelDefinition<M>,
                metadata,
                readonly,
                open,
            }}>
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

const useScalarFormValue: <T>(value: any) => T = (
    value,
) => {

    // Evaluación del valor
    const recordValue = (
        value !== undefined
            ? value
            : null
    );

    return recordValue;
};

const IntegerField = <M extends IACele.Data.ModelName>() => {

    // Obtención de valores desde los contextos
    const { name, readonly } = useContext<FormFieldContextParams<M>>(FormFieldContext);
    const { formRecord, setFormRecordField } = useContext<RecordFormContextParams<M>>(RecordFormContext);
    const { isReadonly } = useReadonly(readonly);

    // Valor del registro
    const recordValue = useScalarFormValue<IACele.Data.TType.Integer>(formRecord[name]);

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
            disabled={isReadonly}
        />
    );
};

const CharField = <M extends IACele.Data.ModelName>() => {

    // Obtención de valores desde los contextos
    const { name, readonly } = useContext<FormFieldContextParams<M>>(FormFieldContext);
    const { formRecord, setFormRecordField } = useContext<RecordFormContextParams<M>>(RecordFormContext);
    const { isReadonly } = useReadonly(readonly);

    // Valor del registro
    const recordValue = useScalarFormValue<IACele.Data.TType.Char>(formRecord[name]);

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
            disabled={isReadonly}
        />
    );
};

const BooleanField = <M extends IACele.Data.ModelName>() => {

    // Obtención de valores desde los contextos
    const { name, readonly } = useContext<FormFieldContextParams<M>>(FormFieldContext);
    const { formRecord, setFormRecordField } = useContext<RecordFormContextParams<M>>(RecordFormContext);
    const { isReadonly } = useReadonly(readonly);

    // Valor del registro
    const recordValue = useScalarFormValue<IACele.Data.TType.Boolean>(formRecord[name]);

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
            disabled={isReadonly}
        />
    );
};

const FloatField = <M extends IACele.Data.ModelName>() => {

    // Obtención de valores desde los contextos
    const { name, readonly } = useContext<FormFieldContextParams<M>>(FormFieldContext);
    const { formRecord, setFormRecordField } = useContext<RecordFormContextParams<M>>(RecordFormContext);
    const { isReadonly } = useReadonly(readonly);

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
            disabled={isReadonly}
        />
    );
};

const DateField = <M extends IACele.Data.ModelName>() => {

    // Obtención de valores desde los contextos
    const { name, readonly } = useContext<FormFieldContextParams<M>>(FormFieldContext);
    const { formRecord, setFormRecordField } = useContext<RecordFormContextParams<M>>(RecordFormContext);
    const { isReadonly } = useReadonly(readonly);

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
            disabled={isReadonly}
        />
    );
};

const DatetimeField = <M extends IACele.Data.ModelName>() => {

    // Obtención de valores desde los contextos
    const { name, readonly } = useContext<FormFieldContextParams<M>>(FormFieldContext);
    const { formRecord, setFormRecordField } = useContext<RecordFormContextParams<M>>(RecordFormContext);
    const { isReadonly } = useReadonly(readonly);

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
            disabled={isReadonly}
        />
    );
};

const TimeField = <M extends IACele.Data.ModelName>() => {

    // Obtención de valores desde los contextos
    const { name, readonly } = useContext<FormFieldContextParams<M>>(FormFieldContext);
    const { formRecord, setFormRecordField } = useContext<RecordFormContextParams<M>>(RecordFormContext);
    const { isReadonly } = useReadonly(readonly);

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
            disabled={isReadonly}
        />
    );
};

const SelectionField = <M extends IACele.Data.ModelName> () => {

    // Obtención de valores desde los contextos
    const { name, metadata, readonly } = useContext<FormFieldContextParams<M>>(FormFieldContext);
    const { formRecord, setFormRecordField } = useContext<RecordFormContextParams<M>>(RecordFormContext);
    const { isReadonly } = useReadonly(readonly);

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
            <Select onValueChange={setValue} value={value} disabled={isReadonly}>
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
            <Button size='icon' variant={"secondary"} onClick={() => setValue(null)} disabled={isReadonly}>
                <X className="stroke-foreground" />
            </Button>
        </div>
    );
};

const TextField = <M extends IACele.Data.ModelName>() => {

    // Obtención de valores desde los contextos
    const { name, readonly } = useContext<FormFieldContextParams<M>>(FormFieldContext);
    const { formRecord, setFormRecordField } = useContext<RecordFormContextParams<M>>(RecordFormContext);
    const { isReadonly } = useReadonly(readonly);

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
            disabled={isReadonly}
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
    const { name, metadata, readonly } = useContext<FormFieldContextParams<M>>(FormFieldContext);
    const { formRecord, setFormRecordField } = useContext<RecordFormContextParams<M>>(RecordFormContext);
    const { isReadonly } = useReadonly(readonly);

    // Valor del registro
    const recordValue = (
        formRecord[name] !== undefined
            ? formRecord[name]
            : null
    ) as IACele.Data.TType.Many2One;

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

    const computeValue = useCallback(
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
        }, [recordValue]
    );

    // Inicialización de estado de opciones a seleccionar
    const [ options, setOptions ] = useState<Many2OneOption[]>(computeValue);

    // Uso de efecto para recomputar cuando el valor del registro cambie
    useEffect(
        () => {
            // Si el valor es numérico no se puede computar un valor de opciones
            if ( typeof recordValue === 'number' ) return;
            // Cómputo de opciones
            setOptions(computeValue);
        }, [recordValue, computeValue]
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
            <Select onOpenChange={load} open={isOpen} onValueChange={setValue} value={value} disabled={isReadonly}>
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
            <Button size='icon' variant="secondary" onClick={deleteValue} disabled={isReadonly}>
                <X className="stroke-foreground" />
            </Button>
        </div>
    );
};

const useDuration = <M extends IACele.Data.ModelName>(recordValue: string | null) => {

    // Obtención de valores desde los contextos
    const { name } = useContext<FormFieldContextParams<M>>(FormFieldContext);
    const { setFormRecordField } = useContext<RecordFormContextParams<M>>(RecordFormContext);

    // Mapeo de índices
    const INDEX = useMemo(
        () => ({
            HOURS: 0,
            MINUTES: 1,
            SECONDS: 2,
        } as const), []
    );

    const NullValue = useMemo(
        () => (
            [null, null, null] as [null, null, null]
        ), []
    );

    // Función para parsear valor entrante como nulo o cadena de texto en tupla de nulos o números
    const toTuple = useCallback(
        (formValue: string | null): DurationValue => {
            if ( formValue === null || formValue === undefined ) return (NullValue);
            return (
                (formValue as string)
                .split(':')
                .map(
                    (value) => (Number(value))
                ) as DurationValue
            );
        }, [NullValue]
    );

    // Inicialización de estado de valor como array
    const [ arrayValue, setArrayValue ] = useState<DurationValue>(toTuple(recordValue));

    // Efecto para actualizar el valor del array cada vez que el valor del formulario cambia
    useEffect(
        () => {
            setArrayValue(toTuple(recordValue));
        }, [recordValue, toTuple]
    );

    const parseF = useCallback(
        (arr: DurationValue) => {
            return (
                arr[INDEX.HOURS] === null
                    ? null
                    : arr.map(
                        (value) => ((
                            (value as number) <= 9
                                ? `0${value}`
                                : value
                        ))
                    ).join(':')
            );
        }, [INDEX.HOURS]
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
            setFormRecordField(name, parseF(arrayValue) as any);
        }, [setFormRecordField, name, arrayValue, parseF]
    );

    // Función para borrar el valor
    const deleteValue = useCallback(
        () => {
            setArrayValue([null, null, null]);
        }, []
    );

    return {
        value: arrayValue,
        INDEX,
        deleteValue,
        setValue,
    };
};

const DurationField = <M extends IACele.Data.ModelName>() => {

    // Obtención de valores desde los contextos
    const { name } = useContext<FormFieldContextParams<M>>(FormFieldContext);
    const { formRecord } = useContext<RecordFormContextParams<M>>(RecordFormContext);

    // Valor del registro
    const recordValue = useMemo(
        () => (
            formRecord[name] as IACele.Data.TType.Duration
        ),
        [formRecord, name]
    );

    // Obtención de valores y funciones desde el hook
    const { INDEX, value, setValue, deleteValue } = useDuration<M>(recordValue);

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

const useArrayFormValue: <T extends Array<any>>(value: any) => T = (
    value,
) => {

    // Evaluación del valor
    const recordValue = (
        value !== undefined
            ? value
            : []
    );

    return recordValue;
};

const RecordTags = <M extends IACele.Data.ModelName>() => {

    // Obtención de valores desde los contextos
    const { name, open } = useContext<FormFieldContextParams<M>>(FormFieldContext);
    const { formRecord } = useContext<RecordFormContextParams<M>>(RecordFormContext);

    // Valor del registro
    const recordValue = useArrayFormValue<IACele.Data.TType.One2Many<'tuples'>>(formRecord[name]);

    const navigateTo = useNavigate();

    const openRecord = useCallback(
        (recordId: number) => {
            if ( open ) {
                navigateTo(`/view?name=${open}&id=${recordId}`)
            }
        }, [navigateTo, open]
    )

    return (
        <div className="flex flex-wrap gap-2">
            {
                recordValue.map(
                    (record) => (
                        <Badge key={String(record['id'])} className="select-none" onClick={() => openRecord(record['id'])}>
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
    readonly?: BooeanOrConditionalStatement<M>;
    metadata: IACele.Data.Shape.FieldsMetadata;
    open?: keyof typeof VIEW;
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

    // Obtención de tipo de renderización
    const { display } = useContext(ViewDataContext)

    return (
        <div className={`${display === 'screen' ? 'min-h-screen': ''} group bg-card shadow-md pt-2 pb-4 border border-gray-500/20 rounded-lg w-full h-full grow`}>
            <div className="grid grid-cols-1 md:grid-cols-2 h-min">
                {children}
            </div>
        </div>
    );
};

type _GroupParams<M extends IACele.Data.ModelName> = (
    & _SupportsInvisibleParams<M>
    & IACele.Common.SupportsChildren
);

interface GroupParams<M extends IACele.Data.ModelName> extends _GroupParams<M>  {
    label?: string;
};

const Group = <M extends IACele.Data.ModelName>({
    children,
    label,
    invisible,
}: GroupParams<M>) => {

    return (
        <SupportsInvisible invisible={invisible}>
            <div className="flex flex-col px-4 group-[.ui-group]:px-0 py-2 group-[.ui-group]:pb-0">
                <p className="group-[.ui-group]:hidden opacity-50 pb-1 border-gray-500/50 border-b h-5 font-semibold text-xs uppercase select-none">
                    {label}
                </p>
                <div className="group ui-group flex flex-col gap-x-4 group-[.ui-group]:grid group-[.ui-group]:grid-cols-2 py-1">
                    {children}
                </div>
            </div>
        </SupportsInvisible>
    );
};

const RecordFormContext = createContext<RecordFormContextParams<any>>({
    modelName: null,
    create: false,
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
    newRecord: () => {},
    existingNewData: false,
    parent: undefined,
    evaluator: null as any,
});

type Related<K extends keyof typeof VIEW> = (
    (typeof VIEW)[K]['modelName'] extends IACele.Data.ModelName
        ? (typeof VIEW)[K]['modelName']
        : never
);

interface WizardParams <M extends IACele.Data.ModelName, V extends keyof typeof VIEW= keyof typeof VIEW, >{
    viewDataName: V;
    label: string;
    decoration?: Decoration;
    contextData?: Partial<IACele.Data.ModelDefinition<Related<V>>> | ((ctx: IACele.Data.ModelDefinition<M>) => Partial<IACele.Data.ModelDefinition<Related<V>>>)
};

const Wizard = <M extends IACele.Data.ModelName>({
    viewDataName,
    label,
    decoration,
    contextData: contextDataOrCallback,
}: WizardParams<M>) => {

    // Obtención de vista a renderizar
    const { View } = useView(viewDataName);
    // Obtención de estado de carga asíncrona de la aplicación
    const { appLoading } = useAPI();
    // Obtención de los datos del formulario padre y función de recarga del contexto de formulario padre
    const { parent, reload, loaded } = useContext<RecordFormContextParams<M>>(RecordFormContext);

    // Obtención o cómputo de los datos de contexto para el formulario del modal
    const contextData = (
        typeof contextDataOrCallback === 'function'
            ? contextDataOrCallback(parent)
            : contextDataOrCallback
    );

    // Inicialización de estado de modal abierto
    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    // Inicialización de función de comando a actualizar
    const [ command, setCommand ] = useState<() => Promise<void>>(
        () => (async () => {})
    );

    // Función para ejecutar comando cuando el botón se presiona
    const execute = useCallback(
        async () => {
            // Ejecución asíncrona del comando
            await command();
            // Se cierra el modal
            setIsOpen(false);
            // Se recarga el formulario padre
            reload();
        }, [command, reload]
    );

    if ( loaded ) {
        return (
            <ViewDataContext.Provider value={{ viewDataName, recordId: 0, display: 'window' }}>
                <ContextDataContext.Provider value={{ contextData, setCommand }} >
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button className="cursor-pointer" variant={decoration}>{label}</Button>
                        </DialogTrigger>
                        <DialogContent className="w-[calc(85%)]" aria-describedby={undefined}>
                            <DialogTitle>Hola</DialogTitle>
                            <View.View />
                            <DialogFooter>
                                <Button variant="success" onClick={execute} className="w-48">
                                    {
                                        appLoading
                                            ? <Spinner />
                                            : 'Aceptar'
                                    }
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </ContextDataContext.Provider>
            </ViewDataContext.Provider>
        );
    };
};

interface ContextDataContextParams <M extends IACele.Data.ModelName>{
    contextData?: Partial<IACele.Data.ModelDefinition<M>>;
    setCommand: React.Dispatch<React.SetStateAction<() => Promise<void>>>;
};

const ContextDataContext = createContext<ContextDataContextParams<any>>({
    setCommand: () => {},
});
