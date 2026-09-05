import VOID_CALLBACK from "@/constants/app/callbacks";
import { createContext } from "react";

const OriginalRecordsContext = createContext<IACele.Context.ViewContext.OriginalRecords<any>>({
    originalRecords: [],
    reload: VOID_CALLBACK.SYNC,
    fieldsToRead: { current: [] },
    toggleSortby: () => {},
    sortby: {
        sortby: null,
        ascending: null,
    },
});

export default OriginalRecordsContext;
