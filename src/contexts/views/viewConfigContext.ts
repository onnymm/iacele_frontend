import type FieldComponent from "@/views/FieldComponent";
import { createContext } from "react";

const ViewConfigContext = createContext<IACele.Context.ViewContext.SegmentedConfig<any, typeof FieldComponent, 'form'>>({
    type: 'form',
    View: () => (null),
});

export default ViewConfigContext;
