import { useCallback, useContext, useEffect } from "react"
import APIContext from "../../contexts/app/apiContext"
import useUserToken from "./useUserToken";
import useWebsocketNotification from "./useWebsocketNotification";
import showToast from "@/components/ui/toast/toast";
import { Info } from "lucide-react";

const useFetchUser = (): void => {

    // Obtención de la instancia de conexión a la API desde el contexto
    const { api } = useContext(APIContext);
    // Obtención de 
    const { userToken } = useUserToken();

    // Función para actualización de los datos del usuario de la sesión
    const updateUserData = useCallback(
        async () => {
            await api.me();
            showToast({
                title: 'Perfil actualizado',
                content: 'Los datos de tu perfil han sido actualizados.',
                icon: Info,
            })
        }, [api]
    );

    // Registro de la función
    useWebsocketNotification('profile.update', updateUserData);

    // Función para obtención de los datos del usuario
    const fetchUser = useCallback(
        async () => {
            await api.me()
        }, [api]
    );

    useEffect(
        () => {
            // Si no existe token, no se intenta la obtención de datos
            if ( userToken === null ) return;
            // Obtención de datos del usuario de la sesión
            fetchUser();
        }, [fetchUser, userToken]
    );
};

export default useFetchUser;
