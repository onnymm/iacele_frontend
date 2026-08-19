type RemoveRecordMap = [number, () => (void)];
type RemoveRecordIndex = RemoveRecordMap[];

class RelatedRecords <M extends IACele.Data.ModelName, F extends IACele.Data.FieldName<M>>{

    private fieldName: F;
    private originalRelatedRecords: IACele.Data.RecordForView<M>[];
    private relatedRecords: IACele.Data.RecordForView<M>[];
    private updateRecordInViewField: <F extends IACele.Data.FieldName<M>>(
        fieldName: F,
        inputValue: IACele.Data.RecordForView<M>[],
    ) => (void);
    private updateEditableRecordField: <F extends IACele.Data.FieldName<M>>(
        fieldName: F,
        inputValue: IACele.Data.RelationCommand<M>,
    ) => (void);
    commands: IACele.Data.RelationCommand<M>;
    private removeRecordIndex: RemoveRecordIndex;
    idsIndex: number[];

    constructor (
        fieldName: F,
        relatedRecords: IACele.Data.RecordForView<M>[],
        updateRecordInViewField: <F extends IACele.Data.FieldName<M>>(
            fieldName: F,
            inputValue: IACele.Data.RecordForView<M>[],
        ) => (void),
        updateEditableRecordField: <F extends IACele.Data.FieldName<M>>(
            fieldName: F,
            inputValue: IACele.Data.RelationCommand<M>,
        ) => (void),
    ) {

        // Asignación de valores
        this.fieldName = fieldName;
        this.originalRelatedRecords = [ ...relatedRecords ];
        this.relatedRecords = [ ...relatedRecords ];
        this.updateRecordInViewField = updateRecordInViewField;
        this.updateEditableRecordField = updateEditableRecordField;
        this.commands = {};

        // Inicialización de índice de remoción de registros
        this.removeRecordIndex = this.relatedRecords.map(
            (record) => {
                // Obtención de la ID del registro
                const recordId = record['id'] as number;
                // Inicialización de función para desvincular registro
                const unlink = () => {
                    this.doUnlink(recordId);
                };
                // Construcción de mapeo de remoción de registro
                const removeRecordMap: RemoveRecordMap = [recordId, unlink];

                return (removeRecordMap);
            }
        );

        // Inicialización de índice de IDs
        this.idsIndex = this.getIdsIndex();
    };

    restore = () => {

        this.relatedRecords = [ ...this.originalRelatedRecords ];

        // Inicialización de un nuevo objeto de comandos
        this.commands = {};
        // Actualización del estado de comandos
        this.updateEditableRecordField(this.fieldName, this.commands);

        // Inicialización de índice de remoción de registros
        this.removeRecordIndex = this.relatedRecords.map(
            (record) => {
                // Obtención de la ID del registro
                const recordId = record['id'] as number;
                // Inicialización de función para desvincular registro
                const unlink = () => {
                    this.doUnlink(recordId);
                };
                // Construcción de mapeo de remoción de registro
                const removeRecordMap: RemoveRecordMap = [recordId, unlink];

                return (removeRecordMap);
            }
        );

        // Inicialización de índice de IDs
        this.idsIndex = this.getIdsIndex();
    };

    remove = (recordId: number) => {

        // Obtención del registro a eliminar
        const recordMap = this.removeRecordIndex.find( (rri) => (rri)[0] === recordId ) as RemoveRecordMap ;
        // Obtención de la función de remoción
        const remotionCallback = recordMap[1];
        // Ejecución de la función
        remotionCallback();
    };

    doUnlink = (recordId: number) => {

        // Si el comando no tiene llave...
        if ( this.commands['unlink'] === undefined ) {
            // Inicialización del objeto
            this.commands['unlink'] = [];
        };

        // Se añade la ID del registro a desvincular
        this.commands['unlink'].push(recordId);

        // Actualización de estado con inclusión de registro
        this.exclude(recordId);
    };

    // private include = (record: IACele.Data.RecordForView<M>) => {

    //     // Actualización de array de registros relacionados
    //     this.relatedRecords.push(record);
    //     // Actualición de estados
    //     this.update();
    // };

    private exclude = (recordId: number) => {

        // Actualización de array de registros relacionados
        this.relatedRecords = this.relatedRecords.filter( (existingRecord) => (existingRecord['id'] !== recordId) );
        // Actualición de estados
        this.update();
    };

    private update = () => {

        // Actualición de estados
        this.updateEditableRecordField(this.fieldName, this.commands);
        this.updateRecordInViewField(this.fieldName, this.relatedRecords);
        this.idsIndex = this.getIdsIndex();
    };

    private getIdsIndex = () => {

        // Inicialización del índice de IDs
        const idsIndex = this.relatedRecords.map(
            (record) => {
                // Obtención de la ID de registro
                const recordId = record['id'] as number;

                return recordId;
            }
        );

        return idsIndex;
    };
};

export default RelatedRecords;
