import { createContext } from "react";

const OriginalRecordContext = createContext<IACeleV2.Context.View.OriginalRecord<any>>({
    originalRecord: {},
    updateOriginalRecord: async () => {},
    deleteOriginalRecord: async () => {},
});

export default OriginalRecordContext;
