import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import VOID_CALLBACK from "@/constants/app/callbacks";
import LABEL from "@/constants/app/label";
import BUTTON from "@/constants/ui/button";
import ViewDataContext from "@/contexts/routes/viewDataContext";
import CreateOrUpdateRecordContext from "@/contexts/views/createOrUpdateRecordContext";
import FormExternalButtonsContext from "@/contexts/views/formExternalButtonsContext";
import type RelatedRecords from "@/core/relatedRecords";
import useAPI from "@/hooks/app/useAPI";
import ModelDataProvider from "@/providers/views/ModelDataProvider";
import { useCallback, useState } from "react";
import CreateRecordView from "./views/CreateRecordView";
import { Spinner } from "@/components/ui/spinner";

interface NewRelatedRecordParams <M extends IACele.Data.ModelName>{
    view: keyof IACele.View._Definition.ViewToModelName;
    relatedRecordsManager: RelatedRecords<M, IACele.Data.FieldName<M>>;
};

const NewMany2ManyRelatedRecord = <M extends IACele.Data.ModelName>({
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

export default NewMany2ManyRelatedRecord;
