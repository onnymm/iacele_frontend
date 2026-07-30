import { createContext } from "react";

const RecordInViewContext = createContext<IACeleV2.Context.View.RecordInView<any>>({
    recordInView: {},
    updateRecordInViewField: () => {},
    undoChangesInRecordInView: () => {},
});

export default RecordInViewContext;
