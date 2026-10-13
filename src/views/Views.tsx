import packedView from "./packedView";

const VIEW = {

    'hr.employee.tree': packedView({
        'type': 'tree',
        'modelName': 'hr.employee',
        'View': (Tree) => (
            <Tree open='hr.employee.form' canCreate={false}>
                {({ Page, Field, List }) => (
                    <Page>
                        <Field name="name" />
                        <Field name="active" decoration={{ primary: true }} />
                        <Field name="location_id" />
                        <Field name="odoo_id" />
                        <Field name="hire_date" />

                        <List>
                            {({ Item, Title, Field, Trailing }) => (
                                <Item>
                                    <Title>
                                        <Field name="name" />
                                    </Title>
                                    <Field name="location_id" decoration={{ primary: true }} />
                                    <Field name="hire_date" />
                                    <Trailing>
                                        <Field name="odoo_id" />
                                    </Trailing>
                                </Item>
                            )}
                        </List>
                    </Page>
                )}
            </Tree>
        ),
    }),

    'hr.employee.form': packedView({
        'type': 'form',
        'modelName': 'hr.employee',
        'View': (Form) => (
            <Form readonly create={false} delete={false}>
                {({ Page, Sheet, Group, Field }) => (
                    <Page>
                        <Sheet>
                            <Group label="General">
                                <Field name="name" />
                                <Field name="location_id" />
                            </Group>
                            <Group label="Estatus">
                                <Field name="active" />
                                <Field name="hire_date" />
                                <Field name="odoo_id" />
                            </Group>
                        </Sheet>
                    </Page>
                )}
            </Form>
        ),
    }),

    'base.user.access.form': packedView({
        modelName: 'base.user.access',
        type: 'form',
        View: (Form) => (
            <Form>
                {({ Page, Sheet, Group, Field }) => (
                    <Page>
                        <Sheet>
                            <Group label="Información">
                                <Field name="name" />
                                <Field name="model_id" />
                            </Group>
                            <Group label="Operaciones">
                                <Group>
                                    <Field name="perm_create" decoration={{ success: true }} />
                                    <Field name="perm_read" decoration={{ success: true }} />
                                    <Field name="perm_update" decoration={{ success: true }} />
                                    <Field name="perm_delete" decoration={{ success: true }} />
                                </Group>
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
                {({ Page, Field, List }) => (
                    <Page>
                        <Field name="profile_picture" widget="avatar" label="Fotito" />
                        <Field name="name" />
                        <Field name="login" widget="badge" decoration={{ info: true }} />
                        <Field name="role_ids" />

                        <List>
                            {({ Item, Leading, Title, Field, Trailing }) => (
                                <Item>
                                    <Leading>
                                        <Field name="profile_picture" widget="avatar" />
                                    </Leading>
                                    <Title>
                                        <Field name="name" />
                                    </Title>
                                    <Field name="login" decoration={{ success: [['active', '=', true]], danger: [['active', '=', false]] }} />
                                    <Trailing>
                                        <Field name="role_ids" decoration={{ primary: true }} />
                                        <Field name="active" decoration={{ primary: true }} />
                                    </Trailing>
                                </Item>
                            )}
                        </List>
                    </Page>
                )}
            </Tree>
        ),
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
                                <Field name="profile_picture" widget="picture" />
                            </Group>
                            <Group label="General">
                                <Field name="login" />
                                <Field name="name" />
                                <Field name="active" readonly widget="switch" decoration={{ success: [['active', '=', true]] }} />
                            </Group>
                            <Group label="Permisos">
                                <Field name="role_ids" decoration={{ success: [['active', '=', true]] }} view="base.users.role.form" />
                            </Group>
                            <Group label="Detalles" invisible={[['id', '=', null]]}>
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
            <Form create={false} delete={false}>
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

    'base.user.groups.tree': packedView({
        modelName: 'base.user.groups',
        type: 'tree',
        View: (Tree) => (
            <Tree open='base.user.groups.form'>
                {({ Page, Field, List }) => (
                    <Page>
                        <Field name="name" widget="badge" decoration={{ info: true }} />
                        <Field name="label" />

                        <List>
                            {({ Item, Title, Field }) => (
                                <Item>
                                    <Title>
                                        <Field name="label" />
                                    </Title>
                                    <Field name="name" />
                                </Item>
                            )}
                        </List>
                    </Page>
                )}
            </Tree>
        ),
    }),

    'base.user.groups.form': packedView({
        modelName: 'base.user.groups',
        type: 'form',
        View: (Form) => (
            <Form>
                {({ Page, Sheet, Group, Field }) => (
                    <Page>
                        <Sheet>
                            <Group>
                                <Field name="label" label="Nombre" />
                                <Field name="access_ids" decoration={{ info: true }} label="Permisos de acceso" view='base.user.access.form' />
                            </Group>
                        </Sheet>
                    </Page>
                )}
            </Form>
        ),
    }),

    'base.users.role.form': packedView({
        modelName: 'base.users.role',
        type: 'form',
        View: (Form) => (
            <Form>
                {({ Page, Sheet, Group, Field }) => (
                    <Page>
                        <Sheet>
                            <Group label="General">
                                <Field name="name" />
                                <Field name="label" />
                            </Group>
                            <Group label="Detalles">
                                <Field name="group_ids" view="base.user.groups.form" />
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
            <Form readonly>
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
        ),
    }),

} as const;

export default VIEW;
