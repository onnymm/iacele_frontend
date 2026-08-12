import { createContext } from "react";

interface ModelNameContextParams <M extends IACele.Data.ModelName>{
    modelName: M;
};

const ModelNameContext = createContext<ModelNameContextParams<any>>({
    modelName: null,
});

export default ModelNameContext;
