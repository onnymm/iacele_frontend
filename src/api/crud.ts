import iaCeleAxios from "./axiosInstance";
import getBackendUrl from "./backendUrl";

/** 
 *  ## Lectura de registros
 *  Esta función obtiene la información de uno o más registros de una tabla en
 *  la base de datos.
 *  
 *  ### Parámetros de entrada
 *  - [ `number | number[]}` ] `ids`: Nombre de la tabla de donde se tomarán los
 *  registros.
 *  - [ {@link DatabaseTable} ] `table`: IDs de los respectivos registros a
 *  leer.
 */ 
export const read = async (
    ids: number | number[], // Nombre de la tabla de donde se tomarán los registros.
    table: IACele.Database.Table, // IDs de los respectivos registros a leer.
): Promise<DataRecord[]> => {

    // Obtención de los datos desde el backend
    const response = await iaCeleAxios.get(
        getBackendUrl('/crud/read/'),
        {
            authenticate: true,
            params: {
                'table_name': table,
                'record_ids': ids,
            }
        },
    )

    // Retorno de la respuesta del backend
    return response.data
}

/** 
 *  ## Actualización de registros
 *  Esta función realiza la actualización de un registro a partir de su
 *  respectiva ID provista.
 *  
 *  ### Parámetros de entrada
 *  - [ `number` ] `id`: Nombre de la tabla de donde se tomarán los registros.
 *  - [ {@link DatabaseTable} ] `table`: IDs de los respectivos registros a
 *  leer.
 *  - [ {@link DataRecord} ] `dataToSend`: Datos a ser modificados en la base
 *  de datos.
 */ 
export const update = async (
    id: number, // Nombre de la tabla de donde se tomarán los registros.
    table: IACele.Database.Table, // IDs de los respectivos registros a leer.
    dataToSend: DataRecord, // Datos a ser modificados en la base de datos.
): Promise<boolean> => {

    // Escritura de los datos en el backend
    const response = await iaCeleAxios.patch(
        getBackendUrl('/crud/update/'),
        {
            'record_id': id,
            'table_name': table,
            'data_to_write': dataToSend
        },
        {authenticate: true}
    )
    
    // Retorno de la respuesta del backend
    return response.data;
}
