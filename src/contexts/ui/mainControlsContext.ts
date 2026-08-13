import VOID_CALLBACK from "@/constants/app/callbacks";
import { createContext } from "react";

interface MainControlsContextParams {
    mainControls: React.ReactNode;
    setMainControls: React.Dispatch<React.SetStateAction<React.ReactNode>>;
    element: HTMLDivElement | null,
    setElement: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
};

const MainControlsContext = createContext<MainControlsContextParams>({
    mainControls: null,
    setMainControls: VOID_CALLBACK.SYNC,
    element: null,
    setElement: VOID_CALLBACK.SYNC,
})

export default MainControlsContext;
