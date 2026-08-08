import useRecordEdition from "@/hooks/views/useRecordEdition";
import ScreenModeControls from "./ui/ScreenModeControls";
import type { Context } from "react";
import RecordEditionContext from "@/contexts/views/recordEditionContext";

const RecordEditionRender = <M extends IACeleV2.Data.ModelName> ({
    children,
}: IACele.Common.SupportsChildren) => {

    // Contexto tipado
    const ClosureRecordContext: Context<IACeleV2.Context.View.RecordEdition<M>> = RecordEditionContext;

    // Obtención de valores desde el hook
    const {
        recordId,
        recordInView,
        existingChanges,
        undoChanges,
        updateRecordField,
        saveChanges,
        deleteRecord,
        reload,
        executeAction,
        evaluator,
        createMode,
        newRecord,
        undoNewRecord,
    } = useRecordEdition<M>();

    return (
        <ClosureRecordContext.Provider value={{
            recordId,
            recordInView,
            existingChanges,
            undoChanges,
            updateRecordField,
            saveChanges: saveChanges as () => (any),
            deleteRecord,
            executeAction,
            reload,
            evaluator,
            createMode,
            newRecord,
            undoNewRecord,
        }}>
            {children}
            <ScreenModeControls />
        </ClosureRecordContext.Provider>
    );
};

export default RecordEditionRender;
