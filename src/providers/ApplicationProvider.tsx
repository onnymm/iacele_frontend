import { TooltipProvider } from "@/components/ui/tooltip";
import DarkModeProvider from "./DarkModeProvider";
import MainControlsProvider from "./MainControlsProvider";
import PageNameProvider from "./PageNameProvider"
import HeaderControlsProvider from "./HeaderControlsProvider";
import ModelsMetadataProviderV2 from "./ModelsMetadataProviderV2";

const ApplicationProvider = ({
    children,
}: IACeleV2.Common.SupportsChildren) => {

    return (
        <DarkModeProvider>
        <PageNameProvider>

        <ModelsMetadataProviderV2>

        <TooltipProvider>

        <MainControlsProvider>
        <HeaderControlsProvider>
            {children}
        </HeaderControlsProvider>
        </MainControlsProvider>

        </TooltipProvider>

        </ModelsMetadataProviderV2>

        </PageNameProvider>
        </DarkModeProvider>
    );
};

export default ApplicationProvider;
