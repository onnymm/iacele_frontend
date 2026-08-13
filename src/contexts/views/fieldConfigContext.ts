import VOID_CALLBACK from "@/constants/app/callbacks";
import type FieldComponent from "@/views/FieldComponent";
import { createContext } from "react";

const FieldConfigContext = createContext<IACele.Context.ViewContext.FieldConfig<any, typeof FieldComponent>>({
    fieldConfig: { current: [] },
    suscribeFieldConfig: VOID_CALLBACK.SYNC,
    onRowClick: VOID_CALLBACK.SYNC,
});

export default FieldConfigContext;
