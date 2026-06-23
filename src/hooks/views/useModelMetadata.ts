import ModelsMetadataContext from "@/contexts/app/modelsMetadataContext";
import { useCallback, useContext, useEffect, useState } from "react";

const useLoadModelMetadata = <M extends IACele.Data.ModelName>(
    modelName: M,
) => {

    // Obtención de función de carga desde el contexto
    const { getFieldsMetadata, fieldsMetadata } = useContext(ModelsMetadataContext);
    // Inicialización de estado de carga de los metadatos de campo
    const [ metadataLoaded, setMetadataLoaded ] = useState<boolean>(false);

    // Función para obtención de metadatos de un campo específico del modelo provisto
    const getFieldMetadata = useCallback(
        (
            fieldName: keyof IACele.Data.ModelDefinition<M>,
        ) => {
            const fieldMetadata = fieldsMetadata(modelName, fieldName);
            return fieldMetadata;
        }, [fieldsMetadata, modelName]
    );

    // Carga de los metadatos de campos del modelo
    useEffect(
        () => {
            getFieldsMetadata(modelName, setMetadataLoaded);
        }, [getFieldsMetadata, modelName]
    );

    return { metadataLoaded, fieldsMetadata, getFieldMetadata };
};

export default useLoadModelMetadata;
