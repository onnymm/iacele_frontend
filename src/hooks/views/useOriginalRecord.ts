import OriginalRecordContext from "@/contexts/views/originalRecordContext";
import { useContext } from "react";

const useOriginalRecord = <M extends IACele.Data.ModelName>() => {

    // Obtención de estados y funciones desde el contexto
    const { recordId, originalRecord, updateOriginalRecord, deleteOriginalRecord, reload } = useContext<IACele.Context.ViewContext.OriginalRecord<M>>(OriginalRecordContext);

    return { recordId, originalRecord, updateOriginalRecord, deleteOriginalRecord, reload };
};

export default useOriginalRecord;
