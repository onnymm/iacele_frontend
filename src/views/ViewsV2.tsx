import type FieldComponent from "./FieldComponent";

const packedView = <M extends IACeleV2.Data.ModelName>(params: IACeleV2.View.PackedParams<M, typeof FieldComponent>) => (params);

const VIEW_V2 = {

        'assistance.registry.day.form': packedView({
        modelName: 'assistance.registry.day',
        type: 'form',
        View: (Form) => (
            <Form>
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
                                <Group label="">
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

    'base.users.form': packedView({
        modelName: 'base.users',
        type: 'form',
        View: (Form) => (
            <Form>
                {({ Page, Header, Action, Sheet, Group, Field }) => (
                    <Page>
                        <Header>
                            <Action name="deactivate" label="Desactivar usuario" />
                        </Header>
                        <Sheet>
                            <Group label="Personalizar">
                                <Field name="id" invisible={[['id', '=', null]]} />
                                <Field name="profile_picture" widget="picture" />
                            </Group>
                            <Group label="General">
                                <Field name="name" />
                                <Field name="login" />
                            </Group>
                            <Group label="Detalles">
                                <Field name="active" readonly />
                                <Field name="role_ids" readonly domain={[['group_ids', '=', '']]} />
                                <Field name="create_uid"/>
                                <Field name="create_date" />
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
