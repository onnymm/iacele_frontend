import TTypeInterface from "./ttypeInterface";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Camera, Eye, EyeClosed, Pencil, Plus, X } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import READONLY_PASSWORD_LABEL from "@/constants/views/readonlyPasswordLabel";
import { Switch } from "@/components/ui/switch";
import EMPTY_STRING from "@/constants/views/emptyString";
import useAPI from "@/hooks/app/useAPI";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type RelatedRecords from "@/core/relatedRecords";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ViewDataContext from "@/contexts/routes/viewDataContext";
import VOID_CALLBACK from "@/constants/app/callbacks";
import RecordInViewProvider from "@/providers/views/RecordInViewProvider";
import ModelDataProvider from "@/providers/views/ModelDataProvider";
import EmptyRelatedRecordProvider from "@/providers/views/EmptyRelatedRecordProvider";
import EditableRecordProvider from "@/providers/views/EditableRecordProvider";
import CreateOrUpdateRecordContext from "@/contexts/views/createOrUpdateRecordContext";
import useViewData from "@/hooks/views/useViewData";
import Form from "./form/Form";
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import FormExternalButtonsContext from "@/contexts/views/formExternalButtonsContext";
import LABEL from "@/constants/app/label";
import BUTTON from "@/constants/ui/button";

const twoDigits = (value: number): string => (
    value < 10
        ? `0${value}`
        : String(value)
);

const format = {

    date: (value: string) => (
        value
        .split('-')
        .reverse()
        .join('/')
    ),

    time: (value: string) => {
        const [ hours, minutes, seconds ] = value.split(':');
        let numericHours = Number(hours);
        const m = (
            numericHours < 12
                ? 'a.m.'
                : 'p.m.'
        );
        numericHours = (
            numericHours < 12
                ? numericHours
                : numericHours - 12
        );
        const stringHours = (
            numericHours < 10
                ? `0${numericHours}`
                : String(numericHours)
        );
        const formatedValue = `${stringHours}:${minutes}:${seconds} ${m}`;

        return formatedValue;
    },

    duration: (value: [number, number, number]) => {
        const [ hours, minutes, seconds ] = value.map(twoDigits);
        const formatedValue = `${hours}:${minutes}:${seconds}`;

        return formatedValue;
    },

} as const;

interface TextLabelParams extends IACele.Common.SupportsChildren {
    decoration: IACele.UI.Variant;
};

const TextLabel = ({
    children,
    decoration,
}: TextLabelParams) => {

    return (
        <span className={`text-${decoration} group-[.iacele-item]:h-6 h-8 flex flex-row items-center text-sm`}>
            {children}
        </span>
    );
};

const BadgeLabel = ({
    children,
    decoration,
}: TextLabelParams) => {

    return (
        <div className="flex flex-row items-center h-8 group-[.iacele-item]:h-6">
            <Badge className={`bg-${decoration} text-sm`}>
                {children}
            </Badge>
        </div>
    );
};

interface BadgeTagParams <M extends IACele.Data.ModelName>{
    decorationColor: IACele.UI.Variant;
    isReadonly: boolean;
    record: IACele.Data.RecordForView<M>;
    removeItem: () => (void);
};

const BadgeTag = <M extends IACele.Data.ModelName>({
    decorationColor,
    isReadonly,
    record,
    removeItem,
}: BadgeTagParams<M>) => {

    // Obtención de la ID del registro
    const recordId = useMemo(
        () =>(record['id'] as number), [record]
    );
    // Obtención del nombre a mostrar
    const displayName = useMemo(
        () =>((
            record['display_name']
                ?? record['name']
                        ?? `nuevo (${recordId})`
        ) as string), [record, recordId]
    );

    return (
        <Tooltip delayDuration={500}>
            <TooltipTrigger asChild>
                <Badge key={recordId} className={`${recordId > 0 ? `bg-${decorationColor}` : 'bg-default'} text-sm h-8 rounded-full max-w-40 md:h-5`}>
                    <span className="overflow-hidden text-ellipsis text-nowrap">
                        {displayName}
                    </span>
                    {!isReadonly &&
                        <Button size='icon' className="size-4 cursor-pointer" onClick={removeItem}>
                            <X className="size-3" />
                        </Button>
                    }
                </Badge>
            </TooltipTrigger>
            <TooltipContent  className="bg-background/10 backdrop-blur-xs">{displayName}</TooltipContent>
        </Tooltip>
    );
};



