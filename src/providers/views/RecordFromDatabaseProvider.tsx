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

    // Obtención de la declaración de la vista
    const { View } = useViewData();

    // Si los datos desde la API ya fueron cargados...
    return (
        // Contexto para proveer función de registro de campos
        <RequiresFieldContext.Provider value={{
            requiresField: suscribeFieldToRead as () => (void),
        }}>

            {/* Recolección de campos requeridos para leer el registro en el backend */}
            <CollectRequiredFields view={View} />

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

interface ColectRequiredFieldsParams <M extends IACeleV2.Data.ModelName>{
    view: (component: React.FC<IACeleV2.View.FormStructure<M>>) => (React.ReactNode);
};

const CollectRequiredFields = <M extends IACeleV2.Data.ModelName>({
    view,
}: ColectRequiredFieldsParams<M>) => {

    return view(FormViewInspector);
};
