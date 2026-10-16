import { TooltipProvider } from "@/components/ui/tooltip";
import DarkModeProvider from "./DarkModeProvider";
import PageNameProvider from "./PageNameProvider"
import HeaderControlsProvider from "./HeaderControlsProvider";
import ModelsMetadataProvider from "./ModelsMetadataProvider";
import NavbarDynamicControls from "@/components/portals/NavbarDynamicControls";
import NavbarMainControls from "@/components/portals/NavbarMainControls";

const ApplicationProvider = ({
    children,
}: IACele.Common.SupportsChildren) => {

    return (
        <DarkModeProvider>
        <PageNameProvider>

        <ModelsMetadataProvider>

        <TooltipProvider>

        <NavbarMainControls.Provider>
        <NavbarDynamicControls.Provider>
        <HeaderControlsProvider>
            {children}
        </HeaderControlsProvider>
        </NavbarDynamicControls.Provider>
        </NavbarMainControls.Provider>

        </TooltipProvider>

        </ModelsMetadataProvider>

        </PageNameProvider>
        </DarkModeProvider>
    );
};

export default ApplicationProvider;
