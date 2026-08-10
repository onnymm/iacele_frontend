import EMPTY_STRING from "@/constants/views/emptyString";
import useAPI from "@/hooks/app/useAPI";
import useBase64 from "@/hooks/ui/useBase64";
import useFieldParams from "@/hooks/views/useFieldParams";
import useRecordEditionParams from "@/hooks/views/useRecordEditionParams";
import { useCallback, useEffect, useMemo, useState } from "react";

const TTypeInterface = {

    useInteger: <M extends IACeleV2.Data.ModelName>() => {

        // Obtención del registro en vista y función para modificación de valor de campo
        const { recordInView, updateRecordField } = useRecordEditionParams<M>();
        // Obtención de parámetros del campo
        const { params, isReadonly } = useFieldParams<M>();
        // Obtención del valor actual del registro
        const value = (recordInView[params.name] as IACeleV2.Data.TType.Integer['view']) ?? EMPTY_STRING;

        // Función de procesamiento del valor
        const processValue = useCallback(
            (value: string): IACeleV2.Data.TType.Integer['view'] => (
                value === EMPTY_STRING
                    ? null
                    : Number(value.replace(/\D/, ''))
            ), []
        );

        // Función para establecer el valor
        const setValue = useCallback(
            (event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
                // Parseo de valor
                const value = processValue(event.target.value);
                // Actualización de valor en el registro
                updateRecordField(params.name, value as any);
            }, [params.name, processValue, updateRecordField]
        );

        return { value, setValue, isReadonly };
    },

    useChar: <M extends IACeleV2.Data.ModelName>() => {

        // Obtención del registro en vista y función para modificación de valor
        const { recordInView, updateRecordField } = useRecordEditionParams<M>();
        // Obtención de parámetros del campo
        const { params, isReadonly } = useFieldParams<M>();
        // Obtención del valor actual del registro
        const value = (recordInView[params.name] as IACeleV2.Data.TType.Char['view']) ?? EMPTY_STRING;

        // Función de procesamiento del valor
        const processValue = useCallback(
            (value: string): IACeleV2.Data.TType.Char['view'] => (
                value === EMPTY_STRING
                    ? null
                    : value
            ), []
        );

        // Función para establecer el valor
        const setValue = useCallback(
            (event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
                // Parseo del valor
                const value = processValue(event.target.value);
                // Actualización de valor en el registro
                updateRecordField(params.name, value as any);
            }, [params.name, processValue, updateRecordField]
        );

        return { value, setValue, isReadonly };
    },

    useText: <M extends IACeleV2.Data.ModelName>() => {

        // Obtención del registro en vista y función para modificación de valor
        const { recordInView, updateRecordField } = useRecordEditionParams<M>();
        // Obtención de parámetros del campo
        const { params, isReadonly } = useFieldParams<M>();
        // Obtención del valor actual del registro
        const value = (recordInView[params.name] as IACeleV2.Data.TType.Text['view']) ?? EMPTY_STRING;

        // Función de procesamiento del valor
        const processValue = useCallback(
            (inputValue: string): IACeleV2.Data.TType.Text['view'] => (
                inputValue === EMPTY_STRING
                    ? null
                    : inputValue
            ), []
        );

        // Función para establecer el valor
        const setValue = useCallback(
            (event: React.ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>) => {
                // Parseo del valor
                const value = processValue(event.target.value);
                // Actualización de valor en el registro
                updateRecordField(params.name, value as any);
            }, [params.name, processValue, updateRecordField]
        );

        return { value, setValue, isReadonly };
    },

    useBoolean: <M extends IACeleV2.Data.ModelName>() => {

        // Obtención del registro en vista y función para modificación de valor
        const { recordInView, updateRecordField } = useRecordEditionParams<M>();
        // Obtención de parámetros del campo
        const { params, isReadonly } = useFieldParams<M>();
        // Obtención del valor actual del registro
        const value = (recordInView[params.name] as IACeleV2.Data.TType.Boolean['view']) ?? false;

        // Función de procesamiento del valor
        const process = useCallback(
            (value: boolean | 'indeterminate' | null) => (
                value === null
                    ? false
                    : value === 'indeterminate'
                        ? false
                        : value
            ), []
        );

        // Función para establecer el valor
        const setValue = useCallback(
            (value: boolean | 'indeterminate' | null) => {
                // Parseo del valor
                value = process(value);
                // Actualización de valor en el registro
                updateRecordField(params.name, value as any);
            }, [params.name, process, updateRecordField]
        );

        return { value, setValue, isReadonly };
    },

    useFloat: <M extends IACeleV2.Data.ModelName>() => {

        // Obtención del registro en vista y función para modificación de valor de campo
        const { recordInView, updateRecordField } = useRecordEditionParams<M>();
        // Obtención de parámetros de campo
        const { params, isReadonly } = useFieldParams<M>();
        // Obtención del valor actual del registro
        const value = (recordInView[params.name] as IACeleV2.Data.TType.Float['view']) ?? EMPTY_STRING;

        // Inicialización de estado de valor de campo
        const [ inputValue, setInputValue ] = useState<number | string>(value);

        // Efecto para actualizar el valor del campo cuando el valor del formulario cambia
        useEffect(
            () => {
                setInputValue(value);
            }, [value]
        );

        // Función de procesamiento de valor
        const processValue = useCallback(
            (value: string) => (
                value === EMPTY_STRING
                    ? null
                    : value.replace(/[^0-9.]/g, '')
            ), []
        );

        // Función para establecer el valor
        const setValue = useCallback(
            (event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
                // Obtención de valor procesado
                const cleanValue = processValue(event.target.value);
                // Indicador de valor válido para convertirse a número
                const isValidForNumberParsing = (
                    cleanValue === null
                    || !( /^\d*\.&/.test(cleanValue) )
                );

                // Si el valor es válido
                if ( isValidForNumberParsing ) {
                    // Actualización de valor en el registro
                    updateRecordField(params.name, cleanValue as any);

                // Si el valor no es válido
                } else {
                    // Actualización de valor de entrada
                    setInputValue(cleanValue)
                };
            }, [params.name, processValue, updateRecordField]
        );

        return { value: inputValue, setValue, isReadonly };
    },

    useDate: <M extends IACeleV2.Data.ModelName>() => {

        // Obtención del registro en vista y función para modificación de valor
        const { recordInView, updateRecordField } = useRecordEditionParams<M>();
        // Obtención de parámetros del campo
        const { params, isReadonly } = useFieldParams<M>();
        // Obtención del valor actual del registro
        const value = (recordInView[params.name] as IACeleV2.Data.TType.Char['view']) ?? EMPTY_STRING;

        // Función de procesamiento del valor
        const processValue = useCallback(
            (value: string) => (value), []
        );

        // Función para establecer el valor
        const setValue = useCallback(
            (event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
                // Parseo del valor
                const value = processValue(event.target.value);
                // Actualización de valor en el registro
                updateRecordField(params.name, value as any);
            }, [params.name, processValue, updateRecordField]
        );

        return { value, setValue, isReadonly };
    },

    useDatetime: <M extends IACeleV2.Data.ModelName>() => {

        // Obtención del registro en vista y función para modificación de valor
        const { recordInView, updateRecordField } = useRecordEditionParams<M>();
        // Obtención de parámetros del campo
        const { params, isReadonly } = useFieldParams<M>();
        // Obtención del valor actual del registro
        const value = (recordInView[params.name] as IACeleV2.Data.TType.Datetime['view']) ?? EMPTY_STRING;

        // Función de procesamiento del valor
        const processValue = useCallback(
            (value: string) => (
                value === EMPTY_STRING
                    ? null
                    : (
                        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(value)
                            ? `${value}:00`
                            : value
                    )
            ), []
        );

        // Función para establecer el valor
        const setValue = useCallback(
            (event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
                // Parseo del valor
                const value = processValue(event.target.value);
                // Actualización de valor en el registro
                updateRecordField(params.name, value as any);
            }, [params.name, processValue, updateRecordField]
        );

        return { value, setValue, isReadonly };
    },

    useTime: <M extends IACeleV2.Data.ModelName>() => {

        // Obtención del registro en vista y función para modificación de valor
        const { recordInView, updateRecordField } = useRecordEditionParams<M>();
        // Obtención de parámetros del campo
        const { params, isReadonly } = useFieldParams<M>();
        // Obtención del valor actual del registro
        const value = (recordInView[params.name] as IACeleV2.Data.TType.Time['view']) ?? EMPTY_STRING;

        // Función de procesamiento del valor
        const processValue = useCallback(
            (value: string) => (value), []
        );

        // Función para establecer el valor
        const setValue = useCallback(
            (event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
                // Parseo del valor
                const value = processValue(event.target.value);
                // Actualización de valor en el registro
                updateRecordField(params.name, value as any);
            }, [params.name, processValue, updateRecordField]
        );

        return { value, setValue, isReadonly };
    },

    useDuration: <M extends IACeleV2.Data.ModelName>() => {

        // Obtención del registro en vista y función para modificación de valor
        const { recordInView, updateRecordField } = useRecordEditionParams<M>();
        // Obtención de parámetros del campo
        const { params, isReadonly } = useFieldParams<M>();

        // Obtención del valor actual del registro
        const value = recordInView[params.name] as IACeleV2.Data.TType.Duration['view'];

        // Mapeo de índices
        const INDEX = useMemo(
            () => ({
                HOURS: 0,
                MINUTES: 1,
                SECONDS: 2,
            } as const), []
        );

        // Declaración de valor nulo para el valor visible en componente
        const NULL_VALUE = useMemo(
            () => ([null, null, null] as [null, null, null]), []
        );

        // Función para parsear valor entrante como nulo o cadena de texto en tupla de nulos o números
        const toTuple = useCallback(
            (formValue: string | null | undefined): IACeleV2.View.DurationType => {
                // Si el valor es nulo o indefinido se retorna la forma nula
                if ( formValue === null || formValue === undefined ) return (NULL_VALUE);

                return (
                    formValue
                    .split(':')
                    .map(
                        (v) => (Number(v))
                    ) as IACeleV2.View.DurationType
                );
            }, [NULL_VALUE]
        );

        // Inicialización de estado del valor como array
        const [ arrayValue, setArrayValue ] = useState<IACeleV2.View.DurationType>(toTuple(value));

        // Efecto para actualizar el valor del array cada vez que el valor del formulario cambia
        useEffect(
            () => {
                setArrayValue(toTuple(value));
            }, [toTuple, value]
        );

        // Función para convertir el valor de tuplas en cadena de texto
        const toString = useCallback(
            (arr: IACeleV2.View.DurationType) => (
                arr[INDEX.HOURS] === null
                    ? null
                    : (arr as [number, number, number]).map(
                        (v) => (
                            v <= 9
                                ? `0${v}`
                                : v
                        )
                    )
            ), [INDEX.HOURS]
        );

        // Función para cambiar el valor de horas, minutos osegundos del valor como array
        const setValue = useCallback(
            (value: number, index: 0 | 1 | 2) => {
                // Actualización del valor en array
                setArrayValue(
                    ( prev ) => (
                        prev.map(
                            // Se recorre cada uno de los elementos
                            ( v, i ) => {
                                // Si el índice actual es el índice provisto...
                                if ( (i as 0 | 1 | 2) === index ) {
                                    // Se usa el valor provisto como el nuevo elemento
                                    return value;
                                // Manejo con el resto de valores: La tupla debe ser toda de números en el caso de esta función
                                } else {
                                    // En cambio de valor, el resto de valores tienen que convertirse en ceros si son nulos
                                    if ( v === null ) {
                                        return 0;
                                    // Si el valor ya no era nulo, se mantiene igual
                                    } else {
                                        return v;
                                    };
                                };
                            }
                        ) as IACeleV2.View.DurationType
                    )
                );
                // Actualización del valor en el registro en edición
                updateRecordField(params.name, toString(arrayValue) as any);
            }, [arrayValue, params.name, toString, updateRecordField]
        );

        // Función para borrar el valor
        const deleteValue = useCallback(
            () => {
                setArrayValue([null, null, null]);
            }, []
        );

        // Función para establecer valor de horas
        const setHours = useCallback(
            (value: number) => {
                setValue(value, INDEX.HOURS);
            }, [INDEX.HOURS, setValue]
        );

        // Función para establecer valor de minutos
        const setMinutes = useCallback(
            (value: number) => {
                setValue(value, INDEX.MINUTES);
            }, [INDEX.MINUTES, setValue]
        );

        // Función para establecer valor de segundos
        const setSeconds = useCallback(
            (value: number) => {
                setValue(value, INDEX.SECONDS);
            }, [INDEX.SECONDS, setValue]
        );

        return {
            value: arrayValue,
            INDEX,
            setValue,
            setHours,
            setMinutes,
            setSeconds,
            deleteValue,
            isReadonly,
        };
    },

    useFile: <M extends IACeleV2.Data.ModelName>() => {

        // Obtención del registro en vista y función para modificación de valor
        const { recordInView, updateRecordField } = useRecordEditionParams<M>();
        // Obtención de parámetros del campo
        const { params, isReadonly } = useFieldParams<M>();
        // Obtención del valor actual del registro
        const value = (recordInView[params.name] as IACeleV2.Data.TType.File['view'] ?? 'null');

        // Obtención de función para convertir a base64
        const { convertToBase64 } = useBase64();

        // Función para establecer el valor
        const setValue = useCallback(
            async (file: FileList | null) => {
                // Si no existe un valor de archivo...
                if ( file === null ) {
                    // Se actualiza el valor a nulo
                    updateRecordField(params.name, null as any);
                // Si existe un valor de archivo...
                } else {
                    // Obtención del valor codificado
                    const encodedValue = await convertToBase64(file[0]);
                    // Se remueve la parte inicial
                    const value = encodedValue.replace('data:image/jpeg;base64,', '');
                    // Se actualiza el valor con el valor del archivo
                    updateRecordField(params.name, value as any);
                };
            }, [convertToBase64, params.name, updateRecordField]
        );

        return { value, setValue, isReadonly };
    },

    useSelection: <M extends IACeleV2.Data.ModelName>() => {

        // Obtención del registro en vista y función para modificación de valor
        const { recordInView, updateRecordField } = useRecordEditionParams<M>();
        // Obtención de los metadatos del campo
        const { fieldMetadata } = useFieldParams<M>();
        // Obtención de parámetros del campo
        const { params, isReadonly } = useFieldParams<M>();
        // Obtención del valor actual del registro
        const value = (recordInView[params.name] as IACeleV2.Data.TType.Selection<string>['view']) ?? EMPTY_STRING;

        // Función para establecer el valor
        const processValue = useCallback(
            (value: string | null) => (
                value === EMPTY_STRING
                    ? null
                    : value
            ), []
        );

        // Función para establecer el valor
        const setValue = useCallback(
            (inputValue: string | null) => {
                // Parseo del valor
                const value = processValue(inputValue);
                // Actualización de valor en el registro
                updateRecordField(params.name, value as any);
            }, [params.name, processValue, updateRecordField]
        );

        // Función para borrar el valor
        const deleteValue = useCallback(
            () => {
                setValue(null);
            }, [setValue]
        );

        return { value, setValue, deleteValue, fieldMetadata, isReadonly };
    },

    useMany2One: <M extends IACeleV2.Data.ModelName>() => {

        // Obtención del registro en vista y función para modificación de valor
        const { recordInView, updateRecordField } = useRecordEditionParams<M>();
        // Obtención de parámetros del campo
        const { params, fieldMetadata, isReadonly } = useFieldParams<M>();
        // Obtención del valor actual del registro
        const rawValue = recordInView[params.name] as IACeleV2.Data.TType.Many2One['view'];
        // Valor actualizado
        const value = useMemo(
            () => (
                rawValue === null
                    ? EMPTY_STRING
                    : String(rawValue[0])
            ), [rawValue]
        );
        // Valor actualizado
        const displayName = useMemo(
            () => (
                rawValue === null
                    ? EMPTY_STRING
                    : rawValue[1]
            ), [rawValue]
        );

        // Función para cambiar el formato del valor
        const reshape = useCallback(
            (inputValue: IACeleV2.Data.TType.Many2One['view']) => {
                // Si el valor del formulario es nulo, se retorna una lista vacía
                if ( inputValue === null ) return ([]);
                // Extracción de ID y nombre de registro referenciado
                const [ id, displayName ] = inputValue;
                // Inicialización de lista de opciones donde se muestra el registro para que se procese correctamente
                const recordInOptions: IACeleV2.View.Many2OneOption[] = [
                    {
                        'id': id,
                        'display_name': displayName,
                    },
                ];

                return recordInOptions;
            }, []
        );

        // Obtención de instancia de API
        const { api } = useAPI();
        // Inicialización de estado de carga
        const [ loading, setLoading ] = useState<boolean>(false);
        // Inicialización de lista desplegada
        const [ isOpen, setIsOpen ] = useState<boolean>(false);

        // Función para obterner registros y usarlos como opciones seleccionables en el componente
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
                const records = await api.searchReadV2({
                    'model_name': fieldMetadata['related_model'],
                });
                // Se establecen los registros en las opciones
                setOptions(records);
                // Se termina el estado de carga
                setLoading(false);
                // Se despliega la lista
                setIsOpen(true);
            }, [isOpen, api, fieldMetadata]
        );

        // Inicialización de estado de opciones a seleccionar
        const [ options, setOptions ] = useState<IACeleV2.View.Many2OneOption[]>(
            () => (reshape(rawValue))
        );

        // Función para procesar el valor
        const process = useCallback(
            (value: string) => (
                value === EMPTY_STRING
                    ? null
                    : Number(value)
            ), []
        );

        // Función para establecer el valor
        const setValue = useCallback(
            (recordId: string) => {
                // Procesamiento del valor
                const value = process(recordId);
                let many2oneValue: IACeleV2.Data.TType.Many2One['view'];
                // Si el valor a asignar es nulo
                if ( value === null ) {
                    // Construcción del valor en formato tupla many2one
                    many2oneValue = value;
                    // Actualización del valor
                    updateRecordField(params.name, value as any);
                } else {

                    // Búsqueda del registro dentro de las opciones
                    const foundItem = options.find( (option) => (option['id'] === value) ) as IACeleV2.View.Many2OneOption;
                    // Construcción del valor en formato tupla many2one
                    many2oneValue = [foundItem['id'], foundItem['display_name']];
                };
                // Actualización del valor
                updateRecordField(params.name, many2oneValue as any)
            }, [options, params.name, process, updateRecordField]
        );

        // Función para borrar el valor
        const deleteValue = useCallback(
            () => {
                setValue(EMPTY_STRING);
            }, [setValue]
        );

        return { value, displayName, setValue, isOpen, load, loading, options, deleteValue, isReadonly };
    },

    useOne2Many: <M extends IACeleV2.Data.ModelName>() => {

        // Obtención del registro en vista y función para modificación de valor
        const { recordInView } = useRecordEditionParams<M>();
        // Obtención de parámetros del campo
        const { params } = useFieldParams<M>();
        // Obtención del valor actual del registro
        const values = recordInView[params.name] as IACeleV2.Data.TType.One2Many['view'];

        return { values };
    },

    useMany2Many: <M extends IACeleV2.Data.ModelName>() => {

        // Obtención del registro en vista y función para modificación de valor
        const { recordInView } = useRecordEditionParams<M>();
        // Obtención de parámetros del campo
        const { params } = useFieldParams<M>();
        // Obtención del valor actual del registro
        const values = recordInView[params.name] as IACeleV2.Data.TType.Many2Many['view'];

        return { values };
    },

    useJSON: <M extends IACeleV2.Data.ModelName>() => {

        // Obtención del registro en vista y función para modificación de valor
        const { recordInView, updateRecordField } = useRecordEditionParams<M>();
        // Obtención de parámetros del campo
        const { params, isReadonly } = useFieldParams<M>();
        // Obtención del valor actual del registro
        const value = JSON.stringify(recordInView[params.name] as IACeleV2.Data.TType.JSON['view']);

        // Inicialización de estado de valor correcto
        const [ isValidValue, setIsValidValue ] = useState<boolean>(true);
        // Inicialización de valor de edición
        const [ editionValue, setEditionValue ] = useState<string>(value);

        // Función para validar y actualizar el valor
        const validateAndUpdateValue = useCallback(
            () => {
                // Se intenta actualizar el valor
                try {
                    // Parseo del valor de string a JSON
                    const jsonValue: IACeleV2.Data.TType.JSON['view'] = JSON.parse(editionValue);
                    // Actualización del valor en el registro
                    updateRecordField(params.name, jsonValue as any);
                    // Se establece el valor como válido
                    setIsValidValue(true);
                } catch {
                    setIsValidValue(false);
                };
            }, [editionValue, params.name, updateRecordField]
        );

        // Efecto para actualizar el valor de edición cuando el valor del registro cambia
        useEffect(
            () => {
                setEditionValue(value);
            }, [value]
        );

        return { value: editionValue, setValue: setEditionValue, isValidValue, validateAndUpdateValue, isReadonly };
    },

    useFile3: <M extends IACeleV2.Data.ModelName>() => {

        // Obtención del registro en vista y función para modificación de valor
        const { recordInView, updateRecordField } = useRecordEditionParams<M>();
        // Obtención de parámetros del campo
        const { params, isReadonly } = useFieldParams<M>();
        // Obtención del valor actual del registro
        const value = (recordInView[params.name] as IACeleV2.Data.TType.File['view'] ?? 'null');

        // Obtención de función para convertir a base64
        const { convertToBase64 } = useBase64();

        // Función para establecer el valor
        const setValue = useCallback(
            async (file: FileList | null) => {
                // Si no existe un valor de archivo...
                if ( file === null ) {
                    // Se actualiza el valor a nulo
                    updateRecordField(params.name, null as any);
                // Si existe un valor de archivo...
                } else {
                    // Obtención del valor codificado
                    const encodedValue = await convertToBase64(file[0]);
                    // Se remueve la parte inicial
                    const value = encodedValue.replace('data:image/jpeg;base64,', '');
                    // Se actualiza el valor con el valor del archivo
                    updateRecordField(params.name, value as any);
                };
            }, [convertToBase64, params.name, updateRecordField]
        );

        return { value, setValue, isReadonly };
    },

};

export default TTypeInterface;
