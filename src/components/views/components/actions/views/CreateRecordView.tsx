import useViewData from "@/hooks/views/useViewData";
import EditableRecordProvider from "@/providers/views/EditableRecordProvider";
import EmptyRelatedRecordProvider from "@/providers/views/EmptyRelatedRecordProvider";
import RecordInViewProvider from "@/providers/views/RecordInViewProvider";
import Form from "@/views/form/Form";

const CreateRecordView = <M extends IACele.Data.ModelName>() => {

    // Obtención de la declaración de la vista
    const { View } = useViewData<M, 'form'>();

    return (
        <EmptyRelatedRecordProvider>
            <RecordInViewProvider>
            <EditableRecordProvider>
                {View(Form)}
            </EditableRecordProvider>
            </RecordInViewProvider>
        </EmptyRelatedRecordProvider>
    );
};

export default CreateRecordView;
