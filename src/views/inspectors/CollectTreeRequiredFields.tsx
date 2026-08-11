import useViewData from "@/hooks/views/useViewData";
import TreeViewInspector from "./TreeViewInspector";

const CollectTreeRequiredFields = <M extends IACeleV2.Data.ModelName>() => {

    // Obtención de la declaración de la vista
    const { View } = useViewData<M, 'tree'>();

    return View(TreeViewInspector);
};

export default CollectTreeRequiredFields
