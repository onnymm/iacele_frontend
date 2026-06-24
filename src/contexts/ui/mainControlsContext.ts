import { createContext } from "react";

interface MainControlsContextParams {
    mainControls: React.ReactNode;
    setMainControls: React.Dispatch<React.SetStateAction<React.ReactNode>>;
    element: HTMLDivElement | null,
    setElement: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
};

const MainControlsContext = createContext<MainControlsContextParams>({
    mainControls: null,
    setMainControls: () => null,
    element: null,
    setElement: () => null,
})

export default MainControlsContext;
