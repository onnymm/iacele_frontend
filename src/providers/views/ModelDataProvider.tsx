import ModelMetadataContext from "@/contexts/views/modelMetadataContext";
import ModelNameContext from "@/contexts/views/modelNameContext";
import useDataView from "@/hooks/routes/useDataView";
import useGetModelMetadata from "@/hooks/views/useGetModelMetadata";
import VIEW from "@/views/Views";

const ModelDataProvider = <M extends IACeleV2.Data.ModelName>({
    children,
}: IACele.Common.SupportsChildren) => {

    // Obtención del nombre de la vista
    const { viewDataName } = useDataView();
    // Obtención del nombre del modelo
    const modelName = VIEW[viewDataName].modelName as M;
    // Obtención de función para obtener los metadatos de los campos del modelo
    const { modelMetadata } = useGetModelMetadata<M>(modelName);

    // Si los metadatos ya fueron cargados...
    if ( modelMetadata['loaded'] ) {
        return (
            <ModelNameContext.Provider value={{ modelName }}>
            <ModelMetadataContext.Provider value={{ modelMetadata: modelMetadata['metadata'] }}>
                {children}
            </ModelMetadataContext.Provider>
            </ModelNameContext.Provider>
        );
    };
};

export default ModelDataProvider;
