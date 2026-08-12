import RecordInViewContext from "@/contexts/views/recordInViewContext";
import useOriginalRecord from "@/hooks/views/useOriginalRecord";
import { useCallback, useState } from "react";

const RecordInViewProvider = <M extends IACele.Data.ModelName>({
    children,
}: IACele.Common.SupportsChildren) => {

    // Obtención de los datos del registro original desde el contexto
    const { originalRecord } = useOriginalRecord<M>();

    // Inicialización de registro en vista
    const [ recordInView, setRecordInView ] = useState<IACele.Data.RecordForView<M>>(
        () => ({ ...originalRecord } as IACele.Data.RecordForView<M>),
    );

    // Función para deshacer cambios en el registro de vista
    const undoChangesInRecordInView = useCallback(
        () => {
            // Se copia el registro original y se usa para establecer el estado
            setRecordInView({ ...originalRecord } as IACele.Data.RecordForView<M>);
        }, [originalRecord]
    );

    // Inicialización de función para modificar un campo del registro en vista
    const updateRecordInViewField = useCallback(
        <F extends IACele.Data.FieldName<M>>(
            fieldName: F,
            inputValue: IACele.Data.RecordForView<M>[F],
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
