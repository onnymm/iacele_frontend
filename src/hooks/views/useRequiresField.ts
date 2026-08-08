import RequiresFieldContext from "@/contexts/views/requiresFieldContext";
import { useContext } from "react";

const useRequiresField = <M extends IACeleV2.Data.ModelName>() => {

    // Obtención de función de campo requerido
    const { requiresField } = useContext<IACeleV2.Context.ViewContext.RequiresField<M>>(RequiresFieldContext);

    return { requiresField };
};

export default useRequiresField;
