import { createContext } from "react";

interface LockedSidebar {
    isSidebarLocked: boolean;
    setIsSidebarLocked: React.Dispatch<React.SetStateAction<boolean>>;
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AppContext = createContext<LockedSidebar>({
    isSidebarLocked: false,
    setIsSidebarLocked: () => (null),
    isSidebarOpen: false,
    setIsSidebarOpen: () => (null),
});
