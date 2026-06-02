import { useContext } from "react";
import APIContext from "@/contexts/app/apiContext";

const useAPI = () => {

    // Obtención de los valores desde el contexto
    const { api, appLoading } = useContext(APIContext);

    return { api, appLoading };
};

export default useAPI;
