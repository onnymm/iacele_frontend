import RecordInViewContext from "@/contexts/views/recordInViewContext";
import useOriginalRecord from "@/hooks/views/useOriginalRecord";
import { useCallback, useState } from "react";

const RecordInViewProvider = <M extends IACeleV2.Data.ModelName>({
    children,
}: IACeleV2.Common.SupportsChildren) => {

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

    return (
        <RecordInViewContext.Provider
            value={{
                recordInView,
                updateRecordInViewField: updateRecordInViewField as (() => {}),
                undoChangesInRecordInView,
            }}
        >
            {children}
        </RecordInViewContext.Provider>
    );
};

export default RecordInViewProvider;
