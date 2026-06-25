import axios, { type AxiosResponse } from "axios";
import tokenInterceptor from "../security/tokenInterceptor";
import PATH from "../constants/api/path";

// Error de API
type APIError = {
    status?: number;
    detail?: string;
};

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

    fieldsMetadata = async <M extends IACele.Data.ModelName>(
        params: IACele.API.Request.FieldsMetadata<M>,
    ): Promise<IACele.API.Response.FieldsMetadata> => {

        return await this.post<IACele.API.Request.FieldsMetadata<M>, IACele.API.Response.FieldsMetadata>(
            PATH.METADATA.FIELDS,
            params,
        );
    };

    action = async <M extends IACele.Data.ModelName>(
        params: IACele.API.Request.Action<M>,
    ) => {

        return await this.post<IACele.API.Request.Action<M>, IACele.API.Response.Action>(
            PATH.SERVER.ACTION,
            params,
        );
    };

    create = async <M extends IACele.Data.ModelName>(
        data: IACele.API.Request.Create<M>,
    ): Promise<IACele.API.Response.Create> => {

        // Función de creación de registro
        const apiCall = async (): Promise<IACele.API.Response.Create> => {
            // Obtención de ID de registro creado
            const response = await this.post<IACele.API.Request.Create<M>, IACele.API.Response.Create>(
                PATH.CRUD.CREATE,
                data,
            );

            return response;
        };

        return this.execute<IACele.API.Response.Create>(apiCall, () => {});
    };

    searchRead = async <M extends IACele.Data.ModelName>(
        data: IACele.API.Request.SearchRead<M>,
    ): Promise<IACele.API.Response.SearchRead<M>> => {

        // Función de búsqueda y lectura
        const apiCall = async () => {
            // Obtención de registros
            const response = await this.post<IACele.API.Request.SearchRead<M>, IACele.API.Response.SearchRead<M>>(
                PATH.CRUD.SEARCH_READ,
                data,
            );

            return response;
        };

        return this.execute<IACele.API.Response.SearchRead<M>>(apiCall, () => {});
    };

    update = async <M extends IACele.Data.ModelName>(
        data: IACele.API.Request.Update<M>,
    ): Promise<IACele.API.Response.Update> => {

        // Función de modificación de registro
        const apiCall = async (): Promise<IACele.API.Response.Update> => {
            // Modificación de registro y obtención de respuesta
            const response = await this.patch<IACele.API.Request.Update<M>, IACele.API.Response.Update>(
                PATH.CRUD.UPDATE,
                data,
            );

            return response;
        };

        return this.execute<IACele.API.Response.Update>(apiCall, () => {});
    };

    delete = <M extends IACele.Data.ModelName>(
        data: IACele.API.Request.Delete<M>,
    ): Promise<IACele.API.Response.Delete> => {

        // Función de eliminación de registro
        const apiCall = async (): Promise<IACele.API.Response.Delete> => {
            // Modificación de registro y obtención de respuesta
            const response = await this.post<IACele.API.Request.Delete<M>, IACele.API.Response.Delete>(
                PATH.CRUD.DELETE,
                data,
            );

            return response;
        };

        return this.execute<IACele.API.Response.Delete>(apiCall, () => {});
    };

    login = async (
        username: string,
        password: string,
        onError: () => void,
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

        // Función de inicio de sesión
        const apiCall = async (): Promise<void> => {
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
        };

        this.execute<void>(apiCall, onError);
    };

    me = async (): Promise<void> => {

        // Función de remoción de datos y token del usuario si ocurre un error
        const onInvalidToken = (e: APIError): void => {
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

    tree = async <M extends IACele.Data.ModelName>(
        data: IACele.API.Request.Tree<M>,
    ): Promise<IACele.API.Response.Tree<M>> => {

        // Función de búsqueda y lectura para árbol
        const apiCall = async (): Promise<IACele.API.Response.Tree<M>> => {
            // Obtención de los datos
            const response = this.post<IACele.API.Request.Tree<M>, IACele.API.Response.Tree<M>>(
                PATH.FRONTEND.TREE,
                data,
            );

            return response;
        };

        return this.execute<IACele.API.Response.Tree<M>>(apiCall, () => {});
    };

    form = async <M extends IACele.Data.ModelName>(
        data: IACele.API.Request.Form<M>,
    ): Promise<IACele.API.Response.Form<M>> => {

        // Función de lectura para formulario
        const apiCall = async (): Promise<IACele.API.Response.Form<M>> => {
            // Obtención de los datos
            const response = await this.post<IACele.API.Request.Form<M>, IACele.API.Response.Form<M>>(
                PATH.FRONTEND.FORM,
                data,
            );

            return response;
        };

        return this.execute<IACele.API.Response.Form<M>>(apiCall, () => {});
    };

    private get = async <S, R>(
        route: string,
        data: S,
        onError: (e: APIError) => void = () => null,
    ): Promise<R> => {

        // Inicialización de función de solicitud de datos a la API
        const apiCall = async (): Promise<R> => {
            // Solicitud de datos
            const response = await iaCeleAxios.get<string, AxiosResponse<R>, S>(
                this.toPath(route),
                {
                    data,
                    authenticate: true,
                },
            );

            // Retorno de los datos obtenidos del endpoint
            return response.data;
        };

        return this.execute<R>(apiCall, onError);
    };

    private post = async <S, R>(
        path: string,
        data: S,
        onError: (e: APIError) => void = () => null,
    ): Promise<R> => {

        // Inicialización de función de solicitud de datos a la API
        const apiCall = async (): Promise<R> => {
            // Solicitud de datos
            const response = await iaCeleAxios.post<string, AxiosResponse<R>, S>(
                this.toPath(path),
                data,
                { authenticate: true },
            );

            // Retorno de los datos obtenidos del endpoint
            return response.data;
        };

        return this.execute<R>(apiCall, onError);
    };

    private patch = async <S, R>(
        path: string,
        data: S,
        onError: (e: APIError) => void = () => null,
    ): Promise<R> => {

        // Inicialización de función de solicitud de datos a la API
        const apiCall = async (): Promise<R> => {
            // Solicitud de datos
            const response = await iaCeleAxios.patch<string, AxiosResponse<R>, S>(
                this.toPath(path),
                data,
                { authenticate: true },
            );

            // Retorno de los datos obtenidos del endpoint
            return response.data;
        };

        return this.execute<R>(apiCall, onError);
    };

    private execute = async <T>(
        callback: () => Promise<T>,
        onError: (e: APIError) => void,
    ): Promise<T> => {

        // Se establece el estado de carga en verdadero
        this.session.setAppLoading(true);

        // Intento de solicitud
        try {

            // Obtención de la respuesta de la solicitud a la API
            const response = await callback();
            // Se establece el estado de carga en falso
            this.session.setAppLoading(false);

            return response;

        // Si ocurre un error...
        } catch (e) {
            // Tipado para Axios
            if ( axios.isAxiosError(e) ) {
                if ( e.code === 'ERR_NETWORK' ) {
                    onError({
                        status: 408,
                        detail: 'Hubo un error al intentar conectarse al servidor.',
                    })
                } else {
                    // Ejecución de función de manejo de error
                    onError({
                        status: 404,
                        detail: e.response?.data.detail,
                    });
                };
                // Se muestra el error
                this.error({
                    status: e.status,
                    detail: e.response?.data.detail,
                });

            };

            // Se lanza el error para interrumpir la función
            throw e;

        } finally {

            // Se establece el estado de carga en falso
            this.session.setAppLoading(false);
        };

    };

    private error = (
        error: APIError,
    ) => {

        // Impresión del error en la consola
        console.log(error.detail);
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
