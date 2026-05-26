import axios, { type AxiosResponse } from "axios";
import tokenInterceptor from "../security/tokenInterceptor";
import PATH from "../constants/api/path";

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

    private toPath = (
        route: string,
    ): string => {

        // Construcción de la URL completa
        const completeURL = `${this.COMPLETE_URL}${route}`;

        return completeURL;
    };
};

export default Client;
