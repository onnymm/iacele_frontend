import { createContext } from "react";

interface RenderHeaderControlsContextParams {
    renderHeaderControls: (element: React.ReactNode) => (React.ReactPortal | null);
};

const RenderHeaderControlsContext = createContext<RenderHeaderControlsContextParams>({
    renderHeaderControls: () => (null)
});

export default RenderHeaderControlsContext;
