import { createContext } from "react";

const EditableRecordContext = createContext<IACeleV2.Context.View.EditableRecord<any>>({
    editableRecord: {},
    undoChangesInEditableRecord: () => {},
    updateEditableRecordField: () => {},
    saveChanges: async () => {},
    existingChanges: false,
    executeAction: async () => {},
    createMode: true,
});

export default EditableRecordContext;
