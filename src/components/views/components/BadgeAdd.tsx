import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";
import useAPI from "@/hooks/app/useAPI";
import { Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import NewRelatedRecord from "./actions/NewRelatedRercord";

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

export default BadgeAdd;
