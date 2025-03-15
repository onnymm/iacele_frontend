import iaCeleAxios from "./axiosInstance";
import getBackendUrl from "./backendUrl";

/** 
 *  ## Obtención de datos
 *  Este componente renderiza realiza la solcitud de datos correspondiente, a 
 *  una ruta del backend, proporcionando los parámetros necesarios.
 *   
 *  ### Parámetros de entrada
 *  - [ `string` ] `route`: Ruta de la URL donde se solicitarán los datos.
 *  - [ {@link React.Dispatch<React.SetStateAction<ResponseDataStructure | undefined>>}
 *  ]`stateSetter`: Función de cambio de estado para almacenar
 *  los datos recibidos desde el backend.
 *  - [ `object` ] `params`: Parámetros requeridos por el endpoint del backend
 *  para realizar la solicitud de datos correctamente. La estructura adecuada
 *  de estos parámetros deberá consultarse en el respectivo endpoint del backend.
 */
const getTableData = async (
    route: string,
    stateSetter: React.Dispatch<React.SetStateAction<ResponseDataStructure | undefined>>,
    params: object,
): Promise<void> => {

    // Obtención de los datos
    const response = await iaCeleAxios.post(getBackendUrl(route), { ...params }, {authenticate: true});

    // Asignación de estado
    stateSetter(response.data);
}

export default getTableData;
