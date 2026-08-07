import ViewDataContext from "@/contexts/routes/viewDataContext";
import { useContext } from "react";

const useDataView = () => {

    // Obtención del nombre de la vista desde el contexto
    const { display, recordId, viewDataName, onCreate, onUpdate, newRecord, undoNewRecord } = useContext(ViewDataContext);

    return { display, recordId, viewDataName, onCreate, onUpdate, newRecord, undoNewRecord };
};

export default useDataView;
