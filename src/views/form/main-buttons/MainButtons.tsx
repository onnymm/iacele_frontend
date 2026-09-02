import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import LABEL from "@/constants/app/label";
import BUTTON from "@/constants/ui/button";
import IndividualRecordViewContext from "@/contexts/views/individualRecordViewContext";
import useAPI from "@/hooks/app/useAPI";
import useRecordEditionParams from "@/hooks/views/useRecordEditionParams";
import { EllipsisVertical, Plus, Save, Trash, Undo2 } from "lucide-react";
import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router";

const MainButtons = {

    NewRecord: <M extends IACele.Data.ModelName>() => {

        // Obtención de función para crear registro y modo de visualización
        const { newRecord, createMode } = useRecordEditionParams<M>();

        // Si el modo no es creación...
        if ( !createMode ) {
            return (
                <Button onClick={newRecord} variant='primary' className="px-4 h-10 md:h-8 cursor-pointer">
                    {BUTTON.NEW_RECORD}
                    <Plus className="size-5" />
                </Button>
            );
        };
    },

    Save: <M extends IACele.Data.ModelName>() => {

        // Obtención de estado de cambios existentes y función para guardar cambios
        const { existingChanges, saveChanges } = useRecordEditionParams<M>();

        // Si hay cambios existentes...
        if ( existingChanges ) {
            return (
                <Button onClick={saveChanges} variant='success' size='icon' className="size-10 md:size-8 cursor-pointer">
                    <Save className="stroke-white" />
                </Button>
            );
        };
    },

    UndoChanges: <M extends IACele.Data.ModelName>() => {

        // Obtención de indicador de cambios existentes y función para deshacer cambios
        const { existingChanges, undoChanges, createMode, undoNewRecord } = useRecordEditionParams<M>();

        // Función para deshacer
        const undo = useCallback(
            () => {

                // Si el modo de edición es creación...
                if ( createMode ) {
                    undoNewRecord();
                // Si el modo de edición no es creación...
                } else {
                    undoChanges();
                };
            }, [createMode, undoChanges, undoNewRecord]
        );

        // Si hay cambios existentes...
        if ( existingChanges || createMode ) {
            return (
                <Button onClick={undo} variant='default' size='icon' className="size-10 md:size-8 cursor-pointer">
                    <Undo2 className="stroke-white" />
                </Button>
            );
        };
    },

    Ellipsis: <M extends IACele.Data.ModelName>() => {

        // Obtención de función de navegación
        const navigateTo = useNavigate();
        // Obtención de estado de carga de la app
        const { appLoading } = useAPI();
        // Obtención de función para crear registro y modo de visualización
        const { deleteRecord, createMode } = useRecordEditionParams<M>();
        // Obtención de parámetro desde el contexto
        const { canDelete } = useContext(IndividualRecordViewContext);
        // Inicialización de estado de modal abierto
        const [ isOpen, setIsOpen ] = useState<boolean>(false);

        // Inicialización de función de ejecución de eliminación de registro
        const executeDeleteRecord = useCallback(
            async () => {
                // Ejecución de la eliminación del registro
                await deleteRecord();
                // Se cierra el modal
                setIsOpen(false);
                // Se retrocede una página porque ya no hay más que mostrar
                navigateTo(-1);
            }, [deleteRecord, navigateTo]
        );

        // Si no hay nada para mostrar en el botón...
        if ( !(canDelete && !createMode) ) return (null);

        return (
            <>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="outline-none">
                        <Button size='icon' className="outline-none focus-visible:ring-0 size-10 md:size-8 cursor-pointer">
                            <EllipsisVertical className="stroke-foreground size-5 md:size-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="py-2 min-w-48">

                        {/* Botón para eliminar registro */}
                        {canDelete && !createMode &&
                            <DropdownMenuItem variant="danger" className="h-10 md:h-8" onClick={() => setIsOpen(true)}>
                                <Trash />
                                {LABEL.ACTION.DELETE}
                            </DropdownMenuItem>
                        }

                    </DropdownMenuContent>
                </DropdownMenu>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent className="w-[calc(min(85%,36rem))]" aria-describedby={undefined}>
                        <DialogTitle>{LABEL.TITLE.DELETE_RECORD}</DialogTitle>
                        {LABEL.MESSAGE.DELETE_RECORD_CONFIRM}
                        <DialogFooter>
                            <Button className="focus-visible:ring-0 text-foreground cursor-pointer" onClick={() => setIsOpen(false)}>
                                {LABEL.ACTION.CANCEL}
                            </Button>
                            <Button className="focus-visible:ring-0 cursor-pointer" onClick={executeDeleteRecord} variant="danger">
                                {
                                    appLoading
                                        ? <Spinner />
                                        : LABEL.ACTION.DELETE
                                }
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </>
        );
    },

} as const;

export default MainButtons;
