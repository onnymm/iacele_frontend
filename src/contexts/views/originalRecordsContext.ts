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
    page: 0,
    setPage: VOID_CALLBACK.SYNC,
    limit: 40,
    totalPages: 1,
});

export default OriginalRecordsContext;