const BadgeAdd = <M extends IACele.Data.ModelWithRelatedFields, F extends IACele.Data.ArrayFieldName<M>>({
    searchText,
    searchCriteria,
    updateSearchCriteria,
    relatedModelName,
    relatedRecordsManager,
    view,
}: IACele.View.UI.X2MTags.Badge.Add<M, F>) => {

    // Inicialización de estado de popover abierto
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    // Obtención de instancia de conexión a la API y estado de carga de la aplicación
    const { api, appLoading } = useAPI();
    // Inicialización de estado de registros
    const [ records, setRecords ] = useState<IACele.Data.RecordForView<'__'>[]>([]);
    // Inicialización de función de búsqueda y lectura de registros desde la API
    const searchRead = useCallback(
        async () => {
            // Si el popover está abierto...
            if ( isOpen ) {
                // Obtención de los registros desde la API
                const recordsFromAPI = await api.searchRead({
                    'model_name': relatedModelName,
                    'search_criteria': searchCriteria as any,
                    'fields': ['display_name'],
                    'limit': 10,
                });
                // Se establece el valor en el estado de registros
                setRecords(recordsFromAPI);
            };
        }, [api, isOpen, relatedModelName, searchCriteria]
    );

    // Ejecución de búsqueda y lectura de registros cada vez que el criterio de búsqueda se actualiza
    useEffect(
        () => {
            searchRead();
        }, [searchRead, searchCriteria]
    );

    // Reseteo de valor de búsqueda y valor de registros cuando el popover se cierra
    useEffect(
        () => {
            if ( !isOpen ) {
                setRecords([]);
                updateSearchCriteria('');
            };
        }, [isOpen, updateSearchCriteria]
    );


    // Inicialización de función para añadir registro de la búsqueda
    const add = useCallback(
        (record: IACele.Data.RecordForView<any>) => {
            // Se añade el registro
            relatedRecordsManager.doAdd(record);
            // Se cierra el selector
            setIsOpen(false);
        }, [relatedRecordsManager]
    );

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button className="rounded-full size-8 md:size-5 cursor-pointer" size='icon'>
                    <Plus />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="gap-2 p-2 max-h-64">
                <Input value={searchText} onChange={(e) => updateSearchCriteria(e.target.value)} />
                {
                    !appLoading
                        ? (
                            <div className="flex flex-col bg-input/50 shadow-sm rounded-xl size-full overflow-y-scroll scrollbar-hide">
                                {
                                    records.map(
                                        (record) => (
                                            <div
                                                key={record['id']}
                                                className="flex flex-row items-center hover:bg-primary/50 p-2 rounded-xl w-full min-w-0 h-8 transition-colors duration-300 cursor-pointer shrink-0"
                                                onClick={() => {add(record)}}
                                            >
                                                <div className="min-w-0 overflow-hidden text-ellipsis">{record['display_name']}</div>
                                            </div>
                                        )
                                    )
                                }
                            </div>
                        )
                        : (
                            <div className="flex flex-row justify-center items-center p-4">
                                <Spinner className="opacity-75 size-6" />
                            </div>
                        )
                }
                <NewRelatedRecord relatedRecordsManager={relatedRecordsManager} view={view} />
            </PopoverContent>
        </Popover>
    );
};

interface NewRelatedRecordParams <M extends IACele.Data.ModelName>{
    view: keyof IACele.View._Definition.ViewToModelName;
    relatedRecordsManager: RelatedRecords<M, IACele.Data.FieldName<M>>;
};

