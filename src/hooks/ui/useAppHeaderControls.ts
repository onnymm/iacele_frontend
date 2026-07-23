import RenderHeaderControlsContext from "@/contexts/ui/renderHeaderControlsContext";
import { useContext } from "react";

const useAppHeaderControls = () => {

    // Obtención de función para renderizar los controles
    const { renderHeaderControls } = useContext(RenderHeaderControlsContext);

    return { renderHeaderControls };
};

export default useAppHeaderControls;
