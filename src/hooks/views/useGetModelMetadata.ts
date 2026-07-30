import ModelsMetadataContextV2 from "@/contexts/views/modelsMetadataContextV2";
import { useContext, useEffect, useMemo } from "react";

interface _NotLoadedModelMetadata {
    loaded: false;
    metadata: undefined;
};

interface _LoadedModelMetadata <M extends IACeleV2.Data.ModelName>{
    loaded: true;
    metadata: IACeleV2.Data.FieldsMetadata<M>;
};

type ModelMetadata<M extends IACeleV2.Data.ModelName> = _NotLoadedModelMetadata | _LoadedModelMetadata<M>;

const useGetModelMetadata = <M extends IACeleV2.Data.ModelName>(
    modelName: M,
) => {

    // Obtención del estado y función desde el contexto
    const { modelsMetadata, getFieldsMetadata } = useContext<IACeleV2.Context.View.ModelsMetadata<M>>(ModelsMetadataContextV2);

    // Efecto para ejecutar la obtención de los metadatos del modelo
    useEffect(
        () => {
            getFieldsMetadata(modelName);
        }, [getFieldsMetadata, modelName]
    );

    // Construcción de objeto de metadatos del campo con estado de cargado
    const modelMetadata = useMemo<ModelMetadata<M>>(
        () => {
            // Obtención de los metadatos
            const metadata = modelsMetadata[modelName];
            // Si no existen metadatos del modelo...
            if ( !metadata ) {
                // Retorno de un objeto con metadatos no cargados
                return ({ loaded: false, metadata: undefined });
            };
            // Retorno de un objeto con metadatos cargados
            return ({ loaded: true, metadata });
        },
        [modelsMetadata, modelName]
    );

    return { modelMetadata };
};

export default useGetModelMetadata;
