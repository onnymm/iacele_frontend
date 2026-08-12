import ModelMetadataContext from "@/contexts/views/modelMetadataContext";
import ModelNameContext from "@/contexts/views/modelNameContext";
import ViewConfigContext from "@/contexts/views/viewConfigContext";
import useDataView from "@/hooks/routes/useDataView";
import useGetModelMetadata from "@/hooks/views/useGetModelMetadata";
import VIEW from "@/views/Views";
import { useMemo } from "react";

const ModelDataProvider = <M extends IACele.Data.ModelName>({
    children,
}: IACele.Common.SupportsChildren) => {

    // Obtención del nombre de la vista
    const { viewDataName } = useDataView();
    // Obtención del objeto de vista
    const viewData = useMemo(
        () => (VIEW[viewDataName]), [viewDataName]
    );

    // Obtención del nombre del modelo
    const modelName = VIEW[viewDataName].modelName as M;
    // Obtención de función para obtener los metadatos de los campos del modelo
    const { modelMetadata } = useGetModelMetadata<M>(modelName);

    // Si los metadatos ya fueron cargados...
    if ( modelMetadata['loaded'] ) {
        return (
            <ModelNameContext.Provider value={{ modelName }}>
            <ModelMetadataContext.Provider value={{ modelMetadata: modelMetadata['metadata'] }}>
            <ViewConfigContext.Provider value={{
                type: viewData.type as any,
                View: viewData.View,
            }}>
                {children}
            </ViewConfigContext.Provider>
            </ModelMetadataContext.Provider>
            </ModelNameContext.Provider>
        );
    };
};

export default ModelDataProvider;
