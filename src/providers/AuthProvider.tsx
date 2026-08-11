import APIProvider from "./APIProvider";
import UserAuthenticationProvider from "./UserAuthenticationProvider";
import UserDataProvider from "./UserDataProvider";
import UserTokenProvider from "./UserTokenProvider"

const AuthProvider: React.FC<IACeleV2.Common.SupportsChildren> = ({
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
