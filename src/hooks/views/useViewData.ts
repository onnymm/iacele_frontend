import ViewConfigContext from "@/contexts/views/viewConfigContext";
import { useContext } from "react";

const useViewData = <M extends IACeleV2.Data.ModelName>() => {

    // Obtención de los parámetros desde el contexto
    const { type, View } = useContext<IACeleV2.Context.View.Config<M>>(ViewConfigContext);

    return { type, View };
};

export default useViewData;
