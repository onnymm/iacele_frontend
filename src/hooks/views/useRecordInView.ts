import { useContext } from "react";
import RecordInViewContext from "@/contexts/views/recordInViewContext";

const useRecordInView = <M extends IACeleV2.Data.ModelName>() => {

    // Obtención de los valores y funciones desde el contexto
    const { recordInView, undoChangesInRecordInView, updateRecordInViewField } = useContext<IACeleV2.Context.View.RecordInView<M>>(RecordInViewContext);

    return { recordInView, undoChangesInRecordInView, updateRecordInViewField };
};

export default useRecordInView;
