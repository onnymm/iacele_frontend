import { createContext } from "react";

const ModelMetadataContext = createContext<IACeleV2.Context.View.ModelMetadata<any>>({
    modelMetadata: {},
});

export default ModelMetadataContext;
