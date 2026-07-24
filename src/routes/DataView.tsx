import QUERY_PARAMS from "@/constants/routes/queryParams";
import ViewDataContext from "@/contexts/routes/viewDataContext";
import useGetParams from "@/hooks/routes/useGetParams";
import VIEW from "@/views/Views";

interface ViewQueryParams {
    [QUERY_PARAMS.VIEW.ID]: number;
    [QUERY_PARAMS.VIEW.NAME]: keyof typeof VIEW;
};

interface ViewParams {
    display?: IACele.UI.View.DisplayOption;
};

const DataView = ({
    display = 'screen',
}: ViewParams) => {

    // Obtención de parámetros de query
    const { id: recordId, name: viewDataName } = useGetParams<ViewQueryParams>({
        [QUERY_PARAMS.VIEW.ID]: (q) => (Number(q)),
        [QUERY_PARAMS.VIEW.NAME]: (q) => (q as keyof typeof VIEW),
    })
    // Obtención de la vista a renderizar
    const View = VIEW[viewDataName];

    return (
        <ViewDataContext.Provider value={{ viewDataName, recordId, display }}>
            <View.View />
        </ViewDataContext.Provider>
    );
};

export default DataView;
