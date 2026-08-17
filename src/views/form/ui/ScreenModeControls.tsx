import MainControls from "@/components/common/navbar/MainControls";
import MainButtons from "../main-buttons/MainButtons";
import { useContext } from "react";
import individualRecordViewContext from "@/contexts/views/individualRecordViewContext";

const ScreenModeControls = () => {

    // Obtención de parámetro desde el contexto
    const { canCreate } = useContext(individualRecordViewContext);

    return (
        <MainControls>
            <div className="flex flex-row gap-2">
                {canCreate &&
                    <MainButtons.NewRecord />
                }
                <MainButtons.Save />
                <MainButtons.UndoChanges />
                <MainButtons.Ellipsis />
            </div>
        </MainControls>
    );
};

export default ScreenModeControls;
