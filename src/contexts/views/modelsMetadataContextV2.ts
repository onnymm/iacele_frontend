import { createContext } from "react";

interface ModelsMetadataV2ContextParams <M extends IACeleV2.Data.ModelName>{
    modelsMetadata: IACeleV2.Data.ModelsMetadata<M>;
    getFieldsMetadata: <M extends keyof IACeleV2.Data.Model>(modelName: M) => Promise<void>;
};

const ModelsMetadataContextV2 = createContext<ModelsMetadataV2ContextParams<any>>({
    modelsMetadata: {},
    getFieldsMetadata: async () => {},
});

export default ModelsMetadataContextV2;
