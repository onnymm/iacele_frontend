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
                id: TType.Integer<'not_null'>;
                name: TType.Char<'not_null'>;
                label: TType.Char<'not_null'>;
                ttype: TType.Selection<TTypeName, 'not_null'>;
                help_info: TType.Char;
                related_model: ModelName;
                selection_ids: {
                    id: TType.Integer<'not_null'>;
                    name: TType.Char<'not_null'>;
                    label: TType.Char<'not_null'>;
                }[];
                readonly: TType.Boolean<'not_null'>;
                is_computed: TType.Boolean<'not_null'>;
            };

        };

        type ModelName = (
            | 'base.model'
            | 'base.model.field'
            | 'base.model.field.selection'
            | 'base.users'
            | 'base.users.role'
            | 'base.user.groups'
            | 'base.user.access'
            | 'location.warehouse'
            | 'resource.device.type'
            | 'schedule.week'
            | 'model.sync'
            | 'resource.device'
            | 'hr.employee'
            | 'schedule.week.offset'
            | 'assistance.registry.day'
            | 'assistance.registry.event'
            | 'assistance.registry.event.correction'
            | 'assistance.registry.event.credentials'
        );

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

        type _ArrayTTypeVariantOption = 'ids' | 'tuples';

        interface _ArrayTTypeVariant {
            'ids': number;
            'tuples': {
                id: number;
                display_name: string;
            };
        };

        interface _CommonFieldsProperties {
            id: TType.Integer<'not_null'>;
            name: TType.Char<'not_null'>;
            create_date: TType.Datetime<'not_null'>;
            update_date: TType.Datetime<'not_null'>;
            create_uid: TType.Many2One<'not_null'>;
            update_uid: TType.Many2One<'not_null'>;
            display_name: TType.Char<'not_null'>;
        };

        interface Model {

            'base.model': {
                state: TType.Selection<'base' | 'generic', 'not_null'>;
                label: TType.Char<'not_null'>;
                model: TType.Char<'not_null'>;
                has_sequence: TType.Boolean<'not_null'>;
                is_archivable: TType.Boolean<'not_null'>;
                has_label: TType.Boolean<'not_null'>;
                description: TType.Text;
                field_ids: TType.One2Many;
                related_field_ids: TType.One2Many;
                transient: TType.Boolean<'not_null'>;
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
                selection_ids: TType.One2Many;
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
                role_ids: TType.Many2Many;
            };

            'base.users.role': {
                label: TType.Char<'not_null'>;
                group_ids: TType.Many2Many;
            };

            'base.user.groups': {
                label: TType.Char<'not_null'>;
                access_ids: TType.One2Many;
            };

            'base.user.access': {
                model_id: TType.Many2One<'not_null'>;
                perm_create: TType.Boolean<'not_null'>;
                perm_read: TType.Boolean<'not_null'>;
                perm_update: TType.Boolean<'not_null'>;
                perm_delete: TType.Boolean<'not_null'>;
                group_id: TType.Many2One<'not_null'>;
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
                event_ids: TType.One2Many;
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

        type ModelDefinition<M extends ModelName> = (
            & _CommonFieldsProperties
            & Model[M]
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
                    | '><'
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
