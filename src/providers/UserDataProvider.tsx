import { useCallback, useState } from "react";
import UserDataContext from "../contexts/app/userDataContext";
import userTemplate from "@/constants/api/userTemplate";

const UserDataProvider: React.FC<IACeleV2.Common.SupportsChildren> = ({
    children,
}) => {

    // Inicialización de estado de datos del usuario
    const [ userData, setUserData ] = useState<IACeleV2.App.Me>(userTemplate);

    // Función para remover los datos del usuario
    const removeUserData = useCallback(
        () => {
            setUserData(userTemplate);
        }, []
    );

    return (
        <UserDataContext.Provider value={{ userData, setUserData, removeUserData }}>
            {children}
        </UserDataContext.Provider>
    );
};

export default UserDataProvider;
