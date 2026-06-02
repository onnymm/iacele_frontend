import { createContext } from "react";

const PageNameContext = createContext<IACele.Application.PageName>({
    pageName: null,
    setPageName: () => null,
});

export default PageNameContext;
