import { useContext } from "react";
import EditableRecordContext from "@/contexts/views/editableRecordContext";

const useEditableRecord = <M extends IACele.Data.ModelName>() => {

    // Obtención de valores y funciones desde el contexto
    const { editableRecord, existingChanges, undoChangesInEditableRecord, updateEditableRecordField, saveChanges, executeAction, createMode } = useContext<IACele.Context.ViewContext.EditableRecord<M>>(EditableRecordContext);

    return { editableRecord, existingChanges, undoChangesInEditableRecord, updateEditableRecordField, saveChanges, executeAction, createMode };
};

export default useEditableRecord;
