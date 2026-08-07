import type FieldComponent from "@/views/FieldComponent";
import { createContext } from "react";

const ViewConfigContext = createContext<IACeleV2.Context.View.Config<any, typeof FieldComponent>>({
    type: 'form',
    View: () => (null),
});

export default ViewConfigContext;
