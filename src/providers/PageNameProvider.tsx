import PageNameContext from "../contexts/app/pageNameContext";
import usePageName from "../hooks/app/usePageName"

const PageNameProvider = ({
    children,
}: IACele.Common.SupportsChildren) => {

    // Obtención de valores de estado desde hook
    const { pageName, setPageName } = usePageName();

    return (
        <PageNameContext.Provider value={{ pageName, setPageName }}>
            {children}
        </PageNameContext.Provider>
    );
};

export default PageNameProvider;
