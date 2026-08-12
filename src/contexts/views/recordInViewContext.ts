import { createContext } from "react";

const RecordInViewContext = createContext<IACele.Context.ViewContext.RecordInView<any>>({
    recordInView: {},
    updateRecordInViewField: () => {},
    undoChangesInRecordInView: () => {},
});

export default RecordInViewContext;
