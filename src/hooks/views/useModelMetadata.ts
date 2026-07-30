import ModelMetadataContext from "@/contexts/views/modelMetadataContext";
import { useContext } from "react";

const useModelMetadata = <M extends IACeleV2.Data.ModelName>() => {

    // Obtención del estado desde el contexto
    const { modelMetadata } = useContext<IACeleV2.Context.View.ModelMetadata<M>>(ModelMetadataContext);

    return { modelMetadata };
};

export default useModelMetadata;
