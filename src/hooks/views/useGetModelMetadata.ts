import ModelsMetadataContext from "@/contexts/views/modelsMetadataContext";
import { useContext, useEffect, useMemo } from "react";

interface _NotLoadedModelMetadata {
    loaded: false;
    metadata: undefined;
};

interface _LoadedModelMetadata <M extends IACele.Data.ModelName>{
    loaded: true;
    metadata: IACele.Data.FieldsMetadata<M>;
};

type ModelMetadata<M extends IACele.Data.ModelName> = _NotLoadedModelMetadata | _LoadedModelMetadata<M>;

const useGetModelMetadata = <M extends IACele.Data.ModelName>(
    modelName: M,
) => {

    // Obtención del estado y función desde el contexto
    const { modelsMetadata, getFieldsMetadata } = useContext<IACele.Context.ViewContext.ModelsMetadata<M>>(ModelsMetadataContext);

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
