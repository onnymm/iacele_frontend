import RelatedRecords from "@/core/relatedRecords";
import useOriginalRecord from "./useOriginalRecord";
import { useEffect, useState } from "react";
import useRecordEditionParams from "./useRecordEditionParams";

const useRelatedCommands = <M extends IACele.Data.ModelName, F extends IACele.Data.FieldName<M>>(
    fieldName: F,
) => {

    // Obtención de registro original
    const { originalRecord } = useOriginalRecord<M>();
    // Obtención del registro en vista y función para modificación de valor
    const { updateRecordInViewField, updateEditableRecordField, undoChangesSignal } = useRecordEditionParams<M>();
    // Inicialización de índice de IDs existentes en el campo
    const [ idsIndex, setIdsIndex ] = useState<number[]>([]);

    // Inicialización de manejador de registros referenciados
    const [ relatedRecordsManager ] = useState<RelatedRecords<M, F>>(
        () => (
            new RelatedRecords(
                fieldName,
                originalRecord[fieldName] as IACele.Data.RecordForView<M>[],
                updateRecordInViewField as any,
                updateEditableRecordField as any,
                setIdsIndex,
            )
        )
    );

    // Efecto para restaurar propiedades si se detecta que se deshicieron cambios
    useEffect(
        () => {
            relatedRecordsManager.restore(originalRecord[fieldName] as IACele.Data.RecordForView<M>[]);
        }, [fieldName, originalRecord, relatedRecordsManager, undoChangesSignal]
    );

    return { relatedRecordsManager, idsIndex };
};

export default useRelatedCommands;
