import UserDataContext from "../contexts/app/userDataContext";
import useUserData from "../hooks/app/useUserData";

const UserDataProvider: React.FC<IACele.Common.SupportsChildren> = ({
    children,
}) => {

    // Obtención de valor y funciones desde hook
    const { userData, setUserData, removeUserData } = useUserData();

    return (
        <UserDataContext.Provider value={{ userData, setUserData, removeUserData }}>
            {children}
        </UserDataContext.Provider>
    );
};

export default UserDataProvider;