const NewRelatedRecord = <M extends IACele.Data.ModelName>({
    view,
    relatedRecordsManager,
}: NewRelatedRecordParams<M>) => {

    // Obtención del estado de carga de la aplicación
    const { appLoading } = useAPI();
    // Inicialización de estado de modal abierto
    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    // Función de ekecución tras creación del registro
    const onCreate = useCallback(
        () => {
            // Se cierra el modal
            setIsOpen(false);
        }, []
    );

    // Inicialización de función para poner en cola de registros referenciados al registro que se crea
    const prepareRecordToCreate = useCallback(
        async ({ editableRecord, recordInView }: IACele.View.Callback.CreateOrUpdateRecord<M>) => {
            // Se envían los registros en vista y en edición al administrador de registros relacionados
            relatedRecordsManager.doCreate(recordInView, editableRecord);
            // Se cierra el modal de creación de registro
            setIsOpen(false);

            return (true as const);
        }, [relatedRecordsManager]
    );

    // Inicialización de estado de función para ejecutar en el botón de aceptar
    const [ executeAccept, setExecuteAccept ] = useState<(() => (Promise<number | true>)) | null>(null);

    return (
        <ViewDataContext.Provider value={{
            viewDataName: view,
            recordId: 0,
            display: 'window',
            onCreate,
            onUpdate: VOID_CALLBACK.SYNC,
        }}>
            <ModelDataProvider>
                <CreateOrUpdateRecordContext.Provider value={{
                    createOrUpdate: prepareRecordToCreate ,
                }}>

                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button variant='primary' className="cursor-pointer">{BUTTON.NEW_RECORD}</Button>
                        </DialogTrigger>
                        <DialogContent className="w-[calc(85%)]" aria-describedby={undefined}>

                            <DialogTitle>{LABEL.TITLE.NEW_RECORD}</DialogTitle>

                            <FormExternalButtonsContext.Provider value={{ setSaveChanges: setExecuteAccept }}>
                                <CreateRecordView />
                            </FormExternalButtonsContext.Provider>

                            <DialogFooter>
                                {executeAccept !== null &&
                                    <Button variant='success' onClick={executeAccept} className="w-48 cursor-pointer">
                                        {
                                            appLoading
                                                ? <Spinner />
                                                : LABEL.ACTION.ACCEPT
                                        }
                                    </Button>
                                }
                            </DialogFooter>

                        </DialogContent>

                    </Dialog>

                </CreateOrUpdateRecordContext.Provider>
            </ModelDataProvider>
        </ViewDataContext.Provider>
    );
};

const CreateRecordView = <M extends IACele.Data.ModelName>() => {

    // Obtención de la declaración de la vista
    const { View } = useViewData<M, 'form'>();

    return (
        <EmptyRelatedRecordProvider>
            <RecordInViewProvider>
            <EditableRecordProvider>
                {View(Form)}
            </EditableRecordProvider>
            </RecordInViewProvider>
        </EmptyRelatedRecordProvider>
    );
};


interface EditableSelectionParams <M extends IACele.Data.ModelName>{
    value: string;
    setValue: (inputValue: string | null) => void;
    deleteValue: () => void;
    fieldMetadata: IACele.Data.FieldsMetadata<M>[IACele.Data.FieldName<M>];
    decorationColor: IACele.UI.Variant;
};

