import ModelMetadataContext from "@/contexts/views/modelMetadataContext";
import { useContext } from "react";

const useModelMetadata = <M extends IACele.Data.ModelName>() => {

    // Obtención del estado desde el contexto
    const { modelMetadata } = useContext<IACele.Context.ViewContext.ModelMetadata<M>>(ModelMetadataContext);

    return { modelMetadata };
};

export default useModelMetadata;
