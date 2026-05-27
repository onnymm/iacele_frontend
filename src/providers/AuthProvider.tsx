import APIProvider from "./APIProvider";
import UserAuthenticationProvider from "./UserAuthenticationProvider";
import UserDataProvider from "./UserDataProvider";
import UserTokenProvider from "./UserTokenProvider"

const AuthProvider: React.FC<IACele.Common.SupportsChildren> = ({
    children,
}) => {

    return (
        <UserTokenProvider>
        <UserDataProvider>
        <APIProvider>
        <UserAuthenticationProvider>
            {children}
        </UserAuthenticationProvider>
        </APIProvider>
        </UserDataProvider>
        </UserTokenProvider>
    );
};

export default AuthProvider;
