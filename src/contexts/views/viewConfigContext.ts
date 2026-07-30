import { createContext } from "react";

const ViewConfigContext = createContext<IACeleV2.Context.View.Config<any>>({
    type: 'form',
    View: () => (null),
});

export default ViewConfigContext;
