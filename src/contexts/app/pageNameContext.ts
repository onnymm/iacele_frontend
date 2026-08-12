import { createContext } from "react";

const PageNameContext = createContext<IACele.App.PageName>({
    pageName: null,
    setPageName: () => null,
});

export default PageNameContext;
