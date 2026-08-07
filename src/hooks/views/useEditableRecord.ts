import { useContext } from "react";
import EditableRecordContext from "@/contexts/views/editableRecordContext";

const useEditableRecord = <M extends IACeleV2.Data.ModelName>() => {

    // Obtención de valores y funciones desde el contexto
    const { editableRecord, existingChanges, undoChangesInEditableRecord, updateEditableRecordField, saveChanges, executeAction } = useContext<IACeleV2.Context.View.EditableRecord<M>>(EditableRecordContext);

    return { editableRecord, existingChanges, undoChangesInEditableRecord, updateEditableRecordField, saveChanges, executeAction };
};

export default useEditableRecord;
