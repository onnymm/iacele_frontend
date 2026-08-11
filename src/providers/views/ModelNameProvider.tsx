import ModelNameContext from "@/contexts/views/modelNameContext";
import useDataView from "@/hooks/routes/useDataView"
import VIEW_V2 from "@/views/ViewsV2";

const ModelNameProvider = <M extends IACeleV2.Data.ModelName>({
    children,
}: IACeleV2.Common.SupportsChildren) => {

    // Obtención del nombre de la vista
    const { viewDataName } = useDataView();
    // Obtención del nombre del modelo
    const modelName = VIEW_V2[viewDataName].modelName as M;

    return (
        <ModelNameContext.Provider value={{ modelName }}>
            {children}
        </ModelNameContext.Provider>
    );
};

export default ModelNameProvider;
