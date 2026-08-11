import TTypeInterface from "./ttypeInterface";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Camera, Eye, EyeClosed, Pencil, Plus, X } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { useMemo, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import READONLY_PASSWORD_LABEL from "@/constants/views/readonlyPasswordLabel";
import { Switch } from "@/components/ui/switch";
import EMPTY_STRING from "@/constants/views/emptyString";

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

const FieldWidget = {

    'integer': {

        Default: <M extends IACeleV2.Data.ModelName>() => {
            // Inicialización de estados para edición
            const { value, setValue, isReadonly } = TTypeInterface.useInteger<M>();

            return (
                isReadonly
                    ? (
                        value
                    )
                    : (
                        <Input
                            type="text"
                            inputMode="numeric"
                            value={value}
                            onChange={setValue}
                        />
                    )
            );
        },

    },

    'char': {

        Default: <M extends IACeleV2.Data.ModelName>() => {
            // Inicialización de estados para edición
            const { value, setValue, isReadonly } = TTypeInterface.useChar<M>();

            return (
                isReadonly
                    ? (
                        value
                    )
                    : (
                        <Input
                            value={value}
                            onChange={setValue}
                        />
                    )
            );
        },

        Password: <M extends IACeleV2.Data.ModelName>() => {
            // Inicialización de estados para edición
            const { value, setValue, isReadonly } = TTypeInterface.useChar<M>();

            // Inicialización de estado de contraseña oculta
            const [ hidden, setHidden ] = useState<boolean>(true);

            return (
                isReadonly
                    ? READONLY_PASSWORD_LABEL
                    : (
                        <InputGroup>
                            <InputGroupInput
                                spellCheck={false}
                                onChange={setValue}
                                value={value}
                                // disabled={isReadonly}
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

        Badge: <M extends IACeleV2.Data.ModelName>() => {
            // Inicialización de estados para edición
            const { value, setValue, isReadonly } = TTypeInterface.useChar<M>();

            return (
                isReadonly
                    ? (
                        <Badge className="text-sm">
                            {value}
                        </Badge>
                    )
                    : (
                        <Input
                            value={value}
                            onChange={setValue}
                        />
                    )
            );
        },

    },

    'boolean': {

        Checkbox: <M extends IACeleV2.Data.ModelName>() => {
            // Inicialización de estados para edición
            const { value, setValue, isReadonly } = TTypeInterface.useBoolean<M>();

            return (
                <Checkbox
                    checked={value}
                    onCheckedChange={setValue}
                    disabled={isReadonly}
                />
            );
        },

        Switch: <M extends IACeleV2.Data.ModelName>() => {
            // Inicialización de estados para edición
            const { value, setValue, isReadonly } = TTypeInterface.useBoolean<M>();

            return (
                <Switch
                    checked={value}
                    onCheckedChange={setValue}
                    disabled={isReadonly}
                />
            );
        },

    },

    'float': {

        Default: <M extends IACeleV2.Data.ModelName>() => {
            // Inicialización de estados para edición
            const { value, setValue, isReadonly } = TTypeInterface.useFloat<M>();

            return (
                isReadonly
                    ? (
                        value
                    )
                    : (
                        <Input
                            type="text"
                            inputMode="numeric"
                            value={value}
                            onChange={setValue}
                        />
                    )
            );
        },

    },

    'date': {

        Default: <M extends IACeleV2.Data.ModelName>() => {
            // Inicialización de estados para edición
            const { value, setValue, isReadonly } = TTypeInterface.useDate<M>();

            return (
                isReadonly
                    ? (
                        value !== ''
                            ? (
                                format.date(value)
                            )
                            : EMPTY_STRING
                    )
                    : (
                        <Input
                            type="date"
                            value={value}
                            onChange={setValue}
                            step={1}
                        />
                    )
            );
        },

    },

    'datetime': {

        Default: <M extends IACeleV2.Data.ModelName>() => {
            // Inicialización de estados para edición
            const { value, setValue, isReadonly } = TTypeInterface.useDatetime<M>();

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
                        computedReadonlyValue
                    )
                    : (
                        <Input
                            type="datetime-local"
                            value={value}
                            onChange={setValue}
                            step={1}
                        />
                    )
            );
        },

    },

    'time': {

        Default: <M extends IACeleV2.Data.ModelName>() => {
            // Inicialización de estados para edición
            const { value, setValue, isReadonly } = TTypeInterface.useTime<M>();

            return (
                isReadonly
                    ? (
                        value !== ''
                            ? format.time(value)
                            : ''
                    )
                    : (
                        <Input
                            type="time"
                            value={value}
                            onChange={setValue}
                            step={1}
                        />
                    )
            );
        },

    },

    'duration': {

        Default: <M extends IACeleV2.Data.ModelName>() => {
            // Inicialización de estados para edición
            const { value, INDEX, setHours, setMinutes, setSeconds, deleteValue, isReadonly } = TTypeInterface.useDuration<M>();

            return (
                isReadonly
                    ? (
                        value[0] !== null
                            ? format.duration(value)
                            : ''
                    )
                    : (
                        <div className="flex flex-row gap-2">
                            <Input
                                type="number"
                                value={value[INDEX.HOURS] ?? ''}
                                onChange={(event) => (setHours(Number(event.target.value)))}
                            />
                            <Input
                                type="number"
                                value={value[INDEX.MINUTES] ?? ''}
                                onChange={(event) => (setMinutes(Number(event.target.value)))}
                            />
                            <Input
                                type="number"
                                value={value[INDEX.SECONDS] ?? ''}
                                onChange={(event) => (setSeconds(Number(event.target.value)))}
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

        Default: <M extends IACeleV2.Data.ModelName>() => {
            // Inicialización de estados para edición
            const { value, setValue, deleteValue, fieldMetadata, isReadonly } = TTypeInterface.useSelection<M>();

            return (
                isReadonly
                    ? (
                        value
                    )
                    : (
                        <div className="flex flex-row gap-2">
                            <Select onValueChange={setValue} value={value}>
                                <SelectTrigger className="w-full">
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
                    )
            );
        },

        Badge: <M extends IACeleV2.Data.ModelName>() => {
            // Inicialización de estados para edición
            const { value, setValue, deleteValue, fieldMetadata, isReadonly } = TTypeInterface.useSelection<M>();

            return (
                isReadonly
                    ? (
                        <Badge className="text-sm">
                            {value}
                        </Badge>
                    )
                    : (
                        <div className="flex flex-row gap-2">
                            <Select onValueChange={setValue} value={value}>
                                <SelectTrigger className="w-full">
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
                    )
            );
        }

    },

    'file': {

        ProfilePicture: <M extends IACeleV2.Data.ModelName>() => {
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
        }

    },

    'text': {

        Default: <M extends IACeleV2.Data.ModelName>() => {
            // Inicialización de estados y funciones para edición
            const { value, setValue, isReadonly } = TTypeInterface.useText<M>();

            return (
                isReadonly
                    ? (
                        value
                    )
                    : (
                        <Textarea
                            onChange={setValue}
                            value={value}
                        />
                    )
            );
        },

    },

    'many2one': {

        Default: <M extends IACeleV2.Data.ModelName>() => {
            // Inicialización de estados y funciones para edición
            const { value, displayName, setValue, isOpen, load, loading, options, deleteValue, isReadonly } = TTypeInterface.useMany2One<M>();

            return (
                isReadonly
                    ? (
                        <div className="justify-between w-full">
                            {displayName}
                        </div>
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

        O2MTags: <M extends IACeleV2.Data.ModelName>() => {
            // Inicialización de estado
            const { values } = TTypeInterface.useOne2Many<M>();

            return (
                <div className="flex flex-wrap gap-2 w-full">
                    {
                        values.map(
                            (record: IACeleV2.Data.RecordForView<any>) => (
                                <Badge key={record['id']}>
                                    {record['display_name']}
                                    <Button size='icon' className="size-4 cursor-pointer">
                                        <X className="size-3" />
                                    </Button>
                                </Badge>
                            )
                        )
                    }
                    <Button className="size-5 cursor-pointer" size='icon'>
                        <Plus />
                    </Button>
                </div>
            );
        },

    },

    'many2many': {

        M2MTags: <M extends IACeleV2.Data.ModelName>() => {
            // Inicialización de estado
            const { values } = TTypeInterface.useMany2Many<M>();

            return (
                <div className="flex flex-wrap gap-2 w-full">
                    {
                        values.map(
                            (record: IACeleV2.Data.RecordForView<any>) => (
                                <Badge key={record['id']}>
                                    {record['display_name']}
                                    <Button size='icon' className="size-4 cursor-pointer">
                                        <X className="size-3" />
                                    </Button>
                                </Badge>
                            )
                        )
                    }
                    <Button className="size-5 cursor-pointer" size='icon'>
                        <Plus />
                    </Button>
                </div>
            );
        },

    },

    'json': {

        Default: <M extends IACeleV2.Data.ModelName>() => {
            // Inicialización de estado
            const { value, setValue, isValidValue, validateAndUpdateValue, isReadonly } = TTypeInterface.useJSON<M>();

            return (
                !isReadonly
                    ? (
                        <div className="border w-full font-mono text-wrap">
                            {value}
                        </div>
                    )
                    : (
                        <Textarea className={`${!isValidValue ? 'text-danger' : ''} font-mono`}
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
