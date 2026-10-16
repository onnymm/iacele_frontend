import MainButtons from "../main-buttons/MainButtons";
import { useContext } from "react";
import individualRecordViewContext from "@/contexts/views/individualRecordViewContext";
import NavbarMainControls from "@/components/portals/NavbarMainControls";

const ScreenModeControls = () => {

    // Obtención de parámetro desde el contexto
    const { canCreate } = useContext(individualRecordViewContext);

    return (
        <NavbarMainControls.Portal>
            <div className="flex flex-row gap-2">
                {canCreate &&
                    <MainButtons.NewRecord />
                }
                <MainButtons.Ellipsis />
                <MainButtons.Save />
                <MainButtons.UndoChanges />
            </div>
        </NavbarMainControls.Portal>
    );
};

export default ScreenModeControls;
