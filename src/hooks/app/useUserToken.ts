import { useContext } from "react";
import TokenContext from "@/contexts/app/tokenContext";

const useUserToken = () => {

    // Obtención de valores desde el contexto
    const { userToken, setUserToken, removeUserToken } = useContext(TokenContext);

    return { userToken, setUserToken, removeUserToken };
};

export default useUserToken;
