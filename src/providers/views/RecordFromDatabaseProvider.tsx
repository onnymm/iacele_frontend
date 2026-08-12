import OriginalRecordContext from "@/contexts/views/originalRecordContext";
import RequiresFieldContext from "@/contexts/views/requiresFieldContext";
import useReadRecordFromAPI from "@/hooks/views/useReadRecordFromAPI";
import CollectFormRequiredFields from "@/views/inspectors/CollectFormRequiredFields";

const RecordFromDatabaseProvider = <M extends IACele.Data.ModelName>({
    children,
}: IACele.Common.SupportsChildren) => {

    const {
        dataFromAPI,
        reload,
        suscribeFieldToRead,
        updateRecordInDatabase,
        deleteRecordInDatabase,
        recordId,
    } = useReadRecordFromAPI<M>();

    // Si los datos desde la API ya fueron cargados...
    return (
        // Contexto para proveer función de registro de campos
        <RequiresFieldContext.Provider value={{
            requiresField: suscribeFieldToRead as () => (void),
        }}>

            {/* Recolección de campos requeridos para leer el registro en el backend */}
            <CollectFormRequiredFields />

            {/* Cuando los datos se carguen... */}
            {dataFromAPI !== null &&
                <OriginalRecordContext.Provider value={{
                    recordId,
                    originalRecord: dataFromAPI,
                    updateOriginalRecord: updateRecordInDatabase,
                    deleteOriginalRecord: deleteRecordInDatabase,
                    reload,
                }}>
                    {children}
                </OriginalRecordContext.Provider>
            }

        </RequiresFieldContext.Provider>
    );
};

export default RecordFromDatabaseProvider;
