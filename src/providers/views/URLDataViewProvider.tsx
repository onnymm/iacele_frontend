import QUERY_PARAMS from "@/constants/routes/queryParams";
import ViewDataContext from "@/contexts/routes/viewDataContext";
import useGetParams from "@/hooks/routes/useGetParams"
import RecordFromDatabaseProvider from "./RecordFromDatabaseProvider";
import ModelDataProvider from "./ModelDataProvider";
import RecordInViewProvider from "./RecordInViewProvider";
import EditableRecordProvider from "./EditableRecordProvider";
import VIEW_V2 from "@/views/ViewsV2";

interface ViewQueryParams {
    [QUERY_PARAMS.VIEW.ID]: number;
    [QUERY_PARAMS.VIEW.NAME]: keyof typeof VIEW_V2;
};

const URLDataViewProvider = ({
    children,
}: IACele.Common.SupportsChildren) => {

    // Obtención de parámetros de query
    const { id: recordId, name: viewDataName } = useGetParams<ViewQueryParams>({
        [QUERY_PARAMS.VIEW.ID]: (q) => (Number(q)),
        [QUERY_PARAMS.VIEW.NAME]: (q) => (q as keyof typeof VIEW_V2),
    });

    return (
        <ViewDataContext.Provider value={{ viewDataName, recordId, display: 'screen' }}>
            <ModelDataProvider>
                {/* Aquí debe ir el modo (Lectura o edición) */}
                <RecordFromDatabaseProvider>
                    <RecordInViewProvider>
                    <EditableRecordProvider>
                        {children}
                    </EditableRecordProvider>
                    </RecordInViewProvider>
                </RecordFromDatabaseProvider>
            </ModelDataProvider>
        </ViewDataContext.Provider>
    );
};

export default URLDataViewProvider;
