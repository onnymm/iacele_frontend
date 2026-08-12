import { createContext } from "react";

const RequiresFieldContext = createContext<IACele.Context.ViewContext.RequiresField<any>>({
    requiresField: () => {},
});

export default RequiresFieldContext;
