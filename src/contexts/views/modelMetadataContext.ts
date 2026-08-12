import { createContext } from "react";

const ModelMetadataContext = createContext<IACele.Context.ViewContext.ModelMetadata<any>>({
    modelMetadata: {},
});

export default ModelMetadataContext;
