import TokenContext from "../contexts/app/tokenContext";
import useUserToken from "../hooks/app/useUserToken";

const UserTokenProvider: React.FC<IACele.Common.SupportsChildren> = ({
    children,
}) => {

    // Obtención de valores para uso de token de usuario
    const { userToken, setUserToken, removeUserToken } = useUserToken();

    return (
        <TokenContext.Provider value={{ userToken, setUserToken, removeUserToken }}>
            {children}
        </TokenContext.Provider>
    );
};

export default UserTokenProvider;
