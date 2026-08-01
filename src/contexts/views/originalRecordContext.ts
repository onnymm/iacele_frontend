import { createContext } from "react";

const OriginalRecordContext = createContext<IACeleV2.Context.View.OriginalRecord<any>>({
    recordId: 0,
    originalRecord: {},
    updateOriginalRecord: async () => {},
    deleteOriginalRecord: async () => {},
    reload: () => {},
});

export default OriginalRecordContext;
