import APIProvider from "./APIProvider";
import UserTokenProvider from "./UserTokenProvider"

const AuthProvider: React.FC<IACele.Common.SupportsChildren> = ({
    children,
}) => {

    return (
        <UserTokenProvider>
        <APIProvider>
            {children}
        </APIProvider>
        </UserTokenProvider>
    );
};

export default AuthProvider;
