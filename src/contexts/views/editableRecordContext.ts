import VOID_CALLBACK from "@/constants/app/callbacks";
import { createContext } from "react";

const EditableRecordContext = createContext<IACele.Context.ViewContext.EditableRecord<any>>({
    editableRecord: {},
    undoChangesInEditableRecord: VOID_CALLBACK.SYNC,
    updateEditableRecordField: VOID_CALLBACK.SYNC,
    saveChanges: async () => (true) as any,
    existingChanges: false,
    executeAction: VOID_CALLBACK.ASYNC,
    createMode: true,
});

export default EditableRecordContext;
