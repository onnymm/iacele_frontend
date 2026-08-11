import type FieldComponent from "./FieldComponent";

const packedView = <M extends IACeleV2.Data.ModelName>(params: IACeleV2.View.PackedParams<M, typeof FieldComponent>) => (params);

const VIEW_V2 = {

    'assistance.registry.day.tree': packedView({
        modelName: 'assistance.registry.day',
        type: 'tree',
        View: (Tree) => (
            <Tree open='assistance.registry.day.form'>
                {({ Page, Field }) => (
                    <Page>
                        <Field name="date" />
                        <Field name="employee_id" />
                        <Field name="has_valid_events" widget="switch" />
                        <Field name="is_complete" widget="switch" />
                        <Field name="allowed_start" />
                        <Field name="allowed_end" />
                    </Page>
                )}
            </Tree>
        ),
    }),

    'assistance.registry.event.add.form': packedView({
        modelName: 'assistance.registry.event',
        type: 'form',
        View: (Form) => (
            <Form>
                {({ Page, Sheet, Group, Field }) => (
                    <Page>
                        <Sheet>
                            <Group label="Empleado">
                                <Field name="employee_id" readonly />
                                <Field name="day_id" readonly />
                            </Group>
                            <Group label="Información">
                                <Field name="original_registry_time" />
                                <Field name="original_status" />
                            </Group>
                        </Sheet>
                    </Page>
                )}
            </Form>
        )
    }),

    'assistance.registry.day.form': packedView({
        modelName: 'assistance.registry.day',
        type: 'form',
        View: (Form) => (
            <Form>
                {({ Page, Header, Wizard, Sheet, Group, Field }) => (
                    <Page>
                        <Header>
                            <Wizard label="Añadir registro" view="assistance.registry.event.add.form" contextData={({ id, display_name, employee_id }) => ({ day_id: [id, display_name] as [number, string], from_api: false, employee_id: employee_id })} />
                        </Header>
                        <Sheet>
                            <Field name="display_name" invisible />
                            <Group label="Resumen">
                                <Field name="employee_id" />
                                <Field name="start_time" />
                                <Field name="end_time" />
                            </Group>
                            <Group label="Detalles">
                                <Field name="date" readonly />
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
                                <Field name="event_ids" />
                            </Group>
                        </Sheet>
                    </Page>
                )}
            </Form>
        ),
    }),

    'assistance.registry.event.form': packedView({
        modelName: 'assistance.registry.event',
        type: 'form',
        View: (Form) => (
            <Form>
                {({ Page, Sheet, Action, Group, Field, Header, Wizard, }) => (
                    <Page>
                        <Header>
                            <Wizard label="Aplicar corrección" view="assistance.registry.event.correction.form" contextData={({ id }) => ({ event_id: id as any as [number, string] })} />
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
                            <Group label="Correcciones" invisible={[['correction_history_ids', '=', null]]}>
                                <Field name="correction_history_ids" />
                            </Group>
                        </Sheet>
                    </Page>
                )}
            </Form>
        )
    }),

    'assistance.registry.event.correction.form': packedView({
        modelName: 'assistance.registry.event.correction',
        type: 'form',
        View: (Form) => (
            <Form>
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
        type: 'form',
        View: (Form) => (
            <Form>
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

    'base.users.tree': packedView({
        modelName: 'base.users',
        type: 'tree',
        View: (Tree) => (
            <Tree open="base.users.form">
                {({ Page, Field }) => (
                    <Page>
                        <Field name="profile_picture" widget="avatar" />
                        <Field name="name" />
                        <Field name="login" widget="badge" />
                        <Field name="role_ids" />
                    </Page>
                )}
            </Tree>
        )
    }),

    'base.users.form': packedView({
        modelName: 'base.users',
        type: 'form',
        View: (Form) => (
            <Form>
                {({ Page, Sheet, Group, Field }) => (
                    <Page>
                        <Sheet>
                            <Group label="Personalizar">
                                <Field name="id" invisible={[['id', '=', null]]} />
                                <Field name="profile_picture" widget="picture" readonly />
                            </Group>
                            <Group label="General">
                                <Field name="name" />
                                <Field name="login" readonly />
                            </Group>
                            <Group label="Detalles" invisible={[['id', '=', null]]}>
                                <Field name="active" readonly />
                                <Field name="role_ids" readonly />
                                <Field name="create_uid" />
                                <Field name="create_date" />
                            </Group>
                        </Sheet>
                    </Page>
                )}
            </Form>
        ),
    }),

    'base.users.me.form': packedView({
        modelName: 'base.users',
        type: 'form',
        View: (Form) => (
            <Form>
                {({ Page, Sheet, Header, Group, Field, Wizard }) => (
                    <Page>
                        <Header>
                            <Wizard view="base.users.update.password.form" label="Cambiar contraseña" />
                        </Header>
                        <Sheet>
                            <Group label="Personalizar">
                                <Field name="profile_picture" widget="picture" />
                            </Group>
                            <Group label="General">
                                <Field name="name" />
                                <Field name="login" />
                            </Group>
                        </Sheet>
                    </Page>
                )}
            </Form>
        ),
    }),

    'base.users.update.password.form': packedView({
        modelName: 'base.users.update.password',
        type: 'form',
        View: (Form) => (
            <Form>
                {({ Page, Sheet, Group, Field }) => (
                    <Page>
                        <Sheet>
                            <Group label="Contraseña actual">
                                <Field name="current_password" widget="password" />
                            </Group>
                            <Group label="Nueva contraseña">
                                <Field name="new_password" widget="password" />
                                <Field name="confirm_password" widget="password" />
                            </Group>
                        </Sheet>
                    </Page>
                )}
            </Form>
        ),
    }),

    'base.model.data.process.step.form': packedView({
        modelName: 'base.model.data.process.step.record',
        type: 'form',
        View: (Form) => (
            <Form>
                {({ Page, Sheet, Group, Field }) => (
                    <Page>
                        <Sheet>
                            <Group label="General">
                                <Field name="name" />
                                <Field name="step_id" />
                            </Group>
                            <Group label="Detalles">
                                <Field name="data" />
                            </Group>
                        </Sheet>
                    </Page>
                )}
            </Form>
        )
    }),

} as const;

export default VIEW_V2;
