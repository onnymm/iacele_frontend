import { createContext } from "react";

const RequiresFieldContext = createContext<IACeleV2.Context.View.RequiresField<any>>({
    requiresField: () => {},
});

export default RequiresFieldContext;
