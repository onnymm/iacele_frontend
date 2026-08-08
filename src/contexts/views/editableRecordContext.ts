import { createContext } from "react";

const EditableRecordContext = createContext<IACeleV2.Context.ViewContext.EditableRecord<any>>({
    editableRecord: {},
    undoChangesInEditableRecord: () => {},
    updateEditableRecordField: () => {},
    saveChanges: async () => (true) as any,
    existingChanges: false,
    executeAction: async () => {},
    createMode: true,
});

export default EditableRecordContext;
