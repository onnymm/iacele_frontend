import EMPTY_CALLBACK from "@/constants/app/callbacks";
import { createContext } from "react";

const RecordEditionContext = createContext<IACeleV2.Context.ViewContext.RecordEdition<any>>({
    recordId: 0,
    recordInView: {},
    existingChanges: false,
    undoChanges: EMPTY_CALLBACK.SYNC,
    updateRecordField: EMPTY_CALLBACK.SYNC,
    saveChanges: (EMPTY_CALLBACK.ASYNC) as (() => (Promise<any>)),
    deleteRecord: EMPTY_CALLBACK.ASYNC,
    executeAction: EMPTY_CALLBACK.ASYNC,
    reload: EMPTY_CALLBACK.SYNC,
    evaluator: null as any,
    createMode: true,
    newRecord: EMPTY_CALLBACK.SYNC,
    undoNewRecord: EMPTY_CALLBACK.SYNC,
});

export default RecordEditionContext;
