import axios from "axios";
import tokenInterceptor from "../security/tokenInterceptor";

// Inicialización de instancia modificada de Axios
const iaCeleAxios = axios.create()

// Registro de interceptors
iaCeleAxios.interceptors.request.use(tokenInterceptor)

// Exportación de la instancia
export default iaCeleAxios;
