import ModelsMetadataContextV2 from "@/contexts/views/modelsMetadataContextV2";
import useAPI from "@/hooks/app/useAPI"
import { useCallback, useState } from "react";

const ModelsMetadataProviderV2 = <M extends IACeleV2.Data.ModelName>({
    children,
}: IACeleV2.Common.SupportsChildren) => {

    // Obtención de instancia de conexiones a la API
    const { api } = useAPI();

    // Inciialización de referencia
    const [ modelsMetadata, setModelsMetadata ] = useState<IACeleV2.Data.ModelsMetadata<M>>({});

    // Función para obtención de metadatos del modelo
    const getFieldsMetadata = useCallback(
        async <M extends IACeleV2.Data.ModelName>(
            modelName: M,
        ) => {
            // Si no existen metadatos del modelo...
            if ( !modelsMetadata[modelName] ){
                // Obtención de los metadatos desde el backend
                const fieldsMetadata: IACeleV2.API.Response.FieldsMetadata<M> = await api.fieldsMetadataV2<M>({ 'model_name': modelName });
                // Inicialización de objeto de metadatos mapeados
                const mappedMetadata: Partial<IACeleV2.Data.FieldsMetadata<M>> = {};
                // Iteración por cada objeto de metadatos de campo
                fieldsMetadata.forEach(
                    (fieldMetadata) => {
                        // Obtención del nombre del campo
                        const fieldName = fieldMetadata['name'];
                        // Asignación
                        mappedMetadata[fieldName] = fieldMetadata;
                    }
                );
                // Se guardan los metadatos en la referencia
                setModelsMetadata(
                    (metadata) => ({
                        ...metadata,
                        [modelName]: mappedMetadata,
                    })
                );
            };
        }, [api, modelsMetadata]
    );

    return (
        <ModelsMetadataContextV2.Provider value={{ modelsMetadata, getFieldsMetadata }}>
            {children}
        </ModelsMetadataContextV2.Provider>
    );
};

export default ModelsMetadataProviderV2;
