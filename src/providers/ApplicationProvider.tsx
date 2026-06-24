import MainControlsProvider from "./MainControlsProvider";

const ApplicationProvider = ({
    children,
}: IACele.Common.SupportsChildren) => {

    return (
        <MainControlsProvider>
            {children}
        </MainControlsProvider>
    );
};

export default ApplicationProvider;
