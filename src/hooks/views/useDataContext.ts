import ContextDataContext from "@/contexts/views/contextDataContext";
import { useContext } from "react";

const useDataContext = <M extends IACeleV2.Data.ModelName>() => {

    // Obtención de datos de contexto desde el contexto
    const { contextData } = useContext<IACeleV2.Context.ViewContext.ContextData<M>>(ContextDataContext);

    return { contextData };
};

export default useDataContext;
