import useViewData from "@/hooks/views/useViewData";
import FormViewInspector from "./FormViewInspector";

const CollectFormRequiredFields = () => {

    // Obtención de la declaración de la vista
    const { View } = useViewData();

    return View(FormViewInspector);
};

export default CollectFormRequiredFields;
