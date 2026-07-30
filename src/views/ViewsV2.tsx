interface _PackedViewParams <M extends IACeleV2.Data.ModelName>{
    modelName: M;
};

type PackedViewParams <M extends IACeleV2.Data.ModelName> = (
    & _PackedViewParams<M>
    & FormDeclaration<M>
)

interface FormDeclaration <M extends IACeleV2.Data.ModelName>{
    type: 'form';
    View: (component: React.FC<IACeleV2.View.FormStructure<M>>) => (React.ReactNode);
};

const packedView = <M extends IACeleV2.Data.ModelName>(params: PackedViewParams<M>) => (params);

const VIEW_V2 = {

    'base.users.form': packedView({
        modelName: 'base.users',
        type: 'form',
        View: (Form) => (
            <Form>
                {({ Page, Sheet, Group, Field }) => (
                    <Page>
                        <Sheet>
                            <Group label="Personalizar">
                                <Field name="profile_picture" />
                            </Group>
                            <Group label="General">
                                <Field name="name" />
                                <Field name="login" />
                            </Group>
                            <Group label="Detalles">
                                <Field name="active" readonly />
                                <Field name="role_ids" readonly />
                                <Field name="create_uid"/>
                                <Field name="create_date" />
                            </Group>
                        </Sheet>
                    </Page>
                )}
            </Form>
        ),
    }),

} as const;

export default VIEW_V2;
