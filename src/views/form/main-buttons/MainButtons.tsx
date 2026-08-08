import { Button } from "@/components/ui/button";
import BUTTON from "@/constants/ui/button";
import useRecordEditionParams from "@/hooks/views/useRecordEditionParams";
import { Save, Undo2 } from "lucide-react";
import { useCallback } from "react";

const MainButtons = {

    NewRecord: <M extends IACeleV2.Data.ModelName>() => {

        // Obtención de función para crear registro y modo de visualización
        const { newRecord, createMode } = useRecordEditionParams<M>();

        // Si el modo no es creación...
        if ( !createMode ) {
            return (
                <Button onClick={newRecord} variant='primary' className="cursor-pointer">
                    {BUTTON.NEW_RECORD}
                </Button>
            );
        };
    },

    Save: <M extends IACeleV2.Data.ModelName>() => {

        // Obtención de estado de cambios existentes y función para guardar cambios
        const { existingChanges, saveChanges } = useRecordEditionParams<M>();

        // Si hay cambios existentes...
        if ( existingChanges ) {
            return (
                <Button onClick={saveChanges} variant='success' size='icon' className="cursor-pointer">
                    <Save className="stroke-white" />
                </Button>
            );
        };
    },

    UndoChanges: <M extends IACeleV2.Data.ModelName>() => {

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
                <Button onClick={undo} variant='default' size='icon' className="cursor-pointer">
                    <Undo2 className="stroke-white" />
                </Button>
            );
        };
    },

} as const;

export default MainButtons;
