import type VIEW from "@/views/Views";
import { createContext } from "react";

interface ViewDataContextParams {
    viewDataName: keyof typeof VIEW;
    recordId: number;
};

const ViewDataContext = createContext<ViewDataContextParams>({
    viewDataName: null as any,
    recordId: 0,
});

export default ViewDataContext;
