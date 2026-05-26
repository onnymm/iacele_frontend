import APIContext from "../contexts/app/apiContext";
import useAPI from "../hooks/app/useAPI";

const APIProvider: React.FC<IACele.Common.SupportsChildren> = ({
    children,
}) => {

    // Inicialización de instancia de API y sus principales valores
    const { api, appLoading } = useAPI();

    return (
        <APIContext.Provider value={{ api, appLoading }}>
            {children}
        </APIContext.Provider>
    );
};

export default APIProvider;
