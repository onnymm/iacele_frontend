import { useCallback } from "react";
import useUpdateQueryParams from "./useUpdateQueryParams";
import QUERY_PARAMS from "@/constants/routes/queryParams";

const useOpenRecord = <M extends IACele.Data.ModelName>(
    open: IACele.View.OpenView<M> | undefined,
) => {

    // Obtención de función para actualización de parámetros de query
    const { updateQueryParams } = useUpdateQueryParams();

    // Inicialización de función para abrir un registro en vista de formulario
    const onRowClick = useCallback(
        (record: IACele.Data.RecordForView<M>) => {

            if ( open ) {
                // Redireccionamiento a ID creada
                updateQueryParams({
                    [QUERY_PARAMS.VIEW.ID]: record['id'],
                    [QUERY_PARAMS.VIEW.NAME]: open,
                });
            }
        }, [open, updateQueryParams]
    );

    return { onRowClick };
};

export default useOpenRecord;
