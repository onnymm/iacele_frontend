import { createContext } from "react";

const OriginalRecordContext = createContext<IACele.Context.ViewContext.OriginalRecord<any>>({
    recordId: 0,
    originalRecord: {},
    updateOriginalRecord: async () => (true),
    deleteOriginalRecord: async () => {},
    reload: () => {},
});

export default OriginalRecordContext;
