import { createContext } from "react";

const EditableRecordContext = createContext<IACele.Context.ViewContext.EditableRecord<any>>({
    editableRecord: {},
    undoChangesInEditableRecord: () => {},
    updateEditableRecordField: () => {},
    saveChanges: async () => (true) as any,
    existingChanges: false,
    executeAction: async () => {},
    createMode: true,
});

export default EditableRecordContext;
