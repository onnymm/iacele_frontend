import { TooltipProvider } from "@/components/ui/tooltip";
import DarkModeProvider from "./DarkModeProvider";
import MainControlsProvider from "./MainControlsProvider";
import ModelsMetadataProvider from "./ModelsMetadataProvider";
import PageNameProvider from "./PageNameProvider"
import HeaderControlsProvider from "./HeaderControlsProvider";

const ApplicationProvider = ({
    children,
}: IACele.Common.SupportsChildren) => {

    return (
        <DarkModeProvider>
        <PageNameProvider>
        <ModelsMetadataProvider>

        <TooltipProvider>

        <MainControlsProvider>
        <HeaderControlsProvider>
            {children}
        </HeaderControlsProvider>
        </MainControlsProvider>

        </TooltipProvider>

        </ModelsMetadataProvider>
        </PageNameProvider>
        </DarkModeProvider>
    );
};

export default ApplicationProvider;
