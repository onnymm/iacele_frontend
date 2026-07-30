import OriginalRecordContext from "@/contexts/views/originalRecordContext";
import useReadRecordFromAPI from "@/hooks/views/useReadRecordFromAPI";

const RecordFromDatabaseProvider = <M extends IACeleV2.Data.ModelName>({
    children,
}: IACele.Common.SupportsChildren) => {

    const {
        dataFromAPI,
        // reload,
        // suscribeFieldToRead,
        updateRecordInDatabase,
        deleteRecordInDatabase,
    } = useReadRecordFromAPI<M>();

    // Si los datos desde la API ya fueron cargados...
    if ( dataFromAPI !== null ) {
        return (
            <OriginalRecordContext.Provider value={{
                originalRecord: dataFromAPI,
                updateOriginalRecord: updateRecordInDatabase,
                deleteOriginalRecord: deleteRecordInDatabase,
            }}>
                {children}
            </OriginalRecordContext.Provider>
        );
    };
};

export default RecordFromDatabaseProvider;
