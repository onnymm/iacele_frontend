import ModelsMetadataContext from "@/contexts/views/modelsMetadataContext";
import useAPI from "@/hooks/app/useAPI"
import { useCallback, useState } from "react";

const ModelsMetadataProvider = <M extends IACele.Data.ModelName>({
    children,
}: IACele.Common.SupportsChildren) => {

    // Obtención de instancia de conexiones a la API
    const { api } = useAPI();

    // Inciialización de referencia
    const [ modelsMetadata, setModelsMetadata ] = useState<IACele.Data.ModelsMetadata<M>>({});

    // Función para obtención de metadatos del modelo
    const getFieldsMetadata = useCallback(
        async <M extends IACele.Data.ModelName>(
            modelName: M,
        ) => {
            // Si no existen metadatos del modelo...
            if ( !modelsMetadata[modelName] ){
                // Obtención de los metadatos desde el backend
                const fieldsMetadata: IACele.API.Response.FieldsMetadata<M> = await api.fieldsMetadata<M>({ 'model_name': modelName });
                // Inicialización de objeto de metadatos mapeados
                const mappedMetadata: Partial<IACele.Data.FieldsMetadata<M>> = {};
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
        <ModelsMetadataContext.Provider value={{ modelsMetadata, getFieldsMetadata }}>
            {children}
        </ModelsMetadataContext.Provider>
    );
};

export default ModelsMetadataProvider;
