import { createContext } from "react";

const ModelMetadataContext = createContext<IACeleV2.Context.ViewContext.ModelMetadata<any>>({
    modelMetadata: {},
});

export default ModelMetadataContext;
