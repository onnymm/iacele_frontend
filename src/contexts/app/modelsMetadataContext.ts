import { createContext } from "react";

interface ModelsMetadataContextParams {
    modelsMetadata: Partial<Record<IACele.Data.ModelName, IACele.Data.Shape.FieldsMetadata[]>>;
    getFieldsMetadata: <M extends IACele.Data.ModelName>(
        modelName: M,
        setLoaded: React.Dispatch<React.SetStateAction<boolean>>,
    ) => Promise<void>;
    fieldsMetadata: <M extends IACele.Data.ModelName>(
        modelName: M,
        fieldName: keyof IACele.Data.ModelDefinition<M>,
    ) => IACele.Data.Shape.FieldsMetadata;
};

const ModelsMetadataContext = createContext<ModelsMetadataContextParams>({
    modelsMetadata: {},
    getFieldsMetadata: async () => {},
    fieldsMetadata: () => ({} as any),
});

export default ModelsMetadataContext;
