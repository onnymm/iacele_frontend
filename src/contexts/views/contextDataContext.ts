import { createContext } from "react";

const ContextDataContext = createContext<IACeleV2.Context.ViewContext.ContextData<any>>({
    contextData: {},
});

export default ContextDataContext;
