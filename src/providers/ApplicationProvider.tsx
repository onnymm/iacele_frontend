import ModelsMetadataProvider from "./ModelsMetadataProvider";
import PageNameProvider from "./PageNameProvider"

const ApplicationProvider = ({
    children,
}: IACele.Common.SupportsChildren) => {

    return (
        <PageNameProvider>
            <ModelsMetadataProvider>
                {children}
            </ModelsMetadataProvider>
        </PageNameProvider>
    );
};

export default ApplicationProvider;
