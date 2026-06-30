import type VIEW from "@/views/Views";
import { createContext } from "react";

interface ViewDataContextParams {
    viewDataName: keyof typeof VIEW;
    recordId: number;
    display: IACele.UI.View.DisplayOption;
};

const ViewDataContext = createContext<ViewDataContextParams>({
    viewDataName: null as any,
    recordId: 0,
    display: 'screen',
});

export default ViewDataContext;
