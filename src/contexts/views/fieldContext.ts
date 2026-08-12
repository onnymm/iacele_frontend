import { createContext } from "react";

const FieldContext = createContext<IACele.Context.ViewContext.Field<any, any>>({
    params: {
        name: '',
    },
    fieldMetadata: {} as any,
});

export default FieldContext;
