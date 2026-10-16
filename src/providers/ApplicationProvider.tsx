import { TooltipProvider } from "@/components/ui/tooltip";
import DarkModeProvider from "./DarkModeProvider";
import PageNameProvider from "./PageNameProvider"
import ModelsMetadataProvider from "./ModelsMetadataProvider";
import NavbarDynamicControls from "@/components/portals/NavbarDynamicControls";
import NavbarMainControls from "@/components/portals/NavbarMainControls";
import HeaderControls from "@/components/portals/HeaderControls";

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
        <HeaderControls.Provider>
            {children}
        </HeaderControls.Provider>
        </NavbarDynamicControls.Provider>
        </NavbarMainControls.Provider>

        </TooltipProvider>

        </ModelsMetadataProvider>

        </PageNameProvider>
        </DarkModeProvider>
    );
};

export default ApplicationProvider;
