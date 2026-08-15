import VOID_CALLBACK from "@/constants/app/callbacks";
import { createContext } from "react";

const RecordInViewContext = createContext<IACele.Context.ViewContext.RecordInView<any>>({
    recordInView: {},
    updateRecordInViewField: VOID_CALLBACK.SYNC,
    undoChangesInRecordInView: VOID_CALLBACK.SYNC,
    recomputeRecordInView: VOID_CALLBACK.SYNC,

});

export default RecordInViewContext;
