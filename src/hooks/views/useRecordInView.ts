import { useCallback, useState } from "react";
import useOriginalRecord from "./useOriginalRecord";

const useRecordInView = <M extends IACeleV2.Data.ModelName>() => {

    // Obtención de los datos del registro original desde el contexto
    const { originalRecord } = useOriginalRecord<M>();

    // Inicialización de registro en vista
    const [ recordInView, setRecordInView ] = useState<IACeleV2.Data.RecordForView<M>>(
        () => ({ ...originalRecord } as IACeleV2.Data.RecordForView<M>),
    );

    // Función para deshacer cambios en el registro de vista
    const undoChangesInRecordInView = useCallback(
        () => {
            // Se copia el registro original y se usa para establecer el estado
            setRecordInView({ ...originalRecord } as IACeleV2.Data.RecordForView<M>);
        }, [originalRecord]
    );

    // Inicialización de función para modificar un campo del registro en vista
    const updateRecordInViewField = useCallback(
        <F extends IACeleV2.Data.FieldName<M>>(
            fieldName: F,
            inputValue: IACeleV2.Data.RecordForView<M>[F],
        ) => {

            // Actualización de valor
            setRecordInView(
                (record) => ({
                    ...record,
                    [fieldName]: inputValue,
                })
            );
        }, []
    );

    return { recordInView, undoChangesInRecordInView, updateRecordInViewField };
};

export default useRecordInView;
