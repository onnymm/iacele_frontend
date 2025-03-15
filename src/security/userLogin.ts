import getBackendUrl from "../api/backendUrl";
import iaCeleAxios from "../api/axiosInstance";

/** 
 *  ## Inicio de sesión del usuario
 *  Esta función realiza la autenticación del usuario con el nombre de usuario
 *  y contraseña y obtiene el token de autenticación necesario para poder ser
 *  usado en encabezados de autenticación en el futuro.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `username`: Nombre de usuario.
 *  - [ `string` ] `password`: Contraseña del usuario.
 *  - [ {@link React.Dispatch<SetStateAction>} ] Función de cambio de estado
 *  del token de autenticación del usuario.
 *  
 *  ### Retorno
 *  Esta función retorna un valor booleano indicador de si la autenticación fue
 *  iniciada correctamente o no.
 */ 
const userLogin: (
    username: string,
    password: string,
    setToken: React.Dispatch<React.SetStateAction<string | null>>,
) => (Promise<boolean>) = async (
    username,
    password,
    setToken,
) => {

    // Configuración de los encabezados
    const config: AuthenticationHeaders = {
        headers: {
            "accept": "application/json",
            "Content-Type": 'application/x-www-form-urlencoded',
        },
    };

    // Configuración de datos
    const d = (
        new URLSearchParams(
            {
                grant_type: "password",
                username,
                password,
                scope: "",
                client_id: "string",
                client_secret: "string",
            },
        )
        .toString()
    );

    try {

        // Obtención del token de autenticación del usuario
        const response = await iaCeleAxios.post(getBackendUrl('/token/'), d, config);
        // Asignación de token
        setToken(response.data['access_token']);
        return true;
    } catch {

        // Retorno de autenticación fallida
        return false;
    }
};

export default userLogin;
