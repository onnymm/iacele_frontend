import RecordInViewContext from "@/contexts/views/recordInViewContext";
import useRecordInView from "@/hooks/views/useRecordInView";

const RecordInViewProvider = <M extends IACeleV2.Data.ModelName>({
    children,
}: IACele.Common.SupportsChildren) => {

    // Obtención del registro en vista y función para modificarlo
    const { recordInView, undoChangesInRecordInView, updateRecordInViewField } = useRecordInView<M>();

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
