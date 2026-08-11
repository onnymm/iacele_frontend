import type FieldComponent from "@/views/FieldComponent";
import { createContext } from "react";

const FieldConfigContext = createContext<IACeleV2.Context.ViewContext.FieldConfig<any, typeof FieldComponent>>({
    fieldConfig: { current: [] },
    suscribeFieldConfig: () => {},
    onRowClick: () => {},
});

export default FieldConfigContext;
