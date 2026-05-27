import { useCallback, useContext, useEffect } from "react"
import APIContext from "../../contexts/app/apiContext"

const useFetchUser = (): void => {

    // Obtención de la instancia de conexión a la API desde el contexto
    const { api } = useContext(APIContext);

    // Función para obtención de los datos del usuario
    const fetchUser = useCallback(
        async () => {
            await api.me()
        }, [api]
    );

    useEffect(
        () => {
            fetchUser();
        }, [fetchUser]
    );
};

export default useFetchUser;
