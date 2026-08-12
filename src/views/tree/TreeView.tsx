import useViewData from "@/hooks/views/useViewData";
import RecordsFromDatabaseProvider from "@/providers/views/RecordsFromDatabaseProvider";
import Tree from "./Tree";

const TreeView = <M extends IACele.Data.ModelName>() => {

    // Obtención de la declaración de la vista
    const { View } = useViewData<M, 'tree'>();

    return (
        <RecordsFromDatabaseProvider>
            {View(Tree)}
        </RecordsFromDatabaseProvider>
    );
};

export default TreeView;

