import VOID_CALLBACK from "@/constants/app/callbacks";
import { createContext } from "react";

interface HeaderControlsContextParams {
    portalRef: HTMLDivElement | null;
    setPortalRef: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
};

const HeaderControlsContext = createContext<HeaderControlsContextParams>({
    portalRef: null,
    setPortalRef: VOID_CALLBACK.SYNC,
});

export default HeaderControlsContext;
