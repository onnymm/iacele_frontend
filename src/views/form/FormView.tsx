import useViewData from "@/hooks/views/useViewData";
import EmptyRecordProvider from "../../providers/views/EmptyRecordProvider";
import RecordInViewProvider from "../../providers/views/RecordInViewProvider";
import EditableRecordProvider from "../../providers/views/EditableRecordProvider";
import Form from "@/views/form/Form";
import RecordFromDatabaseProvider from "../../providers/views/RecordFromDatabaseProvider";
import useDataView from "@/hooks/routes/useDataView";
import { useMemo, type Context } from "react";
import useCreateOrUpdateRecord from "@/hooks/views/useCreateOrUpdateRecord";
import CreateOrUpdateRecordContext from "@/contexts/views/createOrUpdateRecordContext";

const FormView = () => {

    // Obtención de la declaración de la vista
    const { View } = useViewData();

    return (
        <CreateOrUpdateMode>
            {({ createMode }) => (
                createMode

                    ? (
                        <EmptyRecordProvider>
                            <RecordInViewProvider>
                            <EditableRecordProvider>
                                {View(Form)}
                            </EditableRecordProvider>
                            </RecordInViewProvider>
                        </EmptyRecordProvider>
                    )

                    : (
                        <RecordFromDatabaseProvider>
                            <RecordInViewProvider>
                            <EditableRecordProvider>
                                {View(Form)}
                            </EditableRecordProvider>
                            </RecordInViewProvider>
                        </RecordFromDatabaseProvider>
                    )
            )}
        </CreateOrUpdateMode>
    );
};

export default FormView;

const CreateOrUpdateMode = <M extends IACele.Data.ModelName>({
    children,
}: IACele.View.CreateOrUpdateModeParams) => {

    // Tipado de contexto con genérico
    const ClosureCreateOrUpdateRecordContext: Context<IACele.Context.ViewContext.CreateOrUpdateRecordCallback<M>> = CreateOrUpdateRecordContext

    // Obtención la ID del registro
    const { recordId } = useDataView();

    // Inicialización de indicador booleano de modo de creación
    const createMode = useMemo(
        () => (recordId === 0), [recordId]
    );

    // Inicialización de función para crear y modificar registro
    const { createOrUpdateRecord } = useCreateOrUpdateRecord<M>();

    return (
        <ClosureCreateOrUpdateRecordContext.Provider value={{ createOrUpdate: createOrUpdateRecord }}>
            {children({ createMode })}
        </ClosureCreateOrUpdateRecordContext.Provider>
    );
};
