import EMPTY_CALLBACK from "@/constants/app/callbacks";
import { createContext } from "react";

const OriginalRecordsContext = createContext<IACeleV2.Context.ViewContext.OriginalRecords<any>>({
    originalRecords: [],
    reload: EMPTY_CALLBACK.SYNC,
    fieldsToRead: { current: [] },
});

export default OriginalRecordsContext;
