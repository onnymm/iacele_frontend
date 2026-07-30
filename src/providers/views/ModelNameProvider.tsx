import ModelNameContext from "@/contexts/views/modelNameContext";
import useDataView from "@/hooks/routes/useDataView"
import VIEW from "@/views/Views";

const ModelNameProvider = <M extends IACeleV2.Data.ModelName>({
    children,
}: IACele.Common.SupportsChildren) => {

    // Obtención del nombre de la vista
    const { viewDataName } = useDataView();
    // Obtención del nombre del modelo
    const modelName = VIEW[viewDataName].modelName as M;

    return (
        <ModelNameContext.Provider value={{ modelName }}>
            {children}
        </ModelNameContext.Provider>
    );
};

export default ModelNameProvider;
