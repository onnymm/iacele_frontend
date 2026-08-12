import useLocalValue from "@/hooks/app/useLocalValue";
import TokenContext from "../contexts/app/tokenContext";
import LOCAL_STORAGE from "@/constants/app/localStorage";
import { useCallback, useState } from "react";

const UserTokenProvider: React.FC<IACele.Common.SupportsChildren> = ({
    children,
}) => {

    // Inicialización de funciones para almacenar el token en el navegador
    const [ saveTokenOnLocalStorage, loadTokenFromLocalStorage, removeTokenOnLocalStorage ] = useLocalValue(LOCAL_STORAGE.USER_TOKEN);
    // Inicialización de estado de token
    const [ tokenValue, setTokenValue ] = useState<string | null>(loadTokenFromLocalStorage);

    // Inicialización de función para obtener token y guardarlo en el almacenamiento local
    const setUserToken = useCallback(
        (value: string) => {
            
            // Se establece el token en el estado
            setTokenValue(value);
            // Se guarda el token en el almacenamiento local
            saveTokenOnLocalStorage(value);
        }, [saveTokenOnLocalStorage]
    );

    // Inicialización de función para remover token
    const removeUserToken = useCallback(
        () => {

            // Se establece el estado del token a null
            setTokenValue(null);
            // Se elimina el valor del token en el almacenamiento local
            removeTokenOnLocalStorage();
        }, [removeTokenOnLocalStorage]
    );

    return (
        <TokenContext.Provider value={{ userToken: tokenValue, setUserToken, removeUserToken }}>
            {children}
        </TokenContext.Provider>
    );
};

export default UserTokenProvider;
