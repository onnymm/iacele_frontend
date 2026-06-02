import PageNameProvider from "./PageNameProvider"

const ApplicationProvider = ({
    children,
}: IACele.Common.SupportsChildren) => {

    return (
        <PageNameProvider>
            {children}
        </PageNameProvider>
    );
};

export default ApplicationProvider;
