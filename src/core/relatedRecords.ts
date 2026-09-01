type RemoveRecordMap = [number, () => (void)];
type RemoveRecordIndex = RemoveRecordMap[];

class RelatedRecords <M extends IACele.Data.ModelName, F extends IACele.Data.FieldName<M>>{

    private fieldName: F;
    private relatedRecords: IACele.Data.RecordForView<M>[];
    private updateRecordInViewField: <F extends IACele.Data.FieldName<M>>(
        fieldName: F,
        inputValue: IACele.Data.RecordForView<M>[],
    ) => (void);
    private updateEditableRecordField: <F extends IACele.Data.FieldName<M>>(
        fieldName: F,
        inputValue: IACele.Data.RelationCommand<M>,
    ) => (void);
    private setIdsIndex: React.Dispatch<React.SetStateAction<number[]>>;
    commands: IACele.Data.RelationCommand<M>;
    private removeRecordIndex: RemoveRecordIndex;
    nextDummyId: number = 0

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
        setIdsIndex: React.Dispatch<React.SetStateAction<number[]>>,
    ) {

        // Asignación de valores
        this.fieldName = fieldName;
        this.relatedRecords = [ ...relatedRecords ];
        this.updateRecordInViewField = updateRecordInViewField;
        this.updateEditableRecordField = updateEditableRecordField;
        this.setIdsIndex = setIdsIndex;
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

        // Actualización de índice de IDs
        this.updateIdsIndex();
    };

    restore = (
        relatedRecords: IACele.Data.RecordForView<M>[],
    ) => {

        // Copia de los registros relacionados proporcionados
        this.relatedRecords = [ ...relatedRecords ];

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

        // Actualización de índice de IDs
        this.updateIdsIndex();
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

        // Actualización de estado con exclusión de registro
        this.exclude(recordId);
    };

    doAdd = (record: IACele.Data.RecordForView<M>) => {

        // Si el comando no tiene llave...
        if ( this.commands['add'] === undefined ) {
            // Inicialización del objeto
            this.commands['add'] = [];
        };

        // Obtención de la ID del registro a añadir
        const recordId = record['id'] as number;

        // Se añade la ID del registro a vincular
        this.commands['add'].push(recordId);

        // Se añade función para deshacer el cambio
        const undoAdd = () => {
            this.undoAdd(recordId);
        };

        // Se añade el comando para deshacer la adición
        this.removeRecordIndex.push([recordId, undoAdd]);

        // Actualización de estado con inclusión de registro
        this.include(record);
    };

    doCreate = (recordForView: IACele.Data.RecordForView<M>, editableRecord: IACele.Data.EditableRecord<M>) => {

        // Creación de ID dummy
        const recordId = this.nextId();

        // Si el comando no tiene llave...
        if ( this.commands['create'] === undefined ) {
            // Inicialización del objeto
            this.commands['create'] = [];
        };

        // Se les asigna la ID dummy a los registros entrantes para poder ser administrados
        recordForView['id'] = recordId as any;
        editableRecord['id'] = recordId as any;

        // Se añade el registro a crear
        this.commands['create'].push(editableRecord);

        // Se crea función para deshacer la creación
        const undoCreate = () => {
            this.undoCreate(recordId);
        };

        // Se añade el comando para deshacer la creación
        this.removeRecordIndex.push([recordId, undoCreate]);

        // Actualización de estado con inclusión de registro
        this.include(recordForView);
    };

    doUpdate = (recordForView: IACele.Data.RecordForView<M>, editableRecord: IACele.Data.EditableRecord<M>) => {

        // Si el registro editable está vacío...
        if ( Object.keys(editableRecord).length === 0 ) {
            // Se termina la ejecución
            return;
        };

        // Obtención de la ID del registro
        const recordId = recordForView['id'] as number;

        // Si el comando no tiene llave...
        if ( this.commands['update'] === undefined ) {
            // Inicialización del objeto
            this.commands['update'] = [];
        };

        // Búsqueda de un objeto de edición con la misma ID
        const alreadyAdded = this.commands['update'].find( ( recordToEdit ) => (recordToEdit[0] === editableRecord['id']) );

        // Si existen datos de edición de este registro...
        if ( alreadyAdded ) {
            // Obtención del índice del objeto
            const index = this.commands['update'].indexOf(alreadyAdded);
            // Reescritura del objeto
            this.commands['update'][index] = [recordId, editableRecord];
            // Actualización de estado con actualización de registro
            this.replace(recordForView);
        // Si no existen datos de edición de este registro...
        } else {
            // Se añaden los datos
            this.commands['update'].push([recordId, editableRecord]);
            // Actualización de estado con inclusión de registro
            this.replace(recordForView);
        };
    };

    private nextId = () => {

        // Decremento del valor de ID dummy
        this.nextDummyId--;

        return this.nextDummyId;
    };

    private undoCreate = (recordId: number) => {

        // Si el comando no tiene llave...
        if ( this.commands['create'] === undefined ) throw TypeError;

        // Exclusión del registro
        this.commands['create'] = this.commands['create'].filter( (recordToCreate) => (recordToCreate['id'] !== recordId) );

        // Si el comando ya no tiene más registros...
        if ( this.commands['create'].length === 0 ) {
            // Se elimina la llave
            delete this.commands['create'];
        };

        // Actualización de estado con exclusión de registro
        this.exclude(recordId);
    };

    private undoAdd = (recordId: number) => {

        // Si el comando no tiene llave...
        if ( this.commands['add'] === undefined ) throw TypeError;

        // Exclusión del registro
        this.commands['add'] = this.commands['add'].filter( (addedRecordId) => (addedRecordId !== recordId) );

        // Si el comando ya no tiene más registros...
        if ( this.commands['add'].length === 0 ) {
            // Se elimina la llave
            delete this.commands['add'];
        };

        // Actualización de estado con exclusión de registro
        this.exclude(recordId);
    };

    private include = (record: IACele.Data.RecordForView<M>) => {

        // Actualización de array de registros relacionados
        this.relatedRecords.push(record);
        // Actualización de estados
        this.update();
    };

    private exclude = (recordId: number) => {

        // Actualización de array de registros relacionados
        this.relatedRecords = this.relatedRecords.filter( (existingRecord) => (existingRecord['id'] !== recordId) );
        // Actualización de estados
        this.update();
    };

    private replace = (record: IACele.Data.RecordForView<M>) => {

        // Búsqueda del registro
        const found = this.relatedRecords.find( (includedRecord) => (includedRecord['id'] === record['id']) ) as IACele.Data.RecordForView<M>;
        // Obtención del índice del registro
        const index = this.relatedRecords.indexOf(found);
        // Reescritura del registro
        this.relatedRecords[index] = record;
        // Actualización de estados
        this.update();
    };

    private update = () => {

        // Actualización de estados
        this.updateEditableRecordField(this.fieldName, this.commands);
        this.updateRecordInViewField(this.fieldName, this.relatedRecords);
        // Actualización de índice de IDs
        this.updateIdsIndex();
    };

    private updateIdsIndex = () => {

        // Inicialización del índice de IDs
        const idsIndex = this.relatedRecords.map(
            (record) => {
                // Obtención de la ID de registro
                const recordId = record['id'] as number;

                return recordId;
            }
        );

        // Cambio de estado de índice de IDs
        this.setIdsIndex(idsIndex);
    };
};

export default RelatedRecords;
