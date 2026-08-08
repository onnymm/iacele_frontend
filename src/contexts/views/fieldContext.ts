import { createContext } from "react";

const FieldContext = createContext<IACeleV2.Context.ViewContext.Field<any, any>>({
    params: {
        name: '',
    },
    fieldMetadata: {} as any,
});

export default FieldContext;
