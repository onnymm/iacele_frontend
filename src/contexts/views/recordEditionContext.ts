import VOID_CALLBACK from "@/constants/app/callbacks";
import { createContext } from "react";

const RecordEditionContext = createContext<IACele.Context.ViewContext.RecordEdition<any>>({
    recordId: 0,
    recordInView: {},
    existingChanges: false,
    undoChanges: VOID_CALLBACK.SYNC,
    updateRecordField: VOID_CALLBACK.SYNC,
    saveChanges: (VOID_CALLBACK.ASYNC) as (() => (Promise<any>)),
    deleteRecord: VOID_CALLBACK.ASYNC,
    executeAction: VOID_CALLBACK.ASYNC,
    reload: VOID_CALLBACK.SYNC,
    evaluator: null as any,
    createMode: true,
    newRecord: VOID_CALLBACK.SYNC,
    undoNewRecord: VOID_CALLBACK.SYNC,
});

export default RecordEditionContext;
