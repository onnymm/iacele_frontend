import ViewDataContext from "@/contexts/routes/viewDataContext";
import { useContext } from "react";

const useDataView = () => {

    // Obtención del nombre de la vista desde el contexto
    const { viewDataName, recordId } = useContext(ViewDataContext);

    return { viewDataName, recordId };
};

export default useDataView;
