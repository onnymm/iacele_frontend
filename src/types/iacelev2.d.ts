declare namespace IACeleV2 {

    declare namespace API {

        declare namespace Request {

            declare namespace _Definition {

                interface _RequiresName {
                    name: string;
                };

                interface _RequiresModelName <M extends Data.ModelName>{
                    'model_name': M;
                };

                interface _SupportsSearchCriteria <M extends Data.ModelName>{
                    'criteria_structure'?: Data.CriteriaStructure<M>;
                };

                interface _RequiresRecordIDs {
                    'record_ids': Typing.ScalarOrArray<number>;
                };
                
                interface _RequiresRecordID {
                    'record_id': number;
                };

                interface _RequiersFieldsRead <M extends Data.ModelName>{
                    'fields': Data.ReadField<M>[];
                };

                interface _SupportsFieldsSelection <M extends Data.ModelName>{
                    'fields'?: Data.ReadField<M>[];
                };

                interface _RequiresRecordData <M extends Data.ModelName>{
                    'data': Data.EditableRecord<M>;
                };

                interface _SupportsSorting <M extends Data.ModelName>{
                    'sortby'?: Typing.ScalarOrArray<Data.FieldName<M>>;
                    'ascending'?: Typing.ScalarOrArray<boolean>;
                };

                interface _SupportsSlicing {
                    'offset'?: number;
                    'limit'?: number;
                };

                interface _RequiresRecordsData <M extends Data.ModelName>{
                    'data': Typing.ScalarOrArray<Data.EditableRecord<M>>;
                };

                declare namespace Base {

                    type Action<M extends Data.ModelName> = (
                        & _RequiresModelName<M>
                        & _RequiresName
                        & _RequiresRecordID
                    );

                    type Create<M extends Data.ModelName> = (
                        & _RequiresModelName<M>
                        & _RequiresRecordsData<M>
                    );

                    type SearchRead<M extends Data.ModelName> = (
                        & _RequiresModelName<M>
                        & _SupportsSearchCriteria<M>
                        & _SupportsFieldsSelection<M>
                        & _SupportsSorting<M>
                        & _SupportsSlicing
                    );

                    type Update<M extends Data.ModelName> = (
                        & _RequiresModelName<M>
                        & _RequiresRecordIDs
                        & _RequiresRecordData<M>
                    );

                    type Delete<M extends Data.ModelName> = (
                        & _RequiresModelName<M>
                        & _RequiresRecordIDs
                    );

                    type Form<M extends Data.ModelName> = (
                        & _RequiresModelName<M>
                        & _RequiersFieldsRead<M>
                        & _RequiresRecordIDs
                    );

                };

            };

            type Action<M extends Data.ModelName> = _Definition.Base.Action<M>;

            type Create<M extends Data.ModelName> = _Definition.Base.Create<M>;

            type SearchRead<M extends Data.ModelName> = _Definition.Base.SearchRead<M>;

            type Update<M extends Data.ModelName> = _Definition.Base.Update<M>;

            type Delete<M extends Data.ModelName> = _Definition.Base.Delete<M>;

            type Form<M extends Data.ModelName> = _Definition.Base.Form<M>;

            type FieldsMetadata<M extends Data.ModelName> = _Definition._RequiresModelName<M>;

        };

        declare namespace Response {

            type Action = true;

            type Create = number[];

            type SearchRead<M extends Data.ModelName> = Data.RecordFromDatabase<M>[];

            type Update = true;

            type Delete = true;

            type FieldsMetadata<M extends Data.ModelName> = IACeleV2.Data.FieldMetadata<M>[];

            interface Form<M extends Data.ModelName> {
                'name': string;
                'record': Data.RecordFromDatabase<M>;
            };

        };

    };

    declare namespace Data {

        declare namespace _Definition {

            declare namespace _RelationCommand {

                type Create<M extends ModelName> = EditableRecord<M>[];
                type Update<M extends ModelName> = [number[], EditableRecord<M>];
                type Add = number[];
                type Unlink = number[];
                type Delete = number[];
                type Replace = number[];
                type Clear = [];

            };

            interface _CommonFieldsProperties {
                id: TType.Integer<'not_null'>;
                name: TType.Char;
                create_date: TType.Datetime<'not_null'>;
                update_date: TType.Datetime<'not_null'>;
                create_uid: TType.Many2One<'not_null'>;
                update_uid: TType.Many2One<'not_null'>;
                display_name: TType.Char<'not_null'>;
            };

            type ArrayTTypeName = 'one2many' | 'many2many';

            type RelationCommand<M extends ModelName> = {
                'create'?: _RelationCommand.Create<M>;
                'update'?: _RelationCommand.Update<M>;
                'add'?: _RelationCommand.Add;
                'unlink'?: _RelationCommand.Unlink;
                'delete'?: _RelationCommand.Delete;
                'replace'?: _RelationCommand.Replace;
                'clear'?: _RelationCommand.Clear;
            };

            declare namespace _CriteriaStructure {

                // <M extends ModelName>
                type LogicOperator = '|' | '&';

                type ComparisonOperator = (
                    | '='
                    | '!='
                    | '>'
                    | '<'
                    | '>='
                    | '<='
                    | 'in'
                    | 'not in'
                    | 'ilike'
                    | 'not ilike'
                    | '~'
                    | '~*'
                );

                type Serializable = Typing.ScalarOrArray<number | string | boolean | null>;

                type Triplet<M extends ModelName> = [FieldName<M>, ComparisonOperator, Serializable];

                type CriteriaStructure<M extends ModelName> = (LogicOperator | Triplet<M>)[];

            };

        };

        declare namespace TType {

            declare namespace _Definition {

                type NullityKey = "not_null" | "null_";

                interface _WithNullOption<T>{
                    'null_': T | null;
                    'not_null': T;
                };

                type TTypeName = (
                    | 'integer'
                    | 'char'
                    | 'boolean'
                    | 'float'
                    | 'date'
                    | 'datetime'
                    | 'time'
                    | 'duration'
                    | 'selection'
                    | 'text'
                    | 'file'
                    | 'many2one'
                    | 'one2many'
                    | 'many2many'
                    | 'json'
                );

                interface ShapeVariant<N extends _Definition.NullityKey, D, V, E, T extends TTypeName, C = V, M extends ModelName = null> {
                    'ttype': T,
                    'database': _WithNullOption<D>[N];
                    'view': _WithNullOption<V>[N];
                    'edition': _WithNullOption<E>[N];
                    'validate': _WithNullOption<C>[N];
                    'modelName': M;
                };

                declare namespace _JSON {

                    type _Serializable = number | string | boolean | null;
                    type _JSONObject = Record<string, _Serializable>;
                };

                type JSON = Typing.ScalarOrArray<_JSON._Serializable | _JSON._JSONObject>;

            };

            type Integer<N extends _Definition.NullityKey = 'null_'> = _Definition.ShapeVariant<N, number, number, number, 'integer'>;
            type Char<N extends _Definition.NullityKey = 'null_'> = _Definition.ShapeVariant<N, string, string, string, 'char'>;
            type Boolean<N extends _Definition.NullityKey = 'null_'> = _Definition.ShapeVariant<N, boolean, boolean, boolean, 'boolean'>;
            type Float<N extends _Definition.NullityKey = 'null_'> = _Definition.ShapeVariant<N, number, number, number, 'float'>;
            type Date<N extends _Definition.NullityKey = 'null_'> = _Definition.ShapeVariant<N, string, string, string, 'date'>;
            type Datetime<N extends _Definition.NullityKey = 'null_'> = _Definition.ShapeVariant<N, string, string, string, 'datetime'>;
            type Time<N extends _Definition.NullityKey = 'null_'> = _Definition.ShapeVariant<N, string, string, string, 'time'>;
            type Duration<N extends _Definition.NullityKey = 'null_'> = _Definition.ShapeVariant<N, string, string, string, 'duration'>;
            type Selection<O extends string, N extends _Definition.NullityKey = 'null_'> = _Definition.ShapeVariant<N, O, O, O, 'selection'>;
            type Text<N extends _Definition.NullityKey = 'null_'> = _Definition.ShapeVariant<N, string, string, string, 'text'>;
            type File<N extends _Definition.NullityKey = 'null_'> = _Definition.ShapeVariant<N, string, string, string, 'file'>;
            type Many2One<N extends _Definition.NullityKey = 'null_'> = _Definition.ShapeVariant<N, [number, string], [number, string], number, 'many2one', number>;
            type One2Many<M extends ModelName = '__'> = _Definition.ShapeVariant<'not_null', ModelDefinition<M>[], ModelDefinition<M>[], RelationCommand<M>, 'one2many', number[], M>
            type Many2Many<M extends ModelName = '__'> = _Definition.ShapeVariant<'not_null', ModelDefinition<M>[], ModelDefinition<M>[], RelationCommand<M>, 'many2many', number[], M>
            type JSON = _Definition.ShapeVariant<'not_null', _Definition.JSON, _Definition.JSON, _Definition.JSON, 'json'>;

        };

        declare namespace Validator {

            interface Mode<I = any, O = I> {
                'view': I;
                'validate': O;
            };

            type Operator = (
                | 'equals'
                | 'notEqual'
                | 'gt'
                | 'lt'
                | 'ge'
                | 'le'
                | 'isin'
                | 'notIn'
                | 'ilike'
                | 'notIlike'
                | 'regex'
                | 'regexI'
            );

            type BaseTType = {
                [K in IACeleV2.Data.Validator.Operator]: (value: any) => (boolean);
            };

            type RecordValidation<M extends IACeleV2.Data.ModelName> = {
                [K in IACeleV2.Data.FieldName<M>]: IACeleV2.Data.Validator.BaseTType;
            };

        };

        interface Model {

            '__': {};

            'base.model': {
                state: TType.Selection<'base' | 'generic', 'not_null'>;
                label: TType.Char;
                model: TType.Char;
                has_sequence: TType.Boolean<'not_null'>;
                is_archivable: TType.Boolean<'not_null'>;
                has_label: TType.Boolean<'not_null'>;
                description: TType.Text;
                transient: TType.Boolean<'not_null'>;
                field_ids: TType.One2Many<'base.model.field'>;
                related_field_ids: TType.One2Many<'base.model.field'>;
            };

            'base.model.field': {
                state: TType.Selection<'base' | 'generic', 'not_null'>;
                label: TType.Char<'not_null'>;
                model_id: TType.Many2One<'not_null'>;
                ttype: TType.Selection<TTypeName, 'not_null'>;
                nullable: TType.Boolean<'not_null'>;
                on_delete: TType.Selection<'cascade' | 'restrict' | 'set_null'>;
                is_required: TType.Boolean<'not_null'>;
                readonly: TType.Boolean<'not_null'>;
                default_value: TType.JSON;
                unique: TType.Boolean<'not_null'>;
                help_info: TType.Text;
                related_model_id: TType.Many2One;
                related_field: TType.Char;
                is_computed: TType.Boolean<'not_null'>;
                selection_ids: TType.One2Many<'base.model.field.selection'>;
            };

            'base.model.field.selection': {
                label: TType.Char<'not_null'>;
                field_id: TType.Many2One<'not_null'>;
            };

            'base.users': {
                active: TType.Boolean<'not_null'>;
                login: TType.Char<'not_null'>;
                password: TType.Char<'not_null'>;
                profile_picture: TType.File;
                role_ids: TType.Many2Many<'base.users.role'>;
            };

            'base.users.role': {
                label: TType.Char<'not_null'>;
                group_ids: TType.Many2Many<'base.user.groups'>;
            };

            'base.user.groups': {
                label: TType.Char<'not_null'>;
                access_id: TType.One2Many<'base.user.access'>;
            };

            'base.user.access': {
                model_id: TType.Many2One<'not_null'>;
                perm_create: TType.Boolean<'not_null'>;
                perm_read: TType.Boolean<'not_null'>;
                perm_update: TType.Boolean<'not_null'>;
                perm_delete: TType.Boolean<'not_null'>;
                group_id: TType.Many2One<'not_null'>;
            };

            'base.users.update.password': {
                current_password: TType.Char;
                new_password: TType.Char;
                confirm_password: TType.Char;
            };

            'base.model.data': {
                model_name: TType.Char<'not_null'>;
                res_id: TType.Integer<'not_null'>;
            };

            'base.model.data.process': {
                step_ids: TType.One2Many<'base.model.data.process.step'>;
            };

            'base.model.data.process.step': {
                sequence: TType.Integer<'not_null'>;
                process_id: TType.Many2One<'not_null'>;
                model_name: TType.Char<'not_null'>;
                record_data_ids: TType.One2Many<'base.model.data.process.step.record'>;
            };

            'base.model.data.process.step.record': {
                step_id: TType.Many2One<'not_null'>;
                data: TType.JSON;
            };

            'location.warehouse': {
                short_name: TType.Char<'not_null'>;
                location_number: TType.Integer<'not_null'>;
            };

            'resource.device.type': {};

            'schedule.week': {
                weekday: TType.Selection<'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday', 'not_null'>;
                start_time: TType.Time<'not_null'>;
                end_time: TType.Time<'not_null'>;
            };

            'model.sync': {
                last_sync: TType.Datetime<'not_null'>;
                model_id: TType.Many2One<'not_null'>;
            };

            'resource.device': {
                model: TType.Char;
                brand: TType.Char;
                serial_number: TType.Char;
                firmware_version: TType.Char;
                type_id: TType.Many2One<'not_null'>;
                location_id: TType.Many2One;
            };

            'hr.employee': {
                active: TType.Boolean<'not_null'>;
                odoo_id: TType.Integer;
                hire_date: TType.Date;
                location_id: TType.Many2One;
                user_id: TType.Many2One;
            };

            'schedule.week.offset': {
                employee_id: TType.Many2One<'not_null'>;
                start_offset: TType.Duration<'not_null'>;
                end_offset: TType.Duration<'not_null'>;
                weekday: TType.Selection<'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday', 'not_null'>;
            };

            'assistance.registry.day': {
                date: TType.Date<'not_null'>;
                employee_id: TType.Many2One<'not_null'>;
                schedule_id: TType.Many2One;
                offset_id: TType.Many2One;
                event_ids: TType.One2Many<'assistance.registry.event'>;
                start_time: TType.Time;
                end_time: TType.Time;
                lunch_time: TType.Duration;
                weekday: TType.Char;
                allowed_start: TType.Time;
                allowed_end: TType.Time;
                late_start: TType.Duration;
                early_end: TType.Duration;
                is_complete: TType.Boolean;
                has_valid_events: TType.Boolean;
            };

            'assistance.registry.event': {
                employee_id: TType.Many2One<'not_null'>;
                original_registry_time: TType.Datetime<'not_null'>;
                original_status: TType.Selection<'undefined', 'check_in', 'break_out', 'break_in', 'check_out'>;
                device_id: TType.Many2One;
                from_api: TType.Boolean<'not_null'>;
                registry_time_correction: TType.Datetime;
                status_correction: TType.Selection<'null', 'undefined', 'check_in', 'break_out', 'break_in', 'check_out'>;
                day_id: TType.Many2One;
                registry_time: TType.Datetime;
                status: TType.Selection<'null', 'undefined', 'check_in', 'break_out', 'break_in', 'check_out'>;
                has_corrections: TType.Boolean<'not_null'>;
                correction_history_ids: TType.One2Many<'assistance.registry.event.correction.historial'>;
            };

            'assistance.registry.event.correction.historial': {
                event_id: TType.Many2One<'not_null'>;
                move_type: TType.Selection<'correction' | 'undo', 'not_null'>;
                new_status: TType.Selection<'null', 'undefined', 'check_in', 'break_out', 'break_in', 'check_out'>;
                new_registry_time: TType.Datetime;
            };

            'assistance.registry.event.correction': {
                event_id: TType.Many2One<'not_null'>;
                status: TType.Selection<'null', 'undefined', 'check_in', 'break_out', 'break_in', 'check_out'>;
                registry_time: TType.Datetime;
            };

            'assistance.registry.event.credentials': {
                token: TType.Char<'not_null'>;
                cookie_uuid: TType.Char<'not_null'>;
                site_id: TType.Char<'not_null'>;
            };

        };

        type ModelName = keyof Model;

        type TTypeName = TType._Definition.TTypeName;

        interface FieldMetadata <M extends ModelName>{
            id: number;
            name: FieldName<M>;
            label: string;
            ttype: TType._Definition.TTypeName;
            help_info: string;
            related_model: ModelName;
            selection_ids: {
                id: number;
                name: string;
                label: string;
            }[];
            readonly: boolean;
            is_computed: boolean;
        };

        type FieldsMetadata<M extends ModelName> = Record<FieldName<M>, FieldMetadata<M>>

        type ModelsMetadata<M extends ModelName> = Partial<Record<ModelName, FieldsMetadata<M>>>

        type ModelDefinition<M extends ModelName> = _Definition._CommonFieldsProperties & Model[M];

        type RecordFromDatabase<M extends ModelName> = {
            [K in keyof ModelDefinition<M>]: (
                ModelDefinition<M>[K]['ttype'] extends _Definition.ArrayTTypeName
                    ? RecordFromDatabase<ModelDefinition<M>[K]['modelName']>[]
                    : ModelDefinition<M>[K]['database']
            );
        };

        type EditableRecord<M extends ModelName> = {
            [K in keyof ModelDefinition<M>]?: (
                ModelDefinition<M>[K]['ttype'] extends _Definition.ArrayTTypeName
                    ? RelationCommand<ModelDefinition<M>[K]['modelName']>
                    : ModelDefinition<M>[K]['edition']
            );
        };

        type RecordForView<M extends ModelName = '__'> = {
            [K in keyof ModelDefinition<M>]: (
                ModelDefinition<M>[K]['ttype'] extends _Definition.ArrayTTypeName
                    ? RelationCommand<ModelDefinition<M>[K]['modelName']>
                    : ModelDefinition<M>[K]['view']
            );
        };

        type RelationCommand<M extends ModelName = '__'> = _Definition.RelationCommand<M>

        type ScalarFieldName<M extends ModelName> = {
            [K in keyof ModelDefinition<M>]: (
                ModelDefinition<M>[K]['ttype'] extends _Definition.ArrayTTypeName
                    ? never
                    : K
            );
        }[keyof ModelDefinition<M>];

        type ArrayyFieldName<M extends ModelName> = {
            [K in keyof ModelDefinition<M>]: (
                ModelDefinition<M>[K]['ttype'] extends _Definition.ArrayTTypeName
                    ? K
                    : never
            );
        }[keyof ModelDefinition<M>];

        type FieldName<M extends ModelName> = keyof ModelDefinition<M>;

        type TTypeField<M extends ModelName, L extends TType._Definition.TTypeName> = {
            [K in keyof ModelDefinition<M>]: (
                ModelDefinition<M>[K]['ttype'] extends L
                    ? K
                    : never
            )
        }[keyof ModelDefinition<M>];

        type ExpandedRelation<M extends Data.ModelName, F extends Data.ArrayyFieldName<M>> = [
            F,
            Data.FieldName<Data.ModelDefinition<M>[F]['modelName']>[],
        ];

        type ReadField<M extends Data.ModelName> = Data.FieldName<M> | ExpandedRelation<M, Data.ArrayyFieldName<M>>;

        type CriteriaStructure<M extends ModelName> = _Definition._CriteriaStructure.CriteriaStructure<M>;

        type ComparisonOperator = _Definition._CriteriaStructure.ComparisonOperator;

        type LogicOperator = _Definition._CriteriaStructure.LogicOperator;

        type Triplet<M extends ModelName> = _Definition._CriteriaStructure.Triplet<M>;

    };

    declare namespace UI {

        type Variant = 'info' | 'primary' | 'success' | 'warning' | 'danger' | 'default';

    };

    declare namespace View {

        declare namespace _Definition {

            declare namespace FieldVariant {

                interface CommonField <M extends Data.ModelName, F extends Data.FieldName<M>>{
                    name: F;
                    readonly?: boolean;
                    invisible?: BooeanOrConditionalStatement<M>;
                };

                interface ScalarField <M extends Data.ModelName, F extends Data.FieldName<M>> extends CommonField<M, F>{
                    domain?: [];
                };

                interface ArrayField <M extends Data.ModelName, F extends Data.ArrayyFieldName<M>> extends CommonField<M, F>{
                    domain?: Data.CriteriaStructure<Data.ModelDefinition<M>[F]['modelName']>;
                };

                type FieldVariant<M extends Data.ModelName, F extends Data.FieldName<M>> = (
                    F extends Data.ArrayyFieldName<M>
                        ? ArrayField<M, F>
                        : ScalarField<M, Data.FieldName<M>>
                );

            };

            type BooeanOrConditionalStatement<M extends Data.ModelName> = Data.CriteriaStructure<M> | boolean;

        };

        type BooeanOrConditionalStatement<M extends Data.ModelName> = _Definition.BooeanOrConditionalStatement<M>;

        interface SupportsInvisibleParams <M extends Data.ModelName>{
            invisible?: BooeanOrConditionalStatement<M>;
        };

        interface FormComponents <M extends Data.ModelName>{
            'Page': {
                children: React.ReactNode;
            };
            'Header': {
                children: React.ReactNode;
            };
            'Action': {
                name: string;
                label: string;
                decoration?: UI.Variant;
                invisible?: BooeanOrConditionalStatement<M>;
            };
            'Sheet': {
                children: React.ReactNode;
            };
            'Group': {
                children: React.ReactNode;
                label: string;
                invisible?: BooeanOrConditionalStatement<M>;
            };
            'Field': FieldVariant<M, Data.FieldName<M>>;
        };

        type FieldVariant<
            M extends Data.ModelName,
            F extends Data.FieldName<M>,
        > = _Definition.FieldVariant.FieldVariant<M, F>;

        interface FormChildren <M extends Data.ModelName>{
            Page: React.FC<FormComponents<M>['Page']>;
            Header: React.FC<FormComponents<M>['Header']>;
            Action: React.FC<FormComponents<M>['Action']>;
            Sheet: React.FC<FormComponents<M>['Sheet']>;
            Group: React.FC<FormComponents<M>['Group']>;
            Field: React.FC<FormComponents<M>['Field']>;
        };

        interface FormStructure <M extends Data.ModelName>{
            children: (components: View.FormChildren<M>) => React.ReactElement;
        };

    };

    declare namespace Context {

        declare namespace View {

            interface OriginalRecord <M extends Data.ModelName>{
                recordId: number;
                originalRecord: Data.RecordFromDatabase<M>;
                updateOriginalRecord: (recordInEdition: Data.EditableRecord<M>) => Promise<void>;
                deleteOriginalRecord: () => Promise<void>;
                reload: () => void;
            };

            interface RecordInView <M extends Data.ModelName>{
                recordInView: Data.RecordForView<M>;
                updateRecordInViewField: <F extends Data.FieldName<M>>(
                    fieldName: F,
                    value: Data.RecordForView<M>[F],
                ) => void;
                undoChangesInRecordInView: () => void;
            };

            interface EditableRecord <M extends Data.ModelName>{
                editableRecord: IACeleV2.Data.EditableRecord<M>;
                undoChangesInEditableRecord: () => (void);
                updateEditableRecordField: <F extends IACeleV2.Data.FieldName<M>>(
                    fieldName: F,
                    inputValue: IACeleV2.Data.RecordForView<M>[F],
                ) => (void);
                updateRecord: () => Promise<void>;
                existingChanges: boolean;
                executeAction: (actionName: string) => Promise<void>;
            };

            interface ModelsMetadata <M extends Data.ModelName>{
                modelsMetadata: Data.ModelsMetadata<M>;
                getFieldsMetadata: <M extends keyof Data.Model>(modelName: M) => Promise<void>;
            };

            interface ModelMetadata <M extends Data.ModelName>{
                modelMetadata: Data.FieldsMetadata<M>;
            };

            interface RequiresField <M extends Data.ModelName>{
                requiresField: (fieldName: Data.ReadField<M>) => void;
            };

            interface Config <M extends Data.ModelName>{
                type: 'form';
                View: (component: React.FC<IACeleV2.View.FormStructure<M>>) => (React.ReactNode);
            };

            interface RecordEdition <M extends Data.ModelName>{
                recordId: number;
                recordInView: Data.RecordForView<M>;
                existingChanges: boolean;
                undoChanges: () => (void);
                updateRecordField: <F extends Data.FieldName<M>>(
                    fieldName: F,
                    inputValue: Data.RecordForView<M>[F],
                ) => (void);
                updateRecord: () => (Promise<void>);
                deleteRecord: () => (Promise<void>);
                executeAction: (actionName: string) => Promise<void>;
                reload: () => (void),
                evaluator: Resource.RecordEvaluator<M>,
            };

            interface Field <M extends Data.ModelName, O extends IACeleV2.View.FieldComponent>{
                params: IACeleV2.View.FieldComponentProps<M, O>;
                fieldMetadata: IACeleV2.Data.FieldsMetadata<M>[IACeleV2.Data.FieldName<M>];
            };

        };

    };

    declare namespace Provider {

        interface EmptyRecordParams <M extends Data.ModelName> extends IACele.Common.SupportsChildren{
            fieldsToRead: React.RefObject<Data.ReadField<M>[]>;
        };

    };

    declare namespace Resource {

        interface RecordEvaluator <M extends IACeleV2.Data.ModelName> {
            evaluate: (conditionOrBoolean: boolean | IACeleV2.Data.CriteriaStructure<M>) => boolean;
        };

    };

    declare namespace Typing {

        type ScalarOrArray<T> = T | T[];

    };

};
