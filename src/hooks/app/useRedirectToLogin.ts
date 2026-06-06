import TokenContext from "@/contexts/app/tokenContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router"

const useRedirectToLogin = () => {

    // Obtención de función de navegación desde hook
    const navigateTo = useNavigate();
    // Obtención de valor de token
    const { userToken } = useContext(TokenContext);

    // Redirección a la página de login cuando el token no existe
    useEffect(
        () => {
            if ( !userToken ) {
                navigateTo('/login');
            };
        }, [userToken, navigateTo]
    );
};

export default useRedirectToLogin;
