import useLocalValue from "@/hooks/app/useLocalValue";
import TokenContext from "../contexts/app/tokenContext";
import LOCAL_STORAGE from "@/constants/app/localStorage";
import { useCallback, useState } from "react";

const UserTokenProvider = ({
    children,
}: IACele.Common.SupportsChildren) => {

    // Inicialización de funciones para cargar, guardar y eliminar el token en el navegador
    const [ loadUserTokenFromLocalStorage, saveUserTokenInLocalStorage, removeUserTokenFromLocalStorage ] = useLocalValue(
        LOCAL_STORAGE.USER_TOKEN,
        (rawValue) => (rawValue),
    );

    // Inicialización de estado de token
    const [ tokenValue, setTokenValue ] = useState<string | null>(loadUserTokenFromLocalStorage);

    // Inicialización de función para obtener token y guardarlo en el almacenamiento local
    const setUserToken = useCallback(
        (value: string) => {

            // Se establece el token en el estado
            setTokenValue(value);
            // Se guarda el token en el almaceniento local
            saveUserTokenInLocalStorage(value);
        }, [saveUserTokenInLocalStorage]
    );

    // Inicialización de función para remover token
    const removeUserToken = useCallback(
        () => {

            // Se estado el estado del token a null
            setTokenValue(null);
            // Se elimina el valor del token en el almacenamiento local
            removeUserTokenFromLocalStorage();
        }, [removeUserTokenFromLocalStorage]
    );

    return (
        <TokenContext.Provider value={{ userToken: tokenValue, setUserToken, removeUserToken }}>
            {children}
        </TokenContext.Provider>
    );
};

export default UserTokenProvider;
