import { createContext } from "react";

const FieldContext = createContext<IACeleV2.Context.View.Field<any, any>>({
    params: {
        name: '',
    },
    fieldMetadata: {} as any,
});

export default FieldContext;
