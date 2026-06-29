import Form from "./form/Form";
import Tree from "./tree/Tree";

const VIEW = {

    'base.users.form': () => (
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

    'assistance.registry.day.tree': () => (
        <Tree modelName="assistance.registry.day">
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

    'assistance.registry.day.form': () => (
        <Form modelName="assistance.registry.day" create={false}>
            {({ Page, Sheet, Group, Field }) => (
                <Page>
                    <Sheet>
                        <Group label="Usuario">
                            <Field name="employee_id" />
                            <Field name="allowed_start" />
                            <Field name="allowed_end" />
                        </Group>
                        <Group label="Día">
                            <Field name="date" />
                            <Field name="weekday" />
                            <Group>
                                <Field name="has_valid_events" />
                                <Field name="is_complete" />
                            </Group>
                        </Group>
                        <Group label="Horario">
                            <Field name="start_time" />
                            <Field name="end_time" />
                            <Field name="lunch_time" />
                            <Field name="event_ids" />
                        </Group>
                        <Group label="Métricas">
                            <Field name="late_start" />
                            <Field name="early_end" />
                        </Group>
                    </Sheet>
                </Page>
            )}
        </Form>
    ),

    'assistance.registry.event.tree': () => (
        <Tree modelName="assistance.registry.event">
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

    'assistance.registry.event.form': () => (
        <Form modelName="assistance.registry.event" create={false}>
            {({ Page, Sheet, Group, Field }) => (
                <Page>
                    <Sheet>
                        <Group label="General">
                            <Field name="employee_id" />
                            <Field name="status" />
                            <Field name="registry_time" />
                        </Group>
                        <Group label="Correciones">
                            <Field name="status_correction" />
                            <Field name="registry_time_correction" />
                            <Group>
                                <Field name="from_api" />
                                <Field name="is_correction" />
                            </Group>
                        </Group>
                        <Group label="Datos originales">
                            <Field name="original_status" />
                            <Field name="original_registry_time" />
                            <Field name="day_id" />
                        </Group>
                    </Sheet>
                </Page>
            )}
        </Form>
    ),

    'assistance.registry.event.credentials.form': () => (
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

} as const;

export default VIEW;
