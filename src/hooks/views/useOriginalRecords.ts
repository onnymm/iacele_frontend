import OriginalRecordsContext from "@/contexts/views/originalRecordsContext"
import { useContext } from "react"

const useOriginalRecords = <M extends IACele.Data.ModelName>() => {

    const { reload, fieldsToRead, originalRecords, sortby, toggleSortby } = useContext<IACele.Context.ViewContext.OriginalRecords<M>>(OriginalRecordsContext);

    return { reload, fieldsToRead, originalRecords, sortby, toggleSortby };
};

export default useOriginalRecords;
