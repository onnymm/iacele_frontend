import { createContext } from "react";

const PageNameContext = createContext<IACeleV2.App.PageName>({
    pageName: null,
    setPageName: () => null,
});

export default PageNameContext;
