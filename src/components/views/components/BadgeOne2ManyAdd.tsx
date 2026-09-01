import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCallback, useState } from "react";
import ViewDataContext from "@/contexts/routes/viewDataContext";
import VOID_CALLBACK from "@/constants/app/callbacks";
import CreateOrUpdateRecordContext from "@/contexts/views/createOrUpdateRecordContext";
import ModelDataProvider from "@/providers/views/ModelDataProvider";
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import LABEL from "@/constants/app/label";
import FormExternalButtonsContext from "@/contexts/views/formExternalButtonsContext";
import CreateRecordView from "./actions/views/CreateRecordView";
import useAPI from "@/hooks/app/useAPI";
import { Spinner } from "@/components/ui/spinner";

const BadgeOne2manyAdd = <M extends IACele.Data.ModelWithRelatedFields, F extends IACele.Data.ArrayFieldName<M>>({
    relatedRecordsManager,
    view,
}: IACele.View.UI.X2MTags.Badge.One2ManyAdd<M, F>) => {

    // Obtención del estado de carga de la aplicación
    const { appLoading } = useAPI();

    // Inicialización de estado de popover abierto
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
                            <Button className="rounded-full size-8 md:size-5 cursor-pointer" size='icon'>
                                <Plus />
                            </Button>
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
    )

    // return (
    //     <Popover open={isOpen} onOpenChange={setIsOpen}>
    //         <PopoverTrigger asChild>
    //             <Button className="rounded-full size-8 md:size-5 cursor-pointer" size='icon'>
    //                 <Plus />
    //             </Button>
    //         </PopoverTrigger>
    //         <PopoverContent className="gap-2 p-2 max-h-64">

    //             <ViewDataContext.Provider value={{
    //                 viewDataName: view,
    //                 recordId: 0,
    //                 display: 'window',
    //                 onCreate,
    //                 onUpdate: VOID_CALLBACK.SYNC,
    //             }}>
    //                 <CreateOrUpdateRecordContext.Provider value={{
    //                     createOrUpdate: prepareRecordToCreate ,
    //                 }}>

                        

    //                 </CreateOrUpdateRecordContext.Provider>
    //             </ViewDataContext.Provider>

    //             {/* <NewMany2ManyRelatedRecord relatedRecordsManager={relatedRecordsManager} view={view} /> */}
    //         </PopoverContent>
    //     </Popover>
    // );
};

export default BadgeOne2manyAdd;
