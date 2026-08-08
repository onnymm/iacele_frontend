import { createContext } from "react";

const RecordInViewContext = createContext<IACeleV2.Context.ViewContext.RecordInView<any>>({
    recordInView: {},
    updateRecordInViewField: () => {},
    undoChangesInRecordInView: () => {},
});

export default RecordInViewContext;
