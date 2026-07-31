import OriginalRecordContext from "@/contexts/views/originalRecordContext";
import RequiresFieldContext from "@/contexts/views/requiresFieldContext";
import useReadRecordFromAPI from "@/hooks/views/useReadRecordFromAPI";
import useViewData from "@/hooks/views/useViewData";
import FormViewInspector from "@/views/inspectors/FormViewInspector";

const RecordFromDatabaseProvider = <M extends IACeleV2.Data.ModelName>({
    children,
}: IACele.Common.SupportsChildren) => {

    const {
        dataFromAPI,
        // reload,
        suscribeFieldToRead,
        updateRecordInDatabase,
        deleteRecordInDatabase,
    } = useReadRecordFromAPI<M>();

    // Si los datos desde la API ya fueron cargados...
    return (
        // Contexto para proveer función de registro de campos
        <RequiresFieldContext.Provider value={{
            requiresField: suscribeFieldToRead as () => (void),
        }}>

            {/* Recolección de campos requeridos para leer el registro en el backend */}
            <CollectRequiredFields />

            {/* Cuando los datos se carguen... */}
            {dataFromAPI !== null &&
                <OriginalRecordContext.Provider value={{
                    originalRecord: dataFromAPI,
                    updateOriginalRecord: updateRecordInDatabase,
                    deleteOriginalRecord: deleteRecordInDatabase,
                }}>
                    {children}
                </OriginalRecordContext.Provider>
            }

        </RequiresFieldContext.Provider>
    );
};

export default RecordFromDatabaseProvider;

const CollectRequiredFields = () => {

    // Obtención de la declaración de la vista
    const { View } = useViewData();

    return View(FormViewInspector);
};
