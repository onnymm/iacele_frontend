import useRecordEdition from "@/hooks/views/useRecordEdition";
import ScreenModeControls from "./ui/ScreenModeControls";
import { useContext, useEffect, type Context } from "react";
import RecordEditionContext from "@/contexts/views/recordEditionContext";
import useDataView from "@/hooks/routes/useDataView";
import FormExternalButtonsContext from "@/contexts/views/formExternalButtonsContext";

const RecordEditionRender = <M extends IACele.Data.ModelName> ({
    children,
}: IACele.Common.SupportsChildren) => {

    // Contexto tipado
    const ClosureRecordContext: Context<IACele.Context.ViewContext.RecordEdition<M>> = RecordEditionContext;
    // Obtención de modo de visualización del formulario
    const { display } = useDataView();
    // Obtención de función de cambio de estado desde el contexto
    const { setSaveChanges } = useContext(FormExternalButtonsContext);

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
        updateRecordInViewField,
        updateEditableRecordField,
        undoChangesSignal,
    } = useRecordEdition<M>();

    useEffect(
        () => {
            // Se establece la función como valor
            setSaveChanges(() => (saveChanges));
        }, [saveChanges, setSaveChanges]
    );

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
            updateRecordInViewField,
            updateEditableRecordField,
            undoChangesSignal,
        }}>
            {children}
            {display === 'screen' &&
                <ScreenModeControls />
            }
        </ClosureRecordContext.Provider>
    );
};

export default RecordEditionRender;
