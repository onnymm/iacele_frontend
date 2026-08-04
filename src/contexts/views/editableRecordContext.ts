import { createContext } from "react";

const EditableRecordContext = createContext<IACeleV2.Context.View.EditableRecord<any>>({
    editableRecord: {},
    undoChangesInEditableRecord: () => {},
    updateEditableRecordField: () => {},
    updateRecord: async () => {},
    existingChanges: false,
    executeAction: async () => {},
});

export default EditableRecordContext;
