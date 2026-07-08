declare namespace IACele {

    declare namespace Typing {

        type ScalarOrArray<T> = T | T[];

    };

    declare namespace Common {

        interface SupportsChildren {
            children: React.ReactNode;
        };

        interface SupportsClasName {
            className: string;
        };

    };

    declare namespace Application {

        interface PageName {
            pageName: string | null;
            setPageName: React.Dispatch<React.SetStateAction<string | null>>;
        };

        type ModelsMetadata = Partial<Record<IACele.Data.ModelName, IACele.Data.Shape.FieldsMetadata[]>>;

    };

    declare namespace API {

        declare namespace Request {

            declare namespace _Definition {

                interface RequiresName {
                    name: string;
                };

                interface _RequiresModelName<M extends Data.ModelName> {
                    'model_name': M;
                };

                interface _SupportsSearchCriteria<M extends Data.ModelName> {
                    'search_criteria'?: Data.CriteriaStructure<M>;
                };

                interface _RequiresFieldsSelection<M extends Data.ModelName> {
                    'fields'?: Data.FieldsSelection<M>;
                };

                interface _RequiresRecordID {
                    'record_id': number;
                };

                interface _RequiresRecordIDs {
                    'record_ids': IACele.Typing.ScalarOrArray<number>;
                };

                interface _RequiresRecordsData <M extends Data.ModelName>{
                    'data': Typing.ScalarOrArray<Partial<Data.ModelDefinition<M>>>;
                };

                interface _RequiresRecordData <M extends Data.ModelName>{
                    'data': Partial<Data.ModelDefinition<M>>;
                };

                interface _SupportsSorting <M extends Data.ModelName>{
                    'sortby'?: Typing.ScalarOrArray<Data.FieldName<M>>;
                    'ascending'?: Typing.ScalarOrArray<boolean>;
                };

                interface _SupportsSlicing {
                    'offset'?: number;
                    'limit'?: number;
                };

                declare namespace Base {

                    type Action<M extends Data.ModelName> = (
                        & _RequiresModelName<M>
                        & _RequiresRecordID
                        & RequiresName
                    );

                    type Create<M extends Data.ModelName> = (
                        & _RequiresModelName<M>
                        & _RequiresRecordsData<M>
                    );

                    type Read<M extends Data.ModelName> = (
                        & _RequiresModelName<M>
                        & _RequiresRecordIDs
                        & _RequiresFieldsSelection<M>
                    );

                    type SearchRead<M extends Data.ModelName> = (
                        & _RequiresModelName<M>
                        & _SupportsSearchCriteria<M>
                        & _RequiresFieldsSelection<M>
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

                    type Tree<M extends Data.ModelName> = (
                        & _RequiresModelName<M>
                        & _RequiresFieldsSelection<M>
                    );

                    type Form<M extends Data.ModelName> = (
                        & _RequiresModelName<M>
                        & _RequiresFieldsSelection<M>
                    );

                };

            };

            type FieldsMetadata<M extends Data.ModelName> = _Definition._RequiresModelName<M>;

            type Action<M extends Data.ModelName> = _Definition.Base.Action<M>;

            type Create<M extends Data.ModelName> = _Definition.Base.Create<M>;

            type Read<M extends Data.ModelName> = _Definition.Base.Read<M>;

            type SearchRead<M extends Data.ModelName> = _Definition.Base.SearchRead<M>;

            type Update<M extends Data.ModelName> = _Definition.Base.Update<M>;

            type Delete<M extends Data.ModelName> = _Definition.Base.Delete<M>;

            interface Tree<M extends Data.ModelName> extends _Definition.Base.Tree<M> {
                'limit': number;
            };

            interface Form<M extends Data.ModelName> extends _Definition.Base.Form<M> {
                'record_ids': number;
            };

        };

        declare namespace Response {

            type FieldsMetadata = IACele.Data.Shape.FieldsMetadata[];

            type Action = true;

            type Create = number[];

            type Read<M extends Data.ModelName> = Data.ModelDefinition<M>[];

            type SearchRead<M extends Data.ModelName> = Data.ModelDefinition<M>[]

            type Update = true;

            type Delete = true;

            interface Tree<M extends Data.ModelName> {
                'count': number;
                'data': Data.ModelDefinition<M>[];
                'model_label': string;
            };

            interface Form<M extends Data.ModelName> {
                'record': Data.ModelDefinition<M>;
                'name': string;
            };

        };

    };

    declare namespace Data {

        type RelatedFieldFieldsSelection<M extends ModelName> = [ FieldName<M>, string[] ];

        type FieldsSelection<M extends ModelName> = (
            | FieldName<M>
            | RelatedFieldFieldsSelection<M>
        )[];

        declare namespace Shape {

            interface FieldsMetadata {
                id: TTypeV2.Integer['db'];
                name: TTypeV2.Char['db'];
                label: TTypeV2.Char['db'];
                ttype: TTypeV2.Selection<TTypeName>['db'];
                help_info: TTypeV2.Char['db'];
                related_model: ModelName;
                selection_ids: {
                    id: TTypeV2.Integer['db'];
                    name: TTypeV2.Char['db'];
                    label: TTypeV2.Char['db'];
                }[];
                readonly: TTypeV2.Boolean['db'];
                is_computed: TTypeV2.Boolean['db'];
            };

        };

        type ModelName = keyof Model<'db'>;

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

        type NullityKey = "not_null" | "null_";

        interface _WithNullOption<T>{
            'null_': T | null;
            'not_null': T;
        };

        declare namespace _JSON {

            type _Serializable = number | string | boolean | null;
            type _JSONObject = Record<string, _Serializable>
            type _ScalarOrArray<T> = T | T[]
            type JSON = _ScalarOrArray<(_Serializable | _JSONObject)>

        };

        declare namespace TType {

            type Integer<N extends NullityKey = 'null_'> = _WithNullOption<number>[N];
            type Char<N extends NullityKey = 'null_'> = _WithNullOption<string>[N];
            type Boolean<N extends NullityKey = 'null_'> = _WithNullOption<boolean>[N];
            type Float<N extends NullityKey = 'null_'> = _WithNullOption<number>[N];
            type Date<N extends NullityKey = 'null_'> = _WithNullOption<string>[N];
            type Datetime<N extends NullityKey = 'null_'> = _WithNullOption<string>[N];
            type Time<N extends NullityKey = 'null_'> = _WithNullOption<string>[N];
            type Duration<N extends NullityKey = 'null_'> = _WithNullOption<string>[N];
            type Selection<O extends string, N extends NullityKey = 'null_'> = _WithNullOption<O>[N];
            type Text<N extends NullityKey = 'null_'> = _WithNullOption<string>[N];
            type File<N extends NullityKey = 'null_'> = _WithNullOption<string>[N];
            type Many2One<N extends NullityKey = 'null_'> = _WithNullOption<[number, string]>[N];
            type One2Many<V extends _ArrayTTypeVariantOption = 'ids'> = _ArrayTTypeVariant[V][];
            type Many2Many<V extends _ArrayTTypeVariantOption = 'ids'> = _ArrayTTypeVariant[V][];
            type JSON<N extends NullityKey = 'null_'> = _WithNullOption<_JSON.JSON>[N];

        };

        declare namespace TTypeV2 {

            interface _Definition <
                DB,
                T extends TTypeName,
                V = DB,
                M extends ModelName = null,
                S = V,
            >{
                ttype: T;
                db: DB;
                view: V;
                send: S;
                modelName: M;
            };

            type FieldTType<M extends ModelName, V extends ViewType, T extends TTypeName> = {
                [K in keyof ModelDefinition<M, V>]: ModelDefinition<M, V>[K]['ttype'] extends T ? K : never
            }[keyof ModelDefinition<M, V>];

            type KeepOrDiscard<M extends ModelName, V extends ViewType, K, T extends TTypeName> = K extends FieldTType<M, V, T> ? never : K

            type WithoutRelated<M extends ModelName, V extends ViewType> = {
                [K in keyof ModelDefinition<M, V> as KeepOrDiscard<M, V, K, 'one2many' | 'many2many'>]: (
                    ModelDefinition<M, V>[K][V]
                );
            };

            type Integer = _Definition<number, 'integer'>;
            type Char = _Definition<string, 'char'>;
            type Boolean = _Definition<boolean, 'boolean'>;
            type Float = _Definition<float, 'float'>;
            type Date = _Definition<string, 'date'>;
            type Datetime = _Definition<string, 'datetime'>;
            type Time = _Definition<string, 'time'>;
            type Duration = _Definition<string, 'duration'>;
            type Selection<O extends string> = _Definition<O, 'selection'>;
            type Text = _Definition<string, 'text'>;
            type File = _Definition<string, 'file'>;
            type Many2One = _Definition<[number, string], 'many2one', number>;
            type One2Many<M extends ModelName, V extends ViewType> = _Definition<(WithoutRelated<M, V>[]), 'one2many', WithoutRelated<M, V>[], M, Command<M>>;
            type Many2Many<M extends ModelName, V extends ViewType> = _Definition<(WithoutRelated<M, V>[]), 'many2many', WithoutRelated<M, V>[], M, Command<M>>;
            type JSON = _Definition<_JSON.JSON, 'json'>;

            interface Command<M extends ModelName> {
                create?: Partial<WithoutRelated<M, 'send'>>[];
                add?: number[];
                unlink?: number[];
                update?: [number[], Partial<WithoutRelated<M, 'send'>>]
                delete?: number[];
                replace?: number[];
                clear?: true;
            };
        };

        type ViewType = 'db' | 'view' | 'send';

        type RecordView<M extends ModelName> = {
            [K in keyof ModelDefinition<M, 'view'>]: ModelDefinition<M, 'view'>[K]['view']
        };

        type RecordDatabase<M extends ModelName> = {
            [K in keyof ModelDefinition<M, 'db'>]: ModelDefinition<M, 'db'>[K]['db']
        };

        type RecordSend<M extends ModelName> = {
            [K in keyof ModelDefinition<M, 'send'>]?: ModelDefinition<M, 'send'>[K]['send']
        };

        type _ArrayTTypeVariantOption = 'ids' | 'tuples';

        interface _ArrayTTypeVariant {
            'ids': number;
            'tuples': {
                id: number;
                display_name: string;
            };
        };

        interface _CommonFieldsProperties {
            id: TTypeV2.Integer;
            name: TTypeV2.Char;
            create_date: TTypeV2.Datetime;
            update_date: TTypeV2.Datetime;
            create_uid: TTypeV2.Many2One;
            update_uid: TTypeV2.Many2One;
            display_name: TTypeV2.Char;
        };

        interface Model<V extends ViewType> {

            'base.model': {
                state: TTypeV2.Selection<'base' | 'generic'>;
                label: TTypeV2.Char;
                model: TTypeV2.Char;
                has_sequence: TTypeV2.Boolean;
                is_archivable: TTypeV2.Boolean;
                has_label: TTypeV2.Boolean;
                description: TTypeV2.Text;
                field_ids: TTypeV2.One2Many<'base.model.field', V>;
                related_field_ids: TTypeV2.One2Many<'base.model.field', V>;
                transient: TTypeV2.Boolean;
            };

            'base.model.field': {
                state: TTypeV2.Selection<'base' | 'generic'>;
                label: TTypeV2.Char;
                model_id: TTypeV2.Many2One;
                ttypeV2: TTypeV2.Selection<TTypeName>;
                nullable: TTypeV2.Boolean;
                on_delete: TTypeV2.Selection<'cascade' | 'restrict' | 'set_null'>;
                is_required: TTypeV2.Boolean;
                readonly: TTypeV2.Boolean;
                default_value: TTypeV2.JSON;
                unique: TTypeV2.Boolean;
                help_info: TTypeV2.Text;
                related_model_id: TTypeV2.Many2One;
                related_field: TTypeV2.Char;
                is_computed: TTypeV2.Boolean;
                selection_ids: TTypeV2.One2Many<'base.model.field.selection', V>;
            };

            'base.model.field.selection': {
                label: TTypeV2.Char;
                field_id: TTypeV2.Many2One;
            };

            'base.users': {
                active: TTypeV2.Boolean;
                login: TTypeV2.Char;
                password: TTypeV2.Char;
                profile_picture: TTypeV2.File;
                role_ids: TTypeV2.Many2Many<'base.users.role', V>;
            };

            'base.users.role': {
                label: TTypeV2.Char;
                group_ids: TTypeV2.Many2Many<'base.user.groups', V>;
            };

            'base.user.groups': {
                label: TTypeV2.Char;
                access_ids: TTypeV2.One2Many<'base.user.access', V>;
            };

            'base.user.access': {
                model_id: TTypeV2.Many2One;
                perm_create: TTypeV2.Boolean;
                perm_read: TTypeV2.Boolean;
                perm_update: TTypeV2.Boolean;
                perm_delete: TTypeV2.Boolean;
                group_id: TTypeV2.Many2One;
            };

            'location.warehouse': {
                short_name: TTypeV2.Char;
                location_number: TTypeV2.Integer;
            };

            'resource.device.type': {};

            'schedule.week': {
                weekday: TTypeV2.Selection<'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday', 'not_null'>;
                start_time: TTypeV2.Time;
                end_time: TTypeV2.Time;
            };

            'model.sync': {
                last_sync: TTypeV2.Datetime;
                model_id: TTypeV2.Many2One;
            };

            'resource.device': {
                model: TTypeV2.Char;
                brand: TTypeV2.Char;
                serial_number: TTypeV2.Char;
                firmware_version: TTypeV2.Char;
                type_id: TTypeV2.Many2One;
                location_id: TTypeV2.Many2One;
            };

            'hr.employee': {
                active: TTypeV2.Boolean;
                odoo_id: TTypeV2.Integer;
                hire_date: TTypeV2.Date;
                location_id: TTypeV2.Many2One;
                user_id: TTypeV2.Many2One;
            };

            'schedule.week.offset': {
                employee_id: TTypeV2.Many2One;
                start_offset: TTypeV2.Duration;
                end_offset: TTypeV2.Duration;
                weekday: TTypeV2.Selection<'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday', 'not_null'>;
            };

            'assistance.registry.day': {
                date: TTypeV2.Date;
                employee_id: TTypeV2.Many2One;
                schedule_id: TTypeV2.Many2One;
                offset_id: TTypeV2.Many2One;
                event_ids: TTypeV2.One2Many<'assistance.registry.event', V>;
                start_time: TTypeV2.Time;
                end_time: TTypeV2.Time;
                lunch_time: TTypeV2.Duration;
                weekday: TTypeV2.Char;
                allowed_start: TTypeV2.Time;
                allowed_end: TTypeV2.Time;
                late_start: TTypeV2.Duration;
                early_end: TTypeV2.Duration;
                is_complete: TTypeV2.Boolean;
                has_valid_events: TTypeV2.Boolean;
            };

            'assistance.registry.event': {
                employee_id: TTypeV2.Many2One;
                original_registry_time: TTypeV2.Datetime;
                original_status: TTypeV2.Selection<'undefined', 'check_in', 'break_out', 'break_in', 'check_out'>;
                device_id: TTypeV2.Many2One;
                from_api: TTypeV2.Boolean;
                registry_time_correction: TTypeV2.Datetime;
                status_correction: TTypeV2.Selection<'null', 'undefined', 'check_in', 'break_out', 'break_in', 'check_out'>;
                day_id: TTypeV2.Many2One;
                registry_time: TTypeV2.Datetime;
                status: TTypeV2.Selection<'null', 'undefined', 'check_in', 'break_out', 'break_in', 'check_out'>;
                has_corrections: TTypeV2.Boolean;
            };

            'assistance.registry.event.correction': {
                event_id: TTypeV2.Many2One;
                status: TTypeV2.Selection<'null', 'undefined', 'check_in', 'break_out', 'break_in', 'check_out'>;
                registry_time: TTypeV2.Datetime;
            };

            'assistance.registry.event.credentials': {
                token: TTypeV2.Char;
                cookie_uuid: TTypeV2.Char;
                site_id: TTypeV2.Char;
            };

        };

        type ModelDefinition<M extends ModelName, V extends ViewType> = (
            & _CommonFieldsProperties
            & Model<V>[M]
        );

        type FieldName<M extends ModelName> = keyof ModelDefinition<M>;

        type CriteriaStructure<M extends ModelName> = _Definition.CriteriaStructure.CriteriaStructure<M>;

        declare namespace _Definition {

            declare namespace CriteriaStructure {

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

                type SerializableScalar = number | string | boolean | null;

                type Serializable = Typing.ScalarOrArray<SerializableScalar>;

                type Triplet<M extends ModelName> = [FieldName<M>, ComparisonOperator, Serializable];

                type CriteriaStructure<M extends ModelName> = (LogicOperator | Triplet<M>)[];

            };

        };

    };

    declare namespace App {

        interface Authentication {
            'access_token': string;
            'token_type': 'bearer';
        };

        declare namespace Context {

            interface API {
                api: Resource.Client;
                appLoading: boolean;
            };

            interface UserToken {
                userToken: string | null;
                setUserToken: (value: string) => void;
                removeUserToken: () => void;
            };

            interface UserData {
                userData: Me;
                setUserData: React.Dispatch<React.SetStateAction<Me>>
                removeUserData: () => void;
            };

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

    };

    declare namespace Resource {

        interface Client {
            login: (
                username: string,
                password: string,
                onError: (e: any) => void,
            ) => Promise<void>;

            me: () => Promise<void>;

            fieldsMetadata: <
                M extends IACele.Data._Core.ModelName,
            >(params: IACele.API.Request.FieldsMetadata<M>) => Promise<IACele.Data.Shape.FieldsMetadata[]>;

            action: <M extends IACele.Data.ModelName>(
                params: IACele.API.Request.Action<M>,
            ) => Promise<true>;

            create: <M extends IACele.Data.ModelName>(
                data: IACele.API.Request.Create<M>,
            ) => Promise<IACele.API.Response.Create>;

            read: <M extends IACele.Data.ModelName>(
                data: IACele.API.Request.Read<M>,
            ) => Promise<IACele.API.Response.Read<M>>;

            searchRead: <M extends IACele.Data.ModelName>(
                data: IACele.API.Request.SearchRead<M>,
            ) => Promise<IACele.API.Response.SearchRead<M>>;

            update: <M extends IACele.Data.ModelName>(
                data: IACele.API.Request.Update<M>,
            ) => Promise<true>;

            delete: <M extends IACele.Data.ModelName>(
                data: IACele.API.Request.Delete<M>,
            ) => Promise<true>;

            tree: <M extends IACele.Data.ModelName>(
                params: IACele.API.Request.Tree<M>,
            ) => Promise<IACele.API.Response.Tree<M>>;

            form: <M extends IACele.Data.ModelName>(
                params: IACele.API.Request.Form<M>,
            ) => Promise<IACele.API.Response.Form<M>>;

        };

        interface UserSession {
            setUserToken: (token: string) => void;
            removeUserToken: () => void;
            setAppLoading: (loading: boolean) => void;
            setUserData: (data: IACele.App.Me) => void;
            removeUserData: () => void;
        };

    };

    declare namespace UI {

        type Variant = 'info' | 'primary' | 'success' | 'warning' | 'danger';

        declare namespace View {

            type DisplayOption = 'screen' | 'window';

        };

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
                    icon: React.FC<IACele.Common.SupportsClasName>;
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

    };

};
