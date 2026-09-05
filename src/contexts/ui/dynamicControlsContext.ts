import VOID_CALLBACK from "@/constants/app/callbacks";
import { createContext } from "react";

interface DynamicControlsContextParams {
    dynamicControls: React.ReactNode;
    setDynamicControls: React.Dispatch<React.SetStateAction<React.ReactNode>>;
    element: HTMLDivElement | null;
    setElement: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
};

const DynamicControlsContext = createContext<DynamicControlsContextParams>({
    dynamicControls: null,
    setDynamicControls: VOID_CALLBACK.SYNC,
    element: null,
    setElement: VOID_CALLBACK.SYNC,
});

export default DynamicControlsContext;
