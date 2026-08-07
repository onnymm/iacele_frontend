import QUERY_PARAMS from "@/constants/routes/queryParams";
import ViewDataContext from "@/contexts/routes/viewDataContext";
import useGetParams from "@/hooks/routes/useGetParams"
import ModelDataProvider from "./ModelDataProvider";
import VIEW_V2 from "@/views/ViewsV2";
import ViewMode from "@/views/ViewMode";

interface ViewQueryParams {
    [QUERY_PARAMS.VIEW.ID]: number;
    [QUERY_PARAMS.VIEW.NAME]: keyof typeof VIEW_V2;
};

const URLDataViewProvider = () => {

    // Obtención de parámetros de query
    const { id: recordId, name: viewDataName } = useGetParams<ViewQueryParams>({
        [QUERY_PARAMS.VIEW.ID]: (q) => (Number(q)),
        [QUERY_PARAMS.VIEW.NAME]: (q) => (q as keyof typeof VIEW_V2),
    });

    return (
        <ViewDataContext.Provider value={{ viewDataName, recordId, display: 'screen' }}>
            <ModelDataProvider>
                <ViewMode />
            </ModelDataProvider>
        </ViewDataContext.Provider>
    );
};

export default URLDataViewProvider;
