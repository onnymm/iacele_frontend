import { useContext } from "react";
import ModelNameContext from "@/contexts/views/modelNameContext";

const useGetModelNameFromView = <M extends IACele.Data.ModelName>() => {

    // Obtención del valor desde el contexto
    const { modelName } = useContext(ModelNameContext);

    return { modelName: modelName as M };
};

export default useGetModelNameFromView;