const EditableSelection = <M extends IACele.Data.ModelName>({
    value,
    setValue,
    deleteValue,
    fieldMetadata,
    decorationColor,
}: EditableSelectionParams<M>) => {

    return (
        <div className="flex flex-row gap-2">
            <Select onValueChange={setValue} value={value}>
                <SelectTrigger className={`w-full text-${decorationColor}`}>
                    <SelectValue className="bg-green-500" placeholder="Selecciona un valor" />
                </SelectTrigger>
                <SelectContent>
                    {
                        fieldMetadata['selection_ids'].map(
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
            <Button size='icon' variant='secondary' onClick={deleteValue}>
                <X className="stroke-foreground" />
            </Button>
        </div>
    );
};

const FieldWidget = {

    'integer': {

        Default: <M extends IACele.Data.ModelName>() => {
            // Inicialización de estados para edición
            const { value, setValue, isReadonly, decorationColor } = TTypeInterface.useInteger<M>();

            return (
                isReadonly
                    ? (
                        <TextLabel decoration={decorationColor}>
                            {value}
                        </TextLabel>
                    )
                    : (
                        <Input
                            type="text"
                            inputMode="numeric"
                            value={value}
                            onChange={setValue}
                            className={`text-${decorationColor}`}
                        />
                    )
            );
        },

    },

    'char': {

        Default: <M extends IACele.Data.ModelName>() => {
            // Inicialización de estados para edición
            const { value, setValue, isReadonly, decorationColor } = TTypeInterface.useChar<M>();

            return (
                isReadonly
                    ? (
                        <TextLabel decoration={decorationColor}>
                            {value}
                        </TextLabel>
                    )
                    : (
                        <Input
                            value={value}
                            onChange={setValue}
                            className={`text-${decorationColor}`}
                        />
                    )
            );
        },

        Password: <M extends IACele.Data.ModelName>() => {
            // Inicialización de estados para edición
            const { value, setValue, isReadonly, decorationColor } = TTypeInterface.useChar<M>();

            // Inicialización de estado de contraseña oculta
            const [ hidden, setHidden ] = useState<boolean>(true);

            return (
                isReadonly
                    ? (
                        <TextLabel decoration={decorationColor}>
                            {READONLY_PASSWORD_LABEL}
                        </TextLabel>
                    )
                    : (
                        <InputGroup>
                            <InputGroupInput
                                spellCheck={false}
                                onChange={setValue}
                                value={value}
                                className={`text-${decorationColor}`}
                                disabled={isReadonly}
                                type={
                                    hidden
                                        ? "password"
                                        : 'text'
                                }
                            />
                            <InputGroupAddon align='inline-end'>
                                {
                                    <Button
                                        type="button"
                                        className="group/eye bg-transparent focus-visible:border-transparent focus-visible:ring-transparent cursor-pointer buttonn"
                                        variant="link"
                                        size="icon"
                                        onMouseDown={(e) => {e.preventDefault()}}
                                        onClick={() => setHidden( (prev) => (!prev) )}
                                        tabIndex={-1}
                                    >
                                        {
                                            hidden
                                                ? <EyeClosed className={`stroke-muted-foreground group-hover/eye:stroke-primary group-focus-visible:stroke-primary`} />
                                                : <Eye className={`stroke-muted-foreground group-hover/eye:stroke-primary group-focus-visible:stroke-primary`} />
                                        }
                                    </Button>
                                }
                            </InputGroupAddon>
                        </InputGroup>
                    )
            );
        },

        Badge: <M extends IACele.Data.ModelName>() => {
            // Inicialización de estados para edición
            const { value, setValue, isReadonly, decorationColor } = TTypeInterface.useChar<M>();

            return (
                isReadonly
                    ? (
                        <BadgeLabel decoration={decorationColor}>
                            {value}
                        </BadgeLabel>
                    )
                    : (
                        <Input
                            value={value}
                            onChange={setValue}
                            className={`text-${decorationColor}`}
                        />
                    )
            );
        },

    },

    'boolean': {

        Checkbox: <M extends IACele.Data.ModelName>() => {
            // Inicialización de estados para edición
            const { value, setValue, isReadonly, decorationColor } = TTypeInterface.useBoolean<M>();

            return (
                <Checkbox
                    checked={value}
                    onCheckedChange={setValue}
                    disabled={isReadonly}
                    className={`data-checked:bg-${decorationColor} dark:data-checked:bg-${decorationColor} data-checked:border-${decorationColor}`}
                />
            );
        },

        Switch: <M extends IACele.Data.ModelName>() => {
            // Inicialización de estados para edición
            const { value, setValue, isReadonly, decorationColor } = TTypeInterface.useBoolean<M>();

            return (
                <Switch
                    checked={value}
                    onCheckedChange={setValue}
                    disabled={isReadonly}
                    className={`data-checked:bg-${decorationColor} dark:data-checked:bg-${decorationColor} data-checked:border-${decorationColor}`}
                />
            );
        },

    },

    'float': {

        Default: <M extends IACele.Data.ModelName>() => {
            // Inicialización de estados para edición
            const { value, setValue, isReadonly, decorationColor } = TTypeInterface.useFloat<M>();

            return (
                isReadonly
                    ? (
                        <TextLabel decoration={decorationColor}>
                            {value}
                        </TextLabel>
                    )
                    : (
                        <Input
                            type="text"
                            inputMode="numeric"
                            value={value}
                            onChange={setValue}
                            className={`text-${decorationColor}`}
                        />
                    )
            );
        },

    },

    'date': {

        Default: <M extends IACele.Data.ModelName>() => {
            // Inicialización de estados para edición
            const { value, setValue, isReadonly, decorationColor } = TTypeInterface.useDate<M>();

            return (
                isReadonly
                    ? (
                        <TextLabel decoration={decorationColor}>
                            {
                                value !== ''
                                    ? (
                                        format.date(value)
                                    )
                                    : EMPTY_STRING
                            }
                        </TextLabel>
                    )
                    : (
                        <Input
                            type="date"
                            value={value}
                            onChange={setValue}
                            step={1}
                            className={`text-${decorationColor}`}
                        />
                    )
            );
        },

    },

    'datetime': {

        Default: <M extends IACele.Data.ModelName>() => {
            // Inicialización de estados para edición
            const { value, setValue, isReadonly, decorationColor } = TTypeInterface.useDatetime<M>();

            // Cómputo de valor de fecha y hora
            const computedReadonlyValue = useMemo(
                () => {
                    // Si el valor es una cadena vacía se retorna ésta
                    if ( value === '' ) return EMPTY_STRING;
                    // Separación de fecha y de hora
                    const [ d, t ] = (
                        value
                        .replace(' ', 'T')
                        .split('T')
                    );
                    // Formateo de valores
                    const computedValue = `${format.date(d)} ${format.time(t)}`;

                    return computedValue;
                }, [value]
            );

            return (
                isReadonly
                    ? (
                        <TextLabel decoration={decorationColor}>
                            {computedReadonlyValue}
                        </TextLabel>
                    )
                    : (
                        <Input
                            type="datetime-local"
                            value={value}
                            onChange={setValue}
                            step={1}
                            className={`text-${decorationColor}`}
                        />
                    )
            );
        },

    },

    'time': {

        Default: <M extends IACele.Data.ModelName>() => {
            // Inicialización de estados para edición
            const { value, setValue, isReadonly, decorationColor } = TTypeInterface.useTime<M>();

            return (
                isReadonly
                    ? (
                        <TextLabel decoration={decorationColor}>
                            {
                                value !== ''
                                    ? format.time(value)
                                    : ''
                            }
                        </TextLabel>
                    )
                    : (
                        <Input
                            type="time"
                            value={value}
                            onChange={setValue}
                            step={1}
                            className={`text-${decorationColor}`}
                        />
                    )
            );
        },

    },

    'duration': {

        Default: <M extends IACele.Data.ModelName>() => {
            // Inicialización de estados para edición
            const { value, INDEX, setHours, setMinutes, setSeconds, deleteValue, isReadonly, decorationColor } = TTypeInterface.useDuration<M>();

            return (
                isReadonly
                    ? (
                        <TextLabel decoration={decorationColor}>
                            {
                                value[0] !== null
                                    ? format.duration(value)
                                    : ''
                            }
                        </TextLabel>
                    )
                    : (
                        <div className="flex flex-row gap-2">
                            <Input
                                type="number"
                                value={value[INDEX.HOURS] ?? ''}
                                onChange={(event) => (setHours(Number(event.target.value)))}
                                className={`text-${decorationColor}`}
                            />
                            <Input
                                type="number"
                                value={value[INDEX.MINUTES] ?? ''}
                                onChange={(event) => (setMinutes(Number(event.target.value)))}
                                className={`text-${decorationColor}`}
                            />
                            <Input
                                type="number"
                                value={value[INDEX.SECONDS] ?? ''}
                                onChange={(event) => (setSeconds(Number(event.target.value)))}
                                className={`text-${decorationColor}`}
                            />
                            <Button size='icon' variant='secondary' onClick={deleteValue}>
                                <X className="stroke-foreground" />
                            </Button>
                        </div>
                    )
            )
        },

    },

    'selection': {

        Default: <M extends IACele.Data.ModelName>() => {
            // Inicialización de estados para edición
            const { value, setValue, deleteValue, fieldMetadata, isReadonly, decorationColor } = TTypeInterface.useSelection<M>();

            return (
                isReadonly
                    ? (
                        <TextLabel decoration={decorationColor}>
                            {value}
                        </TextLabel>
                    )
                    : (
                        <EditableSelection
                            value={value}
                            setValue={setValue}
                            deleteValue={deleteValue}
                            fieldMetadata={fieldMetadata}
                            decorationColor={decorationColor}
                        />
                    )
            );
        },

        Badge: <M extends IACele.Data.ModelName>() => {
            // Inicialización de estados para edición
            const { value, setValue, deleteValue, fieldMetadata, isReadonly, decorationColor } = TTypeInterface.useSelection<M>();

            return (
                isReadonly
                    ? (
                        <BadgeLabel decoration={decorationColor}>
                            {value}
                        </BadgeLabel>
                    )
                    : (
                        <EditableSelection
                            value={value}
                            setValue={setValue}
                            deleteValue={deleteValue}
                            fieldMetadata={fieldMetadata}
                            decorationColor={decorationColor}
                        />
                    )
            );
        },

    },

    'file': {

        ProfilePicture: <M extends IACele.Data.ModelName>() => {
            // Inicialización de estados y funciones para edición
            const { value, setValue, isReadonly } = TTypeInterface.useFile<M>();

            return (
                <div className="flex justify-center md:justify-end w-full">
                    <div className="relative size-72 md:size-36">
                        {value === 'null' &&
                            <div className="absolute flex justify-center items-center bg-background rounded-full size-full">
                                <Camera className="stroke-foreground/30 size-16" />
                            </div>
                        }
                        {value !== 'null' &&
                            <>
                                <img className="absolute rounded-full size-full" src={`data:image/jpeg;base64,${value}`} alt="" />
                                {!isReadonly &&
                                    <div role="button" className="right-0 absolute flex justify-center items-center bg-danger rounded-full size-[min(60px,25%)] cursor-pointer" onClick={() => {setValue(null)}}>
                                        <X className="size-[50%]" />
                                    </div>
                                }
                            </>
                        }
                        {!isReadonly &&
                            <label htmlFor="file-input" className="right-0 bottom-0 absolute size-[min(60px,25%)]">
                                <div className="flex justify-center items-center bg-primary rounded-full size-full cursor-pointer">
                                    <Pencil className="size-[50%]" />
                                </div>
                            </label>
                        }

                    </div>
                    <Input type="file" onChange={(e) => setValue(e.target.files)} id="file-input" accept=".jpg, .jpeg" className="hidden" />
                </div>
            );
        },

        Avatar: <M extends IACele.Data.ModelName>() => {
            // Inicialización de estados y funciones para edición
            const { value } = TTypeInterface.useFile<M>();

            return (
                <div className="flex justify-center md:justify-end w-full">
                    <div className="relative size-8">
                        {value === 'null' &&
                            <div className="absolute flex justify-center items-center bg-primary rounded-full size-full">
                                <Camera className="stroke-foreground size-[62.5%]" />
                            </div>
                        }
                        {value !== 'null' &&
                            <img className="absolute rounded-full size-full" src={`data:image/jpeg;base64,${value}`} alt="" />
                        }
                    </div>
                </div>
            );
        },

    },

    'text': {

        Default: <M extends IACele.Data.ModelName>() => {
            // Inicialización de estados y funciones para edición
            const { value, setValue, isReadonly, decorationColor } = TTypeInterface.useText<M>();

            return (
                isReadonly
                    ? (
                        <TextLabel decoration={decorationColor}>
                            {value}
                        </TextLabel>
                    )
                    : (
                        <Textarea
                            onChange={setValue}
                            value={value}
                            className={`text-${decorationColor}`}
                        />
                    )
            );
        },

    },

    'many2one': {

        Default: <M extends IACele.Data.ModelName>() => {
            // Inicialización de estados y funciones para edición
            const { value, displayName, setValue, isOpen, load, loading, options, deleteValue, isReadonly, decorationColor } = TTypeInterface.useMany2One<M>();

            return (
                isReadonly
                    ? (
                        <TextLabel decoration={decorationColor}>
                            {displayName}
                        </TextLabel>
                        
                    )
                    : (
                        <div className="flex flex-row gap-2">
                            <Select onOpenChange={load} open={isOpen} value={value} onValueChange={setValue}>
                                <SelectTrigger className="w-full">
                                    {
                                        loading
                                            ? <Spinner />
                                            : <SelectValue placeholder="Selecciona un valor" />
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
                            <Button size='icon' variant='secondary' onClick={deleteValue}>
                                <X className="stroke-foreground" />
                            </Button>
                        </div>
                    )
            );
        },

    },

    'one2many': {

        O2MTags: <M extends IACele.Data.ModelWithRelatedFields, F extends IACele.Data.ArrayFieldName<M>>() => {

            // Inicialización de estado
            const { values, isReadonly, decorationColor, relatedRecordsManager, relatedModelName, searchCriteria, updateSearchCriteria, searchText, view } = TTypeInterface.useOne2Many<M, F>();

            return (
                <div className="flex flex-wrap gap-2 w-full min-h-8 group-[.iacele-item]:min-h-6">
                    {
                        values.map(
                            (record: IACele.Data.RecordForView<any>) => (
                                <BadgeTag
                                    key={record['id']}
                                    decorationColor={decorationColor}
                                    isReadonly={isReadonly}
                                    record={record}
                                    removeItem={() => relatedRecordsManager.remove(record['id'])}
                                />
                            )
                        )
                    }
                    {!isReadonly &&
                        <BadgeAdd
                            searchText={searchText}
                            searchCriteria={searchCriteria}
                            updateSearchCriteria={updateSearchCriteria}
                            relatedModelName={relatedModelName}
                            relatedRecordsManager={relatedRecordsManager}
                            view={view as never}
                        />
                    }
                </div>
            );
        },

    },

    'many2many': {

        M2MTags: <M extends IACele.Data.ModelWithRelatedFields, F extends IACele.Data.ArrayFieldName<M>>() => {

            // Inicialización de estado
            const { values, isReadonly, decorationColor, relatedRecordsManager, relatedModelName, searchCriteria, updateSearchCriteria, searchText, view } = TTypeInterface.useMany2Many<M, F>();

            return (
                <div className="flex flex-wrap gap-2 w-full min-h-8 group-[.iacele-item]:min-h-6">
                    {
                        values.map(
                            (record: IACele.Data.RecordForView<any>) => (
                                <BadgeTag
                                    key={record['id']}
                                    decorationColor={decorationColor}
                                    isReadonly={isReadonly}
                                    record={record}
                                    removeItem={() => relatedRecordsManager.remove(record['id'])}
                                />
                            )
                        )
                    }
                    {!isReadonly &&
                        <BadgeAdd
                            searchText={searchText}
                            searchCriteria={searchCriteria}
                            updateSearchCriteria={updateSearchCriteria}
                            relatedModelName={relatedModelName}
                            relatedRecordsManager={relatedRecordsManager}
                            view={view as never}
                        />
                    }
                </div>
            );
        },

    },

    'json': {

        Default: <M extends IACele.Data.ModelName>() => {
            // Inicialización de estado
            const { value, setValue, isValidValue, validateAndUpdateValue, isReadonly, decorationColor } = TTypeInterface.useJSON<M>();

            return (
                isReadonly
                    ? (
                        <div className={`text-${decorationColor} w-full font-mono text-wrap overflow-clip`}>
                            {value}
                        </div>
                    )
                    : (
                        <Textarea className={`${!isValidValue ? 'border-danger' : ''} text-${decorationColor} font-mono`}
                            spellCheck={false}
                            value={value}
                            onChange={(e) => {setValue(e.target.value)}}
                            onBlur={validateAndUpdateValue}
                        />
                    )
            );

        },

    },

} as const;

const FieldComponent = {

    'integer': {
        'default': FieldWidget['integer'].Default,
    },

    'char': {
        'default': FieldWidget['char'].Default,
        'password': FieldWidget['char'].Password,
        'badge': FieldWidget['char'].Badge,
    },

    'boolean': {
        'default': FieldWidget['boolean'].Checkbox,
        'checkbox': FieldWidget['boolean'].Checkbox,
        'switch': FieldWidget['boolean'].Switch,
    },

    'float': {
        'default': FieldWidget['float'].Default,
    },

    'date': {
        'default': FieldWidget['date'].Default,
    },

    'datetime': {
        'default': FieldWidget['datetime'].Default,
    },

    'time': {
        'default': FieldWidget['time'].Default,
    },

    'duration': {
        'default': FieldWidget['duration'].Default,
    },

    'selection': {
        'default': FieldWidget['selection'].Default,
        'badge': FieldWidget['selection'].Badge,
    },

    'text': {
        'default': FieldWidget['text'].Default,
    },

    'file': {
        'default': FieldWidget['file'].ProfilePicture,
        'picture': FieldWidget['file'].ProfilePicture,
        'avatar': FieldWidget['file'].Avatar,
    },

    'many2one': {
        'default': FieldWidget['many2one'].Default,
    },

    'one2many': {
        'default': FieldWidget['one2many'].O2MTags,
        'o2m_tags': FieldWidget['one2many'].O2MTags,
    },

    'many2many': {
        'default': FieldWidget['many2many'].M2MTags,
        'm2m_tags': FieldWidget['many2many'].M2MTags,
    },

    'json': {
        'default': FieldWidget['json'].Default,
    },

} as const;

export default FieldComponent;
