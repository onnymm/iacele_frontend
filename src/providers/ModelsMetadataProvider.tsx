import ModelsMetadataContext from "@/contexts/app/modelsMetadataContext";
import useAPI from "@/hooks/app/useAPI";
import { useCallback, useRef } from "react"

const ModelsMetadataProvider: React.FC<IACele.Common.SupportsChildren> = ({
    children,
}) => {

    // Obtención de instancia de conexión a la API
    const { api } = useAPI();

    // Inicialización de referencia
    const modelsMetadataRef = useRef<IACele.Application.ModelsMetadata>({});

    // Función para obtención de metadatos de modelo
    const getFieldsMetadata = useCallback(
        async <M extends IACele.Data.ModelName>(
            modelName: M,
            setLoaded: React.Dispatch<React.SetStateAction<boolean>>,
        ) => {
            // Obtención de metadatos desde la referencia
            let fieldsMetadata = modelsMetadataRef.current[modelName];
            // Si no existen los metadatos...
            if ( fieldsMetadata === undefined ) {
                // Obtención de metadatos
                fieldsMetadata = await api.fieldsMetadata({ 'model_name': modelName });
            };
            // Se guardan los metadatos en la referencia
            modelsMetadataRef.current[modelName] = fieldsMetadata;

            // Se establece el estado a verdadero
            setLoaded(true);
        }, [api]
    );

    // Inicialización de función de obtención de metadatos de campo
    const fieldsMetadata = useCallback(
        <M extends IACele.Data.ModelName>(
            modelName: M,
            fieldName: keyof IACele.Data.ModelDefinition<M>,
        ) => {

            // Obtención de los metadatos de campo
            const field = (
                (modelsMetadataRef.current[modelName] as IACele.Data.Shape.FieldsMetadata[])
                .find(
                    (fieldMetadata) => (fieldMetadata.name === fieldName)
                ) as IACele.Data.Shape.FieldsMetadata
            );

            return field;
        }, [modelsMetadataRef]
    );

    return (
        <ModelsMetadataContext.Provider value={{ modelsMetadataRef, getFieldsMetadata, fieldsMetadata }}>
            {children}
        </ModelsMetadataContext.Provider>
    );
};

export default ModelsMetadataProvider;
