import type VIEW from "@/views/Views";
import { createContext } from "react";

interface OnCreateParams {
    recordId: number;
};

interface OnUpdateParams {
    reload: () => (void);
};

interface ViewDataContextParams {
    viewDataName: keyof typeof VIEW;
    recordId: number;
    display: IACele.UI.DisplayOption;
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
