import { TooltipProvider } from "@/components/ui/tooltip";
import DarkModeProvider from "./DarkModeProvider";
import MainControlsProvider from "./MainControlsProvider";
import PageNameProvider from "./PageNameProvider"
import HeaderControlsProvider from "./HeaderControlsProvider";
import ModelsMetadataProvider from "./ModelsMetadataProvider";
import DynamicControlsProvider from "./DynamicControlsProvider";

const ApplicationProvider = ({
    children,
}: IACele.Common.SupportsChildren) => {

    return (
        <DarkModeProvider>
        <PageNameProvider>

        <ModelsMetadataProvider>

        <TooltipProvider>

        <MainControlsProvider>
        <DynamicControlsProvider>
        <HeaderControlsProvider>
            {children}
        </HeaderControlsProvider>
        </DynamicControlsProvider>
        </MainControlsProvider>

        </TooltipProvider>

        </ModelsMetadataProvider>

        </PageNameProvider>
        </DarkModeProvider>
    );
};

export default ApplicationProvider;
