import ViewConfigContext from "@/contexts/views/viewConfigContext";
import type FieldComponent from "@/views/FieldComponent";
import { useContext } from "react";

const useViewData = <M extends IACele.Data.ModelName, T extends 'form' | 'tree'>(): IACele.Context.ViewContext.SegmentedConfig<M, typeof FieldComponent, T> => {

    // Obtención de los parámetros desde el contexto
    const { type, View } = useContext<IACele.Context.ViewContext.SegmentedConfig<M, typeof FieldComponent, T>>(ViewConfigContext as any);

    return { type, View } as IACele.Context.ViewContext.SegmentedConfig<M, typeof FieldComponent, T>;
};

export default useViewData;
