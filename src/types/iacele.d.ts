declare namespace IACele {

    declare namespace Common {

        interface SupportsChildren {
            children: React.ReactNode;
        };

        interface SupportsClasName {
            className: string;
        };

    };

    declare namespace App {

        interface Authentication {
            'access_token': string;
            'token_type': 'bearer';
        };

        interface Me {
            'id': number;
            'name': string;
            'active': boolean;
            'login': string;
            'profile_picture': string | null;
            'role_ids': {
                'id': number;
                'name': string;
                'label': string;
                'group_ids': {
                    'id': number;
                    'name': string;
                    'label': string;
                }[];
            }[];
        };

        interface PageName {
            pageName: string | null;
            setPageName: React.Dispatch<React.SetStateAction<string | null>>;
        };

    };

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

                    type Tree<M extends Data.ModelName> = (
                        & _RequiresModelName<M>
                        & _SupportsSearchCriteria<M>
                        & _SupportsFieldsSelection<M>
                        & _SupportsSorting<M>
                        & _SupportsSlicing
                    );

                    type FieldsMetadata<M extends Data.ModelName> = _RequiresModelName<M>;

                };

            };

            type Action<M extends Data.ModelName> = _Definition.Base.Action<M>;

            type Create<M extends Data.ModelName> = _Definition.Base.Create<M>;

            type SearchRead<M extends Data.ModelName> = _Definition.Base.SearchRead<M>;

            type Update<M extends Data.ModelName> = _Definition.Base.Update<M>;

            type Delete<M extends Data.ModelName> = _Definition.Base.Delete<M>;

            type Form<M extends Data.ModelName> = _Definition.Base.Form<M>;

            type Tree<M extends Data.ModelName> = _Definition.Base.Tree<M>;

            type FieldsMetadata<M extends Data.ModelName> = _Definition.Base.FieldsMetadata<M>;

        };

        declare namespace Response {

            type Action = true;

            type Create = number[];

            type SearchRead<M extends Data.ModelName> = Data.RecordFromDatabase<M>[];

            type Update = true;

            type Delete = true;

            type FieldsMetadata<M extends Data.ModelName> = Data.FieldMetadata<M>[];

            interface Form<M extends Data.ModelName> {
                'name': string;
                'record': Data.RecordFromDatabase<M>;
            };

            interface Tree<M extends Data.ModelName> {
                'count': number;
                'data': Data.RecordFromDatabase<M>[];
                'model_label': string;
            };

        };

        declare namespace Websocket {

            declare namespace _Definition {

                type _Message = (
                    | ['field.created', {}]
                    | ['field.deleted', {}]
                    | ['model.created', {'model': Data.ModelName}]
                    | ['model.deleted', {'model': Data.ModelName}]
                    | ['password.changed']
                    | ['profile.update', {'detail': string}]
                    | ['validation.failed', {'detail': string}]
                    | ['verification.failed', {'detail': string}]
                );

                type Message = {
                    [I in _Message as I[0]]: {
                        'event': I[0];
                        'payload': I[1];
                    };
                };

            };

            type message = _Definition.Message[keyof _Definition.Message];

            type MessageName = keyof _Definition.Message;

            interface EventClientConfig {
                onopen: () => (void);
                onclose: () => (void);
                defaultNotification: (
                    eventName: message['event'],
                    payload: message['payload'],
                ) => (void);
            };

        };

        interface APIError {
            status?: number;
            detail?: string;
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

                type _Serializable = Typing.ScalarOrArray<number | string | boolean | null>;

                type Triplet<M extends ModelName> = [FieldName<M>, ComparisonOperator, _Serializable];

                type CriteriaStructure<M extends ModelName> = (LogicOperator | Triplet<M>)[];

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

                    type Serializable = number | string | boolean | null;

                    type JSONObject = Record<string, Serializable>;

                };

                type JSON = Typing.ScalarOrArray<_JSON.Serializable | _JSON.JSONObject>;

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

            declare namespace _Definition {

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

            };

            interface Mode<I = any, O = I> {
                'view': I;
                'validate': O;
            };

            type BaseTType = {
                [K in _Definition.Operator]: (value: any) => (boolean);
            };

            type RecordValidation<M extends ModelName> = {
                [K in FieldName<M>]: BaseTType;
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

        type ModelDefinition<M extends ModelName = '__'> = _Definition._CommonFieldsProperties & Model[M];

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

        type _ArrayyFieldName<M extends ModelName> = {
            [K in keyof ModelDefinition<M>]: (
                ModelDefinition<M>[K]['ttype'] extends _Definition.ArrayTTypeName
                    ? K
                    : never
            );
        }[keyof ModelDefinition<M>];

        type FieldName<M extends ModelName> = keyof ModelDefinition<M>;

        type _ExpandedRelation<M extends Data.ModelName, F extends Data._ArrayyFieldName<M>> = [
            F,
            Data.FieldName<Data.ModelDefinition<M>[F]['modelName']>[],
        ];

        type ReadField<M extends Data.ModelName> = Data.FieldName<M> | _ExpandedRelation<M, Data._ArrayyFieldName<M>>;

        type CriteriaStructure<M extends ModelName> = _Definition._CriteriaStructure.CriteriaStructure<M>;

        type ComparisonOperator = _Definition._CriteriaStructure.ComparisonOperator;

        type LogicOperator = _Definition._CriteriaStructure.LogicOperator;

        type Triplet<M extends ModelName> = _Definition._CriteriaStructure.Triplet<M>;

    };

    declare namespace UI {

        type Variant = 'info' | 'primary' | 'success' | 'warning' | 'danger' | 'default';

        declare namespace Alert {

            declare namespace _Definition {

                interface AlertDetail {
                    icon: React.FC<Common.SupportsClasName>;
                    variant: Variant;
                    message: string;
                    display: true;
                };

                interface EmptyAlertDetail {
                    icon: null;
                    variant: undefined;
                    message: undefined;
                    display: false;
                };

                interface DetailBody {
                    icon: React.FC<Common.SupportsClasName>;
                    variant: Variant;
                };

                type AlertOptions<O extends string> = {
                    [K in O]: DetailBody;
                };

            };
            
            type Options<O extends string> = _Definition.AlertOptions<O>;
            
            type Detail = _Definition.AlertDetail;
            
            type EmptyDetail = _Definition.EmptyAlertDetail;

            interface Component {
                detail: Detail | EmptyDetail;
                onClose?: () => void;
                canClose?: boolean;
            };

        };

        type DisplayOption = 'screen' | 'window';

    };

    declare namespace View {

        declare namespace _Definition {

            declare namespace PackedParams {

                interface _Base <M extends Data.ModelName>{
                    modelName: M;
                };

                interface _FormDeclaration <M extends Data.ModelName, O extends FieldComponent, I extends string>{
                    type: 'form';
                    View: (component: React.FC<FormStructure<M, O, I>>) => (React.ReactNode);
                };

                interface _TreeDeclaration <M extends Data.ModelName, O extends FieldComponent, I extends string>{
                    type: 'tree';
                    View: (component: React.FC<TreeStructure<M, O, I>>) => (React.ReactNode);
                };

                type PackedParams <M extends Data.ModelName, O extends FieldComponent, I extends string> = (
                    & PackedParams._Base<M>
                    & (
                        | _FormDeclaration<M, O, I>
                        | _TreeDeclaration<M, O, I>
                    )
                );

            };

            type ViewToModelName = {
                'assistance.registry.day.form': 'assistance.registry.day';
                'assistance.registry.event.add.form': 'assistance.registry.event';
                'assistance.registry.event.form': 'assistance.registry.event';
                'assistance.registry.event.correction.form': 'assistance.registry.event.correction';
                'base.users.form': 'base.users';
                'base.users.update.password.form': 'base.users.update.password';
            };

            type OpenView<M extends Data.ModelName> = {
                [K in keyof ViewToModelName]: (
                    ViewToModelName[K] extends M
                    ? K
                    : never
                );
            }[keyof ViewToModelName];

            type BooleanOrConditionalStatement<M extends Data.ModelName> = Data.CriteriaStructure<M> | boolean;

            type _Wizard <M extends Data.ModelName> = {
                [V in keyof ViewToModelName]: {
                    view: V;
                    label: string;
                    decoration?: UI.Variant;
                    contextData?: (ctx: Data.RecordForView<M>) => (Partial<Data.RecordForView<ViewToModelName[V]>>);
                }
            }[keyof ViewToModelName];

            interface FormComponents <M extends Data.ModelName, I extends string>{
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
                    invisible?: BooleanOrConditionalStatement<M>;
                };
                'Sheet': {
                    children: React.ReactNode;
                };
                'Group': {
                    children: React.ReactNode;
                    label?: string;
                    invisible?: BooleanOrConditionalStatement<M>;
                };
                'Wizard': _Wizard<M>;
                'Icon': {
                    invisible?: BooleanOrConditionalStatement<M>;
                    decoration?: _Decoration<M>;
                    icon: I;
                };
            };

            interface TreeComponents <M extends Data.ModelName, O extends FieldComponent, I extends string>{
                'Page': {
                    children: React.ReactNode;
                };
                'Field': _TreeWidgetDistribution<M, O>;
                'List': ListRenderer<M, O, I>;
            };

            interface _ListComponents <M extends Data.ModelName, O extends FieldComponent, I extends string>{
                'Item': {
                    children: React.ReactNode;
                };
                'Leading': {
                    children: React.ReactNode;
                };
                'Title': {
                    children: React.ReactNode;
                };
                'Field': _TreeWidgetDistribution<M, O>;
                'Trailing': {
                    children: React.ReactNode;
                };
                'Icon': {
                    invisible?: BooleanOrConditionalStatement<M>;
                    decoration?: _Decoration<M>;
                    icon: I;
                };
            };

            interface ListComponents <M extends Data.ModelName, O extends FieldComponent, I extends string>{
                'Item': React.FC<_ListComponents<M, O, I>['Item']>;
                'Leading': React.FC<_ListComponents<M, O, I>['Leading']>;
                'Title': React.FC<_ListComponents<M, O, I>['Title']>;
                'Field': React.FC<_ListComponents<M, O, I>['Field']>;
                'Trailing': React.FC<_ListComponents<M, O, I>['Trailing']>;
                'Icon': React.FC<_ListComponents<M, O, I>['Icon']>;
            };

            interface ListRenderer <M extends Data.ModelName, O extends FieldComponent, I extends string>{
                children: (components: ListComponents<M, O, I>) => (React.ReactNode);
            };

            interface _Decoration <M extends Data.ModelName>{
                info?: BooleanOrConditionalStatement<M>;
                primary?: BooleanOrConditionalStatement<M>;
                success?: BooleanOrConditionalStatement<M>;
                warning?: BooleanOrConditionalStatement<M>;
                danger?: BooleanOrConditionalStatement<M>;
            };

            type _FormFieldWidget<
                M extends Data.ModelName,
                F extends Data.FieldName<M>,
                O extends Record<Data.TTypeName, Record<string, () => (React.ReactNode)>>,
            > = {
                name: F;
                widget?: keyof O[Data.ModelDefinition<M>[F]['ttype']];
                invisible?: BooleanOrConditionalStatement<M>;
                readonly?: BooleanOrConditionalStatement<M>;
                domain?: Data.CriteriaStructure<Data.ModelDefinition<M>[F]['modelName']>;
                decoration?: _Decoration<M>;
            };

            interface _TreeFieldWidget <M extends Data.ModelName, F extends Data.FieldName<M>, O extends FieldComponent>{
                name: F;
                widget?: keyof O[Data.ModelDefinition<M>[F]['ttype']];
                decoration?: _Decoration<M>;
                invisible?: BooleanOrConditionalStatement<M>;
            };

            type _TreeWidgetDistribution<
                M extends Data.ModelName,
                O extends FieldComponent,
            > = {
                [F in Data.FieldName<M>]: _TreeFieldWidget<M, F, O>;
            }[Data.FieldName<M>];

            type _FormFieldWidgetDistribution<
                M extends Data.ModelName,
                O extends FieldComponent,
            > = {
                [F in Data.FieldName<M>]: _FormFieldWidget<M, F, O>;
            }[Data.FieldName<M>]

            interface CreateMode {
                createMode: boolean;
            };

        };

        type PackedParams<M extends Data.ModelName, O extends FieldComponent, I extends string> = _Definition.PackedParams.PackedParams<M, O, I>;

        type FormComponents <M extends Data.ModelName, I extends string> = _Definition.FormComponents<M, I>

        type BooleanOrConditionalStatement<M extends Data.ModelName> = _Definition.BooleanOrConditionalStatement<M>;

        interface SupportsInvisibleParams <M extends Data.ModelName>{
            invisible?: BooleanOrConditionalStatement<M>;
        };

        type FieldComponent = Record<Data.TTypeName, Record<string, () => (React.ReactNode)>>;

        type Decoration<M extends Data.ModelName> = _Definition._Decoration<M>;

        type FormFieldComponentProps<
            M extends Data.ModelName,
            O extends FieldComponent
        > = _Definition._FormFieldWidgetDistribution<M, O>;

        type TreeFieldComponentProps<
            M extends Data.ModelName,
            O extends FieldComponent,
        > = _Definition._TreeWidgetDistribution<M, O>;

        type TreeComponents<M extends Data.ModelName, O extends View.FieldComponent, I extends string> = _Definition.TreeComponents<M, O, I>;

        interface _TreeChildren <M extends Data.ModelName, O extends FieldComponent, I extends string>{
            Page: React.FC<TreeComponents<M, O, I>['Page']>;
            Field: React.FC<TreeComponents<M, O, I>['Field']>;
            List: React.FC<TreeComponents<M, O, I>['List']>;
        };

        type OpenView<M extends Data.ModelName> = _Definition.OpenView<M>

        interface TreeStructure <M extends Data.ModelName, O extends FieldComponent, I extends string>{
            children: (components: _TreeChildren<M, O, I>) => (React.ReactNode);
            open?: OpenView<M>;
        };

        type ListComponents<M extends Data.ModelName, O extends FieldComponent, I extends string> = _Definition._ListComponents<M, O, I>;

        interface _FormChildren <M extends Data.ModelName, O extends FieldComponent, I extends string>{
            Page: React.FC<_Definition.FormComponents<M, I>['Page']>;
            Header: React.FC<_Definition.FormComponents<M, I>['Header']>;
            Action: React.FC<_Definition.FormComponents<M, I>['Action']>;
            Sheet: React.FC<_Definition.FormComponents<M, I>['Sheet']>;
            Group: React.FC<_Definition.FormComponents<M, I>['Group']>;
            Field: React.FC<FormFieldComponentProps<M, O>>;
            Wizard: React.FC<_Definition.FormComponents<M, I>['Wizard']>;
            Icon: React.FC<_Definition.FormComponents<M, I>['Icon']>;

        };

        interface FormStructure <M extends Data.ModelName, O extends View.FieldComponent, I extends string>{
            children: (comps: _FormChildren<M, O, I>) => (React.ReactNode);
            create?: boolean;
            readonly?: boolean;
        };

        interface CreateOrUpdateModeParams {
            children: (params: _Definition.CreateMode) => (React.ReactNode);
        };

        interface Many2OneOption {
            'id': number;
            'display_name': string;
        };

        type DurationType = [number, number, number] | [null, null, null];

    };

    declare namespace Context {

        declare namespace ViewContext {

            declare namespace _Definition {

                declare namespace Config {

                    interface Form <M extends Data.ModelName, O extends View.FieldComponent>{
                        type: 'form';
                        View: (component: React.FC<View.FormStructure<M, O>>) => (React.ReactNode);
                    };

                    interface Tree <M extends Data.ModelName, O extends View.FieldComponent>{
                        type: 'tree';
                        View: (component: React.FC<View.TreeStructure<M, O>>) => (React.ReactNode);
                    };

                };

            };

            interface OriginalRecord <M extends Data.ModelName>{
                recordId: number;
                originalRecord: Data.RecordFromDatabase<M>;
                updateOriginalRecord: (recordInEdition: Data.EditableRecord<M>) => Promise<number | true>;
                deleteOriginalRecord: () => Promise<void>;
                reload: () => void;
            };

            interface OriginalRecords <M extends Data.ModelName>{
                originalRecords: Data.RecordFromDatabase<M>[];
                reload: () => (void);
                fieldsToRead: RefObject<IACele.Data.ReadField<M>[]>;
            };

            interface RecordInView <M extends Data.ModelName>{
                recordInView: Data.RecordForView<M>;
                updateRecordInViewField: <F extends Data.FieldName<M>>(
                    fieldName: F,
                    value: Data.RecordForView<M>[F],
                ) => void;
                undoChangesInRecordInView: () => void;
                recomputeRecordInView: () => void;
            };

            interface EditableRecord <M extends Data.ModelName>{
                editableRecord: IACele.Data.EditableRecord<M>;
                undoChangesInEditableRecord: () => (void);
                updateEditableRecordField: <F extends IACele.Data.FieldName<M>>(
                    fieldName: F,
                    inputValue: IACele.Data.RecordForView<M>[F],
                ) => (void);
                saveChanges: () => (Promise<true | number>);
                existingChanges: boolean;
                executeAction: (actionName: string) => Promise<void>;
                createMode: boolean;
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

            type Config<M extends Data.ModelName, O extends View.FieldComponent> = (
                | _Definition.Config.Form<M, O>
                | _Definition.Config.Tree<M, O>
            );

            type SegmentedConfig<M extends Data.ModelName, O extends View.FieldComponent, T extends 'form' | 'tree'> = {
                'form': _Definition.Config.Form<M, O>;
                'tree': _Definition.Config.Tree<M, O>;
            }[T];

            interface RecordEdition <M extends Data.ModelName>{
                recordId: number;
                recordInView: Data.RecordForView<M>;
                existingChanges: boolean;
                undoChanges: () => (void);
                updateRecordField: <F extends Data.FieldName<M>>(
                    fieldName: F,
                    inputValue: Data.RecordForView<M>[F],
                ) => (void);
                saveChanges: () => (Promise<number | true>);
                deleteRecord: () => (Promise<void>);
                executeAction: (actionName: string) => Promise<void>;
                reload: () => (void);
                evaluator: Resource.RecordEvaluator<M>;
                createMode: boolean;
                newRecord: () => (void);
                undoNewRecord: () => (void);
            };

            interface Field <M extends Data.ModelName, O extends View.FieldComponent>{
                params: View.FormFieldComponentProps<M, O>;
                fieldMetadata: IACele.Data.FieldsMetadata<M>[IACele.Data.FieldName<M>];
            };

            interface ContextData <M extends Data.ModelName>{
                contextData: IACele.Data.RecordForView<M>;
            };

            interface FieldConfig <M extends Data.ModelName, O extends View.FieldComponent>{
                fieldConfig: React.RefObject<View.TreeFieldComponentProps<M, O>[]>;
                suscribeFieldConfig: (newConfig: View.TreeFieldComponentProps<M, O>) => (void);
                onRowClick: (record: Data.RecordForView<M>) => (void);
            };

        };

        interface API<O>{
            api: O;
            appLoading: boolean;
            websocketConnected: boolean;
            eventClient: Resource.SyncClient | null;
        };

        interface UserToken {
            userToken: string | null;
            setUserToken: (value: string) => void;
            removeUserToken: () => void;
        };

        interface UserData {
            userData: App.Me;
            setUserData: React.Dispatch<React.SetStateAction<App.Me>>
            removeUserData: () => void;
        };

    };

    declare namespace Provider {

        interface EmptyRecordParams <M extends Data.ModelName> extends IACele.Common.SupportsChildren{
            fieldsToRead: React.RefObject<Data.ReadField<M>[]>;
        };

    };

    declare namespace Resource {

        interface SyncClient {
            on: (
                name: string,
                callback: () => void,
            ) => (() => (void));

            close: () => void;
        };

        interface UserSession {
            setUserToken: (token: string) => void;
            removeUserToken: () => void;
            setAppLoading: (loading: boolean) => void;
            setUserData: (data: App.Me) => void;
            removeUserData: () => void;
        };

        interface RecordEvaluator <M extends Data.ModelName> {
            evaluate: (conditionOrBoolean: boolean | Data.CriteriaStructure<M>) => boolean;
        };

    };

    declare namespace Typing {

        type ScalarOrArray<T> = T | T[];

    };

};
