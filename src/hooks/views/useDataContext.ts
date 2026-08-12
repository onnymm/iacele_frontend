import ContextDataContext from "@/contexts/views/contextDataContext";
import { useContext } from "react";

const useDataContext = <M extends IACele.Data.ModelName>() => {

    // Obtención de datos de contexto desde el contexto
    const { contextData } = useContext<IACele.Context.ViewContext.ContextData<M>>(ContextDataContext);

    return { contextData };
};

export default useDataContext;
