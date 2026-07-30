import type VIEW_V2 from "@/views/ViewsV2";
import { createContext } from "react";

interface ViewDataContextParams {
    viewDataName: keyof typeof VIEW_V2;
    recordId: number;
    display: IACele.UI.View.DisplayOption;
};

const ViewDataContext = createContext<ViewDataContextParams>({
    viewDataName: null as any,
    recordId: 0,
    display: 'screen',
});

export default ViewDataContext;
