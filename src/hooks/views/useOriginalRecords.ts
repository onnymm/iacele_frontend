import OriginalRecordsContext from "@/contexts/views/originalRecordsContext"
import { useContext } from "react"

const useOriginalRecords = <M extends IACeleV2.Data.ModelName>() => {

    const { reload, fieldsToRead, originalRecords } = useContext<IACeleV2.Context.ViewContext.OriginalRecords<M>>(OriginalRecordsContext);

    return { reload, fieldsToRead, originalRecords };
};

export default useOriginalRecords;
