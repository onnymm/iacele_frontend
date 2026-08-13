import VOID_CALLBACK from "@/constants/app/callbacks";
import { createContext } from "react";

const OriginalRecordContext = createContext<IACele.Context.ViewContext.OriginalRecord<any>>({
    recordId: 0,
    originalRecord: {},
    updateOriginalRecord: async () => (true),
    deleteOriginalRecord: VOID_CALLBACK.ASYNC,
    reload: VOID_CALLBACK.SYNC,
});

export default OriginalRecordContext;
