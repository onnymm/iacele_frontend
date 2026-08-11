import type VIEW_V2 from "@/views/ViewsV2";
import { createContext } from "react";

interface OnCreateParams {
    recordId: number;
};

interface OnUpdateParams {
    reload: () => (void);
};

interface ViewDataContextParams {
    viewDataName: keyof typeof VIEW_V2;
    recordId: number;
    display: IACeleV2.UI.DisplayOption;
    onCreate: (params: OnCreateParams) => (void);
    onUpdate: (params: OnUpdateParams) => (void);
    newRecord?: () => (void);
    undoNewRecord?: () => (void);
};

const ViewDataContext = createContext<ViewDataContextParams>({
    viewDataName: null as any,
    recordId: 0,
    display: 'screen',
    onCreate: () => {},
    onUpdate: () => {},
    newRecord: () => {},
});

export default ViewDataContext;
