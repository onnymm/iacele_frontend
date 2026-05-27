import axios, { AxiosError, type AxiosResponse } from "axios";
import tokenInterceptor from "../security/tokenInterceptor";
import PATH from "../constants/api/path";

// Error de API
type APIError = AxiosError<{detail: string}>

const iaCeleAxios = axios.create();

// Registro de interceptors
iaCeleAxios.interceptors.request.use(tokenInterceptor);

class Client {
    private COMPLETE_URL: string = import.meta.env.VITE_API;
    private session: IACele.Resource.UserSession;
    private config = {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    };

    constructor (
        session: IACele.Resource.UserSession,
    ) {

        // Se establecen los valores
        this.session = session;
    };

    login = async (
        username: string,
        password: string,
    ): Promise<void> => {

        // Creación de los datos
        const data = (
            new URLSearchParams(
                {
                    'grant_type': 'password',
                    'username': username,
                    'password': password,
                    'scope': '',
                    'client_id': 'string',
                    'client_secret': 'string',
                },
            )
            .toString()
        );

        try {
            // Obtención del token de autenticación del usuario
            const response = await iaCeleAxios.post<string, AxiosResponse<IACele.App.Authentication>, string>(
                this.toPath(PATH.TOKEN),
                data,
                this.config,
            );

            // Obtención del token de usuario
            const token = response.data['access_token'];
            // Asignación de token a la sesión
            this.session.setUserToken(token);

        } catch {
                // ;
        };
    };

    me = async (): Promise<void> => {

        // Función de remoción de datos y token del usuario si ocurre un error
        const onInvalidToken = (e: APIError) => {
            if ( e.status == 403 ) {
                // Se eliminan los datos del usuario
                this.session.removeUserData();
                // Se elimina el token del usuario
                this.session.removeUserToken();
            };
        };

        // Obtención de los datos del usuario
        const userData = await this.get<{}, IACele.App.Me>(
            PATH.ACCOUNT.ME,
            {},
            onInvalidToken,
        );
        // Se establecen los datos obtenidos
        this.session.setUserData(userData);
    };

    private get = async <S, R>(
        route: string,
        data: S,
        onError: (e: APIError) => void = () => null,
    ): Promise<R> => {

        // Inicialización de función de solicitud de datos a la API
        const apiCall = async () => {
            // Solicitud de datos
            const response = await iaCeleAxios.get<string, AxiosResponse<R>, S>(
                this.toPath(route),
                {
                    data,
                    authenticate: true,
                },
            );

            // Retorno de los datos obtenidos del endpoint
            return response;
        };

        return this.execute(apiCall, onError);
    };

    private execute = async <T>(
        callback: () => Promise<AxiosResponse<T, any, {}>>,
        onError: (e: AxiosError<{detail: string}>) => void,
    ) => {

        // Intento de solicitud
        try {
            // Se establece el estado de carga en verdadero
            this.session.setAppLoading(true);
            // Obtención de la respuesta de la solicitud a la API
            const response = await callback();
            // Se establece el estado de carga en falso
            this.session.setAppLoading(false);

            return response.data;

        // Si ocurre un error...
        } catch (e) {
            // Tipado para Axios
            if ( axios.isAxiosError(e) ) {
                // Ejecución de función de manejo de error
                onError(e);
                // Se muestra el error
                this.error(e);
            };

        // Tras manejo de error...
        } finally {
            // Se establece el estado de carga en falso
            this.session.setAppLoading(false);
        };

    };

    private error = (
        error: APIError,
    ) => {

        // Impresión del error en la consola
        console.log(error.response?.data.detail);
    }

    private toPath = (
        route: string,
    ): string => {

        // Construcción de la URL completa
        const completeURL = `${this.COMPLETE_URL}${route}`;

        return completeURL;
    };
};

export default Client;
