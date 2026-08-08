import { createContext } from "react";

const RequiresFieldContext = createContext<IACeleV2.Context.ViewContext.RequiresField<any>>({
    requiresField: () => {},
});

export default RequiresFieldContext;
