import { createContext } from "react";

interface HeaderControlsContextParams {
    headerControls: React.ReactNode;
    setHeaderControls: React.Dispatch<React.SetStateAction<React.ReactNode>>;
    portalRef: HTMLDivElement | null;
    setPortalRef: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
};

const HeaderControlsContext = createContext<HeaderControlsContextParams>({
    headerControls: null,
    setHeaderControls: () => {},
    portalRef: null,
    setPortalRef: () => {},
});

export default HeaderControlsContext;
