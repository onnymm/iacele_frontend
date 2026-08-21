import VOID_CALLBACK from "@/constants/app/callbacks";
import OriginalRecordContext from "@/contexts/views/originalRecordContext";
import RequiresFieldContext from "@/contexts/views/requiresFieldContext";
import useModelMetadata from "@/hooks/views/useModelMetadata";
import useSuscribeFieldsToRead from "@/hooks/views/useSuscribeFieldsToRead";
import CollectFormRequiredFields from "@/views/inspectors/CollectFormRequiredFields";
import { useEffect, useMemo, useState } from "react";

const EmptyRelatedRecordProvider = <M extends IACele.Data.ModelName>({
    children,
}: IACele.Common.SupportsChildren) => {

    // Obtención de referencia y función para suscripción de campos a leer
    const { fieldsToRead, suscribeFieldToRead } = useSuscribeFieldsToRead<M>();

    return (
        // Context para proveer función de registro de campos
        <RequiresFieldContext.Provider value={{
            requiresField: suscribeFieldToRead as () => (void),
        }}>

            {/* Recolección de campos requeridos para crear un registros con campos nulos */}
            <CollectFormRequiredFields />

            {/* Proveedor de registro vacío */}
            <InitializeRecordProvider fieldsToRead={fieldsToRead}>
                {children}
            </InitializeRecordProvider>

        </RequiresFieldContext.Provider>
    );
};

export default EmptyRelatedRecordProvider;

const InitializeRecordProvider = <M extends IACele.Data.ModelName>({
    children,
    fieldsToRead,
}: IACele.Provider.EmptyRecordParams<M>) => {

    // Obtención de los metadatos del modelo
    const { modelMetadata } = useModelMetadata<M>();
    // Obtención del contenido de referencia de campos a leer
    const currentFieldsToRead = useMemo(
        () => (fieldsToRead.current), [fieldsToRead]
    );
    // Inicialización de estado de registro vacío
    const [ emptyRecord, setEmptyRecord ] = useState<IACele.Data.RecordFromDatabase<M>>({} as IACele.Data.RecordFromDatabase<M>);

    // Efecto para llenar el registro con valores vacíos una vez que la suscripción de campos a leer ya se llevó a cabo
    useEffect(
        () => {
            setEmptyRecord(
                (record) => {
                    // Obtención de una copia del registro para provocar cambio de referencia en memoria
                    const recordCopy = { ...record };

                    // Iteración por cada referencia de campo suscrito
                    currentFieldsToRead.forEach(
                        (fieldReference) => {
                            // Obtención del nombre del campo de la referencia suscrita
                            const fieldName = (
                                typeof fieldReference === 'object'
                                    ? fieldReference[0]
                                    : fieldReference
                            );
                            // Obtención del ttype del campo
                            const fieldTType = modelMetadata[fieldName].ttype;

                            // Asignación de valor vacío
                            switch ( fieldTType ) {
                                case 'integer':
                                case 'char':
                                case 'boolean':
                                case 'float':
                                case 'date':
                                case 'datetime':
                                case 'time':
                                case 'duration':
                                case 'selection':
                                case 'text':
                                case 'file':
                                case 'many2one':
                                case 'json':
                                    recordCopy[fieldName] = null as any;
                                    break;
                                case 'one2many':
                                case 'many2many':
                                    recordCopy[fieldName] = [] as any;
                                    break;
                            };
                        }
                    );

                    return recordCopy;
                }
            );
        }, [currentFieldsToRead, modelMetadata]
    );

    // Indicador de registro vacío inicializado
    const initializedEmptyRecord = Object.keys(emptyRecord).length > 0;

    // Si el registro vacío ya fue inicializado...
    if ( initializedEmptyRecord ) {
        return (
            <OriginalRecordContext.Provider value={{
                recordId: 0,
                originalRecord: emptyRecord,
                updateOriginalRecord: (VOID_CALLBACK.ASYNC as unknown as () => (Promise<number | true>)),
                deleteOriginalRecord: VOID_CALLBACK.ASYNC,
                reload: VOID_CALLBACK.SYNC,
            }}>
                {children}
            </OriginalRecordContext.Provider>
        );
    };
};
