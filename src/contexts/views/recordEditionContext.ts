import { createContext } from "react";

const RecordEditionContext = createContext<IACeleV2.Context.View.RecordEdition__<any>>({
    recordId: 0,
    recordInView: {},
    existingChanges: false,
    undoChanges: () => {},
    updateRecordField: () => {},
    saveChanges: async () => {},
    deleteRecord: async () => {},
    executeAction: async () => {},
    reload: () => {},
    evaluator: null as any,
});

export default RecordEditionContext;
