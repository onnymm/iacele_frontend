import VOID_CALLBACK from "@/constants/app/callbacks";
import { createContext } from "react";

interface TreeMainControlsContextParams {
    treeMainControls: React.ReactNode;
    setTreeMainControls: React.Dispatch<React.SetStateAction<React.ReactNode>>;
    element: HTMLDivElement | null;
    setElement: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
};

const TreeMainControlsContext = createContext<TreeMainControlsContextParams>({
    treeMainControls: null,
    setTreeMainControls: VOID_CALLBACK.SYNC,
    element: null,
    setElement: VOID_CALLBACK.SYNC,
});

export default TreeMainControlsContext;
