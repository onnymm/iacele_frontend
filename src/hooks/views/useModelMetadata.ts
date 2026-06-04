import ModelsMetadataContext from "@/contexts/app/modelsMetadataContext";
import { useContext, useEffect, useState } from "react";

const useLoadModelMetadata = <M extends IACele.Data.ModelName>(
    modelName: M,
) => {

    // Obtención de función de carga desde el contexto
    const { getFieldsMetadata, fieldsMetadata } = useContext(ModelsMetadataContext);
    // Inicialización de estado de carga de los metadatos de campo
    const [ loaded, setLoaded ] = useState<boolean>(false);

    // Carga de los metadatos de campos del modelo
    useEffect(
        () => {
            getFieldsMetadata(modelName, setLoaded);
        }, [getFieldsMetadata, modelName]
    );

    return { loaded, fieldsMetadata };
};

export default useLoadModelMetadata;
