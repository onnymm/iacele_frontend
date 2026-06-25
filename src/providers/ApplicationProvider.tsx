import DarkModeProvider from "./DarkModeProvider";
import MainControlsProvider from "./MainControlsProvider";

const ApplicationProvider = ({
    children,
}: IACele.Common.SupportsChildren) => {

    return (
        <DarkModeProvider>
            <MainControlsProvider>
                {children}
            </MainControlsProvider>
        </DarkModeProvider>
    );
};

export default ApplicationProvider;
