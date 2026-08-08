import useViewData from "@/hooks/views/useViewData";
import EmptyRecordProvider from "../../providers/views/EmptyRecordProvider";
import RecordInViewProvider from "../../providers/views/RecordInViewProvider";
import EditableRecordProvider from "../../providers/views/EditableRecordProvider";
import Form from "@/views/form/Form";
import RecordFromDatabaseProvider from "../../providers/views/RecordFromDatabaseProvider";
import useDataView from "@/hooks/routes/useDataView";
import { useMemo } from "react";

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

const CreateOrUpdateMode = ({
    children,
}: IACeleV2.View.CreateOrUpdateModeParams) => {

    // Obtención la ID del registro
    const { recordId } = useDataView();

    // Inicialización de indicador booleano de modo de creación
    const createMode = useMemo(
        () => (recordId === 0), [recordId]
    );

    return (children({ createMode }));
};
