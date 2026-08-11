import ViewConfigContext from "@/contexts/views/viewConfigContext";
import type FieldComponent from "@/views/FieldComponent";
import { useContext } from "react";

const useViewData = <M extends IACeleV2.Data.ModelName, T extends 'form' | 'tree'>(): IACeleV2.Context.ViewContext.SegmentedConfig<M, typeof FieldComponent, T> => {

    // Obtención de los parámetros desde el contexto
    const { type, View } = useContext<IACeleV2.Context.ViewContext.SegmentedConfig<M, typeof FieldComponent, T>>(ViewConfigContext as any);

    return { type, View } as IACeleV2.Context.ViewContext.SegmentedConfig<M, typeof FieldComponent, T>;
};

export default useViewData;
