import type { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import LOCAL_STORAGE from "../constants/app/localStorage";

const tokenInterceptor = (config: AxiosRequestConfig): InternalAxiosRequestConfig => {

    // Si existe un token provisto se agrega a los encabezados
    if ( config.authenticate) {
        // Si los encabezados no existen se inicializan
        if ( !config.headers ) {
            config.headers = {};
            config.headers['accept'] = 'application/json';
        };

        // Obtención del token desde el almacenamiento del dispositivo
        const token = localStorage.getItem(LOCAL_STORAGE.USER_TOKEN);

        // Se agrega el token de autenticación al encabezado
        config.headers['Authorization'] = `Bearer ${token}`;
    };

    // Retorno del objeto de configuración para iniciar la solicitud a la URL
    return config as InternalAxiosRequestConfig;
};

export default tokenInterceptor;
