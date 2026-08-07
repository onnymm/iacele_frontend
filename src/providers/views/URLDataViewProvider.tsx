import QUERY_PARAMS from "@/constants/routes/queryParams";
import ViewDataContext from "@/contexts/routes/viewDataContext";
import useGetParams from "@/hooks/routes/useGetParams"
import ModelDataProvider from "./ModelDataProvider";
import VIEW_V2 from "@/views/ViewsV2";
import ViewMode from "@/views/ViewMode";
import useUpdateQueryParams from "@/hooks/viewsV0/useUpdateQueryParams";
import { useCallback } from "react";

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

    // Obtención de función para actualización de parámetros de query
    const { updateQueryParams } = useUpdateQueryParams();

    // Función para redirigir a la URL para visualizar el registro recién creado
    const redirectToNewRecord = useCallback(
        (recordId: number) => {
            // Redireccionamiento a ID creada
            updateQueryParams({
                [QUERY_PARAMS.VIEW.ID]: recordId,
                [QUERY_PARAMS.VIEW.NAME]: viewDataName,
            });
        }, [updateQueryParams, viewDataName]
    );

    return (
        <ViewDataContext.Provider value={{
            viewDataName,
            recordId,
            display: 'screen',
            onCreate: ({ recordId }) => {redirectToNewRecord(recordId)},
            onUpdate: ({ reload }) => {reload()},
        }}>
            <ModelDataProvider>
                <ViewMode />
            </ModelDataProvider>
        </ViewDataContext.Provider>
    );
};

export default URLDataViewProvider;
