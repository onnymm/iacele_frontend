import { useContext } from "react";
import RecordInViewContext from "@/contexts/views/recordInViewContext";

const useRecordInView = <M extends IACele.Data.ModelName>() => {

    // Obtención de los valores y funciones desde el contexto
    const { recordInView, undoChangesInRecordInView, updateRecordInViewField } = useContext<IACele.Context.ViewContext.RecordInView<M>>(RecordInViewContext);

    return { recordInView, undoChangesInRecordInView, updateRecordInViewField };
};

export default useRecordInView;
