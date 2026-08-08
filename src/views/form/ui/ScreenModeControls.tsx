import MainControls from "@/components/common/navbar/MainControls";
import MainButtons from "../main-buttons/MainButtons";

const ScreenModeControls = () => {

    return (
        <MainControls>
            <div className="flex flex-row gap-2">
                <MainButtons.NewRecord />
                <MainButtons.Save />
                <MainButtons.UndoChanges />
            </div>
        </MainControls>
    );
};

export default ScreenModeControls;
