import VOID_CALLBACK from "@/constants/app/callbacks";
import { createContext } from "react";

const RequiresFieldContext = createContext<IACele.Context.ViewContext.RequiresField<any>>({
    requiresField: VOID_CALLBACK.SYNC,
});

export default RequiresFieldContext;
