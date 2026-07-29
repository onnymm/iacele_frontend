import { TooltipProvider } from "@/components/ui/tooltip";
import DarkModeProvider from "./DarkModeProvider";
import MainControlsProvider from "./MainControlsProvider";
import ModelsMetadataProvider from "./ModelsMetadataProvider";
import PageNameProvider from "./PageNameProvider"
import HeaderControlsProvider from "./HeaderControlsProvider";
import ModelsMetadataProviderV2 from "./ModelsMetadataProviderV2";

const ApplicationProvider = ({
    children,
}: IACele.Common.SupportsChildren) => {

    return (
        <DarkModeProvider>
        <PageNameProvider>
        <ModelsMetadataProvider>

        <ModelsMetadataProviderV2>

        <TooltipProvider>

        <MainControlsProvider>
        <HeaderControlsProvider>
            {children}
        </HeaderControlsProvider>
        </MainControlsProvider>

        </TooltipProvider>

        </ModelsMetadataProviderV2>

        </ModelsMetadataProvider>
        </PageNameProvider>
        </DarkModeProvider>
    );
};

export default ApplicationProvider;
