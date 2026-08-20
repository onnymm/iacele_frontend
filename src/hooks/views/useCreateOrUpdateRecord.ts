import { useCallback } from "react";

const useCreateOrUpdateRecord = <M extends IACele.Data.ModelName>() => {

    // Inicialización de función para crear o actualizar registro
    const createOrUpdateRecord = useCallback(
        async (params: IACele.View.Callback.CreateOrUpdateRecord<M>) => {

            // Uso de la función de actualización del registro original
            const response = await params.updateOriginalRecord(params.editableRecord);

            // Si el modo es creación...
            if ( params.createMode ) {
                // Ejecución de función tras creación
                params.onCreate({ recordId: response as number });
            // Si el modo es edición
            } else {
                // Ejecución de función tras modificación
                params.onUpdate({ reload: params.reload });
            };

            return response;
        }, []
    );

    return { createOrUpdateRecord };
};

export default useCreateOrUpdateRecord;
