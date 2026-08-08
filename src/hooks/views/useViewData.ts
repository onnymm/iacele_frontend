import ViewConfigContext from "@/contexts/views/viewConfigContext";
import type FieldComponent from "@/views/FieldComponent";
import { useContext } from "react";

const useViewData = <M extends IACeleV2.Data.ModelName>() => {

    // Obtención de los parámetros desde el contexto
    const { type, View } = useContext<IACeleV2.Context.ViewContext.Config<M, typeof FieldComponent>>(ViewConfigContext);

    return { type, View };
};

export default useViewData;
