import useViewData from "@/hooks/views/useViewData";
import EditableRecordProvider from "@/providers/views/EditableRecordProvider";
import RecordFromDatabaseProvider from "@/providers/views/RecordFromDatabaseProvider";
import RecordInViewProvider from "@/providers/views/RecordInViewProvider";
import Form from "@/views/form/Form";

const EditRecordView = <M extends IACele.Data.ModelName>() => {

    // Obtención de la declaración de la vista
    const { View } = useViewData<M, 'form'>();

    return (
        <RecordFromDatabaseProvider>
            <RecordInViewProvider>
            <EditableRecordProvider>
                {View(Form)}
            </EditableRecordProvider>
            </RecordInViewProvider>
        </RecordFromDatabaseProvider>
    );
};

export default EditRecordView;
