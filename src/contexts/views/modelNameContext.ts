import { createContext } from "react";

interface ModelNameContextParams <M extends IACeleV2.Data.ModelName>{
    modelName: M;
};

const ModelNameContext = createContext<ModelNameContextParams<any>>({
    modelName: null,
});

export default ModelNameContext;
