import Form from "./form/Form";
import Tree from "./tree/Tree";

interface PackedViewParams <M extends IACele.Data.ModelName>{
    modelName: M,
    View: () => React.ReactElement;
};

const packedView = <M extends IACele.Data.ModelName>(params: PackedViewParams<M>) => (params);

const VIEW = {

    'base.users.form': packedView({
        modelName: 'base.users',
        View: () => (
            <Form modelName="base.users">
                {({ Page, Sheet, Header, Action, Group, Field }) => (
                    <Page>
                        <Header>
                            <Action name="deactivate" label="Desactivar" decoration="danger" />
                            <Action name="deactivate" label="Desactivar" decoration="danger" />
                        </Header>
                        <Sheet>
                            <Group>
                                <Field name="active" />
                                <Field name="name" />
                                <Field name="login" />
                                <Field name="role_ids" />
                                <Field name="create_uid" />
                                <Field name="create_date" />
                            </Group>
                        </Sheet>
                    </Page>
                )}
            </Form>
        ),
    }),

    'assistance.registry.day.tree': packedView({
        modelName: 'assistance.registry.day',
        View: () => (
            <Tree modelName="assistance.registry.day" open="assistance.registry.day.form">
                {({ Field }) => (
                    <>
                        <Field name="id" />
                        <Field name="date" />
                        <Field name="employee_id" />
                        <Field name="start_time" />
                        <Field name="end_time" />
                        <Field name="late_start" />
                        <Field name="early_end" />
                        <Field name="lunch_time" />
                        <Field name="event_ids" />
                    </>
                )}
            </Tree>
        ),
    }),

    'assistance.registry.day.form': packedView({
        modelName: 'assistance.registry.day',
        View: () => (
            <Form modelName="assistance.registry.day" create={false}>
                {({ Page, Sheet, Group, Field }) => (
                    <Page>
                        <Sheet>
                            <Group label="Resumen">
                                <Field name="employee_id" readonly />
                                <Field name="start_time" />
                                <Field name="end_time" />
                            </Group>
                            <Group label="Detalles">
                                <Field name="weekday" />
                                <Field name="allowed_start" />
                                <Field name="allowed_end" />
                            </Group>
                            <Group label="Métricas">
                                <Group>
                                    <Field name="has_valid_events" />
                                    <Field name="is_complete" />
                                </Group>
                                <Field name="lunch_time" />
                                <Field name="late_start" />
                                <Field name="early_end" />
                            </Group>
                            <Group label="Eventos">
                                <Field name="event_ids" open="assistance.registry.event.form" />
                            </Group>
                        </Sheet>
                    </Page>
                )}
            </Form>
        ),
    }),

    'assistance.registry.event.tree': packedView({
        modelName: 'assistance.registry.event',
        View: () => (
            <Tree modelName="assistance.registry.event" open="assistance.registry.event.form">
                {({ Field }) => (
                    <>
                        <Field name="id" />
                        <Field name="employee_id" />
                        <Field name="registry_time" />
                        <Field name="status" />
                        <Field name="from_api" />
                        <Field name="device_id" />
                    </>
                )}
            </Tree>
        ),
    }),

    'assistance.registry.event.form': packedView({
        modelName: 'assistance.registry.event',
        View: () => (
            <Form modelName="assistance.registry.event" create={false}>
                {({ Page, Sheet, Action, Group, Field, Header, Wizard, }) => (
                    <Page>
                        <Header>
                            <Wizard label="Aplicar corrección" viewDataName="assistance.registry.event.correction.form" contextData={({ id }) => ({ event_id: id as any as [number, string] })} />
                            <Action name="undo_corrections" label="Deshacer correcciones" decoration="danger" invisible={[['has_corrections', '=', false]]} />
                        </Header>
                        <Sheet>
                            <Group label="General">
                                <Field name="employee_id" readonly />
                                <Field name="status" />
                                <Field name="registry_time" />
                            </Group>
                            <Group label="Detalles">
                                <Group>
                                    <Field name="from_api" readonly />
                                    <Field name="has_corrections" />
                                </Group>
                                <Field name="day_id" readonly />
                            </Group>
                            <Group label="Correciones" invisible={[['has_corrections', '=', false]]}>
                                <Field name="status_correction" invisible={[['status_correction', '=', null]]} readonly />
                                <Field name="registry_time_correction" invisible={[['registry_time_correction', '=', null]]} readonly />
                            </Group>
                            <Group label="Datos originales" invisible={[['has_corrections', '=', false]]}>
                                <Field name="original_status" readonly />
                                <Field name="original_registry_time" readonly />
                            </Group>
                        </Sheet>
                    </Page>
                )}
            </Form>
        ),
    }),

    'assistance.registry.event.correction.form': packedView({
        modelName: 'assistance.registry.event.correction',
        View: () => (
            <Form modelName="assistance.registry.event.correction">
                {({ Page, Sheet, Group, Field }) => (
                    <Page>
                        <Sheet>
                            <Group label="Hora de registro">
                                <Field name="registry_time" />
                            </Group>
                            <Group label="Tipo de registro">
                                <Field name="status" />
                            </Group>
                        </Sheet>
                    </Page>
                )}
            </Form>
        )
    }),

    'assistance.registry.event.credentials.form': packedView({
        modelName: 'assistance.registry.event.credentials',
        View: () => (
            <Form modelName="assistance.registry.event.credentials">
                {({ Page, Sheet, Group, Field }) => (
                    <Page>
                        <Sheet>
                            <Group label="Datos">
                                <Field name="cookie_uuid" />
                                <Field name="site_id" />
                                <Field name="token" />
                            </Group>
                        </Sheet>
                    </Page>
                )}
            </Form>
        ),
    }),

} as const;

export default VIEW;
