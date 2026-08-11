import OriginalRecordsContext from "@/contexts/views/originalRecordsContext";
import RequiresFieldContext from "@/contexts/views/requiresFieldContext";
import useReadRecordsFromAPI from "@/hooks/views/useReadRecordsFromAPI";
import CollectTreeRequiredFields from "@/views/inspectors/CollectTreeRequiredFields";

const RecordsFromDatabaseProvider = <M extends IACeleV2.Data.ModelName>({
    children,
}: IACeleV2.Common.SupportsChildren) => {

    // Obtención de parámetros y funciones para lectura de datos desde la API
    const { dataFromAPI, reload, fieldsToRead, suscribeFieldToRead } = useReadRecordsFromAPI<M>();

    return (
        // Contexto para proveer función de registro de campos
        <RequiresFieldContext.Provider value={{
            requiresField: suscribeFieldToRead as () => (void),
        }}>

            {/* Recolección de campos requeridos para leer el registro en el backend */}
            <CollectTreeRequiredFields />

            {/* Cuando los datos se carguen... */}
            {dataFromAPI !== null &&
                <OriginalRecordsContext.Provider value={{
                    originalRecords: dataFromAPI,
                    reload: reload,
                    fieldsToRead,
                }}>
                    {children}
                </OriginalRecordsContext.Provider>
            }

        </RequiresFieldContext.Provider>
    );
};

export default RecordsFromDatabaseProvider;
