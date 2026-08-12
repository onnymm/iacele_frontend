import { createContext } from "react";

const ContextDataContext = createContext<IACele.Context.ViewContext.ContextData<any>>({
    contextData: {},
});

export default ContextDataContext;
