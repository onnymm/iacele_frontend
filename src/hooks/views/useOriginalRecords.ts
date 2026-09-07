import OriginalRecordsContext from "@/contexts/views/originalRecordsContext"
import { useContext } from "react"

const useOriginalRecords = <M extends IACele.Data.ModelName>() => {

    const { reload, fieldsToRead, originalRecords, sortby, toggleSortby, page, setPage, limit, totalPages } = useContext<IACele.Context.ViewContext.OriginalRecords<M>>(OriginalRecordsContext);

    return { reload, fieldsToRead, originalRecords, sortby, toggleSortby, page, setPage, limit, totalPages };
};

export default useOriginalRecords;
