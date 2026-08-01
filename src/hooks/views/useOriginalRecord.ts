import OriginalRecordContext from "@/contexts/views/originalRecordContext";
import { useContext } from "react";

const useOriginalRecord = <M extends IACeleV2.Data.ModelName>() => {

    // Obtención de estados y funciones desde el contexto
    const { recordId, originalRecord, updateOriginalRecord, deleteOriginalRecord, reload } = useContext<IACeleV2.Context.View.OriginalRecord<M>>(OriginalRecordContext);

    return { recordId, originalRecord, updateOriginalRecord, deleteOriginalRecord, reload };
};

export default useOriginalRecord;
