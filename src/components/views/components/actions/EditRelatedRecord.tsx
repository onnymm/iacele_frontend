import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import VOID_CALLBACK from "@/constants/app/callbacks";
import LABEL from "@/constants/app/label";
import ViewDataContext from "@/contexts/routes/viewDataContext";
import CreateOrUpdateRecordContext from "@/contexts/views/createOrUpdateRecordContext";
import FormExternalButtonsContext from "@/contexts/views/formExternalButtonsContext";
import useAPI from "@/hooks/app/useAPI";
import ModelDataProvider from "@/providers/views/ModelDataProvider";
import { SquarePen } from "lucide-react";
import { useCallback, useState } from "react";
import EditRecordView from "./views/EditRecordView";
import { Spinner } from "@/components/ui/spinner";
import type RelatedRecords from "@/core/relatedRecords";

interface EditRelatedRecordParams <M extends IACele.Data.ModelName> {
    view: keyof IACele.View._Definition.ViewToModelName;
    relatedRecordsManager: RelatedRecords<M, IACele.Data.FieldName<M>>;
    recordId: number;
};

const EditRelatedRecord = <M extends IACele.Data.ModelName>({
    view,
    relatedRecordsManager,
    recordId,
}: EditRelatedRecordParams<M>) => {

    // Obtención del estado de carga de la aplicación
    const { appLoading } = useAPI();

    // Inicialización de estado de modal abierto
    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    // Inicialización de función para poner en cola de registros referenciados al registro que se crea
    const prepareRecordToCreate = useCallback(
        async ({ editableRecord, recordInView }: IACele.View.Callback.CreateOrUpdateRecord<M>) => {
            // Se envían los registros en vista y en edición al administrador de registros relacionados
            relatedRecordsManager.doUpdate(recordInView, editableRecord);
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
            recordId: recordId,
            display: 'window',
            onCreate: VOID_CALLBACK.SYNC,
            onUpdate: VOID_CALLBACK.SYNC,
        }}>
            <ModelDataProvider>
                <CreateOrUpdateRecordContext.Provider value={{
                    createOrUpdate: prepareRecordToCreate ,
                }}>

                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button size='icon' className="hidden group-hover/iacele-badge:block size-4 cursor-pointer">
                                <SquarePen className="size-3" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="w-[calc(85%)] max-h-[calc(85%)]" aria-describedby={undefined}>

                            <DialogTitle>{LABEL.TITLE.EDIT_RECORD}</DialogTitle>

                            <div className="w-full max-h-[calc(50svh)] overflow-y-scroll">
                                <FormExternalButtonsContext.Provider value={{ setSaveChanges: setExecuteAccept }}>
                                    <EditRecordView />
                                </FormExternalButtonsContext.Provider>
                            </div>

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

export default EditRelatedRecord;
