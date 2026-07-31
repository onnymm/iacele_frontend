import EditableRecordContext from "@/contexts/views/editableRecordContext";
import useEditableRecord from "@/hooks/views/useEditableRecord";

const EditableRecordProvider = <M extends IACeleV2.Data.ModelName>({
    children,
}: IACele.Common.SupportsChildren) => {

    // Obtención del registro editable y funciones para modificarlo y actualizarlo
    const { editableRecord, existingChanges, undoChangesInEditableRecord, updateEditableRecordField, updateRecord } = useEditableRecord<M>();

    return (
        <EditableRecordContext.Provider value={{
            editableRecord,
            existingChanges,
            undoChangesInEditableRecord,
            updateEditableRecordField: updateEditableRecordField as (() => {}),
            updateRecord,
        }}>
            {children}
        </EditableRecordContext.Provider>
    );
};

export default EditableRecordProvider;
