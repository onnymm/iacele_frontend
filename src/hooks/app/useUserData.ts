import { useCallback, useState } from "react";
import userTemplate from "../../constants/api/userTemplate";

const useUserData = () => {

    // Inicialización de estado de datos del usuario
    const [ userData, setUserData ] = useState<IACele.App.Me>(userTemplate);

    // Función para remover los datos del usuario
    const removeUserData = useCallback(
        () => {
            setUserData(userTemplate);
        }, []
    )

    return { userData, setUserData, removeUserData };
};

export default useUserData;
