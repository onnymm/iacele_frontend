import VOID_CALLBACK from "@/constants/app/callbacks";
import { createContext } from "react";

const PageNameContext = createContext<IACele.App.PageName>({
    pageName: null,
    setPageName: VOID_CALLBACK.SYNC,
});

export default PageNameContext;
