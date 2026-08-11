import useViewData from "@/hooks/views/useViewData";
import FormView from "./form/FormView";
import TreeView from "./tree/TreeView";

const ViewMode = () => {

    // Obtención de la declaración de la vista
    const { type } = useViewData();

    // Renderización de tipo de vista
    switch ( type ) {
        case 'form':
            return (
                <FormView />
            );
        case 'tree':
            return (
                <TreeView />
            );
    };
};

export default ViewMode;


