import RequiresFieldContext from "@/contexts/views/requiresFieldContext";
import { useContext } from "react";

const useRequiresField = <M extends IACele.Data.ModelName>() => {

    // Obtención de función de campo requerido
    const { requiresField } = useContext<IACele.Context.ViewContext.RequiresField<M>>(RequiresFieldContext);

    return { requiresField };
};

export default useRequiresField;
