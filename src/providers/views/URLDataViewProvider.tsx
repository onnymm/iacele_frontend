import QUERY_PARAMS from "@/constants/routes/queryParams";
import ViewDataContext from "@/contexts/routes/viewDataContext";
import useGetParams from "@/hooks/routes/useGetParams"
import ModelDataProvider from "./ModelDataProvider";
import VIEW from "@/views/Views";
import ViewMode from "@/views/ViewMode";
import useUpdateQueryParams from "@/hooks/views/useUpdateQueryParams";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import IndividualRecordViewContext from "@/contexts/views/individualRecordViewContext";

interface ViewQueryParams {
    [QUERY_PARAMS.VIEW.ID]: number;
    [QUERY_PARAMS.VIEW.NAME]: keyof typeof VIEW;
};

const URLDataViewProvider = () => {

    // Obtención de función de navegación
    const navigateTo = useNavigate();

    // Obtención de parámetros de query
    const { id: recordId, name: viewDataName } = useGetParams<ViewQueryParams>({
        [QUERY_PARAMS.VIEW.ID]: (q) => (Number(q)),
        [QUERY_PARAMS.VIEW.NAME]: (q) => (q as keyof typeof VIEW),
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

    // Función para redirigir a URL para crear un registro nuevo
    const newRecord = useCallback(
        () => {
            // Redireccionamiento a vista sin ID
            updateQueryParams({
                [QUERY_PARAMS.VIEW.NAME]: viewDataName,
            });
        }, [updateQueryParams, viewDataName]
    );

    // Función para regresar a la página anterior cuando se deshacen cambios en un registro nuevo
    const undoNewRecord = useCallback(
        () => {
            // Se navega una página atrás
            navigateTo(-1);
        }, [navigateTo]
    );

    return (
        <ViewDataContext.Provider value={{
            viewDataName,
            recordId,
            display: 'screen',
            onCreate: ({ recordId }) => {redirectToNewRecord(recordId)},
            onUpdate: ({ reload }) => {reload()},
            newRecord: newRecord,
            undoNewRecord,
        }}>
            <IndividualRecordViewContext.Provider value={{ canCreate: true, canDelete: true, viewReadonly: true }}>
                <ModelDataProvider>
                    <ViewMode />
                </ModelDataProvider>
            </IndividualRecordViewContext.Provider>
        </ViewDataContext.Provider>
    );
};

export default URLDataViewProvider;
