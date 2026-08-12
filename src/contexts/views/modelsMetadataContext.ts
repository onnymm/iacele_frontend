import { createContext } from "react";

interface ModelsMetadataContextParams <M extends IACele.Data.ModelName>{
    modelsMetadata: IACele.Data.ModelsMetadata<M>;
    getFieldsMetadata: <M extends keyof IACele.Data.Model>(modelName: M) => Promise<void>;
};

const ModelsMetadataContext = createContext<ModelsMetadataContextParams<any>>({
    modelsMetadata: {},
    getFieldsMetadata: async () => {},
});

export default ModelsMetadataContext;
