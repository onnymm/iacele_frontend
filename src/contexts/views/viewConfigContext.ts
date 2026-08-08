import type FieldComponent from "@/views/FieldComponent";
import { createContext } from "react";

const ViewConfigContext = createContext<IACeleV2.Context.ViewContext.Config<any, typeof FieldComponent>>({
    type: 'form',
    View: () => (null),
});

export default ViewConfigContext;
